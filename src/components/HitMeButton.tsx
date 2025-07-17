import { motion } from "motion/react";
import { GiRollingDices } from "react-icons/gi";

type Props = {
  onClick: () => void;
};

export const HitMeButton = ({ onClick }: Props) => {
  return (
    <motion.button
      onClick={onClick}
      initial={{ scale: 1 }}
      whileTap={{ scale: 1.1 }}
      className=" flex items-center gap-2 px-3 py-2 h-12 rounded-xl shadow-lg bg-lime-600 text-neutral-50 font-bold cursor-pointer"
    >
      <GiRollingDices fontSize={32} />
      HIT ME!
    </motion.button>
  );
};
