import { memo } from "react";
import type { Card as CardType } from "../models/types";
import { Tier } from "./Tier";

type Props = {
  card: CardType;
};

export const Card = memo(({ card }: Props) => {
  return (
    <div className="flex flex-col justify-center gap-2 text-neutral-900 bg-neutral-50 border border-neutral-200 rounded-2xl shadow-md p-2 relative min-h-0 aspect-2/3">
      <h6 className="font-bold text-center">{card.name}</h6>
      <p className="text-xs text-center">{card.description}</p>
      <div className="absolute top-1 left-1">
        <Tier tier={card.tier} />
      </div>
      <div className="absolute bottom-1 right-1">
        <Tier tier={card.tier} />
      </div>
    </div>
  );
});
