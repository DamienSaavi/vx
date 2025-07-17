import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { Tier } from "../components/Tier";
import type { Card as CardType } from "../models/types";
import { LuX } from "react-icons/lu";
import { useCallback, useRef, useState } from "react";
import clsx from "clsx";
import { Button } from "../components/Button";
import { useScrollerRef } from "../hooks/useScrollerRef";

type Props = {
  cards: CardType[];
  onDiscard: (id: string) => void;
  onClear: () => void;
};

export const CurrentCardsList = ({ cards, onDiscard, onClear }: Props) => {
  const headerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useScrollerRef();
  const [showActionsOnIdx, setShowActionsOnIdx] = useState(-1);
  const [isSticky, setIsSticky] = useState(false);
  const { scrollY } = useScroll({ container: scrollerRef });

  useMotionValueEvent(scrollY, "change", () => {
    const rect = headerRef.current?.getBoundingClientRect();
    if (rect && scrollerRef.current) setIsSticky(rect.top <= 1);
  });

  const scrollToList = useCallback(() => {
    headerRef.current?.scrollIntoView({
      block: "start",
      inline: "start",
      behavior: "smooth",
    });
  }, []);

  const scrollToTop = useCallback(
    () => scrollerRef.current?.scrollTo({ top: 0, behavior: "smooth" }),
    [scrollerRef]
  );

  return (
    <div
      className={clsx(
        "flex flex-col items-stretch w-full min-h-screen duration-150 bg-neutral-800 overflow-clip pb-4",
        isSticky ? "rounded-t-none" : "rounded-t-3xl"
      )}
      style={{ boxShadow: "0px -4px 8px 0px rgba(0,0,0,0.2)" }}
    >
      <div
        ref={headerRef}
        onClick={isSticky ? scrollToTop : scrollToList}
        className={clsx(
          "flex gap-3 justify-center sticky top-0 items-center h-16 transition-colors duration-150 bg-neutral-800 px-4 py-2 z-10 border-b border-neutral-700/0",
          isSticky && "border-neutral-700/100"
        )}
      >
        <div className="w-12 h-1 absolute top-2 rounded-md bg-neutral-500" />
        <h5 className="font-bold text-neutral-200 text-center">Active Cards</h5>
        {isSticky && (
          <div className="absolute right-3.5">
            <Button
              color="secondary"
              variant="filled"
              onClick={(e) => {
                e.stopPropagation();
                onClear();
              }}
            >
              Clear All
            </Button>
          </div>
        )}
      </div>
      <ul>
        {cards.map((card, idx) => (
          <li
            key={card.id}
            className="flex justify-between items-center gap-2 px-3 py-2"
          >
            <div
              className="grow"
              onClick={() =>
                setShowActionsOnIdx((prev) => (prev === idx ? -1 : idx))
              }
            >
              <h6 className="flex items-center gap-2 pb-1 text-neutral-200 font-semibold">
                {card.name}
                <Tier tier={card.tier} size="sm" />
              </h6>
              <p className="text-sm text-neutral-400 line-clamp-2">
                {card.description}
              </p>
            </div>
            <motion.div
              initial={{ width: 0 }}
              animate={showActionsOnIdx === idx ? "visible" : "hidden"}
              transition={{ type: "spring", stiffness: 500, damping: 40 }}
              variants={{
                visible: { width: "fit-content" },
              }}
            >
              <Button
                label="discard"
                variant="text"
                color="danger"
                onClick={() => onDiscard(card.id)}
              >
                <LuX strokeWidth={2} fontSize={28} className="text-red-400" />
              </Button>
            </motion.div>
          </li>
        ))}
      </ul>
    </div>
  );
};
