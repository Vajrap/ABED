# NPC System Architecture

## Overview

The NPC (Non-Player Character) system uses a **hybrid approach** that combines:
1. **Character Templates in Code** - Type-safe definitions with defaults
2. **Character Instances in Database** - Dynamic, growable NPC data
3. **Seed Scripts** - Idempotent scripts to populate initial NPCs

This approach gives you:
- ✅ Type safety from code definitions
- ✅ Dynamic growth via database storage
- ✅ Easy to add new NPCs via seed scripts
- ✅ NPCs can be updated in DB without code changes
- ✅ Standard game development pattern

## Architecture

### 1. Database Schema

NPCs are stored in the `characters` table with `userId = null`:
- **Player Characters**: `userId` is set (references a user)
- **NPCs**: `userId` is `null`

```sql
-- Migration: 0014_make_user_id_nullable_for_npcs.sql
ALTER TABLE "characters" 
  ALTER COLUMN "user_id" DROP NOT NULL;
```

### 2. NPC Templates (Code)

Templates define NPC structure and defaults:
- **Location**: `Server/src/Entity/Character/NPCs/definitions/index.ts`
- **Purpose**: Type safety, default values, documentation
- **Usage**: Seed scripts use templates to create initial NPCs

Example:
```typescript
export const npcTemplatesByLocation: Record<LocationsEnum, NPCTemplate[]> = {
  [LocationsEnum.WaywardInn]: [
    {
      id: "wayward_inn_innkeeper",
      name: { en: "Thomas", th: "โทมัส" },
      location: LocationsEnum.WaywardInn,
      race: RaceEnum.Human,
      gender: "MALE",
      level: 5,
      background: "innkeeper",
    },
  ],
};
```

### 3. Seed Scripts

Idempotent scripts that create NPCs from templates:
- **Location**: `Server/scripts/seed-npcs.ts`
- **Usage**: `bun run scripts/seed-npcs.ts`
- **Idempotent**: Won't create duplicates (checks if NPC exists first)

```bash
# Seed all locations
bun run scripts/seed-npcs.ts

# Seed specific location
bun run scripts/seed-npcs.ts --location=WaywardInn
```

## How It Works

### Initial Setup

1. **Run Migration**: Make `userId` nullable
   ```bash
   bun run scripts/migrate.ts
   ```

2. **Seed NPCs**: Create initial NPCs from templates
   ```bash
   bun run scripts/seed-npcs.ts
   ```

3. **NPCs Load Automatically**: When server starts, NPCs are loaded from DB just like player characters

### Adding New NPCs

**Option 1: Via Seed Script (Recommended for initial NPCs)**
1. Add NPC template to `npcTemplatesByLocation` in `definitions/index.ts`
2. Run seed script: `bun run scripts/seed-npcs.ts`

**Option 2: Directly in Database (For dynamic NPCs)**
- Insert directly into `characters` table with `userId = null`
- NPC will be loaded automatically on next server restart
- Useful for NPCs created dynamically through gameplay

### Updating NPCs

**Option 1: Update in Database**
- Modify NPC data directly in DB
- Changes persist and are loaded on server restart
- Good for: Stats, inventory, relationships

**Option 2: Update Template + Re-seed**
- Update template in code
- Re-run seed script (it will skip existing NPCs unless you delete them first)
- Good for: Default values, initial stats

**Option 3: Admin API (Future)**
- Create API endpoints to update NPCs
- Allows runtime updates without DB access

## Workflow Comparison

### Migration Approach ❌
- Hard to update dynamically
- Requires code changes for every NPC
- Hard to manage NPC growth
- Not suitable for dynamic content

### Code-Only Approach ❌
- No persistence (lost on restart)
- Hard to update NPCs
- Can't grow dynamically
- No separation of code vs data

### Hybrid Approach (This Solution) ✅
- Templates in code (type safety)
- Instances in DB (dynamic growth)
- Seed scripts (easy initial setup)
- Best of both worlds

## Files Created/Modified

1. **Migration**: `Server/src/Database/migrations/0014_make_user_id_nullable_for_npcs.sql`
2. **Schema Update**: `Server/src/Database/Schema/character.ts` (made userId nullable)
3. **NPC Templates**: `Server/src/Entity/Character/NPCs/definitions/index.ts`
4. **Seed Script**: `Server/scripts/seed-npcs.ts`
5. **CharacterService**: Updated to handle `userId = null`

## Next Steps

1. Run the migration to make `userId` nullable
2. Add more NPC templates for Wayward Inn
3. Run seed script to populate NPCs
4. Test that NPCs appear in the game
5. (Optional) Create admin API to manage NPCs at runtime

## Example: Adding a New NPC

```typescript
// 1. Add template to definitions/index.ts
[LocationsEnum.WaywardInn]: [
  // ... existing NPCs
  {
    id: "wayward_inn_traveler",
    name: { en: "Marcus", th: "มาร์คัส" },
    location: LocationsEnum.WaywardInn,
    race: RaceEnum.Elven,
    gender: "MALE",
    level: 8,
    background: "merchant",
  },
],

// 2. Run seed script
bun run scripts/seed-npcs.ts --location=WaywardInn
```

The NPC will be created in the database and automatically loaded when the server starts!

