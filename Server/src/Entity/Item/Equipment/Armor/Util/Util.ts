import { Armor } from "../Armor";
import type { Item } from "../../../Item";
import type { EquipmentModifier } from "../../type";
import { EquipmentSlot } from "../../../../../InterFacesEnumsAndTypes/Enums";
import type { UtilId } from "../type";
import type { ArmorData } from "../Armor";

/**
 * Utility item class (belts, bags, etc.)
 */
export class Util extends Armor {
  // Override to narrow type from ArmorId to UtilId
  declare id: UtilId;
  
  constructor(data: Item, modifier: EquipmentModifier, armorData: ArmorData) {
    super(data, EquipmentSlot.util, modifier, armorData);
  }
}

