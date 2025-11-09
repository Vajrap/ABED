import { pgTable, uuid, jsonb, integer, timestamp, index } from "drizzle-orm/pg-core";

/**
 * Market state - pricing modifiers and transaction history
 */
export const marketState = pgTable("market_state", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  
  // Yearly price modifiers (sticky, recalculated yearly)
  yearlyModifiers: jsonb("yearly_modifiers").notNull(), // Map<ResourceType, number>
  
  // Event-based price modifiers (stacking system)
  // Outer map: tradeable -> Inner map: eventId -> modifier
  eventModifiers: jsonb("event_modifiers").default({}).notNull(), // Map<Tradeable, Map<string, number>>
  
  // Transaction history (by location and tradeable)
  transactionHistory: jsonb("transaction_history").default({}).notNull(), // TransactionHistory
  
  // Current year tracking
  currentYear: integer("current_year").notNull(),
  lastYearlyAdjustment: timestamp("last_yearly_adjustment").notNull(),
  
  // Audit fields
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => ({
  yearIdx: index("market_year_idx").on(table.currentYear),
}));

export type MarketStateDB = typeof marketState.$inferSelect;
export type InsertMarketState = typeof marketState.$inferInsert;

