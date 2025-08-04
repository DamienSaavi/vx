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
import { clamp, inRange, round, throttle, toInteger } from "lodash";
import { Card } from "../components/Card";
import type { Card as CardType } from "../models/types";
import { LuChevronRight, LuChevronLeft } from "react-icons/lu";
import clsx from "clsx";
import { Button } from "../components/Button";

type Props = {
  cards: CardType[];
  onDiscard: (id: string) => void;
};

const transition: Transition = {
  type: "spring",
  bounce: 0,
  duration: 0.5,
  rotateZ: { duration: 0 },
};

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
    state: "before" | "after" | "current" | "new";
    activeIdx: number;
    offsetX: MotionValue<number>;
    showActions: boolean;
    onDiscard: (id: string) => void;
  }) => {
    const variants: Variants = {
      before: {
        scale: 0.8 - Math.abs(idx - activeIdx) * 0.02,
        zIndex: 0,
        opacity: 1,
        y: 0,
      },
      after: {
        scale: 0.8 - Math.abs(idx - activeIdx) * 0.02,
        zIndex: 20 - idx,
        opacity: 1,
        y: 0,
      },
      current: {
        scale: 1,
        zIndex: 20,
        opacity: 1,
        y: showActions ? -30 : 0,
      },
    };

    const [actionsDisabled, setActionsDisabled] = useState(false);

    const x = useSpring(
      useTransform(offsetX, (value) => {
        switch (state) {
          case "before":
            return -50 + 16 * (idx - activeIdx);
          case "after":
            return 50 + 16 * (idx - activeIdx);
          default:
            return 0.3 * -value;
        }
      }),
      { bounce: 0, duration: 200 }
    );

    const rotateZ = useSpring(
      useTransform(offsetX, (value) => {
        switch (state) {
          case "before":
          case "after":
            return clamp(3 * (idx - activeIdx), -30, 30);
          default:
            return 0.05 * -value;
        }
      }),
      { bounce: 0, duration: 200 }
    );

    return (
      <motion.div
        animate={state}
        variants={variants}
        initial={{ opacity: 0, y: 200, scale: 0.8 }}
        exit={{ opacity: 0, y: 200 }}
        style={{ x, rotateZ }}
        transition={transition}
        className="absolute h-[60dvh] max-h-[110vw] aspect-2/3 rounded-2xl"
      >
        <AnimatePresence>
          {state === "current" && showActions && (
            <motion.div
              onAnimationStart={() => setActionsDisabled(true)}
              onAnimationComplete={() => setActionsDisabled(false)}
              initial={{ opacity: 0.2, y: -55 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0.2, y: -55 }}
              transition={transition}
              className={
                "absolute -bottom-12 flex w-full justify-center drop-shadow-xl"
              }
            >
              <Button
                onClick={() => onDiscard(card.id)}
                disabled={actionsDisabled}
                color="danger"
              >
                Discard
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
        <Card card={card} />
        <div
          className={clsx(
            "absolute top-0 left-0 right-0 bottom-0 rounded-2xl bg-black transition-opacity delay-100 duration-300 ease-in-out",
            state === "current" ? "opacity-0" : "opacity-10"
          )}
        />
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
      <div className="flex absolute justify-between items-center w-full pointer-events-none h-[50dvh]">
        <button
          onClick={onSelectPrev}
          aria-label="Previous Card"
          className={clsx(
            "flex justify-start items-center p-2 cursor-pointer transition-opacity duration-200 pointer-events-auto w-fit h-fit opacity-0 z-20",
            onSelectPrev && "opacity-90"
          )}
        >
          <div className="rounded-full text-neutral-100 p-2 bg-neutral-800/80">
            <LuChevronLeft fontSize={24} strokeWidth={2} />
          </div>
        </button>
        <button
          onClick={onSelectNext}
          aria-label="Next Card"
          className={clsx(
            "flex justify-end items-center px-2 cursor-pointer transition-opacity duration-200 pointer-events-auto w-fit h-fit opacity-0 z-20",
            onSelectNext && "opacity-90"
          )}
        >
          <div className="rounded-full text-neutral-100 p-2 bg-neutral-800/80">
            <LuChevronRight fontSize={24} strokeWidth={2} />
          </div>
        </button>
      </div>
    );
  }
);

export const CurrentHand = ({ cards, onDiscard }: Props) => {
  const prevCardsLength = useRef(0);
  const cardScrollerRef = useRef<HTMLDivElement>(null);
  const [showActions, setShowActions] = useState(false);
  const [focusedCardIdx, setFocusedCardIdx] = useState(0);
  const { scrollX } = useScroll({ container: cardScrollerRef });
  const offsetX = useMotionValue(0);

  const scrollToIdx = useCallback((idx: number) => {
    if (cardScrollerRef.current) {
      cardScrollerRef.current.children.item(idx)?.scrollIntoView({
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

  const handleDiscard = useCallback(
    (id: string) => {
      setShowActions(false);
      onDiscard(id);
    },
    [onDiscard]
  );

  useEffect(() => {
    if (prevCardsLength.current < cards.length || !cards.length) {
      scrollToIdx(cards.length - 1);
    } else if (!inRange(focusedCardIdx, 0, cards.length)) {
      scrollToIdx(clamp(focusedCardIdx, 0, cards.length - 1));
    }
    prevCardsLength.current = cards.length;
  }, [cards, focusedCardIdx, scrollToIdx]);

  useEffect(() => setShowActions(false), [focusedCardIdx, cards]);

  useMotionValueEvent(
    scrollX,
    "change",
    throttle((baseValue) => {
      if (cardScrollerRef.current) {
        const { clientWidth, scrollWidth } = cardScrollerRef.current;
        const value = baseValue / (scrollWidth - clientWidth);
        const span = 50 / (cards.length - 1);
        const pos = ((value * 100) / span + 1) / 2;
        const newOffset = round((pos % 1) * 100 - 50, 1);
        offsetX.set(isFinite(newOffset) ? newOffset : 0);
        const idx = toInteger(pos);
        setFocusedCardIdx(idx);
      }
    }, 16)
  );

  return (
    <div className="relative flex flex-col justify-center items-center h-full min-w-0 max-w-screen w-screen pointer-events-none overflow-clip">
      <span
        className={clsx(
          "absolute bottom-0 font-mono text-xs text-neutral-300 z-10 bg-neutral-800 px-2 py-1 rounded-full",
          !cards.length && "hidden"
        )}
      >
        {(focusedCardIdx + 1).toString().padStart(2)}/
        {cards.length.toString().padEnd(2)}
      </span>
      <CardsAnimated
        cards={cards}
        activeIdx={focusedCardIdx}
        offsetX={offsetX}
        showActions={showActions}
        onDiscard={handleDiscard}
      />
      <div
        ref={cardScrollerRef}
        onClick={() => setShowActions((p) => !p)}
        className="flex min-w-0 w-full h-[55vh] px-[40vw] items-center snap-x snap-mandatory overflow-x-auto no-scrollbar pointer-events-auto"
      >
        {cards.map((card) => (
          <div key={card.id} className="snap-center shrink-0 w-[20vw] h-full" />
        ))}
      </div>
      <HandControls
        onSelectPrev={focusedCardIdx > 0 ? selectPrevCard : undefined}
        onSelectNext={
          focusedCardIdx < cards.length - 1 ? selectNextCard : undefined
        }
      />
    </div>
  );
};
