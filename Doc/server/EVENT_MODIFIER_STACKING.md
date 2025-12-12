# Market Event Modifier Stacking System

## Problem: Modifier Conflicts

**Original Issue:** Event modifiers would overwrite each other:

```typescript
// Global Event: Great Famine
market.setEventModifier("grain", 2.0);  // Sets to 2.0

// Region Event: Drought (later)
market.setEventModifier("grain", 1.3);  // OVERWRITES to 1.3 ❌

// Global Event ends
market.clearEventModifier("grain");     // Removes BOTH ❌
```

## Solution: Stacking System with Event IDs

Each event gets a unique ID, and modifiers **stack multiplicatively**:

```typescript
// Global Event: Great Famine
market.setEventModifier("grain", 2.0, "GreatFamine");  // grain: {"GreatFamine": 2.0}

// Region Event: Drought
market.setEventModifier("grain", 1.3, "Drought_CentralPlain");  // grain: {"GreatFamine": 2.0, "Drought_CentralPlain": 1.3}

// Combined modifier: 2.0 × 1.3 = 2.6 ✓

// Global Event ends
market.clearEventModifier("grain", "GreatFamine");  // grain: {"Drought_CentralPlain": 1.3}

// Drought continues: modifier is now 1.3 ✓
```

## How It Works

### Data Structure

```typescript
// OLD (conflicting):
eventModifiers: Map<Tradeable, number>

// NEW (stacking):
eventModifiers: Map<Tradeable, Map<string, number>>
//                  ^resource    ^eventId  ^modifier
```

**Example:**
```typescript
{
  "grain": {
    "GreatFamine": 2.0,
    "Drought_CentralPlain": 1.3,
    "BlessedHarvest": 0.9
  },
  "ore": {
    "RegionalConflict_North_Boreal": 1.5
  }
}
```

### Calculation

When getting a price, **all modifiers multiply together**:

```typescript
const modifiers = eventModifiers.get("grain");
// {"GreatFamine": 2.0, "Drought_CentralPlain": 1.3}

let eventMod = 1.0;
for (const modifier of modifiers.values()) {
  eventMod *= modifier;
}
// eventMod = 1.0 × 2.0 × 1.3 = 2.6

finalPrice = basePrice × yearlyMod × localMod × eventMod;
```

## API Usage

### Setting Modifiers

```typescript
market.setEventModifier(
  tradeable: string,    // Resource/item to modify
  modifier: number,     // Multiplier (2.0 = double, 0.5 = half)
  eventId: string       // Unique event identifier
);
```

**Examples:**

```typescript
// Global Event
market.setEventModifier("grain", 2.0, "GreatFamine");

// Region Event (use unique ID per region)
market.setEventModifier("ore", 1.5, "War_NorthernReach_BorealFrost");

// Location Event
market.setEventModifier("wood", 0.8, "ForestRegrowth_Greenwood");
```

### Clearing Modifiers

```typescript
market.clearEventModifier(
  tradeable: string,    // Resource/item
  eventId: string       // Event to remove
);
```

**Examples:**

```typescript
// Remove only the famine modifier
market.clearEventModifier("grain", "GreatFamine");

// Remove region war modifier
market.clearEventModifier("ore", "War_NorthernReach_BorealFrost");
```

### Querying Modifiers

```typescript
// Get combined modifier
const combined = market.getEventModifier("grain");
// Returns: 2.6 (all modifiers multiplied)

// Get individual modifiers (for debugging/display)
const modifiers = market.getEventModifiers("grain");
// Returns: Map { "GreatFamine" => 2.0, "Drought_CentralPlain" => 1.3 }
```

## Event ID Conventions

Use descriptive, unique IDs to prevent conflicts:

### Global Events
```typescript
// Use the enum value directly
const eventId = GlobalEventCardEnum.GreatFamine;
market.setEventModifier("grain", 2.0, eventId);
```

### Region Events
```typescript
// Include affected regions
const eventId = `${RegionEventCardEnum.RegionalConflict}_${region1}_${region2}`;
market.setEventModifier("ore", 1.5, eventId);
```

### Location Events
```typescript
// Include location
const eventId = `ForestFire_${location.id}`;
market.setEventModifier("wood", 1.8, eventId);
```

### Temporary Effects
```typescript
// Include timestamp or unique counter
const eventId = `PlayerQuest_${questId}_${playerId}`;
market.setEventModifier("silk", 0.7, eventId);
```

## Complete Examples

### Example 1: Global + Region Stacking

```typescript
// === GLOBAL EVENT: Great Famine ===
export const greatFamine = new GlobalEventCard({
  id: GlobalEventCardEnum.GreatFamine,
  
  onDraw: () => {
    const eventId = GlobalEventCardEnum.GreatFamine;
    market.setEventModifier("grain", 2.0, eventId);      // Double
    market.setEventModifier("vegetables", 2.0, eventId);
    return news;
  },
  
  onEnd: () => {
    const eventId = GlobalEventCardEnum.GreatFamine;
    market.clearEventModifier("grain", eventId);
    market.clearEventModifier("vegetables", eventId);
  }
});

// === REGION EVENT: Drought ===
export const drought = new RegionEventCard({
  id: RegionEventCardEnum.DroughtWarning,
  
  onDraw: () => {
    const eventId = `${RegionEventCardEnum.DroughtWarning}_${RegionEnum.CentralPlain}`;
    market.setEventModifier("grain", 1.3, eventId);      // Additional 30%
    return news;
  }
});

// === TIMELINE ===

// Month 1: Global Famine starts
// - grain modifier: {"GreatFamine": 2.0}
// - combined: 2.0
// - grain price: base × 2.0 = DOUBLED

// Month 3: Regional Drought in Central Plain
// - grain modifier: {"GreatFamine": 2.0, "DroughtWarning_CentralPlain": 1.3}
// - combined: 2.0 × 1.3 = 2.6
// - grain price: base × 2.6 = 2.6x (160% increase!)

// End of Year: Famine ends
// - onEnd() clears "GreatFamine"
// - grain modifier: {"DroughtWarning_CentralPlain": 1.3}
// - combined: 1.3
// - grain price: base × 1.3 (still elevated from drought)

// Season ends: Region card effects could be cleared
// - grain modifier: {}
// - combined: 1.0
// - grain price: back to normal
```

### Example 2: Multiple Regional Conflicts

```typescript
// War in the North
const eventId1 = "RegionalConflict_North_Boreal";
market.setEventModifier("ore", 1.5, eventId1);    // +50% demand

// War in the East
const eventId2 = "RegionalConflict_East_Frontier";
market.setEventModifier("ore", 1.4, eventId2);    // +40% demand

// Combined effect on ore:
// 1.5 × 1.4 = 2.1 (110% increase!)
// Multiple regional conflicts compound the global shortage
```

### Example 3: Offsetting Effects

```typescript
// Negative event
market.setEventModifier("silk", 1.8, "TradeBan_SilentDesert");     // +80%

// Positive event
market.setEventModifier("silk", 0.9, "SilkFestival_Atmahn");      // -10%

// Combined:
// 1.8 × 0.9 = 1.62 (still +62%, but partially offset)
```

## Integration with Event Cards

### Global Event Cards (with cleanup)

```typescript
export const myGlobalEvent = new GlobalEventCard({
  id: GlobalEventCardEnum.MyEvent,
  
  onDraw: () => {
    // Use card ID as eventId
    const eventId = GlobalEventCardEnum.MyEvent;
    
    market.setEventModifier("resource", modifier, eventId);
    return news;
  },
  
  onEnd: () => {
    // Clear using same eventId
    const eventId = GlobalEventCardEnum.MyEvent;
    
    market.clearEventModifier("resource", eventId);
  }
});
```

### Region Event Cards (manual cleanup)

Region Event Cards are drawn 8 times per year and don't have automatic cleanup. Options:

**Option 1: Seasonal Cleanup**
```typescript
// In GameLoop, at start of new season:
if (dayOfSeason === 1 && hour === 1) {
  // Clear all region event modifiers from last season
  // Implementation needed
}
```

**Option 2: Duration-based**
```typescript
// Region cards could store an expiration
const eventId = `${cardId}_${RegionEnum.X}_${timestamp}`;
market.setEventModifier("ore", 1.5, eventId);

// Later, cleanup expired modifiers
// Implementation needed
```

**Option 3: One-time Price Spike**
```typescript
// Don't use market modifiers at all
// Instead, directly adjust location stockpiles
// This creates temporary scarcity without permanent modifiers
```

## Mathematical Properties

### Multiplication Order Doesn't Matter

```typescript
2.0 × 1.3 × 0.9 = 2.34
1.3 × 2.0 × 0.9 = 2.34
0.9 × 1.3 × 2.0 = 2.34
```

### Neutral Value is 1.0

```typescript
1.0 × modifier = modifier  // No effect
```

### Increase vs Decrease

```typescript
// Increase by 50%: modifier = 1.5
// Decrease by 50%: modifier = 0.5

// Double: 2.0
// Half: 0.5
// Triple: 3.0
// Third: 0.33
```

### Stacking Examples

```typescript
// Two 50% increases:
1.5 × 1.5 = 2.25 (125% total increase)

// Two 50% decreases:
0.5 × 0.5 = 0.25 (75% total decrease)

// One increase, one decrease:
1.5 × 0.8 = 1.2 (20% net increase)
```

## Benefits

### ✅ No Conflicts

Events don't overwrite each other - they stack

### ✅ Individual Cleanup

Each event can be removed independently

### ✅ Compound Effects

Multiple crises create dramatic price spikes

### ✅ Easy to Debug

Can see all active modifiers with `getEventModifiers()`

### ✅ Flexible

Works for Global, Region, and Location events

## Performance

- **O(1)** to set a modifier
- **O(1)** to clear a modifier
- **O(n)** to calculate combined modifier (where n = number of active modifiers for that resource)
- **O(1)** space per modifier

For typical usage (1-5 modifiers per resource), performance is excellent.

## Testing

```typescript
// Test stacking
market.setEventModifier("grain", 2.0, "event1");
market.setEventModifier("grain", 1.5, "event2");

const combined = market.getEventModifier("grain");
expect(combined).toBe(3.0); // 2.0 × 1.5

// Test individual cleanup
market.clearEventModifier("grain", "event1");

const afterClear = market.getEventModifier("grain");
expect(afterClear).toBe(1.5); // Only event2 remains

// Test complete cleanup
market.clearEventModifier("grain", "event2");

const final = market.getEventModifier("grain");
expect(final).toBe(1.0); // Back to normal
```

## Common Patterns

### Pattern 1: Temporary Global Effect

```typescript
onDraw: () => {
  market.setEventModifier(resource, modifier, cardId);
},
onEnd: () => {
  market.clearEventModifier(resource, cardId);
}
```

### Pattern 2: Regional Crisis

```typescript
const eventId = `${cardId}_${region1}_${region2}`;
market.setEventModifier(resource, modifier, eventId);
// Clear at end of season or when conflict resolves
```

### Pattern 3: Quest Reward

```typescript
// Player completes quest - temporary price discount
const eventId = `Quest_${questId}_${playerId}`;
market.setEventModifier(resource, 0.8, eventId);

// Clear after X days or Y purchases
setTimeout(() => {
  market.clearEventModifier(resource, eventId);
}, duration);
```

## Summary

The stacking system ensures:
- ✅ Multiple events can affect the same resource
- ✅ Effects multiply together (compound)
- ✅ Each event cleans up only its own modifiers
- ✅ No conflicts or overwrites
- ✅ Easy to debug and monitor
- ✅ Works for all event types (Global, Region, Location)

Use descriptive eventIds and you'll have a robust, flexible price modification system! 🎉

