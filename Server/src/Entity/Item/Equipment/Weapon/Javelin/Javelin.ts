import { Weapon, WeaponPosition, type WeaponData } from "../Weapon";
import type { Item } from "../../../Item";
import type { EquipmentModifier } from "../../type";
import type { JavelinId } from "../type";

/**
 * Javelin class - throwing spear weapons
 * Locked to "javelin" proficiency and Versatile position (both melee and ranged)
 */
export class Javelin extends Weapon<"javelin", WeaponPosition.Versatile> {
  declare id: JavelinId;

  constructor(
    data: Item,
    modifier: EquipmentModifier,
    weaponData: Omit<WeaponData<"javelin", WeaponPosition.Versatile>, "weaponType" | "preferredPosition">
  ) {
    super(data, modifier, {
      ...weaponData,
      weaponType: "javelin",
      preferredPosition: WeaponPosition.Versatile,
    });
  }
}
