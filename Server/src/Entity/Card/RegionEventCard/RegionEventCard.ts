import type { RegionEventCardEnum, RegionEventCardConfig, RegionEffectHandler } from "./types";
import type { RegionEnum } from "../../../InterFacesEnumsAndTypes/Enums/Region";

export class RegionEventCard {
  id: RegionEventCardEnum;
  globalEventScale: number;
  targetRegions: RegionEnum[] | "all";
  onDraw: RegionEffectHandler;
  description: string;
  
  constructor(config: RegionEventCardConfig) {
    this.id = config.id;
    this.globalEventScale = config.globalEventScale;
    this.targetRegions = config.targetRegions;
    this.onDraw = config.onDraw;
    this.description = config.description;
  }
}

