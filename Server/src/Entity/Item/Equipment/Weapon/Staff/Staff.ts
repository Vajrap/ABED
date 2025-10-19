import { Weapon, WeaponPosition, type WeaponData } from "../Weapon";
import type { Item } from "../../../Item";
import type { EquipmentModifier } from "../../type";
import type { StaffId } from "../type";

/**
 * Staff class - magical staff weapons
 * Locked to "staff" proficiency and Versatile position (both melee and ranged)
 */
export class Staff extends Weapon<"staff", WeaponPosition.Versatile> {
  declare id: StaffId;

  constructor(
    data: Item,
    modifier: EquipmentModifier,
    weaponData: Omit<WeaponData<"staff", WeaponPosition.Versatile>, "weaponType" | "preferredPosition">
  ) {
    super(data, modifier, {
      ...weaponData,
      weaponType: "staff",
      preferredPosition: WeaponPosition.Versatile,
    });
  }
}
