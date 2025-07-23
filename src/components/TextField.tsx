import { Input } from "@base-ui-components/react";
import clsx from "clsx";
import { memo, type PropsWithChildren, type ReactNode } from "react";

type Props = PropsWithChildren & {
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
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
  width?: number;
  value?: string | number;
  onValueChange?: (value: string, event: Event) => void;
};

export const TextField = memo(
  ({
    placeholder,
    type,
    inputMode,
    min,
    max,
    textCenter,
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
      className={clsx(
        "select-all min-h-12 w-auto min-w-12 px-3 bg-neutral-700 border border-neutral-600 rounded-lg no-spinner outline-0 focus:outline focus:border-slate-500 focus:outline-slate-500",
        textCenter && "text-center",
        fullWidth ? "grow" : width ? `w-[${width}rem]` : ""
      )}
      onValueChange={onValueChange}
    />
  )
);
