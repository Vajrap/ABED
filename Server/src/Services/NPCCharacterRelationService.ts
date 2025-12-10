/**
 * NPC-Character Relation Service
 * 
 * Manages NPC's view of relationship with characters.
 * Used for AI context in NPC conversations.
 */

import { db } from "../Database/connection";
import { npcCharacterRelations } from "../Database/Schema";
import { eq, and } from "drizzle-orm";
import { summarizeRelationship } from "./LLMSummarizationService";
import { getChatHistoryForAI } from "./ChatHistoryService";
import Report from "../Utils/Reporter";

export interface NPCImpression {
  affection: number;
  closeness: number;
  relationTitle: string | null;
  lastConversationSummary: string | null;
  importantEvents: any[];
  conversationCount: number;
  lastSummarizedExchange: number;
}

/**
 * Get NPC's impression of a character
 * Returns null if NPC doesn't recognize the character yet
 */
export async function getNPCImpression(
  npcId: string,
  characterId: string
): Promise<NPCImpression | null> {
  try {
    const [relation] = await db
      .select()
      .from(npcCharacterRelations)
      .where(
        and(
          eq(npcCharacterRelations.npcId, npcId),
          eq(npcCharacterRelations.characterId, characterId)
        )
      )
      .limit(1);

    if (!relation) {
      return null;
    }

      return {
        affection: relation.affection,
        closeness: relation.closeness,
        relationTitle: relation.relationTitle,
        lastConversationSummary: relation.lastConversationSummary,
        importantEvents: (relation.importantEvents as any[]) || [],
        conversationCount: relation.conversationCount,
        lastSummarizedExchange: relation.lastSummarizedExchange || 0,
      };
  } catch (error) {
    Report.error("Error getting NPC impression", {
      error: error instanceof Error ? error.message : String(error),
      npcId,
      characterId,
    });
    return null;
  }
}

/**
 * Get or create NPC-Character relation
 * Creates relation if it doesn't exist (first meeting)
 */
export async function getOrCreateNPCRelation(
  npcId: string,
  characterId: string
): Promise<NPCImpression> {
  try {
    const existing = await getNPCImpression(npcId, characterId);
    if (existing) {
      return existing;
    }

    // Create new relation (first meeting)
    const [newRelation] = await db
      .insert(npcCharacterRelations)
      .values({
        npcId,
        characterId,
        affection: 0,
        closeness: 0,
        relationTitle: "stranger",
        conversationCount: 0,
      })
      .returning();

    Report.debug("Created new NPC-Character relation", {
      npcId,
      characterId,
    });

          return {
            affection: newRelation?.affection || 0,
            closeness: newRelation?.closeness || 0,
            relationTitle: newRelation?.relationTitle || "stranger",
            lastConversationSummary: newRelation?.lastConversationSummary || null,
            importantEvents: (newRelation?.importantEvents as any[]) || [],
            conversationCount: newRelation?.conversationCount || 0,
            lastSummarizedExchange: newRelation?.lastSummarizedExchange || 0,
          };
  } catch (error) {
    Report.error("Error getting or creating NPC relation", {
      error: error instanceof Error ? error.message : String(error),
      npcId,
      characterId,
    });
    // Return default impression on error
          return {
            affection: 0,
            closeness: 0,
            relationTitle: "stranger",
            lastConversationSummary: null,
            importantEvents: [],
            conversationCount: 0,
            lastSummarizedExchange: 0,
          };
  }
}

/**
 * Summarize relationship using LLM
 * Generates a summary of how the NPC views the character
 */
export async function summarizeRelationshipImpression(
  npcId: string,
  characterId: string
): Promise<string | null> {
  try {
    const relation = await getNPCImpression(npcId, characterId);
    if (!relation) {
      return null;
    }

    // Get recent conversation summary
    const conversationSummary = relation.lastConversationSummary;
    const importantEvents = relation.importantEvents || [];

    // Get recent chat history for context
    const recentHistory = await getChatHistoryForAI(npcId, characterId, 5);

    // Generate relationship summary using LLM
    const summary = await summarizeRelationship(
      npcId,
      characterId,
      relation,
      conversationSummary,
      importantEvents
    );

    if (summary) {
      // Update the relation with the new summary
      await updateNPCRelation(npcId, characterId, {
        lastConversationSummary: summary,
      });
    }

    return summary || null;
  } catch (error) {
    Report.error("Error summarizing relationship impression", {
      error: error instanceof Error ? error.message : String(error),
      npcId,
      characterId,
    });
    return null;
  }
}

/**
 * Update NPC-Character relation after interaction
 */
export async function updateNPCRelation(
  npcId: string,
  characterId: string,
  updates: {
    affection?: number;
    closeness?: number;
    relationTitle?: string | null;
    lastConversationSummary?: string | null;
    addImportantEvent?: any;
    lastSummarizedExchange?: number;
  }
): Promise<void> {
  try {
    const existing = await getNPCImpression(npcId, characterId);
    if (!existing) {
      // Create relation first
      await getOrCreateNPCRelation(npcId, characterId);
    }

    const updateData: any = {
      updatedAt: new Date(),
      lastInteractedAt: new Date(),
    };

    if (updates.affection !== undefined) {
      updateData.affection = Math.max(-100, Math.min(100, updates.affection));
    }
    if (updates.closeness !== undefined) {
      updateData.closeness = Math.max(0, Math.min(100, updates.closeness));
    }
    if (updates.relationTitle !== undefined) {
      updateData.relationTitle = updates.relationTitle;
    }
    if (updates.lastConversationSummary !== undefined) {
      updateData.lastConversationSummary = updates.lastConversationSummary;
    }
    if (updates.lastSummarizedExchange !== undefined) {
      updateData.lastSummarizedExchange = updates.lastSummarizedExchange;
    }
    if (updates.addImportantEvent) {
      // Get current events and add new one
      const [current] = await db
        .select({ importantEvents: npcCharacterRelations.importantEvents })
        .from(npcCharacterRelations)
        .where(
          and(
            eq(npcCharacterRelations.npcId, npcId),
            eq(npcCharacterRelations.characterId, characterId)
          )
        )
        .limit(1);
      
      const events = (current?.importantEvents as any[]) || [];
      updateData.importantEvents = [...events, updates.addImportantEvent];
    }

    // Get current conversation count and increment
    const [current] = await db
      .select({ conversationCount: npcCharacterRelations.conversationCount })
      .from(npcCharacterRelations)
      .where(
        and(
          eq(npcCharacterRelations.npcId, npcId),
          eq(npcCharacterRelations.characterId, characterId)
        )
      )
      .limit(1);

    await db
      .update(npcCharacterRelations)
      .set({
        ...updateData,
        conversationCount: (current?.conversationCount || 0) + 1,
      })
      .where(
        and(
          eq(npcCharacterRelations.npcId, npcId),
          eq(npcCharacterRelations.characterId, characterId)
        )
      );

    Report.debug("Updated NPC-Character relation", {
      npcId,
      characterId,
      updates,
    });
  } catch (error) {
    Report.error("Error updating NPC relation", {
      error: error instanceof Error ? error.message : String(error),
      npcId,
      characterId,
    });
  }
}

