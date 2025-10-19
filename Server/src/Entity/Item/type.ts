import type { BookId } from "./Books";
import type { ConsumableId } from "./Consumable";
import type { EquipmentId } from "./Equipment/repository";
import type { MiscItemId } from "./Misc";

/**
 * Master ItemId type - union of all item IDs in the game
 * All items must be categorized under one of these types
 */
export type ItemId = EquipmentId | ConsumableId | MiscItemId | BookId | "none";

