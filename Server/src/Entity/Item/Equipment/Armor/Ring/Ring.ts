import { Armor } from "../Armor";
import type { Item } from "../../../Item";
import type { EquipmentModifier } from "../../type";
import { EquipmentSlot } from "../../../../../InterFacesEnumsAndTypes/Enums";
import type { RingId } from "../type";
import type { ArmorData } from "../Armor";

/**
 * Ring class
 */
export class Ring extends Armor {
  // Override to narrow type from ArmorId to RingId
  declare id: RingId;
  
  constructor(data: Item, modifier: EquipmentModifier, armorData: ArmorData) {
    super(data, EquipmentSlot.ring, modifier, armorData);
  }
}

