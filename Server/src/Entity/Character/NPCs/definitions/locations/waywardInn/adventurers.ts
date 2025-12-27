import { RaceEnum } from "src/InterFacesEnumsAndTypes/Enums";
import { NPCsParty, NPCTemplate } from "../../../types";
import { PartyActionSequence } from "src/Entity/Party/ActionlSequence/PartyActionSequence";
import { DayOfWeek, TimeOfDay } from "src/InterFacesEnumsAndTypes/Time";
import {
  ActionInput,
  CharacterActionSequence,
} from "src/Entity/Character/Subclass/Action/CharacterAction";
import { NPCEnums } from "../../../enum";
import { warriorWeaponMaster } from "../../../utils/NPCskillPreset";

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

export const lana: NPCTemplate = {
  id: NPCEnums.luna,
  name: { en: "Lana", th: "ลานา" },
  race: RaceEnum.Human,
  gender: "FEMALE",
  level: 3,
  portraitData: {
    base: "c1",
    jaw: "jaw1",
    eyes: "eye1",
    eyes_color: "c6",
    face: "face3",
    beard: null, // Female character, no beard
    hair_top: "f9_top",
    hair_bot: "f9_bot",
    hair_color: "c2",
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
    strength: 4, // 11 total - very strong
    dexterity: 2, // 9 total - nimble
    agility: 2, // 9 total
    endurance: 2, // 9 total
  },
  // Proficiencies
  proficiencies: {
    bareHand: 3,
    sword: 3,
    shield: 2,
  },
  // Artisans
  artisanMods: {},
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
  // Skills - Warrior/Adventurer: Versatile combat skills
  ...(() => {
    const preset = warriorWeaponMaster(3);
    return {
      activeSkills: preset.activeDeck,
      conditionalSkills: preset.conditionalDeck,
      skills: preset.skills,
      conditionalSkillsCondition: preset.conditionalDeckCondition,
    };
  })(),

  // Relations: Friendly with Thomas
  relations: [
    {
      npcId: "wayward_inn_innkeeper",
      value: 15, // Friendly but not close
      status: "friend",
    },
  ],
  // Join Party Criteria - Lana can be recruited as a mercenary
  joinPartyCriteria: {
    canJoin: true,
    hiring: 500, // Costs 500 gold to hire as a mercenary
    closeness: 30, // Needs at least 30 closeness (friendly relationship)
    affection: 20, // Needs at least 20 affection (likes the player)
    // No quest requirement - can join after meeting criteria
  },
  // Default schedules for adventurer
  defaultCharacterActionSequence: characterActionSequence,
};

export const adventurers: NPCsParty = {
  partyId: NPCEnums.luna,
  npcs: [lana],
  defaultPartyActionSequence: partyActionSequence,
};
