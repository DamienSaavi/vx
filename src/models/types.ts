type CardTier = 1 | 2 | 3;

type ActiveCardIdsData = {
  activeCardIds: string[];
};

type DisabledCardIdsData = {
  disabledCardIds: string[];
};

export type Card = {
  id: string;
  name: string;
  description: string;
  tier: CardTier;
  setId?: string;
};

export type SessionData = ActiveCardIdsData & DisabledCardIdsData;

//======= DB TYPES =======
export type CardItem = Card;
export type SessionDataItem =
  | { key: keyof ActiveCardIdsData; value: ActiveCardIdsData["activeCardIds"] }
  | {
      key: keyof DisabledCardIdsData;
      value: DisabledCardIdsData["disabledCardIds"];
    };
// | {
//     key: "disabledCardIds";
//     value: string[];
//   }
// | {
//     key: "activeCardIds";
//     value: string;
//   };
