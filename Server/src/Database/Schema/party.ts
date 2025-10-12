import { pgTable, varchar, timestamp, uuid, boolean, jsonb } from "drizzle-orm/pg-core";

export const parties = pgTable("parties", {
  // Primary fields
  id: uuid("id").primaryKey().defaultRandom(),
  partyID: varchar("party_id", { length: 255 }).notNull().unique(), // Same as leader's character ID
  
  // Party state
  isTraveling: boolean("is_traveling").default(false).notNull(),
  location: varchar("location", { length: 100 }).notNull(),
  justArrived: boolean("just_arrived").default(false).notNull(),
  
  // Party data (stored as JSONB)
  characters: jsonb("characters").notNull(), // Array of character IDs or "none": ["char-id-1", "none", "none", "none", "none", "none"]
  behavior: jsonb("behavior").notNull(), // PartyBehavior object
  informations: jsonb("informations").default({}).notNull(), // Record<string, number>
  actionSequence: jsonb("action_sequence").notNull(), // PartyActionSequence
  leaderID: varchar("leader_id", { length: 255 }).notNull(), // Character ID of the leader
  
  // Audit fields
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  createdBy: varchar("created_by", { length: 255 }).notNull(),
  updatedBy: varchar("updated_by", { length: 255 }).notNull(),
});

export type PartyDB = typeof parties.$inferSelect;
export type InsertParty = typeof parties.$inferInsert;

