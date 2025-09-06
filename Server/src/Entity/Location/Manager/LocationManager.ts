import type { LocationsEnum } from "../../../InterFacesEnumsAndTypes/Enums/Location";
import type { RegionEnum } from "../../../InterFacesEnumsAndTypes/Enums/Region";
import type { SubRegionEnum } from "../../../InterFacesEnumsAndTypes/Enums/SubRegion";
import type {
  DayOfWeek,
  TimeOfDay,
} from "../../../InterFacesEnumsAndTypes/Time";
import type { NewsEmittedFromLocationStructure } from "../../News/News";
import type { Location } from "../Location";
import type { Region } from "../Regions";
import { locationRepository } from "../Repository/location";
import { regionRepository } from "../Repository/region";
import { subregionRepository } from "../Repository/subregion";
import type { SubRegion } from "../SubRegion";

class LocationManager {
  regions: Map<RegionEnum, Region> = new Map();
  subRegions: Map<SubRegionEnum, SubRegion> = new Map();
  locations: Map<LocationsEnum, Location> = new Map();

  constructor() {
    for (const region of regionRepository) this.regions.set(region.id, region);
    for (const sub of subregionRepository) this.subRegions.set(sub.id, sub);
    for (const loc of locationRepository) this.locations.set(loc.id, loc);
  }

  async processEncounters(
    day: DayOfWeek,
    phase: TimeOfDay,
  ): Promise<NewsEmittedFromLocationStructure> {
    const news: NewsEmittedFromLocationStructure = {
      worldScope: [],
      regionScope: new Map(),
      subRegionScope: new Map(),
      locationScope: new Map(),
      partyScope: new Map(),
      privateScope: new Map(),
    };
    const results: NewsEmittedFromLocationStructure[] = [];
    for (const [_, location] of this.locations) {
      const result = await location.processEncounters();
    }
    for (const res of results) {
      // Private
      res.privateScope.forEach((values, key) => {
        const exist = news.privateScope.get(key);
        if (exist) {
          exist.push(...values);
        } else {
          news.privateScope.set(key, values);
        }
      });

      // Party
      res.partyScope.forEach((values, key) => {
        const exist = news.partyScope.get(key);
        if (exist) {
          exist.push(...values);
        } else {
          news.partyScope.set(key, values);
        }
      });

      // Location
      res.locationScope.forEach((values, key) => {
        const exist = news.locationScope.get(key);
        if (exist) {
          exist.push(...values);
        } else {
          news.locationScope.set(key, values);
        }
      });

      // SubRegion
      res.subRegionScope.forEach((values, key) => {
        const exist = news.subRegionScope.get(key);
        if (exist) {
          exist.push(...values);
        } else {
          news.subRegionScope.set(key, values);
        }
      });

      // Region
      res.regionScope.forEach((values, key) => {
        const exist = news.regionScope.get(key);
        if (exist) {
          exist.push(...values);
        } else {
          news.regionScope.set(key, values);
        }
      });

      // World
      news.worldScope.push(...res.worldScope);
    }
    // return news;
    return news;
  }

  async processActions(
    day: DayOfWeek,
    phase: TimeOfDay,
  ): Promise<NewsEmittedFromLocationStructure> {
    const news: NewsEmittedFromLocationStructure = {
      worldScope: [],
      regionScope: new Map(),
      subRegionScope: new Map(),
      locationScope: new Map(),
      partyScope: new Map(),
      privateScope: new Map(),
    };
    const results: NewsEmittedFromLocationStructure[] = [];
    for (const [_, location] of this.locations) {
      const result = await location.processActions(day, phase);
    }
    for (const res of results) {
      // Private
      res.privateScope.forEach((values, key) => {
        const exist = news.privateScope.get(key);
        if (exist) {
          exist.push(...values);
        } else {
          news.privateScope.set(key, values);
        }
      });

      // Party
      res.partyScope.forEach((values, key) => {
        const exist = news.partyScope.get(key);
        if (exist) {
          exist.push(...values);
        } else {
          news.partyScope.set(key, values);
        }
      });

      // Location
      res.locationScope.forEach((values, key) => {
        const exist = news.locationScope.get(key);
        if (exist) {
          exist.push(...values);
        } else {
          news.locationScope.set(key, values);
        }
      });

      // SubRegion
      res.subRegionScope.forEach((values, key) => {
        const exist = news.subRegionScope.get(key);
        if (exist) {
          exist.push(...values);
        } else {
          news.subRegionScope.set(key, values);
        }
      });

      // Region
      res.regionScope.forEach((values, key) => {
        const exist = news.regionScope.get(key);
        if (exist) {
          exist.push(...values);
        } else {
          news.regionScope.set(key, values);
        }
      });

      // World
      news.worldScope.push(...res.worldScope);
    }
    // return news;
    return news;
  }
}

export const locationManager = new LocationManager();
