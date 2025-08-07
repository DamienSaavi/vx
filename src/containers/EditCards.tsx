import { CARDS } from "../utils/consts/cards";
import { memo, useCallback, useEffect, useState } from "react";
import { debounce, includes, isEmpty, orderBy } from "lodash";
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

const CardAnimated = memo(
  ({
    card,
    onToggle,
    disabled,
  }: {
    card: CardType;
    onToggle: (id: string, isDisabled: boolean) => void;
    disabled: boolean;
  }) => (
    <motion.div
      aria-disabled={disabled}
      animate={disabled ? "disabled" : "active"}
      variants={variants}
      onClick={() => onToggle(card.id, disabled)}
    >
      <Card card={card} compact />
    </motion.div>
  )
);

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

  const handleToggleCard = useCallback(
    (id: string, isDisabled: boolean) => {
      if (isDisabled) {
        delDisabledCardId(id);
      } else {
        addDisabledCardId(id);
      }
    },
    [addDisabledCardId, delDisabledCardId]
  );

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
    <div className="flex flex-col w-full min-h-0">
      <Toolbar.Root className="flex items-center gap-2 z-10 bg-neutral-800 pt-3">
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
      <div className="h-6 outline-0 shrink-0 -mb-3 bg-gradient-to-b from-50% from-neutral-800/100 to-neutral-800/0 z-10" />
      <div className="relative h-[70dvh] overflow-y-auto flex flex-col py-5 pr-2.5 -mr-2.5">
        {isEmpty(displayedCards) ? (
          <div className="grow flex justify-center items-center">
            <span className="text-neutral-400 text-center">
              {"No cards found :("}
            </span>
          </div>
        ) : (
          <div className="grid grid-cols-1 min-[22rem]:grid-cols-2 min-[35rem]:grid-cols-3 gap-2">
            {displayedCards.map((card) => (
              <CardAnimated
                key={card.id}
                card={card}
                onToggle={handleToggleCard}
                disabled={includes(disabledCardIds, card.id)}
              />
            ))}
          </div>
        )}
      </div>
      <div className="h-6 outline-0 shrink-0 -mt-3 bg-gradient-to-t from-50% from-neutral-800/100 to-neutral-800/0 z-10" />
    </div>
  );
});
