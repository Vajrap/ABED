import type { CharacterEquipmentSlot } from "src/InterFacesEnumsAndTypes/Enums";
import type { Character } from "src/Entity/Character/Character";
import type { EquipmentId } from "src/Entity/Item/Equipment/types";
import { getEquipment } from "src/Entity/Item/Equipment/repository";
import { modifyBonusStats, modifyVitals } from "src/Utils/equipmentModifiers";
import Report from "src/Utils/Reporter";

export function removeEquipment(
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
  const equipment = getEquipment(equipmentId);
  if (!equipment) {
    Report.error(`Equipment ${equipmentId} not found in repository`);
    return false;
  }
  // 3. remove modifiers
  modifyBonusStats(character, equipment, "REMOVE");
  modifyVitals(character, equipment, "REMOVE");
  // 4. remove from character
  (character.equipments as any)[slot] = null;
  // 5. add back to inventory
  const currentInv = character.inventory.get(equipmentId) ?? 0;
  character.inventory.set(equipmentId, currentInv + 1);
  return true;
}
