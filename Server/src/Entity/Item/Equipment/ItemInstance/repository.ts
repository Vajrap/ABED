import { Weapon } from "../Weapon/Weapon";
import { Armor } from "../Armor/Armor";
import type { ItemInstance } from "../../../../Database/Schema/item_instances";
import Report from "../../../../Utils/Reporter";

/**
 * Item Instance Repository
 * Stores player-crafted weapon and armor instances
 * Keyed by instance UUID (not base ItemId)
 */
export const itemInstanceRepository: Map<string, Weapon | Armor> = new Map();

/**
 * Load an item instance from database into the repository
 */
export function loadItemInstance(dbInstance: ItemInstance): Weapon | Armor | null {
  try {
    if (dbInstance.itemType === "weapon") {
      // Construct Weapon from stored data
      const weapon = new Weapon(
        {
          id: dbInstance.baseItemId as any,
          name: { en: "", th: "" }, // Will be loaded from base item
          description: { en: "", th: "" },
          image: "",
          weight: 0,
          tier: "common" as any,
          cost: {} as any,
          isCraftable: true,
          blueprintId: dbInstance.blueprintId as any,
        },
        dbInstance.modifiers as any,
        dbInstance.itemData as any,
      );
      itemInstanceRepository.set(dbInstance.id, weapon);
      return weapon;
    } else if (dbInstance.itemType === "armor") {
      // Construct Armor from stored data
      const armor = new Armor(
        {
          id: dbInstance.baseItemId as any,
          name: { en: "", th: "" }, // Will be loaded from base item
          description: { en: "", th: "" },
          image: "",
          weight: 0,
          tier: "common" as any,
          cost: {} as any,
          isCraftable: true,
          blueprintId: dbInstance.blueprintId as any,
        },
        "body" as any, // Slot from itemData
        dbInstance.modifiers as any,
        dbInstance.itemData as any,
      );
      itemInstanceRepository.set(dbInstance.id, armor);
      return armor;
    }
    return null;
  } catch (error) {
    Report.error("Failed to load item instance", {
      itemInstanceId: dbInstance.id,
      error,
    });
    return null;
  }
}

/**
 * Get an item instance by UUID
 */
export function getItemInstance(id: string): Weapon | Armor | null {
  return itemInstanceRepository.get(id) ?? null;
}

/**
 * Remove an item instance from the repository
 */
export function removeItemInstance(id: string): boolean {
  return itemInstanceRepository.delete(id);
}

