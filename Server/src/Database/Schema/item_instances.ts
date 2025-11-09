import { pgTable, varchar, timestamp, uuid, jsonb, boolean, integer, index } from "drizzle-orm/pg-core";
import { characters } from "./character";

/**
 * Player-crafted item instances
 * Only stores Armor and Weapon items that players have crafted
 * Pre-defined items (from repository) don't need instances
 */
export const itemInstances = pgTable("item_instances", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  
  // Item type and base info
  itemType: varchar("item_type", { length: 20 }).notNull(), // "weapon" | "armor"
  baseItemId: varchar("base_item_id", { length: 100 }).notNull(), // WeaponId or ArmorId
  
  // Crafting info
  crafterId: uuid("crafter_id").references(() => characters.id, { onDelete: "set null" }),
  blueprintId: varchar("blueprint_id", { length: 100 }), // BlueprintId
  craftedAt: timestamp("crafted_at").defaultNow().notNull(),
  
  // For weapons: material selection used in crafting
  // For armor: material selection if applicable
  materialSelection: jsonb("material_selection"), // Partial<{blade, handle, grip, guard, core: ItemId}>
  
  // Item properties (can differ from base item if crafted with different materials)
  // For weapons: weaponData with potentially modified stats
  // For armor: armorData with potentially modified stats
  itemData: jsonb("item_data").notNull(), // WeaponData or ArmorData
  
  // Instance-specific modifiers (if item can be enhanced)
  modifiers: jsonb("modifiers").default({}).notNull(), // EquipmentModifier
  
  // Current owner (if equipped, this is set)
  ownerId: uuid("owner_id").references(() => characters.id, { onDelete: "set null" }),
  isEquipped: boolean("is_equipped").default(false).notNull(),
  equippedSlot: varchar("equipped_slot", { length: 50 }), // CharacterEquipmentSlot or null
  
  // Durability/enhancements (if applicable)
  durability: integer("durability"), // Current durability
  maxDurability: integer("max_durability"), // Max durability
  
  // Audit fields
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => ({
  crafterIdx: index("item_crafter_idx").on(table.crafterId),
  ownerIdx: index("item_owner_idx").on(table.ownerId),
  baseItemIdx: index("item_base_item_idx").on(table.baseItemId),
  itemTypeIdx: index("item_type_idx").on(table.itemType),
}));

export type ItemInstance = typeof itemInstances.$inferSelect;
export type InsertItemInstance = typeof itemInstances.$inferInsert;

