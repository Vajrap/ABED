import type { NewsPropagation } from "../../InterFacesEnumsAndTypes/NewsEnums";

/**
 * Configuration for how a news item spreads
 */
export interface NewsSpreadConfig {
  spreadPeriod?: number;     // How often to attempt spreading (in days)
  spreadDC?: number;         // DC for d20 roll (1 = always spread, 20 = very rare)
  maxDistance?: number;      // Maximum geographic jumps (Infinity = no limit) - NOT USED YET
  decayDays?: number;        // DEPRECATED - Use freshness decay instead
  minFameToSpread?: number;  // Minimum participant fame required for news to spread
}

/**
 * Default spread configurations for each propagation level
 */
export const DEFAULT_SPREAD_CONFIGS: Record<NewsPropagation, NewsSpreadConfig> = {
  secret: {
    spreadPeriod: Infinity,  // Never spreads
    spreadDC: 20,            // Impossible to spread
  },
  private: {
    spreadPeriod: Infinity,  // Never spreads
    spreadDC: 20,
  },
  local: {
    spreadPeriod: 1,         // Try daily
    spreadDC: 5,             // Easy (d20 >= 5 = 80% chance)
  },
  regional: {
    spreadPeriod: 2,         // Try every 2 days
    spreadDC: 8,             // Moderate (65% chance)
  },
  continental: {
    spreadPeriod: 3,         // Try every 3 days
    spreadDC: 10,            // Medium (55% chance)
  },
  global: {
    spreadPeriod: 5,         // Try every 5 days
    spreadDC: 1,             // Always spreads (100% chance)
  },
};

/**
 * Get effective spread config (defaults + overrides)
 */
export function getEffectiveSpreadConfig(
  propagation: NewsPropagation,
  override?: NewsSpreadConfig
): Required<NewsSpreadConfig> {
  const defaults = DEFAULT_SPREAD_CONFIGS[propagation];
  
  return {
    spreadPeriod: override?.spreadPeriod ?? defaults.spreadPeriod ?? 1,
    spreadDC: override?.spreadDC ?? defaults.spreadDC ?? 10,
    maxDistance: override?.maxDistance ?? defaults.maxDistance ?? Infinity,
    decayDays: override?.decayDays ?? defaults.decayDays ?? 7,
    minFameToSpread: override?.minFameToSpread ?? 0,
  };
}

/**
 * Get decay rate per day based on significance
 * 
 * freshness = 100 - (age * decayRate)
 * When freshness reaches 0, news is removed from archive
 */
export function getDecayRate(significance: import("../../InterFacesEnumsAndTypes/NewsEnums").NewsSignificance): number {
  const { NewsSignificance } = require("../../InterFacesEnumsAndTypes/NewsEnums");
  
  switch (significance) {
    case NewsSignificance.TRIVIAL:
      return 100;  // Gone in 1 day
    case NewsSignificance.MINOR:
      return 10;   // Gone in 10 days
    case NewsSignificance.NOTABLE:
      return 3.33; // Gone in ~30 days
    case NewsSignificance.MAJOR:
      return 1.11; // Gone in ~90 days
    case NewsSignificance.MOMENTOUS:
      return 0.27; // Gone in ~365 days
    default:
      return 10;
  }
}

