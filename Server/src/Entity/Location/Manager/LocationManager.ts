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
import { locationRepository } from "../../Repository/location";
import { regionRepository } from "../../Repository/region";
import { subregionRepository } from "../../Repository/subregion";
import type { SubRegion } from "../SubRegion";
import { market } from "../../Market/Market";
import { mergeNewsStructures } from "../../../Utils/mergeNewsStructure";

class LocationManager {
  regions: Map<RegionEnum, Region> = regionRepository;
  subRegions: Map<SubRegionEnum, SubRegion> = subregionRepository;
  locations: Map<LocationsEnum, Location> = locationRepository;

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
    for (const [_, location] of this.locations) {
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
    let news: NewsDistribution = {
      worldScope: [],
      regionScope: new Map(),
      subRegionScope: new Map(),
      locationScope: new Map(),
      partyScope: new Map(),
      privateScope: new Map(),
    };
    const results: NewsDistribution[] = [];
    for (const [_, location] of this.locations) {
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
    
    for (const [_, location] of this.locations) {
      const generated = location.refillResources();
      
      // Report production to market tracker
      for (const [resourceType, amount] of generated.entries()) {
        market.resourceTracker.recordProduction(
          location.id,
          location.subRegion,
          resourceType,
          amount
        );
      }
    }
  }
}

export const locationManager = new LocationManager();
