import { pgTable, varchar, timestamp, uuid, integer, jsonb, text, boolean } from "drizzle-orm/pg-core";
import { users } from "./user";

export const characters = pgTable("characters", {
  // Primary fields
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }), // Nullable for NPCs
  partyID: uuid("party_id"),
  location: varchar("location", { length: 100 }), // LocationsEnum - denormalized for quick access
  
  // Basic character info (matching Character entity exactly)
  name: varchar("name", { length: 255 }).notNull(),
  gender: varchar("gender", { length: 10 }).notNull(), // MALE, FEMALE, NONE
  race: varchar("race", { length: 50 }).notNull(),
  type: varchar("type", { length: 50 }).default("humanoid").notNull(),
  level: integer("level").default(1).notNull(),
  portrait: jsonb("portrait"), // PortraitData object: { base, jaw, eyes, face, beard?, hair_top, hair_bot }
  background: varchar("background", { length: 100 }),
  // Note: characterPrompt moved to npc_memory table for better organization and lazy loading
  // Kept here temporarily for migration compatibility, but should use npc_memory table instead
  
  // Character systems (matching Character entity field names)
  alignment: jsonb("alignment").default({}).notNull(),
  artisans: jsonb("artisans").default({}).notNull(),
  attribute: jsonb("attribute").default({}).notNull(),
  battleStats: jsonb("battle_stats").default({}).notNull(),
  elements: jsonb("elements").default({}).notNull(),
  proficiencies: jsonb("proficiencies").default({}).notNull(),
  saveRolls: jsonb("save_rolls").default({}).notNull(),
  needs: jsonb("needs").default({}).notNull(),
  vitals: jsonb("vitals").notNull(),
  fame: jsonb("fame").default({}).notNull(),
  behavior: jsonb("behavior").default({}).notNull(),
  title: jsonb("title").default({}).notNull(),
  possibleEpithets: jsonb("possible_epithets").default([]).notNull(),
  possibleRoles: jsonb("possible_roles").default([]).notNull(),
  actionSequence: jsonb("action_sequence").default({}).notNull(),
  informations: jsonb("informations").default({}).notNull(),
  
  // Skills and abilities
  skills: jsonb("skills").default({}).notNull(),
  activeSkills: jsonb("active_skills").default([]).notNull(),
  conditionalSkills: jsonb("conditional_skills").default([]).notNull(),
  conditionalSkillsCondition: jsonb("conditional_skills_condition").default({}).notNull(),
  skillLearningProgress: jsonb("skill_learning_progress").default({}).notNull(),
  breathingSkills: jsonb("breathing_skills").default({}).notNull(),
  activeBreathingSkill: varchar("active_breathing_skill", { length: 50 }),
  breathingSkillsLearningProgress: jsonb("breathing_skills_learning_progress").default({}).notNull(),
  planarAptitude: jsonb("planar_aptitude").default({}).notNull(),
  
  // Social and traits
  relations: jsonb("relations").default({}).notNull(),
  traits: jsonb("traits").default([]).notNull(),
  
  // Inventory and equipment
  inventorySize: jsonb("inventory_size").default({ base: 20, bonus: 0 }).notNull(),
  inventory: jsonb("inventory").default({}).notNull(),
  equipments: jsonb("equipments").default({}).notNull(),
  
  // Character state
  statTracker: integer("stat_tracker").default(0).notNull(),
  abGuage: integer("ab_guage").default(0).notNull(),
  
  // Audit fields
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  createdBy: varchar("created_by", { length: 255 }).notNull(),
  updatedBy: varchar("updated_by", { length: 255 }).notNull(),
});

export type Character = typeof characters.$inferSelect;
export type InsertCharacter = typeof characters.$inferInsert;
