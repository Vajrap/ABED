import { config } from "dotenv";

config();

export type GameLoopMode = "prod" | "dev" | "test";

const DEFAULT_MODE: GameLoopMode = "prod";
const DEFAULT_EPOCH = "2025-01-01T00:00:00.000Z";
const DEFAULT_MS_PER_PHASE = 15 * 60 * 1000; // 15 minutes

function parseMode(value: string | undefined): GameLoopMode {
  if (value === "prod" || value === "dev" || value === "test") {
    return value;
  }
  return DEFAULT_MODE;
}

export function getGameLoopMode(): GameLoopMode {
  return parseMode(process.env.GAME_LOOP_MODE);
}

export function getGameEpoch(): Date {
  const supplied = process.env.GAME_EPOCH_UTC;
  if (!supplied) {
    return new Date(DEFAULT_EPOCH);
  }

  const parsed = new Date(supplied);
  if (Number.isNaN(parsed.getTime())) {
    throw new Error(
      `Invalid GAME_EPOCH_UTC value "${supplied}". Expected ISO timestamp.`,
    );
  }

  return parsed;
}

export function getMsPerPhase(): number {
  const supplied = process.env.GAME_MS_PER_PHASE;

  if (!supplied) {
    return DEFAULT_MS_PER_PHASE;
  }

  const parsed = Number(supplied);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    throw new Error(
      `Invalid GAME_MS_PER_PHASE value "${supplied}". Expected positive number.`,
    );
  }

  return parsed;
}

