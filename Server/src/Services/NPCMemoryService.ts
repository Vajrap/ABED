/**
 * NPC Memory Service
 * 
 * Handles lazy loading of NPC memory data (prompts and known news).
 * Only loads when needed (e.g., when player chats with NPC) to save memory.
 * 
 * Why lazy loading?
 * - Character objects are already large (stats, skills, inventory, etc.)
 * - Prompts can be 2-5KB each
 * - With 200 NPCs, that's 400KB-1MB just for prompts
 * - Most prompts won't be accessed immediately
 * - News arrays can also be large
 */

import { db } from "../Database/connection";
import { npcMemory, newsArchive } from "../Database/Schema";
import { eq, inArray } from "drizzle-orm";
import Report from "../Utils/Reporter";

export interface NPCMemoryData {
  npcId: string;
  personalPrompt: string | null;
  knownNews: string[]; // Array of news archive UUIDs
  newsDetails?: Array<{
    id: string;
    // Add other news fields as needed for LLM context
    tokens?: any;
    context?: any;
    significance?: string;
    propagation?: string;
  }>;
}

/**
 * Cache for loaded NPC memory (to avoid repeated queries during same request)
 * This is a simple in-memory cache that could be replaced with Redis later
 */
const memoryCache = new Map<string, NPCMemoryData>();

/**
 * Get NPC memory (prompt and known news)
 * Loads from database if not cached
 * 
 * @param npcId - The NPC's character ID
 * @param includeNewsDetails - If true, also loads full news details from news_archive
 * @returns NPC memory data or null if NPC has no memory record
 */
export async function getNPCMemory(
  npcId: string,
  includeNewsDetails: boolean = false
): Promise<NPCMemoryData | null> {
  // Check cache first
  const cacheKey = `${npcId}_${includeNewsDetails}`;
  if (memoryCache.has(cacheKey)) {
    return memoryCache.get(cacheKey)!;
  }

  try {
    // Load memory record from database
    const [memory] = await db
      .select()
      .from(npcMemory)
      .where(eq(npcMemory.npcId, npcId))
      .limit(1);

    if (!memory) {
      Report.debug(`No memory record found for NPC: ${npcId}`);
      return null;
    }

    const result: NPCMemoryData = {
      npcId: memory.npcId,
      personalPrompt: memory.personalPrompt,
      knownNews: (memory.knownNews as string[]) || [],
    };

    // Optionally load full news details for LLM context
    if (includeNewsDetails && result.knownNews.length > 0) {
      try {
        const newsRecords = await db
          .select({
            id: newsArchive.id,
            tokens: newsArchive.tokens,
            context: newsArchive.context,
            significance: newsArchive.significance,
            propagation: newsArchive.propagation,
          })
          .from(newsArchive)
          .where(inArray(newsArchive.id, result.knownNews));

        result.newsDetails = newsRecords.map((news) => ({
          id: news.id,
          tokens: news.tokens,
          context: news.context,
          significance: news.significance,
          propagation: news.propagation,
        }));
      } catch (error) {
        Report.warn(`Failed to load news details for NPC ${npcId}`, {
          error: error instanceof Error ? error.message : String(error),
        });
        // Continue without news details
      }
    }

    // Cache the result (could implement TTL or size limit later)
    memoryCache.set(cacheKey, result);

    return result;
  } catch (error) {
    Report.error(`Error loading NPC memory for ${npcId}`, {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    });
    return null;
  }
}

/**
 * Update NPC's personal prompt
 * Useful for dynamic prompt updates during gameplay
 * 
 * @param npcId - The NPC's character ID
 * @param newPrompt - The updated prompt text
 */
export async function updateNPCPrompt(
  npcId: string,
  newPrompt: string
): Promise<boolean> {
  try {
    const result = await db
      .update(npcMemory)
      .set({
        personalPrompt: newPrompt,
        updatedAt: new Date(),
      })
      .where(eq(npcMemory.npcId, npcId));

    // Clear cache for this NPC
    const keysToDelete = Array.from(memoryCache.keys()).filter((key) =>
      key.startsWith(npcId)
    );
    keysToDelete.forEach((key) => memoryCache.delete(key));

    Report.info(`Updated prompt for NPC: ${npcId}`);
    return true;
  } catch (error) {
    Report.error(`Error updating NPC prompt for ${npcId}`, {
      error: error instanceof Error ? error.message : String(error),
    });
    return false;
  }
}

/**
 * Add news to NPC's known news list
 * Called when news spreads to NPC's location or they learn about it
 * 
 * @param npcId - The NPC's character ID
 * @param newsId - The news archive UUID to add
 */
export async function addNewsToNPC(
  npcId: string,
  newsId: string
): Promise<boolean> {
  try {
    // Get current memory
    const [memory] = await db
      .select()
      .from(npcMemory)
      .where(eq(npcMemory.npcId, npcId))
      .limit(1);

    if (!memory) {
      Report.warn(`No memory record found for NPC: ${npcId}, cannot add news`);
      return false;
    }

    const currentNews = (memory.knownNews as string[]) || [];
    
    // Avoid duplicates
    if (currentNews.includes(newsId)) {
      Report.debug(`NPC ${npcId} already knows about news ${newsId}`);
      return true; // Already has it, consider success
    }

    // Add news to array
    const updatedNews = [...currentNews, newsId];

    await db
      .update(npcMemory)
      .set({
        knownNews: updatedNews,
        updatedAt: new Date(),
      })
      .where(eq(npcMemory.npcId, npcId));

    // Clear cache
    const keysToDelete = Array.from(memoryCache.keys()).filter((key) =>
      key.startsWith(npcId)
    );
    keysToDelete.forEach((key) => memoryCache.delete(key));

    Report.info(`Added news ${newsId} to NPC ${npcId}'s known news`);
    return true;
  } catch (error) {
    Report.error(`Error adding news to NPC ${npcId}`, {
      error: error instanceof Error ? error.message : String(error),
    });
    return false;
  }
}

/**
 * Remove news from NPC's known news list
 * Useful for news expiration or forgetting mechanics
 * 
 * @param npcId - The NPC's character ID
 * @param newsId - The news archive UUID to remove
 */
export async function removeNewsFromNPC(
  npcId: string,
  newsId: string
): Promise<boolean> {
  try {
    const [memory] = await db
      .select()
      .from(npcMemory)
      .where(eq(npcMemory.npcId, npcId))
      .limit(1);

    if (!memory) {
      return false;
    }

    const currentNews = (memory.knownNews as string[]) || [];
    const updatedNews = currentNews.filter((id) => id !== newsId);

    await db
      .update(npcMemory)
      .set({
        knownNews: updatedNews,
        updatedAt: new Date(),
      })
      .where(eq(npcMemory.npcId, npcId));

    // Clear cache
    const keysToDelete = Array.from(memoryCache.keys()).filter((key) =>
      key.startsWith(npcId)
    );
    keysToDelete.forEach((key) => memoryCache.delete(key));

    return true;
  } catch (error) {
    Report.error(`Error removing news from NPC ${npcId}`, {
      error: error instanceof Error ? error.message : String(error),
    });
    return false;
  }
}

/**
 * Clear the memory cache (useful for testing or manual refresh)
 */
export function clearMemoryCache(): void {
  memoryCache.clear();
  Report.debug("NPC memory cache cleared");
}

