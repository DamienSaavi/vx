import { db } from "../../models/db";
import { CARDS } from "../consts/cards";

export const removeInvalidCardIds = async () => {
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
};
