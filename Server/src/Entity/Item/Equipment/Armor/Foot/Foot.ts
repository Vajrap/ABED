import { Armor, type ArmorData } from "../Armor";
import type { Item } from "../../../Item";
import type { EquipmentModifier } from "../../type";
import { EquipmentSlot } from "../../../../../InterFacesEnumsAndTypes/Enums";
import type { FootId } from "../type";

/**
 * Foot armor/boot class
 */
export class Foot extends Armor {
  // Override to narrow type from ArmorId to FootId
  declare id: FootId;

  constructor(data: Item, modifier: EquipmentModifier, armorData: ArmorData) {
    super(data, EquipmentSlot.foot, modifier, armorData);
  }
}
