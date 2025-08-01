import { motion } from "motion/react";

type Props = {
  onClick: () => void;
};

export const DrawButton = ({ onClick }: Props) => {
  return (
    <motion.button
      onClick={onClick}
      initial={{ scale: 1 }}
      whileTap={{ scale: 0.9 }}
      className="flex items-center px-4 py-2 h-12 rounded-2xl shadow-lg bg-gradient-to-t from-sky-600 to-sky-500 text-2xl text-neutral-50 font-extrabold cursor-pointer"
    >
      DRAW
    </motion.button>
  );
};
