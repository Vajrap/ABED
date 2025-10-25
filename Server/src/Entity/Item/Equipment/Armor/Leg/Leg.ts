import { Armor } from "../Armor";
import type { Item } from "../../../Item";
import type { EquipmentModifier } from "../../type";
import { EquipmentSlot } from "../../../../../InterFacesEnumsAndTypes/Enums";
import type { LegId } from "../type";
import type { ArmorData } from "../Armor";

/**
 * Leg armor class
 */
export class Leg extends Armor {
  // Override to narrow type from ArmorId to LegId
  declare id: LegId;
  
  constructor(data: Item, modifier: EquipmentModifier, armorData: ArmorData) {
    super(data, EquipmentSlot.leg, modifier, armorData);
  }
}

