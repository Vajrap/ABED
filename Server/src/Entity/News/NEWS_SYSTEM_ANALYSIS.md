# News System - Current State Analysis

## The Problem: 3 Layers of Complexity

### Current Types

```typescript
// 1. News - The actual news item
interface News {
  id: string;
  ts: GameTimeInterface;
  scope: NewsScope;        // ← Scope is HERE
  tokens: NewsToken[];
  context: NewsContext;
  secretTier: TierEnum;
}

// 2. NewsWithScope - Redundant wrapper
type NewsWithScope = {
  scope: NewsScope;        // ← Duplicated!
  news: News;              // ← News already has scope!
}

// 3. NewsEmittedFromLocationStructure - Final structure
type NewsEmittedFromLocationStructure = {
  worldScope: News[];
  regionScope: Map<RegionEnum, News[]>;
  subRegionScope: Map<SubRegionEnum, News[]>;
  locationScope: Map<LocationsEnum, News[]>;
  partyScope: Map<string, News[]>;
  privateScope: Map<string, News[]>;
}
```

### Issues

**1. Redundancy: NewsWithScope**
```typescript
// normalRest.ts - Lines 14-33
const news = createNews({
  scope: { kind: "privateScope", characterId: character.id },  // Scope 1
  // ...
});

return {
  scope: { kind: "privateScope", characterId: character.id },  // Scope 2 (duplicate!)
  news: news,
};
```

**The scope is stored TWICE!** This is completely redundant.

**2. Inconsistent Return Types**

Different handlers return different things:

```typescript
// Returns NewsWithScope
handleRestAction(): NewsWithScope | null

// Returns NewsWithScope[]
handleTrainArtisans(): NewsWithScope[]

// Returns News[]
drawSubRegionsWeatherCard(): News[]

// Returns NewsEmittedFromLocationStructure
processActions(): NewsEmittedFromLocationStructure
```

**3. Manual Mapping Everywhere**

```typescript
// In Location.ts - Line 283-284
if (result && result.scope.kind != "none")
  addToPartyScope(results, party.partyID, result.news);

// In Location.ts - Line 818-849
function addNewsWithScopeToNewsEmittedFromLocationStruct(data: {
  nws: NewsWithScope;
  nefls: NewsEmittedFromLocationStructure;
  // ... lots of parameters
}) {
  switch (data.nws.scope.kind) {
    case "privateScope":
      for (const characterId of data.characterIds) {
        addToPrivateScope(data.nefls, characterId, data.nws.news);
      }
      // ... manual mapping for each scope
  }
}

// In Location.ts - Line 613-637
function pushNewsToScope(result: NewsEmittedFromLocationStructure, news: News) {
  switch (news.scope.kind) {
    case "worldScope":
      result.worldScope.push(news);
    case "regionScope":
      addToRegionScope(result, news.scope.region, news);
    // ... manual mapping
  }
}
```

**We have MULTIPLE functions doing the same thing!**

**4. GameLoop Weather Handling**

```typescript
// GameLoop.ts - Line 143-147
const weatherNews = drawSubRegionsWeatherCard(); // Returns News[]

for (const wn of weatherNews) {
  addToSubRegionScope(allNews, wn.context.subRegion, wn); // Manual mapping
}
```

Why not just auto-map based on `wn.scope`?

## Flow Analysis

### Example: Player Rests

```
1. Player action → handleRestAction()
   ↓
2. Creates News with scope
   news = createNews({
     scope: { kind: "privateScope", characterId: "..." },
     ...
   })
   ↓
3. Wraps in NewsWithScope (redundant!)
   return { scope: {...}, news: news }
   ↓
4. Location.processActions() receives NewsWithScope
   ↓
5. Manually adds to structure
   addToPartyScope(results, party.partyID, result.news)
   ↓
6. LocationManager merges all structures
   ↓
7. GameLoop merges all structures
   ↓
8. Postman delivers
```

**Steps 3-5 could be automatic!**

### Example: Weather Update

```
1. drawSubRegionsWeatherCard() → returns News[]
   ↓
2. GameLoop manually maps each
   for (const wn of weatherNews) {
     addToSubRegionScope(allNews, wn.context.subRegion, wn);
   }
```

**This should be automatic!**

### Example: Event Cards (Our New System)

```
1. Event card onDraw()
   ↓
2. Creates News items
   const news1 = createNews({ scope: {...}, ... });
   const news2 = createNews({ scope: {...}, ... });
   ↓
3. MANUALLY builds entire structure
   return {
     worldScope: [news1],
     regionScope: new Map([[region, [news2]]]),
     subRegionScope: new Map(),
     locationScope: new Map(),
     partyScope: new Map(),
     privateScope: new Map(),
   }
```

**This is verbose and error-prone!**

## What We Actually Need

### Single Responsibility

**News object already has scope!**

```typescript
const news = createNews({
  scope: { kind: "regionScope", region: RegionEnum.CentralPlain },
  // ...
});

// Scope is in news.scope
// Why wrap it in NewsWithScope???
```

### Automatic Mapping

```typescript
// ANY function should just return News[]
function myHandler(): News[] {
  const news1 = createNews({ scope: { kind: "worldScope" }, ... });
  const news2 = createNews({ scope: { kind: "partyScope", partyId }, ... });
  return [news1, news2];
}

// Auto-convert to structure
const structure = newsArrayToStructure([news1, news2]);
```

### The Fix

**Option 1: Eliminate NewsWithScope**
- Handlers return `News[]`
- Auto-map based on `news.scope`
- Remove all manual mapping

**Option 2: Keep NewsWithScope but simplify**
- Remove redundant scope field
- Just pass News directly

**Option 3: Introduce NewsCollector (what I started)**
```typescript
const collector = new NewsCollector();
collector.emit(news1); // Auto-maps based on news.scope
collector.emit(news2);
return collector.getStructure();
```

## Recommendations

### Short Term (Low Risk)
1. Keep existing code working
2. Add `newsArrayToStructure()` helper
3. Gradually migrate handlers to use it

### Long Term (Cleaner)
1. Remove `NewsWithScope` entirely
2. All handlers return `News[]`
3. Auto-map everywhere

### Migration Path

```typescript
// Phase 1: Add helper (non-breaking)
export function newsArrayToStructure(newsList: News[]): NewsEmittedFromLocationStructure {
  const structure = emptyNewsStruct();
  for (const news of newsList) {
    pushNewsToScope(structure, news);
  }
  return structure;
}

// Phase 2: Use in GameLoop (easy win)
const weatherNews = drawSubRegionsWeatherCard();
const weatherStruct = newsArrayToStructure(weatherNews);
allNews = mergeNewsStructures(allNews, weatherStruct);

// Phase 3: Refactor event cards
onDraw: () => {
  const news = [
    createNews({ scope: { kind: "worldScope" }, ... }),
    createNews({ scope: { kind: "regionScope", region }, ... }),
  ];
  return newsArrayToStructure(news);
}

// Phase 4: Refactor handlers
handleRestAction(): News[] {  // Not NewsWithScope!
  return [createNews({ scope: {...}, ... })];
}
```

## What Postman Actually Needs

```typescript
// Postman just needs NewsEmittedFromLocationStructure
deliver(news: NewsEmittedFromLocationStructure) {
  // Builds cache
  // Sends to clients based on their scope
}
```

**So YES, you're right!** The final thing we need is `NewsEmittedFromLocationStructure`.

Everything else is just **how we collect the News items** before giving them to Postman.

## Summary

**Current:** 3 types, manual mapping, verbose, error-prone

**Ideal:** Events emit `News[]`, auto-map to structure, give to Postman

**Key Insight:** `News.scope` already tells us where it goes! We just need to map it automatically.

