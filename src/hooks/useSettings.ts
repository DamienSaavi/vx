import { useCallback } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../models/db";
import type { ViewMode } from "../models/types";

export const useSettings = () => {
  const viewMode = useLiveQuery(async () => {
    const data = await db.settings.get("viewMode");
    return (data?.value || "cards") as ViewMode;
  });

  const setViewMode = useCallback(async (viewMode: ViewMode) => {
    await db.settings.put({ key: "viewMode", value: viewMode }, "viewMode");
  }, []);

  return {
    viewMode: viewMode || "cards",
    setViewMode,
  };
};
