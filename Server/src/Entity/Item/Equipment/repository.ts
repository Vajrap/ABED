import type { Equipment } from "./Equipment";
import type { EquipmentId } from "./types";
import { bareHand } from "./Weapon/BareHand/definition/bareHand";
import { Weapon } from "./Weapon";
import { BareHandId } from "./Weapon/type";
import { WeaponId } from "./Weapon/type";

/**
 * Equipment Repository
 * Central Map for fast runtime lookup: EquipmentId -> Equipment instance
 * All equipment items must be registered here for the game to use them
 */
export const equipmentRepository: Record<EquipmentId, Equipment> = {
  [BareHandId.BareHand]: bareHand
};

export function getEquipment(id: EquipmentId): Equipment | null {
  const equipment = equipmentRepository[id];
  return equipment ?? null;
}

export function getWeaponFromRepository(id: WeaponId) {
  const weapon = equipmentRepository[id] as Weapon;
  return weapon ?? null;
}
