import { Weapon, WeaponPosition, type WeaponData } from "../Weapon";
import type { Item } from "../../../Item";
import type { EquipmentModifier } from "../../type";
import type { ThrowingKnifeId } from "../type";

/**
 * ThrowingKnife class - thrown blade weapons
 * Locked to "throwingKnife" proficiency and Versatile position (both melee and ranged)
 */
export class ThrowingKnife extends Weapon<"throwingKnife", WeaponPosition.Versatile> {
  declare id: ThrowingKnifeId;

  constructor(
    data: Item,
    modifier: EquipmentModifier,
    weaponData: Omit<WeaponData<"throwingKnife", WeaponPosition.Versatile>, "weaponType" | "preferredPosition">
  ) {
    super(data, modifier, {
      ...weaponData,
      weaponType: "throwingKnife",
      preferredPosition: WeaponPosition.Versatile,
    });
  }
}
