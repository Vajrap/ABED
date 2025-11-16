// import { equipmentRepository } from "../Item";
// import { weaponRepository } from "../Item/Equipment/Weapon/repository";
// import { miscRepository } from "../Item/Misc/repository";
// import type { Item } from "../Item/Item";
// import type { ItemId } from "../Item/type";
// import { consumableRepository } from "../Item/Consumable/repository";
//
// /**
//  * Master Item Repository
//  * Central Map for fast runtime lookup: ItemId -> Item instance
//  *
//  * This repository merges equipment, weapon, and misc registries.
//  */
// export const itemRepository: Record<ItemId, Item> = {
//   ...equipmentRepository,
//   ...weaponRepository,
//   ...miscRepository,
//   ...consumableRepository
// };
