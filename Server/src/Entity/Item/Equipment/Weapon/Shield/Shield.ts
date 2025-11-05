import { Weapon, WeaponPosition, type WeaponData } from "../Weapon";
import type { Item } from "../../../Item";
import type { EquipmentModifier } from "../../type";
import type { ShieldId } from "../type";

/**
 * Shield class - defensive weapons
 * Locked to "shield" proficiency and Melee position
 */
export class Shield extends Weapon<"shield", WeaponPosition.Melee> {
  declare id: ShieldId;

  constructor(
    data: Item,
    modifier: EquipmentModifier,
    weaponData: Omit<WeaponData<"shield", WeaponPosition.Melee>, "weaponType" | "preferredPosition">
  ) {
    super(data, modifier, {
      ...weaponData,
      weaponType: "shield",
      preferredPosition: WeaponPosition.Melee,
    });
  }
}

