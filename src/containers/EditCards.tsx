import { CARDS } from "../utils/consts/cards";
import { memo, useEffect, useState } from "react";
import { concat, debounce, includes, isEmpty, without } from "lodash";
import { motion, type Variants } from "motion/react";
import { Toolbar } from "@base-ui-components/react";
import { LuSearch } from "react-icons/lu";
import { TextField } from "../components/TextField";
import { type Card as CardType } from "../models/types";
import { Card } from "../components/Card";
import { useSessionData } from "../hooks/useSessionData";

export const EditCards = memo(() => {
  const { disabledCardIds, setDisabledCardIds } = useSessionData();
  const [displayedCards, setDisplayedCards] = useState<CardType[]>(CARDS);
  const [searchQuery, setSearchQuery] = useState("");

  const handleToggleCard = (id: string) => {
    if (disabledCardIds)
      if (includes(disabledCardIds, id)) {
        setDisabledCardIds(without(disabledCardIds, id));
      } else {
        setDisabledCardIds(concat(disabledCardIds, id));
      }
  };

  useEffect(() => {
    const dbCall = debounce(() => {
      const searchQueryTrimmed = searchQuery
        .trim()
        .replaceAll(/\s+/g, " ")
        .toLowerCase();
      if (searchQueryTrimmed) {
        setDisplayedCards(
          CARDS.filter(
            (card) =>
              includes(card.name.toLowerCase(), searchQueryTrimmed) ||
              includes(card.description.toLowerCase(), searchQueryTrimmed)
          )
        );
      } else {
        setDisplayedCards(CARDS);
      }
    }, 500);
    dbCall();
    return () => {
      dbCall.cancel();
    };
  }, [searchQuery]);

  const variants: Variants = {
    active: {
      opacity: 1,
      scale: 1,
    },
    disabled: { opacity: 0.7, scale: 0.95 },
  };

  return (
    <div className="max-h-full w-full">
      <Toolbar.Root className="z-10 bg-neutral-800 py-2 pt-3">
        <Toolbar.Group
          aria-label="Search"
          className="flex items-center gap-3 relative"
        >
          <LuSearch fontSize={24} className="text-neutral-500 shrink-0" />
          <Toolbar.Input
            render={
              <TextField
                type="search"
                placeholder="Search by title or description"
                value={searchQuery}
                onValueChange={setSearchQuery}
              />
            }
          />
        </Toolbar.Group>
      </Toolbar.Root>
      <div className="h-[70dvh] overflow-y-auto flex flex-col pr-2.5 -mr-2.5">
        <div className="h-5 shrink-0 sticky top-0 bg-gradient-to-b from-neutral-800/100 to-neutral-800/0 z-10" />
        {isEmpty(displayedCards) ? (
          <div className="grow flex justify-center items-center">
            <span className="text-neutral-400 text-center">
              {"No cards found :("}
            </span>
          </div>
        ) : (
          <div className="grid grid-cols-1 min-[22rem]:grid-cols-2 min-[35rem]:grid-cols-3 gap-2">
            {displayedCards.map((card) => (
              <motion.div
                aria-disabled={includes(disabledCardIds, card.id)}
                key={card.id}
                animate={
                  includes(disabledCardIds, card.id) ? "disabled" : "active"
                }
                variants={variants}
                onClick={() => handleToggleCard(card.id)}
              >
                <Card card={card} />
              </motion.div>
            ))}
          </div>
        )}
        <div className="h-5 shrink-0 sticky bottom-0 bg-gradient-to-t from-neutral-800/100 to-neutral-800/0 z-10" />
      </div>
    </div>
  );
});
