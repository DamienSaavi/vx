import { db } from "../models/db";
import type { SessionData } from "../models/types";
import { useLiveQuery } from "dexie-react-hooks";

const defaultSessionData: SessionData = {
  activeCardIds: [],
  disabledCardIds: [],
};

export const useSessionData = () => {
  const sessionData = useLiveQuery(async () => {
    const data = { ...defaultSessionData };
    await db.sessionData.each((item) => (data[item.key] = item.value));
    return data;
  });

  const setActiveCardIds = (ids: string[]) => {
    db.sessionData.put({ key: "activeCardIds", value: ids }, "activeCardIds");
  };

  const setDisabledCardIds = (ids: string[]) => {
    db.sessionData.put(
      { key: "disabledCardIds", value: ids },
      "disabledCardIds"
    );
  };

  return {
    activeCardIds: sessionData?.activeCardIds || [],
    disabledCardIds: sessionData?.disabledCardIds || [],
    setActiveCardIds,
    setDisabledCardIds,
  };
};
