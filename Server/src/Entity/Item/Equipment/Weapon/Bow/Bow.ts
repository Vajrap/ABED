import { Weapon, WeaponPosition, type WeaponData } from "../Weapon";
import type { Item } from "../../../Item";
import type { EquipmentModifier } from "../../type";
import type { BowId } from "../type";

/**
 * Bow class - ranged bow weapons
 * Locked to "bow" proficiency and Ranged position
 */
export class Bow extends Weapon<"bow", WeaponPosition.Ranged> {
  declare id: BowId;

  constructor(
    data: Item,
    modifier: EquipmentModifier,
    weaponData: Omit<WeaponData<"bow", WeaponPosition.Ranged>, "weaponType" | "preferredPosition">
  ) {
    super(data, modifier, {
      ...weaponData,
      weaponType: "bow",
      preferredPosition: WeaponPosition.Ranged,
    });
  }
}
