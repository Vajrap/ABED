import { pgTable, varchar, timestamp, uuid, integer, jsonb, index } from "drizzle-orm/pg-core";

export const battleReports = pgTable("battle_reports", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  
  // Battle context
  battleType: varchar("battle_type", { length: 50 }).notNull(),
  location: varchar("location", { length: 100 }).notNull(), // LocationsEnum
  gameTime: jsonb("game_time").notNull(), // GameTimeInterface
  
  // Party snapshots
  partyASnapshot: jsonb("party_a_snapshot").notNull(), // PartySnapshot
  partyBSnapshot: jsonb("party_b_snapshot").notNull(), // PartySnapshot
  winnerPartyId: varchar("winner_party_id", { length: 255 }), // Empty string if draw
  
  // Battle results
  outcome: jsonb("outcome").notNull(), // L10N
  rewards: jsonb("rewards").default({}).notNull(), // Record<string, BattleRewards>
  turnResults: jsonb("turn_results").default([]).notNull(), // TurnResult[]
  duration: integer("duration").default(0).notNull(),
  
  // Audit fields
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => ({
  locationIdx: index("battle_location_idx").on(table.location),
  gameTimeIdx: index("battle_game_time_idx").on(table.gameTime),
  createdAtIdx: index("battle_created_at_idx").on(table.createdAt),
}));

export type BattleReport = typeof battleReports.$inferSelect;
export type InsertBattleReport = typeof battleReports.$inferInsert;

