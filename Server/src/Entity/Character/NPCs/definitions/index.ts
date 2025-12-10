/**
 * NPC Definitions - Character templates for NPCs
 * 
 * These are template definitions that provide default values.
 * Actual NPC instances are stored in the database and can grow/change dynamically.
 * 
 * Usage:
 * - Seed scripts use these templates to create initial NPCs
 * - If an NPC exists in DB, it takes precedence over template
 * - Templates provide type safety and default values
 */

import type { Character } from "../../Character";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { RaceEnum } from "src/InterFacesEnumsAndTypes/Enums";
import type { AttributeKey } from "src/InterFacesEnumsAndTypes/Enums";
import type { ProficiencyKey } from "src/InterFacesEnumsAndTypes/Enums";
import type { CharacterEpithetEnum } from "../../Subclass/Title/Epithet/enum";
import type { CharacterRoleEnum } from "../../Subclass/Title/Role/enum";
import type { SkillId } from "src/Entity/Skill/enums";
import type { PortraitData } from "src/InterFacesEnumsAndTypes/PortraitData";
import type { EquipmentId } from "src/Entity/Item/Equipment/types";
import type { CharacterEquipmentSlot } from "src/InterFacesEnumsAndTypes/Enums";

/**
 * Attribute modifications from base 7
 * All attributes start at 7, then these modifications are applied
 */
export interface AttributeMods {
  charisma?: number;
  luck?: number;
  intelligence?: number;
  leadership?: number;
  vitality?: number;
  willpower?: number;
  planar?: number;
  control?: number;
  dexterity?: number;
  agility?: number;
  strength?: number;
  endurance?: number;
}

/**
 * Proficiency values (base values)
 */
export interface ProficiencyMods extends Partial<Record<ProficiencyKey, number>> {}

/**
 * Artisan modifications (similar to attributes)
 */
export interface ArtisanMods {
  blacksmith?: number;
  tailor?: number;
  alchemist?: number;
  enchanter?: number;
  jeweler?: number;
  carpenter?: number;
  leatherworker?: number;
  scribe?: number;
}

/**
 * Relationship with another NPC
 */
export interface NPCRelation {
  npcId: string; // ID of the other NPC
  value: number; // Relationship value (-100 to 100)
  status?: "friend" | "rival" | "neutral" | "enemy";
}

/**
 * NPC Template - Complete character definition
 */
export interface NPCTemplate {
  // Basic Info
  id: string; // Unique identifier (e.g., "wayward_inn_innkeeper")
  name: { en: string; th: string };
  location: LocationsEnum; // Where this NPC spawns/lives
  race: RaceEnum;
  gender: "MALE" | "FEMALE" | "NONE";
  level: number;
  portraitData: PortraitData; // Preferred field for portrait data
  background?: string;

  // Attributes (all start at base 7, then these mods are applied)
  attributeMods?: AttributeMods;

  // Proficiencies (base values)
  proficiencies?: ProficiencyMods;

  // Artisans (all start at base 7, then these mods are applied)
  artisanMods?: ArtisanMods;

  // Alignment
  alignment?: {
    good?: number;
    evil?: number;
  };

  // Title
  title?: {
    epithet?: CharacterEpithetEnum;
    role?: CharacterRoleEnum;
  };
  possibleEpithets?: CharacterEpithetEnum[];
  possibleRoles?: CharacterRoleEnum[];

  // Skills
  activeSkills?: Array<{
    id: SkillId;
    level: number;
    exp?: number;
  }>;

  // Relations with other NPCs
  relations?: NPCRelation[];

  // Starting Equipment (equipment IDs and slots)
  startingEquipment?: Array<{
    equipmentId: EquipmentId;
    slot: CharacterEquipmentSlot;
  }>;

  // Starting Inventory (item IDs and quantities)
  // Note: Can be EquipmentId or other ItemId types
  startingInventory?: Array<{
    itemId: string; // ItemId or EquipmentId
    quantity: number;
  }>;

  // Planar Aptitude (overrides race default)
  planarAptitude?: number;

  // Custom Vitals (if not provided, calculated from attributes)
  vitals?: {
    hp?: { base?: number; current?: number };
    mp?: { base?: number; current?: number };
    sp?: { base?: number; current?: number };
  };

  // Traits
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
}

/**
 * Registry of NPC templates by location
 */
export const npcTemplatesByLocation: Record<LocationsEnum, NPCTemplate[]> = {
  [LocationsEnum.WaywardInn]: [

/**
 * Thomas is the innkeeper at the wayward inn, will be a character where people met a lot cause it's the starting place
 * Might need him to be rememberable, so might need to be a bit more interesting than just a basic innkeeper
 */
      {
        id: "wayward_inn_innkeeper",
        name: { en: "Thomas", th: "โทมัส" },
        location: LocationsEnum.WaywardInn,
        race: RaceEnum.Human,
        gender: "MALE",
        level: 3,
        background: "innkeeper",
        portraitData: {
          base: "c1",
          jaw: "jaw1",
          eyes: "eye1",
          eyes_color: "c1",
          face: "face1",
          beard: 1,
          hair_top: "m1_top",
          hair_bot: "m1_bot",
          hair_color: "c1",
        },
        characterPrompt: `You are Thomas, the innkeeper at the Wayward Inn. You are a middle-aged human man in your early 40s, warm and welcoming but also sharp-witted and observant. You've been running this inn for over a decade and have seen countless travelers pass through.

Your personality:
- Friendly and hospitable, but also business-minded
- You have a good memory for faces and remember regular customers
- You're protective of your staff, especially Sarah
- You enjoy storytelling and hearing about travelers' adventures
- You're knowledgeable about local news, rumors, and the surrounding area
- You have a subtle sense of humor and aren't afraid to make light of situations

Your background:
- You inherited the Wayward Inn from your family
- You're well-respected in the local community
- You maintain good relationships with merchants, guards, and other locals
- You've dealt with all types of customers - adventurers, merchants, criminals, nobles

Current state:
- The inn is your life's work and you take pride in maintaining it
- You care deeply about providing a safe, comfortable space for travelers
- You're always looking for ways to improve the inn and attract more customers

Conversation style:
- Speak in a warm, funny, and welcoming manner but with authority
- Ask questions about where travelers are coming from and going to
- Share local knowledge when asked
- Be observant and notice things about your customers
- Remember previous conversations if the player has been here before
- Example: "Welcome, anything is good, but don't dance on my table please, Three of them were broken yesterday"`,
      // Attributes: Base 7, then mods
      attributeMods: {
        charisma: 3, // 10 total
        leadership: 2, // 9 total
        intelligence: 1, // 8 total
        vitality: 1, // 8 total
      },
      // Proficiencies
      proficiencies: {
        bareHand: 3,
        hammer: 2, // Using hammer instead of club (club not a valid proficiency)
      },
      // Artisans
      artisanMods: {
        tailor: 2, // Innkeeper needs basic tailoring skills
        carpenter: 1,
      },
      // Alignment: Good innkeeper
      alignment: {
        good: 15,
        evil: -5,
      },
      // Title
      title: {
        epithet: undefined, // Can be added later
        role: undefined, // Can be added later
      },
      possibleEpithets: [],
      possibleRoles: [],
      // Skills
      activeSkills: [],
      // Relations: Thomas and Sarah work together
      relations: [
        {
          npcId: "wayward_inn_barmaid",
          value: 25, // Friendly working relationship
          status: "friend",
        },
      ],
    },

/**
 * Sarah is the barmaid at the wayward inn, should be pretty easy going, 
 * Need to connect her to some quest later, make her background a bit more interesting than just a basic barmaid
 */
      {
        id: "wayward_inn_barmaid",
        name: { en: "Sarah", th: "ซาราห์" },
        location: LocationsEnum.WaywardInn,
        race: RaceEnum.Human,
        gender: "FEMALE",
        level: 3,
        background: "service",
        portraitData: {
          base: "c1",
          jaw: "jaw1",
          eyes: "eye1",
          eyes_color: "c1",
          face: "face1",
          beard: 1,
          hair_top: "m1_top",
          hair_bot: "m1_bot",
          hair_color: "c1",
        },
        characterPrompt: `You are Sarah, a barmaid working at the Wayward Inn. You are a young human woman in your early 20s, cheerful and efficient but also perceptive and independent-minded.

Your personality:
- Energetic and friendly, always moving with purpose
- Quick-witted and observant - you notice things others miss
- You're hardworking and take pride in your work
- You have a good rapport with Thomas, the innkeeper
- You enjoy chatting with customers and learning about their travels
- You're not easily intimidated and can handle rowdy customers
- You have clear boundaries and won't tolerate inappropriate behavior
- You're confident and assertive when someone crosses the line

Your background:
- You've been working at the Wayward Inn for a few years
- You're reliable and trusted by Thomas
- You know the regulars and the local gossip
- You're saving money with plans for your future
- You've dealt with all types of customers and know how to handle difficult situations

Current state:
- Happy with your job and the community at the inn
- You work long hours but enjoy the lively atmosphere
- You have a good working relationship with Thomas
- You're always learning new things from travelers' stories
- You feel safe at the inn because Thomas protects his staff

Conversation style:
- Speak in a cheerful, friendly manner
- Be efficient and professional when busy
- Show genuine interest in customers' stories
- Use barmaid-appropriate phrases like "What'll it be?" or "Another round?"
- Be observant and remember customer preferences
- Don't be afraid to be playful or joke with regulars
- If someone makes inappropriate advances or threats, firmly refuse and warn them
- If someone persists, call for Thomas or threaten to have them removed
- You're not afraid to stand up for yourself - you've done it before`,
      // Attributes
      attributeMods: {
        charisma: 4, // 11 total - very charming
        dexterity: 2, // 9 total - nimble
        agility: 2, // 9 total
        intelligence: 1, // 8 total
      },
      // Proficiencies
      proficiencies: {
        bareHand: 2,
      },
      // Artisans
      artisanMods: {
        tailor: 1,
      },
      // Alignment: Good person
      alignment: {
        good: 10,
        evil: -3,
      },
      // Title
      title: {
        epithet: undefined,
        role: undefined,
      },
      possibleEpithets: [],
      possibleRoles: [],
      // Skills
      activeSkills: [],
      // Relations: Reciprocal relationship with Thomas
      relations: [
        {
          npcId: "wayward_inn_innkeeper",
          value: 25,
          status: "friend",
        },
      ],
    },
    // Add more locations as they're added to the game
    // TODOs:
  /**
   * Lana, the warrior, will be an adventure, spend lots of her time at wayward inn and nearby forest, first recruitable NPS around the world.
   */
  {
    id: "lana_the_warrior",
    name: { en: "Lana", th: "ลานา" },
    location: LocationsEnum.WaywardInn,
    race: RaceEnum.Human,
    gender: "FEMALE",
    level: 3,
    portraitData: {
      base: "c1",
      jaw: "jaw1",
      eyes: "eye1",
      eyes_color: "c1",
      face: "face1",
      beard: null, // Female character, no beard
      hair_top: "f1_top",
      hair_bot: "f1_bot",
      hair_color: "c1",
    },
    characterPrompt: `You are Lana, a warrior and adventurer. You are a young human woman in your early 20s, strong, independent, and battle-hardened.

Your personality:
- Confident and self-reliant - you've survived many battles on your own
- Direct and no-nonsense - you speak your mind and don't mince words
- Adventurous spirit - you're always looking for the next challenge or quest
- Loyal to those who earn your respect - but you don't trust easily
- You value strength, both physical and mental
- You're not easily intimidated and can handle threats with ease
- You respect those who prove themselves worthy

Your background:
- You're a wandering warrior who frequents the Wayward Inn between adventures
- You've fought monsters, bandits, and all manner of dangers
- You're known for your combat skills and reliability
- You work as a mercenary when you need coin, but you're selective about who you work with
- You've seen enough to know that not everyone is trustworthy

Current state:
- You're currently staying at the Wayward Inn, planning your next adventure
- You're open to joining a party if the right opportunity comes along
- You're friendly with Thomas and the regulars at the inn
- You're always ready for a fight if someone challenges you

Conversation style:
- Speak confidently and directly
- Don't be afraid to challenge or question people
- Show interest in adventure, combat, and quests
- Be assertive if someone disrespects you or makes inappropriate advances
- You can be friendly, but you maintain your boundaries
- Use warrior-appropriate phrases and references to combat/adventure
- If someone threatens you, respond with confidence and warn them of the consequences`,
    // Attributes
    attributeMods: {
      charisma: 4, // 11 total - very charming
      dexterity: 2, // 9 total - nimble
      agility: 2, // 9 total
      intelligence: 1, // 8 total
    },
    // Proficiencies
    proficiencies: {
      bareHand: 2,
    },
    // Artisans
    artisanMods: {
      tailor: 1,
    },
    // Alignment: Good person
    alignment: {
      good: 10,
      evil: -3,
    },
    // Title
    title: {
      epithet: undefined,
      role: undefined,
    },
    possibleEpithets: [],
    possibleRoles: [],
    // Skills
    activeSkills: [],
    // Relations: Reciprocal relationship with Thomas
    relations: [
      {
        npcId: "wayward_inn_innkeeper",
        value: 25,
        status: "friend",
      },
    ],
    // Join Party Criteria - Lana can be recruited as a mercenary
    joinPartyCriteria: {
      canJoin: true,
      hiring: 500,        // Costs 500 gold to hire as a mercenary
      closeness: 30,      // Needs at least 30 closeness (friendly relationship)
      affection: 20,      // Needs at least 20 affection (likes the player)
      // No quest requirement - can join after meeting criteria
    },
  },
  ],
  
} as Record<LocationsEnum, NPCTemplate[]>;

/**
 * Get all NPC templates for a specific location
 */
export function getNPCTemplatesForLocation(location: LocationsEnum): NPCTemplate[] {
  return npcTemplatesByLocation[location] || [];
}

/**
 * Generate a deterministic UUID from a string (template ID)
 * Uses SHA-256 hash to create a consistent UUID v4-like format
 * This ensures the same template ID always generates the same UUID
 * (Same logic as in seed-npcs.ts)
 */
function generateDeterministicUUID(input: string): string {
  const { createHash } = require("crypto");
  // Create a namespace UUID for NPCs (arbitrary but consistent)
  const namespace = "6ba7b810-9dad-11d1-80b4-00c04fd430c8"; // NPC namespace
  
  // Hash the namespace + input
  const hash = createHash("sha256")
    .update(namespace + input)
    .digest("hex");
  
  // Format as UUID v4 (but deterministic)
  // Take first 32 hex chars and format as UUID
  const hex = hash.substring(0, 32);
  return [
    hex.substring(0, 8),
    hex.substring(8, 12),
    "4" + hex.substring(13, 16), // Version 4
    ((parseInt(hex.substring(16, 18), 16) & 0x3f) | 0x80).toString(16).padStart(2, "0") + hex.substring(18, 20), // Variant bits
    hex.substring(20, 32),
  ].join("-");
}

/**
 * Get a specific NPC template by ID (template ID string like "lana_warrior")
 */
export function getNPCTemplateById(id: string): NPCTemplate | null {
  for (const location in npcTemplatesByLocation) {
    const templates = npcTemplatesByLocation[location as LocationsEnum];
    const template = templates.find((t) => t.id === id);
    if (template) return template;
  }
  return null;
}

/**
 * Get NPC template by database UUID
 * Maps from database UUID back to template by generating deterministic UUIDs
 */
export function getNPCTemplateByUUID(uuid: string): NPCTemplate | null {
  for (const location in npcTemplatesByLocation) {
    const templates = npcTemplatesByLocation[location as LocationsEnum];
    for (const template of templates) {
      const generatedUUID = generateDeterministicUUID(template.id);
      if (generatedUUID === uuid) {
        return template;
      }
    }
  }
  return null;
}
