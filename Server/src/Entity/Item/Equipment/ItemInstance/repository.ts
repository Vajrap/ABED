import { Weapon } from "../Weapon/Weapon";
import { Armor } from "../Armor/Armor";
import type { ItemInstance } from "../../../../Database/Schema/item_instances";
import Report from "../../../../Utils/Reporter";
import type { Equipment } from "../Equipment";
import {
  cloneArmorInstance,
  cloneWeaponInstance,
} from "src/Event/Craft/equipmentCraftingUtils";
import {
  deserializeEquipmentModifier,
  deserializeItemCost,
} from "src/Event/Craft/itemInstancePersistence";

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
    // Lazy import to avoid circular dependency
    // Import equipmentRepository only when needed (at runtime, not module load time)
    const { equipmentRepository } = require("../repository");
    const baseEquipment: Equipment | undefined = equipmentRepository[dbInstance.baseItemId];
    if (!baseEquipment) {
      Report.error("Failed to load item instance: base equipment not found", {
        itemInstanceId: dbInstance.id,
        baseItemId: dbInstance.baseItemId,
      });
      return null;
    }

    if (dbInstance.itemType === "weapon" && baseEquipment instanceof Weapon) {
      const weapon = cloneWeaponInstance(baseEquipment);
      const payload = dbInstance.itemData as Record<string, unknown>;
      if (payload?.weaponData) {
        weapon.weaponData = payload.weaponData as Weapon["weaponData"];
      }
      if (payload?.cost) {
        weapon.cost = deserializeItemCost(payload.cost as Record<string, unknown>);
      }
      if (typeof payload?.weight === "number") {
        weapon.weight = payload.weight as number;
      }
      weapon.modifier = deserializeEquipmentModifier(
        dbInstance.modifiers as Record<string, unknown>,
      );
      weapon.setInstanceId(dbInstance.id);
      itemInstanceRepository.set(dbInstance.id, weapon);
      return weapon;
    }

    if (dbInstance.itemType === "armor" && baseEquipment instanceof Armor) {
      const armor = cloneArmorInstance(baseEquipment);
      const payload = dbInstance.itemData as Record<string, unknown>;
      if (payload?.armorData) {
        armor.armorData = payload.armorData as Armor["armorData"];
      }
      if (payload?.cost) {
        armor.cost = deserializeItemCost(payload.cost as Record<string, unknown>);
      }
      if (typeof payload?.weight === "number") {
        armor.weight = payload.weight as number;
      }
      armor.modifier = deserializeEquipmentModifier(
        dbInstance.modifiers as Record<string, unknown>,
      );
      armor.setInstanceId(dbInstance.id);
      itemInstanceRepository.set(dbInstance.id, armor);
      return armor;
    }

    Report.error("Unexpected item instance type or base mismatch", {
      itemInstanceId: dbInstance.id,
      baseItemId: dbInstance.baseItemId,
      itemType: dbInstance.itemType,
    });
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

