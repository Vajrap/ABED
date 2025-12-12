import { Equipment } from "./Equipment";
import type { EquipmentId } from "./types";
import { Weapon } from "./Weapon";
import { Armor } from "./Armor/Armor";
import { WeaponId } from "./Weapon/type";
import { weaponRepository } from "./Weapon/repository";
import { bodyRepository } from "./Armor/Body/repository";
import { headWearRepository } from "./Armor/HeadWear/repository";
import { handRepository } from "./Armor/Hand/repository";
import { legRepository } from "./Armor/Leg/repository";
import { footRepository } from "./Armor/Foot/repository";
import { earRepository } from "./Armor/Ear/repository";
import { necklaceRepository } from "./Armor/Neck/repository";
import { ringRepository } from "./Armor/Ring/repository";
import { utilRepository } from "./Armor/Util/repository";
import { getItemInstance } from "./ItemInstance/repository";

export const equipmentRepository: Record<EquipmentId, Equipment> = {
  // Weapons
  ...weaponRepository,

  // Armor
  ...bodyRepository,
  ...headWearRepository,
  ...handRepository,
  ...legRepository,
  ...footRepository,
  ...earRepository,
  ...necklaceRepository,
  ...ringRepository,
  ...utilRepository,
};

/**
 * Get equipment by EquipmentId or UUID string (for crafted instances)
 * First checks base equipment repository, then falls back to item instance repository for crafted instances
 */
export function getEquipment(id: EquipmentId | string): Equipment | null {
  // First try base equipment repository (for EquipmentId enum values)
  const baseEquipment = equipmentRepository[id as EquipmentId];
  if (baseEquipment) {
    return baseEquipment;
  }
  
  // If not found and id is a string (could be UUID for crafted instance), try item instance repository
  // Import getItemInstance directly to avoid circular dependency through Item/repository.ts
  if (typeof id === "string") {
    const instance = getItemInstance(id);
    if (instance && (instance instanceof Weapon || instance instanceof Armor)) {
      return instance;
    }
  }
  
  return null;
}

export function getWeaponFromRepository(id: WeaponId) {
  const weapon = equipmentRepository[id] as Weapon;
  return weapon ?? null;
}
