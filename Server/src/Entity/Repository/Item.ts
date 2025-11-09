import { equipmentRepository } from "../Item";
import { weaponRepository } from "../Item/Equipment/Weapon/repository";
import { UtilId } from "../Item/Equipment/Armor/type";
import { PotionId, FoodId, UsableId } from "../Item/Consumable";
import {
  WoodId,
  SkinId,
  BoneId,
  OreId,
  IngotId,
  PlankId,
  LeatherId,
  ThreadId,
  GemId,
  GoldId,
} from "../Item/Misc";
import type { Item } from "../Item/Item";
import type { ItemId } from "../Item/type";

/**
 * Master Item Repository
 * Central Map for fast runtime lookup: ItemId -> Item instance
 *
 * This repository contains ALL items in the game (equipment, consumables, books, misc)
 * For specialized equipment lookups, use equipmentRepository from Equipment/repository
 */
export const itemRepository: Record<ItemId, Item | undefined> = {
  ...equipmentRepository,
  [UtilId.Idol]: undefined,
  [UtilId.Relic]: undefined,
  [UtilId.Totem]: undefined,
  [UtilId.Mechanic]: undefined,
  [PotionId.healingPotion]: undefined,
  [FoodId.bread]: undefined,
  [UsableId.campKit]: undefined,
  [WoodId.Oak]: undefined,
  [WoodId.Pine]: undefined,
  [WoodId.Maple]: undefined,
  [WoodId.Ironwood]: undefined,
  [SkinId.Hide]: undefined,
  [SkinId.Fur]: undefined,
  [SkinId.Scale]: undefined,
  [BoneId.Bone]: undefined,
  [BoneId.Fang]: undefined,
  [BoneId.Horn]: undefined,
  [OreId.CopperOre]: undefined,
  [OreId.TinOre]: undefined,
  [OreId.IronOre]: undefined,
  [OreId.SilverOre]: undefined,
  [OreId.GoldOre]: undefined,
  [OreId.PlanariteOre]: undefined,
  [OreId.ErebiteOre]: undefined,
  [IngotId.CopperIngot]: undefined,
  [IngotId.TinIngot]: undefined,
  [IngotId.IronIngot]: undefined,
  [IngotId.SilverIngot]: undefined,
  [IngotId.GoldIngot]: undefined,
  [IngotId.BronzeIngot]: undefined,
  [IngotId.SteelIngot]: undefined,
  [IngotId.ElectrumIngot]: undefined,
  [IngotId.AethersteelIngot]: undefined,
  [IngotId.VoidforgedIngot]: undefined,
  [PlankId.OakPlank]: undefined,
  [PlankId.PinePlank]: undefined,
  [PlankId.MaplePlank]: undefined,
  [PlankId.IronwoodPlank]: undefined,
  [LeatherId.Leather]: undefined,
  [LeatherId.FineLeather]: undefined,
  [LeatherId.ScaledLeather]: undefined,
  [ThreadId.WoolThread]: undefined,
  [ThreadId.SilkThread]: undefined,
  [ThreadId.LinenThread]: undefined,
  [GemId.RoughGem]: undefined,
  [GemId.CutGem]: undefined,
  [GoldId.gold]: undefined,
};
