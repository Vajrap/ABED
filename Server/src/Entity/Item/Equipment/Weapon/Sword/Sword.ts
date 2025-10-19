import { Weapon, WeaponPosition, type WeaponData } from "../Weapon";
import type { Item } from "../../../Item";
import type { EquipmentModifier } from "../../type";
import type { SwordId } from "../type";

/**
 * Sword class - one-handed blade weapons
 * Locked to "sword" proficiency and Melee position
 */
export class Sword extends Weapon<"sword", WeaponPosition.Melee> {
  // Override to narrow type from WeaponId to SwordId
  declare id: SwordId;

  constructor(
    data: Item,
    modifier: EquipmentModifier,
    weaponData: Omit<WeaponData<"sword", WeaponPosition.Melee>, "weaponType" | "preferredPosition">
  ) {
    super(data, modifier, {
      ...weaponData,
      weaponType: "sword",
      preferredPosition: WeaponPosition.Melee,
    });
  }
}
