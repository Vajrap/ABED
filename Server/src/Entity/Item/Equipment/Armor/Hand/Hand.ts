import { Armor, type ArmorData } from "../Armor";
import type { Item } from "../../../Item";
import type { EquipmentModifier } from "../../type";
import { EquipmentSlot } from "../../../../../InterFacesEnumsAndTypes/Enums";
import type { HandId } from "../type";

/**
 * Hand armor/glove class
 */
export class Hand extends Armor {
  // Override to narrow type from ArmorId to HandId
  declare id: HandId;

  constructor(data: Item, modifier: EquipmentModifier, armorData: ArmorData) {
    super(data, EquipmentSlot.hand, modifier, armorData);
  }
}
