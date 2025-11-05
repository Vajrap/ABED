import { Weapon, WeaponPosition, type WeaponData } from "../Weapon";
import type { Item } from "../../../Item";
import type { EquipmentModifier } from "../../type";
import type { BookWId } from "../type";

/**
 * Tome class - magical spellbooks
 * Locked to "tome" proficiency and Ranged position
 */
export class Tome extends Weapon<"book", WeaponPosition.Ranged> {
  declare id: BookWId;

  constructor(
    data: Item,
    modifier: EquipmentModifier,
    weaponData: Omit<WeaponData<"book", WeaponPosition.Ranged>, "weaponType" | "preferredPosition">
  ) {
    super(data, modifier, {
      ...weaponData,
      weaponType: "book",
      preferredPosition: WeaponPosition.Ranged,
    });
  }
}

