import {
  pgTable,
  uuid,
  jsonb,
  integer,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";

/**
 * Global game state (singleton)
 * Stores event cards, global event scale, etc.
 */
export const gameState = pgTable("game_state", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),

  // Global Event Cards
  lastGlobalEventCardCompleted: boolean(
    "last_global_event_card_completed",
  )
    .default(false)
    .notNull(),
  activeGlobalEventCard: jsonb("active_global_event_card"), // GlobalEventCard | undefined
  globalEventCardDeck: jsonb("global_event_card_deck").notNull(), // GlobalEventCard[]
  completedGlobalEventCards: jsonb("completed_global_event_cards")
    .default([])
    .notNull(), // GlobalEventCard[]

  // Region Event Cards
  regionEventCardDeck: jsonb("region_event_card_deck").notNull(), // RegionEventCard[]
  completedRegionEventCards: jsonb("completed_region_event_cards")
    .default([])
    .notNull(), // RegionEventCard[]

  // Global Event Scale (0-250)
  globalEventScale: integer("global_event_scale").default(0).notNull(),

  // Loop progression
  lastProcessedPhase: integer("last_processed_phase").default(0).notNull(),

  // Audit fields
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type GameStateDB = typeof gameState.$inferSelect;
export type InsertGameState = typeof gameState.$inferInsert;

