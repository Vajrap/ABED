import { Weapon, WeaponPosition, type WeaponData } from "../Weapon";
import type { Item } from "../../../Item";
import type { EquipmentModifier } from "../../type";
import type { MaceId } from "../type";

/**
 * Mace class - blunt crushing weapons
 * Locked to "mace" proficiency and Melee position
 */
export class Mace extends Weapon<"mace", WeaponPosition.Melee> {
  declare id: MaceId;

  constructor(
    data: Item,
    modifier: EquipmentModifier,
    weaponData: Omit<WeaponData<"mace", WeaponPosition.Melee>, "weaponType" | "preferredPosition">
  ) {
    super(data, modifier, {
      ...weaponData,
      weaponType: "mace",
      preferredPosition: WeaponPosition.Melee,
    });
  }
}
