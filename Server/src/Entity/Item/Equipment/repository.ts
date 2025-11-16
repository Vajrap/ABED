import { Equipment } from "./Equipment";
import type { EquipmentId } from "./types";
import { Weapon } from "./Weapon";
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

export function getEquipment(id: EquipmentId | string): Equipment | null {
  const equipment = equipmentRepository[id as EquipmentId];
  if (equipment) {
    return equipment;
  }
  const instance = getItemInstance(id as string);
  if (instance) {
    return instance
  }
  return null;
}

export function getWeaponFromRepository(id: WeaponId) {
  const weapon = equipmentRepository[id] as Weapon;
  return weapon ?? null;
}