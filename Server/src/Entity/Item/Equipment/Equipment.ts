import type { L10N } from "src/InterFacesEnumsAndTypes/L10N";
import {
  CharacterEquipmentSlot,
  EquipmentSlot,
} from "../../../InterFacesEnumsAndTypes/Enums";
import { Item } from "../Item";
import type { EquipmentId } from "./types";
import { type EquipmentModifier } from "./type";
import type { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import type { ItemCost } from "../Subclass/ItemCost";

/**
 * Base Equipment class
 * All equipment items (weapons, armor) extend from this
 */
export class Equipment extends Item {
  // Override to narrow type from ItemId to EquipmentId
  declare id: EquipmentId;
  
  slot: EquipmentSlot;
  modifier: EquipmentModifier;
  
  constructor(
    data: Item,
    slot: EquipmentSlot,
    modifier: EquipmentModifier,
  ) {
    super(data);
    this.slot = slot;
    this.modifier = modifier;
  }
}

/**
 * Check if equipment slot is compatible with character equipment slot
 */
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
