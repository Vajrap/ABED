import { pgTable, uuid, timestamp, text, boolean, varchar, index, unique, primaryKey } from "drizzle-orm/pg-core";
import { characters } from "./character";

/**
 * ChatRoom Table
 * 
 * Stores private 1-on-1 chat rooms between two characters.
 * Unique constraint on (char1, char2) allows either order.
 */
export const chatRooms = pgTable("chat_rooms", {
  id: uuid("id").primaryKey().defaultRandom(),
  char1: uuid("char_1").references(() => characters.id, { onDelete: "cascade" }).notNull(),
  char2: uuid("char_2").references(() => characters.id, { onDelete: "cascade" }).notNull(),
  isNPCChat: boolean("is_npc_chat").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => ({
  // Unique constraint on (char1, char2) - allows either order
  uniqueChatRoom: unique("unique_chat_room").on(table.char1, table.char2),
  char1Idx: index("chat_room_char1_idx").on(table.char1),
  char2Idx: index("chat_room_char2_idx").on(table.char2),
}));

/**
 * ChatLog Table
 * 
 * Stores private chat messages between two characters.
 * Uses composite primary key: (roomId, sender, timestamp)
 */
export const chatLogs = pgTable("chat_logs", {
  roomId: uuid("room_id").references(() => chatRooms.id, { onDelete: "cascade" }).notNull(),
  sender: uuid("sender").references(() => characters.id, { onDelete: "cascade" }).notNull(),
  receiver: uuid("receiver").references(() => characters.id, { onDelete: "cascade" }).notNull(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  message: text("message").notNull(),
}, (table) => ({
  // Composite primary key: (roomId, sender, timestamp)
  pk: primaryKey({ columns: [table.roomId, table.sender, table.timestamp] }),
  roomIdIdx: index("chat_log_room_id_idx").on(table.roomId),
  timestampIdx: index("chat_log_timestamp_idx").on(table.timestamp),
  senderIdx: index("chat_log_sender_idx").on(table.sender),
}));

/**
 * PublicChatLog Table
 * 
 * Stores public chat messages (global, region, location, party).
 */
export const publicChatLogs = pgTable("public_chat_logs", {
  id: uuid("id").primaryKey().defaultRandom(),
  scope: varchar("scope", { length: 20 }).notNull(), // "global" | "region" | "location" | "party"
  scopeId: varchar("scope_id", { length: 255 }), // region name, location name, party ID, or null for global
  sender: uuid("sender").references(() => characters.id, { onDelete: "cascade" }).notNull(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  message: text("message").notNull(),
}, (table) => ({
  scopeIdx: index("public_chat_scope_idx").on(table.scope, table.scopeId),
  timestampIdx: index("public_chat_timestamp_idx").on(table.timestamp),
  senderIdx: index("public_chat_sender_idx").on(table.sender),
}));

export type ChatRoom = typeof chatRooms.$inferSelect;
export type InsertChatRoom = typeof chatRooms.$inferInsert;
export type ChatLog = typeof chatLogs.$inferSelect;
export type InsertChatLog = typeof chatLogs.$inferInsert;
export type PublicChatLog = typeof publicChatLogs.$inferSelect;
export type InsertPublicChatLog = typeof publicChatLogs.$inferInsert;

