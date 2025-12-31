import { pgTable, timestamp, uuid, integer } from "drizzle-orm/pg-core";
import { characters } from "./character";

export const portraits = pgTable("portraits", {
  // Primary Key is also the Foreign Key to characters
  characterId: uuid("character_id")
    .primaryKey()
    .references(() => characters.id, { onDelete: "cascade" }),

  base: integer("base").notNull(),
  jaw: integer("jaw").notNull(),
  eyes: integer("eyes").notNull(),
  eyesColor: integer("eyes_color").notNull(),
  face: integer("face").notNull(),
  beard: integer("beard"), // Nullable
  hair: integer("hair").notNull(),
  hairColor: integer("hair_color").notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type Portrait = typeof portraits.$inferSelect;
export type InsertPortrait = typeof portraits.$inferInsert;
