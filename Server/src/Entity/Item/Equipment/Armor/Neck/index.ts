import type { Item } from "src/Entity/Item/Item";
import { Armor, type ArmorData } from "../Armor";
import type { NeckId } from "../type";
import type { EquipmentModifier } from "../../type";
import { EquipmentSlot } from "src/InterFacesEnumsAndTypes/Enums";

export * from "./Neck";

/**
 * HeadWear armor class
 */
export class Neck extends Armor {
  // Override to narrow type from ArmorId to HeadWearId
  declare id: NeckId;

  constructor(data: Item, modifier: EquipmentModifier, armorData: ArmorData) {
    super(data, EquipmentSlot.neck, modifier, armorData);
  }
}
