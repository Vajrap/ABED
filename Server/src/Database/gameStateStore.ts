import { eq } from "drizzle-orm";
import { db } from "./connection";
import { gameState as gameStateTable } from "./Schema";
import { gameState } from "../Game/GameState";
import Report from "../Utils/Reporter";

type GameStateUpdate = Partial<{
  lastGlobalEventCardCompleted: boolean;
  activeGlobalEventCard: unknown;
  globalEventCardDeck: unknown;
  completedGlobalEventCards: unknown;
  regionEventCardDeck: unknown;
  completedRegionEventCards: unknown;
  globalEventScale: number;
  lastProcessedPhase: number;
}>;

async function upsertGameState(values: GameStateUpdate): Promise<void> {
  const now = new Date();

  if (gameState.id) {
    const updatePayload: Record<string, unknown> = { updatedAt: now };

    if (values.lastGlobalEventCardCompleted !== undefined) {
      updatePayload.lastGlobalEventCardCompleted =
        values.lastGlobalEventCardCompleted;
    }
    if (values.activeGlobalEventCard !== undefined) {
      updatePayload.activeGlobalEventCard = values.activeGlobalEventCard;
    }
    if (values.globalEventCardDeck !== undefined) {
      updatePayload.globalEventCardDeck = values.globalEventCardDeck;
    }
    if (values.completedGlobalEventCards !== undefined) {
      updatePayload.completedGlobalEventCards = values.completedGlobalEventCards;
    }
    if (values.regionEventCardDeck !== undefined) {
      updatePayload.regionEventCardDeck = values.regionEventCardDeck;
    }
    if (values.completedRegionEventCards !== undefined) {
      updatePayload.completedRegionEventCards =
        values.completedRegionEventCards;
    }
    if (values.globalEventScale !== undefined) {
      updatePayload.globalEventScale = values.globalEventScale;
    }
    if (values.lastProcessedPhase !== undefined) {
      updatePayload.lastProcessedPhase = values.lastProcessedPhase;
    }

    await db
      .update(gameStateTable)
      .set(updatePayload)
      .where(eq(gameStateTable.id, gameState.id));
  } else {
    const insertPayload = {
      lastGlobalEventCardCompleted:
        values.lastGlobalEventCardCompleted ??
        gameState.lastGlobalEventCardCompleted,
      activeGlobalEventCard:
        values.activeGlobalEventCard ?? gameState.activeGlobalEventCards,
      globalEventCardDeck:
        values.globalEventCardDeck ?? gameState.globalEventCardDeck,
      completedGlobalEventCards:
        values.completedGlobalEventCards ??
        gameState.completedGlobalEventCards,
      regionEventCardDeck:
        values.regionEventCardDeck ?? gameState.regionEventCardDeck,
      completedRegionEventCards:
        values.completedRegionEventCards ??
        gameState.completedRegionEventCards,
      globalEventScale:
        values.globalEventScale ?? gameState.globalEventScale ?? 0,
      lastProcessedPhase:
        values.lastProcessedPhase ?? gameState.lastProcessedPhaseIndex ?? 0,
      updatedAt: now,
    };

    const insertedRows = await db
      .insert(gameStateTable)
      .values(insertPayload)
      .returning({
        id: gameStateTable.id,
        lastProcessedPhase: gameStateTable.lastProcessedPhase,
      });

    const inserted = insertedRows[0];
    if (inserted) {
      gameState.id = inserted.id;
      gameState.lastProcessedPhaseIndex =
        inserted.lastProcessedPhase ?? gameState.lastProcessedPhaseIndex ?? 0;
    }
  }

  if (values.lastProcessedPhase !== undefined) {
    gameState.lastProcessedPhaseIndex = values.lastProcessedPhase;
  }
}

export async function persistLastProcessedPhase(
  phaseIndex: number,
): Promise<void> {
  try {
    if (!Number.isFinite(phaseIndex) || phaseIndex < 0) {
      return;
    }

    await upsertGameState({
      lastProcessedPhase: phaseIndex,
    });
  } catch (error) {
    Report.error("Failed to persist last processed phase", {
      error,
      phaseIndex,
    });
    throw error;
  }
}

export async function persistGameStateSnapshot(): Promise<void> {
  try {
    await upsertGameState({
      lastGlobalEventCardCompleted: gameState.lastGlobalEventCardCompleted,
      globalEventScale: gameState.globalEventScale,
      lastProcessedPhase: gameState.lastProcessedPhaseIndex ?? 0,
    });
  } catch (error) {
    Report.error("Failed to persist game state snapshot", { error });
    throw error;
  }
}

