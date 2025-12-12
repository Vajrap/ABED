import { ArtisanKey, AttributeKey, CharacterEquipmentSlot, ElementKey, ProficiencyKey, RaceEnum } from "src/InterFacesEnumsAndTypes/Enums";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { PortraitData } from "src/InterFacesEnumsAndTypes/PortraitData";
import { CharacterEpithetEnum } from "../Subclass/Title/Epithet/enum";
import { CharacterRoleEnum } from "../Subclass/Title/Role/enum";
import { SkillId } from "src/Entity/Skill/enums";
import { PartyActionSequence } from "src/Entity/Party/ActionlSequence/PartyActionSequence";
import { CharacterActionSequence } from "../Subclass/Action/CharacterAction";
import { EquipmentId, ItemId } from "src/Entity/Item";
import { NPCEnums } from "./enum";

export interface AttributeMods extends Partial<Record<AttributeKey, number>> {}
export interface ProficiencyMods extends Partial<Record<ProficiencyKey, number>> {}
export interface ArtisanMods extends Partial<Record<ArtisanKey, number>> {}
export interface ElementMods extends Partial<Record<ElementKey, number>> {}

export type NPCsByLocation = {
    location: LocationsEnum
    npcsParty: NPCsParty[]
}

export type NPCsParty = {
    partyId: NPCEnums
    npcs: NPCTemplate[]
    defaultPartyActionSequence?: PartyActionSequence;
}

export interface NPCTemplate {
  id: NPCEnums;
  name: { en: string; th: string };
  race: RaceEnum;
  gender: "MALE" | "FEMALE" | "NONE";
  level: number;
  portraitData: PortraitData;
  background?: string;

  attributeMods?: AttributeMods;
  proficiencies?: ProficiencyMods;
  artisanMods?: ArtisanMods;

  alignment?: {
    good?: number;
    evil?: number;
  };

  title?: {
    epithet?: CharacterEpithetEnum;
    role?: CharacterRoleEnum;
  };

  activeSkills?: Array<{
    id: SkillId;
    level: number;
    exp?: number;
  }>;

  relations?: NPCRelation[];

  startingEquipment?: Array<{
    equipmentId: EquipmentId;
    slot: CharacterEquipmentSlot;
  }>;

  startingInventory?: Array<{
    itemId: ItemId;
    quantity: number;
  }>;

  planarAptitude?: number;

  vitals?: {
    hp?: { base?: number; current?: number };
    mp?: { base?: number; current?: number };
    sp?: { base?: number; current?: number };
  };

  traits?: Array<{
    trait: string; // TraitEnum
    value: number;
  }>;

  // Character Prompt for LLM/OpenAI interactions
  // Describes the NPC's personality, background, current state, and conversation style
  // This prompt will be used when players chat with the NPC through OpenAPI
  // Can be updated dynamically during gameplay to reflect changes in relationships, events, etc.
  // NOTE: This is now stored in the npc_memory table, but kept here for template definition
  characterPrompt?: string;

  // Known News: Initial news IDs that the NPC knows about (from news_archive)
  // These will be added to the NPC's memory when seeded
  // Can be updated dynamically as news spreads
  initialKnownNews?: string[]; // Array of news archive UUIDs

  // Join Party Criteria - defines if/how NPC can join player parties
  // Stored in code (template) since NPCs are loaded into memory
  joinPartyCriteria?: {
    canJoin: boolean;              // Master switch - can this NPC join parties?
    hiring?: number;               // Gold cost to hire (if set, requires payment)
    closeness?: number;            // Minimum closeness required (0-100)
    affection?: number;            // Minimum affection required (-100 to 100)
    haveQuest?: string;            // Quest ID that must be completed first
    customConditions?: Array<{     // Additional custom conditions
      type: 'level' | 'item' | 'location' | 'custom';
      value: any;
      description: string;
    }>;
  };

  // Quest Giver Support
  availableQuests?: string[]; // Quest definition IDs this NPC can give
  questGiverDialogue?: {
    greeting?: { en: string; th: string }; // Greeting when player talks to NPC
    questOffer?: Record<string, { en: string; th: string }>; // Quest ID -> dialogue when offering (using Record instead of Map for JSON serialization)
    questComplete?: Record<string, { en: string; th: string }>; // Quest ID -> dialogue when turning in
  };

  defaultCharacterActionSequence?: CharacterActionSequence;
}

export interface NPCRelation {
  npcId: string; // ID of the other NPC
  value: number; // Relationship value (-100 to 100)
  status?: "friend" | "rival" | "neutral" | "enemy";
}
