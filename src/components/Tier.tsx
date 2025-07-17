import clsx from "clsx";
import { ROMAN_NUMERALS } from "../utils/consts/cards";

type Props = {
  tier: number;
  size?: "sm" | "md";
};

const colorMap: Record<number, string> = {
  1: "text-emerald-600, bg-emerald-600",
  2: "text-blue-500, bg-blue-500",
  3: "text-amber-500, bg-amber-500",
};

const sizeMap: Record<string, string> = {
  sm: "text-[8px] w-4 h-4",
  md: "text-base w-7 h-7 text-shadow-sm",
};

export const Tier = ({ tier, size = "md" }: Props) => {
  return (
    <span
      className={clsx(
        "block font-serif font-bold text-white text-center rounded-full opacity-80 p-0.5",
        colorMap[tier],
        sizeMap[size],
      )}
    >
      {ROMAN_NUMERALS[tier]}
    </span>
  );
};
