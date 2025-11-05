import { Weapon, WeaponPosition, type WeaponData } from "../Weapon";
import type { Item } from "../../../Item";
import type { EquipmentModifier } from "../../type";
import type { WandId } from "../type";

/**
 * Wand class - magical wands
 * Locked to "magicWand" proficiency and Ranged position
 */
export class Wand extends Weapon<"wand", WeaponPosition.Ranged> {
  declare id: WandId;

  constructor(
    data: Item,
    modifier: EquipmentModifier,
    weaponData: Omit<WeaponData<"wand", WeaponPosition.Ranged>, "weaponType" | "preferredPosition">
  ) {
    super(data, modifier, {
      ...weaponData,
      weaponType: "wand",
      preferredPosition: WeaponPosition.Ranged,
    });
  }
}

