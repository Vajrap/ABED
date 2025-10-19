import type { Item } from "../Item/Item";
import type { ItemId } from "../Item/type";

/**
 * Master Item Repository
 * Central Map for fast runtime lookup: ItemId -> Item instance
 * 
 * This repository contains ALL items in the game (equipment, consumables, books, misc)
 * For specialized equipment lookups, use equipmentRepository from Equipment/repository
 */
export const ItemRepository: Map<ItemId, Item> = new Map();