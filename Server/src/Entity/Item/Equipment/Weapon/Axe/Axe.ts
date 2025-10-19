import { Weapon, WeaponPosition, type WeaponData } from "../Weapon";
import type { Item } from "../../../Item";
import type { EquipmentModifier } from "../../type";
import type { AxeId } from "../type";

/**
 * Axe class - chopping weapons
 * Locked to "axe" proficiency and Melee position
 */
export class Axe extends Weapon<"axe", WeaponPosition.Melee> {
  // Override to narrow type from WeaponId to AxeId
  declare id: AxeId;

  constructor(
    data: Item,
    modifier: EquipmentModifier,
    weaponData: Omit<WeaponData<"axe", WeaponPosition.Melee>, "weaponType" | "preferredPosition">
  ) {
    super(data, modifier, {
      ...weaponData,
      weaponType: "axe",
      preferredPosition: WeaponPosition.Melee,
    });
  }
}
