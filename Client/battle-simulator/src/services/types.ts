// Types matching the backend API

export interface L10N {
  en: string;
  th: string;
}

export type RaceEnum = 'Human' | 'Elven' | 'Orc' | 'Dwarf' | 'Halfling' | 'Goblin';
export type ClassEnum = 'Cleric' | 'Seer' | 'Mage' | 'Mystic' | 'Rogue' | 'SpellBlade' | 'Shaman' | 'Barbarian' | 'Warrior' | 'Knight' | 'Guardian' | 'Paladin' | 'Druid' | 'Monk' | 'Warlock' | 'Duelist' | 'Witch' | 'Inquisitor' | 'Scholar' | 'Engineer' | 'Nomad';
export type BattleType = 'Normal' | 'Training' | 'Arena' | 'Scripted' | 'NoReward';
export type CharacterEquipmentSlot = 'headWear' | 'body' | 'leg' | 'hand' | 'foot' | 'util' | 'ringL' | 'ringR' | 'earL' | 'earR' | 'neck' | 'rightHand' | 'leftHand';

export interface CharacterConfig {
  type: 'mob' | 'custom';
  mobId?: string;
  race?: RaceEnum;
  class?: ClassEnum;
  level: 1 | 2 | 3 | 4 | 5;
  name: { en: string; th: string };
  position: 0 | 1 | 2 | 3 | 4 | 5;
  skills?: Array<{ id: string; level: number }>;
  equipment?: Partial<Record<CharacterEquipmentSlot, string>>;
}

export interface SimulateBattleRequest {
  partyA: CharacterConfig[];
  partyB: CharacterConfig[];
  location: string;
  battleType: BattleType;
  presetName?: string;
}

export interface TurnDetail {
  turnNumber: number;
  actorId: string;
  actorName: string;
  summary: string;
  details: {
    resourcesBefore?: { hp: number; mp: number; sp: number };
    resourcesAfter?: { hp: number; mp: number; sp: number };
    skillUsed?: { id: string; name: string; level: number };
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

export interface CharacterSnapshot {
  id: string;
  name: string;
  position: number;
  hp: { current: number; max: number };
  mp: { current: number; max: number };
  sp: { current: number; max: number };
  isDead: boolean;
}

export interface SimulateBattleResponse {
  battleId: string;
  outcome: {
    winner: 'partyA' | 'partyB' | 'draw';
    message: L10N;
    duration: number;
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
    characters: any[];
    summary: string;
    structured: StructuredBattleStatistics;
  };
}

export interface StructuredBattleStatistics {
  frontBackRatio: number;
  characters: Record<string, CharacterStructuredStats>;
}

export interface SkillDeckEntry {
  skillId: string;
  skillName: string;
  level: number;
  position: number;
  consume: {
    hp: number;
    mp: number;
    sp: number;
    elements: Array<{ element: string; value: number }>;
  };
  produce: {
    hp: number;
    mp: number;
    sp: number;
    elements: Array<{ element: string; min: number; max: number }>;
  };
}

export interface CharacterStructuredStats {
  characterId: string;
  characterName: string;
  position: number;
  overallDamage: number;
  overallHealing: number;
  damageTaken: number;
  healingReceived: number;
  turns: TurnAction[];
  frontRowTargets: number;
  backRowTargets: number;
  skillsUsed: Record<string, number>;
  skillDeck: SkillDeckEntry[];
  conditionalSkillDeck?: SkillDeckEntry[];
}

export interface TurnAction {
  turnNumber: number;
  type: 'damage' | 'heal' | 'other';
  value: number;
  skill: string;
  targetId?: string;
  targetName?: string;
  isCrit?: boolean;
  isHit?: boolean;
}

export interface BattleMetadataResponse {
  races: Array<{ id: RaceEnum; name: L10N }>;
  classes: Array<{ id: ClassEnum; name: string }>;
  mobs: Array<{ id: string; name: L10N; race: string; class?: string }>;
  skills: Array<{ id: string; name: L10N; class?: string; tier: string }>;
  equipment: Array<{ id: string; name: L10N; slot: string; type: 'weapon' | 'armor' }>;
  locations: Array<{ id: string; name: L10N }>;
  battleTypes: Array<{ id: BattleType; name: string }>;
}

export interface PresetInfo {
  id: string;
  name: string;
  description?: string;
  isDefault: boolean;
  partyA: CharacterConfig[];
  partyB: CharacterConfig[];
  location: string;
  battleType: BattleType;
}

export interface PresetsResponse {
  presets: PresetInfo[];
}

/**
 * AI Analysis response from n8n/LM Studio
 */
export interface AIAnalysisResponse {
  outPut?: string;  // Response from n8n (may be JSON string or object)
  output?: string;  // Alternative field name
  [key: string]: any;  // Allow other response formats
}

/**
 * Parsed AI Analysis result
 */
export interface AIAnalysis {
  sanityScore: number;
  summary: string;
  skillFlow: {
    diversity: string;
    selectionLogic: string;
    conditionalDeck: string;
    issues: string[];
  };
  elementFlow: {
    production: string;
    consumption: string;
    chains: string;
    accumulation: string;
    efficiency: string;
    issues: string[];
  };
  battleFlow: {
    duration: string;
    resourceUsage: string;
    turnEfficiency: string;
    partyBalance: string;
  };
  performance: {
    roleFulfillment: string;
    positionLogic: string;
    resourceManagement: string;
  };
  anomalies: Array<{
    type: 'bug' | 'balance' | 'flow';
    severity: 'low' | 'medium' | 'high' | 'critical';
    description: string;
    evidence: string;
    character?: string;
    turn?: number;
  }>;
  recommendations: string[];
}

export interface SavePresetRequest {
  name: string;
  description?: string;
  partyA: CharacterConfig[];
  partyB: CharacterConfig[];
  location: string;
  battleType: BattleType;
}

