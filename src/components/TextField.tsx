import { Input } from "@base-ui-components/react";
import clsx from "clsx";
import { memo, type PropsWithChildren, type ReactNode } from "react";

type Props = PropsWithChildren & {
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
  size?: "sm" | "md" | "lg";
  inputMode?:
    | "email"
    | "search"
    | "tel"
    | "text"
    | "url"
    | "numeric"
    | "none"
    | "decimal";
  min?: number;
  max?: number;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  textCenter?: boolean;
  fullWidth?: boolean;
  autoSelect?: boolean;
  width?: number;
  value?: string | number;
  onValueChange?: (value: string, event: Event) => void;
};

export const TextField = memo(
  ({
    placeholder,
    type,
    size = "md",
    inputMode,
    min,
    max,
    textCenter,
    autoSelect = false,
    fullWidth = true,
    width = 2,
    value,
    onValueChange,
  }: Props) => (
    <Input
      placeholder={placeholder}
      type={type}
      inputMode={inputMode}
      value={value}
      min={min}
      max={max}
      onFocus={autoSelect ? (e) => e.target.select() : undefined}
      className={clsx(
        "min-w-0 bg-neutral-700 border px-3 border-neutral-600 rounded-lg no-spinner outline-0 focus:outline focus:border-slate-500 focus:outline-slate-500",
        textCenter && "text-center",
        fullWidth ? "grow" : "",
        size === "sm"
          ? "min-h-8 text-sm"
          : size === "lg"
          ? "min-h-12"
          : "min-h-10"
      )}
      style={{ width: width ? `${width}rem` : "auto" }}
      onValueChange={onValueChange}
    />
  )
);
