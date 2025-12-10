# NPC Memory Loading Strategy

## Overview

NPC memory (prompts and known news) is **lazily loaded** - only fetched from the database when actually needed (e.g., when a player starts chatting with an NPC).

## Why Lazy Loading?

### Memory Considerations

With **200 NPCs** and typical prompt sizes:

- **Character objects**: Already large (~5-10KB each) = **1-2MB** for 200 NPCs
- **Prompts**: 2-5KB each = **400KB-1MB** for 200 NPCs
- **Known news arrays**: Variable, but could be 1-2KB each = **200-400KB**
- **Total additional memory if loaded eagerly**: ~**600KB-1.4MB**

### Performance Benefits

1. **Faster server startup**: Don't load unnecessary data
2. **Lower memory usage**: Only load what's actually used
3. **Most prompts unused**: Players only chat with a few NPCs at a time
4. **Cache-able**: Loaded prompts can be cached for the request

## Implementation

### Loading Characters (Current)

```typescript
// On server startup - loads ALL characters
loadCharactersFromDatabase()
// → Loads into characterManager
// → NO prompts/ memory loaded
```

### Loading NPC Memory (Lazy)

```typescript
// When player chats with NPC
import { getNPCMemory } from "./Services/NPCMemoryService";

const memory = await getNPCMemory(npcId, includeNewsDetails: true);
// → Loads from database only when needed
// → Cached for subsequent requests
```

## Usage Example

### Chat API Endpoint (Future)

```typescript
// When player starts chat with NPC
async function handleNPCChat(npcId: string, playerMessage: string) {
  // 1. Get character (already in memory)
  const npc = characterManager.getCharacterByID(npcId);
  
  // 2. Load memory only now (lazy loading)
  const memory = await getNPCMemory(npcId, includeNewsDetails: true);
  
  if (!memory || !memory.personalPrompt) {
    return { error: "NPC has no memory data" };
  }
  
  // 3. Build LLM prompt with:
  // - Personal prompt
  // - Known news context
  // - Current conversation
  const llmPrompt = buildLLMPrompt({
    npcPrompt: memory.personalPrompt,
    knownNews: memory.newsDetails,
    npcCharacter: npc,
    conversationHistory: [], // Could also be stored in memory table
  });
  
  // 4. Call LLM API
  const response = await callLLM(llmPrompt, playerMessage);
  
  return { response };
}
```

## Memory Cache

The service includes a simple in-memory cache:
- Caches loaded memory per request/session
- Avoids repeated DB queries
- Can be replaced with Redis later for distributed caching

## When to Load

Load NPC memory when:
- ✅ Player starts chatting with NPC
- ✅ Generating NPC dialogue dynamically
- ✅ Building NPC knowledge context for LLM

Don't load when:
- ❌ Server startup
- ❌ Loading all NPCs for display
- ❌ Battle encounters (unless needed for dialogue)

## Future Optimizations

1. **Redis Cache**: Distributed caching across server instances
2. **Batch Loading**: Load multiple NPCs at once if needed
3. **Pre-load Hot NPCs**: Load frequently-chatted NPCs on startup
4. **Memory Limits**: Limit cache size and evict least-used entries

## API Methods

```typescript
// Get memory (lazy load)
const memory = await getNPCMemory(npcId, includeNewsDetails: true);

// Update prompt dynamically
await updateNPCPrompt(npcId, "Updated prompt...");

// Add news as it spreads
await addNewsToNPC(npcId, newsId);

// Remove expired news
await removeNewsFromNPC(npcId, newsId);
```

