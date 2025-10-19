import { Weapon, WeaponPosition, type WeaponData } from "../Weapon";
import type { Item } from "../../../Item";
import type { EquipmentModifier } from "../../type";
import type { ScimitarId } from "../type";

/**
 * Scimitar class - curved blade weapons
 * Locked to "scimitar" proficiency and Melee position
 */
export class Scimitar extends Weapon<"scimitar", WeaponPosition.Melee> {
  declare id: ScimitarId;

  constructor(
    data: Item,
    modifier: EquipmentModifier,
    weaponData: Omit<WeaponData<"scimitar", WeaponPosition.Melee>, "weaponType" | "preferredPosition">
  ) {
    super(data, modifier, {
      ...weaponData,
      weaponType: "scimitar",
      preferredPosition: WeaponPosition.Melee,
    });
  }
}
