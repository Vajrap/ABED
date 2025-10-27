import type { Equipment } from "./Equipment";
import type { EquipmentId } from "./types";
import { bareHand } from "./Weapon/BareHand/definition/bareHand";
import { ironSword } from "./Weapon/Sword/definition/ironSword";
import { ironDagger } from "./Weapon/Dagger/definition/ironDagger";
import { rustedIronSword } from "./Weapon/Sword/definition/rustedIronSword";
import { rustedIronDagger } from "./Weapon/Dagger/definition/rustedIronDagger";
import { rustedIronMace } from "./Weapon/Mace/definition/rustedIronMace";
import { rustedIronAxe } from "./Weapon/Axe/definition/rustedIronAxe";
import { rottenWoodenShield } from "./Weapon/Shield/definition/rottenWoodenShield";
import { poorLeatherArmor } from "./Armor/Body/definition/poorLeatherArmor";
import { tatteredClothes } from "./Armor/Body/definition/tatteredClothes";
import { tatteredCap } from "./Armor/HeadWear/definition/tatteredCap";
import { Weapon } from "./Weapon";
import { BareHandId, SwordId, DaggerId, MaceId, AxeId, ShieldId } from "./Weapon/type";
import { BodyId, HeadWearId } from "./Armor/type";
import { WeaponId } from "./Weapon/type";
import { ArmorId } from "./Armor/type";

/**
 * Equipment Repository
 * Central Map for fast runtime lookup: EquipmentId -> Equipment instance
 * All equipment items must be registered here for the game to use them
 */
export const equipmentRepository: Record<EquipmentId, Equipment> = {
  // Weapons
  [BareHandId.BareHand]: bareHand,
  [SwordId.IronSword]: ironSword,
  [DaggerId.IronDagger]: ironDagger,
  [SwordId.RustedIronSword]: rustedIronSword,
  [DaggerId.RustedIronDagger]: rustedIronDagger,
  [MaceId.RustedIronMace]: rustedIronMace,
  [AxeId.RustedIronAxe]: rustedIronAxe,
  [ShieldId.RottenWoodenShield]: rottenWoodenShield,
  // Armor
  [BodyId.PoorLeatherArmor]: poorLeatherArmor,
  [BodyId.TatteredClothes]: tatteredClothes,
  [HeadWearId.TatteredCap]: tatteredCap,
};

export function getEquipment(id: EquipmentId): Equipment | null {
  const equipment = equipmentRepository[id];
  return equipment ?? null;
}

export function getWeaponFromRepository(id: WeaponId) {
  const weapon = equipmentRepository[id] as Weapon;
  return weapon ?? null;
}
