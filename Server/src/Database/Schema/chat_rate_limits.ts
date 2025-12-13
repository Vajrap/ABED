import { pgTable, uuid, integer, timestamp, unique, index } from "drizzle-orm/pg-core";
import { characters } from "./character";

/**
 * Chat Rate Limits Table
 * 
 * Tracks rate limiting for NPC-Player chat conversations.
 * Limits are per player (not per NPC-player pair).
 * Free tier: 10 exchanges per 15 minutes
 * VIP tier: 50 exchanges per 15 minutes
 */
export const chatRateLimits = pgTable("chat_rate_limits", {
  id: uuid("id").primaryKey().defaultRandom(),
  playerId: uuid("player_id").references(() => characters.id, { onDelete: "cascade" }).notNull(),
  exchangeCount: integer("exchange_count").default(0).notNull(),
  lastPhaseIndex: integer("last_phase_index").default(0).notNull(), // Store last game phase index
  windowStart: timestamp("window_start").notNull(), // Kept for compatibility
  lastExchange: timestamp("last_exchange").notNull(),
}, (table) => ({
  uniquePlayer: unique("unique_player_rate_limit").on(table.playerId),
  playerIdIdx: index("chat_rate_limit_player_id_idx").on(table.playerId),
}));

export type ChatRateLimit = typeof chatRateLimits.$inferSelect;
export type InsertChatRateLimit = typeof chatRateLimits.$inferInsert;

