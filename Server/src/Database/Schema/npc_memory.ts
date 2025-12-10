import { pgTable, text, uuid, jsonb, timestamp, index } from "drizzle-orm/pg-core";
import { characters } from "./character";

/**
 * NPC Memory Table
 * 
 * Stores NPC-specific data:
 * - Personal Prompt: LLM/OpenAI interaction prompt for the NPC
 * - Known News: Array of news IDs that the NPC knows about (from news_archive)
 * 
 * Each NPC has one memory record (one-to-one relationship with characters)
 */
export const npcMemory = pgTable("npc_memory", {
  // Primary key
  id: uuid("id").primaryKey().defaultRandom(),
  
  // NPC reference (unique - one memory record per NPC)
  npcId: uuid("npc_id")
    .notNull()
    .unique()
    .references(() => characters.id, { onDelete: "cascade" }),
  
  // Personal prompt for LLM/OpenAI interactions
  // Describes personality, background, current state, conversation style
  // Can be updated dynamically during gameplay
  personalPrompt: text("personal_prompt"),
  
  // Known News: Array of news archive IDs that this NPC knows about
  // Stored as JSONB array of UUIDs: ["uuid1", "uuid2", ...]
  // These news items inform the NPC's knowledge and conversations
  knownNews: jsonb("known_news").default([]).notNull(), // UUID[]
  
  // Timestamps
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => ({
  // Index for quick lookup by NPC ID
  npcIdx: index("npc_memory_npc_idx").on(table.npcId),
}));

export type NPCMemory = typeof npcMemory.$inferSelect;
export type InsertNPCMemory = typeof npcMemory.$inferInsert;

