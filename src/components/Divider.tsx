import clsx from "clsx";
import { memo } from "react";

type Props = {
  vertical?: boolean;
  px?: number;
  py?: number;
};

export const Divider = memo(({ vertical, px = 0, py = 0 }: Props) => {
  return (
    <div
      className={clsx(
        "bg-neutral-600 border-transparent shrink-0",
        vertical ? "w-px h-[inherit]" : "h-px w-[inherit]"
      )}
      style={{
        marginLeft: `${px}rem`,
        marginRight: `${px}rem`,
        marginTop: `${py}rem`,
        marginBottom: `${py}rem`,
      }}
    />
  );
});
