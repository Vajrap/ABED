# Quest System Design Document

## Overview

The Quest System provides structured objectives for players, integrating with the existing location-based, time-driven game world. Quests are obtained from NPCs at locations, tracked on characters/parties, and completed through various gameplay actions (battles, item collection, travel, etc.).

---

## 1. Core Architecture

### 1.1 Quest Entity Structure

```typescript
// Server/src/Entity/Quest/Quest.ts
export class Quest {
  id: QuestId;                    // Unique quest identifier
  name: L10N;                     // Quest name (localized)
  description: L10N;              // Quest description
  type: QuestType;                // Quest category
  tier: TierEnum;                 // Quest difficulty tier
  
  // Quest Giver
  giverId: NPCId | null;          // NPC who gives the quest
  giverLocation: LocationsEnum;   // Location where quest is available
  giverName: L10N;                // Giver name (for display)
  
  // Prerequisites
  prerequisites: QuestPrerequisite[]; // Required quests, levels, items, etc.
  levelRequirement: number;       // Minimum character/party level
  alignmentRequirement?: AlignmentRequirement; // Good/Evil requirements
  
  // Objectives
  objectives: QuestObjective[];   // List of objectives to complete
  objectiveProgress: Map<ObjectiveId, number>; // Progress tracking
  
  // Time Constraints
  timeLimit?: {
    type: "gameTime" | "realTime";
    duration: number;              // Duration in phases/days or real hours
    startTime: GameTimeStamp;      // When quest was accepted
  };
  
  // Rewards
  rewards: QuestReward;           // Gold, items, experience, fame, etc.
  
  // State
  status: QuestStatus;             // Available, Active, Completed, Failed, Expired
  acceptedAt?: GameTimeStamp;     // When quest was accepted
  completedAt?: GameTimeStamp;     // When quest was completed
  
  // Metadata
  isRepeatable: boolean;          // Can be taken again after completion
  isChainQuest: boolean;           // Part of a quest chain
  chainId?: QuestChainId;          // Chain identifier
  chainOrder?: number;             // Order in chain (1, 2, 3...)
  
  // World Integration
  triggersWorldEvent?: boolean;    // Does completion trigger world event?
  affectsGlobalEventScale?: number; // Contribution to global event scale
}
```

### 1.2 Quest Types

```typescript
export enum QuestType {
  // Combat Quests
  Kill = "kill",                  // Defeat X enemies
  Boss = "boss",                   // Defeat specific boss
  ClearDungeon = "clearDungeon",   // Clear a dungeon location
  
  // Collection Quests
  Collect = "collect",             // Collect X items
  Gather = "gather",                // Gather resources
  Deliver = "deliver",              // Deliver item to location/NPC
  
  // Exploration Quests
  Explore = "explore",             // Visit X locations
  Discover = "discover",           // Discover new location
  
  // Social Quests
  Escort = "escort",               // Escort NPC to location
  Rescue = "rescue",                // Rescue NPC from danger
  
  // Crafting Quests
  Craft = "craft",                 // Craft X items
  Refine = "refine",               // Refine X materials
  
  // Information Quests
  Investigate = "investigate",     // Gather information/knowledge
  DeliverMessage = "deliverMessage", // Deliver message to NPC
  
  // Mixed/Complex
  MultiObjective = "multiObjective", // Multiple objectives
  Storyline = "storyline",         // Main storyline quest
}
```

### 1.3 Quest Objectives

```typescript
export type QuestObjective = 
  | KillObjective
  | CollectObjective
  | TravelObjective
  | CraftObjective
  | DeliverObjective
  | ExploreObjective
  | InvestigateObjective;

export interface KillObjective {
  id: ObjectiveId;
  type: "kill";
  target: {
    type: "race" | "class" | "specific" | "any";
    value: string;                 // RaceEnum, ClassEnum, CharacterId, or "any"
    location?: LocationsEnum;      // Optional: must kill at specific location
  };
  count: number;                   // Number to kill
  current: number;                 // Current progress
  description: L10N;
}

export interface CollectObjective {
  id: ObjectiveId;
  type: "collect";
  itemId: ItemId;
  quantity: number;
  current: number;
  source?: "any" | "gather" | "craft" | "purchase" | "loot";
  description: L10N;
}

export interface TravelObjective {
  id: ObjectiveId;
  type: "travel";
  destination: LocationsEnum;
  completed: boolean;
  description: L10N;
}

export interface DeliverObjective {
  id: ObjectiveId;
  type: "deliver";
  itemId: ItemId;
  quantity: number;
  destination: LocationsEnum | NPCId;
  delivered: boolean;
  description: L10N;
}

export interface CraftObjective {
  id: ObjectiveId;
  type: "craft";
  itemId: ItemId;
  quantity: number;
  current: number;
  description: L10N;
}

export interface ExploreObjective {
  id: ObjectiveId;
  type: "explore";
  locations: LocationsEnum[];
  discovered: LocationsEnum[];
  description: L10N;
}

export interface InvestigateObjective {
  id: ObjectiveId;
  type: "investigate";
  location: LocationsEnum;
  action: "stroll" | "talk" | "read" | "examine";
  completed: boolean;
  description: L10N;
}
```

### 1.4 Quest Status

```typescript
export enum QuestStatus {
  Available = "available",        // Quest is available but not accepted
  Active = "active",               // Quest is in progress
  Completed = "completed",        // Quest objectives met, ready to turn in
  TurnedIn = "turnedIn",           // Quest completed and rewards given
  Failed = "failed",               // Quest failed (time limit, death, etc.)
  Expired = "expired",             // Quest expired without completion
  Abandoned = "abandoned",          // Player abandoned quest
}
```

---

## 2. Quest Givers & NPCs

### 2.1 NPC Quest Giver System

```typescript
// Server/src/Entity/Character/NPCs/QuestGiver.ts
export class QuestGiver {
  npcId: NPCId;
  name: L10N;
  location: LocationsEnum;
  
  // Available Quests
  availableQuests: QuestId[];      // Quests this NPC can give
  questPool: QuestPool;            // Dynamic quest generation
  
  // Quest Availability Logic
  questAvailability: {
    prerequisites: QuestPrerequisite[];
    cooldown?: number;              // Days before same quest available again
    maxActiveQuests?: number;       // Max quests player can have from this NPC
    reputationRequirement?: number;  // Required reputation with NPC/faction
  };
  
  // Dialogue
  greetingDialogue: L10N;          // Initial greeting
  questOfferDialogue: Map<QuestId, L10N>; // Dialogue when offering quest
  completionDialogue: Map<QuestId, L10N>; // Dialogue when turning in
}
```

### 2.2 Quest Pool System

```typescript
export interface QuestPool {
  // Static Quests (defined in code/data)
  staticQuests: QuestId[];
  
  // Dynamic Quest Generation
  dynamicQuests: {
    templates: QuestTemplate[];
    generationRules: GenerationRule[];
  };
  
  // Quest Rotation
  rotation?: {
    type: "daily" | "weekly" | "seasonal";
    quests: QuestId[];
  };
}

export interface QuestTemplate {
  type: QuestType;
  tier: TierEnum;
  objectiveTemplate: ObjectiveTemplate;
  rewardTemplate: RewardTemplate;
  conditions: GenerationCondition[];
}

export interface GenerationCondition {
  type: "location" | "time" | "event" | "playerLevel";
  value: any;
}
```

### 2.3 NPC Locations

NPCs are placed at specific locations and can be:
- **Static NPCs**: Always at the same location (shopkeepers, guild masters)
- **Wandering NPCs**: Move between locations (merchants, messengers)
- **Event NPCs**: Appear during specific events (refugees during disasters)

---

## 3. Quest Tracking & Progress

### 3.1 Character Quest Tracking

```typescript
// Add to Character class
export class Character {
  // ... existing fields ...
  
  quests: {
    active: Map<QuestId, Quest>;           // Active quests
    completed: Set<QuestId>;               // Completed quest IDs
    failed: Set<QuestId>;                   // Failed quest IDs
    abandoned: Set<QuestId>;                // Abandoned quest IDs
    cooldowns: Map<QuestId, GameTimeStamp>; // Quest cooldowns (for repeatables)
  };
  
  questProgress: Map<QuestId, QuestProgress>; // Detailed progress tracking
}
```

### 3.2 Party Quest Tracking

```typescript
// Add to Party class
export class Party {
  // ... existing fields ...
  
  sharedQuests: Map<QuestId, Quest>;        // Quests shared by party
  questProgress: Map<QuestId, PartyQuestProgress>; // Party-wide progress
}

export interface PartyQuestProgress {
  questId: QuestId;
  objectiveProgress: Map<ObjectiveId, number>;
  contributors: CharacterId[];             // Characters who contributed
}
```

### 3.3 Progress Tracking Hooks

Quest progress is tracked through event hooks:

```typescript
// Server/src/Entity/Quest/QuestProgressTracker.ts

export class QuestProgressTracker {
  // Battle completion hook
  onBattleComplete(
    character: Character,
    battleResult: BattleResult,
    enemies: Character[]
  ): void {
    // Check kill objectives
    for (const quest of character.quests.active.values()) {
      for (const objective of quest.objectives) {
        if (objective.type === "kill") {
          // Check if killed enemies match objective
          this.updateKillObjective(quest, objective, enemies);
        }
      }
    }
  }
  
  // Item acquisition hook
  onItemAcquired(
    character: Character,
    itemId: ItemId,
    quantity: number,
    source: "loot" | "craft" | "purchase" | "gather"
  ): void {
    // Check collect objectives
    for (const quest of character.quests.active.values()) {
      for (const objective of quest.objectives) {
        if (objective.type === "collect") {
          this.updateCollectObjective(quest, objective, itemId, quantity);
        }
      }
    }
  }
  
  // Location arrival hook
  onLocationArrival(
    party: Party,
    location: LocationsEnum
  ): void {
    // Check travel/explore objectives
    for (const character of party.getCharacters()) {
      for (const quest of character.quests.active.values()) {
        for (const objective of quest.objectives) {
          if (objective.type === "travel" || objective.type === "explore") {
            this.updateTravelObjective(quest, objective, location);
          }
        }
      }
    }
  }
  
  // Crafting completion hook
  onCraftComplete(
    character: Character,
    itemId: ItemId,
    quantity: number
  ): void {
    // Check craft objectives
    for (const quest of character.quests.active.values()) {
      for (const objective of quest.objectives) {
        if (objective.type === "craft") {
          this.updateCraftObjective(quest, objective, itemId, quantity);
        }
      }
    }
  }
}
```

---

## 4. Quest Completion & Rewards

### 4.1 Completion Logic

```typescript
// Server/src/Entity/Quest/QuestCompletion.ts

export class QuestCompletion {
  checkCompletion(quest: Quest): boolean {
    // Check all objectives are complete
    for (const objective of quest.objectives) {
      if (!this.isObjectiveComplete(objective)) {
        return false;
      }
    }
    
    // Check time limit if exists
    if (quest.timeLimit) {
      if (this.isTimeLimitExceeded(quest)) {
        quest.status = QuestStatus.Expired;
        return false;
      }
    }
    
    return true;
  }
  
  completeQuest(character: Character, quest: Quest): QuestCompletionResult {
    if (quest.status !== QuestStatus.Active) {
      throw new Error("Quest is not active");
    }
    
    if (!this.checkCompletion(quest)) {
      return { success: false, reason: "Objectives not complete" };
    }
    
    // Apply rewards
    const rewards = this.applyRewards(character, quest.rewards);
    
    // Update quest status
    quest.status = QuestStatus.Completed;
    quest.completedAt = GameTime.getCurrentTimestamp();
    
    // Remove from active, add to completed
    character.quests.active.delete(quest.id);
    character.quests.completed.add(quest.id);
    
    // Handle quest chain
    if (quest.isChainQuest) {
      this.activateNextChainQuest(character, quest);
    }
    
    // Trigger world events if needed
    if (quest.triggersWorldEvent) {
      this.triggerWorldEvent(quest);
    }
    
    return {
      success: true,
      rewards,
      news: this.generateCompletionNews(character, quest)
    };
  }
}
```

### 4.2 Reward System

```typescript
export interface QuestReward {
  gold?: number;
  experience?: number;
  fame?: number;
  items?: Array<{
    itemId: ItemId;
    quantity: number;
  }>;
  reputation?: Array<{
    factionId: FactionId;
    amount: number;
  }>;
  skills?: Array<{
    skillId: SkillId;
    level?: number;
  }>;
  titles?: Array<{
    role?: CharacterRoleEnum;
    epithet?: CharacterEpithetEnum;
  }>;
  unlockLocations?: LocationsEnum[];
  unlockQuests?: QuestId[];
}
```

---

## 5. Database Schema

### 5.1 Quest Definitions Table

```typescript
// Server/src/Database/Schema/quest.ts
export const quests = pgTable("quests", {
  id: varchar("id", { length: 100 }).primaryKey(),
  name: jsonb("name").notNull(), // L10N
  description: jsonb("description").notNull(), // L10N
  type: varchar("type", { length: 50 }).notNull(),
  tier: varchar("tier", { length: 20 }).notNull(),
  
  giverId: varchar("giver_id", { length: 100 }),
  giverLocation: varchar("giver_location", { length: 100 }),
  giverName: jsonb("giver_name"), // L10N
  
  prerequisites: jsonb("prerequisites").default([]).notNull(),
  levelRequirement: integer("level_requirement").default(1).notNull(),
  alignmentRequirement: jsonb("alignment_requirement"),
  
  objectives: jsonb("objectives").notNull(),
  
  timeLimit: jsonb("time_limit"),
  
  rewards: jsonb("rewards").notNull(),
  
  isRepeatable: boolean("is_repeatable").default(false).notNull(),
  isChainQuest: boolean("is_chain_quest").default(false).notNull(),
  chainId: varchar("chain_id", { length: 100 }),
  chainOrder: integer("chain_order"),
  
  triggersWorldEvent: boolean("triggers_world_event").default(false).notNull(),
  affectsGlobalEventScale: integer("affects_global_event_scale"),
  
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
```

### 5.2 Character Quest Progress Table

```typescript
export const characterQuests = pgTable("character_quests", {
  id: uuid("id").primaryKey().defaultRandom(),
  characterId: uuid("character_id").notNull().references(() => characters.id, { onDelete: "cascade" }),
  questId: varchar("quest_id", { length: 100 }).notNull().references(() => quests.id),
  
  status: varchar("status", { length: 20 }).notNull(),
  objectiveProgress: jsonb("objective_progress").default({}).notNull(),
  
  acceptedAt: timestamp("accepted_at"),
  completedAt: timestamp("completed_at"),
  failedAt: timestamp("failed_at"),
  
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
```

### 5.3 Quest Giver Table

```typescript
export const questGivers = pgTable("quest_givers", {
  id: uuid("id").primaryKey().defaultRandom(),
  npcId: varchar("npc_id", { length: 100 }).notNull(),
  location: varchar("location", { length: 100 }).notNull(),
  
  availableQuests: jsonb("available_quests").default([]).notNull(),
  questPool: jsonb("quest_pool").default({}).notNull(),
  
  questAvailability: jsonb("quest_availability").default({}).notNull(),
  
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
```

---

## 6. Integration Points

### 6.1 Location System Integration

```typescript
// Server/src/Entity/Location/Location.ts
// Add to Location class

getAvailableQuests(character: Character): Quest[] {
  const quests: Quest[] = [];
  
  // Get quests from NPCs at this location
  for (const npc of this.npcs) {
    if (npc instanceof QuestGiver) {
      const available = npc.getAvailableQuests(character);
      quests.push(...available);
    }
  }
  
  // Get location-specific quests (discover, explore, etc.)
  const locationQuests = this.getLocationQuests(character);
  quests.push(...locationQuests);
  
  return quests;
}

processQuestGiverEvent(
  party: Party,
  character: Character,
  questGiver: QuestGiver
): NewsDistribution {
  // Trigger QuestGiverEvent
  const availableQuests = questGiver.getAvailableQuests(character);
  
  // Generate news about available quests
  return this.createQuestAvailableNews(character, availableQuests);
}
```

### 6.2 Battle System Integration

```typescript
// Server/src/Entity/Battle/Battle.ts
// After battle completion

if (battleResult.winner === partyA) {
  // Update quest progress for party A
  questProgressTracker.onBattleComplete(
    partyA.leader,
    battleResult,
    partyB.getCharacters()
  );
}
```

### 6.3 Action System Integration

```typescript
// Server/src/Entity/Location/Events/handlers/stroll.ts
// When character strolls

if (character.quests.active.size > 0) {
  // Check for investigate objectives
  questProgressTracker.onActionComplete(
    character,
    "stroll",
    location
  );
}
```

### 6.4 News System Integration

Quest events generate news:

```typescript
// Quest available news
{
  scope: "private",
  content: {
    en: "A quest is available from ${npcName}",
    th: "มีเควสต์จาก ${npcName}"
  },
  context: { characterId, questId, locationId }
}

// Quest completed news
{
  scope: "party",
  content: {
    en: "${characterName} completed ${questName}",
    th: "${characterName} เสร็จสิ้น ${questName}"
  },
  context: { characterId, questId, partyId }
}
```

---

## 7. Quest Flow Examples

### 7.1 Simple Kill Quest

1. **Player arrives at location** → `WaywardInn`
2. **NPC offers quest** → `QuestGiverEvent` triggered
3. **Player accepts quest** → Quest added to `character.quests.active`
4. **Player travels to quest location** → `BanditsRavine`
5. **Player encounters enemies** → Battle occurs
6. **Battle completes** → `QuestProgressTracker.onBattleComplete()` checks objectives
7. **Kill objective updated** → Progress: 3/5 goblins killed
8. **More battles** → Progress: 5/5 goblins killed
9. **Quest completion check** → All objectives complete
10. **Player returns to quest giver** → `QuestCompleteEvent` triggered
11. **Rewards applied** → Gold, experience, items added
12. **Quest marked complete** → Moved to `character.quests.completed`

### 7.2 Collection & Delivery Quest

1. **Quest accepted** → "Collect 10 Iron Ore and deliver to Blacksmith"
2. **Player mines** → `onItemAcquired()` updates collect objective
3. **Progress: 10/10 Iron Ore** → Collect objective complete
4. **Player travels to destination** → `IronvaleTown`
5. **Player arrives** → `onLocationArrival()` checks deliver objective
6. **Delivery confirmed** → Deliver objective complete
7. **Quest completion** → Rewards applied

### 7.3 Quest Chain

1. **Quest 1: "Investigate Bandit Activity"** → Complete
2. **Quest 2: "Defeat Bandit Leader"** → Automatically available
3. **Quest 2 completed** → Quest 3 available
4. **Chain continues** → Until final quest

---

## 8. Implementation Phases

### Phase 1: Core Quest System
- [ ] Quest entity class
- [ ] Quest types and objectives
- [ ] Quest status tracking
- [ ] Database schema
- [ ] Basic quest repository

### Phase 2: Quest Givers
- [ ] NPC QuestGiver class
- [ ] Quest pool system
- [ ] Quest availability logic
- [ ] Location integration

### Phase 3: Progress Tracking
- [ ] QuestProgressTracker class
- [ ] Battle system hooks
- [ ] Item acquisition hooks
- [ ] Location arrival hooks
- [ ] Crafting hooks

### Phase 4: Completion & Rewards
- [ ] QuestCompletion class
- [ ] Reward application
- [ ] Quest chain system
- [ ] World event triggers

### Phase 5: Quest Content
- [ ] Quest definitions (static quests)
- [ ] Quest templates (dynamic generation)
- [ ] Quest chains
- [ ] Storyline quests

### Phase 6: UI & API
- [ ] Quest API endpoints
- [ ] Quest list/status endpoints
- [ ] Quest accept/complete endpoints
- [ ] Client integration

---

## 9. Design Considerations

### 9.1 Quest Scaling
- Quests should scale with character/party level
- Dynamic quest generation based on player progression
- Tier system ensures appropriate difficulty

### 9.2 Quest Availability
- Quests should feel natural, not overwhelming
- Limit active quests per character (e.g., 5-10)
- Cooldowns for repeatable quests
- Prerequisites prevent quest spam

### 9.3 Quest Variety
- Mix of quest types keeps gameplay fresh
- Short quests (1-2 phases) and long quests (days/weeks)
- Quest chains provide narrative progression
- World event integration makes quests feel impactful

### 9.4 Performance
- Quest progress checks should be efficient
- Batch progress updates when possible
- Cache quest availability calculations
- Database indexes on characterId, questId, status

### 9.5 Player Agency
- Players can abandon quests (with consequences)
- Quest time limits create urgency (optional)
- Multiple quest paths for same objective
- Player choices affect quest outcomes

---

## 10. Future Enhancements

### 10.1 Dynamic Quest Generation
- Procedurally generated quests based on world state
- Event-driven quests (disasters create relief quests)
- Reputation-based quest availability

### 10.2 Quest Sharing
- Party members can share quest progress
- Cooperative objectives
- Group rewards

### 10.3 Quest Modifiers
- Difficulty modifiers (harder = better rewards)
- Time bonuses (complete faster = bonus)
- Perfect completion bonuses

### 10.4 Quest Journal
- Detailed quest log
- Quest history
- Achievement tracking

---

## Conclusion

This Quest System integrates seamlessly with the existing game architecture:
- **Location-based**: Quests tied to locations and NPCs
- **Time-driven**: Quest progress tracked through game phases
- **Event-driven**: Quest events trigger news and world changes
- **Action-integrated**: Quest progress through normal gameplay
- **Scalable**: Supports static and dynamic quest generation

The system provides structure and goals for players while maintaining the open-world, time-based gameplay loop.

