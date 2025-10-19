import { Weapon, WeaponPosition, type WeaponData } from "../Weapon";
import type { Item } from "../../../Item";
import type { EquipmentModifier } from "../../type";
import type { BladeId } from "../type";

/**
 * Blade class - generic blade weapons
 * Locked to "blade" proficiency and Melee position
 */
export class Blade extends Weapon<"blade", WeaponPosition.Melee> {
  declare id: BladeId;

  constructor(
    data: Item,
    modifier: EquipmentModifier,
    weaponData: Omit<WeaponData<"blade", WeaponPosition.Melee>, "weaponType" | "preferredPosition">
  ) {
    super(data, modifier, {
      ...weaponData,
      weaponType: "blade",
      preferredPosition: WeaponPosition.Melee,
    });
  }
}
