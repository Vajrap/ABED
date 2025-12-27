import type { LocationsEnum } from "../../../InterFacesEnumsAndTypes/Enums/Location";
import type { RegionEnum } from "../../../InterFacesEnumsAndTypes/Enums/Region";
import type { SubRegionEnum } from "../../../InterFacesEnumsAndTypes/Enums/SubRegion";
import type {
  DayOfWeek,
  TimeOfDay,
} from "../../../InterFacesEnumsAndTypes/Time";
import type { NewsDistribution } from "../../News/News";
import type { Location } from "../Location";
import type { Region } from "../Regions";
import { locationRepository, regionRepository, subregionRepository } from "../repository";
import type { SubRegion } from "../SubRegion";
import { market } from "../../Market/Market";
import { mergeNewsStructures } from "../../../Utils/mergeNewsStructure";

class LocationManager {
  regions: Record<RegionEnum, Region> = regionRepository;
  subRegions: Record<SubRegionEnum, SubRegion> = subregionRepository;
  locations: Record<LocationsEnum, Location> = locationRepository;

  async processEncounters(
    day: DayOfWeek,
    phase: TimeOfDay,
  ): Promise<NewsDistribution> {
    let news: NewsDistribution = {
      worldScope: [],
      regionScope: new Map(),
      subRegionScope: new Map(),
      locationScope: new Map(),
      partyScope: new Map(),
      privateScope: new Map(),
    };
    const results: NewsDistribution[] = [];
    for (const location of Object.values(this.locations)) {
      const result = await location.processEncounters();
      results.push(result);
    }
    for (const res of results) {
      news = mergeNewsStructures(news, res);
    }
    return news;
  }

  async processActions(
    day: DayOfWeek,
    phase: TimeOfDay,
  ): Promise<NewsDistribution> {
    // Process NPC travel schedules first, so NPCs are at correct locations
    // before actions are processed
    const { processNPCTravelSchedules } = await import("../../Character/NPCs/TravelScheduleProcessor");
    await processNPCTravelSchedules(day, phase);
    
    let news: NewsDistribution = {
      worldScope: [],
      regionScope: new Map(),
      subRegionScope: new Map(),
      locationScope: new Map(),
      partyScope: new Map(),
      privateScope: new Map(),
    };
    const results: NewsDistribution[] = [];
    for (const location of Object.values(this.locations)) {
      const result = await location.processActions(day, phase);
      results.push(result);
    }
    for (const res of results) {
      news = mergeNewsStructures(news, res);
    }
    return news;
  }

  /**
   * Refill resources at all locations and report production to market
   */
  refillResources() {
    // Import market here to avoid circular dependencies
    // const { market } = require("../../Market/Market");

    for (const location of Object.values(this.locations)) {
      const generated = location.refillResources();

      // Report production to market tracker
      for (const [resourceType, amount] of generated.entries()) {
        market.resourceTracker.recordProduction(
          location.id,
          location.subRegion,
          resourceType,
          amount,
        );
      }
    }
  }
}

export const locationManager = new LocationManager();
