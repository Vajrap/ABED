import { eq } from "drizzle-orm";
import { persistGameStateSnapshot } from "./gameStateStore";
import { newsArchiveService } from "../Entity/News/NewsArchive";
import { market } from "../Entity/Market/Market";
import { db } from "./connection";
import {
  marketState,
  resourceProductionTracking,
} from "./Schema";
import Report from "../Utils/Reporter";
import { GameTime } from "../Game/GameTime/GameTime";
import type { TransactionRecord } from "../Entity/Market/types";

function mapToPlain<T>(map: Map<any, T>): Record<string, T> {
  const obj: Record<string, T> = {};
  for (const [key, value] of map.entries()) {
    obj[String(key)] = value;
  }
  return obj;
}

function nestedMapToPlain<T>(
  map: Map<any, Map<any, T>>,
): Record<string, Record<string, T>> {
  const obj: Record<string, Record<string, T>> = {};
  for (const [outerKey, innerMap] of map.entries()) {
    obj[String(outerKey)] = mapToPlain(innerMap);
  }
  return obj;
}

function transactionHistoryToPlain(
  history: Map<any, Map<any, TransactionRecord>>,
): Record<string, Record<string, TransactionRecord>> {
  const result: Record<string, Record<string, TransactionRecord>> = {};
  for (const [location, trades] of history.entries()) {
    const tradeObj: Record<string, TransactionRecord> = {};
    for (const [tradeable, record] of trades.entries()) {
      tradeObj[String(tradeable)] = { ...record };
    }
    result[String(location)] = tradeObj;
  }
  return result;
}

async function persistMarketStateSnapshot(): Promise<void> {
  const now = new Date();
  const yearlyModifiers = mapToPlain(market.yearlyModifiers);
  const eventModifiers = nestedMapToPlain(market.eventModifiers);
  const transactionHistory = transactionHistoryToPlain(
    market.transactionHistory,
  );

  const payload = {
    yearlyModifiers,
    eventModifiers,
    transactionHistory,
    currentYear: GameTime.year,
    lastYearlyAdjustment: now,
    updatedAt: now,
  };

  if (market.stateId) {
    await db
      .update(marketState)
      .set(payload)
      .where(eq(marketState.id, market.stateId));
  } else {
    const insertedRows = await db
      .insert(marketState)
      .values(payload)
      .returning({ id: marketState.id });

    const inserted = insertedRows[0];
    if (inserted) {
      market.stateId = inserted.id;
    }
  }
}

async function persistResourceProductionSnapshot(): Promise<void> {
  const tracker = market.resourceTracker;
  const now = new Date();

  const yearlyProduction = {
    global: mapToPlain(tracker.yearlyProduction.global),
    subregion: nestedMapToPlain(tracker.yearlyProduction.subregion),
    location: nestedMapToPlain(tracker.yearlyProduction.location),
  };

  const baselines = {
    global: mapToPlain(tracker.baselines.global),
    subregion: nestedMapToPlain(tracker.baselines.subregion),
    location: nestedMapToPlain(tracker.baselines.location),
  };

  const payload = {
    currentYear: GameTime.year,
    yearlyProduction,
    baselines,
    lastReset: now,
    updatedAt: now,
  };

  if (tracker.dbId) {
    await db
      .update(resourceProductionTracking)
      .set(payload)
      .where(eq(resourceProductionTracking.id, tracker.dbId));
  } else {
    const insertedRows = await db
      .insert(resourceProductionTracking)
      .values(payload)
      .returning({ id: resourceProductionTracking.id });

    const inserted = insertedRows[0];
    if (inserted) {
      tracker.dbId = inserted.id;
    }
  }
}

export async function saveDailyState(): Promise<void> {
  const errors: Array<{ scope: string; error: unknown }> = [];

  const run = async (scope: string, fn: () => Promise<void>) => {
    try {
      await fn();
    } catch (error) {
      errors.push({ scope, error });
      Report.error(`Daily persistence failed for ${scope}`, { error });
    }
  };

  await run("gameState", persistGameStateSnapshot);
  await run("newsArchive", () => newsArchiveService.saveToDatabase());
  await run("marketState", persistMarketStateSnapshot);
  await run("resourceProduction", persistResourceProductionSnapshot);

  if (errors.length === 0) {
    Report.info("Daily state persistence completed successfully");
  } else {
    Report.warn("Daily state persistence completed with errors", {
      failedScopes: errors.map((e) => e.scope),
    });
  }
}

