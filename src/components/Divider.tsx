import clsx from "clsx";
import { memo } from "react";

type Props = {
  vertical?: boolean;
};

export const Divider = memo(({ vertical }: Props) => {
  return (
    <div
      className={clsx(
        "bg-neutral-500 border-transparent",
        vertical ? "w-px h-[inherit]" : "h-px w-[inherit]"
      )}
    />
  );
});
