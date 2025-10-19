import { Weapon, WeaponPosition, type WeaponData } from "../Weapon";
import type { Item } from "../../../Item";
import type { EquipmentModifier } from "../../type";
import type { HalberdId } from "../type";

/**
 * Halberd class - poleaxe weapons combining axe and spear
 * Locked to "halberd" proficiency and Versatile position (both melee and ranged)
 */
export class Halberd extends Weapon<"halberd", WeaponPosition.Versatile> {
  declare id: HalberdId;

  constructor(
    data: Item,
    modifier: EquipmentModifier,
    weaponData: Omit<WeaponData<"halberd", WeaponPosition.Versatile>, "weaponType" | "preferredPosition">
  ) {
    super(data, modifier, {
      ...weaponData,
      weaponType: "halberd",
      preferredPosition: WeaponPosition.Versatile,
    });
  }
}
