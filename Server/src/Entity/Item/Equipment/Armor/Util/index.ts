import type { Item } from "src/Entity/Item/Item";
import { Armor, type ArmorData } from "../Armor";
import type { UtilId } from "../type";
import type { EquipmentModifier } from "../../type";
import { EquipmentSlot } from "src/InterFacesEnumsAndTypes/Enums";

export * from "./Util";

/**
 * HeadWear armor class
 */
export class Util extends Armor {
  // Override to narrow type from ArmorId to HeadWearId
  declare id: UtilId;

  constructor(data: Item, modifier: EquipmentModifier, armorData: ArmorData) {
    super(data, EquipmentSlot.util, modifier, armorData);
  }
}
