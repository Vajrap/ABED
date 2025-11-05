import { gold } from "./Gold";
import {
  BoneId,
  GemId,
  GoldId,
  IngotId,
  LeatherId,
  OreId,
  PlankId,
  SkinId,
  ThreadId,
  WoodId,
  type MiscItemId,
} from "./index";
import type { ItemMisc } from "./Misc";
import { boneCommon, boneFang, boneHorn } from "./Resource/Bone/definition";
import { gemCut, gemRough } from "./Resource/Gem/definition";
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
import {
  leatherBasic,
  leatherFine,
  leatherScaled,
} from "./Resource/Leather/definition";
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
import { skinFur, skinHide, skinScale } from "./Resource/Skin/definition";
import {
  threadLinen,
  threadSilk,
  threadWool,
} from "./Resource/Thread/definition";
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
  [SkinId.Hide]: skinHide,
  [SkinId.Fur]: skinFur,
  [SkinId.Scale]: skinScale,
  [BoneId.Bone]: boneCommon,
  [BoneId.Fang]: boneFang,
  [BoneId.Horn]: boneHorn,
  [OreId.CopperOre]: oreCopper,
  [OreId.IronOre]: oreIron,
  [OreId.SilverOre]: oreSilver,
  [OreId.GoldOre]: oreGold,
  [IngotId.CopperIngot]: ingotCopper,
  [IngotId.IronIngot]: ingotIron,
  [IngotId.SilverIngot]: ingotSilver,
  [IngotId.GoldIngot]: ingotGold,
  [PlankId.OakPlank]: plankOak,
  [PlankId.PinePlank]: plankPine,
  [PlankId.MaplePlank]: plankMaple,
  [PlankId.IronwoodPlank]: plankIronwood,
  [LeatherId.Leather]: leatherBasic,
  [LeatherId.FineLeather]: leatherFine,
  [LeatherId.ScaledLeather]: leatherScaled,
  [ThreadId.WoolThread]: threadWool,
  [ThreadId.SilkThread]: threadSilk,
  [ThreadId.LinenThread]: threadLinen,
  [GemId.RoughGem]: gemRough,
  [GemId.CutGem]: gemCut,
  [OreId.TinOre]: oreTin,
  [OreId.PlanariteOre]: orePlanarite,
  [OreId.ErebiteOre]: oreErebite,
  [IngotId.TinIngot]: ingotTin,
  [IngotId.BronzeIngot]: ingotBronze,
  [IngotId.SteelIngot]: ingotSteel,
  [IngotId.ElectrumIngot]: ingotElectrum,
  [IngotId.AethersteelIngot]: ingotAethersteel,
  [IngotId.VoidforgedIngot]: ingotVoidforged,
};
