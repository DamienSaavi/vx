type CardTier = 1 | 2 | 3;

interface BaseCard {
  id: string;
  name: string;
  description: string;
  tier: CardTier;
  setId?: string;
}

export interface CardSet {
  id: string;
  cardIds: string[];
}

export type Card = BaseCard;
