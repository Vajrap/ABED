# Market Pricing System

## Overview

The market pricing system implements dynamic pricing based on three key factors:
1. **Yearly Base Price Modifier** - Global supply vs demand (sticky, huge impact)
2. **Local Shortage Factor** - Regional/local supply vs baseline (dynamic, seasonal)
3. **Event Modifier** - Event-driven price changes (temporary, dramatic)

## Price Calculation

### Final Price Formula

```typescript
finalPrice = basePrice × yearlyBaseModifier × localShortageFactor × eventModifier
```

Where:
- `basePrice`: Design-defined base cost for the item/resource
- `yearlyBaseModifier`: Global yearly modifier (0.6 - 1.6)
- `localShortageFactor`: Local supply shortage factor (0.6 - 1.6)
- `eventModifier`: Event-driven multiplier (any value, typically 0.5 - 2.0)

## 1. Yearly Base Price Modifier

The yearly modifier is **sticky** and has a **huge impact** on prices. It's recalculated once per year based on global production vs expected baseline.

### When Updated
- **Once per year** at Season 1, Day 1, Hour 1
- Called via `market.adjustYearlyPrices()`
- Persists for the entire year

###Calculation

**CRITICAL:** The ratio is **inverted** before applying the factor function:

```typescript
// Last year's global totals
const globalProduction = 1000;      // actual produced last year
const globalBaseline = 1200;        // expected normal production

const globalRatio = globalProduction / globalBaseline; // 0.833

// INVERT the ratio for shortage/surplus logic
const invertedRatio = 1 / globalRatio; // 1.2

// Apply factor smoothing to inverted ratio
const yearlyBaseModifier = factor(invertedRatio); // 1.0 (in comfort band!)
```

**Why invert?**
- Without inversion: shortage (ratio < 1) → factor < 1 → prices DOWN ❌
- With inversion: shortage (ratio < 1) → inverted (> 1) → factor > 1 → prices UP ✓

**Examples:**
- Production = 500, Baseline = 1000 (shortage)
  - ratio = 0.5 → inverted = 2.0 → factor = 1.414 → **prices +41%** ✓
- Production = 2000, Baseline = 1000 (surplus)
  - ratio = 2.0 → inverted = 0.5 → factor = 0.707 → **prices -29%** ✓

### Factor Smoothing Function

The `factor()` function applies a **comfort band** and **smoothing curve**:

```typescript
function factor(ratio: number): number {
  const bandLow = 0.8;
  const bandHigh = 1.2;
  const alpha = 0.5;      // sqrt curve
  const clampMin = 0.6;
  const clampMax = 1.6;

  // Comfort band - prices stay stable
  if (ratio >= 0.8 && ratio <= 1.2) {
    return 1.0;
  }

  // Apply sqrt smoothing outside comfort band
  const smoothed = Math.pow(ratio, 0.5);
  
  // Clamp to prevent extreme swings
  return Math.min(Math.max(smoothed, 0.6), 1.6);
}
```

**Design Goals:**
- **Comfort band (0.8-1.2)**: Small fluctuations don't affect prices
- **Square root curve**: Diminishing returns prevent extreme swings
- **Clamping (0.6-1.6)**: Prevents economic collapse or hyperinflation

### Examples (WITH INVERSION)

| Production/Baseline | Direct Ratio | Inverted Ratio | Yearly Modifier | Effect |
|---------------------|--------------|----------------|-----------------|--------|
| 1000/1000 (perfect) | 1.0 | 1.0 | 1.0 | No change |
| 900/1000 (slight shortage) | 0.9 | 1.11 | 1.0 | Within comfort band |
| 700/1000 (shortage) | 0.7 | 1.43 | 1.195 | **+19.5% price** |
| 500/1000 (severe shortage) | 0.5 | 2.0 | 1.414 | **+41.4% price** |
| 200/1000 (crisis) | 0.2 | 5.0 | 1.6 (clamped) | **+60% price (max)** |
| 1500/1000 (abundance) | 1.5 | 0.67 | 0.817 | **-18.3% price** |
| 2000/1000 (surplus) | 2.0 | 0.5 | 0.707 | **-29.3% price** |
| 4000/1000 (extreme surplus) | 4.0 | 0.25 | 0.6 (clamped) | **-40% price (max)** |

## 2. Local Shortage Factor

The local shortage factor is **dynamic** and recalculated **on every price query**. It considers:
- Current local storage
- Current subregion storage
- Months until next production
- Expected baseline consumption

### When Calculated
- **Every time** `getPrice()` or `getResourcePrice()` is called
- Reflects real-time supply situation
- Considers seasonal timing

### Calculation

```typescript
// Configuration
const localWeight = 0.75;
const subRegionWeight = 0.25;

// Current state
const localStorage = 140;           // current stockpile
const subRegionStorage = 500;       // total in subregion
const localBaseline = 10;           // expected per month
const subRegionBaseline = 40;       // expected per month
const monthsRemaining = 14;         // until next production

// Calculate ratios
const localRatio = (localStorage / monthsRemaining) / localBaseline;
// (140 / 14) / 10 = 10 / 10 = 1.0

const subRegionRatio = (subRegionStorage / monthsRemaining) / subRegionBaseline;
// (500 / 14) / 40 = 35.7 / 40 = 0.893

// Apply factor smoothing to each
const localFactor = factor(localRatio);        // 1.0 (in comfort band)
const subRegionFactor = factor(subRegionRatio); // 1.0 (in comfort band)

// Weighted blend (75% local, 25% subregion)
const localShortageFactor = (localFactor × 0.75) + (subRegionFactor × 0.25);
// (1.0 × 0.75) + (1.0 × 0.25) = 1.0
```

### Why Weighted Blend?

- **Local (75%)**: Players care most about their immediate location
- **SubRegion (25%)**: Regional context matters for trade and travel

This creates localized price variations while maintaining regional coherence.

### Months Until Next Production

Each resource produces in specific seasons:

| Resource | Production Season | Example Calculation |
|----------|-------------------|---------------------|
| fish | 1 (Seeding) | Current: Season 3, Day 10 → 10 months |
| livestock | 1 (Seeding) | Current: Season 1, Day 40 → 1 month |
| wood | 2 (RainFall) | Current: Season 4, Day 10 → 6 months |
| herbs | 2 (RainFall) | Current: Season 2, Day 10 → 1 month |
| fruits | 3 (GreenTide) | Current: Season 1, Day 10 → 4 months |
| grain | 4 (HarvestMoon) | Current: Season 4, Day 40 → 1 month |
| vegetables | 4 (HarvestMoon) | Current: Season 3, Day 10 → 3 months |
| silk | 5 (SunDry) | Current: Season 6, Day 10 → 12 months |
| gemstone | 6 (Frostveil) | Current: Season 1, Day 10 → 10 months |
| ore | 7 (LongDark) | Current: Season 7, Day 40 → 1 month |

**Note:** A season has 48 days (2 months of 24 days each).

### Examples

#### Scenario 1: Abundant Local Supply
```typescript
localStorage = 200
monthsRemaining = 10
localBaseline = 10

localRatio = (200 / 10) / 10 = 2.0
localFactor = factor(2.0) = 1.414

// If subregion is also abundant:
localShortageFactor ≈ 1.414 × 0.75 + 1.414 × 0.25 = 1.414
// Prices are ~29% lower
```

#### Scenario 2: Local Shortage, Regional Surplus
```typescript
localStorage = 30
subRegionStorage = 600
monthsRemaining = 10
localBaseline = 10
subRegionBaseline = 50

localRatio = (30 / 10) / 10 = 0.3
subRegionRatio = (600 / 10) / 50 = 1.2

localFactor = factor(0.3) = 0.6 (clamped)
subRegionFactor = factor(1.2) = 1.0 (comfort band)

localShortageFactor = (0.6 × 0.75) + (1.0 × 0.25) = 0.7
// Prices are ~43% higher locally
// Players have incentive to travel to other locations in subregion
```

#### Scenario 3: End of Season Scarcity
```typescript
// It's day 47 of season 6, ore produces in season 7
monthsRemaining = 1

localStorage = 5
localBaseline = 10

localRatio = (5 / 1) / 10 = 0.5
localFactor = factor(0.5) = 0.707

// Prices spike as production nears
// Players should stock up or wait
```

## 3. Event Modifier

Event modifiers are **temporary** price changes triggered by global events, region events, or location events.

### When Applied
- Set by event cards via `market.setEventModifier(tradeable, modifier)`
- Persists until cleared via `market.clearEventModifier(tradeable)`
- Can stack with yearly and local modifiers

### Examples

#### Great Famine (Global Event)
```typescript
// Grain prices increase by 100%
market.setEventModifier("grain", 2.0);

// All grain prices globally are doubled
// On top of yearly and local modifiers!
```

#### Regional Conflict (Region Event)
```typescript
// Ore prices spike due to weapon demand
market.setEventModifier("ore", 1.5);

// Event description explains the price change
```

#### Bandit Raids (Region Event)
```typescript
// Trade goods become scarce
market.setEventModifier("silk", 1.3);
market.setEventModifier("herbs", 1.2);
```

#### Bountiful Harvest (Global Event)
```typescript
// Food prices drop
market.setEventModifier("grain", 0.7);
market.setEventModifier("vegetables", 0.7);
market.setEventModifier("fruits", 0.8);
```

### Event Modifier Best Practices

1. **Explain in event description** why prices changed
2. **Clear modifiers** when event ends
3. **Use reasonable values** (0.5 - 2.0 typical range)
4. **Multiple resources** can be affected by one event
5. **Stack carefully** - modifiers multiply!

## Complete Examples

### Example 1: Normal Market Conditions

**Item:** Iron Sword (basePrice = 100, primaryResource = "ore")

**Yearly Modifier:**
- Last year: 1000 ore produced / 1200 baseline = 0.833 ratio
- Yearly modifier = factor(0.833) = 0.913

**Local Shortage Factor:**
- Local storage: 100 ore
- Months remaining: 10
- Local baseline: 10
- Local ratio: (100/10)/10 = 1.0
- Local factor: 1.0
- Subregion factor: 1.0 (assume normal)
- Local shortage = 1.0

**Event Modifier:**
- No active events = 1.0

**Final Price:**
```typescript
price = 100 × 0.913 × 1.0 × 1.0 = 91.3
```

### Ratio Inversion for Shortage Logic

**CRITICAL:** The local shortage factor INVERTS the ratio before applying the factor function:

```typescript
// Calculate ratio
const localRatio = (localStorage / monthsRemaining) / localBaseline; // 0.4 for shortage

// INVERT the ratio (this is the key!)
const invertedRatio = 1 / localRatio; // 1 / 0.4 = 2.5

// Apply factor smoothing
const localFactor = factor(invertedRatio); // factor(2.5) = 1.581 (clamped to 1.6)
```

This ensures:
- **Low storage** (ratio 0.4) → inverted (2.5) → high factor (1.58) → **HIGH PRICES** ✓
- **High storage** (ratio 2.0) → inverted (0.5) → low factor (0.707) → **LOW PRICES** ✓
- **Normal storage** (ratio 1.0) → inverted (1.0) → normal factor (1.0) → **NORMAL PRICES** ✓

### Example 2: Wartime Shortage (CORRECTED)

**Item:** Iron Sword (basePrice = 100, primaryResource = "ore")

**Yearly Modifier:**
- Last year: 800 ore produced / 1200 baseline = 0.667 ratio
- Inverted ratio: 1 / 0.667 = 1.5
- Yearly modifier = factor(1.5) = 1.225 (prices up ~22.5%)

**Local Shortage Factor:**
- Local storage: 20 ore (depleted by weapon crafting)
- Months remaining: 5
- Local baseline: 10
- Local ratio: (20/5)/10 = 0.4
- **Inverted ratio**: 1/0.4 = 2.5
- Local factor: factor(2.5) = 1.581 (clamped to 1.6)
- Subregion also low: assume ratio 0.5 → inverted 2.0 → factor 1.414
- Local shortage = (1.6 × 0.75) + (1.414 × 0.25) = 1.554

**Event Modifier:**
- Regional Conflict event: 1.5

**Final Price:**
```typescript
price = 100 × 1.225 × 1.554 × 1.5 = 285.6
```

**Analysis:**
- Global shortage (+22.5% from yearly)
- Local shortage (+55.4% from local)
- War demand (+50% from event)
- **Total: +186% (prices nearly TRIPLE!)**
- Blacksmiths are making a fortune, common soldiers can't afford weapons
- Players scramble for ore or seek alternative materials

## System Integration

### GameLoop Integration

```typescript
// Yearly (Season 1, Day 1, Hour 1)
market.adjustYearlyPrices();
market.resourceTracker.resetYearlyTracking();

// Seasonally (Day 1, Hour 1)
market.adjustSeasonalPrices(); // Currently a no-op

// On resource production
market.resourceTracker.recordProduction(location, subRegion, resource, amount);

// On events
market.setEventModifier(resource, modifier);
```

### Location Integration

When locations generate resources:

```typescript
const amount = location.produceResource(resourceType);
market.resourceTracker.recordProduction(
  location.id,
  location.subRegion,
  resourceType,
  amount
);
```

### Transaction Integration

When players buy/sell:

```typescript
// Get current price
const price = market.getPrice(item, location);

// Record transaction
market.recordTransaction(location, item.id, quantity, isBuy);
```

## Testing Considerations

Key scenarios to test:

1. **Comfort band behavior**
   - Ratios 0.8-1.2 should return modifier of 1.0

2. **Extreme ratios**
   - Very low ratios should clamp to 0.6
   - Very high ratios should clamp to 1.6

3. **Months remaining edge cases**
   - Division by zero protection
   - Minimum 1 month

4. **Empty storage scenarios**
   - Zero local storage
   - Zero subregion storage

5. **Event modifier stacking**
   - Multiple modifiers
   - Clearing modifiers

6. **Yearly transition**
   - Production reset
   - Modifier recalculation

## Performance Notes

- **Yearly modifiers**: Cached, O(1) lookup
- **Local shortage**: Calculated on-demand, O(locations in subregion)
- **Event modifiers**: Map lookup, O(1)

For heavily-trafficked locations, consider caching local shortage factors with TTL.

## Future Enhancements

1. **Demand tracking**: Factor in buy/sell volumes
2. **Trade routes**: Price equalization between connected locations
3. **Market manipulation**: Player-driven price changes
4. **Speculation**: Allow players to buy/sell futures
5. **Dynamic baselines**: Adjust baselines based on long-term trends

