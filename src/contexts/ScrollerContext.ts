import {
  createContext,
  type RefObject,
} from "react";

export const ScrollerRefContext = createContext<
  RefObject<HTMLDivElement | null>
>({
  current: null,
});
