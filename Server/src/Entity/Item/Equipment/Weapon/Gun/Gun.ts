import { Weapon, WeaponPosition, type WeaponData } from "../Weapon";
import type { Item } from "../../../Item";
import type { EquipmentModifier } from "../../type";
import type { GunId } from "../type";

/**
 * Gun class - firearm weapons
 * Locked to "gun" proficiency and Ranged position
 */
export class Gun extends Weapon<"gun", WeaponPosition.Ranged> {
  declare id: GunId;

  constructor(
    data: Item,
    modifier: EquipmentModifier,
    weaponData: Omit<WeaponData<"gun", WeaponPosition.Ranged>, "weaponType" | "preferredPosition">
  ) {
    super(data, modifier, {
      ...weaponData,
      weaponType: "gun",
      preferredPosition: WeaponPosition.Ranged,
    });
  }
}
