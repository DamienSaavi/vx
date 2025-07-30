import Dexie, { type EntityTable } from "dexie";
import type { ActiveCard, Card, DisabledCard, Setting } from "./types";

const db = new Dexie("vxDatabase") as Dexie & {
  cards: EntityTable<Card, "id">;
  activeCardIds: EntityTable<ActiveCard, "id">;
  disabledCardIds: EntityTable<DisabledCard, "id">;
  settings: EntityTable<Setting, "key">;
};

db.version(1).stores({
  cards: "&id",
  activeCardIds: "++idx, &id",
  disabledCardIds: "&id",
  settings: "&key",
});

export { db };
