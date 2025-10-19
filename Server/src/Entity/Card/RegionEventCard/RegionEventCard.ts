import type { RegionEventCardEnum, RegionEventCardConfig, RegionEffectHandler } from "./types";
import type { RegionEnum } from "../../../InterFacesEnumsAndTypes/Enums/Region";
import type { L10N } from "../../../InterFacesEnumsAndTypes/L10N";

export class RegionEventCard {
  id: RegionEventCardEnum;
  name: L10N;
  globalEventScale: number;
  targetRegions: RegionEnum[] | "all";
  onDraw: RegionEffectHandler;
  description: L10N;
  
  constructor(config: RegionEventCardConfig) {
    this.id = config.id;
    this.name = config.name;
    this.globalEventScale = config.globalEventScale;
    this.targetRegions = config.targetRegions;
    this.onDraw = config.onDraw;
    this.description = config.description;
  }
}

