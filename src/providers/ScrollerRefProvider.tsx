import { useRef, type PropsWithChildren } from "react";
import { ScrollerRefContext } from "../contexts/ScrollerContext";

export const ScrollerRefProvider = ({ children }: PropsWithChildren) => {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <ScrollerRefContext.Provider value={ref}>
      <div
        ref={ref}
        className="flex flex-col min-h-0 h-dvh max-h-dvh overflow-y-auto items-center no-scrollbar"
      >
        {children}
      </div>
    </ScrollerRefContext.Provider>
  );
};
