import { RaceEnum } from "src/InterFacesEnumsAndTypes/Enums";
import { NPCsParty, NPCTemplate } from "../../../types";
import { PartyActionSequence } from "src/Entity/Party/ActionlSequence/PartyActionSequence";
import { DayOfWeek, TimeOfDay } from "src/InterFacesEnumsAndTypes/Time";
import {
  ActionInput,
  CharacterActionSequence,
} from "src/Entity/Character/Subclass/Action/CharacterAction";
import { NPCEnums } from "../../../enum";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { guardianSentinel, warriorWeaponMaster, clericHeal, rogueStealth } from "../../../utils/NPCskillPreset";

const characterActionSequence: CharacterActionSequence = {
  [DayOfWeek.laoh]: {
    [TimeOfDay.morning]: { type: ActionInput.Rest },
    [TimeOfDay.afternoon]: { type: ActionInput.Rest },
    [TimeOfDay.evening]: { type: ActionInput.Tavern },
    [TimeOfDay.night]: { type: ActionInput.Rest },
  },
  [DayOfWeek.rowana]: {
    [TimeOfDay.morning]: { type: ActionInput.Rest },
    [TimeOfDay.afternoon]: { type: ActionInput.Rest },
    [TimeOfDay.evening]: { type: ActionInput.Tavern },
    [TimeOfDay.night]: { type: ActionInput.Rest },
  },
  [DayOfWeek.aftree]: {
    [TimeOfDay.morning]: { type: ActionInput.Rest },
    [TimeOfDay.afternoon]: { type: ActionInput.Rest },
    [TimeOfDay.evening]: { type: ActionInput.Tavern },
    [TimeOfDay.night]: { type: ActionInput.Rest },
  },
  [DayOfWeek.udur]: {
    [TimeOfDay.morning]: { type: ActionInput.Rest },
    [TimeOfDay.afternoon]: { type: ActionInput.Rest },
    [TimeOfDay.evening]: { type: ActionInput.Tavern },
    [TimeOfDay.night]: { type: ActionInput.Rest },
  },
  [DayOfWeek.matris]: {
    [TimeOfDay.morning]: { type: ActionInput.Rest },
    [TimeOfDay.afternoon]: { type: ActionInput.Rest },
    [TimeOfDay.evening]: { type: ActionInput.Tavern },
    [TimeOfDay.night]: { type: ActionInput.Rest },
  },
  [DayOfWeek.seethar]: {
    [TimeOfDay.morning]: { type: ActionInput.Rest },
    [TimeOfDay.afternoon]: { type: ActionInput.Rest },
    [TimeOfDay.evening]: { type: ActionInput.Tavern },
    [TimeOfDay.night]: { type: ActionInput.Rest },
  },
};

const partyActionSequence: PartyActionSequence = {
  [DayOfWeek.laoh]: {
    [TimeOfDay.morning]: ActionInput.Inn,
    [TimeOfDay.afternoon]: ActionInput.Inn,
    [TimeOfDay.evening]: ActionInput.Inn,
    [TimeOfDay.night]: ActionInput.Inn,
  },
  [DayOfWeek.rowana]: {
    [TimeOfDay.morning]: ActionInput.Inn,
    [TimeOfDay.afternoon]: ActionInput.Inn,
    [TimeOfDay.evening]: ActionInput.Inn,
    [TimeOfDay.night]: ActionInput.Inn,
  },
  [DayOfWeek.aftree]: {
    [TimeOfDay.morning]: ActionInput.Inn,
    [TimeOfDay.afternoon]: ActionInput.Inn,
    [TimeOfDay.evening]: ActionInput.Inn,
    [TimeOfDay.night]: ActionInput.Inn,
  },
  [DayOfWeek.udur]: {
    [TimeOfDay.morning]: ActionInput.Inn,
    [TimeOfDay.afternoon]: ActionInput.Inn,
    [TimeOfDay.evening]: ActionInput.Inn,
    [TimeOfDay.night]: ActionInput.Inn,
  },
  [DayOfWeek.matris]: {
    [TimeOfDay.morning]: ActionInput.Inn,
    [TimeOfDay.afternoon]: ActionInput.Inn,
    [TimeOfDay.evening]: ActionInput.Inn,
    [TimeOfDay.night]: ActionInput.Inn,
  },
  [DayOfWeek.seethar]: {
    [TimeOfDay.morning]: ActionInput.Inn,
    [TimeOfDay.afternoon]: ActionInput.Inn,
    [TimeOfDay.evening]: ActionInput.Inn,
    [TimeOfDay.night]: ActionInput.Inn,
  },
};

// 1. Edda Claymere - Village Head / Grain Allocator
export const edda: NPCTemplate = {
  id: NPCEnums.edda,
  name: { en: "Edda Claymere", th: "เอดดา เคลย์เมียร์" },
  race: RaceEnum.Human,
  gender: "FEMALE",
  level: 3,
  background: "noble",
  portraitData: {
    base: "c3",
    jaw: "jaw2",
    eyes: "eye4",
    eyes_color: "c2",
    face: "face3",
    beard: null,
    hair_top: "f3_top",
    hair_bot: "f3_bot",
    hair_color: "c5",
  },
  characterPrompt: `You are Edda Claymere, the Village Head of Brayhorn Village. You coordinate planting, storage, and taxes. You are the gatekeeper of village truth - you know when things are "off" but will downplay danger until it can't be hidden. You rarely leave Brayhorn, only traveling to Wayward Inn during disputes, shortages, or festivals.`,
  attributeMods: {
    intelligence: 3,
    leadership: 4,
    charisma: 2,
    willpower: 2,
  },
  proficiencies: {},
  artisanMods: {},
  alignment: {
    good: 10,
    evil: -3,
  },
  title: {
    role: undefined,
    epithet: undefined,
  },
  // Skills - Village Head: Leadership and protection skills
  ...(() => {
    const preset = guardianSentinel(3);
    return {
      activeSkills: preset.activeDeck,
      conditionalSkills: preset.conditionalDeck,
      skills: preset.skills,
      conditionalSkillsCondition: preset.conditionalDeckCondition,
    };
  })(),
  relations: [],
  defaultCharacterActionSequence: characterActionSequence,
  // Travel Schedule: Rarely travels, mostly stays at home
  // For now, no travel events (stays at home). Conditional travel can be added later.
  travelSchedule: {
    homeLocation: LocationsEnum.BrayhornVillage,
    events: [], // No regular travel - only conditional (to be implemented)
  },
};

// 2. Harl Brenwick - Carter / Informal Guard
export const harl: NPCTemplate = {
  id: NPCEnums.harl,
  name: { en: "Harl Brenwick", th: "ฮาร์ล เบรนวิค" },
  race: RaceEnum.Human,
  gender: "MALE",
  level: 3,
  background: "merchant",
  portraitData: {
    base: "c5",
    jaw: "jaw3",
    eyes: "eye2",
    eyes_color: "c1",
    face: "face2",
    beard: 4,
    hair_top: "m4_top",
    hair_bot: "m4_bot",
    hair_color: "c7",
  },
  characterPrompt: `You are Harl Brenwick, a carter and informal guard in Brayhorn Village. You escort grain and watch roads. You make regular trips to Goldentide Field and occasional trips to Wayward Inn (always staying overnight). You're the first contact NPC - you talk about wolves, missing tools, broken fences. You notice patterns, not causes.`,
  attributeMods: {
    strength: 2,
    endurance: 2,
    dexterity: 1,
    agility: 1,
  },
  proficiencies: {},
  artisanMods: {},
  alignment: {
    good: 5,
    evil: -2,
  },
  title: {
    role: undefined,
    epithet: undefined,
  },
  // Skills - Carter/Guard: Combat skills for protection
  ...(() => {
    const preset = warriorWeaponMaster(3);
    return {
      activeSkills: preset.activeDeck,
      conditionalSkills: preset.conditionalDeck,
      skills: preset.skills,
      conditionalSkillsCondition: preset.conditionalDeckCondition,
    };
  })(),
  relations: [],
  defaultCharacterActionSequence: characterActionSequence,
  // Travel Schedule: Regular trips to Goldentide Field, occasional trips to Wayward Inn
  travelSchedule: {
    homeLocation: LocationsEnum.BrayhornVillage,
    events: [
      {
        destination: LocationsEnum.GoldentideField,
        day: DayOfWeek.rowana, // Every week on Rowana
        phase: TimeOfDay.morning,
        frequency: 'weekly',
      },
      {
        destination: LocationsEnum.BrayhornVillage, // Return home
        day: DayOfWeek.rowana,
        phase: TimeOfDay.evening,
        frequency: 'weekly',
      },
      {
        destination: LocationsEnum.WaywardInn,
        day: DayOfWeek.aftree, // Occasional trips
        phase: TimeOfDay.morning,
        frequency: 'weekly',
      },
      {
        destination: LocationsEnum.BrayhornVillage, // Return from Inn
        day: DayOfWeek.udur,
        phase: TimeOfDay.morning,
        frequency: 'weekly',
      },
    ],
  },
};

// 3. Sera Loam - Field Healer / Midwife
export const sera: NPCTemplate = {
  id: NPCEnums.sera,
  name: { en: "Sera Loam", th: "เซรา โลม" },
  race: RaceEnum.Human,
  gender: "FEMALE",
  level: 2,
  background: "scholar",
  portraitData: {
    base: "c2",
    jaw: "jaw1",
    eyes: "eye3",
    eyes_color: "c3",
    face: "face4",
    beard: null,
    hair_top: "f2_top",
    hair_bot: "f2_bot",
    hair_color: "c4",
  },
  characterPrompt: `You are Sera Loam, a field healer and midwife in Brayhorn Village. You are the moral compass and consequence tracker. You know who is hurt before anyone panics. You make field visits and rare Inn stays when treating travelers or collecting supplies.`,
  attributeMods: {
    intelligence: 2,
    willpower: 2,
    charisma: 1,
  },
  proficiencies: {},
  artisanMods: {},
  alignment: {
    good: 15,
    evil: -5,
  },
  title: {
    role: undefined,
    epithet: undefined,
  },
  // Skills - Healer: Cleric healing skills
  ...(() => {
    const preset = clericHeal(2);
    return {
      activeSkills: preset.activeDeck,
      conditionalSkills: preset.conditionalDeck,
      skills: preset.skills,
      conditionalSkillsCondition: preset.conditionalDeckCondition,
    };
  })(),
  relations: [],
  defaultCharacterActionSequence: characterActionSequence,
  // Travel Schedule: Field visits, rare Inn stays
  travelSchedule: {
    homeLocation: LocationsEnum.BrayhornVillage,
    events: [
      {
        destination: LocationsEnum.GoldentideField,
        day: DayOfWeek.aftree, // Field visits
        phase: TimeOfDay.morning,
        frequency: 'weekly',
      },
      {
        destination: LocationsEnum.BrayhornVillage, // Return
        day: DayOfWeek.aftree,
        phase: TimeOfDay.evening,
        frequency: 'weekly',
      },
    ],
  },
};

// 4. Joren Pike - Young Scout / Messenger
export const joren: NPCTemplate = {
  id: NPCEnums.joren,
  name: { en: "Joren Pike", th: "โจเรน ไพค์" },
  race: RaceEnum.Human,
  gender: "MALE",
  level: 2,
  background: "wanderer",
  portraitData: {
    base: "c4",
    jaw: "jaw4",
    eyes: "eye5",
    eyes_color: "c1",
    face: "face5",
    beard: null,
    hair_top: "m2_top",
    hair_bot: "m2_bot",
    hair_color: "c6",
  },
  characterPrompt: `You are Joren Pike, a young scout and messenger from Brayhorn Village. You bring news badly and are often late. You're easily frightened, but honest. You regularly travel between Brayhorn and Goldentide Field, and are occasionally sent to Wayward Inn.`,
  attributeMods: {
    agility: 3,
    dexterity: 2,
    luck: 1,
  },
  proficiencies: {},
  artisanMods: {},
  alignment: {
    good: 8,
    evil: -2,
  },
  title: {
    role: undefined,
    epithet: undefined,
  },
  // Skills - Scout: Rogue stealth skills for scouting
  ...(() => {
    const preset = rogueStealth(2);
    return {
      activeSkills: preset.activeDeck,
      conditionalSkills: preset.conditionalDeck,
      skills: preset.skills,
      conditionalSkillsCondition: preset.conditionalDeckCondition,
    };
  })(),
  relations: [],
  defaultCharacterActionSequence: characterActionSequence,
  // Travel Schedule: Frequent travel between Brayhorn and Goldentide Field, occasional trips to Inn
  travelSchedule: {
    homeLocation: LocationsEnum.BrayhornVillage,
    events: [
      {
        destination: LocationsEnum.GoldentideField,
        day: DayOfWeek.laoh, // Regular messenger runs
        phase: TimeOfDay.morning,
        frequency: 'weekly',
      },
      {
        destination: LocationsEnum.BrayhornVillage,
        day: DayOfWeek.laoh,
        phase: TimeOfDay.afternoon,
        frequency: 'weekly',
      },
      {
        destination: LocationsEnum.GoldentideField,
        day: DayOfWeek.udur, // Another run later in week
        phase: TimeOfDay.morning,
        frequency: 'weekly',
      },
      {
        destination: LocationsEnum.BrayhornVillage,
        day: DayOfWeek.udur,
        phase: TimeOfDay.afternoon,
        frequency: 'weekly',
      },
      {
        destination: LocationsEnum.WaywardInn, // Occasional trips
        day: DayOfWeek.matris,
        phase: TimeOfDay.morning,
        frequency: 'weekly',
      },
      {
        destination: LocationsEnum.BrayhornVillage,
        day: DayOfWeek.matris,
        phase: TimeOfDay.night,
        frequency: 'weekly',
      },
    ],
  },
};

// 5. Mirel Dane - Storekeeper / Supply Clerk
export const mirel: NPCTemplate = {
  id: NPCEnums.mirel,
  name: { en: "Mirel Dane", th: "มิเรล เดน" },
  race: RaceEnum.Human,
  gender: "FEMALE",
  level: 2,
  background: "merchant",
  portraitData: {
    base: "c6",
    jaw: "jaw5",
    eyes: "eye6",
    eyes_color: "c2",
    face: "face2",
    beard: null,
    hair_top: "f4_top",
    hair_bot: "f4_bot",
    hair_color: "c8",
  },
  characterPrompt: `You are Mirel Dane, the storekeeper and supply clerk in Brayhorn Village. You're the economic pressure indicator - first to notice shortages. You complain before crisis hits. You avoid travel whenever possible, but make rare trips to Greengate Station (via Inn, multi-day journey) when necessary.`,
  attributeMods: {
    intelligence: 2,
    charisma: 1,
    luck: 1,
  },
  proficiencies: {},
  artisanMods: {},
  alignment: {
    good: 3,
    evil: -3,
  },
  title: {
    role: undefined,
    epithet: undefined,
  },
  // Skills - Storekeeper: Rogue skills for business savvy
  ...(() => {
    const preset = rogueStealth(2);
    return {
      activeSkills: preset.activeDeck,
      conditionalSkills: preset.conditionalDeck,
      skills: preset.skills,
      conditionalSkillsCondition: preset.conditionalDeckCondition,
    };
  })(),
  relations: [],
  defaultCharacterActionSequence: characterActionSequence,
  // Travel Schedule: Very rare trips (for now, stays at home - can add conditional trips later)
  travelSchedule: {
    homeLocation: LocationsEnum.BrayhornVillage,
    events: [], // No regular travel - only conditional when needed (to be implemented)
  },
};

// Individual NPC parties
export const eddaParty: NPCsParty = {
  partyId: NPCEnums.edda,
  npcs: [edda],
  defaultPartyActionSequence: partyActionSequence,
};

export const harlParty: NPCsParty = {
  partyId: NPCEnums.harl,
  npcs: [harl],
  defaultPartyActionSequence: partyActionSequence,
};

export const seraParty: NPCsParty = {
  partyId: NPCEnums.sera,
  npcs: [sera],
  defaultPartyActionSequence: partyActionSequence,
};

export const jorenParty: NPCsParty = {
  partyId: NPCEnums.joren,
  npcs: [joren],
  defaultPartyActionSequence: partyActionSequence,
};

export const mirelParty: NPCsParty = {
  partyId: NPCEnums.mirel,
  npcs: [mirel],
  defaultPartyActionSequence: partyActionSequence,
};

