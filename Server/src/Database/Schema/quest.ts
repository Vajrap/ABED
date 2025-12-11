import { pgTable, varchar, jsonb, integer, boolean, timestamp, index } from "drizzle-orm/pg-core";

/**
 * Quest Definitions Table
 * Stores predefined quest templates
 */
export const questDefinitions = pgTable("quest_definitions", {
  id: varchar("id", { length: 100 }).primaryKey(),
  
  // Basic Info
  name: jsonb("name").notNull(), // L10N
  description: jsonb("description").notNull(), // L10N
  type: varchar("type", { length: 50 }).notNull(), // QuestType
  tier: varchar("tier", { length: 20 }).notNull(), // TierEnum
  
  // Quest Giver
  giverId: varchar("giver_id", { length: 100 }).notNull(),
  giverLocation: varchar("giver_location", { length: 100 }).notNull(), // LocationsEnum
  
  // Prerequisites (stored as JSONB)
  prerequisites: jsonb("prerequisites"), // QuestPrerequisites
  
  // Objectives (stored as JSONB array)
  objectives: jsonb("objectives").notNull(), // QuestObjective[]
  
  // Rewards (stored as JSONB)
  rewards: jsonb("rewards").notNull(), // QuestReward
  
  // Quest Chain Support
  isChainQuest: boolean("is_chain_quest").default(false).notNull(),
  chainId: varchar("chain_id", { length: 100 }),
  chainOrder: integer("chain_order"),
  unlocksQuests: jsonb("unlocks_quests"), // string[] (quest IDs)
  
  // Quest Availability
  isOneTimeOnly: boolean("is_one_time_only").default(false).notNull(),
  isRepeatable: boolean("is_repeatable").default(false).notNull(),
  cooldownDays: integer("cooldown_days"),
  
  // Time Limits
  timeLimit: jsonb("time_limit"), // QuestTimeLimit
  
  // Metadata
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => ({
  // Indexes for efficient queries
  giverIdIdx: index("quest_definitions_giver_id_idx").on(table.giverId),
  giverLocationIdx: index("quest_definitions_giver_location_idx").on(table.giverLocation),
  chainIdIdx: index("quest_definitions_chain_id_idx").on(table.chainId),
  typeIdx: index("quest_definitions_type_idx").on(table.type),
  tierIdx: index("quest_definitions_tier_idx").on(table.tier),
}));

// Type inference
export type QuestDefinitionDB = typeof questDefinitions.$inferSelect;
export type InsertQuestDefinition = typeof questDefinitions.$inferInsert;

