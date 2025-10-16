import type { ResourceType } from "./types";
import type { LocationsEnum } from "../../InterFacesEnumsAndTypes/Enums/Location";
import type { SubRegionEnum } from "../../InterFacesEnumsAndTypes/Enums/SubRegion";
import { GameTime } from "../../Game/GameTime/GameTime";
import { locationRepository } from "../Repository/location";

/**
 * Price modifier calculation utilities
 * Implements the comfort band and clamping logic from the design doc
 */

/**
 * Smooth ratio into a factor with comfort band
 * 
 * - Ratios between 0.8-1.2 return 1.0 (stable band)
 * - Outside the band, apply sqrt curve for smoothing
 * - Clamp final result between 0.6-1.6
 */
export function factor(ratio: number): number {
  const bandLow = 0.8;
  const bandHigh = 1.2;
  const alpha = 0.5; // sqrt curve
  const clampMin = 0.6;
  const clampMax = 1.6;

  // Comfort band - no price change
  if (ratio >= bandLow && ratio <= bandHigh) {
    return 1.0;
  }

  // Apply soft curve outside comfort band
  const smoothed = Math.pow(ratio, alpha);
  
  // Clamp to prevent extreme price swings
  return Math.min(Math.max(smoothed, clampMin), clampMax);
}

/**
 * Calculate global yearly base modifier
 * 
 * This is the "sticky" modifier that has huge impact on prices.
 * Compares actual global production to expected baseline.
 * 
 * IMPORTANT: Inverts the ratio so that:
 * - Low production (shortage) → HIGH prices
 * - High production (surplus) → LOW prices
 */
export function calculateYearlyBaseModifier(
  resourceType: ResourceType,
  globalProduction: number,
  globalBaseline: number
): number {
  if (globalBaseline === 0) return 1.0;
  
  const ratio = globalProduction / globalBaseline;
  
  // INVERT ratio for shortage/surplus logic
  // Low production (0.5) → inverted (2.0) → factor (1.414) → HIGH prices
  // High production (2.0) → inverted (0.5) → factor (0.707) → LOW prices
  const invertedRatio = ratio > 0 ? 1 / ratio : 10;
  
  return factor(invertedRatio);
}

/**
 * Get months remaining until next production of a resource
 */
export function monthsUntilNextProduction(resourceType: ResourceType): number {
  const currentSeason = GameTime.season;
  const currentDay = GameTime.dayOfSeason;
  
  // Define which season each resource is produced
  const productionSeasons: Record<ResourceType, number> = {
    fish: 1,       // Seeding
    livestock: 1,  // Seeding
    wood: 2,       // RainFall
    herbs: 2,      // RainFall
    fruits: 3,     // GreenTide
    grain: 4,      // HarvestMoon
    vegetables: 4, // HarvestMoon
    silk: 5,       // SunDry
    gemstone: 6,   // Frostveil
    ore: 7,        // LongDark
  };
  
  const productionSeason = productionSeasons[resourceType];
  
  // Calculate seasons until production
  let seasonsRemaining: number;
  if (productionSeason >= currentSeason) {
    seasonsRemaining = productionSeason - currentSeason;
  } else {
    seasonsRemaining = (7 - currentSeason) + productionSeason;
  }
  
  // Convert to months (2 months per season, 48 days per season)
  // If we're past day 24, we're in the second month
  const currentMonth = currentDay <= 24 ? 1 : 2;
  const monthsRemaining = (seasonsRemaining * 2) - currentMonth + 1;
  
  // Minimum 1 month to avoid division by zero
  return Math.max(monthsRemaining, 1);
}

/**
 * Sum storage across all locations in a subregion
 */
export function sumStorageInSubRegion(
  subRegion: SubRegionEnum,
  resourceType: ResourceType
): number {
  let total = 0;
  
  for (const location of locationRepository.values()) {
    if (location.subRegion === subRegion) {
      total += location.resourceGeneration.stockpile[resourceType];
    }
  }
  
  return total;
}

/**
 * Calculate local shortage factor
 * 
 * Blends local and subregion factors:
 * - Local weight: 75%
 * - SubRegion weight: 25%
 * 
 * Considers months remaining until next production to determine
 * if current storage is adequate.
 * 
 * IMPORTANT: For shortages, we INVERT the factor:
 * - Low storage (ratio < 1) → HIGH factor → HIGH prices
 * - High storage (ratio > 1) → LOW factor → LOW prices
 */
export function calculateLocalShortageFactor(
  location: LocationsEnum,
  resourceType: ResourceType,
  localBaseline: number,
  subRegionBaseline: number
): number {
  const loc = locationRepository.get(location);
  if (!loc) return 1.0;
  
  const localWeight = 0.75;
  const subRegionWeight = 0.25;
  
  const localStorage = loc.resourceGeneration.stockpile[resourceType];
  const subRegionStorage = sumStorageInSubRegion(loc.subRegion, resourceType);
  
  const monthsRemaining = monthsUntilNextProduction(resourceType);
  
  // Avoid division by zero
  if (monthsRemaining === 0 || localBaseline === 0 || subRegionBaseline === 0) {
    return 1.0;
  }
  
  // Calculate average storage per month vs baseline
  const localRatio = (localStorage / monthsRemaining) / localBaseline;
  const subRegionRatio = (subRegionStorage / monthsRemaining) / subRegionBaseline;
  
  // INVERT ratios for shortage logic, then apply factor smoothing
  // Inverting: low storage (ratio 0.5) becomes (2.0) → high prices
  //            high storage (ratio 2.0) becomes (0.5) → low prices
  const invertedLocalRatio = localRatio > 0 ? 1 / localRatio : 10;
  const invertedSubRegionRatio = subRegionRatio > 0 ? 1 / subRegionRatio : 10;
  
  const localFactor = factor(invertedLocalRatio);
  const subRegionFactor = factor(invertedSubRegionRatio);
  
  // Weighted blend
  return (localFactor * localWeight) + (subRegionFactor * subRegionWeight);
}

