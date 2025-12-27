import {
  ActionInput,
  CharacterActionSequence,
} from "src/Entity/Character/Subclass/Action/CharacterAction";
import { PartyActionSequence } from "src/Entity/Party/ActionlSequence/PartyActionSequence";
import { DayOfWeek, TimeOfDay } from "src/InterFacesEnumsAndTypes/Time";
import { NPCsParty, NPCTemplate } from "../../../types";
import { RaceEnum } from "src/InterFacesEnumsAndTypes/Enums";
import { NPCEnums } from "../../../enum";
import { guardianSentinel, rogueStealth } from "../../../utils/NPCskillPreset";

const innStaffPartyActionSequence: PartyActionSequence = {
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

const innStaffCharacterActionSequence: CharacterActionSequence = {
  [DayOfWeek.laoh]: {
    [TimeOfDay.morning]: { type: ActionInput.Tavern },
    [TimeOfDay.afternoon]: { type: ActionInput.Tavern },
    [TimeOfDay.evening]: { type: ActionInput.Tavern },
    [TimeOfDay.night]: { type: ActionInput.Rest },
  },
  [DayOfWeek.rowana]: {
    [TimeOfDay.morning]: { type: ActionInput.Tavern },
    [TimeOfDay.afternoon]: { type: ActionInput.Tavern },
    [TimeOfDay.evening]: { type: ActionInput.Tavern },
    [TimeOfDay.night]: { type: ActionInput.Rest },
  },
  [DayOfWeek.aftree]: {
    [TimeOfDay.morning]: { type: ActionInput.Tavern },
    [TimeOfDay.afternoon]: { type: ActionInput.Tavern },
    [TimeOfDay.evening]: { type: ActionInput.Tavern },
    [TimeOfDay.night]: { type: ActionInput.Rest },
  },
  [DayOfWeek.udur]: {
    [TimeOfDay.morning]: { type: ActionInput.Tavern },
    [TimeOfDay.afternoon]: { type: ActionInput.Tavern },
    [TimeOfDay.evening]: { type: ActionInput.Tavern },
    [TimeOfDay.night]: { type: ActionInput.Rest },
  },
  [DayOfWeek.matris]: {
    [TimeOfDay.morning]: { type: ActionInput.Tavern },
    [TimeOfDay.afternoon]: { type: ActionInput.Tavern },
    [TimeOfDay.evening]: { type: ActionInput.Tavern },
    [TimeOfDay.night]: { type: ActionInput.Rest },
  },
  [DayOfWeek.seethar]: {
    [TimeOfDay.morning]: { type: ActionInput.Tavern },
    [TimeOfDay.afternoon]: { type: ActionInput.Tavern },
    [TimeOfDay.evening]: { type: ActionInput.Tavern },
    [TimeOfDay.night]: { type: ActionInput.Rest },
  },
};

export const thomas: NPCTemplate = {
  /**
   * Thomas is the innkeeper at the wayward inn, will be a character where people met a lot cause it's the starting place
   * Might need him to be rememberable, so might need to be a bit more interesting than just a basic innkeeper
   */
  id: NPCEnums.thomas,
  name: { en: "Thomas", th: "โทมัส" },
  race: RaceEnum.Orc,
  gender: "MALE",
  level: 3,
  background: "innkeeper",
  portraitData: {
    base: "c4",
    jaw: "jaw4",
    eyes: "eye2",
    eyes_color: "c1",
    face: "face2",
    beard: 6,
    hair_top: "m13_top",
    hair_bot: "m13_bot",
    hair_color: "c8",
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

  attributeMods: {
    charisma: 3,
    leadership: 2,
    intelligence: 1,
    vitality: 1,
  },

  proficiencies: {
    bareHand: 3,
    hammer: 2,
  },

  artisanMods: {
    weaving: 2,
    carpentry: 1,
  },

  alignment: {
    good: 15,
    evil: -5,
  },

  title: {
    epithet: undefined,
    role: undefined,
  },
  // Skills - Innkeeper: Protective skills to defend his inn
  ...(() => {
    const preset = guardianSentinel(3);
    return {
      activeSkills: preset.activeDeck,
      conditionalSkills: preset.conditionalDeck,
      skills: preset.skills,
      conditionalSkillsCondition: preset.conditionalDeckCondition,
    };
  })(),

  relations: [
    {
      npcId: "wayward_inn_barmaid",
      value: 25,
      status: "friend",
    },
  ],
  defaultCharacterActionSequence: innStaffCharacterActionSequence,
};

export const sarah: NPCTemplate = {
  id: NPCEnums.sarah,
  name: { en: "Sarah", th: "ซาราห์" },
  race: RaceEnum.Human,
  gender: "FEMALE",
  level: 3,
  background: "service",
  portraitData: {
    base: "c1",
    jaw: "jaw2",
    eyes: "eye5",
    eyes_color: "c3",
    face: "face3",
    beard: 1,
    hair_top: "f6_top",
    hair_bot: "f6_bot",
    hair_color: "c3",
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
    weaving: 1,
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
  // Skills - Barmaid: Agile skills to handle rowdy customers
  ...(() => {
    const preset = rogueStealth(3);
    return {
      activeSkills: preset.activeDeck,
      conditionalSkills: preset.conditionalDeck,
      skills: preset.skills,
      conditionalSkillsCondition: preset.conditionalDeckCondition,
    };
  })(),

  // Relations: Reciprocal relationship with Thomas
  relations: [
    {
      npcId: "wayward_inn_innkeeper",
      value: 25,
      status: "friend",
    },
  ],
  defaultCharacterActionSequence: innStaffCharacterActionSequence,
};

export const barKeepers: NPCsParty = {
  partyId: NPCEnums.thomas,
  npcs: [thomas, sarah],
  defaultPartyActionSequence: innStaffPartyActionSequence,
};
