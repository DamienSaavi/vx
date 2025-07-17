import clsx from "clsx";
import { Card } from "../components/Card";
import { CARDS } from "../utils/consts/cards";

type Props = {
  disabledCardIds: string[];
  onToggleCard: (id: string) => void;
};

export const FullDeck = ({ disabledCardIds, onToggleCard }: Props) => {
  return (
    <div className="grid grid-cols-2 gap-3 px-3">
      {CARDS.map((card) => (
        <div
          key={card.id}
          onClick={() => onToggleCard(card.id)}
          className={clsx(
            disabledCardIds.includes(card.id) && "bg-neutral-500"
          )}
        >
          <Card card={card} />
        </div>
      ))}
    </div>
  );
};
