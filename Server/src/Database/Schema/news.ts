import { pgTable, varchar, timestamp, uuid, integer, jsonb, text, boolean, index } from "drizzle-orm/pg-core";

/**
 * News Archive - Stores all news events
 * 
 * Persists news across server restarts
 * Tracks propagation and character knowledge
 */
export const newsArchive = pgTable("news_archive", {
  // Primary key
  id: uuid("id").primaryKey(),
  
  // Timestamp (game time)
  gameTime: jsonb("game_time").notNull(), // GameTimeInterface
  createdAtRealTime: timestamp("created_at").defaultNow().notNull(),
  
  // Scope (where it starts)
  scopeKind: varchar("scope_kind", { length: 20 }).notNull(),
  scopeData: jsonb("scope_data"), // region/subRegion/location/partyId/characterId
  
  // Content
  tokens: jsonb("tokens").notNull(), // NewsToken[]
  context: jsonb("context").notNull(), // NewsContext
  tags: jsonb("tags"), // NewsTag[]
  
  // Dual-axis system
  significance: varchar("significance", { length: 20 }).notNull(),
  propagation: varchar("propagation", { length: 20 }).notNull(),
  spreadConfig: jsonb("spread_config"), // NewsSpreadConfig (optional)
  
  // Propagation tracking
  currentReach: jsonb("current_reach").default([]).notNull(), // LocationsEnum[]
  expiresAtGameDay: integer("expires_at_game_day").notNull(),
  
  // Legacy
  secretTier: varchar("secret_tier", { length: 20 }),
}, (table) => ({
  // Indexes for efficient queries
  gameTimeIdx: index("news_game_time_idx").on(table.gameTime),
  scopeKindIdx: index("news_scope_kind_idx").on(table.scopeKind),
  significanceIdx: index("news_significance_idx").on(table.significance),
  propagationIdx: index("news_propagation_idx").on(table.propagation),
  expiresIdx: index("news_expires_idx").on(table.expiresAtGameDay),
}));

/**
 * News Spread Queue - Tracks pending news propagation
 * 
 * When news should spread to a new location
 */
export const newsSpreadQueue = pgTable("news_spread_queue", {
  id: uuid("id").primaryKey().defaultRandom(),
  newsId: uuid("news_id").notNull().references(() => newsArchive.id, { onDelete: "cascade" }),
  targetLocation: varchar("target_location", { length: 100 }).notNull(),
  arrivalGameDay: integer("arrival_game_day").notNull(),
  
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => ({
  // Index for efficient daily queries
  arrivalIdx: index("spread_arrival_idx").on(table.arrivalGameDay),
  newsIdx: index("spread_news_idx").on(table.newsId),
}));

/**
 * Character News Knowledge - Tracks which news each character has read
 * 
 * Prevents showing duplicate news
 * Enables news sharing mechanics
 */
export const characterNewsKnowledge = pgTable("character_news_knowledge", {
  id: uuid("id").primaryKey().defaultRandom(),
  characterId: uuid("character_id").notNull(), // References characters.id
  newsId: uuid("news_id").notNull().references(() => newsArchive.id, { onDelete: "cascade" }),
  
  // When character learned about this news
  learnedAtGameDay: integer("learned_at_game_day").notNull(),
  learnedAtRealTime: timestamp("learned_at").defaultNow().notNull(),
  
  // How they learned (direct witness, heard from NPC, read in tavern, etc.)
  source: varchar("source", { length: 50 }).default("witnessed"), // "witnessed", "heard", "shared", "tavern"
  
  // Whether they've read it (vs just heard about it)
  isRead: boolean("is_read").default(false).notNull(),
}, (table) => ({
  // Composite index for "what news does this character know?"
  charNewsIdx: index("char_news_idx").on(table.characterId, table.newsId),
  characterIdx: index("char_knowledge_idx").on(table.characterId),
}));

/**
 * Location News Reach - Tracks which news has reached which locations
 * 
 * Separate table for efficient location-based queries
 */
export const locationNewsReach = pgTable("location_news_reach", {
  id: uuid("id").primaryKey().defaultRandom(),
  locationId: varchar("location_id", { length: 100 }).notNull(),
  newsId: uuid("news_id").notNull().references(() => newsArchive.id, { onDelete: "cascade" }),
  
  // When news reached this location
  reachedAtGameDay: integer("reached_at_game_day").notNull(),
  reachedAtRealTime: timestamp("reached_at").defaultNow().notNull(),
}, (table) => ({
  // Composite index for "what news is at this location?"
  locNewsIdx: index("loc_news_idx").on(table.locationId, table.reachedAtGameDay),
  locationIdx: index("location_reach_idx").on(table.locationId),
  newsIdx: index("news_reach_idx").on(table.newsId),
}));

