import type { BattleStatistics } from "./BattleStatistics";

/**
 * Minimal interface for Battle type to avoid circular dependency
 * BattleContext only needs the id property from Battle
 */
interface BattleLike {
  id: string;
}

/**
 * Battle context for passing battle-specific data to skills
 * This allows resolveDamage and other battle functions to access
 * the current battle's statistics without modifying all skill signatures
 * 
 * Uses Maps keyed by battle ID to support multiple concurrent battles.
 * Also maintains a "current battle ID" for the currently executing turn.
 */
const battleStatisticsMap: Map<string, BattleStatistics> = new Map();
const battleMap: Map<string, BattleLike> = new Map();
let currentBattleId: string | null = null; // Set per turn execution

/**
 * Set the current battle statistics for a specific battle (called by Battle class)
 */
export function setBattleStatistics(statistics: BattleStatistics | null, battleId?: string): void {
  if (!battleId) {
    // Legacy support: clear all if no battleId provided
    battleStatisticsMap.clear();
    return;
  }
  if (statistics === null) {
    battleStatisticsMap.delete(battleId);
  } else {
    battleStatisticsMap.set(battleId, statistics);
  }
}

/**
 * Set the current battle ID for turn execution context
 * Called at the start of each turn to establish which battle is executing
 */
export function setCurrentBattleId(battleId: string | null): void {
  currentBattleId = battleId;
}

/**
 * Get the current battle statistics (used by resolveDamage)
 * If battleId is provided, gets that specific battle's statistics
 * Otherwise, uses the current battle ID from turn execution context
 */
export function getBattleStatistics(battleId?: string): BattleStatistics | null {
  const id = battleId || currentBattleId;
  if (id) {
    return battleStatisticsMap.get(id) || null;
  }
  // Fallback: return first entry if no ID available (for backward compatibility)
  const firstEntry = battleStatisticsMap.values().next().value;
  return firstEntry || null;
}

/**
 * Set the current battle instance for a specific battle (called by Battle class)
 * Uses BattleLike interface to avoid circular dependency
 */
export function setBattle(battle: BattleLike | null, battleId?: string): void {
  if (!battleId && battle) {
    battleId = battle.id;
  }
  if (!battleId) {
    // Legacy support: clear all if no battleId provided
    battleMap.clear();
    return;
  }
  if (battle === null) {
    battleMap.delete(battleId);
  } else {
    battleMap.set(battleId, battle);
  }
}

/**
 * Get the current battle instance (used by skills that need battle-level access)
 * If battleId is provided, gets that specific battle
 * Otherwise, uses the current battle ID from turn execution context
 * Returns BattleLike to avoid circular dependency - callers can cast to Battle if needed
 */
export function getBattle(battleId?: string): BattleLike | null {
  const id = battleId || currentBattleId;
  if (id) {
    return battleMap.get(id) || null;
  }
  // Fallback: return first entry if no ID available (for backward compatibility)
  const firstEntry = battleMap.values().next().value;
  return firstEntry || null;
}

