import { Weapon, WeaponPosition, type WeaponData } from "../Weapon";
import type { Item } from "../../../Item";
import type { EquipmentModifier } from "../../type";
import type { ZanmadaoId } from "../type";

/**
 * Zanmadao class - horse-cutting blade weapons
 * Locked to "zanmadao" proficiency and Melee position
 */
export class Zanmadao extends Weapon<"zanmadao", WeaponPosition.Melee> {
  declare id: ZanmadaoId;

  constructor(
    data: Item,
    modifier: EquipmentModifier,
    weaponData: Omit<WeaponData<"zanmadao", WeaponPosition.Melee>, "weaponType" | "preferredPosition">
  ) {
    super(data, modifier, {
      ...weaponData,
      weaponType: "zanmadao",
      preferredPosition: WeaponPosition.Melee,
    });
  }
}
