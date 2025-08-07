import { useCallback } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../models/db";
import type { CardTier, TierProbabilities, ViewMode } from "../models/types";

export const DEFAULT_TIER_PROBABILITY: TierProbabilities = {
  0: 5,
  1: 8,
  2: 3,
  3: 1,
};

export const useSettings = () => {
  const viewMode = useLiveQuery(async () => {
    const data = await db.settings.get("viewMode");
    return (data?.value || "cards") as ViewMode;
  });

  const tierProbabilities = useLiveQuery(async () => {
    const data = await db.settings.get("tierProbabilities");
    return (data?.value || DEFAULT_TIER_PROBABILITY) as TierProbabilities;
  });

  const setViewMode = useCallback(async (viewMode: ViewMode) => {
    await db.settings.put({ key: "viewMode", value: viewMode }, "viewMode");
  }, []);

  const setTierProbability = useCallback(
    async (tier: CardTier, probability: number) => {
      const newTierProbabilities = {
        ...DEFAULT_TIER_PROBABILITY,
        ...tierProbabilities,
      };

      newTierProbabilities[tier] = probability;
      await db.settings.put(
        { key: "tierProbabilities", value: newTierProbabilities },
        "tierProbabilities"
      );
    },
    [tierProbabilities]
  );

  const resetSettings = useCallback(async () => {
    await db.settings.put(
      { key: "tierProbabilities", value: DEFAULT_TIER_PROBABILITY },
      "tierProbabilities"
    );
  }, []);

  return {
    viewMode: viewMode || "cards",
    tierProbabilities: tierProbabilities || DEFAULT_TIER_PROBABILITY,
    setViewMode,
    setTierProbability,
    resetSettings,
  };
};
