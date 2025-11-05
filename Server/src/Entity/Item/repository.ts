import { consumableRepository } from "./Consumable/repository";
import { equipmentRepository } from "./Equipment";
import { Item } from "./Item";
import { miscRepository } from "./Misc/repository";
import { ItemId } from "./type";

export const itemRepository: Record<ItemId, Item> = {
  ...equipmentRepository,
  ...miscRepository,
  ...consumableRepository,
};
