/**
 * RAG Service (Retrieval Augmented Generation)
 * 
 * Stores and retrieves game lore content using vector embeddings.
 * Uses pgvector for similarity search.
 */

import { sql } from "drizzle-orm";
import { db } from "../Database/connection";
import { loreEmbeddings } from "../Database/Schema";
import { generateEmbedding } from "./EmbeddingService";
import Report from "../Utils/Reporter";

export interface LoreResult {
  id: string;
  contentType: string;
  contentId: string;
  contentText: string;
  similarity: number;
  metadata: Record<string, any>;
}

/**
 * Store lore content with embedding
 */
export async function storeLoreContent(
  contentType: string,
  contentId: string,
  text: string,
  metadata: Record<string, any> = {}
): Promise<void> {
  try {
    // Check if already exists
    const [existing] = await db
      .select()
      .from(loreEmbeddings)
      .where(
        sql`${loreEmbeddings.contentType} = ${contentType} AND ${loreEmbeddings.contentId} = ${contentId}`
      )
      .limit(1);

    if (existing) {
      // Update existing entry
      const embedding = await generateEmbedding(text);
      
      const embeddingArray = `[${embedding.join(",")}]`;
      
      // Use raw SQL for vector type update
      await db.execute(sql`
        UPDATE ${loreEmbeddings}
        SET content_text = ${text},
            embedding = ${sql.raw(`'${embeddingArray}'::vector`)},
            metadata = ${JSON.stringify(metadata)}::jsonb,
            created_at = NOW()
        WHERE id = ${existing.id}
      `);

      Report.debug("Updated lore embedding", { contentType, contentId });
      return;
    }

    // Create new entry
    const embedding = await generateEmbedding(text);
    const embeddingArray = `[${embedding.join(",")}]`;
    
    // Use raw SQL for vector type insertion
    await db.execute(sql`
      INSERT INTO ${loreEmbeddings} (content_type, content_id, content_text, embedding, metadata)
      VALUES (${contentType}, ${contentId}, ${text}, ${sql.raw(`'${embeddingArray}'::vector`)}, ${JSON.stringify(metadata)}::jsonb)
    `);

    Report.debug("Stored lore embedding", { contentType, contentId });
  } catch (error) {
    Report.error("Error storing lore content", {
      error: error instanceof Error ? error.message : String(error),
      contentType,
      contentId,
    });
    throw error;
  }
}

/**
 * Search for similar lore content using vector similarity
 * @param query - Search query text
 * @param limit - Maximum number of results (default: 5)
 * @param contentType - Optional filter by content type
 * @returns Array of similar lore results with similarity scores
 */
export async function searchSimilar(
  query: string,
  limit: number = 5,
  contentType?: string
): Promise<LoreResult[]> {
  try {
    // Generate embedding for query
    const queryEmbedding = await generateEmbedding(query);
    
    // Format embedding as PostgreSQL vector string: '[0.1,0.2,0.3,...]'
    const embeddingArray = `[${queryEmbedding.join(",")}]`;

    // Build query with optional content type filter
    // Using <=> operator for cosine distance (lower is more similar)
    // Converting to similarity score: 1 - distance
    let searchQuery;
    if (contentType) {
      searchQuery = sql`
        SELECT 
          id,
          content_type,
          content_id,
          content_text,
          metadata,
          1 - (embedding <=> ${sql.raw(`'${embeddingArray}'::vector`)}) as similarity
        FROM ${loreEmbeddings}
        WHERE content_type = ${contentType}
        ORDER BY embedding <=> ${sql.raw(`'${embeddingArray}'::vector`)}
        LIMIT ${limit}
      `;
    } else {
      searchQuery = sql`
        SELECT 
          id,
          content_type,
          content_id,
          content_text,
          metadata,
          1 - (embedding <=> ${sql.raw(`'${embeddingArray}'::vector`)}) as similarity
        FROM ${loreEmbeddings}
        ORDER BY embedding <=> ${sql.raw(`'${embeddingArray}'::vector`)}
        LIMIT ${limit}
      `;
    }

    const results = await db.execute(searchQuery);

    return results.rows.map((row: any) => ({
      id: row.id,
      contentType: row.content_type,
      contentId: row.content_id,
      contentText: row.content_text,
      similarity: parseFloat(row.similarity) || 0,
      metadata: row.metadata || {},
    }));
  } catch (error) {
    Report.error("Error searching similar lore", {
      error: error instanceof Error ? error.message : String(error),
      query,
      limit,
      contentType,
    });
    return [];
  }
}

/**
 * Get specific lore description by type and ID
 */
export async function getLoreDescription(
  contentType: string,
  contentId: string
): Promise<string | null> {
  try {
    const [result] = await db
      .select()
      .from(loreEmbeddings)
      .where(
        sql`${loreEmbeddings.contentType} = ${contentType} AND ${loreEmbeddings.contentId} = ${contentId}`
      )
      .limit(1);

    return result?.contentText as string | null;
  } catch (error) {
    Report.error("Error getting lore description", {
      error: error instanceof Error ? error.message : String(error),
      contentType,
      contentId,
    });
    return null;
  }
}

/**
 * Create vector index for faster similarity search
 * Should be called after embeddings are inserted
 */
export async function createVectorIndex(): Promise<void> {
  try {
    // Check if index already exists
    const indexExists = await db.execute(sql`
      SELECT 1 FROM pg_indexes 
      WHERE indexname = 'lore_embeddings_vector_idx'
    `);

    if (indexExists.rows.length > 0) {
      Report.info("Vector index already exists");
      return;
    }

    // Create ivfflat index for cosine similarity
    // Note: Requires at least some data in the table
    await db.execute(sql`
      CREATE INDEX lore_embeddings_vector_idx 
      ON ${loreEmbeddings} 
      USING ivfflat (embedding vector_cosine_ops) 
      WITH (lists = 100)
    `);

    Report.info("Created vector index for lore embeddings");
  } catch (error) {
    Report.error("Error creating vector index", {
      error: error instanceof Error ? error.message : String(error),
    });
    // Don't throw - index creation is optional for functionality
  }
}

