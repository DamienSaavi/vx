import {
  TbHexagonNumber1Filled,
  TbHexagonNumber2Filled,
  TbHexagonNumber3Filled,
  TbCampfireFilled,
} from "react-icons/tb";
import { memo } from "react";
import colors from "tailwindcss/colors";

type Props = {
  tier: number;
  size?: "sm" | "md";
};

const colorMap: Record<number, string> = {
  0: colors.orange[500],
  1: colors.emerald[500],
  2: colors.blue[500],
  3: colors.amber[500],
};

const sizeMap: Record<string, number> = {
  sm: 18,
  md: 38,
};

const getIcon = (tier: number) => {
  switch (tier) {
    case 1:
      return TbHexagonNumber1Filled;
    case 2:
      return TbHexagonNumber2Filled;
    case 3:
      return TbHexagonNumber3Filled;
    default:
      return TbCampfireFilled;
  }
};

export const Tier = memo(({ tier, size = "md" }: Props) => {
  const Icon = getIcon(tier);

  return (
    <div>
      <Icon fontSize={sizeMap[size]} color={colorMap[tier]} />
    </div>
  );
});
