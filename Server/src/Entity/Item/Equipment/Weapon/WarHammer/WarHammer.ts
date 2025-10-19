import { Weapon, WeaponPosition, type WeaponData } from "../Weapon";
import type { Item } from "../../../Item";
import type { EquipmentModifier } from "../../type";
import type { WarHammerId } from "../type";

/**
 * WarHammer class - heavy hammer weapons
 * Locked to "warHammer" proficiency and Melee position
 */
export class WarHammer extends Weapon<"warHammer", WeaponPosition.Melee> {
  declare id: WarHammerId;

  constructor(
    data: Item,
    modifier: EquipmentModifier,
    weaponData: Omit<WeaponData<"warHammer", WeaponPosition.Melee>, "weaponType" | "preferredPosition">
  ) {
    super(data, modifier, {
      ...weaponData,
      weaponType: "warHammer",
      preferredPosition: WeaponPosition.Melee,
    });
  }
}
