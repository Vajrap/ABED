# AI Tools & Integration Plan

## Current State

### Existing Tools (2)
1. ✅ `checkJoinParty` - Check if NPC can join player's party
2. ✅ `initiateBattle` - NPC defends themselves when threatened

### Existing Infrastructure
- ✅ Tool execution service (`ToolExecutionService.ts`)
- ✅ Chat history & summarization (`ChatSummarizationService.ts`)
- ✅ NPC memory system (`NPCMemoryService.ts`)
- ✅ NPC impression/relationship system (`NPCCharacterRelationService.ts`)
- ✅ LM Studio integration (`LMStudioService.ts`)
- ✅ Chat prompt builder (`ChatPromptBuilder.ts`)

### Missing Infrastructure
- ❌ Rate limiting (10 exchanges in 15 minutes)
- ❌ RAG system for game lore
- ❌ Memory summarization strategy
- ❌ Impression update automation

---

## Proposed Tools

### Category 1: Information Query Tools (RAG-like)
**Purpose:** Provide game world information without overwhelming the prompt

#### 1.1 World/Location Information
- `getRegionDescription(regionId: string)` - Get region lore, history, current state
- `getSubRegionDescription(subRegionId: string)` - Get sub-region details
- `getLocationDescription(locationId: string)` - Get location info, NPCs present, shops, features
- `getKingdomDescription(kingdomId: string)` - Get kingdom lore, politics, relationships

#### 1.2 Character Information
- `getCharacterDescription(characterId: string)` - Get character background, relationships, current status
- `getImportantCharacterDescription(characterId: string)` - Get detailed info about major NPCs
- `getCharacterRelationships(characterId: string)` - Get who this character knows/likes/dislikes

#### 1.3 Game Content Information
- `getQuestDescription(questId: string)` - Get quest details, objectives, rewards
- `getItemDescription(itemId: string)` - Get item lore, stats, rarity
- `getSkillDescription(skillId: string)` - Get skill details, requirements
- `getEventDescription(eventId: string)` - Get current/upcoming events

**Implementation:** These should query a RAG database (vector store) of game lore, not include everything in the prompt.

---

### Category 2: Game State Query Tools
**Purpose:** Let AI understand current game state

#### 2.1 Character State
- `getCharacterInfo(characterId: string)` - Get character stats, level, location, party
- `getCharacterInventory(characterId: string)` - Get what character has
- `getCharacterQuests(characterId: string)` - Get active/completed quests
- `getCharacterFame(characterId: string)` - Get reputation in different regions

#### 2.2 Party State
- `getPartyInfo(partyId: string)` - Get party members, location, status
- `getPartyLocation(partyId: string)` - Get where party is, what's nearby

#### 2.3 World State
- `getLocationState(locationId: string)` - Get current events, NPCs present, market prices
- `getNewsContext(locationId?: string, regionId?: string)` - Get recent news relevant to context
- `getMarketPrices(locationId: string, itemIds?: string[])` - Get current prices

---

### Category 3: Game Action Tools (Affect Game State)
**Purpose:** Let AI actually do things in the game

#### 3.1 Quest Actions
- `offerQuest(npcId: string, playerId: string, questId: string)` - NPC offers a quest
- `acceptQuest(questId: string, playerId: string)` - Player accepts quest (via NPC)
- `turnInQuest(questId: string, playerId: string)` - Player completes quest (via NPC)
- `checkQuestProgress(questId: string, playerId: string)` - Check quest status

#### 3.2 Trade/Item Actions
- `offerTrade(npcId: string, playerId: string, items: TradeOffer)` - NPC offers to trade
- `giveItem(npcId: string, playerId: string, itemId: string, quantity: number)` - NPC gives item
- `requestItem(npcId: string, playerId: string, itemId: string, quantity: number)` - NPC requests item
- `sellItem(npcId: string, playerId: string, itemId: string, quantity: number, price: number)` - NPC sells item

#### 3.3 Social Actions
- `updateRelationship(npcId: string, playerId: string, change: number, reason: string)` - Change relationship
- `shareKnowledge(npcId: string, playerId: string, knowledgeType: string)` - Share information
- `requestFavor(npcId: string, playerId: string, favorType: string)` - NPC asks for favor

#### 3.4 Movement Actions
- `suggestLocation(npcId: string, playerId: string, locationId: string, reason: string)` - Suggest player go somewhere
- `inviteToLocation(npcId: string, playerId: string, locationId: string)` - Invite player to follow

---

### Category 4: Memory & Impression Management
**Purpose:** Help AI remember and form impressions

#### 4.1 Memory Tools
- `updateMemory(npcId: string, playerId: string, memory: string, importance: number)` - Store important memory
- `getRelevantMemories(npcId: string, playerId: string, context: string)` - Retrieve relevant memories
- `summarizeConversation(npcId: string, playerId: string)` - Summarize recent chat

#### 4.2 Impression Tools
- `updateImpression(npcId: string, playerId: string, change: number, reason: string)` - Update impression
- `getImpression(npcId: string, playerId: string)` - Get current impression
- `addImpressionNote(npcId: string, playerId: string, note: string)` - Add note to impression

---

## Rate Limiting Strategy

### Chat Rate Limiting
- **Limit:** 10 exchanges per 15 minutes per player-NPC pair
- **Storage:** Track in database or Redis
- **Response:** When limit reached, return friendly message like "I need a moment to think. Let's continue this conversation later."

### Implementation
```typescript
interface ChatRateLimit {
  npcId: string;
  playerId: string;
  exchanges: Array<{ timestamp: Date }>;
  windowStart: Date;
}

function checkRateLimit(npcId: string, playerId: string): boolean {
  // Get recent exchanges in last 15 minutes
  // If >= 10, return false
  // Otherwise, record new exchange and return true
}
```

---

## RAG System Design

### Why RAG?
- Game lore is huge (regions, locations, characters, history, quests)
- Can't fit everything in prompt context
- Need to retrieve relevant information on-demand

### Architecture

#### 1. Vector Database
- **Option A:** Use existing DB with pgvector extension (PostgreSQL)
- **Option B:** Use dedicated vector DB (Qdrant, Pinecone, Chroma)
- **Recommendation:** Start with pgvector (already using PostgreSQL)

#### 2. Embedding Model
- **Option A:** Use OpenAI embeddings (if using OpenAI API)
- **Option B:** Use local embedding model (sentence-transformers, all-MiniLM-L6-v2)
- **Recommendation:** Start with local model for cost/privacy

#### 3. Content to Embed
- Region descriptions
- Location descriptions
- Character backgrounds
- Quest descriptions
- Item lore
- Historical events
- Kingdom/empire lore

#### 4. Retrieval Strategy
- When AI needs info, embed the query
- Search vector DB for similar content
- Return top 3-5 most relevant chunks
- Include in prompt context

### Implementation Steps
1. Set up pgvector extension
2. Create embeddings table
3. Generate embeddings for all lore content
4. Create retrieval function
5. Add tools that use retrieval

---

## Memory Summarization Strategy

### Current State
- Chat history stored per conversation
- Summarization exists but not automated
- No strategy for when to summarize

### Proposed Strategy

#### When to Summarize
1. **After 10 messages** - Summarize recent conversation
2. **After 15 minutes** - Summarize if conversation paused
3. **On important events** - Summarize when relationship changes significantly
4. **On tool calls** - Summarize after quest offers, trades, etc.

#### What to Summarize
- Key topics discussed
- Player's interests/preferences
- NPC's responses/attitudes
- Important decisions made
- Relationship changes

#### Storage
- Store summaries in `npc_memories` table
- Link to specific conversation
- Use for future context

---

## Impression Update Automation

### Current State
- Impression system exists
- Manual updates only
- No automatic updates based on conversation

### Proposed Strategy

#### Automatic Updates
1. **Positive interactions** - Compliments, help, gifts → +1 to +3
2. **Negative interactions** - Threats, insults, refusal → -1 to -3
3. **Quest completion** - Complete NPC's quest → +5
4. **Quest failure** - Fail NPC's quest → -3
5. **Trade fairness** - Fair trades → +1, unfair → -1

#### Update Triggers
- After each conversation (analyze sentiment)
- After quest completion/failure
- After trade completion
- After tool calls (quest offers, etc.)

---

## Implementation Priority

### Phase 1: Foundation (Week 1)
1. ✅ Rate limiting system
2. ✅ Memory summarization automation
3. ✅ Impression update automation
4. ✅ Basic RAG setup (pgvector)

### Phase 2: Information Tools (Week 2)
1. ✅ RAG retrieval system
2. ✅ `getRegionDescription`
3. ✅ `getLocationDescription`
4. ✅ `getCharacterDescription`
5. ✅ `getQuestDescription`

### Phase 3: State Query Tools (Week 2-3)
1. ✅ `getCharacterInfo`
2. ✅ `getPartyInfo`
3. ✅ `getLocationState`
4. ✅ `getNewsContext`

### Phase 4: Action Tools (Week 3-4)
1. ✅ `offerQuest`
2. ✅ `acceptQuest`
3. ✅ `turnInQuest`
4. ✅ `offerTrade`
5. ✅ `giveItem`

### Phase 5: Memory Tools (Week 4)
1. ✅ `updateMemory`
2. ✅ `getRelevantMemories`
3. ✅ `updateImpression`

---

## MCP Protocol Consideration

### Option A: Full MCP Server
- Expose all tools via MCP protocol
- External AI can connect and use tools
- More flexible, standardized

### Option B: Direct Tool Calling
- Tools embedded in LM Studio API calls
- Simpler, no external protocol needed
- Current approach

### Recommendation
- **Start with Option B** (current approach) - simpler, faster
- **Consider Option A later** if we want external AI integration
- Both approaches can coexist

---

## Database Schema Additions

### Chat Rate Limiting
```sql
CREATE TABLE chat_rate_limits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  npc_id UUID NOT NULL,
  player_id UUID NOT NULL,
  exchange_count INTEGER DEFAULT 0,
  window_start TIMESTAMP NOT NULL,
  last_exchange TIMESTAMP NOT NULL,
  UNIQUE(npc_id, player_id)
);
```

### RAG Embeddings
```sql
CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE lore_embeddings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_type VARCHAR(50) NOT NULL, -- 'region', 'location', 'character', etc.
  content_id VARCHAR(255) NOT NULL,
  content_text TEXT NOT NULL,
  embedding vector(384), -- Adjust based on model
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX ON lore_embeddings USING ivfflat (embedding vector_cosine_ops);
```

### Memory Summaries
```sql
ALTER TABLE npc_memories ADD COLUMN conversation_summaries JSONB DEFAULT '[]';
-- Store array of summaries: [{ timestamp, summary, messageCount }]
```

---

## Next Steps

1. **Create this plan document** ✅
2. **Set up rate limiting** - Start here
3. **Set up RAG system** - pgvector + embeddings
4. **Implement first tool** - `getLocationDescription` (good test case)
5. **Add rate limiting to chat endpoint**
6. **Test with real NPC conversation**

---

## Questions to Answer

1. **Embedding model choice** - Local vs. API?
2. **Vector DB choice** - pgvector vs. dedicated?
3. **Rate limit storage** - Database vs. Redis?
4. **Tool execution** - Synchronous vs. asynchronous?
5. **MCP protocol** - Now or later?

