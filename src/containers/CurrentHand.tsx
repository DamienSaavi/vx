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
        y: 0,
      },
      after: {
        scale: 0.8 - Math.abs(idx - activeIdx) * 0.01,
        zIndex: 20 - idx,
        opacity: 1,
        y: 0,
      },
      current: {
        scale: 1.1,
        zIndex: 20,
        opacity: 1,
        y: showActions ? -30 : 0,
        boxShadow: "0px 0px 16px 16px rgba(0,0,0,0.2)",
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
        initial={{ opacity: 0, y: 200, scale: 0.7 }}
        exit={{ opacity: 0, y: 200 }}
        style={{ x, rotateZ }}
        transition={transition}
        className="absolute h-[50dvh] max-h-[100vw] aspect-2/3 rounded-2xl"
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
      <div className="flex absolute justify-between w-full px-6 pointer-events-none">
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
    }, 33)
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
        className="flex min-w-0 w-full h-[55vh] px-[34vw] items-center snap-x snap-mandatory overflow-x-auto no-scrollbar pointer-events-auto"
      >
        {cards.map((card) => (
          <div key={card.id} className="snap-center shrink-0 w-[33vw] h-full" />
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
