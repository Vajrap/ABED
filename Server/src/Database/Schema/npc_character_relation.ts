import { pgTable, uuid, integer, varchar, text, jsonb, timestamp, index, unique } from "drizzle-orm/pg-core";
import { characters } from "./character";

/**
 * NPC-Character Relation Table
 * 
 * Tracks NPC's view of relationship with each character.
 * Separate from Character.relations (which is character's view).
 * Used for AI context in NPC conversations.
 */
export const npcCharacterRelations = pgTable("npc_character_relations", {
  id: uuid("id").primaryKey().defaultRandom(),
  npcId: uuid("npc_id").references(() => characters.id, { onDelete: "cascade" }).notNull(),
  characterId: uuid("character_id").references(() => characters.id, { onDelete: "cascade" }).notNull(),
  
  // Relationship data (NPC's view of the relationship)
  affection: integer("affection").default(0).notNull(), // -100 to 100
  closeness: integer("closeness").default(0).notNull(), // 0 to 100
  relationTitle: varchar("relation_title", { length: 50 }), // "friend", "lover", "enemy", etc.
  
  // Conversation summary/context (for AI)
  lastConversationSummary: text("last_conversation_summary"), // Summary of recent conversations
  importantEvents: jsonb("important_events").default([]).notNull(), // Array of significant events/interactions
  conversationCount: integer("conversation_count").default(0).notNull(), // Total number of conversations
  lastSummarizedExchange: integer("last_summarized_exchange").default(0).notNull(), // Exchange count when last summarized (for tracking)
  
  // Timestamps
  firstMetAt: timestamp("first_met_at").defaultNow().notNull(),
  lastInteractedAt: timestamp("last_interacted_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => ({
  // Unique constraint: one relation record per NPC-Character pair
  uniqueRelation: unique("unique_npc_character_relation").on(table.npcId, table.characterId),
  npcIdIdx: index("npc_relation_npc_id_idx").on(table.npcId),
  characterIdIdx: index("npc_relation_character_id_idx").on(table.characterId),
}));

export type NPCCharacterRelation = typeof npcCharacterRelations.$inferSelect;
export type InsertNPCCharacterRelation = typeof npcCharacterRelations.$inferInsert;

