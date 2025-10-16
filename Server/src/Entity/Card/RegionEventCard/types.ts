import type { NewsDistribution } from "../../News/News";
import type { RegionEnum } from "../../../InterFacesEnumsAndTypes/Enums/Region";

export enum RegionEventCardEnum {
  // Positive Events (Scale: 0)
  BountifulHarvest = "BountifulHarvest",
  TradeFair = "TradeFair",
  PeacefulSeason = "PeacefulSeason",
  
  // Minor Events (Scale: 10)
  MerchantCaravan = "MerchantCaravan",
  LocalFestival = "LocalFestival",
  MinorDispute = "MinorDispute",
  ResourceScarcity = "ResourceScarcity",
  
  // Moderate Events (Scale: 20)
  BanditRaids = "BanditRaids",
  DroughtWarning = "DroughtWarning",
  MonsterSightings = "MonsterSightings",
  PoliticalTension = "PoliticalTension",
  
  // Major Events (Scale: 30)
  RegionalConflict = "RegionalConflict",
  NaturalDisaster = "NaturalDisaster",
  MassiveMigration = "MassiveMigration",
  PlagueThreat = "PlagueThreat",
  
  // Neutral/Boring (Scale: 0)
  QuietSeason = "QuietSeason",
}

// Effect handler function - returns news or null
export type RegionEffectHandler = () => NewsDistribution | null;

export interface RegionEventCardConfig {
  id: RegionEventCardEnum;
  globalEventScale: number; // How much this card moves the global event scale (0-30)
  targetRegions: RegionEnum[] | "all"; // Which regions are affected
  onDraw: RegionEffectHandler; // Effect when card is drawn
  description: string; // What happens in the story
}

export function makeRegionEventCardConfig(config: RegionEventCardConfig): RegionEventCardConfig {
  return {
    id: config.id,
    globalEventScale: config.globalEventScale,
    targetRegions: config.targetRegions,
    onDraw: config.onDraw,
    description: config.description,
  };
}

