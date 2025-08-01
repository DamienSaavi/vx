import { motion } from "motion/react";
import { memo } from "react";

type Props = {
  onClick: () => void;
  outOfCards?: boolean;
};

export const DrawButton = memo(({ onClick, outOfCards }: Props) =>
  outOfCards ? (
    <span className="min-h-12 text-sm opacity-60 max-w-1/2 text-center flex items-center justify-center">
      No more cards available to draw
    </span>
  ) : (
    <motion.button
      onClick={onClick}
      initial={{ scale: 1 }}
      whileTap={{ scale: 0.9 }}
      disabled={outOfCards}
      className="flex items-center px-4 py-2 min-h-12 rounded-2xl shadow-lg bg-gradient-to-t from-sky-600 to-sky-500 disabled:from-neutral-600 disabled:to-neutral-500 disabled:opacity-60 disabled:text-lg max-w-[50dvw] text-2xl text-neutral-50 font-extrabold cursor-pointer"
    >
      DRAW
    </motion.button>
  )
);
