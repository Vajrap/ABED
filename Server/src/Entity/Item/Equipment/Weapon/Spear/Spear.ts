import { Weapon, WeaponPosition, type WeaponData } from "../Weapon";
import type { Item } from "../../../Item";
import type { EquipmentModifier } from "../../type";
import type { SpearId } from "../type";

/**
 * Spear class - thrusting polearm weapons
 * Locked to "spear" proficiency and Versatile position (both melee and ranged)
 */
export class Spear extends Weapon<"spear", WeaponPosition.Versatile> {
  declare id: SpearId;

  constructor(
    data: Item,
    modifier: EquipmentModifier,
    weaponData: Omit<WeaponData<"spear", WeaponPosition.Versatile>, "weaponType" | "preferredPosition">
  ) {
    super(data, modifier, {
      ...weaponData,
      weaponType: "spear",
      preferredPosition: WeaponPosition.Versatile,
    });
  }
}
