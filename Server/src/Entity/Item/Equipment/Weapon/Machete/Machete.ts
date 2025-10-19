import { Weapon, WeaponPosition, type WeaponData } from "../Weapon";
import type { Item } from "../../../Item";
import type { EquipmentModifier } from "../../type";
import type { MacheteId } from "../type";

/**
 * Machete class - broad blade chopping weapons
 * Locked to "machete" proficiency and Melee position
 */
export class Machete extends Weapon<"machete", WeaponPosition.Melee> {
  declare id: MacheteId;

  constructor(
    data: Item,
    modifier: EquipmentModifier,
    weaponData: Omit<WeaponData<"machete", WeaponPosition.Melee>, "weaponType" | "preferredPosition">
  ) {
    super(data, modifier, {
      ...weaponData,
      weaponType: "machete",
      preferredPosition: WeaponPosition.Melee,
    });
  }
}
