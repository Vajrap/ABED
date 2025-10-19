import { Weapon, WeaponPosition, type WeaponData } from "../Weapon";
import type { Item } from "../../../Item";
import type { EquipmentModifier } from "../../type";
import type { WarAxeId } from "../type";

/**
 * WarAxe class - large battle axe weapons
 * Locked to "warAxe" proficiency and Melee position
 */
export class WarAxe extends Weapon<"warAxe", WeaponPosition.Melee> {
  declare id: WarAxeId;

  constructor(
    data: Item,
    modifier: EquipmentModifier,
    weaponData: Omit<WeaponData<"warAxe", WeaponPosition.Melee>, "weaponType" | "preferredPosition">
  ) {
    super(data, modifier, {
      ...weaponData,
      weaponType: "warAxe",
      preferredPosition: WeaponPosition.Melee,
    });
  }
}
