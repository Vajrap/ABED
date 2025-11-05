import { Weapon, WeaponPosition, type WeaponData } from "../Weapon";
import type { Item } from "../../../Item";
import type { EquipmentModifier } from "../../type";
import type { OrbId } from "../type";

/**
 * Orb class - magical orbs
 * Locked to "orb" proficiency and Ranged position
 */
export class Orb extends Weapon<"orb", WeaponPosition.Ranged> {
  declare id: OrbId;

  constructor(
    data: Item,
    modifier: EquipmentModifier,
    weaponData: Omit<WeaponData<"orb", WeaponPosition.Ranged>, "weaponType" | "preferredPosition">
  ) {
    super(data, modifier, {
      ...weaponData,
      weaponType: "orb",
      preferredPosition: WeaponPosition.Ranged,
    });
  }
}

