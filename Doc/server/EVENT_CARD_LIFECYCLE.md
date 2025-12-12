# Global Event Card Lifecycle and Cleanup

## Overview

Global Event Cards have a complete lifecycle with proper cleanup mechanisms to ensure effects are properly applied and removed.

## Card Lifecycle

```
┌─────────────┐
│  Card Draw  │  ← onDraw() executed
└──────┬──────┘
       │
       v
┌─────────────┐
│   Active    │  ← Card effects are live
│   Period    │     (daily, weekly, monthly checks)
└──────┬──────┘
       │
       v
┌─────────────┐
│ Completion  │  ← completionCondition() returns true
│   Check     │
└──────┬──────┘
       │
       v
┌─────────────┐
│   onEnd()   │  ← Cleanup executed
│   Cleanup   │
└──────┬──────┘
       │
       v
┌─────────────┐
│  Completed  │  ← Card moved to completed pile
└─────────────┘
```

## Implementation

### 1. Card Structure

```typescript
export const myEventCard = new GlobalEventCard({
  id: GlobalEventCardEnum.MyEvent,
  name: "My Event Name",
  description: "What happens during this event",
  
  startingScale: 150,
  
  // Called when card is drawn
  onDraw: () => {
    // Apply effects here
    return newsStructure;
  },
  
  // Called when card completes
  onEnd: () => {
    // Cleanup effects here
    // No return value needed
  },
  
  // Determines when card completes
  completionCondition: () => {
    return someCondition;
  }
});
```

### 2. Types of Effects

#### A. Market Price Modifiers

**Use Case:** Temporarily change resource/item prices

```typescript
onDraw: () => {
  // Increase grain prices by 50%
  market.setEventModifier("grain", 1.5);
  // ...generate news
},

onEnd: () => {
  // Restore normal prices
  market.clearEventModifier("grain");
}
```

**Example:** Great Famine doubles food prices

#### B. Resource Capacity Changes

**Use Case:** Modify location resource generation

```typescript
// Store originals for restoration
const originalCapacities = new Map();

onDraw: () => {
  for (const location of locationRepository.values()) {
    // Store original
    originalCapacities.set(location.id, {
      grain: location.resourceGeneration.capacity.grain
    });
    
    // Modify
    location.resourceGeneration.capacity.grain *= 1.05;
  }
  // ...generate news
},

onEnd: () => {
  // Restore originals
  for (const location of locationRepository.values()) {
    const original = originalCapacities.get(location.id);
    if (original) {
      location.resourceGeneration.capacity.grain = original.grain;
    }
  }
  originalCapacities.clear();
}
```

**Example:** Mild Season increases crop yields by 5%

#### C. Temporary Flags/States

**Use Case:** Enable special behaviors

```typescript
// Module-level flag
let dragonThreatActive = false;

onDraw: () => {
  dragonThreatActive = true;
  // Other systems can check this flag
  // ...generate news
},

onEnd: () => {
  dragonThreatActive = false;
}
```

## Complete Examples

### Example 1: Mild Season (Resource Capacity)

```typescript
const originalCapacities = new Map();

export const mildSeason = new GlobalEventCard({
  id: GlobalEventCardEnum.MildSeason,
  name: "Mild Season",
  description: "Pleasant weather favors the crops this year. +5% crop yields.",
  
  startingScale: 100,
  
  onDraw: () => {
    // Boost all crop capacities by 5%
    for (const location of locationRepository.values()) {
      originalCapacities.set(location.id, {
        grain: location.resourceGeneration.capacity.grain,
        vegetables: location.resourceGeneration.capacity.vegetables,
        fruits: location.resourceGeneration.capacity.fruits,
      });
      
      location.resourceGeneration.capacity.grain = Math.floor(
        location.resourceGeneration.capacity.grain * 1.05
      );
      location.resourceGeneration.capacity.vegetables = Math.floor(
        location.resourceGeneration.capacity.vegetables * 1.05
      );
      location.resourceGeneration.capacity.fruits = Math.floor(
        location.resourceGeneration.capacity.fruits * 1.05
      );
    }
    
    return {
      worldScope: [createNews({
        scope: { kind: "worldScope" },
        tokens: [{ t: "text", v: "Farmers report: 'Not bad, not great. A decent season.'" }],
        context: { /* ... */ },
        secretTier: TierEnum.common
      })],
      // ...
    };
  },
  
  onEnd: () => {
    // Restore original capacities
    for (const location of locationRepository.values()) {
      const original = originalCapacities.get(location.id);
      if (original) {
        location.resourceGeneration.capacity.grain = original.grain;
        location.resourceGeneration.capacity.vegetables = original.vegetables;
        location.resourceGeneration.capacity.fruits = original.fruits;
      }
    }
    originalCapacities.clear();
  },
  
  completionCondition: () => true // Completes at year end
});
```

**Flow:**
1. **Year starts** → Card drawn → `onDraw()` executes
2. **During year** → Farmers produce 5% more crops
3. **Year ends** → `completionCondition()` returns true
4. **Cleanup** → `onEnd()` restores original capacities
5. **Next year** → Back to normal production

### Example 2: Great Famine (Market Prices)

```typescript
export const greatFamine = new GlobalEventCard({
  id: GlobalEventCardEnum.GreatFamine,
  name: "The Great Famine",
  description: "Catastrophic food shortage. Prices soar.",
  
  startingScale: 150,
  
  onDraw: () => {
    // Double all food prices
    market.setEventModifier("grain", 2.0);
    market.setEventModifier("vegetables", 2.0);
    market.setEventModifier("fruits", 2.0);
    market.setEventModifier("livestock", 1.8);
    
    return {
      worldScope: [createNews({
        scope: { kind: "worldScope" },
        tokens: [{ 
          t: "text", 
          v: "FAMINE! Crops fail worldwide. Food prices double overnight!" 
        }],
        context: { /* ... */ },
        secretTier: TierEnum.rare
      })],
      // ...
    };
  },
  
  onEnd: () => {
    // Restore normal prices
    market.clearEventModifier("grain");
    market.clearEventModifier("vegetables");
    market.clearEventModifier("fruits");
    market.clearEventModifier("livestock");
  },
  
  completionCondition: () => {
    // Could check:
    // - Has enough food been distributed?
    // - Have players completed relief quests?
    // - Has X time passed?
    return someCondition;
  }
});
```

**Flow:**
1. **Famine starts** → Card drawn → `onDraw()` executes
2. **Immediate effect** → All food prices double
3. **Players struggle** → Must pay 2x for food or find alternatives
4. **Completion** → Players complete relief quests / time passes
5. **Cleanup** → `onEnd()` restores normal prices
6. **Relief** → Food becomes affordable again

### Example 3: Combined Effects

```typescript
const originalCapacities = new Map();

export const dragonHorde = new GlobalEventCard({
  id: GlobalEventCardEnum.DragonHorde,
  name: "Dragon Horde",
  description: "Dragons raid settlements, destroying crops and driving up weapon prices.",
  
  startingScale: 200,
  
  onDraw: () => {
    // Effect 1: Reduce crop capacities (dragon raids)
    for (const location of locationRepository.values()) {
      originalCapacities.set(location.id, {
        grain: location.resourceGeneration.capacity.grain,
      });
      
      // Crops burned by dragons
      location.resourceGeneration.capacity.grain = Math.floor(
        location.resourceGeneration.capacity.grain * 0.7
      );
    }
    
    // Effect 2: Increase weapon prices (demand for defense)
    market.setEventModifier("ore", 1.5);
    market.setEventModifier("wood", 1.3);
    
    return { /* ...news about dragon attacks */ };
  },
  
  onEnd: () => {
    // Cleanup 1: Restore crop capacities
    for (const location of locationRepository.values()) {
      const original = originalCapacities.get(location.id);
      if (original) {
        location.resourceGeneration.capacity.grain = original.grain;
      }
    }
    originalCapacities.clear();
    
    // Cleanup 2: Restore normal prices
    market.clearEventModifier("ore");
    market.clearEventModifier("wood");
  },
  
  completionCondition: () => {
    // Dragons defeated by players or naturally leave
    return dragonsDefeated || timeElapsed > threshold;
  }
});
```

## GameLoop Integration

The GameLoop automatically handles the lifecycle:

```typescript
// In GameLoop.ts - handleGameMilestones()

if (hour === 1) {
  // Check daily if card is complete
  if (gameState.activeGlobalEventCards?.completionCondition()) {
    // Execute cleanup
    if (gameState.activeGlobalEventCards.onEnd) {
      gameState.activeGlobalEventCards.onEnd();
      Report.info(`Event "${gameState.activeGlobalEventCards.name}" ended`);
    }
    
    // Mark as complete
    gameState.lastGlobalEventCardCompleted = true;
    gameState.completedGlobalEventCards.push(gameState.activeGlobalEventCards);
    gameState.activeGlobalEventCards = undefined;
  }
}
```

## Best Practices

### 1. Always Provide Both `onDraw` and `onEnd`

```typescript
// ✅ GOOD
onDraw: () => {
  market.setEventModifier("ore", 1.5);
  return news;
},
onEnd: () => {
  market.clearEventModifier("ore");
}

// ❌ BAD - No cleanup!
onDraw: () => {
  market.setEventModifier("ore", 1.5);
  return news;
}
// Effect will persist forever!
```

### 2. Store Original Values for Restoration

```typescript
// ✅ GOOD - Module-level storage
const originalValues = new Map();

onDraw: () => {
  originalValues.set(id, currentValue);
  // modify...
},
onEnd: () => {
  const original = originalValues.get(id);
  // restore...
  originalValues.clear();
}

// ❌ BAD - No way to restore
onDraw: () => {
  location.capacity *= 1.5; // Original value lost!
}
```

### 3. Handle Edge Cases

```typescript
onEnd: () => {
  // Check if value exists before restoring
  for (const location of locationRepository.values()) {
    const original = originalCapacities.get(location.id);
    if (original) { // ← Important check!
      location.resourceGeneration.capacity.grain = original.grain;
    }
  }
  
  // Always clear storage
  originalCapacities.clear();
}
```

### 4. Use Appropriate Completion Conditions

```typescript
// Simple: Time-based
completionCondition: () => {
  return GameTime.year > startYear;
}

// Complex: Player actions
completionCondition: () => {
  return dragonsDefeated >= requiredDefeats || 
         reliefsDistributed >= requiredRelief;
}

// Immediate: Card completes at year end
completionCondition: () => true
```

## Testing Cleanup

To test that cleanup works correctly:

```typescript
// 1. Draw card
const card = gameState.activeGlobalEventCards;
const newsDraw = card.onDraw?.();

// 2. Verify effects are active
expect(market.eventModifiers.get("grain")).toBe(2.0);

// 3. Trigger completion
if (card.onEnd) {
  card.onEnd();
}

// 4. Verify cleanup happened
expect(market.eventModifiers.get("grain")).toBeUndefined();
```

## Common Patterns

### Pattern 1: Market Price Adjustment

```typescript
onDraw: () => {
  market.setEventModifier(resource, multiplier);
  return news;
},
onEnd: () => {
  market.clearEventModifier(resource);
}
```

### Pattern 2: Capacity Modification

```typescript
const originals = new Map();

onDraw: () => {
  for (const loc of locationRepository.values()) {
    originals.set(loc.id, loc.capacity.resource);
    loc.capacity.resource *= modifier;
  }
  return news;
},
onEnd: () => {
  for (const loc of locationRepository.values()) {
    loc.capacity.resource = originals.get(loc.id) ?? default;
  }
  originals.clear();
}
```

### Pattern 3: State Flag Toggle

```typescript
let featureEnabled = false;

onDraw: () => {
  featureEnabled = true;
  return news;
},
onEnd: () => {
  featureEnabled = false;
}
```

## Troubleshooting

### Problem: Effects persist after card ends

**Cause:** No `onEnd` handler or it's not cleaning up properly

**Solution:**
```typescript
onEnd: () => {
  // Add cleanup here!
  market.clearEventModifier(resource);
  originalValues.clear();
}
```

### Problem: Can't restore original values

**Cause:** Didn't store them in `onDraw`

**Solution:**
```typescript
const originals = new Map(); // Module-level

onDraw: () => {
  originals.set(id, currentValue); // Store first!
  // Then modify...
}
```

### Problem: Memory leak from stored values

**Cause:** Forgot to clear storage in `onEnd`

**Solution:**
```typescript
onEnd: () => {
  // Restore values...
  
  originalValues.clear(); // Don't forget!
}
```

## Summary

- ✅ Always implement both `onDraw` and `onEnd`
- ✅ Store original values before modifications
- ✅ Clear storage after restoration
- ✅ Test that cleanup works correctly
- ✅ Use appropriate completion conditions
- ✅ Handle edge cases (missing values, etc.)

The lifecycle system ensures that:
- Effects are applied when cards are drawn
- Effects are properly cleaned up when cards complete
- No lingering modifications pollute the game state
- Cards can be reshuffled and reused safely

