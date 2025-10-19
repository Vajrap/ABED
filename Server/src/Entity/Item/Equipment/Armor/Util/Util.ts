import { Armor } from "../Armor";
import type { Item } from "../../../Item";
import type { EquipmentModifier } from "../../type";
import { EquipmentSlot } from "../../../../../InterFacesEnumsAndTypes/Enums";
import type { UtilId } from "../type";

/**
 * Utility item class (belts, bags, etc.)
 */
export class Util extends Armor {
  // Override to narrow type from ArmorId to UtilId
  declare id: UtilId;
  
  constructor(data: Partial<Item>, modifier: EquipmentModifier) {
    super(data, EquipmentSlot.util, modifier);
  }
}

