import { CARDS } from "../utils/consts/cards";
import { memo, useEffect, useState } from "react";
import {
  debounce,
  includes,
  isEmpty,
  orderBy,
} from "lodash";
import { motion, type Variants } from "motion/react";
import { Toolbar } from "@base-ui-components/react";
import { LuSearch } from "react-icons/lu";
import { TextField } from "../components/TextField";
import { type Card as CardType } from "../models/types";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { useDisabledCards } from "../hooks/useDisabledCards";

const variants: Variants = {
  active: {
    opacity: 1,
    scale: 1,
  },
  disabled: { opacity: 0.7, scale: 0.95 },
};

const CARDS_SORTED = orderBy(CARDS, ["tier", "name"], ["desc", "asc"]);

export const EditCards = memo(() => {
  const {
    disabledCardIds,
    addDisabledCardId,
    delDisabledCardId,
    clearDisabledCardIds,
  } = useDisabledCards();
  const [displayedCards, setDisplayedCards] =
    useState<CardType[]>(CARDS_SORTED);
  const [searchQuery, setSearchQuery] = useState("");

  const handleToggleCard = (id: string) => {
    if (disabledCardIds)
      if (includes(disabledCardIds, id)) {
        delDisabledCardId(id);
      } else {
        addDisabledCardId(id);
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
          CARDS_SORTED.filter(
            (card) =>
              includes(card.name.toLowerCase(), searchQueryTrimmed) ||
              includes(card.description.toLowerCase(), searchQueryTrimmed)
          )
        );
      } else {
        setDisplayedCards(CARDS_SORTED);
      }
    }, 500);
    dbCall();
    return () => {
      dbCall.cancel();
    };
  }, [searchQuery]);

  return (
    <div className="w-full">
      <Toolbar.Root className="flex items-center gap-2 z-10 bg-neutral-800 py-3">
        <Toolbar.Group
          aria-label="Search"
          className="flex items-center gap-3 grow shrink relative min-w-0"
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
        {disabledCardIds.length > 0 && (
          <Toolbar.Input
            render={
              <Button
                color="danger"
                variant="outlined"
                size="sm"
                onClick={clearDisabledCardIds}
              >
                {`Unselect (${disabledCardIds.length})`}
              </Button>
            }
          />
        )}
      </Toolbar.Root>
      <div className="h-[70dvh] overflow-y-auto flex flex-col py-3 pr-2 -mr-2">
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
                <Card card={card} compact />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
});
