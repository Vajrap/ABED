import { Armor, type ArmorData } from "../Armor";
import type { Item } from "../../../Item";
import type { EquipmentModifier } from "../../type";
import { EquipmentSlot } from "../../../../../InterFacesEnumsAndTypes/Enums";
import type { BodyId } from "../type";

/**
 * Body armor class
 */
export class Body extends Armor {
  // Override to narrow type from ArmorId to BodyId
  declare id: BodyId;

  constructor(data: Item, modifier: EquipmentModifier, armorData: ArmorData) {
    super(data, EquipmentSlot.body, modifier, armorData);
  }
}
