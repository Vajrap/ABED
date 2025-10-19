import { Armor, type ArmorData } from "../Armor";
import type { Item } from "../../../Item";
import type { EquipmentModifier } from "../../type";
import { EquipmentSlot } from "../../../../../InterFacesEnumsAndTypes/Enums";
import type { EarId } from "../type";

/**
 * Earring class
 */
export class Ear extends Armor {
  // Override to narrow type from ArmorId to EarId
  declare id: EarId;

  constructor(data: Item, modifier: EquipmentModifier, armorData: ArmorData) {
    super(data, EquipmentSlot.ear, modifier, armorData);
  }
}
