import { memo, type PropsWithChildren } from "react";

type Props = PropsWithChildren & {
  content?: string;
};

export const Badge = memo(({ content, children }: Props) =>
  content ? (
    <div className="relative">
      <span className="absolute flex justify-center items-center rounded-full bg-sky-700 text-white leading-none -right-2.5 -top-2.5 h-6.5 w-6.5">
        {content}
      </span>
      {children}
    </div>
  ) : (
    <>{children}</>
  )
);
