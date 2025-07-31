import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../models/db";
import type { ViewMode } from "../models/types";
import { CARDS } from "../utils/consts/cards";
import { useCallback } from "react";

export const useSessionData = () => {
  const activeCardIds = useLiveQuery(async () => {
    return (await db.activeCardIds.orderBy("idx").toArray()).map(
      ({ id }) => id
    );
  });

  const disabledCardIds = useLiveQuery(async () => {
    return (await db.disabledCardIds.toArray()).map(({ id }) => id);
  });

  const viewMode = useLiveQuery(async () => {
    const data = await db.settings.get("viewMode");
    return (data?.value || "cards") as ViewMode;
  });

  const addActiveCardId = useCallback(async (id: string) => {
    await db.activeCardIds.add({ id });
  }, []);

  const delActiveCardId = useCallback(async (id: string) => {
    await db.activeCardIds.where({ id: id }).delete();
  }, []);

  const clearActiveCardId = useCallback(async () => {
    await db.activeCardIds.clear();
  }, []);

  const addDisabledCardId = useCallback(async (id: string) => {
    await db.disabledCardIds.add({ id });
  }, []);

  const delDisabledCardId = useCallback(async (id: string) => {
    await db.disabledCardIds.delete(id);
  }, []);

  const setViewMode = useCallback(async (viewMode: ViewMode) => {
    await db.settings.put({ key: "viewMode", value: viewMode }, "viewMode");
  }, []);

  const removeInvalidCardIds = useCallback(async () => {
    const activeCardIds = await db.activeCardIds.orderBy("idx").toArray();
    const disabledCardIds = await db.disabledCardIds.toArray();

    const validIds = CARDS.map((c) => c.id);

    await db.activeCardIds.clear();
    await db.disabledCardIds.clear();
    await db.activeCardIds.bulkPut(
      activeCardIds.filter(({ id }) => validIds.includes(id))
    );
    await db.disabledCardIds.bulkPut(
      disabledCardIds.filter(({ id }) => validIds.includes(id))
    );
  }, []);

  return {
    activeCardIds: activeCardIds || [],
    disabledCardIds: disabledCardIds || [],
    viewMode: viewMode || "cards",
    addActiveCardId,
    delActiveCardId,
    clearActiveCardId,
    addDisabledCardId,
    delDisabledCardId,
    setViewMode,
    removeInvalidCardIds,
  };
};
