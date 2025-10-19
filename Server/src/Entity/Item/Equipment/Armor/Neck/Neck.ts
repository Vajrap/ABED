import { Armor } from "../Armor";
import type { Item } from "../../../Item";
import type { EquipmentModifier } from "../../type";
import { EquipmentSlot } from "../../../../../InterFacesEnumsAndTypes/Enums";
import type { NeckId } from "../type";

/**
 * Necklace class
 */
export class Neck extends Armor {
  // Override to narrow type from ArmorId to NeckId
  declare id: NeckId;
  
  constructor(data: Partial<Item>, modifier: EquipmentModifier) {
    super(data, EquipmentSlot.neck, modifier);
  }
}

