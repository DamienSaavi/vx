import { memo } from "react";
import { Button } from "../components/Button";
import { useActiveCards } from "../hooks/useActiveCards";

type Props = {
  onClose: () => void;
};

export const ResetSessionConfirmation = memo(({ onClose }: Props) => {
  const { clearActiveCardIds } = useActiveCards();

  const handleConfirm = () => {
    clearActiveCardIds();
    onClose();
  };

  return (
    <div className="flex flex-col px-1 py-3 gap-4">
      <p className="text-neutral-400">
        Clear all cards and restart session. (Disabled cards will remain
        unchanged.)
      </p>
      <div className="flex gap-2 self-end">
        <Button variant="text" color="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button color="danger" onClick={handleConfirm}>
          Reset
        </Button>
      </div>
    </div>
  );
});
