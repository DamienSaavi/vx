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
    <div
      className={clsx(
        "flex flex-col justify-center text-neutral-900 bg-neutral-50 border border-neutral-200 rounded-2xl shadow-md relative min-h-0 aspect-2/3",
        compact ? "p-2 gap-2" : "p-4 gap-4"
      )}
    >
      <h6
        className={clsx(
          "font-extrabold font-serif text-center",
          compact ? "text-xl/5" : "text-3xl/6"
        )}
      >
        {card.name}
      </h6>
      <p
        className={clsx(
          "text-center leading-4.5",
          compact ? "text-sm" : "text-sm"
        )}
      >
        {card.description}
      </p>
      <div className="absolute top-1 left-1">
        <Tier tier={card.tier} />
      </div>
      <div className="absolute bottom-1 right-1">
        <Tier tier={card.tier} />
      </div>
    </div>
  );
});
