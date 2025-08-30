import { CharacterEquipmentSlot } from "../../../InterFacesEnumsAndTypes/Enums";
import type { Character } from "../../Character/Character";
import type { ItemId } from "../Item";
import { Equipment, isCompatible } from "./Equipment";
import { getEquipmentOrThrow } from "./getOrThrow";
import { modifyBonusStats, modifyVitals } from "./modifiers";
import { remove } from "./remove";

export function equip(
  character: Character,
  equipmentId: ItemId,
  slot: CharacterEquipmentSlot,
) {
  // 1. check if the item exist in inventory
  let inv = character.inventory.get(equipmentId) ?? 0;
  if (inv === 0) return; // Shouldn't happen, item not found

  // 2. get equipment from repo
  const equipment = getEquipmentOrThrow(equipmentId);

  // 2.5 check if equipment and the slot align
  if (isCompatible(equipment.slot, slot)) return;

  // 3. if character already has equipment in slot, should remove it first
  const equippedId = character.equipments.get(slot);
  if (equippedId) {
    if (equipmentId === equippedId) {
      return; // Same Item, do nothing.
    }
    remove(character, equippedId, slot);
  }

  // 4. move equipment from inventory to slot
  inv--;
  if (inv === 0) {
    character.inventory.delete(equipmentId);
  } else {
    character.inventory.set(equipmentId, inv);
  }
  character.equipments.set(slot, equipmentId);

  // 5. add values
  modifyBonusStats(character, equipment, "EQUIP");
  modifyBuffsAndDebuffs(character, equipment);
  modifyTraits(character, equipment);
  modifyVitals(character, equipment, "EQUIP");
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
