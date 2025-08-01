import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../models/db";
import { useCallback } from "react";

export const useActiveCards = () => {
  const activeCardIds = useLiveQuery(async () => {
    return (await db.activeCardIds.orderBy("idx").toArray()).map(
      ({ id }) => id
    );
  });

  const addActiveCardId = useCallback(async (id: string) => {
    await db.activeCardIds.add({ id });
  }, []);

  const delActiveCardId = useCallback(async (id: string) => {
    await db.activeCardIds.where({ id: id }).delete();
  }, []);

  const clearActiveCardIds = useCallback(async () => {
    await db.activeCardIds.clear();
  }, []);

  return {
    activeCardIds: activeCardIds || [],
    addActiveCardId,
    delActiveCardId,
    clearActiveCardIds,
  };
};
