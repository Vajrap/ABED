import { Weapon, WeaponPosition, type WeaponData } from "../Weapon";
import type { Item } from "../../../Item";
import type { EquipmentModifier } from "../../type";
import type { StaffId } from "../type";

/**
 * Staff class - magical quarterstaves
 * Locked to "staff" proficiency and Melee position
 */
export class Staff extends Weapon<"staff", WeaponPosition.Melee> {
  declare id: StaffId;

  constructor(
    data: Item,
    modifier: EquipmentModifier,
    weaponData: Omit<WeaponData<"staff", WeaponPosition.Melee>, "weaponType" | "preferredPosition">
  ) {
    super(data, modifier, {
      ...weaponData,
      weaponType: "staff",
      preferredPosition: WeaponPosition.Melee,
    });
  }
}

