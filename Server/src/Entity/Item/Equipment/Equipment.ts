import {
  CharacterEquipmentSlot,
  EquipmentSlot,
} from "../../../InterFacesEnumsAndTypes/Enums";
import { Item, type ItemId } from "../Item";
import type { EquipmentModifier } from "./Type";

export class Equipment extends Item {
  slot: EquipmentSlot;
  modifier: EquipmentModifier;
  constructor(
    data: Partial<Item>,
    slot: EquipmentSlot,
    modifier: EquipmentModifier,
  ) {
    super(data);
    this.slot = slot;
    this.modifier = modifier;
  }
}

export const equipmentRepo: Map<ItemId, Equipment> = new Map();

export function isCompatible(
  equipSlot: EquipmentSlot,
  target: CharacterEquipmentSlot,
): boolean {
  if (equipSlot === EquipmentSlot.ring)
    return target === "ringL" || target === "ringR";
  if (equipSlot === EquipmentSlot.ear)
    return target === "earL" || target === "earR";
  if (equipSlot === EquipmentSlot.weapon)
    return target === "leftHand" || target === "rightHand";
  // everything else must match 1:1
  return equipSlot === (target as unknown as EquipmentSlot);
}
