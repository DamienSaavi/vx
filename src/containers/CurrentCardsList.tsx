import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Tier } from "../components/Tier";
import { Button } from "../components/Button";
import type { Card as CardType } from "../models/types";
import { useClickAway } from "@uidotdev/usehooks";

type Props = {
  cards: CardType[];
  onDiscard: (id: string) => void;
};

export const CurrentCardsList = ({ cards, onDiscard }: Props) => {
  const [showActionsOnIdx, setShowActionsOnIdx] = useState(-1);
  const ref = useClickAway<HTMLDivElement>(() => setShowActionsOnIdx(-1));
  const prevCardsLength = useRef(0);

  const cardsReversed = useMemo(() => cards.slice().reverse(), [cards]);

  const handleDiscard = (id: string) => {
    setShowActionsOnIdx(-1);
    onDiscard(id);
  };

  useEffect(() => {
    if (ref.current && prevCardsLength.current < cards.length) {
      ref.current.scrollTo({ top: 0, behavior: "smooth" });
    }
    prevCardsLength.current = cards.length;
  }, [cards, ref]);

  return (
    <div
      ref={ref}
      className="relative flex flex-col items-stretch w-full grow overflow-x-hidden"
    >
      <div className="h-5 shrink-0 sticky top-0 bg-gradient-to-b from-neutral-900/100 to-neutral-900/0" />
      <ul className="py-4">
        <AnimatePresence>
          {cardsReversed.map((card, idx) => (
            <motion.li
              initial={{
                x: "-100dvw",
                height: 0,
                opacity: 0,
              }}
              animate={{
                x: 0,
                height: "auto",
                opacity: 1,
                transition: { duration: 0.3, ease: "easeInOut" },
              }}
              exit={{
                x: "-100dvw",
                height: 0,
                opacity: 0,
                transition: { duration: 0.3, ease: "easeInOut" },
              }}
              key={card.id}
              className="flex justify-between items-center px-3.5 gap-x-3"
            >
              <AnimatePresence>
                {showActionsOnIdx === idx && (
                  <motion.div
                    className="overflow-visible"
                    initial={{ width: 0, x: -100 }}
                    animate={{ width: "fit-content", x: 0 }}
                    exit={{ width: 0, x: -100 }}
                    transition={{ type: "spring", stiffness: 500, damping: 40 }}
                  >
                    <Button
                      label="discard"
                      color="danger"
                      size="sm"
                      disabled={showActionsOnIdx !== idx}
                      onClick={() => handleDiscard(card.id)}
                    >
                      Discard
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
              <button
                className="grow text-start py-2.5"
                onClick={() =>
                  setShowActionsOnIdx((prev) => (prev === idx ? -1 : idx))
                }
              >
                <h6 className="flex items-center gap-2 pb-1 font-semibold text-lg">
                  {card.name}
                  <Tier tier={card.tier} size="sm" />
                </h6>
                <p className="text-sm text-neutral-400">{card.description}</p>
              </button>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
      <div className="h-5 shrink-0 sticky bottom-0 bg-gradient-to-t from-neutral-900/100 to-neutral-900/0" />
    </div>
  );
};
