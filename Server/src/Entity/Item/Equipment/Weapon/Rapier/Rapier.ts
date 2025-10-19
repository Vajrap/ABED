import { Weapon, WeaponPosition, type WeaponData } from "../Weapon";
import type { Item } from "../../../Item";
import type { EquipmentModifier } from "../../type";
import type { RapierId } from "../type";

/**
 * Rapier class - thrusting sword weapons
 * Locked to "rapier" proficiency and Melee position
 */
export class Rapier extends Weapon<"rapier", WeaponPosition.Melee> {
  declare id: RapierId;

  constructor(
    data: Item,
    modifier: EquipmentModifier,
    weaponData: Omit<WeaponData<"rapier", WeaponPosition.Melee>, "weaponType" | "preferredPosition">
  ) {
    super(data, modifier, {
      ...weaponData,
      weaponType: "rapier",
      preferredPosition: WeaponPosition.Melee,
    });
  }
}
