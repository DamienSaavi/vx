import { toSafeInteger } from "lodash";
import { useState } from "react";
import { TextField } from "../components/TextField";

export const Settings = () => {
  const [handSizeInput, setHandSizeInput] = useState(5);

  const handleValueChange = (value: string) => {
    setHandSizeInput(toSafeInteger(value));
  };

  return (
    <div className="flex gap-4 w-full justify-between items-start py-3">
      <div>
        <span className="block text-md">Hand Size</span>
        <span className="block text-sm text-neutral-500">
          Maximum number of cards in hand.
        </span>
      </div>
      <TextField
        placeholder="5"
        type="number"
        inputMode="numeric"
        value={handSizeInput}
        min={1}
        max={32}
        textCenter
        fullWidth={false}
        onValueChange={(v) => handleValueChange(v)}
      />
    </div>
  );
};
