# Market and Pricing System

## Overview

Dynamic market system with **3-level price modifiers**:

1. **Global Yearly Modifier** (sticky, huge impact) - Based on global production vs baseline
2. **Local Shortage Factor** (seasonal) - Based on local/subregion storage vs baseline
3. **Event Modifiers** (temporary) - From global events like wars, famines, etc.

**Final Price = Base Price × Yearly Modifier × Local Shortage × Event Modifier**

## Architecture

### Resources vs Items

**Resources** (Generic, tracked as numbers):
- `ore`, `wood`, `grain`, etc.
- Stored in `Location.resourceGeneration.stockpile`
- Generated seasonally via `Location.refillResources()`
- Example: Player mines and gets 15 "ore" (just a number)

**Items** (Specific objects with properties):
- `Iron Ore`, `Iron Sword`, `Healing Potion`, etc.
- Have base cost, tier, crafting recipe
- Can have `primaryResource` (e.g., Iron Sword → "ore")
- Example: Player crafts Iron Sword using ore(resource) + Iron Ore(item)

## How It Works

### 1. Production Tracking

**Every season** when `Location.refillResources()` is called:
- Resources are generated (fish in Spring, grain in Harvest, etc.)
- Production amounts are recorded at 3 levels: Location, SubRegion, Global
- Tracked by `ResourceProductionTracker`

### 2. Yearly Price Adjustment

**Every new year** (Season 1, Day 1, Hour 1):
```typescript
market.adjustYearlyPrices();
market.resourceTracker.resetYearlyTracking();
```

This:
- Compares last year's global production to baseline
- Calculates sticky modifier using comfort band (0.8-1.2 = stable)
- Modifier clamped between 0.6x-1.6x (prevents extreme swings)

**Formula:**
```typescript
globalRatio = globalProduction / globalBaseline
if (ratio between 0.8-1.2) return 1.0  // No change
else return clamp(√ratio, 0.6, 1.6)    // Smoothed
```

### 3. Local Shortage Calculation

**Dynamic** - calculated on-demand when `getPrice()` is called:

```typescript
// Local storage per month vs local baseline
localRatio = (localStorage / monthsUntilNextProduction) / localBaseline

// SubRegion storage per month vs subregion baseline  
subRegionRatio = (subRegionStorage / monthsUntilNextProduction) / subRegionBaseline

// Apply factor smoothing to both
localFactor = factor(localRatio)
subRegionFactor = factor(subRegionRatio)

// Weighted blend: 75% local, 25% subregion
localShortageFactor = (localFactor × 0.75) + (subRegionFactor × 0.25)
```

### 4. Event Modifiers

Global events can affect prices:
```typescript
// Great Famine increases grain prices
market.setEventModifier("grain", 1.5); // +50%

// Kingdom March increases ore prices
market.setEventModifier("ore", 1.2); // +20%
```

## Usage Examples

### Getting Item Price

```typescript
import { market } from "../Entity/Market/Market";
import { ItemRepository } from "../Entity/Repository/Item";

const ironSword = ItemRepository.get("ironSword");
const price = market.getPrice(ironSword, LocationsEnum.FyonarCity);
```

### Getting Resource Price

```typescript
const orePrice = market.getResourcePrice(
  "ore",
  LocationsEnum.FyonarCity,
  10 // base price
);
```

### Creating Items with Resource Links

```typescript
const ironSword = new Item({
  id: "ironSword",
  name: "Iron Sword",
  cost: new ItemCost({ baseCost: 100 }),
  primaryResource: "ore", // Price follows ore market
  resource: new Map([
    ["ore", 5],        // Needs 5 ore resource
    ["ironOre", 1],    // Needs 1 Iron Ore item
    ["wood", 2]        // Needs 2 wood resource
  ])
});
```

### Recording Transactions

```typescript
// Player buys 5 iron swords in Fyonar City
market.recordTransaction(
  LocationsEnum.FyonarCity,
  "ironSword",
  5,
  true // isBuy
);

// Player sells 10 ore
market.recordTransaction(
  LocationsEnum.FyonarCity,
  "ore",
  10,
  false // isSell
);
```

## Price Calculation Flow

```
Player buys Iron Sword in Fyonar City
  ↓
market.getPrice(ironSword, FyonarCity)
  ↓
basePrice = 100 (from item.cost.baseCost)
  ↓
yearlyMod = 1.2 (ore had poor year globally)
  ↓
localMod = 0.9 (Fyonar has good ore storage)
  ↓
eventMod = 1.3 (Kingdom March increases metal prices)
  ↓
finalPrice = 100 × 1.2 × 0.9 × 1.3 = 140.4
```

## Integration Points

### GameLoop Integration

**New Year** (Season 1, Day 1):
```typescript
market.adjustYearlyPrices();              // Calculate yearly modifiers
market.resourceTracker.resetYearlyTracking(); // Reset for new year
```

**New Season** (Day 1):
```typescript
locationManager.refillResources();  // Generates resources + reports to tracker
market.adjustSeasonalPrices();      // Hook for future seasonal adjustments
```

**Currently in**: `Server/src/Game/GameLoop.ts` lines 101-103 and 113-114

### Production Reporting

**Automatic** - when resources are generated:
```typescript
// Location.refillResources() now returns Map<string, number>
const generated = location.refillResources();
// → { "fish": 100, "livestock": 50 }

// LocationManager reports to market
market.resourceTracker.recordProduction(
  location.id,
  location.subRegion,
  "fish",
  100
);
```

## Baselines

Baselines are **auto-calculated** from Location RGC capacities:
- **Location baseline** = capacity value
- **SubRegion baseline** = sum of all location capacities in subregion
- **Global baseline** = sum of all location capacities worldwide

This means:
- If a location has `fish: { capacity: 1000, rate: 100 }`, baseline is 1000
- If all locations globally can produce 50,000 fish, global baseline is 50,000

## Testing

Run market-related tests:
```bash
bun test Tests/Entity/Location/Location.refillResources.test.ts
# All 23 tests pass
```

## Files

- `types.ts` - Type definitions
- `PriceModifiers.ts` - Factor calculation, shortage calculation
- `ResourceProductionTracker.ts` - Production tracking at 3 levels
- `Market.ts` - Main market class with pricing logic

## Future Enhancements

When ready to implement:
- [ ] Demand-based pricing (use transaction history)
- [ ] Market manipulation (player actions affecting prices)
- [ ] Cross-location arbitrage opportunities
- [ ] Seasonal base prices (different base costs per season)
- [ ] Supply chain disruptions (blocked routes affect prices)

