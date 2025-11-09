import type {
  ProductionBaselines,
  YearlyProduction,
} from "./types";
import type { ResourceType } from "../../InterFacesEnumsAndTypes/ResourceTypes";
import type { LocationsEnum } from "../../InterFacesEnumsAndTypes/Enums/Location";
import type { SubRegionEnum } from "../../InterFacesEnumsAndTypes/Enums/SubRegion";
import { calculateYearlyBaseModifier } from "./PriceModifiers";
import { locationRepository } from "../Location/Location/repository";

/**
 * Tracks resource production across the year at multiple scopes
 * 
 * Used to calculate the global yearly price modifier based on
 * actual production vs expected baselines.
 */
export class ResourceProductionTracker {
  // Database row identifier for persistence
  dbId: string | null = null;

  // Current year's production tracking
  yearlyProduction: YearlyProduction;
  
  // Expected production values (design values)
  baselines: ProductionBaselines;
  
  constructor(baselines?: ProductionBaselines) {
    this.baselines = baselines ?? this.getDefaultBaselines();
    this.yearlyProduction = this.createEmptyProduction();
  }
  
  /**
   * Record production when resources are generated
   */
  recordProduction(
    location: LocationsEnum,
    subRegion: SubRegionEnum,
    resource: ResourceType,
    amount: number
  ): void {
    // Record at location level
    if (!this.yearlyProduction.location.has(location)) {
      this.yearlyProduction.location.set(location, new Map());
    }
    const locationMap = this.yearlyProduction.location.get(location)!;
    const currentLocation = locationMap.get(resource) ?? 0;
    locationMap.set(resource, currentLocation + amount);
    
    // Record at subregion level
    if (!this.yearlyProduction.subregion.has(subRegion)) {
      this.yearlyProduction.subregion.set(subRegion, new Map());
    }
    const subRegionMap = this.yearlyProduction.subregion.get(subRegion)!;
    const currentSubRegion = subRegionMap.get(resource) ?? 0;
    subRegionMap.set(resource, currentSubRegion + amount);
    
    // Record at global level
    const currentGlobal = this.yearlyProduction.global.get(resource) ?? 0;
    this.yearlyProduction.global.set(resource, currentGlobal + amount);
  }
  
  /**
   * Calculate yearly modifiers for all resources
   * 
   * Called at the start of each new year to set the sticky
   * global price modifiers based on last year's production.
   */
  calculateYearlyModifiers(): Map<ResourceType, number> {
    const modifiers = new Map<ResourceType, number>();
    
    const resources: ResourceType[] = [
      "ore", "gemstone", "wood", "herbs", "silk",
      "fish", "grain", "vegetables", "fruits", "livestock"
    ];
    
    for (const resource of resources) {
      const production = this.yearlyProduction.global.get(resource) ?? 0;
      const baseline = this.baselines.global.get(resource) ?? 1;
      
      const modifier = calculateYearlyBaseModifier(resource, production, baseline);
      modifiers.set(resource, modifier);
    }
    
    return modifiers;
  }
  
  /**
   * Reset tracking at the start of a new year
   */
  resetYearlyTracking(): void {
    this.yearlyProduction = this.createEmptyProduction();
  }
  
  /**
   * Get baseline for a specific location and resource
   */
  getLocationBaseline(location: LocationsEnum, resource: ResourceType): number {
    return this.baselines.location.get(location)?.get(resource) ?? 0;
  }
  
  /**
   * Get baseline for a specific subregion and resource
   */
  getSubRegionBaseline(subRegion: SubRegionEnum, resource: ResourceType): number {
    return this.baselines.subregion.get(subRegion)?.get(resource) ?? 0;
  }
  
  /**
   * Create empty production tracking structure
   */
  private createEmptyProduction(): YearlyProduction {
    return {
      global: new Map(),
      subregion: new Map(),
      location: new Map(),
    };
  }
  
  /**
   * Default baselines based on location RGC capacities
   * 
   * In production, these should be loaded from config/database
   * For now, we derive from actual location capacities
   */
  private getDefaultBaselines(): ProductionBaselines {
    const global = new Map<ResourceType, number>();
    const subregion = new Map<SubRegionEnum, Map<ResourceType, number>>();
    const location = new Map<LocationsEnum, Map<ResourceType, number>>();
    
    const resources: ResourceType[] = [
      "ore", "gemstone", "wood", "herbs", "silk",
      "fish", "grain", "vegetables", "fruits", "livestock"
    ];
    
    // Calculate baselines from location capacities
    for (const loc of Object.values(locationRepository)) {
      const locationBaselines = new Map<ResourceType, number>();
      
      for (const resource of resources) {
        // Use capacity as baseline (what location can produce at full capacity)
        const capacity = loc.resourceGeneration.capacity[resource];
        locationBaselines.set(resource, capacity);
        
        // Aggregate to subregion
        if (!subregion.has(loc.subRegion)) {
          subregion.set(loc.subRegion, new Map());
        }
        const subMap = subregion.get(loc.subRegion)!;
        const currentSub = subMap.get(resource) ?? 0;
        subMap.set(resource, currentSub + capacity);
        
        // Aggregate to global
        const currentGlobal = global.get(resource) ?? 0;
        global.set(resource, currentGlobal + capacity);
      }
      
      location.set(loc.id, locationBaselines);
    }
    
    return { global, subregion, location };
  }
}

