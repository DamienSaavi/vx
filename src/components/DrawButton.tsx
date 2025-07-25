import { motion } from "motion/react";

type Props = {
  onClick: () => void;
};

export const HitMeButton = ({ onClick }: Props) => {
  return (
    <motion.button
      onClick={onClick}
      initial={{ scale: 1 }}
      whileTap={{ scale: 1.1 }}
      className=" flex items-center gap-0 px-4 py-2 h-12 rounded-xl shadow-lg bg-lime-600 text-lg text-neutral-50 font-bold cursor-pointer"
    >
      DRAW
    </motion.button>
  );
};
