import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../models/db";
import type { SessionData } from "../models/types";

const defaultSessionData: SessionData = {
  activeCardIds: [],
  disabledCardIds: [],
  viewMode: "cards",
};

export const useSessionData = () => {
  const sessionData = useLiveQuery(async () => {
    const data: Record<keyof SessionData, unknown> = { ...defaultSessionData };
    await db.sessionData.each((item) => (data[item.key] = item.value));
    return data as SessionData;
  });

  const setActiveCardIds = async (ids: string[]) => {
    await db.sessionData.put(
      { key: "activeCardIds", value: ids },
      "activeCardIds"
    );
  };

  const setDisabledCardIds = async (ids: string[]) => {
    await db.sessionData.put(
      { key: "disabledCardIds", value: ids },
      "disabledCardIds"
    );
  };

  const setViewMode = async (viewMode: SessionData["viewMode"]) => {
    await db.sessionData.put({ key: "viewMode", value: viewMode }, "viewMode");
  };

  return {
    activeCardIds: sessionData?.activeCardIds || [],
    disabledCardIds: sessionData?.disabledCardIds || [],
    viewMode: sessionData?.viewMode || "cards",
    setActiveCardIds,
    setDisabledCardIds,
    setViewMode,
  };
};
