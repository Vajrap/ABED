import type { GameTimeInterface } from "../InterFacesEnumsAndTypes/Time";
import { GameTime } from "../Game/GameTime/GameTime";
import { getGameEpoch, getMsPerPhase } from "../config/gameLoop";

/**
 * Convert GameTimeInterface to phase index
 * 
 * Formula: phaseIndex = (dayPassed * 4) + (hour - 1)
 * Where:
 * - dayPassed: total days since epoch
 * - hour: 1-4 (morning, afternoon, evening, night)
 */
export function gameTimeToPhaseIndex(gameTime: GameTimeInterface): number {
  return (gameTime.dayPassed * GameTime.inGameHoursPerDay) + (gameTime.hour - 1);
}

/**
 * Convert phase index to GameTimeInterface
 * 
 * Reverse of gameTimeToPhaseIndex:
 * - dayPassed = Math.floor(phaseIndex / 4)
 * - hour = (phaseIndex % 4) + 1
 * - dayOfWeek = (dayPassed % 6) + 1
 * - dayOfSeason = (dayPassed % 48) + 1
 * - season = Math.floor(dayPassed / 48) % 7 + 1
 * - year = Math.floor(dayPassed / (48 * 7))
 */
export function phaseIndexToGameTime(phaseIndex: number): GameTimeInterface {
  const phasesPerDay = GameTime.inGameHoursPerDay;
  const dayPassed = Math.floor(phaseIndex / phasesPerDay);
  const hour = ((phaseIndex % phasesPerDay) + 1) as 1 | 2 | 3 | 4;
  
  const dayOfWeekIndex = dayPassed % GameTime.inGameDaysPerWeek;
  const dayOfWeek = (dayOfWeekIndex + 1) as 1 | 2 | 3 | 4 | 5 | 6;
  
  const dayOfSeasonIndex = dayPassed % GameTime.inGameDaysPerSeason;
  const dayOfSeason = (dayOfSeasonIndex + 1) as typeof GameTime.dayOfSeason;
  
  const totalSeasons = Math.floor(dayPassed / GameTime.inGameDaysPerSeason);
  const seasonIndex = totalSeasons % GameTime.inGameSeasonsPerYear;
  const season = (seasonIndex + 1) as 1 | 2 | 3 | 4 | 5 | 6 | 7;
  
  const year = Math.floor(totalSeasons / GameTime.inGameSeasonsPerYear);
  
  return {
    hour,
    dayOfWeek,
    dayOfSeason,
    season,
    dayPassed,
    year,
  };
}

/**
 * Calculate phases between two game times
 */
export function phasesBetween(from: GameTimeInterface, to: GameTimeInterface): number {
  const fromPhase = gameTimeToPhaseIndex(from);
  const toPhase = gameTimeToPhaseIndex(to);
  return Math.max(0, toPhase - fromPhase);
}

/**
 * Parse lastNewsReceived string to phase index
 * 
 * Supports formats:
 * - "phase_12345" -> 12345
 * - "12345" -> 12345
 * - News ID (UUID) -> null (needs to be looked up)
 */
export function parseLastNewsReceived(lastNewsReceived: string | null | undefined): number | null {
  if (!lastNewsReceived) {
    return null;
  }
  
  // Check if it's a phase index format
  if (lastNewsReceived.startsWith("phase_")) {
    const phaseIndex = parseInt(lastNewsReceived.slice(6), 10);
    if (!isNaN(phaseIndex) && phaseIndex >= 0) {
      return phaseIndex;
    }
  }
  
  // Check if it's just a number
  const phaseIndex = parseInt(lastNewsReceived, 10);
  if (!isNaN(phaseIndex) && phaseIndex >= 0) {
    return phaseIndex;
  }
  
  // Otherwise, it might be a news ID (UUID) - return null to indicate lookup needed
  return null;
}

/**
 * Format phase index as lastNewsReceived string
 */
export function formatLastNewsReceived(phaseIndex: number): string {
  return `phase_${phaseIndex}`;
}

/**
 * Get current phase index
 */
export function getCurrentPhaseIndex(): number {
  return GameTime.getCurrentPhaseIndex();
}

