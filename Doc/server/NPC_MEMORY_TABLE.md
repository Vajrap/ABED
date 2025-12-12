# NPC Memory Table

## Overview

The `npc_memory` table stores NPC-specific data that's separate from core character stats. This includes:
- **Personal Prompt**: LLM/OpenAI interaction prompts for dynamic conversations
- **Known News**: Array of news IDs that the NPC knows about (from `news_archive` table)

## Schema

```sql
CREATE TABLE "npc_memory" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "npc_id" uuid NOT NULL UNIQUE REFERENCES "characters"("id") ON DELETE CASCADE,
  "personal_prompt" text,
  "known_news" jsonb DEFAULT '[]'::jsonb NOT NULL,
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL
);
```

## Fields

### `id` (uuid, primary key)
- Auto-generated unique identifier for the memory record

### `npc_id` (uuid, unique, foreign key)
- References `characters.id`
- One-to-one relationship: each NPC has exactly one memory record
- ON DELETE CASCADE: if NPC is deleted, memory is also deleted

### `personal_prompt` (text, nullable)
- Character prompt for LLM/OpenAI interactions
- Describes personality, background, current state, conversation style
- Can be updated dynamically during gameplay
- Very large text field to support detailed prompts

### `known_news` (jsonb array, default: [])
- Array of news archive UUIDs: `["uuid1", "uuid2", ...]`
- References `news_archive.id`
- Tracks which news events the NPC knows about
- Used to keep NPCs knowledgeable of world events
- Can be updated as news spreads through the world

### Timestamps
- `created_at`: When the memory record was created
- `updated_at`: When the memory record was last updated

## Usage

### Querying NPC Memory

```typescript
import { db } from "./Database/connection";
import { npcMemory, newsArchive } from "./Database/Schema";
import { eq } from "drizzle-orm";

// Get NPC's prompt and known news
const memory = await db
  .select()
  .from(npcMemory)
  .where(eq(npcMemory.npcId, npcId))
  .limit(1);

// Get full news details for known news IDs
if (memory[0]?.knownNews.length > 0) {
  const news = await db
    .select()
    .from(newsArchive)
    .where(inArray(newsArchive.id, memory[0].knownNews));
}
```

### Updating NPC Memory

```typescript
// Update prompt
await db
  .update(npcMemory)
  .set({
    personalPrompt: "New updated prompt...",
    updatedAt: new Date(),
  })
  .where(eq(npcMemory.npcId, npcId));

// Add news to known news
const currentMemory = await db
  .select()
  .from(npcMemory)
  .where(eq(npcMemory.npcId, npcId))
  .limit(1);

if (currentMemory[0]) {
  const updatedNews = [...currentMemory[0].knownNews, newNewsId];
  await db
    .update(npcMemory)
    .set({
      knownNews: updatedNews,
      updatedAt: new Date(),
    })
    .where(eq(npcMemory.npcId, npcId));
}
```

## Benefits of Separate Table

1. **Separation of Concerns**: Character stats vs. NPC-specific data
2. **Scalability**: Can add more NPC-specific fields without bloating characters table
3. **Performance**: Only query memory table when needed
4. **Clean Schema**: Characters table stays focused on character data
5. **Future Expansion**: Easy to add more memory-related fields (relationships, quests, etc.)

## Relationship with Characters Table

- **One-to-One**: Each NPC character has exactly one memory record
- **Foreign Key**: `npc_id` references `characters.id`
- **Cascade Delete**: Deleting an NPC automatically deletes its memory

## Migration

- Migration: `0016_create_npc_memory_table.sql`
- Index: `npc_memory_npc_idx` on `npc_id` for fast lookups

## Future Enhancements

Potential additions to this table:
- Conversation history with players
- NPC-specific quest states
- Personal notes/memories about players
- Dynamic relationship updates
- Event triggers and responses

