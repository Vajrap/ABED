import {
  CharacterEquipmentSlot,
  EquipmentSlot,
} from "../../../InterFacesEnumsAndTypes/Enums";
import { Item, type ItemDefinition } from "../Item";
import type { EquipmentId } from "./types";
import { type EquipmentModifier } from "./type";

export class Equipment extends Item {
  // id is inherited from Item (ItemId | string)
  // For base items: id is EquipmentId (which is part of ItemId)
  // For crafted items: id is unique instance ID (UUID string)

  baseItemId: EquipmentId | null = null; // Points to base item (e.g., SwordId.LongSword) for crafted items
  instanceId: string | null = null; // Deprecated: kept for backwards compatibility, use id instead
  slot: EquipmentSlot;
  modifier: EquipmentModifier;

  constructor(
    data: ItemDefinition,
    slot: EquipmentSlot,
    modifier: EquipmentModifier,
  ) {
    super(data);
    this.slot = slot;
    this.modifier = modifier;
  }

  setInstanceId(id: string): void {
    this.instanceId = id;
    // For crafted items, the id should be the unique instance ID
    this.id = id;
  }

  setBaseItemId(baseId: EquipmentId): void {
    this.baseItemId = baseId;
  }
}

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
  return equipSlot === (target as unknown as EquipmentSlot);
}
