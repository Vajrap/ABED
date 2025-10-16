# Market Pricing System - Bug Fix and Documentation

## Summary

Fixed **critical bugs** in the market pricing system and created comprehensive documentation and tests.

## 🐛 Bugs Fixed

### Bug 1: Yearly Base Modifier Inverted
**Problem:** Global shortage decreased prices instead of increasing them
- Production 500/1000 (shortage) → factor(0.5) = 0.707 → prices DOWN ❌

**Fix:** Invert ratio before applying factor function
- Production 500/1000 → ratio 0.5 → **inverted 2.0** → factor(2.0) = 1.414 → prices UP ✓

```typescript
// OLD (WRONG):
const ratio = globalProduction / globalBaseline;
return factor(ratio); // shortage → low factor → LOW prices ❌

// NEW (CORRECT):
const ratio = globalProduction / globalBaseline;
const invertedRatio = ratio > 0 ? 1 / ratio : 10;
return factor(invertedRatio); // shortage → high factor → HIGH prices ✓
```

### Bug 2: Local Shortage Factor Inverted
**Problem:** Low local storage decreased prices instead of increasing them
- Storage low (ratio 0.4) → factor(0.4) = 0.632 → prices DOWN ❌

**Fix:** Invert ratio before applying factor function
- Storage low (ratio 0.4) → **inverted 2.5** → factor(2.5) = 1.581 → prices UP ✓

```typescript
// OLD (WRONG):
const localRatio = (localStorage / monthsRemaining) / localBaseline;
const localFactor = factor(localRatio); // low storage → LOW prices ❌

// NEW (CORRECT):
const localRatio = (localStorage / monthsRemaining) / localBaseline;
const invertedLocalRatio = localRatio > 0 ? 1 / localRatio : 10;
const localFactor = factor(invertedLocalRatio); // low storage → HIGH prices ✓
```

## ✅ Verification

### Test Results
- **34 tests, all passing**
- Covers:
  - Factor function with comfort band
  - Yearly base modifier (with inversion)
  - Local shortage factor (with inversion)
  - Edge cases (zero storage, extreme ratios)
  - Integration scenarios (wartime shortages, harvest cycles)

### Example: Wartime Ore Shortage
```typescript
// Scenario:
// - Global: 800/1200 produced = 33% below baseline
// - Local: 20 storage, 5 months until production, baseline 10/month
// - Event: Regional Conflict adds 50% demand

// Results:
basePrice = 100
yearly = 1.225 (global shortage adds 22.5%)
local = 1.540 (local shortage adds 54%)
event = 1.5 (war demand adds 50%)

finalPrice = 100 × 1.225 × 1.540 × 1.5 = 282.8

// Prices nearly TRIPLE (+183%)!
```

## 📁 Files Modified

### Core Implementation
- `Server/src/Entity/Market/PriceModifiers.ts`
  - Fixed `calculateYearlyBaseModifier()` - added ratio inversion
  - Fixed `calculateLocalShortageFactor()` - added ratio inversion
  - Added detailed comments explaining the inversion logic

### Tests
- `Server/Tests/Entity/Market/PriceModifiers.test.ts` **(NEW)**
  - 34 comprehensive tests
  - Covers all price modifier functions
  - Includes realistic scenarios
  - Validates inversion logic

### Documentation
- `Server/src/Entity/Market/MARKET_PRICING_SYSTEM.md` **(NEW)**
  - Complete pricing system documentation
  - Mathematical formulas with examples
  - Integration guidelines
  - Testing considerations

## 📊 Price Behavior (Corrected)

### Yearly Base Modifier Examples

| Production | Baseline | Ratio | Inverted | Modifier | Effect |
|------------|----------|-------|----------|----------|--------|
| 1000 | 1000 | 1.0 | 1.0 | 1.0 | No change |
| 900 | 1000 | 0.9 | 1.11 | 1.0 | In comfort band |
| 700 | 1000 | 0.7 | 1.43 | 1.195 | +19.5% |
| 500 | 1000 | 0.5 | 2.0 | 1.414 | +41.4% |
| 200 | 1000 | 0.2 | 5.0 | 1.6 (max) | +60% |
| 2000 | 1000 | 2.0 | 0.5 | 0.707 | -29.3% |
| 4000 | 1000 | 4.0 | 0.25 | 0.6 (min) | -40% |

### Local Shortage Factor Examples

| Storage | Months | Baseline | Ratio | Inverted | Factor | Effect |
|---------|--------|----------|-------|----------|--------|--------|
| 100 | 10 | 10 | 1.0 | 1.0 | 1.0 | Normal |
| 30 | 10 | 10 | 0.3 | 3.33 | 1.6 (max) | +60% |
| 50 | 10 | 10 | 0.5 | 2.0 | 1.414 | +41.4% |
| 200 | 10 | 10 | 2.0 | 0.5 | 0.707 | -29.3% |
| 400 | 10 | 10 | 4.0 | 0.25 | 0.6 (min) | -40% |

## 🎮 Game Impact

### Shortage Effects
When resources are scarce:
- ✅ Prices INCREASE (correct behavior)
- Players must:
  - Seek alternative materials
  - Travel to regions with better supply
  - Wait for next production cycle
  - Pay premium prices

### Surplus Effects
When resources are abundant:
- ✅ Prices DECREASE (correct behavior)
- Players benefit from:
  - Post-harvest bargains
  - Stockpiling opportunities
  - Profitable trade routes

### Event Multipliers
Events stack multiplicatively:
- Regional conflict + local shortage + global shortage = **3x prices!**
- Bountiful harvest + local surplus + global surplus = **0.35x prices!**

## 🔄 Integration Points

### GameLoop
```typescript
// Yearly (Season 1, Day 1, Hour 1)
market.adjustYearlyPrices(); // Recalculates based on last year

// Seasonally (Day 1, Hour 1)
market.adjustSeasonalPrices(); // Hook for future use

// On production
market.resourceTracker.recordProduction(location, subRegion, resource, amount);
```

### Event Cards
```typescript
// Region Event Cards can affect prices
onDraw: () => {
  market.setEventModifier("ore", 1.5); // War increases demand
  // ... generate news ...
}
```

### Player Transactions
```typescript
// Get current price (all modifiers applied automatically)
const price = market.getPrice(item, location);
const resourcePrice = market.getResourcePrice(resource, location, basePrice);

// Record transaction for market analysis
market.recordTransaction(location, tradeable, amount, isBuy);
```

## 🚀 Performance

- **Yearly modifiers**: Cached, O(1) lookup
- **Local shortage**: Calculated on-demand, O(locations in subregion)
- **Event modifiers**: Map lookup, O(1)

For high-traffic locations, consider caching local shortage factors with TTL.

## 🧪 Testing

Run tests:
```bash
cd Server
bun test Tests/Entity/Market/PriceModifiers.test.ts
```

All 34 tests should pass.

## 📝 Notes

### Comfort Band (0.8-1.2)
The comfort band prevents price volatility from minor fluctuations:
- Ratios between 0.8 and 1.2 return modifier of 1.0
- Provides price stability for players
- Prevents economic chaos from small variations

### Clamping (0.6-1.6)
Price modifiers are clamped to prevent extreme swings:
- Maximum price increase: **+60%**
- Maximum price decrease: **-40%**
- Multiple modifiers can stack beyond these limits

### Weighted Blend (75% Local, 25% SubRegion)
Local shortage factor prioritizes immediate surroundings:
- Players care most about their current location
- But regional context still matters
- Encourages travel to find better prices

## 🔮 Future Enhancements

1. **Demand Tracking**: Factor in buy/sell volumes
2. **Trade Routes**: Price equalization between connected locations
3. **Market Manipulation**: Player-driven price changes
4. **Speculation**: Futures trading system
5. **Dynamic Baselines**: Adjust based on long-term trends

## ✨ Result

The market pricing system now correctly implements supply-and-demand economics:
- ✅ Shortages increase prices
- ✅ Surpluses decrease prices
- ✅ Comprehensive testing validates behavior
- ✅ Full documentation for future developers
- ✅ No linter errors
- ✅ Production ready!

The bugs were subtle (inverted logic) but critical to gameplay balance. With these fixes, the economic system will create interesting player decisions and dynamic market conditions.

