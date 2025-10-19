import { Weapon, WeaponPosition, type WeaponData } from "../Weapon";
import type { Item } from "../../../Item";
import type { EquipmentModifier } from "../../type";
import type { CrossbowId } from "../type";

/**
 * Crossbow class - mechanical ranged weapons
 * Locked to "crossbow" proficiency and Ranged position
 */
export class Crossbow extends Weapon<"crossbow", WeaponPosition.Ranged> {
  declare id: CrossbowId;

  constructor(
    data: Item,
    modifier: EquipmentModifier,
    weaponData: Omit<WeaponData<"crossbow", WeaponPosition.Ranged>, "weaponType" | "preferredPosition">
  ) {
    super(data, modifier, {
      ...weaponData,
      weaponType: "crossbow",
      preferredPosition: WeaponPosition.Ranged,
    });
  }
}
