import { pgTable, uuid, varchar, jsonb, timestamp, index } from "drizzle-orm/pg-core";

export const shops = pgTable("shops", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  locationId: varchar("location_id", { length: 100 }).notNull(),
  shopType: varchar("shop_type", { length: 50 }).notNull(),
  inventory: jsonb("inventory").default({}).notNull(),
  basePrices: jsonb("base_prices").default({}).notNull(),
  pricingModifiers: jsonb("pricing_modifiers").default({ locationModifier: 0, supplyDemandModifier: 0 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => ({
  locationIdx: index("shops_location_id_idx").on(table.locationId),
  shopTypeIdx: index("shops_shop_type_idx").on(table.shopType),
}));

export type Shop = typeof shops.$inferSelect;
export type InsertShop = typeof shops.$inferInsert;

