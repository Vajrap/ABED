import { Weapon, WeaponPosition, type WeaponData } from "../Weapon";
import type { Item } from "../../../Item";
import type { EquipmentModifier } from "../../type";
import type { HammerId } from "../type";

/**
 * Hammer/Mace class - blunt crushing weapons
 * Locked to "mace" proficiency and Melee position
 */
export class Hammer extends Weapon<"hammer", WeaponPosition.Melee> {
  declare id: HammerId;

  constructor(
    data: Item,
    modifier: EquipmentModifier,
    weaponData: Omit<WeaponData<"hammer", WeaponPosition.Melee>, "weaponType" | "preferredPosition">
  ) {
    super(data, modifier, {
      ...weaponData,
      weaponType: "hammer",
      preferredPosition: WeaponPosition.Melee,
    });
  }
}

