import { Weapon, WeaponPosition, type WeaponData } from "../Weapon";
import type { Item } from "../../../Item";
import type { EquipmentModifier } from "../../type";
import type { GreatSwordId } from "../type";

/**
 * GreatSword class - large two-handed sword weapons
 * Locked to "greatSword" proficiency and Melee position
 */
export class GreatSword extends Weapon<"greatSword", WeaponPosition.Melee> {
  declare id: GreatSwordId;

  constructor(
    data: Item,
    modifier: EquipmentModifier,
    weaponData: Omit<WeaponData<"greatSword", WeaponPosition.Melee>, "weaponType" | "preferredPosition">
  ) {
    super(data, modifier, {
      ...weaponData,
      weaponType: "greatSword",
      preferredPosition: WeaponPosition.Melee,
    });
  }
}
