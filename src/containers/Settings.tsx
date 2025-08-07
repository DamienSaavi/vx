import { Button } from "../components/Button";
import { TextField } from "../components/TextField";
import { Tier } from "../components/Tier";
import { DEFAULT_TIER_PROBABILITY, useSettings } from "../hooks/useSettings";
import { useDisabledCards } from "../hooks/useDisabledCards";
import type { CardTier } from "../models/types";
import { clamp, isEqual, toInteger } from "lodash";
import { RiResetLeftLine } from "react-icons/ri";

type Props = {
  onOpenEditDeckModal: () => void;
};

export const Settings = ({ onOpenEditDeckModal }: Props) => {
  const { tierProbabilities, setTierProbability, resetSettings } =
    useSettings();
  const { disabledCardIds } = useDisabledCards();

  const handleTierChange = (tier: CardTier) => {
    return (value: string) =>
      setTierProbability(tier, clamp(toInteger(value), 1, 999));
  };

  return (
    <div className="relative max-h-[80dvh] h-fit py-5 px-1.5 pr-5 -mr-2.5 overflow-y-auto">
      <div className="flex flex-col gap-6">
        <div>
          <div className="flex gap-3 pb-3 items-center">
            <div>
              <h3 className="text-lg font-bold">Card Draw Probabilities</h3>
              <p className="text-neutral-400 text-sm font-light">
                The higher the value, the higher the probability of that tier of
                card being drawn.
              </p>
            </div>
            {!isEqual(tierProbabilities, DEFAULT_TIER_PROBABILITY) && (
              <Button
                size="lg"
                variant="text"
                color="danger"
                label="Reset to Default"
                onClick={resetSettings}
              >
                <RiResetLeftLine />
              </Button>
            )}
          </div>
          <div className="flex flex-col gap-2 items-stretch">
            <label className="flex justify-between items-center gap-2">
              <span className="flex items-center gap-1">
                <Tier size="sm" tier={1} /> Common
              </span>
              <TextField
                autoSelect
                size="sm"
                fullWidth={false}
                width={4}
                textCenter
                min={1}
                inputMode="numeric"
                type="number"
                value={tierProbabilities[1]}
                onValueChange={handleTierChange(1)}
              />
            </label>
            <label className="flex justify-between items-center gap-2">
              <span className="flex items-center gap-1">
                <Tier size="sm" tier={2} /> Uncommon
              </span>
              <TextField
                autoSelect
                size="sm"
                fullWidth={false}
                width={4}
                textCenter
                min={1}
                inputMode="numeric"
                type="number"
                value={tierProbabilities[2]}
                onValueChange={handleTierChange(2)}
              />
            </label>
            <label className="flex justify-between items-center gap-2">
              <span className="flex items-center gap-1">
                <Tier size="sm" tier={3} /> Rare
              </span>
              <TextField
                autoSelect
                size="sm"
                fullWidth={false}
                width={4}
                textCenter
                min={1}
                inputMode="numeric"
                type="number"
                value={tierProbabilities[3]}
                onValueChange={handleTierChange(3)}
              />
            </label>
            <label className="flex justify-between items-center gap-2">
              <span className="flex items-center gap-1">
                <Tier size="sm" tier={0} /> Helper
              </span>
              <TextField
                autoSelect
                size="sm"
                fullWidth={false}
                width={4}
                textCenter
                min={1}
                inputMode="numeric"
                type="number"
                value={tierProbabilities[0]}
                onValueChange={handleTierChange(0)}
              />
            </label>
          </div>
        </div>

        <div className="flex gap-3">
          <div className="grow min-w-min">
            <h3 className="text-md font-bold">Edit Deck</h3>
            <p className="text-neutral-400 text-xs font-light">
              Select the cards you wish to avoid.
            </p>
          </div>
          <div className="flex flex-col items-center grow-0 gap-1">
            <Button
              size="sm"
              wrap
              color="secondary"
              onClick={onOpenEditDeckModal}
            >
              Enable/Disable Cards
            </Button>
            {disabledCardIds.length > 0 && (
              <span className="text-xs text-neutral-400">
                {disabledCardIds.length} cards disabled
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
