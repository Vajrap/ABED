
/**
 * Crafts a single item from a blueprint
 * Consumes materials and adds the result item to inventory
 *
 * @param actor - The character attempting to craft
 * @param blueprintId - The blueprint to craft from
 * @param materialSelection - For weapon blueprints: specific materials to use for each component
 * @returns Meaningful CraftResult text
 */

import { Item } from "src/Entity/Item/Item";
import type { ItemId } from "src/Entity/Item/type";

export type CraftSuccess = {
    item: Item;
    amount: number;
};
  
export type CraftFail = {
  reason: string; // "Insufficient artisan level", "Not enough materials", "Invalid material selection", "Invalid blueprint"
};
  
export type CraftResult = CraftSuccess | CraftFail;

export type CraftMaterialSelection = Partial<{
  blade: ItemId;
  handle: ItemId;
  grip: ItemId;
  guard: ItemId;
  core: ItemId;
  primary: ItemId;
  secondary: ItemId;
  tertiary: ItemId;
  accent: ItemId;
}>;
  