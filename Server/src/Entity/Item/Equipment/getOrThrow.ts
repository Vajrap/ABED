import type { ItemId } from "../Item";
import { equipmentRepo, type Equipment } from "./Equipment";

export function getEquipmentOrThrow(id: ItemId): Equipment {
  const equipment = equipmentRepo.get(id);
  if (!equipment) throw new Error(`Equipment not found: ${id}`);
  return equipment;
}
