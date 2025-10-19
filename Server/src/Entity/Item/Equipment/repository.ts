import type { Equipment } from "./Equipment";
import type { ArmorId } from "./Armor/type";
import { BareHandId, type WeaponId } from "./Weapon/type";
import { bareHand } from "./Weapon/BareHand/definition/bareHand";
import type { Weapon } from "./Weapon";

/**
 * Equipment ID type - union of all equipment IDs
 */
export type EquipmentId = WeaponId | ArmorId;

/**
 * Equipment Repository
 * Central Map for fast runtime lookup: EquipmentId -> Equipment instance
 * All equipment items must be registered here for the game to use them
 */
export const equipmentRepository: Record<EquipmentId, Equipment> = {
  [BareHandId.BareHand]: bareHand,
};

export function getEquipment(id: EquipmentId): Equipment | null {
  const equipment = equipmentRepository[id];
  return equipment ?? null;
}

export function getWeaponFromRepository(id: WeaponId): Weapon | null {
  const weapon = equipmentRepository[id] as Weapon;
  return weapon ?? null;
}
