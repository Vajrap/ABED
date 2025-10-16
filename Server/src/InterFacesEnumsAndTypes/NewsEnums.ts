/**
 * News Significance - How important/rare is this news?
 * 
 * Used for filtering and archiving priority
 */
export enum NewsSignificance {
  TRIVIAL = "trivial",        // Daily routine (rest, eat, walk)
  MINOR = "minor",            // Small achievement (skill +1)
  NOTABLE = "notable",        // Interesting event (rare encounter, item found)
  MAJOR = "major",            // Significant event (boss defeated, quest complete)
  MOMENTOUS = "momentous",    // World-changing (dragon slain, war declared)
}

/**
 * News Propagation - How does this news spread?
 * 
 * Determines geographic reach and spread speed
 */
export enum NewsPropagation {
  SECRET = "secret",          // Never spreads beyond initial recipients
  PRIVATE = "private",        // Only spreads within party/immediate group
  LOCAL = "local",            // Spreads to adjacent locations
  REGIONAL = "regional",      // Spreads across entire region
  CONTINENTAL = "continental", // Spreads across multiple regions
  GLOBAL = "global",          // Spreads everywhere eventually
}

/**
 * Get numeric value for significance (for comparison)
 */
export function getSignificanceValue(sig: NewsSignificance): number {
  const values: Record<NewsSignificance, number> = {
    [NewsSignificance.TRIVIAL]: 0,
    [NewsSignificance.MINOR]: 1,
    [NewsSignificance.NOTABLE]: 2,
    [NewsSignificance.MAJOR]: 3,
    [NewsSignificance.MOMENTOUS]: 4,
  };
  return values[sig];
}

/**
 * Compare two significance levels
 * Returns: -1 if a < b, 0 if a === b, 1 if a > b
 */
export function compareSignificance(a: NewsSignificance, b: NewsSignificance): number {
  const aVal = getSignificanceValue(a);
  const bVal = getSignificanceValue(b);
  return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
}

