import { Weapon, WeaponPosition, type WeaponData } from "../Weapon";
import type { Item } from "../../../Item";
import type { EquipmentModifier } from "../../type";
import type { BareHandId } from "../type";

/**
 * BareHand class - unarmed/fist weapons
 * Locked to "bareHand" proficiency and Melee position
 */
export class BareHand extends Weapon<"bareHand", WeaponPosition.Melee> {
  declare id: BareHandId;

  constructor(
    data: Item,
    modifier: EquipmentModifier,
    weaponData: Omit<WeaponData<"bareHand", WeaponPosition.Melee>, "weaponType" | "preferredPosition">
  ) {
    super(data, modifier, {
      ...weaponData,
      weaponType: "bareHand",
      preferredPosition: WeaponPosition.Melee,
    });
  }
}
