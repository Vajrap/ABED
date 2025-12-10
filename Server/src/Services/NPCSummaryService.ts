/**
 * NPC Summary Service
 * 
 * Manages NPC life summaries stored in the npc_summary table.
 * Handles getting, setting, and updating summaries with LLM summarization.
 */

import { db } from "../Database/connection";
import { npcSummary } from "../Database/Schema";
import { eq } from "drizzle-orm";
import { summarizeNPCLife, type NPCEvent } from "./LLMSummarizationService";
import Report from "../Utils/Reporter";

/**
 * Get NPC life summary
 * Returns null if NPC has no summary yet
 */
export async function getNPCLifeSummary(npcId: string): Promise<string | null> {
  try {
    const [summary] = await db
      .select({ lifeSummary: npcSummary.lifeSummary })
      .from(npcSummary)
      .where(eq(npcSummary.npcId, npcId))
      .limit(1);

    return summary?.lifeSummary || null;
  } catch (error) {
    Report.error("Error getting NPC life summary", {
      error: error instanceof Error ? error.message : String(error),
      npcId,
    });
    return null;
  }
}

/**
 * Get or create NPC summary record
 * Returns the summary record (may be newly created)
 */
export async function getOrCreateNPCSummary(npcId: string) {
  try {
    const [existing] = await db
      .select()
      .from(npcSummary)
      .where(eq(npcSummary.npcId, npcId))
      .limit(1);

    if (existing) {
      return existing;
    }

    // Create new summary record
    const [newSummary] = await db
      .insert(npcSummary)
      .values({
        npcId,
        lifeSummary: null,
        summaryVersion: 1,
        totalEvents: 0,
      })
      .returning();

    Report.debug("Created new NPC summary record", { npcId });
    return newSummary;
  } catch (error) {
    Report.error("Error getting or creating NPC summary", {
      error: error instanceof Error ? error.message : String(error),
      npcId,
    });
    throw error;
  }
}

/**
 * Update NPC life summary with new events
 * Uses LLM to summarize events and update the summary
 * 
 * @param npcId - The NPC's character ID
 * @param newEvents - Array of new events to summarize
 * @param incremental - If true, combines with previous summary. If false, replaces it.
 * @returns The updated summary text
 */
export async function updateNPCLifeSummary(
  npcId: string,
  newEvents: NPCEvent[],
  incremental: boolean = true
): Promise<string> {
  try {
    // Get or create summary record
    const summaryRecord = await getOrCreateNPCSummary(npcId);
    
    // Get previous summary if incremental
    const previousSummary = incremental ? summaryRecord.lifeSummary : null;

    // Summarize using LLM
    const newSummary = await summarizeNPCLife(npcId, newEvents, previousSummary);

    if (!newSummary) {
      Report.warn("LLM summarization returned empty result", { npcId });
      return summaryRecord.lifeSummary || "";
    }

    // Update database
    const [updated] = await db
      .update(npcSummary)
      .set({
        lifeSummary: newSummary,
        summaryVersion: summaryRecord.summaryVersion + 1,
        totalEvents: summaryRecord.totalEvents + newEvents.length,
        lastUpdatedAt: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(npcSummary.npcId, npcId))
      .returning();

    Report.info("Updated NPC life summary", {
      npcId,
      summaryVersion: updated.summaryVersion,
      totalEvents: updated.totalEvents,
      summaryLength: newSummary.length,
    });

    return newSummary;
  } catch (error) {
    Report.error("Error updating NPC life summary", {
      error: error instanceof Error ? error.message : String(error),
      npcId,
    });
    throw error;
  }
}

/**
 * Set NPC life summary directly (without LLM)
 * Useful for initial summaries or manual updates
 */
export async function setNPCLifeSummary(
  npcId: string,
  summary: string
): Promise<void> {
  try {
    await getOrCreateNPCSummary(npcId);

    await db
      .update(npcSummary)
      .set({
        lifeSummary: summary,
        updatedAt: new Date(),
      })
      .where(eq(npcSummary.npcId, npcId));

    Report.debug("Set NPC life summary", { npcId, summaryLength: summary.length });
  } catch (error) {
    Report.error("Error setting NPC life summary", {
      error: error instanceof Error ? error.message : String(error),
      npcId,
    });
    throw error;
  }
}

/**
 * Check if summarization is needed based on event count
 * Returns true if totalEvents >= threshold
 */
export async function shouldSummarizeLife(npcId: string, threshold: number = 10): Promise<boolean> {
  try {
    const summaryRecord = await getOrCreateNPCSummary(npcId);
    return summaryRecord.totalEvents >= threshold;
  } catch (error) {
    Report.error("Error checking if summarization needed", {
      error: error instanceof Error ? error.message : String(error),
      npcId,
    });
    return false;
  }
}

