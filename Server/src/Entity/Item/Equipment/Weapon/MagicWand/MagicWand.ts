import { Weapon, WeaponPosition, type WeaponData } from "../Weapon";
import type { Item } from "../../../Item";
import type { EquipmentModifier } from "../../type";
import type { MagicWandId } from "../type";

/**
 * MagicWand class - magical wand weapons
 * Locked to "magicWand" proficiency and Ranged position
 */
export class MagicWand extends Weapon<"magicWand", WeaponPosition.Ranged> {
  declare id: MagicWandId;

  constructor(
    data: Item,
    modifier: EquipmentModifier,
    weaponData: Omit<WeaponData<"magicWand", WeaponPosition.Ranged>, "weaponType" | "preferredPosition">
  ) {
    super(data, modifier, {
      ...weaponData,
      weaponType: "magicWand",
      preferredPosition: WeaponPosition.Ranged,
    });
  }
}
