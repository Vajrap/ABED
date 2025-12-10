import { pgTable, text, uuid, integer, timestamp, index } from "drizzle-orm/pg-core";
import { characters } from "./character";

/**
 * NPC Summary Table
 * 
 * Stores LLM-generated summaries of NPC's life experiences, quests, and events.
 * Separate from npc_memory (which stores prompts and news) for better organization.
 * 
 * Each NPC has one summary record that is updated periodically as new events occur.
 */
export const npcSummary = pgTable("npc_summary", {
  id: uuid("id").primaryKey().defaultRandom(),
  npcId: uuid("npc_id")
    .notNull()
    .unique()
    .references(() => characters.id, { onDelete: "cascade" }),
  
  // Life Summary - LLM-generated summary of NPC's experiences
  lifeSummary: text("life_summary"), // What the NPC has been through: quests, events, experiences
  
  // Summary metadata
  lastUpdatedAt: timestamp("last_updated_at").defaultNow().notNull(),
  summaryVersion: integer("summary_version").default(1).notNull(), // Increment when summary is updated
  totalEvents: integer("total_events").default(0).notNull(), // Count of events summarized
  
  // Timestamps
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => ({
  npcIdIdx: index("npc_summary_npc_id_idx").on(table.npcId),
}));

export type NPCSummary = typeof npcSummary.$inferSelect;
export type InsertNPCSummary = typeof npcSummary.$inferInsert;

