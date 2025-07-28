import { HitMeButton } from "../components/DrawButton";
import { CurrentHand } from "./CurrentHand";
import { CurrentCardsList } from "./CurrentCardsList";
import { useCallback, useMemo, useState } from "react";
import { filter, find, includes, inRange, random, sortBy, union } from "lodash";
import { CARDS, TIER_PROBABILITY } from "../utils/consts/cards";
import { Button } from "../components/Button";
import { TbCardsFilled } from "react-icons/tb";
import colors from "tailwindcss/colors";
import { EditCards } from "./EditCards";
import { Modal } from "../components/Modal";
import type { Card } from "../models/types";
import { ResetSessionConfirmation } from "./ResetSessionConfirmation";
import { RiResetLeftLine } from "react-icons/ri";
import { useSessionData } from "../hooks/useSessionData";
import { TbPlayCardOff } from "react-icons/tb";
import { TbList } from "react-icons/tb";
import { AnimatePresence, motion } from "motion/react";
export const Session = () => {
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [isEditCardsModalOpen, setIsEditCardsModalOpen] = useState(false);
  const {
    disabledCardIds,
    activeCardIds,
    viewMode,
    setActiveCardIds,
    setViewMode,
  } = useSessionData();

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
      cursor += TIER_PROBABILITY[option.tier];
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

  const handleToggleView = useCallback(() => {
    const newValue = viewMode === "cards" ? "list" : "cards";
    setViewMode(newValue);
  }, [setViewMode, viewMode]);

  return (
    <div className="relative w-screen flex flex-col min-h-0 h-dvh max-h-dvh items-stretch bg-neutral-900">
      <div className="flex grow-0 shrink-0 justify-between p-4">
        <Button
          size="lg"
          variant="outlined"
          color="secondary"
          shape="round"
          label="Modify Deck"
          onClick={() => setIsEditCardsModalOpen((p) => !p)}
        >
          <TbPlayCardOff color={colors.slate[300]} />
        </Button>
        <Button
          size="lg"
          variant="outlined"
          color="secondary"
          shape="round"
          label="Reset"
          onClick={() => setIsResetModalOpen((p) => !p)}
        >
          <RiResetLeftLine color={colors.slate[300]} />
        </Button>
      </div>
      <div className="flex flex-col grow min-h-0 h-0 items-center w-full">
        {viewMode === "cards" ? (
          <CurrentHand cards={cards} onDiscard={handleDiscard} />
        ) : (
          <CurrentCardsList cards={cards} onDiscard={handleDiscard} />
        )}
      </div>
      <div className="relative flex items-center justify-center shrink-0 grow-0 pb-6 pt-4 px-3 gap-4">
        <div className="absolute left-5">
          <Button
            variant="text"
            size="lg"
            label="Toggle View"
            color="secondary"
            onClick={handleToggleView}
          >
            <AnimatePresence>
              {viewMode === "cards" ? (
                <motion.div
                  key="cards-view"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ position: "absolute", x: 20, opacity: 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                >
                  <TbCardsFilled color={colors.slate[300]} />
                </motion.div>
              ) : (
                <motion.div
                  key="list-view"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ position: "absolute", x: -20, opacity: 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                >
                  <TbList color={colors.slate[300]} />
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
        </div>
        <HitMeButton onClick={handleDraw} />
      </div>

      <Modal
        open={isResetModalOpen}
        setOpen={setIsResetModalOpen}
        title="Reset"
        maxWidth="28rem"
      >
        <ResetSessionConfirmation onClose={() => setIsResetModalOpen(false)} />
      </Modal>
      <Modal
        open={isEditCardsModalOpen}
        setOpen={setIsEditCardsModalOpen}
        title="Modify Deck"
      >
        <EditCards />
      </Modal>
    </div>
  );
};
