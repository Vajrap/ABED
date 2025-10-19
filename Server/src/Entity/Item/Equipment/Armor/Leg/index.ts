import type { Item } from "src/Entity/Item/Item";
import { Armor, type ArmorData } from "../Armor";
import type { LegId } from "../type";
import type { EquipmentModifier } from "../../type";
import { EquipmentSlot } from "src/InterFacesEnumsAndTypes/Enums";

export * from "./Leg";

/**
 * HeadWear armor class
 */
export class Leg extends Armor {
  // Override to narrow type from ArmorId to HeadWearId
  declare id: LegId;

  constructor(data: Item, modifier: EquipmentModifier, armorData: ArmorData) {
    super(data, EquipmentSlot.leg, modifier, armorData);
  }
}
