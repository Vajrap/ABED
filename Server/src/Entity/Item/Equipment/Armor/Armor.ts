import { Equipment } from "../Equipment";
import type { Item } from "../../Item";
import type { EquipmentModifier } from "../type";
import {
  AttributeKey,
  EquipmentSlot,
} from "../../../../InterFacesEnumsAndTypes/Enums";
import type { ArmorId } from "./type";

/**
 * Base Armor class
 * All armor types extend from this
 */
export class Armor extends Equipment {
  // Override to narrow type from EquipmentId to ArmorId
  declare id: ArmorId;
  armorData: ArmorData;

  constructor(
    data: Item,
    slot: EquipmentSlot,
    modifier: EquipmentModifier,
    armorData: ArmorData,
  ) {
    super(data, slot, modifier);
    this.armorData = armorData;
  }
}

export interface ArmorData {
  armorClass: ArmorClass;
  gemSlots?: number;
  requirement?: Partial<Record<AttributeKey, number>>;
  pDef?: {
    slash: number;
    pierce: number;
    blunt: number;
  };
  mDef?: {
    order: number;
    chaos: number;
    fire: number;
    earth: number;
    water: number;
    air: number;
  };
  mAtk?: {
    order: number;
    chaos: number;
    fire: number;
    earth: number;
    water: number;
    air: number;
  };
  pAtk?: {
    slash: number;
    pierce: number;
    blunt: number;
  };
  dodge?: number;
}

export enum ArmorClass {
  Cloth = "Cloth",
  Light = "Light",
  Medium = "Medium",
  Heavy = "Heavy",
}
