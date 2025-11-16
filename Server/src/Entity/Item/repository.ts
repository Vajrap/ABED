import { consumableRepository } from "./Consumable/repository";
import { equipmentRepository } from "./Equipment/repository";
import { Item } from "./Item";
import { miscRepository } from "./Misc/repository";
import { ItemId } from "./type";
import { getItemInstance } from "./Equipment/ItemInstance/repository";

// itemRepository contains only base items with base ItemIds
// Crafted items with unique instance IDs are stored in itemInstanceRepository
export const itemRepository: Record<ItemId, Item> = {
  ...equipmentRepository,
  ...miscRepository,
  ...consumableRepository,
} as Record<ItemId, Item>;

/**
 * Get an item by ID (either base ItemId or UUID instance ID)
 * First tries the base itemRepository, then falls back to itemInstanceRepository for crafted items
 */
export function getItem(id: ItemId | string): Item | null {
  // First try to get from base item repository (for ItemId types)
  const item = itemRepository[id as ItemId];
  if (item) {
    return item;
  }
  
  // If not found and id is a string, try to get item instance (for UUID instance IDs)
  if (typeof id === "string") {
    const instance = getItemInstance(id);
    if (instance) {
      return instance;
    }
  }
  
  return null;
}

