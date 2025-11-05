import type { DamageType } from "../../../../InterFacesEnumsAndTypes/DamageTypes";
import {
  DiceEnum,
  EquipmentSlot,
  type AttributeKey,
  type ProficiencyKey,
} from "../../../../InterFacesEnumsAndTypes/Enums";
import type { Item } from "../../Item";
import { Equipment } from "../Equipment";
import type { EquipmentModifier } from "../type";
import type { WeaponId } from "./type";

export enum WeaponPosition {
  Melee = "Melee",
  Ranged = "Ranged",
  Versatile = "Versatile",
}

export type WeaponData<
  T extends ProficiencyKey = ProficiencyKey,
  P extends WeaponPosition = WeaponPosition,
> = {
  weaponType: T;
  preferredPosition: P;
  handle: 1 | 2;
  damage: DamageData;
};

type DamageData = {
  physicalDamageDice: {
    face: number;
    dice: number;
  };
  magicalDamageDice: {
    dice: number;
    face: number;
  };
  physicalDamageType: DamageType;
  magicalDamageType: DamageType;
  physicalDamageStat: AttributeKey[];
  magicalDamageStat: AttributeKey[];
  physicalHitStat: AttributeKey[];
  magicalHitStat: AttributeKey[];
  physicalCritStat: AttributeKey[];
  magicalCritStat: AttributeKey[];
};

/**
 * Base Weapon class with generics for type narrowing
 * T = ProficiencyKey (weapon type)
 * P = WeaponPosition
 *
 * Each specific weapon class (Sword, Axe, etc.) will narrow these types
 */
export class Weapon<
  T extends ProficiencyKey = ProficiencyKey,
  P extends WeaponPosition = WeaponPosition,
> extends Equipment {
  // Override to narrow type from EquipmentId to WeaponId
  declare id: WeaponId;
  weaponData: WeaponData<T, P>;

  constructor(
    data: Item,
    modifier: EquipmentModifier,
    weaponData: WeaponData<T, P>,
  ) {
    super(data, EquipmentSlot.weapon, modifier);
    this.weaponData = weaponData;
  }

  /**
   * Convenience getters for locked weapon properties
   */
  get weaponType(): T {
    return this.weaponData.weaponType;
  }

  get preferredPosition(): P {
    return this.weaponData.preferredPosition;
  }
}
