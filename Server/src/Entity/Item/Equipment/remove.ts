import type { CharacterEquipmentSlot } from "../../../InterFacesEnumsAndTypes/Enums";
import type { Character } from "../../Character/Character";
import type { ItemId } from "../Item";
import type { Equipment } from "./Equipment";
import { getEquipmentOrThrow } from "./getOrThrow";
import { modifyBonusStats, modifyVitals } from "./modifiers";

export function remove(
  character: Character,
  equipmentId: ItemId,
  slot: CharacterEquipmentSlot,
) {
  // 1. check if item were really equipped
  const equipment = getEquipmentOrThrow(equipmentId);
  const equippedId = character.equipments.get(slot);
  if (!equippedId) {
    throw new Error();
  }
  // 2. get item from repo
  const equipped = getEquipmentOrThrow(equippedId);

  // 3. remove values
  modifyBonusStats(character, equipped, "REMOVE");
  modifyBuffsAndDebuffs(character, equipped);
  modifyTraits(character, equipped);
  modifyVitals(character, equipped, "REMOVE");

  // 4. move item to inventory
  const inv = character.inventory.get(equippedId) ?? 0;
  character.inventory.set(equippedId, inv + 1);
  character.equipments.delete(slot);
}

function modifyBuffsAndDebuffs(character: Character, equipped: Equipment) {
  for (const [buffId, delta] of equipped.modifier.buffsAndDebuffs ?? []) {
    if (!delta || delta <= 0) continue;

    const rec = character.buffsAndDebuffs.entry.get(buffId);
    if (!rec) continue; // This should not be the case, it's bugged.

    rec.permValue = Math.max(0, rec.permValue - delta);
    rec.isPerm = rec.permValue > 0;

    if (rec.permValue === 0 && rec.value === 0) {
      character.buffsAndDebuffs.entry.delete(buffId);
    } else {
      character.buffsAndDebuffs.entry.set(buffId, rec);
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
