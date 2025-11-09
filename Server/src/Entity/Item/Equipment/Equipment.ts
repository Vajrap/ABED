import {
  CharacterEquipmentSlot,
  EquipmentSlot,
} from "../../../InterFacesEnumsAndTypes/Enums";
import { Item, type ItemDefinition } from "../Item";
import type { EquipmentId } from "./types";
import { type EquipmentModifier } from "./type";

export class Equipment extends Item {
  declare id: EquipmentId;

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
