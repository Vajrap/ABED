# NPC Character Prompts

## Overview

Each NPC has a `characterPrompt` field that contains a detailed prompt for LLM/OpenAI interactions. This prompt describes the NPC's personality, background, current state, and conversation style, enabling dynamic conversations with players.

## Purpose

- **LLM Interactions**: Used when players chat with NPCs through OpenAPI/LLM
- **Dynamic Updates**: Can be updated during gameplay to reflect:
  - Relationship changes
  - Story events
  - Character growth
  - World state changes

## Structure

The prompt should include:

1. **Identity**: Who the NPC is
2. **Personality**: How they behave and think
3. **Background**: Their history and experiences
4. **Current State**: What's happening with them now
5. **Conversation Style**: How they speak and interact

## Example Prompt Structure

```
You are [Name], [Role/Title]. You are [age/description], [personality traits].

Your personality:
- Trait 1
- Trait 2
- Trait 3

Your background:
- Background detail 1
- Background detail 2

Current state:
- Current situation 1
- Current situation 2

Conversation style:
- How they speak
- What phrases they use
- Their communication patterns
```

## Database Storage

- **Column**: `character_prompt` (text field)
- **Nullable**: Yes (not all NPCs may have prompts initially)
- **Migration**: `0015_add_character_prompt.sql`

## Usage in Templates

Add to `NPCTemplate`:

```typescript
{
  id: "npc_id",
  name: { en: "Name", th: "ชื่อ" },
  // ... other fields
  characterPrompt: `You are [Name]...`,
}
```

## Future: Dynamic Updates

The prompt can be updated dynamically:
- Via admin API (future)
- Based on game events
- As relationships change
- After story events

Example update scenarios:
- After player helps NPC: "You are grateful to the player..."
- After major story event: "Recent events have changed your perspective..."
- As relationship improves: "You've grown closer to the player..."

## Best Practices

1. **Be Specific**: Include concrete details about personality and behavior
2. **Include Context**: Mention their role, location, relationships
3. **Conversation Style**: Give examples of how they speak
4. **Current State**: Keep it updated with current situation
5. **Relationships**: Mention important relationships with other NPCs

## Examples

See `Server/src/Entity/Character/NPCs/definitions/index.ts` for complete examples:
- `wayward_inn_innkeeper` (Thomas)
- `wayward_inn_barmaid` (Sarah)

