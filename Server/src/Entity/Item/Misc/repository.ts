import { gold } from "./Gold";
import type { ItemMisc } from "./Misc";
import {
  BoneId,
  ClothId,
  GemId,
  GoldId,
  IngotId,
  LeatherId,
  OreId,
  PlankId,
  RawGemId,
  SkinId,
  ThreadId,
  WoodId,
  type MiscItemId,
} from "./index";
import { boneItems } from "./Resource/Bone/definition";
import { clothItems } from "./Resource/Cloth/definition";
import { gemItems } from "./Resource/Gem/definition";
import {
  ingotAethersteel,
  ingotBronze,
  ingotCopper,
  ingotElectrum,
  ingotGold,
  ingotIron,
  ingotSilver,
  ingotSteel,
  ingotTin,
  ingotVoidforged,
} from "./Resource/Ingot/definition";
import { leatherItems } from "./Resource/Leather/definition";
import {
  oreCopper,
  oreErebite,
  oreGold,
  oreIron,
  orePlanarite,
  oreSilver,
  oreTin,
} from "./Resource/Ore/definition";
import {
  plankIronwood,
  plankMaple,
  plankOak,
  plankPine,
} from "./Resource/Plank/definition";
import { rawGemItems } from "./Resource/RawGem/definition";
import { skinItems } from "./Resource/Skin/definition";
import { threadItems } from "./Resource/Thread/definition";
import {
  woodIronwood,
  woodMaple,
  woodOak,
  woodPine,
} from "./Resource/Wood/definition";

export const miscRepository: Record<MiscItemId, ItemMisc> = {
  [GoldId.gold]: gold,

  [WoodId.Oak]: woodOak,
  [WoodId.Pine]: woodPine,
  [WoodId.Maple]: woodMaple,
  [WoodId.Ironwood]: woodIronwood,

  [OreId.CopperOre]: oreCopper,
  [OreId.TinOre]: oreTin,
  [OreId.IronOre]: oreIron,
  [OreId.SilverOre]: oreSilver,
  [OreId.GoldOre]: oreGold,
  [OreId.PlanariteOre]: orePlanarite,
  [OreId.ErebiteOre]: oreErebite,

  [IngotId.CopperIngot]: ingotCopper,
  [IngotId.TinIngot]: ingotTin,
  [IngotId.BronzeIngot]: ingotBronze,
  [IngotId.IronIngot]: ingotIron,
  [IngotId.SteelIngot]: ingotSteel,
  [IngotId.SilverIngot]: ingotSilver,
  [IngotId.GoldIngot]: ingotGold,
  [IngotId.ElectrumIngot]: ingotElectrum,
  [IngotId.AethersteelIngot]: ingotAethersteel,
  [IngotId.VoidforgedIngot]: ingotVoidforged,

  [PlankId.OakPlank]: plankOak,
  [PlankId.PinePlank]: plankPine,
  [PlankId.MaplePlank]: plankMaple,
  [PlankId.IronwoodPlank]: plankIronwood,

  ...(skinItems as Record<SkinId, ItemMisc>),
  ...(boneItems as Record<BoneId, ItemMisc>),
  ...(leatherItems as Record<LeatherId, ItemMisc>),
  ...(threadItems as Record<ThreadId, ItemMisc>),
  ...(clothItems as Record<ClothId, ItemMisc>),
  ...(gemItems as Record<GemId, ItemMisc>),
  ...(rawGemItems as Record<RawGemId, ItemMisc>),
}
