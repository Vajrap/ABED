# System Architecture Documentation

> **Comprehensive hierarchical documentation of the entire game system architecture**
> 
> This document maps the complete system from initialization through all subsystems, organized in a tree-like structure to understand the full codebase organization and identify incomplete features.

---

## Table of Contents

1. [Initialization Layer (Root)](#1-initialization-layer-root)
2. [Database Layer](#2-database-layer)
3. [Game Core Systems](#3-game-core-systems)
4. [Entity Systems](#4-entity-systems)
5. [API Layer](#5-api-layer)
6. [Supporting Systems](#6-supporting-systems)
7. [Incomplete Features & TODOs](#7-incomplete-features--todos)

---

## 1. Initialization Layer (Root)

### 1.1 Entry Point
**File:** `Server/src/index.ts`

**Flow:**
```
startServer()
  ├─> initializeDatabase()          [Database/init.ts]
  ├─> new Game()                    [Game/index.ts]
  │   └─> game.start()
  │       └─> runSchedule()         [Game/GameLoop.ts]
  └─> app.listen(PORT)              [Express Server]
      └─> apiRoutes                 [API/index.ts]
```

**Responsibilities:**
- Express app setup (CORS, body parsing, middleware)
- Database initialization
- Game system initialization
- HTTP server startup
- Graceful shutdown handling

**Dependencies:**
- `dotenv` for environment variables
- `express` for HTTP server
- `cors` for cross-origin requests

---

### 1.2 Database Initialization
**File:** `Server/src/Database/init.ts`

**Flow:**
```
initializeDatabase()
  ├─> testConnection()              [Database/connection.ts]
  ├─> checkTablesExist()
  ├─> migrate()                     [Drizzle ORM]
  └─> loadGameDataFromDatabase()
      ├─> loadGameState()
      ├─> loadMarketState()
      ├─> loadResourceProductionTracking()
      └─> loadItemInstances()
```

**Responsibilities:**
- PostgreSQL connection pool setup
- Table existence checking
- Migration execution
- Loading runtime state from database
- Creating default state if missing

**Database Connection:**
- **File:** `Server/src/Database/connection.ts`
- Uses `pg` (node-postgres) Pool
- Drizzle ORM instance for queries
- Connection string from environment variables

---

### 1.3 Game Initialization
**File:** `Server/src/Game/index.ts`

**Flow:**
```
Game.start()
  └─> initialize()
      └─> runSchedule()              [Game/GameLoop.ts]
```

**Components:**
- `characterManager` - In-memory character pool
- `gameState` - Global game state singleton
- Game loop scheduler initialization

---

### 1.4 API Setup
**File:** `Server/src/API/index.ts`

**Routes:**
```
/api
  ├─> /login                        [API/login/index.ts]
  ├─> /register                     [API/register/index.ts]
  ├─> /auth                         [API/auth/index.ts]
  ├─> /character                    [API/character/index.ts]
  ├─> /party                        [API/party/index.ts]
  └─> /network-test                 [API/networkTest/index.ts]
```

**Middleware:**
- CORS configuration
- JSON body parsing
- Request logging
- Error handling

---

## 2. Database Layer

### 2.1 Connection Management
**File:** `Server/src/Database/connection.ts`

**Components:**
- PostgreSQL connection pool
- Drizzle ORM instance
- Connection testing utilities
- Graceful shutdown handlers

**Configuration:**
- Max connections: 20
- Idle timeout: 30s
- Connection timeout: 2s

---

### 2.2 Schema Definitions
**Directory:** `Server/src/Database/Schema/`

**Tables:**

#### 2.2.1 User Management
- **`user.ts`** - User accounts (id, email, password, character_id)
- **`session.ts`** - Active sessions (token, user_id, expires_at)

#### 2.2.2 Game Entities
- **`character.ts`** - Character data (attributes, skills, inventory, vitals)
- **`party.ts`** - Party data (members, location, action sequences)
- **`news.ts`** - News system tables:
  - `newsArchive` - Historical news
  - `newsSpreadQueue` - Pending news propagation
  - `characterNewsKnowledge` - Character news tracking
  - `locationNewsReach` - Location news reach

#### 2.2.3 Game State
- **`game_state.ts`** - Global game state (event cards, phase tracking)
- **`market_state.ts`** - Market pricing state (modifiers, transaction history)
- **`resource_production_tracking.ts`** - Resource production baselines

#### 2.2.4 Combat & Items
- **`battle_report.ts`** - Battle results and statistics
- **`item_instances.ts`** - Unique crafted item instances

---

### 2.3 Migrations
**Directory:** `Server/src/Database/migrations/`

**Migration Files:**
- `0000_lumpy_taskmaster.sql` - Initial schema
- `0001_sour_clint_barton.sql` - Schema updates
- `0002_fine_blue_shield.sql` - Additional tables
- `0003_small_earthquake.sql` - Schema modifications
- `0004_white_imperial_guard.sql` - More updates
- `0005_ambitious_hammerhead.sql` - Further changes
- `0006_omniscient_terror.sql` - Latest migrations

**Migration System:**
- Uses Drizzle Kit for generation
- Automatic migration on startup
- Manual table creation fallback

---

### 2.4 Persistence
**Files:**
- **`persistence.ts`** - Daily state saving
- **`gameStateStore.ts`** - Game state persistence

**Persistence Patterns:**
- Daily saves at hour 1
- Game state synchronization
- Market state updates
- Resource tracking updates

---

## 3. Game Core Systems

### 3.1 Game Loop
**File:** `Server/src/Game/GameLoop.ts`

**Flow:**
```
runSchedule()
  └─> runGameLoop()
      └─> processPhaseInternal()
          ├─> GameTime.synchronize()
          ├─> handleGameMilestones()
          │   ├─> New Year: Draw Global Event Card
          │   ├─> New Season: Refill resources, adjust prices
          │   ├─> New Month: Draw Region Event Card
          │   └─> New Day: Weather cards, news spread/decay
          ├─> processEvents()
          │   ├─> locationManager.processEncounters()
          │   ├─> locationManager.processActions()
          │   ├─> travelManager.allTravel()
          │   └─> railTravelManager.allTravel()
          └─> sendPartyData()
```

**Phases:**
- Morning (Phase 1)
- Afternoon (Phase 2)
- Evening (Phase 3)
- Night (Phase 4)

**Scheduling:**
- Production mode: Auto-scheduled based on `GAME_MS_PER_PHASE`
- Dev/Test mode: Manual triggers only
- Catch-up processing for missed phases

---

### 3.2 Game State
**File:** `Server/src/Game/GameState.ts`

**Components:**
- Global Event Cards (deck, active, completed)
- Region Event Cards (deck, completed)
- Global Event Scale (0-250)
- Last processed phase index

**Methods:**
- `drawGlobalCard()` - Draw and activate global event
- `drawRegionCard()` - Draw region event, update scale
- `reshuffleGlobalEventCardDeck()` - Reshuffle completed cards
- `reshuffleRegionEventCardDeck()` - Reshuffle completed cards

---

### 3.3 Game Time
**File:** `Server/src/Game/GameTime/GameTime.ts`

**Time Structure:**
- 4 hours per day (phases: morning, afternoon, evening, night)
- 6 days per week
- 48 days per season (8 weeks)
- 7 seasons per year

**Static Properties:**
- `hour` - Current hour (1-4)
- `dayOfWeek` - Current day (1-6)
- `dayOfSeason` - Current day in season (1-48)
- `season` - Current season (1-7)
- `year` - Current year

**Methods:**
- `synchronize(now)` - Calculate game time from real time
- `getCurrentPhaseIndex()` - Get current phase number
- `getLastProcessedPhaseIndex()` - Get last processed phase
- `timeUntilNextPhase(now)` - Calculate delay until next phase

**Configuration:**
- `GAME_EPOCH_UTC` - Game time epoch (Year 0, Season 1, Day 1, Phase 1)
- `GAME_MS_PER_PHASE` - Real milliseconds per game phase (default: 15 min)

---

### 3.4 Managers

#### 3.4.1 Character Manager
**File:** `Server/src/Game/CharacterManager/index.ts`

**Responsibilities:**
- In-memory character pool
- Character lookup by ID
- User character lookup
- Character addition/removal

**Methods:**
- `getCharacterByID(id)` - Get character by ID
- `getUserCharacterByUserId(userId)` - Get user's character
- `addCharacter(character)` - Add character to pool

---

#### 3.4.2 Party Manager
**File:** `Server/src/Game/PartyManager/index.ts`

**Responsibilities:**
- In-memory party pool
- Party lookup by ID
- Party addition/removal

**Methods:**
- `getPartyByID(id)` - Get party by ID
- `addParty(party)` - Add party to pool
- `removeParty(id)` - Remove party from pool

---

#### 3.4.3 Travel Manager
**File:** `Server/src/Game/TravelManager/index.ts`

**Responsibilities:**
- Managing traveling parties
- Path planning and execution
- Travel distance calculation
- Travel events
- Arrival handling

**Components:**
- `TravelingParty` - Represents party in transit
- `TravelMethodEnum` - Travel methods (walk, rail, etc.)

**Methods:**
- `addParty(party)` - Add party to travel system
- `addLocationToPath(partyID, location)` - Add location to travel path
- `removeLocationFromPath(partyID, location)` - Remove location from path
- `allTravel(day, phase)` - Process all traveling parties
- `travel(party)` - Execute travel for one party
- `stopTravel(partyId)` - Stop party travel

**Rail Travel:**
- **File:** `Server/src/Game/TravelManager/Rail/index.ts`
- Separate rail travel manager
- Station-based travel system

---

## 4. Entity Systems

### 4.1 Battle System
**Directory:** `Server/src/Entity/Battle/`

#### 4.1.1 Battle Core
**File:** `Server/src/Entity/Battle/Battle.ts`

**Flow:**
```
Battle.startBattle()
  └─> battleLoop()
      ├─> Sort participants by agility
      ├─> For each participant:
      │   ├─> Resolve buffs/debuffs (resolver)
      │   ├─> getPlayableSkill()
      │   ├─> Execute skill
      │   ├─> Update AB Gauge
      │   └─> Check for death
      └─> Determine winner
```

**Components:**
- `Battle` - Main battle class
- `BattleReport` - Battle result recording
- `BattleStatistics` - Damage/healing tracking
- `BattleContext` - Battle state context

**Battle Types:**
- `encounter` - Random encounter
- `quest` - Quest battle
- `arena` - Arena battle

**TODO:**
- Rewards calculation (line 281)
- Looting system (line 491)

---

#### 4.1.2 Damage Resolution
**File:** `Server/src/Entity/Battle/damageResolution.ts`

**Flow:**
```
resolveDamage()
  ├─> Calculate base damage
  ├─> Apply position modifiers
  ├─> Apply critical hit
  ├─> Apply mitigation (unless trueDamage)
  │   ├─> Physical: pDEF + endurance mod
  │   └─> Magic: mDEF + planar mod + magic resistance
  └─> Apply damage to target
```

**Features:**
- True damage flag (bypasses mitigation)
- Position-based damage modifiers
- Critical hit calculation
- Physical vs Magic damage types

**TODO:**
- Location-based effects (damage type vs weather) (line 191)

---

#### 4.1.3 Skill Selection
**File:** `Server/src/Entity/Battle/getPlayableSkill.ts`

**Flow:**
```
getPlayableSkill()
  ├─> Check active skills
  │   ├─> Check HP/MP/SP requirements
  │   ├─> Check elemental resource requirements
  │   ├─> Check equipment requirements
  │   └─> Check target availability
  └─> Fallback to conditional skills or basic attack
```

**Selection Logic:**
- Prioritizes active skills
- Checks resource availability
- Validates equipment requirements
- Falls back to conditional skills if HP low
- Ultimate fallback: basic attack

---

#### 4.1.4 Target Selection
**File:** `Server/src/Entity/Battle/getTarget.ts`

**Methods:**
- `one()` - Select single target
- `all()` - Select all targets
- `random()` - Select random target
- Filtering by race, position, buffs

---

### 4.2 Character System
**Directory:** `Server/src/Entity/Character/`

#### 4.2.1 Character Core
**File:** `Server/src/Entity/Character/Character.ts`

**Major Subsystems:**

##### Attributes & Stats
- `CharacterAttributes` - Base attributes (strength, dexterity, etc.)
- `CharacterBattleStats` - Combat stats (pATK, mATK, pDEF, mDEF)
- `CharacterProficiencies` - Weapon/armor proficiencies
- `CharacterArtisans` - Crafting skills
- `CharacterElements` - Elemental resources
- `CharacterPlanarAptitude` - Magic resistance/affinity

##### Vitals & Needs
- `CharacterVitals` - HP, MP, SP
- `CharacterNeeds` - Mood, energy, hunger

##### Skills
- `skills` - Map of learned skills
- `activeSkills` - Active skill deck
- `conditionalSkills` - Conditional skill deck (low HP, etc.)
- `breathingSkills` - Breathing technique skills

##### Equipment & Inventory
- `inventory` - Item inventory (Map<ItemId, quantity>)
- `itemInstances` - Unique crafted items
- `equipments` - Equipped items (weapons, armor, jewelry)

##### Buffs & Debuffs
- `buffsAndDebuffs` - Active status effects

##### Other
- `alignment` - Character alignment
- `fame` - Fame system
- `title` - Character titles (Role, Epithet)
- `behavior` - AI behavior settings
- `actionSequence` - Scheduled actions
- `traits` - Character traits
- `news` / `unseenNews` - News tracking

**TODO:**
- Breathing skill condition logic (line 90)
- Breathing skill ideas (line 97)

---

#### 4.2.2 Character Subclasses
**Directory:** `Server/src/Entity/Character/Subclass/`

**Stats:**
- `Stats/CharacterAttributes.ts` - Attribute calculations
- `Stats/CharacterBattleStats.ts` - Battle stat calculations
- `Stats/CharacterProficiencies.ts` - Proficiency system
- `Stats/CharacterArtisans.ts` - Artisan skills
- `Stats/CharacterElements.ts` - Elemental resources
- `Stats/CharacterSaveRolls.ts` - Saving throw calculations

**Other:**
- `Alignment/CharacterAlignment.ts` - Alignment system
- `Needs/CharacterNeeds.ts` - Needs system (mood, energy)
- `Vitals/CharacterVitals.ts` - HP/MP/SP management
- `Fame/CharacterFame.ts` - Fame tracking
- `PlanarAptitude/CharacterPlanarAptitude.ts` - Magic affinity
- `Behavior/CharacterBehavior.ts` - AI behavior
- `Title/Title.ts` - Title system (Role, Epithet)
- `Action/CharacterAction.ts` - Action sequences
- `DeckCondition/DeckCondition.ts` - Conditional skill deck logic
- `Usage/CharacterUsage.ts` - Usage tracking

---

#### 4.2.3 MOBs (Monsters)
**Directory:** `Server/src/Entity/Character/MOBs/`

**Goblins:**
- **File:** `goblins.ts`
- Goblin Scout, Warrior, Mage, Cleric, Captain
- Each with unique skills and equipment

**Humanoids:**
- **Directory:** `Humanoid/`
- Humans, Dwarfs, Halflings, Orcs, Elves
- Multiple classes per race
- **TODO:** Active and conditional skills for all humanoid classes

**Helpers:**
- `equipmentHelpers.ts` - MOB equipment utilities
- `helpers.ts` - MOB creation helpers
- `repository.ts` - MOB repository

---

#### 4.2.4 NPCs
**Directory:** `Server/src/Entity/Character/NPCs/`

**NPCs:**
- `nobody.ts` - Placeholder NPC

---

#### 4.2.5 Character Creation
**Directory:** `Server/src/Game/CharacterCreation/`

**Files:**
- `Races.ts` - Race definitions
- `Classes.ts` - Class definitions
- `Backgrounds.ts` - Background definitions

---

### 4.3 Item System
**Directory:** `Server/src/Entity/Item/`

#### 4.3.1 Item Core
**File:** `Server/src/Entity/Item/Item.ts`

**Item Types:**
- Equipment (Weapons, Armor)
- Consumables (Food, Potions, Usables)
- Misc (Gold, Resources)
- Books

---

#### 4.3.2 Equipment
**Directory:** `Server/src/Entity/Item/Equipment/`

**Weapons:**
- **Directory:** `Weapon/`
- Swords, Daggers, Axes, Hammers, Spears, Blades, Bows, Shields, Staves, Wands, Tomes, Orbs, BareHand
- Each weapon type has multiple variants

**Armor:**
- **Directory:** `Armor/`
- Body, Leg, Hand, Foot, HeadWear, Jewelry (Ring, Ear, Neck), Util

**Equipment System:**
- `Equipment.ts` - Base equipment class
- `equip.ts` - Equipment logic (requires inventory)
- `equipDirect.ts` - Direct equipment (for MOBs, bypasses inventory)
- `remove.ts` - Equipment removal
- `modifiers.ts` - Equipment stat modifiers
- `ItemInstance/` - Unique crafted item instances

**Repositories:**
- `repository.ts` - Equipment repository
- Type-specific repositories (Sword, Dagger, etc.)

---

#### 4.3.3 Consumables
**Directory:** `Server/src/Entity/Item/Consumable/`

**Types:**
- `food/` - Food items
- `potion/` - Potions
- `useable/` - Usable items

**System:**
- `Consumable.ts` - Base consumable class
- `repository.ts` - Consumable repository

---

#### 4.3.4 Misc Items
**Directory:** `Server/src/Entity/Item/Misc/`

**Types:**
- `Gold/` - Currency
- `Resource/` - Crafting resources (Ore, Gem, Wood, Leather, Cloth, Thread, Plank, Ingot, Bone, Skin)

**System:**
- `Misc.ts` - Base misc item class
- `repository.ts` - Misc item repository

---

#### 4.3.5 Books
**Directory:** `Server/src/Entity/Item/Books/`

**Files:**
- `Books.ts` - Book item class
- `index.ts` - Book exports

---

### 4.4 Location System
**Directory:** `Server/src/Entity/Location/`

#### 4.4.1 Location Core
**File:** `Server/src/Entity/Location/Location.ts`

**Components:**
- Location ID, name, description
- Region and subregion assignment
- Connected locations (graph structure)
- Resource generation
- Random events (rest, train, learn, stroll, artisan, travel)
- Action handlers (craft, rest, train, learn, etc.)

**Methods:**
- `processEncounters()` - Process location encounters
- `processActions(day, phase)` - Process character actions
- `refillResources()` - Refill location resources
- `getRandomEventFor(type, roll)` - Get random event
- `checkIfLocationConnected(target)` - Check connection

**TODO:**
- Private scope handling (line 676)
- Grouping logic (line 800)

---

#### 4.4.2 Location Graph
**File:** `Server/src/Entity/Location/LocationGraph.ts`

**Responsibilities:**
- Location connectivity
- Path finding
- Distance calculations

---

#### 4.4.3 Location Hierarchy
**Structure:**
```
Region
  └─> SubRegion
      └─> Location
```

**Repositories:**
- `Region/repository.ts` - Region definitions
- `SubRegion/repository.ts` - Subregion definitions
- `Location/repository.ts` - Location definitions

---

#### 4.4.4 Location Events
**Directory:** `Server/src/Entity/Location/Events/`

**Event Handlers:**
- `handlers/artisans/` - Artisan action handlers
- `handlers/craft/` - Crafting handlers
- `handlers/learn/` - Learning handlers
- `handlers/read/` - Reading handlers
- `handlers/rest/` - Rest handlers
- `handlers/strolling/` - Strolling handlers
- `handlers/tavern/` - Tavern handlers
- `handlers/train/` - Training handlers (attribute, proficiency, skill, artisans)

**Event Types:**
- `enum.ts` - Event type definitions

---

#### 4.4.5 Location Manager
**File:** `Server/src/Entity/Location/Manager/LocationManager.ts`

**Methods:**
- `processEncounters(day, phase)` - Process all location encounters
- `processActions(day, phase)` - Process all location actions
- `refillResources()` - Refill all location resources

---

#### 4.4.6 Weather
**Directory:** `Server/src/Entity/Location/Weather/`

**Files:**
- `types.ts` - Weather type definitions

**Integration:**
- Weather cards drawn daily
- Subregion weather system

---

### 4.5 Market System
**Directory:** `Server/src/Entity/Market/`

#### 4.5.1 Market Core
**File:** `Server/src/Entity/Market/Market.ts`

**Components:**
- `resourceTracker` - Resource production tracking
- `yearlyModifiers` - Yearly price modifiers
- `eventModifiers` - Event-based price modifiers (stacking)
- `transactionHistory` - Buy/sell transaction history

**Methods:**
- `getPrice(item, location)` - Get current price
- `adjustYearlyPrices()` - Yearly price adjustment
- `adjustSeasonalPrices()` - Seasonal price adjustment
- `addEventModifier(tradeable, eventId, modifier)` - Add event modifier
- `removeEventModifier(tradeable, eventId)` - Remove event modifier
- `recordTransaction(location, item, quantity, price, type)` - Record transaction

**Pricing Formula:**
```
price = basePrice × yearlyModifier × localShortageModifier × eventModifier
```

---

#### 4.5.2 Resource Production Tracker
**File:** `Server/src/Entity/Market/ResourceProductionTracker.ts`

**Tracking Levels:**
- Global production
- Subregion production
- Location production

**Methods:**
- `recordProduction(location, subRegion, resourceType, amount)` - Record production
- `getLocationBaseline(location, resourceType)` - Get location baseline
- `getSubRegionBaseline(subRegion, resourceType)` - Get subregion baseline
- `resetYearlyTracking()` - Reset yearly tracking

---

#### 4.5.3 Price Modifiers
**File:** `Server/src/Entity/Market/PriceModifiers.ts`

**Functions:**
- `calculateLocalShortageFactor(location, resourceType, localBaseline, subRegionBaseline)` - Calculate local shortage

---

### 4.6 News System
**Directory:** `Server/src/Entity/News/`

#### 4.6.1 News Core
**File:** `Server/src/Entity/News/News.ts`

**News Structure:**
- `id` - Unique news ID
- `ts` - Game time timestamp
- `scope` - News scope (world, region, subregion, location, party, private)
- `content` - L10N content (localized text)
- `context` - News context (region, subregion, location, party, characters)
- `significance` - News significance level
- `propagation` - Propagation type
- `spreadConfig` - Spread configuration

**News Scopes:**
- `worldScope` - Global news
- `regionScope` - Region-wide news
- `subRegionScope` - Subregion news
- `locationScope` - Location news
- `partyScope` - Party-specific news
- `privateScope` - Character-specific news

**Functions:**
- `createNews(data)` - Create news item
- `newsArrayToStructure(newsArray)` - Convert array to distribution structure
- `emptyNewsDistribution()` - Create empty distribution
- `mergeNewsStructures(...)` - Merge multiple distributions

**TODO:**
- Add News and UnSeenNews to Character class (line 61)
- Character name display details (line 177)
- Item display details (line 185)

---

#### 4.6.2 News Archive
**Files:**
- `NewsArchive.ts` - News archive system (v1)
- `NewsArchive.v2.ts` - News archive system (v2)

**Features:**
- News storage
- News spread/decay
- Character news knowledge tracking
- Location news reach tracking

**TODO:**
- Calculate decay and spread simultaneously (line 130 in v2)

---

#### 4.6.3 News Spread Config
**File:** `Server/src/Entity/News/NewsSpreadConfig.ts`

**Components:**
- Spread rate configuration
- Decay rate configuration
- Propagation rules

---

#### 4.6.4 Postman
**File:** `Server/src/Entity/News/Postman.ts`

**Responsibilities:**
- News delivery to parties
- WebSocket integration (planned)
- News distribution

---

### 4.7 Skill System
**Directory:** `Server/src/Entity/Skill/`

#### 4.7.1 Skill Core
**File:** `Server/src/Entity/Skill/Skill.ts`

**Skill Structure:**
- `id` - Skill ID
- `name` - L10N name
- `description` - L10N description
- `requirement` - Skill requirements
- `equipmentNeeded` - Required equipment types
- `tier` - Skill tier
- `consume` - Resource consumption (HP, MP, SP, elements)
- `produce` - Resource production (HP, MP, SP, elements)
- `exec` - Skill execution function

**Skill Execution:**
```typescript
exec(
  actor: Character,
  actorParty: Character[],
  targetParty: Character[],
  skillLevel: number,
  location: LocationsEnum
): TurnResult
```

---

#### 4.7.2 Skill Definitions
**Directory:** `Server/src/Entity/Skill/definition/`

**Skills (24 total):**

**Combat Skills:**
- `basicAttack.ts` - Basic weapon attack
- `bash.ts` - Bash attack
- `cleave.ts` - Cleave attack
- `backstab.ts` - Backstab attack
- `panicSlash.ts` - Panic slash (low HP)
- `throwPebble.ts` - Ranged attack

**Magic Skills:**
- `arcaneBolt.ts` - Arcane bolt
- `arcaneShield.ts` - Arcane shield (TODO: implement buff)
- `fireBolt.ts` - Fire bolt
- `fireBall.ts` - Fireball
- `burningHand.ts` - Burning hand
- `backdraft.ts` - Backdraft

**Support Skills:**
- `taunt.ts` - Taunt enemy
- `shriek.ts` - Shriek (fear + taunt)
- `shieldUp.ts` - Shield up (TODO: implement defense buff)
- `herosPose.ts` - Hero's pose
- `retreatDash.ts` - Retreat dash (TODO: implement evasion + movement)
- `mendSpirit.ts` - Heal spirit (HP/MP restore)
- `chaoticBlessing.ts` - Chaotic blessing
- `hexOfRot.ts` - Hex of rot (TODO: implement endurance debuff)
- `spiritRattle.ts` - Spirit rattle (TODO: implement control buff)

**Goblin Captain Skills:**
- `worksYouMaggots.ts` - Works You Maggots! (damage ally, gain slave driver)
- `commanderScream.ts` - Commander Scream! (fear + cowardly charge)
- `whip.ts` - Whip! (damage based on slave driver stacks)

---

#### 4.7.3 Skill Repository
**File:** `Server/src/Entity/Skill/repository.ts`

**Repository:**
- Maps SkillId to Skill instance
- All 24 skills registered

---

#### 4.7.4 Skill Learning
**File:** `Server/src/Entity/Skill/learnSkill.ts`

**Features:**
- Skill learning progress tracking
- Skill unlocking
- Skill leveling

---

### 4.8 Buff/Debuff System
**Directory:** `Server/src/Entity/BuffsAndDebuffs/`

#### 4.8.1 Buff/Debuff Core
**File:** `Server/src/Entity/BuffsAndDebuffs/type.ts`

**Structure:**
- `appender(actor, value, isPerm, permValue)` - Apply buff/debuff
- `resolver(actor)` - Resolve buff/debuff (turn-based)
- `mutateBonus(stat, value)` - Modify stat bonuses

---

#### 4.8.2 Buff/Debuff Definitions
**Directory:** `Server/src/Entity/BuffsAndDebuffs/definitions/`

**Buffs/Debuffs (14 total):**

**Combat:**
- `taunt.ts` - Taunt (forces enemy targeting)
- `fear.ts` - Fear (attack roll disadvantage)
- `haste.ts` - Haste (speed bonus)
- `slow.ts` - Slow (speed penalty)
- `defenseUp.ts` - Defense up (defense bonus)
- `arcaneShield.ts` - Arcane shield

**Status:**
- `burn.ts` - Burn (damage over time)
- `dazed.ts` - Dazed (disadvantage)
- `hexed.ts` - Hexed (cursed)
- `hiding.ts` - Hiding (stealth)
- `retreat.ts` - Retreat (evasion)

**Special:**
- `spiritRattle.ts` - Spirit rattle buff
- `slaveDriver.ts` - Slave driver (stacking, no decay)
- `cowardlyCharge.ts` - Cowardly charge (pATK/mATK bonus, decays)

---

#### 4.8.3 Buff/Debuff Repository
**File:** `Server/src/Entity/BuffsAndDebuffs/repository.ts`

**Repository:**
- Maps BuffsAndDebuffsEnum to definition
- All 14 buffs/debuffs registered

---

### 4.9 Card System
**Directory:** `Server/src/Entity/Card/`

#### 4.9.1 Global Event Cards
**Directory:** `Server/src/Entity/Card/GlobalEventCard/`

**Files:**
- `GlobalEventCard.ts` - Global event card class
- `types.ts` - Type definitions
- `definitions/` - Card definitions (6 cards)

**Card Structure:**
- `name` - Card name
- `description` - Card description
- `onDraw()` - On draw effect (returns NewsDistribution)
- `completionCondition()` - Completion condition
- `onEnd()` - On end cleanup
- `globalEventScale` - Scale contribution

**Cards:**
- Various global event scenarios

**TODO:**
- Some global events shouldn't reappear (story-line events) (GameState.ts line 43)

---

#### 4.9.2 Region Event Cards
**Directory:** `Server/src/Entity/Card/RegionEventCard/`

**Files:**
- `RegionEventCard.ts` - Region event card class
- `types.ts` - Type definitions
- `definitions/` - Card definitions (6 cards)

**Card Structure:**
- Similar to Global Event Cards
- `globalEventScale` - Scale contribution (0-250)

**Cards:**
- Regional conflicts
- Bandit raids
- Natural disasters
- Economic events

**TODO:**
- Add back NorthernReach and BorealFrost when implemented (regionalConflict.ts line 34)
- Add back EasternFrontier and WesternForest when implemented (banditRaids.ts line 18)

---

#### 4.9.3 Weather Cards
**Directory:** `Server/src/Entity/Card/WeatherCard/`

**Files:**
- `WeatherCard.ts` - Weather card class
- `getRandomWeatherDeviant.ts` - Random weather generation

**Features:**
- Weather volatility
- Subregion weather effects
- Daily weather drawing

---

### 4.10 Blueprint System
**Directory:** `Server/src/Entity/Blueprint/`

#### 4.10.1 Blueprint Core
**File:** `Server/src/Entity/Blueprint/Blueprint.ts`

**Blueprint Types:**
- `WeaponBlueprint` - Weapon crafting
- `ArmorBlueprint` - Armor crafting
- `IngotBlueprint` - Ingot smelting
- `RefinementBlueprint` - Material refinement
- `GemCuttingBlueprint` - Gem cutting

**Blueprint Structure:**
- `id` - Blueprint ID
- `name` - Blueprint name
- `needed` - Required materials (Map<ItemId, number>)
- `result` - Result item
- `tier` - Blueprint tier
- `artisanRequirement` - Required artisan skill

---

#### 4.10.2 Blueprint Repository
**File:** `Server/src/Entity/Blueprint/repository.ts`

**Repository:**
- Maps BlueprintId to Blueprint instance
- All blueprints registered

---

### 4.11 Trait System
**Directory:** `Server/src/Entity/Trait.ts/`

#### 4.11.1 Trait Core
**File:** `Server/src/Entity/Trait.ts/index.ts`

**Trait Structure:**
- Trait definitions
- Trait effects

---

#### 4.11.2 Trait Definitions
**Directory:** `Server/src/Entity/Trait.ts/definition/`

**Traits:**
- `traitGoblinCunning.ts` - Goblin cunning trait
- `traitPackInstinct.ts` - Pack instinct trait
- `traitScrapSurvivalist.ts` - Scrap survivalist trait

---

#### 4.11.3 Trait Repository
**File:** `Server/src/Entity/Trait.ts/repository.ts`

**Repository:**
- Maps TraitEnum to definition
- All traits registered

---

### 4.12 Breathing Skill System
**Directory:** `Server/src/Entity/BreathingSkill/`

#### 4.12.1 Breathing Skill Core
**Files:**
- `BreathinglSkill.ts` - Breathing skill class
- `activeBreathingSkill.ts` - Active breathing skill management

**Features:**
- Breathing technique skills
- Turn-based passive effects
- Learning progress

---

#### 4.12.2 Breathing Skill Definitions
**Directory:** `Server/src/Entity/BreathingSkill/definition/`

**Skills:**
- `basicBreathingTechnique.ts` - Basic breathing technique

---

#### 4.12.3 Breathing Skill Repository
**File:** `Server/src/Entity/BreathingSkill/repository.ts`

**Repository:**
- Maps BreathingSkillId to definition

---

### 4.13 Party System
**Directory:** `Server/src/Entity/Party/`

#### 4.13.1 Party Core
**File:** `Server/src/Entity/Party/Party.ts`

**Components:**
- `partyID` - Party ID
- `characters` - Party members (Character | "none")
- `leader` - Party leader
- `location` - Current location
- `behavior` - Party behavior (travel pace, etc.)
- `actionSequence` - Scheduled actions (day × phase matrix)

**Methods:**
- `getCharacters()` - Get all characters
- `addCharacter(character, position)` - Add character
- `removeCharacter(characterId)` - Remove character
- `setLeader(characterId)` - Set party leader

**TODO:**
- Party type logic (line 120)

---

#### 4.13.2 Party Behavior
**File:** `Server/src/Entity/Party/PartyBehavior.ts`

**Components:**
- Travel pace (bold, measured, cautious)
- Crafting preferences
- Action preferences

---

#### 4.13.3 Party Action Sequence
**Directory:** `Server/src/Entity/Party/ActionlSequence/`

**File:**
- `PartyActionSequence.ts` - Action sequence management

---

## 5. API Layer

### 5.1 API Routes
**Directory:** `Server/src/API/`

#### 5.1.1 Authentication Routes
**Files:**
- `login/index.ts` - Login endpoint
- `register/index.ts` - Registration endpoint
- `auth/index.ts` - Authentication verification

**TODO:**
- Password verification (bcrypt) (login/index.ts line 35)

---

#### 5.1.2 Character Routes
**File:** `Server/src/API/character/index.ts`

**Endpoints:**
- `POST /api/character/create` - Create character
- `POST /api/character/checkName` - Check name availability

**Flow:**
```
POST /api/character/create
  ├─> Validate session token
  ├─> Validate character data
  ├─> Check name availability
  ├─> CharacterService.handleCreateCharacter()
  │   ├─> Create character entity
  │   ├─> Create party
  │   ├─> Add to managers
  │   └─> Save to database
  └─> Return success
```

---

#### 5.1.3 Party Routes
**File:** `Server/src/API/party/index.ts`

**Endpoints:**
- `GET /api/party/user` - Get user's party
- `GET /api/party/:partyId` - Get party by ID

**Flow:**
```
GET /api/party/user
  ├─> Validate session token
  ├─> Get character from manager
  ├─> Get party from manager
  ├─> Map to interface
  └─> Return party data
```

---

#### 5.1.4 Other Routes
**Files:**
- `guest/index.ts` - Guest access
- `networkTest/index.ts` - Network testing

---

### 5.2 Services
**Directory:** `Server/src/Services/`

#### 5.2.1 Character Service
**File:** `Server/src/Services/CharacterService.ts`

**Methods:**
- `handleCreateCharacter(userId, characterData)` - Create and save character
- `createCharacter(userId, characterData)` - Create character entity
- `isCharacterNameAvailable(name)` - Check name availability
- `characterToInsertCharacter(character)` - Convert to DB format
- `saveCharacterToDatabase(insertCharacter)` - Save to DB
- `loadCharacterFromDatabase(characterId)` - Load from DB

---

#### 5.2.2 Party Service
**File:** `Server/src/Services/PartyService.ts`

**Methods:**
- `createParty(leader, location)` - Create party
- `partyToInsertParty(party)` - Convert to DB format
- `savePartyToDatabase(insertParty)` - Save to DB
- `loadPartyFromDatabase(partyId)` - Load from DB

---

#### 5.2.3 Session Service
**File:** `Server/src/Services/SessionService.ts`

**Methods:**
- `validateSession(token)` - Validate session token
- `createSession(userId, token, expiresAt)` - Create session
- `invalidateSession(token)` - Invalidate session

---

## 6. Supporting Systems

### 6.1 Utils
**Directory:** `Server/src/Utils/`

**Utilities:**
- `Dice.ts` - Dice rolling (`roll()`, `rollTwenty()`)
- `statMod.ts` - Stat modifier calculation
- `Reporter.ts` - Logging system
- `buildCombatMessage.ts` - Combat message building
- `getWeaponDamgeOutput.ts` - Weapon damage calculation
- `getWeaponDamageType.ts` - Weapon damage type
- `getPositionModifier.ts` - Position-based modifiers
- `getDamgeOutput.ts` - Damage output calculation
- `equip.ts` - Equipment logic
- `equipmentModifiers.ts` - Equipment modifiers
- `CharacterMapper.ts` - Character to interface mapping
- `PartyMapper.ts` - Party to interface mapping
- `getCharacter.ts` - Character retrieval
- `addNewsToScope.ts` - News scope management
- `mergeNewsStructure.ts` - News structure merging
- `CharacterDefaultSaveRoll.ts` - Default save roll calculation
- `clamp.ts` - Number clamping
- `isBodyValid.ts` - Request body validation

---

### 6.2 Events
**Directory:** `Server/src/Event/`

#### 6.2.1 Crafting Events
**Directory:** `Server/src/Event/Craft/`

**Files:**
- `index.ts` - Main crafting processor
- `ingot.ts` - Ingot smelting
- `weapon.ts` - Weapon crafting
- `armor.ts` - Armor crafting
- `refinement.ts` - Material refinement
- `gem.ts` - Gem cutting

**Flow:**
```
processCharacterCraftingPreferences()
  ├─> For each blueprint in crafting list:
  │   ├─> Check materials available
  │   ├─> Determine craft quantity
  │   ├─> Execute craft (roll dice, check success)
  │   └─> Add result to inventory
  └─> Return crafted items
```

**TODO:**
- Multiple characters helping each other craft (line 70)
- Deal with other characters (line 72)

---

#### 6.2.2 Event Card Drawing
**Files:**
- `drawGlobalEventCard.ts` - Draw global event card
- `drawRegionEventCard.ts` - Draw region event card
- `subRegionEvent.ts` - Subregion events
- `subRegionWeather.ts` - Subregion weather

---

### 6.3 Middleware
**Directory:** `Server/src/MiddleWare/`

**Files:**
- `logger.ts` - Request logging middleware
- `error.ts` - Error handling middleware

---

### 6.4 Configuration
**Directory:** `Server/src/config/`

**Files:**
- `gameLoop.ts` - Game loop configuration
  - `getGameLoopMode()` - Get loop mode (prod/dev/test)
  - `getGameEpoch()` - Get game epoch
  - `getMsPerPhase()` - Get milliseconds per phase

---

## 7. Incomplete Features & TODOs

### 7.0 Major Systems Not Implemented (No TODO Markers)

These systems have enums, types, or placeholders defined but lack full implementation:

#### 7.0.1 Quest System
**Status:** Enums defined, no implementation

**Location:** `Server/src/Entity/Location/Events/enum.ts`

**Defined Events:**
- `QuestGiverEvent` - Give quest to character
- `QuestUpdateEvent` - Update quest progress
- `QuestCompleteEvent` - Complete quest

**Missing:**
- Quest class/interface definition
- Quest tracking on Character
- Quest database schema
- Quest giver NPCs
- Quest objectives and completion logic
- Quest rewards system

**References:**
- Mentioned in `Location.ts` line 141 (good events include quests)
- Referenced in `News.ts` line 98 (quest system type)
- Referenced in `greatFamine.ts` line 78 (relief quests)
- Referenced in `EVENT_CARD_LIFECYCLE.md` line 255 (quest completion)

---

#### 7.0.2 Dialogue System
**Status:** Enum defined, needs NPCDialogue class

**Location:** `Server/src/Entity/Location/Events/enum.ts` line 28

**Defined:**
- `DialogueEvent` - Dialogue with NPC

**Missing:**
- NPCDialogue class
- Dialogue tree system
- Dialogue outcome logic
- NPC dialogue definitions
- Dialogue choice system

**Comment in code:**
> "Dialogue with NPC, take player character and NPCDialogue (needed implementation) -> NPC Dialogue class would be needed, determine the dialogue tree and the outcome"

---

#### 7.0.3 Gathering Actions
**Status:** Actions grouped but no handlers implemented

**Location:** `Server/src/Entity/Location/Location.ts` lines 614-622

**Actions Defined:**
- `Mining` - Mine ore and gemstones
- `WoodCutting` - Cut wood
- `Foraging` - Gather herbs, fruits, silk

**Current State:**
- Actions are grouped into `artisanActions` array
- No handler functions implemented
- No resource generation logic

**Missing:**
- Handler functions for each gathering type
- Resource generation based on location
- Skill checks and success rates
- Resource quantity calculations

---

#### 7.0.4 Refining Actions
**Status:** Actions grouped but no handlers implemented

**Location:** `Server/src/Entity/Location/Location.ts` lines 617-621

**Actions Defined:**
- `Smelting` - Smelt ore into ingots
- `Tanning` - Tan leather
- `Carpentry` - Process wood
- `Weaving` - Weave cloth
- `Enchanting` - Enchant items

**Current State:**
- Actions are grouped into `artisanActions` array
- No handler functions implemented
- Enchanting needs item selection + rune system

**Missing:**
- Handler functions for each refining type
- Material transformation logic
- Enchanting system (item slots, runes)
- Success rates and quality calculations

---

#### 7.0.5 Special Location Actions
**Status:** Actions defined but no handlers

**Location:** `Server/src/Entity/Character/Subclass/Action/CharacterAction.ts` lines 74-92

**Religious Actions:**
- `HeavensDecreeMeeting`
- `ChurchOfLaoh`
- `GreatTempleOfLaoh`
- `CultOfNizarith`
- `ShrineOfGelthoran` / `MajorShrineOfGelthoran`
- `ShrineOfAqorath` / `MajorShrineOfAqorath`
- `ShrineOfValthoria` / `MajorShrineOfValthoria`
- `ShrineOfPyrnthanas` / `MajorShrineOfPyrnthanas`

**Combat/Adventure Actions:**
- `Barrack`
- `KnightOrder`
- `MagicSchool`
- `MagicAcademy`
- `ChurchOfLaohMagicLearning`
- `CultOfNizarithMagicLearning`
- `AdventureGuild`
- `BountyBoard`

**Current State:**
- Actions defined in enum and type system
- Comment: "Special choice in some places, just idea place holder now"
- No handlers implemented

**Missing:**
- Handler functions for each special action
- Location-specific logic
- Rewards and outcomes
- Requirements and prerequisites

---

#### 7.0.6 Item Shop System
**Status:** Enum defined, no implementation

**Location:** `Server/src/Entity/Location/Events/enum.ts` line 37

**Defined:**
- `ItemShopEvent` - Open shop interface, buy/sell items

**Missing:**
- Shop class/interface
- Shop inventory system
- Buy/sell logic
- Shop UI integration
- Shop types (general, weapon, armor, etc.)

**Comment in code:**
> "Take character and shop, open shop interface, buy/sell items"

---

#### 7.0.7 Item Pickup System
**Status:** Enum defined, partial implementation

**Location:** `Server/src/Entity/Location/Events/enum.ts` line 36

**Defined:**
- `ItemPickupEvent` - Pick up item, add to inventory

**Missing:**
- Item spawn system
- Pickup validation
- Item discovery mechanics
- Ground item management

**Comment in code:**
> "Take character and item, add item to character inventory"

---

#### 7.0.8 Encounter Resolution
**Status:** Placeholder function

**Location:** `Server/src/Entity/Location/Location.ts` lines 647-656

**Current State:**
```typescript
// TODO:
function resolveEncounters(pairs: [Party, Party][]): News[] {
  const news: News[] = [];
  for (const [a, b] of pairs) {
    // Placeholder - replace with actual logic
    // const result = checkAndTriggerEncounterEvent(a, b);
    // if (result) news.push(result);
  }
  return news;
}
```

**Missing:**
- Encounter event checking
- Encounter type determination
- Encounter outcome logic
- Battle triggering from encounters

**Related:**
- `handleNeutralEncounter()` exists but has commented-out logic (knowledge exchange, trade)

---

#### 7.0.9 World Event Escalation System
**Status:** Structure defined, not fully implemented

**Location:** `Server/src/Entity/Card/GlobalEventCard/`

**Defined:**
- `EscalationThreshold` interface
- `ClimaxEvent` interface
- `escalationTrack` array in GlobalEventCard
- `climaxEvent` in GlobalEventCard

**Current State:**
- Types and interfaces exist
- Some cards have empty escalation tracks
- Climax events defined but not triggered
- No escalation checking in game loop

**Missing:**
- Escalation checking logic (check global event scale against thresholds)
- Escalation event triggering
- Climax event triggering at max scale
- Escalation effects implementation

**Examples:**
- `boringYear.ts` - Empty escalation track
- `kingdomMarch.ts` - Escalation track commented out, climax TODO
- `dragonHorde.ts` - Escalation track commented out, climax defined but not implemented

---

#### 7.0.10 Storyline Event System
**Status:** Mentioned but no tracking

**Location:** `Server/src/Game/GameState.ts` line 43

**Current State:**
- TODO comment: "Rethink, some global event shouldn't reappear, especially the story-line events"
- No storyline tracking system
- No storyline progression
- No storyline-specific event cards

**Missing:**
- Storyline tracking on Character or GameState
- Storyline progression system
- Storyline-specific event cards
- Storyline completion tracking
- Storyline branching logic

---

#### 7.0.11 Knowledge Exchange System
**Status:** Logic commented out

**Location:** `Server/src/Entity/Location/Logics/Encounters/neutralEncounter.ts`

**Current State:**
- All knowledge exchange functions commented out:
  - `executeTradeEvent(partyA, partyB)`
  - `exchangeKnowledge(partyA, partyB, type)`
  - `updateRelation(partyA, partyB, value)`

**Missing:**
- Knowledge exchange implementation
- Trade event system
- Relationship update system
- Knowledge types (scholarly, military, underworld, religious, folk)

---

#### 7.0.12 Action Handlers - Missing Implementations

**Gathering/Refining Handlers:**
- No handlers for: Mining, WoodCutting, Foraging, Smelting, Tanning, Carpentry, Weaving, Enchanting

**Special Action Handlers:**
- No handlers for any religious/special location actions
- No handlers for AdventureGuild, BountyBoard

**Current Handler Coverage:**
- ✅ Rest (inn, camping, house, normal)
- ✅ Train (attribute, proficiency, artisan, skill)
- ✅ Learn Skill
- ✅ Craft
- ✅ Read
- ✅ Stroll
- ✅ Tavern
- ❌ Gathering actions (Mining, WoodCutting, Foraging)
- ❌ Refining actions (Smelting, Tanning, Carpentry, Weaving, Enchanting)
- ❌ Special location actions (all religious, guilds, etc.)

---

### 7.1 Battle System
- **TODO:** Rewards calculation (Battle.ts line 281)
- **TODO:** Looting system (Battle.ts line 491)
- **TODO:** Location-based effects (damage type vs weather) (damageResolution.ts line 191)

---

### 7.2 Skills
- **TODO:** Arcane Shield buff implementation (arcaneShield.ts line 63)
- **TODO:** Shield Up defense buff (shieldUp.ts line 52)
- **TODO:** Retreat Dash evasion + movement (retreatDash.ts lines 55, 57)
- **TODO:** Hex of Rot endurance debuff (hexOfRot.ts line 92)
- **TODO:** Spirit Rattle control buff (spiritRattle.ts line 82)

---

### 7.3 Character System
- **TODO:** Breathing skill condition logic (Character.ts line 90)
- **TODO:** Breathing skill ideas (Character.ts line 97)
- **TODO:** Element implications (CharacterElements.ts line 12)
- **TODO:** Deck condition TEAMMATE, ENEMY, PARTY_SIZE (isUsingConditionDeck.ts line 21)

---

### 7.4 MOBs (Humanoids)
- **TODO:** Active skills for all humanoid classes (humans.ts, dwarfs.ts, halflings.ts, orcs.ts, elves.ts)
- **TODO:** Conditional skills for all humanoid classes (when HP/MP low, enemy/ally HP conditions)

**Affected Classes:**
- All humanoid races × all classes = ~50+ TODO entries

---

### 7.5 Location System
- **TODO:** Private scope handling (Location.ts line 676)
- **TODO:** Grouping logic (Location.ts line 800)
- **TODO:** Real house rest (houseRest.ts line 9)
- **TODO:** Train handlers (train.ts line 21)
- **TODO:** Skill training (train/skill.ts line 46)
- **TODO:** Craft action details (handleCraftAction.ts line 9)

---

### 7.6 News System
- **TODO:** Add News and UnSeenNews to Character class (News.ts line 61)
- **TODO:** Character name display details (News.ts line 177)
- **TODO:** Item display details (News.ts line 185)
- **TODO:** Calculate decay and spread simultaneously (NewsArchive.v2.ts line 130)

---

### 7.7 Game Loop
- **TODO:** Archivers should record news (GameLoop.ts line 286)
- **TODO:** Collect travel news (TravelManager/index.ts line 144)

---

### 7.8 API
- **TODO:** Password verification (bcrypt) (login/index.ts line 35)

---

### 7.9 Crafting
- **TODO:** Multiple characters helping each other craft (Craft/index.ts line 70)
- **TODO:** Deal with other characters (Craft/index.ts line 72)

---

### 7.10 Event Cards
- **TODO:** Some global events shouldn't reappear (story-line events) (GameState.ts line 43)
- **TODO:** Add back NorthernReach and BorealFrost (regionalConflict.ts line 34)
- **TODO:** Add back EasternFrontier and WesternForest (banditRaids.ts line 18)

---

### 7.11 Equipment
- **TODO:** Shield definitions update (buckler.ts, kiteShield.ts, towerShield.ts)
- **TODO:** Weapon cost calculations (multiple weapon files - TEMP placeholders)

---

### 7.12 Party System
- **TODO:** Party type logic (Party.ts line 120)

---

### 7.13 Rail System
- **TODO:** Replace placeholder Midland location (station.ts line 17)

---

## Summary Statistics

### Implemented Systems
- **Skills:** 24 skills implemented
- **Buffs/Debuffs:** 14 buffs/debuffs implemented
- **MOBs:** 5 goblin types fully implemented
- **Humanoid MOBs:** 5 races × 10 classes = 50 classes (structure complete, skills incomplete)
- **Items:** Hundreds of items (weapons, armor, consumables, resources)
- **Locations:** Full location system with events and actions
- **Market:** Complete dynamic pricing system
- **News:** Full news system with propagation
- **Battle:** Complete battle system with damage resolution
- **Database:** 11 tables with full schema

### Incomplete Features
- **~200+ TODO items** across the codebase
- **12 Major Systems Not Implemented** (enums/types defined but no implementation):
  1. Quest System (QuestGiverEvent, QuestUpdateEvent, QuestCompleteEvent)
  2. Dialogue System (NPCDialogue class needed)
  3. Gathering Actions (Mining, WoodCutting, Foraging - no handlers)
  4. Refining Actions (Smelting, Tanning, Carpentry, Weaving, Enchanting - no handlers)
  5. Special Location Actions (all religious/special actions - no handlers)
  6. Item Shop System (ItemShopEvent enum but no shop implementation)
  7. Item Pickup System (ItemPickupEvent enum but partial implementation)
  8. Encounter Resolution (placeholder function)
  9. World Event Escalation (structure defined, not triggered)
  10. Storyline Event System (mentioned but no tracking)
  11. Knowledge Exchange System (logic commented out)
  12. Action Handlers (8+ action types missing handlers)
- **Major gaps:**
  - Humanoid MOB skills (all classes)
  - Some skill buff implementations
  - Battle rewards and looting
  - Multi-character crafting assistance
  - News character integration
  - Password hashing
  - World event escalation triggering
  - Storyline progression tracking

---

## Architecture Patterns

### 1. Repository Pattern
- Used for: Items, Skills, Buffs/Debuffs, Traits, Locations, Blueprints
- Centralized definitions with repository maps

### 2. Manager Pattern
- Used for: Characters, Parties, Locations, Travel
- In-memory pools for runtime access

### 3. Singleton Pattern
- Used for: GameState, Market, GameTime
- Global state management

### 4. Factory Pattern
- Used for: Character creation, Item creation, Blueprint execution

### 5. Strategy Pattern
- Used for: Skill execution, Buff/Debuff resolution, Action handling

---

## Data Flow Examples

### Character Creation Flow
```
API Request
  └─> CharacterService.handleCreateCharacter()
      ├─> Create Character entity
      ├─> Create Party
      ├─> Add to CharacterManager
      ├─> Add to PartyManager
      └─> Save to Database
```

### Battle Flow
```
Battle.startBattle()
  └─> battleLoop()
      ├─> Sort by agility
      ├─> For each participant:
      │   ├─> Resolve buffs/debuffs
      │   ├─> Select skill
      │   ├─> Execute skill
      │   └─> Update stats
      └─> Determine winner
```

### Game Loop Flow
```
runGameLoop()
  ├─> Synchronize game time
  ├─> Handle milestones (year/season/month/day)
  ├─> Process events (encounters, actions, travel)
  └─> Send news to parties
```

---

## File Organization

### Server Structure
```
Server/src/
  ├─> index.ts                    # Entry point
  ├─> API/                        # HTTP API routes
  ├─> Database/                   # Database layer
  ├─> Entity/                     # Game entities
  ├─> Game/                       # Core game systems
  ├─> Event/                      # Event handlers
  ├─> Services/                   # Business logic services
  ├─> Utils/                      # Utility functions
  ├─> MiddleWare/                 # Express middleware
  ├─> config/                     # Configuration
  └─> InterFacesEnumsAndTypes/    # Type definitions
```

---

## Conclusion

This architecture document provides a comprehensive overview of the entire game system. The system is well-structured with clear separation of concerns:

- **Database Layer:** Handles persistence and state management
- **Game Core:** Manages game loop, time, and state
- **Entity Systems:** Implements game mechanics (battle, characters, items, etc.)
- **API Layer:** Provides HTTP interface for clients
- **Supporting Systems:** Utilities, events, and middleware

The system has a solid foundation with many features implemented. The main areas requiring completion are:

**Major Systems Not Implemented:**
1. Quest System - Complete quest framework (givers, tracking, rewards)
2. Dialogue System - NPC dialogue trees and interactions
3. Gathering/Refining Actions - Resource gathering and material processing
4. Special Location Actions - Religious sites, guilds, schools
5. Item Shop System - Buy/sell interface and shop management
6. World Event Escalation - Escalation tracking and climax events
7. Storyline System - Storyline progression and tracking
8. Knowledge Exchange - Party-to-party knowledge sharing
9. Encounter Resolution - Full encounter event system

**Partially Implemented:**
1. Humanoid MOB skills (all classes need skills)
2. Some skill buff implementations (arcane shield, shield up, etc.)
3. Battle rewards and looting
4. Multi-character crafting assistance
5. News character integration
6. Action handlers for gathering/refining/special actions

This document should serve as a reference for understanding the system architecture and identifying areas for future development. The codebase shows clear architectural planning with enums and types defined for many systems that are not yet implemented, indicating a well-thought-out design that is being built incrementally.

