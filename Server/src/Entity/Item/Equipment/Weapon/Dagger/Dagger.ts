import { Weapon, WeaponPosition, type WeaponData } from "../Weapon";
import type { Item } from "../../../Item";
import type { EquipmentModifier } from "../../type";
import type { DaggerId } from "../type";

/**
 * Dagger class - small, fast blade weapons
 * Locked to "dagger" proficiency and Melee position
 */
export class Dagger extends Weapon<"dagger", WeaponPosition.Melee> {
  declare id: DaggerId;

  constructor(
    data: Item,
    modifier: EquipmentModifier,
    weaponData: Omit<WeaponData<"dagger", WeaponPosition.Melee>, "weaponType" | "preferredPosition">
  ) {
    super(data, modifier, {
      ...weaponData,
      weaponType: "dagger",
      preferredPosition: WeaponPosition.Melee,
    });
  }
}
