# News Archive System - Complete Implementation

## ✅ System Complete

The NewsArchive system is fully implemented with dual-axis design, multi-front spreading, gradual decay, and database persistence.

## 🎯 Dual-Axis Design

### Problem Solved

**Before:** `TierEnum` conflated importance with secrecy
- Party rest = common? (boring) But also secret? (private)
- Regional flood = legendary? (important) But also common knowledge? (public)

**After:** Two independent axes

```typescript
interface News {
  significance: NewsSignificance;  // How important?
  propagation: NewsPropagation;    // How does it spread?
}
```

### Axis 1: Significance (Importance)

```typescript
enum NewsSignificance {
  TRIVIAL,     // Daily routine → Decays in 1 day
  MINOR,       // Small achievement → Decays in 10 days
  NOTABLE,     // Interesting event → Decays in 30 days
  MAJOR,       // Significant event → Decays in 90 days
  MOMENTOUS,   // World-changing → Decays in 365 days
}
```

### Axis 2: Propagation (Spread Potential)

```typescript
enum NewsPropagation {
  SECRET,       // Never spreads
  PRIVATE,      // Never spreads
  LOCAL,        // Spreads to nearby locations (daily, 80% chance)
  REGIONAL,     // Spreads regionally (every 2 days, 65% chance)
  CONTINENTAL,  // Spreads far (every 3 days, 55% chance)
  GLOBAL,       // Spreads everywhere (every 5 days, 100% chance)
}
```

## 📊 Examples

### Example 1: Party Rest

```typescript
significance: TRIVIAL     // Boring, daily activity
propagation: SECRET       // Won't spread
→ Gone in 1 day, only party knows
```

### Example 2: Regional Flood

```typescript
significance: MAJOR       // Disaster!
propagation: CONTINENTAL  // Spreads far
→ Lasts 90 days, spreads to distant regions
```

### Example 3: Legendary Item Crafted

```typescript
significance: MOMENTOUS   // Historic achievement!
propagation: GLOBAL       // Everyone will know
→ Lasts 365 days, becomes world legend
```

## 🗄️ NewsArchive Class (OOP)

### In-Memory Storage

```typescript
class NewsArchive {
  private newsById: Map<string, NewsRecord>;
  private newsByLocation: Map<LocationsEnum, Set<string>>;
  private characterKnowledge: Map<string, Set<string>>;
}

interface NewsRecord {
  news: News;
  createdDay: number;
  currentLocations: Set<LocationsEnum>;  // Multi-front spreading!
  freshness: number;                      // 100 → 0
  lastSpreadDay: number;
}
```

### Core Methods

**Lifecycle:**
```typescript
loadFromDatabase()    // Server start - load active news
archiveNews(news)     // Add new news (in-memory)
dailySpread()         // Multi-front spreading with d20 rolls
dailyDecay()          // Reduce freshness
saveToDatabase()      // Daily save to DB
```

**Queries:**
```typescript
getNewsAtLocation(location, filters)
getNewsForCharacter(charId, location, filters)
markAsRead(charId, newsId)
shareNews(fromCharId, toCharId, newsId)
getStats()
```

## 🌊 Multi-Front Spreading

**Key Innovation:** News spreads from ALL current locations simultaneously

```typescript
dailySpread() {
  for each news:
    if (not time to spread yet) continue;
    
    // Spread from ALL current locations!
    for each frontLocation in news.currentLocations:
      for each neighbor of frontLocation:
        if (already there) continue;
        
        // Roll d20 vs spreadDC
        roll = d20();
        if (roll >= spreadDC):
          news.currentLocations.add(neighbor);  // Spread!
}
```

**Example Timeline:**
```
Day 1: News at Location A
Day 2: Spreads to B, C (neighbors of A)
Day 3: Spreads from A, B, C to D, E, F (multi-front!)
Day 4: Spreads from A, B, C, D, E, F to G, H, I, J...
```

News fans out exponentially from multiple fronts!

## 📉 Gradual Decay

**Freshness Score:** 100 (fresh) → 0 (decayed)

```typescript
dailyDecay() {
  for each news:
    age = currentDay - createdDay;
    decayRate = getDecayRate(news.significance);
    
    freshness = max(0, 100 - age * decayRate);
    
    if (freshness === 0):
      remove from archive;
}
```

**Decay Rates:**
| Significance | Rate/Day | Lifespan |
|--------------|----------|----------|
| TRIVIAL | 100 | 1 day |
| MINOR | 10 | 10 days |
| NOTABLE | 3.33 | 30 days |
| MAJOR | 1.11 | 90 days |
| MOMENTOUS | 0.27 | 365 days |

## 🎲 Spread Mechanics

### Spread Config

```typescript
interface NewsSpreadConfig {
  spreadPeriod: number;  // How often to try (days)
  spreadDC: number;      // d20 difficulty (1-20)
}
```

**Default Configs:**

| Propagation | Period | DC | Success Rate |
|-------------|--------|----|--------------|
| SECRET | ∞ | 20 | 0% (never) |
| PRIVATE | ∞ | 20 | 0% (never) |
| LOCAL | 1 day | 5 | 80% |
| REGIONAL | 2 days | 8 | 65% |
| CONTINENTAL | 3 days | 10 | 55% |
| GLOBAL | 5 days | 1 | 100% |

### Custom Override

```typescript
createNews({
  propagation: NewsPropagation.REGIONAL,
  spreadConfig: {
    spreadPeriod: 1,  // Override: spread daily instead of every 2 days
    spreadDC: 5,      // Override: easier to spread (80% vs 65%)
  }
})
```

## 🏗️ LocationGraph Service

**Purpose:** Track which locations connect to which

```typescript
class LocationGraph {
  getConnections(location): LocationsEnum[]
  getDistance(from, to): number  // BFS
  getLocationsWithin(center, maxDist): LocationsEnum[]
}
```

**Used by:**
- NewsArchive (for spreading)
- Travel system (for route planning)

**Built from:** `Location.connectedLocations`

## 💾 Database Persistence

### Schema (4 Tables)

**1. news_archive**
- Stores all news
- Fields: id, gameTime, scope, tokens, significance, propagation, currentReach, freshness

**2. news_spread_queue** (NOT USED YET)
- Future: queue-based spreading

**3. character_news_knowledge**
- Tracks what each character knows
- Fields: characterId, newsId, learnedAtGameDay, source, isRead

**4. location_news_reach**
- Tracks which news has reached which locations
- Fields: locationId, newsId, reachedAtGameDay

### Save Strategy

**When:** Daily at hour 1 (GameLoop)

**How:** Full replace
```typescript
// Delete all
await db.delete(newsArchiveTable);

// Insert current state
await db.insert(newsArchiveTable).values([...all news]);
```

**Why:** Simple, ensures consistency, no orphaned records

### Load Strategy

**When:** Server start

**What:** Only non-decayed news
```typescript
loadFromDatabase() {
  for each record:
    calculate current freshness;
    if (freshness > 0):
      load into memory;
}
```

## 🔄 GameLoop Integration

```typescript
// Daily at hour 1
if (hour === 1) {
  newsArchiveService.dailySpread();   // Multi-front spreading
  newsArchiveService.dailyDecay();    // Reduce freshness
  await newsArchiveService.saveToDatabase();  // Persist
  
  // ... rest of daily logic
}
```

## 📐 Auto-Inference

News auto-infers reasonable defaults from scope:

| Scope | Default Significance | Default Propagation |
|-------|---------------------|---------------------|
| worldScope | MAJOR | GLOBAL |
| regionScope | NOTABLE | REGIONAL |
| subRegionScope | MINOR | LOCAL |
| locationScope | MINOR | LOCAL |
| partyScope | TRIVIAL | PRIVATE |
| privateScope | TRIVIAL | SECRET |

**Can override:**
```typescript
createNews({
  scope: { kind: "partyScope", partyId },
  significance: NewsSignificance.MOMENTOUS,  // Override!
  propagation: NewsPropagation.GLOBAL,       // Override!
  // Legendary party achievement that everyone will know!
})
```

## 🧪 Test Coverage

```
LocationGraph:     11 tests ✓
NewsArchive:       22 tests ✓
NewsMapping:       16 tests ✓
──────────────────────────────
Total:             49 tests ✓
```

Tests cover:
- Graph construction & BFS
- Dual-axis system
- Archiving & indexing
- Decay mechanics
- Spread mechanics
- Character knowledge
- News sharing
- Filtering
- Statistics

## 📁 Files Created/Modified

**Created:**
- `NewsEnums.ts` - Significance & Propagation enums
- `NewsSpreadConfig.ts` - Spread config & decay rates
- `NewsArchive.ts` - OOP archive class
- `LocationGraph.ts` - Location connectivity service
- `Schema/news.ts` - Database schema (4 tables)
- Tests (3 files, 49 tests total)

**Modified:**
- `News.ts` - Added significance/propagation, auto-inference
- `GameTime.ts` - Added getDaysSinceEpoch()
- `GameLoop.ts` - Integrated daily spread/decay/save
- `Schema/index.ts` - Export news tables

## 🎮 Gameplay Impact

### Players Experience Dynamic News

**Day 1:** Party fights bandits at Location A
- Only Location A knows (immediate)
- Significance: NOTABLE
- Propagation: LOCAL

**Day 2:** News spreads to B, C (80% chance each)
- Travelers share the story
- Nearby towns hear about it

**Day 3:** Spreads from A, B, C to D, E, F (multi-front!)
- Story radiates outward
- Multiple people retelling it

**Day 30:** News fully decays
- Old news, not interesting anymore
- Removed from archive

### Economic/Social Impact

**Legendary Events:**
- Spread across world over months
- Become permanent legends (365 days)
- Affect prices, quests, NPC reactions

**Secret Achievements:**
- Never spread (SECRET)
- Only character knows
- Can't share (or requires special action)

**Regional Disasters:**
- Spread regionally (65% chance every 2 days)
- Last 90 days
- Create migration, price changes

## 🚀 Performance

**In-Memory:** O(1) lookups by newsId or location
**Spreading:** O(news × locations × connections) daily
**Decay:** O(news) daily
**Save:** One batch write daily

**Estimates:**
- 1,000 active news items
- 100 locations
- 5 connections each
- Daily spread: ~5,000 checks (< 1ms)
- Daily decay: 1,000 updates (< 1ms)
- Daily save: 1 batch write (< 100ms)

**Total: < 200ms daily overhead**

## ✨ Key Features

1. **Dual-Axis** - Separate importance from spread
2. **Multi-Front** - Spreads from all current locations
3. **Probabilistic** - d20 rolls make spreading interesting
4. **Gradual Decay** - News fades over time
5. **Database Persistence** - Survives server restarts
6. **Character Knowledge** - Tracks what each player knows
7. **News Sharing** - Players can share non-secret news
8. **Flexible Filtering** - By significance, freshness, read status
9. **Location Graph** - Useful for travel planning too
10. **Fully Tested** - 49 tests validate behavior

## 🎉 Result

The NewsArchive system provides:
- ✅ Living, breathing world with spreading rumors
- ✅ News that actually decays and becomes irrelevant
- ✅ Realistic information propagation
- ✅ Character knowledge tracking
- ✅ Database persistence
- ✅ High performance (in-memory with daily saves)
- ✅ Fully tested (49 tests)
- ✅ Ready for production!

News is no longer just instant notifications - it's a **living information ecosystem** that spreads, decays, and shapes the player experience! 🌊

