import type { 
  RaceEnum, 
  ClassEnum, 
  CharacterEquipmentSlot
} from "src/InterFacesEnumsAndTypes/Enums";
import type { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import type { SkillId } from "src/Entity/Skill/enums";
import type { EquipmentId } from "src/Entity/Item/Equipment/types";
import type { BattleType } from "src/Entity/Battle/types";
import type { MOBs } from "src/Entity/Character/MOBs/enums";

/**
 * Character configuration for battle simulation
 */
export interface CharacterConfig {
  type: 'mob' | 'custom';
  mobId?: MOBs;  // If using predefined MOB
  race?: RaceEnum;
  class?: ClassEnum;
  level: 1 | 2 | 3 | 4 | 5;
  name: { en: string; th: string };
  position: 0 | 1 | 2 | 3 | 4 | 5;
  skills?: Array<{ id: SkillId; level: number }>;
  equipment?: Partial<Record<CharacterEquipmentSlot, EquipmentId>>;
}

/**
 * Request to simulate a battle
 */
export interface SimulateBattleRequest {
  partyA: CharacterConfig[];
  partyB: CharacterConfig[];
  location: LocationsEnum;
  battleType: BattleType;
  presetName?: string; // For saving as custom preset
}

/**
 * Request to save a custom preset
 */
export interface SavePresetRequest {
  name: string;
  description?: string;
  partyA: CharacterConfig[];
  partyB: CharacterConfig[];
  location: LocationsEnum;
  battleType: BattleType;
}

