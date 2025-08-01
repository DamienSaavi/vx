import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../models/db";
import { useCallback } from "react";

export const useDisabledCards = () => {
  const disabledCardIds = useLiveQuery(async () => {
    return (await db.disabledCardIds.toArray()).map(({ id }) => id);
  });

  const addDisabledCardId = useCallback(async (id: string) => {
    await db.disabledCardIds.add({ id });
  }, []);

  const delDisabledCardId = useCallback(async (id: string) => {
    await db.disabledCardIds.delete(id);
  }, []);

  const clearDisabledCardIds = useCallback(async () => {
    await db.disabledCardIds.clear();
  }, []);

  return {
    disabledCardIds: disabledCardIds || [],
    addDisabledCardId,
    delDisabledCardId,
    clearDisabledCardIds,
  };
};
