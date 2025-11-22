import type { L10N } from "src/InterFacesEnumsAndTypes/L10N";
import type { SkillId } from "src/Entity/Skill/enums";
import type { CharacterBattleStats } from "src/Entity/Battle/BattleStatistics";
import type { BattleType } from "src/Entity/Battle/types";
import type { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import type { CharacterConfig } from "./requests";
import type { RaceEnum, ClassEnum } from "src/InterFacesEnumsAndTypes/Enums";

/**
 * Detailed information about a single turn in the battle
 */
export interface TurnDetail {
  turnNumber: number;
  actorId: string;
  actorName: string;
  summary: string; // One-line conclusion from TurnResult.content
  details: {
    resourcesBefore?: { hp: number; mp: number; sp: number };
    resourcesAfter?: { hp: number; mp: number; sp: number };
    skillUsed?: { id: SkillId; name: string; level: number };
    targets?: Array<{
      id: string;
      name: string;
      effects: string[];
      damage?: number;
      healing?: number;
      isCrit?: boolean;
      isHit?: boolean;
    }>;
  };
}

/**
 * Character snapshot at battle end
 */
export interface CharacterSnapshot {
  id: string;
  name: string;
  position: number;
  hp: { current: number; max: number };
  mp: { current: number; max: number };
  sp: { current: number; max: number };
  isDead: boolean;
}

/**
 * Battle simulation response
 */
export interface SimulateBattleResponse {
  battleId: string;
  outcome: {
    winner: 'partyA' | 'partyB' | 'draw';
    message: L10N;
    duration: number; // turns
  };
  partyA: {
    characters: CharacterSnapshot[];
    survivors: number;
  };
  partyB: {
    characters: CharacterSnapshot[];
    survivors: number;
  };
  turns: TurnDetail[];
  statistics: {
    characters: CharacterBattleStats[];
    summary: string; // Formatted summary from BattleStatistics (legacy, not used in UI)
    structured: StructuredBattleStatistics; // Structured format for UI
  };
}

/**
 * Structured battle statistics for easier UI rendering
 */
export interface StructuredBattleStatistics {
  frontBackRatio: number; // Ratio of front row (0-2) to back row (3+) targeting
  characters: Record<string, CharacterStructuredStats>; // characterId -> stats
}

export interface CharacterStructuredStats {
  characterId: string;
  characterName: string;
  position: number;
  overallDamage: number;
  overallHealing: number;
  damageTaken: number;
  healingReceived: number;
  turns: TurnAction[]; // Turn-by-turn actions
  frontRowTargets: number; // Hits on front row (0-2)
  backRowTargets: number; // Hits on back row (3+)
  skillsUsed: Record<string, number>; // skillId -> count
}

export interface TurnAction {
  turnNumber: number;
  type: 'damage' | 'heal' | 'other';
  value: number; // Damage or healing amount
  skill: string; // Skill name or ID
  targetId?: string; // Target character ID
  targetName?: string; // Target character name
  isCrit?: boolean;
  isHit?: boolean;
}

/**
 * Metadata about available options for battle configuration
 */
export interface BattleMetadataResponse {
  races: Array<{ id: string; name: L10N }>;
  classes: Array<{ id: string; name: string }>;
  mobs: Array<{ id: string; name: L10N; race: string; class?: string }>;
  skills: Array<{ id: string; name: L10N; class?: string; tier: string }>;
  equipment: Array<{ id: string; name: L10N; slot: string; type: 'weapon' | 'armor' }>;
  locations: Array<{ id: string; name: L10N }>;
  battleTypes: Array<{ id: string; name: string }>;
}

/**
 * Preset information
 */
export interface PresetInfo {
  id: string;
  name: string;
  description?: string;
  isDefault: boolean;
  partyA: CharacterConfig[];
  partyB: CharacterConfig[];
  location: LocationsEnum;
  battleType: BattleType;
}

/**
 * Response for preset operations
 */
export interface PresetsResponse {
  presets: PresetInfo[];
}

