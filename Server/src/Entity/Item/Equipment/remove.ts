import type { CharacterEquipmentSlot } from "../../../InterFacesEnumsAndTypes/Enums";
import type { Character } from "../../Character/Character";
import type { EquipmentId } from "./types";
import type { Equipment } from "./Equipment";
import { getEquipment } from "./repository";
import { modifyBonusStats, modifyVitals } from "./modifiers";
import Report from "src/Utils/Reporter";
import { BuffEnum, DebuffEnum } from "../../BuffsAndDebuffs/enum";

export function remove(
  character: Character,
  equipmentId: EquipmentId,
  slot: CharacterEquipmentSlot,
): boolean {
  // 1. check if item were really equipped
  const equippedId = character.equipments[slot];
  if (!equippedId) {
    Report.error(`Character ${character.id} try to remove ${equipmentId} from ${slot} but it's not equipped`);
    return false;
  }
  // 2. get item from repo
  const equipped = getEquipment(equippedId);
  if (!equipped) {
    Report.error(`Equipment ${equippedId} not found`);
    return false;
  }

  // 3. remove values
  modifyBonusStats(character, equipped, "REMOVE");
  modifyBuffsAndDebuffs(character, equipped);
  modifyTraits(character, equipped);
  modifyVitals(character, equipped, "REMOVE");

  // 4. move item to inventory
  const inv = character.inventory.get(equippedId) ?? 0;
  character.inventory.set(equippedId, inv + 1);
  (character.equipments as any)[slot] = null;

  return true;
}

function modifyBuffsAndDebuffs(character: Character, equipped: Equipment) {
  for (const [buffId, delta] of equipped.modifier.buffsAndDebuffs ?? []) {
    if (!delta || delta <= 0) continue;

    // Determine if it's a buff or debuff
    const isBuff = Object.values(BuffEnum).includes(buffId as BuffEnum);
    const entry = isBuff 
      ? character.buffsAndDebuffs.buffs.entry 
      : character.buffsAndDebuffs.debuffs.entry;

    const rec = entry.get(buffId);
    if (!rec) continue; // This should not be the case, it's bugged.

    rec.permValue = Math.max(0, rec.permValue - delta);
    rec.isPerm = rec.permValue > 0;

    if (rec.permValue === 0 && rec.value === 0) {
      entry.delete(buffId);
    } else {
      entry.set(buffId, rec);
    }
  }
}

function modifyTraits(character: Character, equipped: Equipment) {
  if (equipped.modifier.traits) {
    for (const trait of equipped.modifier.traits) {
      const count = (character.traits.get(trait) ?? 0) - 1;
      if (count <= 0) {
        character.traits.delete(trait);
        continue;
      }
      character.traits.set(trait, count);
    }
  }
}
