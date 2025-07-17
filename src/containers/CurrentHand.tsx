import {
  AnimatePresence,
  motion,
  MotionValue,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  type Transition,
  type Variants,
} from "motion/react";
import { useState, memo, useCallback, useEffect, useRef } from "react";
import { round, toInteger } from "lodash";
import { useClickAway, usePrevious } from "@uidotdev/usehooks";
import { Card } from "../components/Card";
import type { Card as CardType } from "../models/types";
import { LuChevronRight, LuChevronLeft } from "react-icons/lu";
import clsx from "clsx";
import { Button } from "../components/Button";

type Props = {
  cards: CardType[];
  onDiscard: (id: string) => void;
};

const exitTransition: Transition = {
  type: "spring",
  bounce: 0,
  duration: 0.5,
};
const transition: Transition = { type: "spring", stiffness: 700, damping: 50 };

const CardAnimated = memo(
  ({
    idx,
    card,
    state,
    activeIdx,
    offsetX,
    showActions,
    onDiscard,
  }: {
    idx: number;
    card: CardType;
    state: "before" | "after" | "current";
    activeIdx: number;
    offsetX: MotionValue<number>;
    showActions: boolean;
    onDiscard: (id: string) => void;
  }) => {
    const variants: Variants = {
      before: {
        scale: 0.8 - Math.abs(idx - activeIdx) * 0.01,
        zIndex: 0,
        opacity: 1,
        y: 30,
        transition,
      },
      after: {
        scale: 0.8 - Math.abs(idx - activeIdx) * 0.01,
        zIndex: activeIdx - idx,
        opacity: 1,
        y: 30,
        transition,
      },
      current: {
        scale: 1.1,
        zIndex: 10,
        opacity: 1,
        y: showActions ? -30 : 0,
        boxShadow: "0px 0px 16px 16px rgba(0,0,0,0.2)",
        transition,
      },
    };

    const x = useSpring(
      useTransform(offsetX, (value) => {
        switch (state) {
          case "before":
            return -50 + 10 * (idx - activeIdx);
          case "after":
            return 50 + 10 * (idx - activeIdx);
          default:
            return 0.25 * -value;
        }
      }),
      { bounce: 0, duration: 200 }
    );

    const rotateZ = useSpring(
      useTransform(offsetX, (value) => {
        switch (state) {
          case "before":
          case "after":
            return 3 * (idx - activeIdx);
          default:
            return -0.05 * value;
        }
      }),
      { bounce: 0, duration: 200 }
    );

    return (
      <motion.div
        animate={state}
        variants={variants}
        initial={{ opacity: 0, y: 200, scale: 0.8 }}
        exit={{ opacity: 0, y: 200, transition: exitTransition }}
        className="absolute max-w-[30dvh] w-full aspect-2/3 rounded-2xl"
        style={{ x, rotateZ }}
        transition={transition}
      >
        <AnimatePresence>
          {state === "current" && showActions && (
            <motion.div
              initial={{ opacity: 0.6, y: -96 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0.6, y: -96 }}
              transition={transition}
              className="absolute -bottom-14 flex w-full justify-center gap-1.5 p-1.5 drop-shadow-xl pointer-events-auto"
            >
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  onDiscard(card.id);
                }}
                color="secondary"
              >
                Discard
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
        <Card card={card} />
      </motion.div>
    );
  }
);

const CardsAnimated = memo(
  ({
    cards,
    activeIdx,
    offsetX,
    showActions,
    onDiscard,
  }: {
    cards: CardType[];
    activeIdx: number;
    offsetX: MotionValue<number>;
    showActions: boolean;
    onDiscard: (id: string) => void;
  }) => {
    return (
      <div className="absolute left-0 right-0 top-0 bottom-0 flex justify-center items-center w-full h-full pointer-events-none">
        <AnimatePresence>
          {cards.map((card, idx) => (
            <CardAnimated
              key={card.id}
              state={
                idx < activeIdx
                  ? "before"
                  : idx > activeIdx
                  ? "after"
                  : "current"
              }
              idx={idx}
              card={card}
              activeIdx={activeIdx}
              showActions={showActions}
              offsetX={offsetX}
              onDiscard={onDiscard}
            />
          ))}
        </AnimatePresence>
      </div>
    );
  }
);

const HandControls = memo(
  ({
    onSelectPrev,
    onSelectNext,
  }: {
    onSelectPrev?: () => void;
    onSelectNext?: () => void;
  }) => {
    return (
      <div className="flex absolute justify-between w-full px-6 z-20 bottom-2/5">
        <button
          onClick={onSelectPrev}
          aria-label="Previous Card"
          className={clsx(
            "flex justify-center cursor-pointer transition-opacity duration-200 pointer-events-auto items-center p-2.5 -m-2.5 rounded-full bg-neutral-700 text-neutral-100 opacity-0",
            onSelectPrev && "opacity-90"
          )}
        >
          <LuChevronLeft fontSize={18} strokeWidth={3} />
        </button>
        <button
          onClick={onSelectNext}
          aria-label="Next Card"
          className={clsx(
            "flex justify-center cursor-pointer transition-opacity duration-200 pointer-events-auto items-center p-2.5 -m-2.5 rounded-full bg-neutral-700 text-neutral-100 opacity-0",
            onSelectNext && "opacity-90"
          )}
        >
          <LuChevronRight fontSize={18} strokeWidth={3} />
        </button>
      </div>
    );
  }
);

export const CurrentHand = ({ cards, onDiscard }: Props) => {
  const [focusedCardIdx, setFocusedCardIdx] = useState(0);
  const [showActions, setShowActions] = useState(false);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const clickAwayRef = useClickAway<HTMLDivElement>(() =>
    setShowActions(false)
  );
  const prevCardsLength = usePrevious(cards.length);
  const { scrollX } = useScroll({ container: scrollerRef });
  const offsetX = useMotionValue(0);

  const scrollToIdx = useCallback((idx: number) => {
    if (scrollerRef.current) {
      scrollerRef.current.children.item(idx)?.scrollIntoView({
        behavior: "instant",
        block: "center",
        inline: "center",
      });
    }
  }, []);

  const selectPrevCard = useCallback(
    () => scrollToIdx(Math.max(0, focusedCardIdx - 1)),
    [focusedCardIdx, scrollToIdx]
  );

  const selectNextCard = useCallback(
    () => scrollToIdx(Math.min(cards.length - 1, focusedCardIdx + 1)),
    [scrollToIdx, cards, focusedCardIdx]
  );

  useEffect(() => {
    if (prevCardsLength < cards.length) {
      scrollToIdx(cards.length - 1);
    }
  }, [cards, prevCardsLength, scrollToIdx]);

  useEffect(() => setShowActions(false), [focusedCardIdx]);

  useMotionValueEvent(scrollX, "change", (baseValue) => {
    if (scrollerRef.current) {
      const { clientWidth, scrollWidth } = scrollerRef.current;
      const value = baseValue / (scrollWidth - clientWidth);
      const span = 50 / (cards.length - 1);
      const pos = ((value * 100) / span + 1) / 2;
      offsetX.set(round((pos % 1) * 100 - 50, 1));
      const idx = toInteger(pos);
      setFocusedCardIdx(idx);
    }
  });

  return (
    <div className="relative flex flex-col justify-center gap-2 items-center h-full min-w-0 max-w-screen w-screen overflow-hidden select-none">
      <div
        ref={clickAwayRef}
        onClick={() => setShowActions((p) => !p)}
        className="w-full h-[55vh]"
      >
        <div
          ref={scrollerRef}
          className="flex min-w-0 w-full px-[30vw] h-full items-center snap-x snap-mandatory overflow-x-auto no-scrollbar z-10"
        >
          {cards.map((card) => (
            <div
              key={card.id}
              className="snap-center shrink-0 w-[40vw] h-full"
            />
          ))}
        </div>
      </div>
      <CardsAnimated
        cards={cards}
        activeIdx={focusedCardIdx}
        offsetX={offsetX}
        showActions={showActions}
        onDiscard={onDiscard}
      />
      <HandControls
        onSelectPrev={focusedCardIdx > 0 ? selectPrevCard : undefined}
        onSelectNext={
          focusedCardIdx < cards.length - 1 ? selectNextCard : undefined
        }
      />
    </div>
  );
};
