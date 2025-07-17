import { useContext } from "react";
import { ScrollerRefContext } from "../contexts/ScrollerContext";

export const useScrollerRef = () => {
  return useContext(ScrollerRefContext);
};
