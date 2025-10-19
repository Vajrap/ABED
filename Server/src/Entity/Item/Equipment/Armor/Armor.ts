import { Equipment } from "../Equipment";
import type { Item } from "../../Item";
import type { EquipmentModifier } from "../type";
import { EquipmentSlot } from "../../../../InterFacesEnumsAndTypes/Enums";
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
    pDef: {
        slash: number;
        pierce: number;
        blunt: number;
    };
    mDef: {
        order: number;
        chaos: number;
        fire: number;
        earth: number;
        water: number;
        air: number;
    };
    dodge: number; // only negative value is valid
}

export enum ArmorClass {
    Cloth = 'Cloth',
    Light = 'Light',
    Medium = 'Medium',
    Heavy = 'Heavy',
}