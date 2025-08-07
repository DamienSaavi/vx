export type CardTier = 1 | 2 | 3 | 0;

export type Card = {
  id: string;
  name: string;
  description: string;
  tier: CardTier;
  setId?: string;
};

export type ViewMode = "cards" | "list";
export type TierProbabilities = Record<CardTier, number>;

export type Setting = { key: string; value: unknown };
export type ActiveCard = { id: string; idx?: number };
export type DisabledCard = { id: string };
