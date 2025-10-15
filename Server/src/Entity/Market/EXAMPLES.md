# Market System Usage Examples

## Example 1: Simple Price Check

```typescript
import { market } from "./Market";
import { Item } from "../Item/Item";
import { ItemCost } from "../Item/Subclass/ItemCost";
import { LocationsEnum } from "../../InterFacesEnumsAndTypes/Enums/Location";

// Create an iron sword
const ironSword = new Item({
  id: "ironSword",
  name: "Iron Sword",
  baseCost: 100,
  primaryResource: "ore"
});

// Get price at Fyonar City
const price = market.getPrice(ironSword, LocationsEnum.FyonarCity);
console.log(`Iron Sword costs ${price} gold in Fyonar City`);

// Get price at another location
const price2 = market.getPrice(ironSword, LocationsEnum.BrayhornVillage);
console.log(`Iron Sword costs ${price2} gold in Brayhorn Village`);
```

## Example 2: Resource Prices

```typescript
// Get ore price at a location
const orePrice = market.getResourcePrice(
  "ore",
  LocationsEnum.FyonarCity,
  10 // base price per unit
);

console.log(`Ore sells for ${orePrice} per unit`);

// Compare across locations
const cities = [
  LocationsEnum.FyonarCity,
  LocationsEnum.BrayhornVillage,
  LocationsEnum.MeadowbrookVillage
];

cities.forEach(city => {
  const price = market.getResourcePrice("ore", city, 10);
  console.log(`${city}: ${price} gold/ore`);
});
```

## Example 3: Global Event Affecting Prices

```typescript
// Great Famine event increases grain prices
market.setEventModifier("grain", 1.5); // +50%

const breadBefore = market.getPrice(bread, location);
console.log(`Bread before famine: ${breadBefore}`);

// After event modifier
const breadAfter = market.getPrice(bread, location);
console.log(`Bread during famine: ${breadAfter}`);

// Clear modifier when event ends
market.clearEventModifier("grain");
```

## Example 4: Year-over-Year Price Changes

```typescript
// Year 1: Good harvest
// Locations produce 12,000 grain total (baseline: 10,000)
// Global ratio = 12,000 / 10,000 = 1.2
// Yearly modifier = factor(1.2) = 1.0 (in comfort band)

market.adjustYearlyPrices();
const grainPrice1 = market.getResourcePrice("grain", location, 10);
// = 10 × 1.0 × localMod = ~10 gold (stable)

// Year 2: Poor harvest  
// Locations produce 6,000 grain (baseline: 10,000)
// Global ratio = 6,000 / 10,000 = 0.6
// Yearly modifier = factor(0.6) = √0.6 ≈ 0.77 → clamped to 0.6

market.adjustYearlyPrices();
const grainPrice2 = market.getResourcePrice("grain", location, 10);
// = 10 × 0.6 × localMod = ~6 gold (shortage = lower prices? Wait...)

// Actually inverted! Low production = HIGH prices
// The formula creates scarcity pricing
```

## Example 5: Local Shortage vs Abundance

```typescript
// Location A: 500 ore in storage, baseline 100
// 5 months until next ore season
// localRatio = (500 / 5) / 100 = 100 / 100 = 1.0
// factor(1.0) = 1.0 → Normal price

// Location B: 50 ore in storage, baseline 100  
// 5 months until next ore season
// localRatio = (50 / 5) / 100 = 10 / 100 = 0.1
// factor(0.1) = √0.1 ≈ 0.316 → clamped to 0.6
// → Ore is 40% cheaper? No wait, low storage should mean HIGH price

// Need to check: does low ratio = high price or low price?
// From doc: shortage = high price, so maybe formula needs inverting?
```

## Example 6: Transaction Tracking

```typescript
// Track all trades in a location
market.recordTransaction(
  LocationsEnum.FyonarCity,
  "ironSword",
  3,
  true // bought
);

market.recordTransaction(
  LocationsEnum.FyonarCity,
  "ore",
  50,
  false // sold
);

// Get transaction history
const record = market.getTransactionRecord(
  LocationsEnum.FyonarCity,
  "ironSword"
);

console.log(`Iron Swords: ${record.bought} bought, ${record.sold} sold`);
```

## Example 7: Seasonal Price Changes

```typescript
// Spring (Season 1): Fish just produced
// Local storage: 1000 fish, baseline: 100/month, 6 months until next
// localRatio = (1000 / 6) / 100 = 1.67
// factor(1.67) = √1.67 ≈ 1.29
// Fish price drops (abundant supply)

// Late Winter (Season 7): 1 month until fish season
// Local storage: 50 fish, baseline: 100/month, 1 month until next
// localRatio = (50 / 1) / 100 = 0.5
// factor(0.5) = √0.5 ≈ 0.707 → clamped to 0.707
// Fish price changes based on scarcity
```

## Implementation Notes

### Formula Clarification Needed

The current implementation uses:
```typescript
finalPrice = basePrice × yearlyMod × localMod
```

If **low storage = high price** (scarcity pricing), the formula might need:
```typescript
finalPrice = basePrice × yearlyMod × (1 / localMod)
// OR
localMod = 1 / factor(ratio)
```

Check your design doc to confirm whether low ratios should increase or decrease prices.

### Baseline Calculation

Currently auto-calculated from location capacities:
- Works for testing
- For production, you may want to set explicit baseline values
- Override via `ResourceProductionTracker` constructor

### Circular Dependencies

Market uses dynamic imports to avoid circular deps:
```typescript
const { market } = require("../Entity/Market/Market");
```

This works but could be cleaner with better module organization.

## Testing Price Formulas

```typescript
// Test comfort band (0.8-1.2)
expect(factor(0.9)).toBe(1.0);  // No change
expect(factor(1.1)).toBe(1.0);  // No change

// Test extremes
expect(factor(0.5)).toBe(0.707); // √0.5, not clamped
expect(factor(0.3)).toBe(0.6);   // Clamped to min
expect(factor(2.0)).toBe(1.414); // √2.0, not clamped  
expect(factor(3.0)).toBe(1.6);   // Clamped to max
```

## Next Steps

When ready to use the system:

1. **Define items with primaryResource**:
   ```typescript
   const items = [
     { id: "ironSword", primaryResource: "ore", baseCost: 100 },
     { id: "woodenBow", primaryResource: "wood", baseCost: 50 },
     { id: "bread", primaryResource: "grain", baseCost: 2 }
   ];
   ```

2. **Test price changes**:
   - Generate resources normally → check prices stay stable
   - Cause shortage → verify prices increase appropriately
   - Trigger global event → confirm event modifiers apply

3. **Integrate with trading**:
   - Call `market.recordTransaction()` on buy/sell
   - Use transaction history for future demand-based pricing

4. **Balance the numbers**:
   - Adjust base prices for game economy
   - Tune baselines to match intended production
   - Test that comfort band keeps prices reasonable

