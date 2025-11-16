import { CharacterEquipmentSlot } from "../../../InterFacesEnumsAndTypes/Enums";
import type { Character } from "../../Character/Character";
import type { EquipmentId } from "./types";
import { type Equipment, isCompatible } from "./Equipment";
import { getEquipment } from "./repository";
import { modifyBonusStats, modifyVitals } from "./modifiers";
import { remove } from "./remove";
import Report from "src/Utils/Reporter";
import { BodyId, EarId, FootId, HandId, HeadWearId, LegId, NeckId, RingId, UtilId } from "./Armor";
import { WeaponId } from "./Weapon";

/**
 * Direct equip function for MOBs - bypasses inventory checks
 * Use this when you want to equip items directly without managing inventory
 */
export function equipDirect(
  character: Character,
  equipmentId: EquipmentId | string,
  slot: CharacterEquipmentSlot,
): boolean {
  // 1. get equipment from repo
  const equipment = getEquipment(equipmentId);
  if (!equipment) {
    Report.error(`Equipment ${equipmentId} not found`);
    return false;
  }

  // 2. check if equipment and the slot compatible
  if (!isCompatible(equipment.slot, slot)) {
    Report.error(`Character ${character.id} try to equip ${equipmentId} to ${slot} but it's not compatible`);
    return false;
  }

  // 3. if character already has equipment in slot, should remove it first
  const equippedId = character.equipments[slot] as EquipmentId | null;
  if (equippedId) {
    if (equipmentId === equippedId) {
      return true; // Already equipped
    }
    remove(character, equippedId, slot);
  }

  // 4. put equipment directly into slot (no inventory management)
  putIntoSlot(character, equipmentId, slot);

  // 5. apply modifiers
  modifyBonusStats(character, equipment, "EQUIP");
  modifyBuffsAndDebuffs(character, equipment);
  modifyTraits(character, equipment);
  modifyVitals(character, equipment, "EQUIP");

  return true;
}

function modifyBuffsAndDebuffs(character: Character, equipment: Equipment) {
  for (const [buffId, delta] of equipment.modifier.buffsAndDebuffs ?? []) {
    if (!delta || delta <= 0) continue;

    let rec = character.buffsAndDebuffs.entry.get(buffId) ?? {
      value: 0,
      isPerm: false,
      permValue: 0,
    };

    rec.isPerm = true;
    rec.permValue += delta;

    character.buffsAndDebuffs.entry.set(buffId, rec);
  }
}

function modifyTraits(character: Character, equipment: Equipment) {
  if (equipment.modifier.traits) {
    for (const trait of equipment.modifier.traits) {
      let count = character.traits.get(trait) ?? 0;
      count++;
      character.traits.set(trait, count);
    }
  }
}

function putIntoSlot(character: Character, equipmentId: EquipmentId | string, slot: CharacterEquipmentSlot) {
  switch (slot) {
    case CharacterEquipmentSlot.headWear:
      character.equipments.headWear = equipmentId as HeadWearId;
      break;
    case CharacterEquipmentSlot.body:
      character.equipments.body = equipmentId as BodyId;
      break;
    case CharacterEquipmentSlot.leg:
      character.equipments.leg = equipmentId as LegId;
      break;
    case CharacterEquipmentSlot.hand:
      character.equipments.hand = equipmentId as HandId;
      break;
    case CharacterEquipmentSlot.foot:
      character.equipments.foot = equipmentId as FootId;
      break;
    case CharacterEquipmentSlot.util:
      character.equipments.util = equipmentId as UtilId;
      break;
    case CharacterEquipmentSlot.ringL:
      character.equipments.ringL = equipmentId as RingId;
      break;
    case CharacterEquipmentSlot.ringR:
      character.equipments.ringR = equipmentId as RingId;
      break;
    case CharacterEquipmentSlot.earL:
      character.equipments.earL = equipmentId as EarId;
      break;
    case CharacterEquipmentSlot.earR:
      character.equipments.earR = equipmentId as EarId;
      break;
    case CharacterEquipmentSlot.neck:
      character.equipments.neck = equipmentId as NeckId;
      break;
    case CharacterEquipmentSlot.rightHand:
      character.equipments.rightHand = equipmentId as WeaponId;
      break;
    case CharacterEquipmentSlot.leftHand:
      character.equipments.leftHand = equipmentId as WeaponId;
      break;
  }
}

