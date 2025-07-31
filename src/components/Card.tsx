import { memo } from "react";
import type { Card as CardType } from "../models/types";
import { Tier } from "./Tier";
import clsx from "clsx";

type Props = {
  card: CardType;
  compact?: boolean;
};

export const Card = memo(({ card, compact }: Props) => {
  return (
    <div className="flex flex-col gap-2 justify-center text-neutral-900 bg-neutral-50 border border-neutral-200 rounded-2xl shadow-md p-2 relative min-h-0 aspect-2/3">
      <h6
        className={clsx(
          "font-extrabold font-serif text-center",
          compact ? "text-xl/5" : "text-2xl/6"
        )}
      >
        {card.name}
      </h6>
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
