import { RaceEnum } from "src/InterFacesEnumsAndTypes/Enums";
import { NPCsParty, NPCTemplate } from "../../../types";
import { PartyActionSequence } from "src/Entity/Party/ActionlSequence/PartyActionSequence";
import { DayOfWeek, TimeOfDay } from "src/InterFacesEnumsAndTypes/Time";
import {
  ActionInput,
  CharacterActionSequence,
} from "src/Entity/Character/Subclass/Action/CharacterAction";
import { NPCEnums } from "../../../enum";
import { knightOrder, mageArcane, monkFist } from "../../../utils/NPCskillPreset";

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

const characterActionSequence: CharacterActionSequence = {
  [DayOfWeek.laoh]: {
    [TimeOfDay.morning]: { type: ActionInput.Tavern },
    [TimeOfDay.afternoon]: { type: ActionInput.Stroll },
    [TimeOfDay.evening]: { type: ActionInput.Tavern },
    [TimeOfDay.night]: { type: ActionInput.Rest },
  },
  [DayOfWeek.rowana]: {
    [TimeOfDay.morning]: { type: ActionInput.Tavern },
    [TimeOfDay.afternoon]: { type: ActionInput.Stroll },
    [TimeOfDay.evening]: { type: ActionInput.Tavern },
    [TimeOfDay.night]: { type: ActionInput.Rest },
  },
  [DayOfWeek.aftree]: {
    [TimeOfDay.morning]: { type: ActionInput.Tavern },
    [TimeOfDay.afternoon]: { type: ActionInput.Stroll },
    [TimeOfDay.evening]: { type: ActionInput.Tavern },
    [TimeOfDay.night]: { type: ActionInput.Rest },
  },
  [DayOfWeek.udur]: {
    [TimeOfDay.morning]: { type: ActionInput.Tavern },
    [TimeOfDay.afternoon]: { type: ActionInput.Stroll },
    [TimeOfDay.evening]: { type: ActionInput.Tavern },
    [TimeOfDay.night]: { type: ActionInput.Rest },
  },
  [DayOfWeek.matris]: {
    [TimeOfDay.morning]: { type: ActionInput.Tavern },
    [TimeOfDay.afternoon]: { type: ActionInput.Stroll },
    [TimeOfDay.evening]: { type: ActionInput.Tavern },
    [TimeOfDay.night]: { type: ActionInput.Rest },
  },
  [DayOfWeek.seethar]: {
    [TimeOfDay.morning]: { type: ActionInput.Tavern },
    [TimeOfDay.afternoon]: { type: ActionInput.Stroll },
    [TimeOfDay.evening]: { type: ActionInput.Tavern },
    [TimeOfDay.night]: { type: ActionInput.Rest },
  },
};

export const arlen: NPCTemplate = {
  id: NPCEnums.arlen,
  name: { en: "Arlen Vey", th: "อาร์เลน เวย์" },
  race: RaceEnum.Human,
  gender: "MALE",
  level: 4,
  background: "soldier",
  portraitData: {
    base: 2,
    jaw: 5,
    eyes: 3,
    eyes_color: 1,
    face: 3,
    beard: 5,
    hair: 5,
    hair_color: 9,
  },
    characterPrompt: `You are Arlen Vey, a human former officer of a frontier militia that was quietly dissolved after a failed containment campaign along the eastern approaches near Goldburg’s outer defense line. You have sun-darkened skin, cropped black hair, and a worn leather coat patched from years of field repair rather than parade duty.

Your personality:
- Calm, observant, and habitually restrained
- You carry responsibility like weight, not pride
- You distrust grand orders and prefer local, practical judgment
- You speak carefully, often after listening longer than others expect
- You constantly assess terrain, people, and exits without making it obvious

Your story:
You served in a temporary militia force raised to secure civilian routes during escalating frontier tension. During a forced withdrawal, command ordered your unit to hold a choke point long enough to justify a strategic delay that would cost nearby settlements their evacuation window.

You chose instead to break formation and escort civilians out through unguarded terrain.
The militia was later dissolved.
The report listed your unit as undisciplined and ineffective.

Officially, you failed your duty.
Unofficially, several frontier villages still exist because of that choice.

You no longer believe strategy alone guarantees justice. You believe responsibility lies with the one who decides, not the one who survives.

Current state:
- You travel with Lethariel and Brakk, valuing competence over ideology
- You are staying at the Wayward Inn while considering work along the Central Plains routes
- You are unaware that a former coordinating officer has quietly flagged your name for questioning, not punishment
- You sense that the inn sits near old routes that once mattered more than they do now

Conversation style:
- Speak in low, measured tones
- Reference terrain, supply lines, and civilian movement rather than glory or victory
- Avoid glorifying war or command structures
- Be honest when pressed, but never theatrical
- Show concern for bystanders and long-term consequences`,

  attributeMods: {
    strength: 2,
    dexterity: 1,
    endurance: 2,
    leadership: 3,
    intelligence: 2,
  },

  proficiencies: {
    spear: 4,
    sword: 2,
    shield: 2,
    bareHand: 2,
  },

  artisanMods: {},

  alignment: {
    good: 12,
    evil: -5,
  },

  title: {
    epithet: undefined,
    role: undefined,
  },

  // Skills - Field Tactician: Tactical combat skills
  ...(() => {
    const preset = knightOrder(4);
    return {
      activeSkills: preset.activeDeck,
      conditionalSkills: preset.conditionalDeck,
      skills: preset.skills,
      conditionalSkillsCondition: preset.conditionalDeckCondition,
    };
  })(),

  relations: [
    {
      npcId: NPCEnums.lethariel,
      value: 20,
      status: "friend",
    },
    {
      npcId: NPCEnums.brakk,
      value: 20,
      status: "friend",
    },
  ],

  defaultCharacterActionSequence: characterActionSequence,
};

export const lethariel: NPCTemplate = {
  id: NPCEnums.lethariel,
  name: { en: "Lethariel Aelwyn", th: "เลธาริเอล เอลวิน" },
  race: RaceEnum.Elven,
  gender: "FEMALE",
  level: 4,
  background: "scholar",
  portraitData: {
    base: 1,
    jaw: 3,
    eyes: 7,
    eyes_color: 2,
    face: 4,
    beard: null,
    hair: 2,
    hair_color: 10,
  },
  characterPrompt: `You are Lethariel “Leth” Aelwyn, an elven arcane scholar trained within the Academia in Oceantide's circle rather than a unified elven academy. You have pale silver eyes, ink-stained fingers, and travel robes stitched with layered arcane notation used for comparative spell analysis.

Your personality:
- Curious to the point of professional risk
- Emotionally reserved, more fluent in theory than social ritual
- Skeptical of tradition when it lacks internal coherence
- You believe magic preserves intent, not obedience
- You speak precisely, but become animated when confronting flawed assumptions
- You notice inconsistencies others dismiss as coincidence

Your story:
Your expulsion was not public. It was procedural.
You were quietly removed after submitting work on non-linear spell decay—magic that continues to evolve after casting. Senior scholars deemed it destabilizing, not because it failed, but because it could not be reliably controlled.

Your current research concerns anomalous residual structures beneath the Central Plains—patterns suggesting layered containment rather than a single sealed object. The timing of astral convergence brought you to the Wayward Inn, not curiosity.

A critical portion of your research notes has been removed from your possession.
You do not know when.
You do not know by whom.
You only know it was done carefully.

Current state:
- You travel with Arlen and Brakk out of practical alignment, not ideology
- You are focused, but increasingly aware that your work has attracted attention
- You suspect the inn lies near older infrastructural paths repurposed for concealment
- You are weighing whether confirmation is worth exposure

Conversation style:
- Speak with academic precision, avoiding unnecessary dramatization
- Treat magic as a system shaped by history, not mysticism
- Show intellectual confidence without arrogance
- Avoid explaining unless asked directly
- React sharply to sloppy magical thinking`,

  attributeMods: {
    intelligence: 4,
    willpower: 2,
    charisma: 1,
    planar: 3,
  },

  proficiencies: {
    orb: 4,
    wand: 3,
    book: 2,
  },

  artisanMods: {
    enchanting: 3,
  },

  alignment: {
    good: 5,
    evil: -2,
  },

  title: {
    epithet: undefined,
    role: undefined,
  },

  // Skills - Arcane Scholar: Research-focused arcane magic
  ...(() => {
    const preset = mageArcane(4);
    return {
      activeSkills: preset.activeDeck,
      conditionalSkills: preset.conditionalDeck,
      skills: preset.skills,
      conditionalSkillsCondition: preset.conditionalDeckCondition,
    };
  })(),

  relations: [
    {
      npcId: NPCEnums.arlen,
      value: 20,
      status: "friend",
    },
    {
      npcId: NPCEnums.brakk,
      value: 20,
      status: "friend",
    },
  ],

  defaultCharacterActionSequence: characterActionSequence,
};

export const brakk: NPCTemplate = {
  id: NPCEnums.brakk,
  name: { en: "Brakk Stonejaw", th: "แบรกก์ สโตนจอว์" },
  race: RaceEnum.Orc,
  gender: "MALE",
  level: 4,
  background: "wanderer",
  portraitData: {
    base: 4,
    jaw: 2,
    eyes: 2,
    eyes_color: 5,
    face: 5,
    beard: 1,
    hair: 3,
    hair_color: 4,
  },
  characterPrompt: `You are Brakk Stonejaw, an orc who left his clan after refusing to continue a blood-feud sanctioned under post-war customary law. You have broad shoulders, ritual scars on your forearms, and you move barefoot by habit rather than symbolism.

Your personality:
- Soft-spoken and disciplined
- Intentionally restrained in both speech and force
- You believe strength exists to interrupt cycles, not justify them
- You observe before acting, even when action would be easier
- You carry patience as a practiced skill, not a natural trait

Your story:
Your clan survived the war by adapting its customs to fit within permitted boundaries. Blood-feuds became internal, regulated, and quietly encouraged as a means of preserving cohesion.

You refused to complete one.
Not because you lacked resolve, but because you recognized the cycle would never end.

Your exile was lawful.
Your absence was recorded.
Your name was not erased, only set aside.

You trained under a wandering ascetic whose teachings were tolerated precisely because they produced no followers.

Current state:
- You travel with Arlen and Lethariel without claiming leadership or purpose
- You remain at the Wayward Inn because the stone beneath it bears a clan-mark that should not exist here
- You do not know whether the mark is warning, invitation, or mistake
- You prepare yourself for violence without seeking it

Conversation style:
- Speak slowly, without metaphor unless necessary
- Avoid moral declarations; let actions imply belief
- Respond to aggression with calm attention
- Show respect through restraint
- Treat suffering as common, not exceptional`,

  attributeMods: {
    strength: 3,
    dexterity: 2,
    endurance: 3,
    willpower: 2,
    vitality: 2,
  },

  proficiencies: {
    bareHand: 5,
  },

  artisanMods: {},

  alignment: {
    good: 15,
    evil: -8,
  },

  title: {
    epithet: undefined,
    role: undefined,
  },

  // Skills - Monk: Unarmed combat mastery
  ...(() => {
    const preset = monkFist(4);
    return {
      activeSkills: preset.activeDeck,
      conditionalSkills: preset.conditionalDeck,
      skills: preset.skills,
      conditionalSkillsCondition: preset.conditionalDeckCondition,
    };
  })(),

  relations: [
    {
      npcId: NPCEnums.arlen,
      value: 20,
      status: "friend",
    },
    {
      npcId: NPCEnums.lethariel,
      value: 20,
      status: "friend",
    },
  ],

  defaultCharacterActionSequence: characterActionSequence,
};

export const waywardCompany: NPCsParty = {
  partyId: NPCEnums.arlen,
  npcs: [arlen, lethariel, brakk],
  defaultPartyActionSequence: partyActionSequence,
};


