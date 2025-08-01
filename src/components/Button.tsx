import colors from "tailwindcss/colors";
import { memo, type JSX, type PropsWithChildren } from "react";
import clsx from "clsx";
import { motion } from "motion/react";

type Color = "primary" | "secondary" | "danger";
type Variant = "filled" | "outlined" | "text";
type Shape = "square" | "round";
type Size = "sm" | "md" | "lg";

type Props = PropsWithChildren & {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  label?: string;
  startIcon?: JSX.Element;
  endIcon?: JSX.Element;
  variant?: Variant;
  disabled?: boolean;
  size?: Size;
  color?: Color;
  shape?: Shape;
  ref?: React.Ref<HTMLButtonElement>;
};

const colorsMap: Record<Color, Record<Variant, string>> = {
  primary: {
    filled: [colors.sky[700], colors.sky[600]].join(","),
    outlined: colors.sky[400],
    text: colors.sky[400],
  },
  secondary: {
    filled: [colors.slate[700], colors.slate[600]].join(","),
    outlined: colors.slate[400],
    text: colors.slate[400],
  },
  danger: {
    filled: [colors.red[700], colors.red[600]].join(","),
    outlined: colors.red[400],
    text: colors.red[400],
  },
};

export const Button = memo(
  ({
    children,
    onClick,
    label,
    startIcon,
    endIcon,
    disabled,
    variant = "filled",
    size = "md",
    color = "primary",
    shape = "square",
    ref,
  }: Props) => {
    const getStyles = (): React.CSSProperties => {
      switch (variant) {
        case "outlined":
          return {
            color: colorsMap[color][variant],
            borderColor: colorsMap[color][variant],
          };
        case "text":
          return {
            color: colorsMap[color][variant],
            border: "none",
          };
        default:
          return {
            borderWidth: 0,
            borderColor: "transparent",
            backgroundImage: `linear-gradient(0deg,${colorsMap[color][variant]})`,
          };
      }
    };

    return (
      <motion.button
        ref={ref}
        disabled={disabled}
        aria-label={label}
        onClick={onClick}
        initial={{ scale: 1 }}
        whileTap={{ scale: 0.9 }}
        className={clsx(
          "flex items-center gap-2 cursor-pointer font-semibold border pointer-events-auto",
          shape === "square" ? "rounded-lg px-3 py-2" : "rounded-full p-2",
          size === "sm" ? "text-sm" : size === "lg" ? "text-2xl" : "text-base"
        )}
        style={getStyles()}
      >
        {startIcon}
        {children}
        {endIcon}
      </motion.button>
    );
  }
);
