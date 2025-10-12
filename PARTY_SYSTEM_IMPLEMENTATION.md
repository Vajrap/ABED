# Party System Implementation

## Overview

This document describes the Party system implementation following the same pattern as the Character system.

---

## **Files Created/Modified**

### **1. Database Schema**

**File**: `Server/src/Database/Schema/party.ts`

```typescript
export const parties = pgTable("parties", {
  // Primary fields
  id: uuid("id").primaryKey().defaultRandom(),
  partyID: varchar("party_id", { length: 255 }).notNull().unique(),
  
  // Party state
  isTraveling: boolean("is_traveling").default(false).notNull(),
  location: varchar("location", { length: 100 }).notNull(),
  justArrived: boolean("just_arrived").default(false).notNull(),
  
  // Party data (JSONB)
  characters: jsonb("characters").notNull(), // ["char-id", "none", "none", "none", "none", "none"]
  behavior: jsonb("behavior").notNull(),
  informations: jsonb("informations").default({}).notNull(),
  actionSequence: jsonb("action_sequence").notNull(),
  leaderID: varchar("leader_id", { length: 255 }).notNull(),
  
  // Audit fields
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  createdBy: varchar("created_by", { length: 255 }).notNull(),
  updatedBy: varchar("updated_by", { length: 255 }).notNull(),
});
```

**Key Design Decisions:**

1. **partyID**: Uses leader's character ID (same pattern as Party entity)
2. **characters**: Stored as JSONB array of character IDs or "none"
3. **behavior**: Full PartyBehavior object serialized as JSONB
4. **actionSequence**: PartyActionSequence serialized as JSONB
5. **location**: String (LocationsEnum value)

---

### **2. Party Service**

**File**: `Server/src/Services/PartyService.ts`

**Methods:**

1. **createParty(character, location)**: Pure function, creates Party entity
2. **partyToInsertParty(party)**: Converts Party entity to InsertParty for DB
3. **savePartyToDatabase(insertParty)**: Saves to database
4. **getPartyByPartyID(partyID)**: Fetches party from DB
5. **updateParty(partyID, updates)**: Updates party in DB

**Pattern Matches CharacterService:**
- ✅ Separation of entity creation and database persistence
- ✅ Pure functions for entity creation
- ✅ Conversion functions (entityToInsert)
- ✅ Database methods return IDs
- ✅ Logging with Report utility

---

### **3. Schema Index Update**

**File**: `Server/src/Database/Schema/index.ts`

Added exports:
```typescript
export * from "./party";
export { parties } from "./party";
export type { PartyDB, InsertParty } from "./party";
```

---

### **4. Character Service Integration**

**File**: `Server/src/Services/CharacterService.ts`

**Updated `handleCreateCharacter`:**

```typescript
static async handleCreateCharacter(
  userId: string,
  characterData: CharacterCreationData
): Promise<{ success: boolean; error?: string }> {
  try {
    // 1. Create the Character entity
    const character = this.createCharacter(userId, characterData);
    
    // 2. Create party for the character
    const party = PartyService.createParty(character, LocationsEnum.None);
    character.partyID = party.partyID;
    
    // 3. Add to managers (for easy access)
    characterManager.addCharacter(character);
    partyManager.addParty(party);
    
    // 4. Save to database
    const insertCharacter = this.characterToInsertCharacter(character);
    await this.saveCharacterToDatabase(insertCharacter);
    
    const insertParty = PartyService.partyToInsertParty(party);
    await PartyService.savePartyToDatabase(insertParty);
    
    // 5. Return success
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error)
    };
  }
}
```

**Flow:**
1. Create Character entity
2. Create Party entity (with character as leader)
3. Link character.partyID to party.partyID
4. Add both to in-memory managers
5. Convert both to DB format
6. Save both to database
7. Return success

---

## **Database Migration**

### **Next Steps:**

1. **Generate Migration:**
   ```bash
   cd Server
   bun run db:generate
   ```

2. **Review Migration:**
   - Check `Server/src/Database/migrations/` for new SQL file
   - Verify tables created correctly

3. **Run Migration:**
   ```bash
   bun run db:migrate:run
   ```

4. **Verify Tables:**
   ```sql
   -- Connect to database
   docker exec -it myproject-postgres-1 psql -U abed_user -d abed_db
   
   -- Check parties table
   \d parties
   
   -- Verify structure
   SELECT column_name, data_type 
   FROM information_schema.columns 
   WHERE table_name = 'parties';
   ```

---

## **Expected Database Schema**

### **parties Table**

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | uuid | PRIMARY KEY | Database ID |
| party_id | varchar(255) | NOT NULL, UNIQUE | Party identifier (leader's char ID) |
| is_traveling | boolean | NOT NULL, DEFAULT false | Travel state |
| location | varchar(100) | NOT NULL | Current location |
| just_arrived | boolean | NOT NULL, DEFAULT false | Just arrived flag |
| characters | jsonb | NOT NULL | Array of character IDs |
| behavior | jsonb | NOT NULL | Party behavior settings |
| informations | jsonb | NOT NULL, DEFAULT {} | Party knowledge |
| action_sequence | jsonb | NOT NULL | Weekly action schedule |
| leader_id | varchar(255) | NOT NULL | Leader character ID |
| created_at | timestamp | NOT NULL, DEFAULT NOW() | Creation timestamp |
| updated_at | timestamp | NOT NULL, DEFAULT NOW() | Last update timestamp |
| created_by | varchar(255) | NOT NULL | Creator (system) |
| updated_by | varchar(255) | NOT NULL | Last updater (system) |

---

## **Data Flow**

### **Character Creation Flow**

```
User submits character creation form
    ↓
POST /api/character/create
    ↓
CharacterService.handleCreateCharacter()
    ↓
┌─────────────────────────────────────┐
│ 1. Create Character Entity          │
│    - Apply race bonuses              │
│    - Apply class bonuses             │
│    - Apply background bonuses        │
│    - Set userId                      │
└─────────────────────────────────────┘
    ↓
┌─────────────────────────────────────┐
│ 2. Create Party Entity               │
│    - Set leader = character          │
│    - Set location = LocationsEnum.None│
│    - Initialize behavior             │
│    - characters = [character]        │
└─────────────────────────────────────┘
    ↓
┌─────────────────────────────────────┐
│ 3. Link Character to Party           │
│    character.partyID = party.partyID │
└─────────────────────────────────────┘
    ↓
┌─────────────────────────────────────┐
│ 4. Add to In-Memory Managers         │
│    characterManager.addCharacter()   │
│    partyManager.addParty()           │
└─────────────────────────────────────┘
    ↓
┌─────────────────────────────────────┐
│ 5. Convert to DB Format              │
│    insertChar = characterToInsert()  │
│    insertParty = partyToInsert()     │
└─────────────────────────────────────┘
    ↓
┌─────────────────────────────────────┐
│ 6. Save to Database                  │
│    await saveCharacterToDatabase()   │
│    await savePartyToDatabase()       │
└─────────────────────────────────────┘
    ↓
Return { success: true }
```

---

## **Usage Examples**

### **Creating a Party (Already Integrated)**

```typescript
// Automatically handled in CharacterService.handleCreateCharacter()
const character = CharacterService.createCharacter(userId, characterData);
const party = PartyService.createParty(character, LocationsEnum.FyonarCapital);
character.partyID = party.partyID;

const insertParty = PartyService.partyToInsertParty(party);
await PartyService.savePartyToDatabase(insertParty);
```

### **Fetching a Party**

```typescript
const party = await PartyService.getPartyByPartyID("character-id-123");

// Returns PartyDB object:
{
  id: "uuid",
  partyID: "character-id-123",
  isTraveling: false,
  location: "FyonarCapital",
  characters: ["character-id-123", "none", "none", "none", "none", "none"],
  behavior: { /* PartyBehavior object */ },
  actionSequence: { /* PartyActionSequence object */ },
  leaderID: "character-id-123",
  // ... audit fields
}
```

### **Updating a Party**

```typescript
await PartyService.updateParty("party-id", {
  location: LocationsEnum.FyonarCapital,
  isTraveling: false,
  justArrived: true,
});
```

---

## **Relationship with Characters**

### **Character → Party Link**

```typescript
// Character has partyID field
character.partyID = "party-123";

// Database schema
characters.partyID -> parties.partyID
```

### **Party → Characters Link**

```typescript
// Party has characters array (stored as JSONB in DB)
party.characters = [
  "char-id-1",
  "none",
  "none",
  "none",
  "none",
  "none"
];
```

### **Querying Party with Characters**

```typescript
// Get party
const partyDB = await PartyService.getPartyByPartyID("party-123");

// Get all characters in party
const characterIds = partyDB.characters.filter(id => id !== "none");

// Fetch characters from database
const characters = await db
  .select()
  .from(characters)
  .where(inArray(characters.id, characterIds));
```

---

## **Testing Plan**

### **1. Unit Tests**

**Test File**: `Server/Tests/Services/PartyService.test.ts`

```typescript
describe("PartyService", () => {
  it("should create a party entity", () => {
    const character = createMockCharacter();
    const party = PartyService.createParty(character, LocationsEnum.FyonarCapital);
    
    expect(party.partyID).toBe(character.id);
    expect(party.leader).toBe(character);
    expect(party.characters[0]).toBe(character);
  });

  it("should convert party to insert format", () => {
    const character = createMockCharacter();
    const party = PartyService.createParty(character, LocationsEnum.FyonarCapital);
    const insertParty = PartyService.partyToInsertParty(party);
    
    expect(insertParty.partyID).toBe(party.partyID);
    expect(insertParty.characters).toContain(character.id);
    expect(insertParty.characters).toContain("none");
  });
});
```

### **2. Integration Tests**

**Test Character Creation:**

```bash
# Start server
cd Server
bun run dev

# Create character (should also create party)
curl -X POST http://localhost:7890/api/character/create \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "name": "TestHero",
    "gender": "MALE",
    "race": "human",
    "portrait": "m_human01",
    "background": "retainor",
    "startingClass": "fighter"
  }'

# Verify party created in database
docker exec -it myproject-postgres-1 psql -U abed_user -d abed_db \
  -c "SELECT * FROM parties WHERE party_id IN (SELECT id FROM characters WHERE name = 'TestHero');"
```

---

## **Potential Issues & Solutions**

### **Issue 1: Foreign Key Constraint**

**Problem**: `character.partyID` references `parties.partyID`, but party doesn't exist yet

**Solution**: 
- Create party first, then character? ❌ (Character needed for party)
- Don't use foreign key constraint ✅ (Application-level integrity)
- Use deferred constraints ⚠️ (Complex)

**Current Approach**: No FK constraint, application ensures integrity

### **Issue 2: Character Array Serialization**

**Problem**: Party.characters is array of Character objects, but DB needs IDs

**Solution**: Convert in `partyToInsertParty()`:
```typescript
const characterIds = party.characters.map((char) => 
  char === "none" ? "none" : char.id
);
```

### **Issue 3: Party Behavior Serialization**

**Problem**: PartyBehavior is a class instance

**Solution**: JSON serialization automatically handles it:
```typescript
behavior: party.behavior as any // Drizzle serializes to JSONB
```

---

## **Next Steps**

### **Immediate (Database)**
1. ✅ Create party schema
2. ✅ Update PartyService
3. ✅ Integrate with CharacterService
4. ⬜ Generate migration
5. ⬜ Run migration
6. ⬜ Test character creation

### **Short Term (API)**
7. ⬜ Create GET /api/party endpoint
8. ⬜ Create PartyInterface for frontend
9. ⬜ Test party fetching
10. ⬜ Update frontend to fetch party

### **Medium Term (Features)**
11. ⬜ Party update endpoint
12. ⬜ Party location change
13. ⬜ Party member management (future)

---

## **Summary**

✅ **Party database schema created** following Character pattern  
✅ **PartyService implemented** with same structure as CharacterService  
✅ **Character creation integrated** with party creation  
✅ **No linter errors** - code is clean  

**Ready for migration!** 🚀

---

**Next Command:**
```bash
cd Server
bun run db:generate
```

This will generate the migration file for the parties table.

---

**Last Updated**: October 8, 2025  
**Status**: Schema & Service Complete - Ready for Migration
