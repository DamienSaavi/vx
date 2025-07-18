import { HitMeButton } from "../components/HitMeButton";
import { CurrentHand } from "./CurrentHand";
import { CurrentCardsList } from "./CurrentCardsList";
import { useCallback, useMemo, useRef, useState } from "react";
import { filter, find, includes, inRange, map, random, union } from "lodash";
import { CARDS } from "../utils/consts/cards";
import type { Card } from "../models/types";

export const Session = () => {
  const handRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [cards, setCards] = useState<Card[]>([]);
  const [disabledCardIds] = useState<string[]>([]);

  const options = useMemo(() => {
    const excludedSetIds = cards.map((card) => card.setId).filter(Boolean);
    const excludedCards = union(
      map(cards, ({ id }) => id),
      disabledCardIds
    );
    return filter(
      CARDS,
      (card) =>
        !includes(excludedSetIds, card.setId) &&
        !includes(excludedCards, card.id)
    );
  }, [cards, disabledCardIds]);

  const handleDraw = useCallback(() => {
    const probabilityField: [string, [number, number]][] = [];

    let cursor = 0;
    for (let i = 0; i < options.length; i++) {
      const option = options[i];
      const prevCursor = cursor;
      switch (option.tier) {
        case 1:
          cursor += 7;
          break;
        case 2:
          cursor += 4;
          break;
        case 3:
          cursor += 2;
          break;
        default:
          cursor += 7;
          break;
      }
      probabilityField.push([option.id, [prevCursor, cursor]]);
    }

    const targetPosition = random(0, cursor - 1, false);
    const selectedCardId = find(probabilityField, (item) => {
      const [, range] = item;
      const [from, to] = range;
      return inRange(targetPosition, from, to);
    })?.[0];

    if (!selectedCardId) {
      throw new Error("Failed to pick card ID.");
    }

    const selectedCard = find(
      options,
      (option) => option.id === selectedCardId
    );

    if (!selectedCard) {
      throw new Error("Failed to pick card ID.");
    }

    setCards((prev) => prev.concat(selectedCard));
  }, [options]);

  const handleDiscard = useCallback(
    (id: string) => setCards((prev) => prev.filter((card) => card.id !== id)),
    []
  );

  const handleClear = useCallback(() => setCards([]), []);

  return (
    <div className="relative w-screen flex flex-col items-stretch bg-neutral-900 select-none">
      <div ref={handRef} className="h-[calc(100dvh-160px)] w-full" />
      <div className="flex items-center absolute h-[calc(100dvh-160px)] w-full z-0">
        <CurrentHand cards={cards} onDiscard={handleDiscard} />
      </div>
      <div className="z-20">
        <div className="flex items-center justify-center py-6 px-3 gap-4">
          <HitMeButton onClick={handleDraw} />
        </div>
        <div ref={listRef}>
          <CurrentCardsList
            cards={cards}
            onDiscard={handleDiscard}
            onClear={handleClear}
          />
        </div>
      </div>
    </div>
  );
};
