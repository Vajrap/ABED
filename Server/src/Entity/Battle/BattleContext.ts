import type { BattleStatistics } from "./BattleStatistics";

/**
 * Battle context for passing battle-specific data to skills
 * This allows resolveDamage and other battle functions to access
 * the current battle's statistics without modifying all skill signatures
 */
let currentBattleStatistics: BattleStatistics | null = null;

/**
 * Set the current battle statistics (called by Battle class)
 */
export function setBattleStatistics(statistics: BattleStatistics | null): void {
  currentBattleStatistics = statistics;
}

/**
 * Get the current battle statistics (used by resolveDamage)
 */
export function getBattleStatistics(): BattleStatistics | null {
  return currentBattleStatistics;
}

