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
        "flex flex-col justify-center bg-gradient-to-t from-neutral-200 to-white border border-neutral-300 rounded-2xl shadow-md relative min-h-0 aspect-2/3",
        compact ? "p-2 gap-2" : "p-4 gap-4"
      )}
    >
      <h6
        className={clsx(
          "font-extrabold font-serif text-center text-shadow-sm text-neutral-800",
          compact ? "text-xl/6" : "text-3xl/8"
        )}
      >
        {card.name}
      </h6>
      <p
        className={clsx(
          "text-center leading-4.5 text-neutral-600",
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
