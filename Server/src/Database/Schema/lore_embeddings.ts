import { pgTable, uuid, varchar, text, jsonb, timestamp, index, customType } from "drizzle-orm/pg-core";

/**
 * Custom vector type for pgvector
 * Note: drizzle-kit doesn't support vector type directly, so we use text and cast in queries
 */
const vector = customType<{ data: number[]; driverData: string }>({
  dataType: () => "vector(384)",
  toDriver: (value: number[]) => `[${value.join(",")}]`,
  fromDriver: (value: string) => {
    // Parse vector string like "[0.1,0.2,0.3]" to number array
    return value.slice(1, -1).split(",").map(Number);
  },
});

/**
 * Lore Embeddings Table
 * 
 * Stores game lore content with vector embeddings for RAG (Retrieval Augmented Generation).
 * Uses pgvector extension for similarity search.
 */
export const loreEmbeddings = pgTable("lore_embeddings", {
  id: uuid("id").primaryKey().defaultRandom(),
  contentType: varchar("content_type", { length: 50 }).notNull(), // 'region', 'location', 'character', 'quest', etc.
  contentId: varchar("content_id", { length: 255 }).notNull(), // ID of the content (region enum, location enum, character ID, etc.)
  contentText: text("content_text").notNull(), // The actual lore text to embed
  embedding: vector("embedding"), // Vector embedding (384 dimensions for all-MiniLM-L6-v2)
  metadata: jsonb("metadata").default({}).notNull(), // Additional metadata (source file, language, etc.)
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => ({
  contentTypeIdx: index("lore_embeddings_content_type_idx").on(table.contentType),
  contentIdIdx: index("lore_embeddings_content_id_idx").on(table.contentId),
  // Vector index will be created via SQL migration
}));

export type LoreEmbedding = typeof loreEmbeddings.$inferSelect;
export type InsertLoreEmbedding = typeof loreEmbeddings.$inferInsert;

