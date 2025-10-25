import { CharacterEquipmentSlot } from "src/InterFacesEnumsAndTypes/Enums";
import type { Character } from "src/Entity/Character/Character";
import type { EquipmentId } from "src/Entity/Item/Equipment/types";
import { isCompatible } from "src/Entity/Item/Equipment/Equipment";
import { getEquipment } from "src/Entity/Item/Equipment/repository";
import { modifyBonusStats, modifyVitals } from "src/Utils/equipmentModifiers";
import { removeEquipment } from "src/Utils/removeEquipment";
import Report from "src/Utils/Reporter";

export function equip(
  character: Character,
  equipmentId: EquipmentId,
  slot: CharacterEquipmentSlot,
): boolean {
  // 1. check if the item exist in inventory
  let inv = character.inventory.get(equipmentId) ?? 0;
  if (inv === 0) return false; // Shouldn't happen, item not found

  // 2. get item from repo
  const equipment = getEquipment(equipmentId);
  if (!equipment) {
    Report.error(`Equipment ${equipmentId} not found in repository`);
    return false;
  }

  // 3. check compatibility
  if (!isCompatible(equipment.slot, slot)) {
    Report.error(`Equipment ${equipmentId} slot ${equipment.slot} is not compatible with character slot ${slot}`);
    return false;
  }

  // 4. check if slot is already occupied
  const equipped = character.equipments[slot];
  if (equipped) {
    // Remove existing equipment first
    const removed = removeEquipment(character, equipped, slot);
    if (!removed) {
      Report.error(`Failed to remove existing equipment ${equipped} from slot ${slot}`);
      return false;
    }
  }

  // 5. equip the new item
  (character.equipments as any)[slot] = equipmentId;
  character.inventory.set(equipmentId, inv - 1);

  // 6. apply modifiers
  modifyBonusStats(character, equipment, "EQUIP");
  modifyVitals(character, equipment, "EQUIP");

  return true;
}
