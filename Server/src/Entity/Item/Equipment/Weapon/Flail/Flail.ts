import { Weapon, WeaponPosition, type WeaponData } from "../Weapon";
import type { Item } from "../../../Item";
import type { EquipmentModifier } from "../../type";
import type { FlailId } from "../type";

/**
 * Flail class - chained ball weapons
 * Locked to "flail" proficiency and Melee position
 */
export class Flail extends Weapon<"flail", WeaponPosition.Melee> {
  declare id: FlailId;

  constructor(
    data: Item,
    modifier: EquipmentModifier,
    weaponData: Omit<WeaponData<"flail", WeaponPosition.Melee>, "weaponType" | "preferredPosition">
  ) {
    super(data, modifier, {
      ...weaponData,
      weaponType: "flail",
      preferredPosition: WeaponPosition.Melee,
    });
  }
}
