import { DrawButton } from "../components/DrawButton";
import { CurrentHand } from "./CurrentHand";
import { CurrentCardsList } from "./CurrentCardsList";
import { useCallback, useMemo, useState } from "react";
import { filter, find, includes, isEmpty, random, union } from "lodash";
import { CARDS, TIER_PROBABILITY } from "../utils/consts/cards";
import { Button } from "../components/Button";
import { TbCardsFilled } from "react-icons/tb";
import colors from "tailwindcss/colors";
import { EditCards } from "./EditCards";
import { Modal } from "../components/Modal";
import type { Card } from "../models/types";
import { ResetSessionConfirmation } from "./ResetSessionConfirmation";
import { RiResetLeftLine } from "react-icons/ri";
import { TbPlayCardOff } from "react-icons/tb";
import { TbList } from "react-icons/tb";
import { AnimatePresence, motion } from "motion/react";
import { TiInfoLarge } from "react-icons/ti";
import { Info } from "./Info";
import { Badge } from "../components/Badge";
import { useDisabledCards } from "../hooks/useDisabledCards";
import { useActiveCards } from "../hooks/useActiveCards";
import { useSettings } from "../hooks/useSettings";
export const Session = () => {
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [isEditCardsModalOpen, setIsEditCardsModalOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const { activeCardIds, addActiveCardId, delActiveCardId } = useActiveCards();
  const { disabledCardIds } = useDisabledCards();
  const { viewMode, setViewMode } = useSettings();

  const cards = useMemo(() => {
    return activeCardIds
      .map((id) => CARDS.find((c) => c.id === id))
      .filter(Boolean) as Card[];
  }, [activeCardIds]);

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
      cursor += 1;
    }

    const targetPosition = random(0, cursor - 1, false);
    const selectedCardId = find(probabilityField, (item) => {
      const [, range] = item;
      const [from, to] = range;
      return targetPosition >= from && targetPosition <= to;
    })?.[0];

    if (!selectedCardId) {
      throw new Error("Failed to pick card ID.");
    }

    addActiveCardId(selectedCardId);
  }, [addActiveCardId, options]);

  const handleDiscard = useCallback(
    (id: string) => delActiveCardId(id),
    [delActiveCardId]
  );

  const handleToggleView = useCallback(() => {
    const newValue = viewMode === "cards" ? "list" : "cards";
    setViewMode(newValue);
  }, [setViewMode, viewMode]);

  return (
    <div className="relative w-screen flex flex-col min-h-0 h-dvh max-h-dvh items-stretch bg-neutral-900">
      <div className="flex grow-0 shrink-0 justify-between p-4">
        <Badge
          content={
            disabledCardIds.length
              ? disabledCardIds.length.toString()
              : undefined
          }
        >
          <Button
            size="lg"
            variant="outlined"
            color="secondary"
            shape="round"
            label="Modify Deck"
            onClick={() => setIsEditCardsModalOpen((p) => !p)}
          >
            <TbPlayCardOff size={28} color={colors.slate[300]} />
          </Button>
        </Badge>
        <Button
          size="lg"
          variant="outlined"
          color="secondary"
          shape="round"
          label="Reset"
          onClick={() => setIsInfoModalOpen((p) => !p)}
        >
          <TiInfoLarge size={28} color={colors.slate[300]} />
        </Button>
      </div>
      <div className="flex flex-col grow min-h-0 h-0 items-center w-full">
        {viewMode === "cards" ? (
          <CurrentHand cards={cards} onDiscard={handleDiscard} />
        ) : (
          <CurrentCardsList cards={cards} onDiscard={handleDiscard} />
        )}
      </div>
      <div className="relative flex items-center justify-center shrink-0 grow-0 pb-10 pt-4 px-3 gap-4">
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
        <DrawButton onClick={handleDraw} outOfCards={isEmpty(options)} />
        <div className="absolute right-5">
          <Button
            size="lg"
            variant="text"
            color="danger"
            shape="round"
            label="Reset"
            onClick={() => setIsResetModalOpen((p) => !p)}
          >
            <RiResetLeftLine />
          </Button>
        </div>
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
      <Modal open={isInfoModalOpen} setOpen={setIsInfoModalOpen} title="Info">
        <Info />
      </Modal>
    </div>
  );
};
