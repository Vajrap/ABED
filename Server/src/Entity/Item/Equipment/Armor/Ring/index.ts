import type { Item } from "src/Entity/Item/Item";
import { Armor, type ArmorData } from "../Armor";
import type { RingId } from "../type";
import type { EquipmentModifier } from "../../type";
import { EquipmentSlot } from "src/InterFacesEnumsAndTypes/Enums";

export * from "./Ring";

/**
 * HeadWear armor class
 */
export class Ring extends Armor {
  // Override to narrow type from ArmorId to HeadWearId
  declare id: RingId;

  constructor(data: Item, modifier: EquipmentModifier, armorData: ArmorData) {
    super(data, EquipmentSlot.ring, modifier, armorData);
  }
}
