# MPV Database Schema

## Overview

This document defines the database schema changes needed for MPV implementation.

---

## **Existing Tables**

### **users** ✅ (Already Exists)
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  last_news_received TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  created_by VARCHAR(255),
  updated_by VARCHAR(255)
);
```

### **characters** ✅ (Already Exists)
```sql
CREATE TABLE characters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  party_id UUID,  -- Will reference parties table
  name VARCHAR(255) NOT NULL UNIQUE,
  gender VARCHAR(10) NOT NULL,
  race VARCHAR(50) NOT NULL,
  type VARCHAR(50) DEFAULT 'humanoid',
  level INTEGER DEFAULT 1,
  portrait VARCHAR(50),
  background VARCHAR(100),
  
  -- Character systems (JSONB)
  alignment JSONB DEFAULT '{}',
  artisans JSONB DEFAULT '{}',
  attribute JSONB DEFAULT '{}',
  battle_stats JSONB DEFAULT '{}',
  elements JSONB DEFAULT '{}',
  proficiencies JSONB DEFAULT '{}',
  needs JSONB DEFAULT '{}',
  vitals JSONB NOT NULL,
  fame JSONB DEFAULT '{}',
  behavior JSONB DEFAULT '{}',
  title JSONB DEFAULT '{}',
  possible_epithets JSONB DEFAULT '[]',
  possible_roles JSONB DEFAULT '[]',
  action_sequence JSONB DEFAULT '{}',
  informations JSONB DEFAULT '{}',
  
  -- Skills
  skills JSONB DEFAULT '{}',
  active_skills JSONB DEFAULT '[]',
  conditional_skills JSONB DEFAULT '[]',
  conditional_skills_condition JSONB DEFAULT '{}',
  skill_learning_progress JSONB DEFAULT '{}',
  breathing_skills JSONB DEFAULT '{}',
  active_breathing_skill VARCHAR(50),
  breathing_skills_learning_progress JSONB DEFAULT '{}',
  planar_aptitude JSONB DEFAULT '{}',
  
  -- Social
  relations JSONB DEFAULT '{}',
  traits JSONB DEFAULT '[]',
  
  -- Inventory
  inventory_size JSONB DEFAULT '{"base": 20, "bonus": 0}',
  inventory JSONB DEFAULT '{}',
  equipments JSONB DEFAULT '{}',
  
  -- State
  stat_tracker INTEGER DEFAULT 0,
  ab_guage INTEGER DEFAULT 0,
  
  -- Audit
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  created_by VARCHAR(255),
  updated_by VARCHAR(255)
);

CREATE INDEX idx_characters_user_id ON characters(user_id);
CREATE INDEX idx_characters_party_id ON characters(party_id);
CREATE INDEX idx_characters_name ON characters(name);
```

### **sessions** ✅ (Already Exists)
```sql
CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token VARCHAR(255) UNIQUE NOT NULL,
  user_agent TEXT,
  ip_address VARCHAR(45),
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_sessions_token ON sessions(token);
CREATE INDEX idx_sessions_user_id ON sessions(user_id);
CREATE INDEX idx_sessions_expires_at ON sessions(expires_at);
```

---

## **New Tables for MPV**

### **parties** ⬜ (NEW)
Stores party data

```sql
CREATE TABLE parties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  player_character_id UUID NOT NULL REFERENCES characters(id) ON DELETE CASCADE,
  location VARCHAR(100) NOT NULL DEFAULT 'FyonarCapital',
  gold INTEGER DEFAULT 100,
  supplies JSONB DEFAULT '{}',  -- { "food": 20, "water": 15, ... }
  
  -- Audit
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  created_by VARCHAR(255),
  updated_by VARCHAR(255)
);

CREATE INDEX idx_parties_player_character ON parties(player_character_id);
CREATE INDEX idx_parties_location ON parties(location);
```

**Notes:**
- One party per player (for MPV)
- `player_character_id` is the owner
- `location` is LocationsEnum value
- `supplies` stores consumables (food, water, camp supplies, etc.)

**Drizzle Schema:**
```typescript
export const parties = pgTable("parties", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  playerCharacterId: uuid("player_character_id").notNull().references(() => characters.id, { onDelete: "cascade" }),
  location: varchar("location", { length: 100 }).notNull().default("FyonarCapital"),
  gold: integer("gold").default(100).notNull(),
  supplies: jsonb("supplies").default({}).notNull(),
  
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  createdBy: varchar("created_by", { length: 255 }).notNull(),
  updatedBy: varchar("updated_by", { length: 255 }).notNull(),
});

export type Party = typeof parties.$inferSelect;
export type InsertParty = typeof parties.$inferInsert;
```

---

### **news** ⬜ (NEW)
Stores generated news items

```sql
CREATE TABLE news (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  timestamp TIMESTAMP DEFAULT NOW() NOT NULL,
  scope VARCHAR(20) NOT NULL,  -- 'private', 'party', 'location', 'subRegion', 'region', 'world'
  scope_id VARCHAR(255),  -- UUID for party/location/region, null for world
  message TEXT NOT NULL,
  metadata JSONB DEFAULT '{}',  -- Additional data (characters involved, stat changes, etc.)
  
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_news_timestamp ON news(timestamp DESC);
CREATE INDEX idx_news_scope ON news(scope);
CREATE INDEX idx_news_scope_id ON news(scope_id);
CREATE INDEX idx_news_scope_timestamp ON news(scope, scope_id, timestamp DESC);
```

**Notes:**
- `scope`: Determines who can see the news
- `scope_id`: Identifies the specific party/location/region
  - For 'private': scope_id = characterId
  - For 'party': scope_id = partyId
  - For 'location': scope_id = locationEnum
  - For 'world': scope_id = null
- `metadata`: Flexible JSON for additional context
- News older than 30 days can be archived/deleted (post-MPV)

**Drizzle Schema:**
```typescript
export const news = pgTable("news", {
  id: uuid("id").primaryKey().defaultRandom(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  scope: varchar("scope", { length: 20 }).notNull(),
  scopeId: varchar("scope_id", { length: 255 }),
  message: text("message").notNull(),
  metadata: jsonb("metadata").default({}).notNull(),
  
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type News = typeof news.$inferSelect;
export type InsertNews = typeof news.$inferInsert;
```

---

### **user_news_read** ⬜ (NEW)
Tracks which news each user has read

```sql
CREATE TABLE user_news_read (
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  last_read_timestamp TIMESTAMP NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW(),
  
  PRIMARY KEY (user_id)
);

CREATE INDEX idx_user_news_read_timestamp ON user_news_read(last_read_timestamp);
```

**Notes:**
- Simple tracking: user has read all news before `last_read_timestamp`
- Updated when user clicks "mark as read" or views news
- Used to determine unread count

**Drizzle Schema:**
```typescript
export const userNewsRead = pgTable("user_news_read", {
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }).primaryKey(),
  lastReadTimestamp: timestamp("last_read_timestamp").notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type UserNewsRead = typeof userNewsRead.$inferSelect;
export type InsertUserNewsRead = typeof userNewsRead.$inferInsert;
```

---

## **Schema Modifications**

### **characters table** ⬜ (MODIFY)
Add foreign key constraint for party_id

```sql
-- Add foreign key (if not already exists)
ALTER TABLE characters 
ADD CONSTRAINT fk_characters_party 
FOREIGN KEY (party_id) REFERENCES parties(id) ON DELETE SET NULL;
```

**Notes:**
- ON DELETE SET NULL: If party deleted, character's party_id becomes null
- For MPV: Party should never be deleted while character exists

---

## **Migration Plan**

### **Step 1: Create New Tables**
```bash
# Generate migration
cd Server
bun run db:generate

# This will create a new migration file with:
# - CREATE TABLE parties
# - CREATE TABLE news
# - CREATE TABLE user_news_read
```

### **Step 2: Add Foreign Key**
```bash
# Manually add to migration file or create separate migration:
ALTER TABLE characters 
ADD CONSTRAINT fk_characters_party 
FOREIGN KEY (party_id) REFERENCES parties(id) ON DELETE SET NULL;
```

### **Step 3: Run Migration**
```bash
bun run db:migrate:run
```

### **Step 4: Seed Initial Data** (Optional)
```bash
# Create seed script: Server/scripts/seed-mpv.ts
# - Create parties for existing characters
# - Set default location
# - Initialize gold/supplies
```

---

## **Data Relationships**

```
users (1) ──────────────> (1) characters
                              ↓
                              ↓ party_id
                              ↓
                          (1) parties
                              ↑
                              ↑ player_character_id
                              ↑
                          (back reference)

users (1) ──────────────> (1) user_news_read

news (many) ────scope_id───> parties (1)
news (many) ────scope_id───> characters (1)
```

---

## **Query Patterns**

### **Get Party with Characters**
```typescript
const party = await db
  .select()
  .from(parties)
  .where(eq(parties.playerCharacterId, characterId))
  .limit(1);

const characters = await db
  .select()
  .from(characters)
  .where(eq(characters.partyId, party.id));
```

### **Get Unread News for User**
```typescript
// Get user's last read timestamp
const [userRead] = await db
  .select()
  .from(userNewsRead)
  .where(eq(userNewsRead.userId, userId))
  .limit(1);

const lastRead = userRead?.lastReadTimestamp || new Date(0);

// Get news for character (private scope)
const privateNews = await db
  .select()
  .from(news)
  .where(
    and(
      eq(news.scope, 'private'),
      eq(news.scopeId, characterId),
      gt(news.timestamp, lastRead)
    )
  )
  .orderBy(desc(news.timestamp))
  .limit(100);

// Get news for party
const partyNews = await db
  .select()
  .from(news)
  .where(
    and(
      eq(news.scope, 'party'),
      eq(news.scopeId, partyId),
      gt(news.timestamp, lastRead)
    )
  )
  .orderBy(desc(news.timestamp))
  .limit(100);
```

### **Create News**
```typescript
await db.insert(news).values({
  scope: 'private',
  scopeId: characterId,
  message: 'You rested and recovered 20 HP',
  metadata: { hpRecovered: 20 },
});
```

---

## **Performance Considerations**

### **Indexes** (Already Defined Above)
- `idx_news_scope_timestamp` - Composite index for efficient news queries
- `idx_parties_player_character` - Fast party lookup by character
- `idx_characters_party_id` - Fast character lookup by party

### **News Cleanup** (Post-MPV)
```sql
-- Archive old news (run daily via cron)
DELETE FROM news 
WHERE timestamp < NOW() - INTERVAL '30 days'
AND scope NOT IN ('world', 'region');  -- Keep important news longer
```

### **Expected Data Volume**
- **Parties**: ~1000 (1 per player)
- **News**: ~10,000/day (grows quickly)
  - Per player: ~50 news items/day
  - 1000 players = 50,000 news/day
  - Need cleanup strategy
- **user_news_read**: ~1000 (1 per user)

---

## **Testing Queries**

### **Verify Party Creation**
```sql
SELECT 
  p.id,
  p.name,
  p.location,
  p.gold,
  c.name as character_name
FROM parties p
JOIN characters c ON p.player_character_id = c.id
LIMIT 10;
```

### **Verify News Generation**
```sql
SELECT 
  scope,
  COUNT(*) as count,
  MAX(timestamp) as latest
FROM news
GROUP BY scope;
```

### **Check Unread News Count**
```sql
SELECT 
  u.username,
  COUNT(n.id) as unread_count
FROM users u
LEFT JOIN user_news_read unr ON u.id = unr.user_id
LEFT JOIN characters c ON u.id = c.user_id
LEFT JOIN news n ON (
  (n.scope = 'private' AND n.scope_id = c.id::varchar)
  AND n.timestamp > COALESCE(unr.last_read_timestamp, '1970-01-01')
)
GROUP BY u.id, u.username;
```

---

## **Implementation Checklist**

### **Schema Changes**
- [ ] Create Drizzle schema for `parties` table
- [ ] Create Drizzle schema for `news` table
- [ ] Create Drizzle schema for `user_news_read` table
- [ ] Add foreign key constraint to `characters.party_id`
- [ ] Generate migration
- [ ] Test migration on dev database
- [ ] Run migration on production

### **Services**
- [ ] PartyService (create, get, update)
- [ ] NewsService (create, get, mark read)
- [ ] Update CharacterService to create party on character creation

### **Seed Data**
- [ ] Create parties for existing characters (if any)
- [ ] Initialize default gold/supplies

---

**Last Updated**: October 8, 2025  
**Status**: Schema Design Complete - Ready for Implementation
