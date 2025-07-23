import Dexie, { type EntityTable } from "dexie";
import type { CardItem, SessionDataItem } from "./types";

const db = new Dexie("vxDatabase") as Dexie & {
  cards: EntityTable<CardItem, "id">;
  sessionData: EntityTable<SessionDataItem, "key">;
};

db.version(1).stores({
  cards: "&id",
  sessionData: "&key",
});

export type { CardItem, SessionDataItem };
export { db };
