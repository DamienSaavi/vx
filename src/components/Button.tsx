import colors from "tailwindcss/colors";
import { memo, type JSX, type PropsWithChildren } from "react";

type Color = "primary" | "secondary" | "danger";
type Variant = "filled" | "outlined" | "text";
type Size = "sm" | "md" | "lg";

type Props = PropsWithChildren & {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  label?: string;
  startIcon?: JSX.Element;
  endIcon?: JSX.Element;
  variant?: Variant;
  size?: Size;
  color?: Color;
  ref?: React.Ref<HTMLButtonElement>;
};

const colorsMap: Record<Color, string> = {
  primary: colors.sky[600],
  secondary: colors.slate[600],
  danger: colors.red[600],
};

export const Button = memo(
  ({
    children,
    onClick,
    label,
    startIcon,
    endIcon,
    variant = "filled",
    // size = "md",
    color = "primary",
    ref,
  }: Props) => {
    const getStyles = (): React.CSSProperties => {
      switch (variant) {
        case "outlined":
          return {
            color: colorsMap[color],
            borderColor: colorsMap[color],
          };
        case "text":
          return {
            color: colorsMap[color],
            border: "none",
          };
        default:
          return {
            borderColor: "transparent",
            backgroundColor: colorsMap[color],
          };
      }
    };

    return (
      <button
        ref={ref}
        aria-label={label}
        onClick={onClick}
        className="flex items-center gap-2 cursor-pointer px-3 py-2 rounded-lg font-semibold border pointer-events-auto"
        style={getStyles()}
      >
        {startIcon}
        {children}
        {endIcon}
      </button>
    );
  }
);
