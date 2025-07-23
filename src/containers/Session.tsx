import { HitMeButton } from "../components/HitMeButton";
import { CurrentHand } from "./CurrentHand";
import { CurrentCardsList } from "./CurrentCardsList";
import { useCallback, useMemo, useState } from "react";
import { filter, find, includes, inRange, random, sortBy, union } from "lodash";
import { CARDS } from "../utils/consts/cards";
import { Button } from "../components/Button";
import { LuSettings2 } from "react-icons/lu";
import { TbCardsFilled } from "react-icons/tb";
import { Settings } from "./Settings";
import { FullDeck } from "./FullDeck";
import { Modal } from "../components/Modal";
import colors from "tailwindcss/colors";
import { useSessionData } from "../hooks/useSessionData";
import type { Card } from "../models/types";

export const Session = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isFullDeckOpen, setIsFullDeckOpen] = useState(false);
  const { disabledCardIds, activeCardIds, setActiveCardIds } = useSessionData();

  const cards = useMemo(
    () =>
      sortBy(activeCardIds.map((id) => CARDS.find((c) => c.id === id))).filter(
        Boolean
      ) as Card[],
    [activeCardIds]
  );

  const options = useMemo(() => {
    const excludedSetIds = cards.map((card) => card.setId).filter(Boolean);
    const excludedCards = union(activeCardIds, disabledCardIds);
    return filter(
      CARDS,
      (card) =>
        !includes(excludedSetIds, card.setId) &&
        !includes(excludedCards, card.id)
    );
  }, [cards, activeCardIds, disabledCardIds]);

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
          cursor += 3;
          break;
        case 3:
          cursor += 1;
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

    setActiveCardIds(activeCardIds.concat(selectedCardId));
  }, [activeCardIds, options, setActiveCardIds]);

  const handleDiscard = useCallback(
    (id: string) => setActiveCardIds(activeCardIds.filter((_id) => _id !== id)),
    [activeCardIds, setActiveCardIds]
  );

  const handleClear = useCallback(
    () => setActiveCardIds([]),
    [setActiveCardIds]
  );

  return (
    <div className="relative w-screen flex flex-col items-stretch bg-neutral-900">
      <div className="flex justify-between p-4 pb-0">
        <Button
          size="lg"
          variant="outlined"
          color="secondary"
          shape="round"
          onClick={() => setIsFullDeckOpen((p) => !p)}
        >
          <TbCardsFilled color={colors.slate[300]} />
        </Button>
        <Button
          size="lg"
          variant="outlined"
          color="secondary"
          shape="round"
          onClick={() => setIsSettingsOpen((p) => !p)}
        >
          <LuSettings2 color={colors.slate[300]} />
        </Button>
      </div>
      <div className="flex items-center h-[calc(100dvh-210px)] w-full z-0">
        <CurrentHand cards={cards} onDiscard={handleDiscard} />
      </div>
      <div className="z-20">
        <div className="flex items-center justify-center py-6 px-3 gap-4">
          <HitMeButton onClick={handleDraw} />
        </div>
        <div>
          <CurrentCardsList
            cards={cards}
            onDiscard={handleDiscard}
            onClear={handleClear}
          />
        </div>
      </div>
      <Modal open={isSettingsOpen} setOpen={setIsSettingsOpen} title="Settings">
        <Settings />
      </Modal>
      <Modal
        open={isFullDeckOpen}
        setOpen={setIsFullDeckOpen}
        title="All Cards"
      >
        <FullDeck />
      </Modal>
    </div>
  );
};
