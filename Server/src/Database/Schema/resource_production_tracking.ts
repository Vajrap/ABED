import { pgTable, uuid, jsonb, integer, timestamp, index } from "drizzle-orm/pg-core";

/**
 * Resource production tracking for yearly price calculations
 */
export const resourceProductionTracking = pgTable("resource_production_tracking", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  
  // Current year being tracked
  currentYear: integer("current_year").notNull(),
  
  // Yearly production at different scopes
  yearlyProduction: jsonb("yearly_production").notNull(), // YearlyProduction
  
  // Expected production baselines
  baselines: jsonb("baselines").notNull(), // ProductionBaselines
  
  // When tracking was last reset (start of new year)
  lastReset: timestamp("last_reset").notNull(),
  
  // Audit fields
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => ({
  yearIdx: index("resource_year_idx").on(table.currentYear),
}));

export type ResourceProductionTrackingDB = typeof resourceProductionTracking.$inferSelect;
export type InsertResourceProductionTracking = typeof resourceProductionTracking.$inferInsert;

