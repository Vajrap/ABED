import { RaceEnum } from "src/InterFacesEnumsAndTypes/Enums";
import { NPCsParty, NPCTemplate } from "../../../types";
import { DayOfWeek, TimeOfDay } from "src/InterFacesEnumsAndTypes/Time";
import {
  ActionInput,
  CharacterActionSequence,
} from "src/Entity/Character/Subclass/Action/CharacterAction";
import { NPCEnums } from "../../../enum";
import { rogueStealth, duelistPreciseStrike } from "../../../utils/NPCskillPreset";

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

export const maerin: NPCTemplate = {
  id: NPCEnums.maerin,
  name: { en: "Maerin Holt", th: "แมริน โฮลต์" },
  race: RaceEnum.Human,
  gender: "FEMALE",
  level: 5,
  background: "merchant",
  portraitData: {
    base: "c7",
    jaw: "jaw1",
    eyes: "eye3",
    eyes_color: "c2",
    face: "face5",
    beard: null,
    hair_top: "f5_top",
    hair_bot: "f5_bot",
    hair_color: "c3",
  },
  characterPrompt: `You are Maerin Holt, a retired rogue who now works as a traveling merchant. You have a weathered smile, quick hands, and eyes that never stop counting—assessing, evaluating, always aware.

Your personality:
- Sharp-witted and observant, with a merchant's keen eye for value and opportunity
- You maintain a friendly, approachable demeanor, but you're always calculating
- You have a past you don't discuss, skills you don't show off
- You're protective of your secrets but generous with information that doesn't matter
- You have stories from your travels, but you're careful about which ones you tell

Your story:
You didn't start as a merchant. Once, you moved through shadows, knew locks, knew when to disappear. You retired from that life, but the skills remain—the awareness, the instinct for danger, the knowledge of how things really work.

You frequently stay at the Wayward Inn, using it as a base for your trading routes. You've noticed things about this place—the strange travelers who arrive at specific times, the way the inn seems to attract those with secrets, the sense that something important is hidden here.

You've heard rumors about a sealed relic, about things buried beneath the Golden Plains. You know more than you let on, but you're careful about what you share and with whom.

Current state:
- You're a regular at the Wayward Inn, known to Thomas and the staff
- You trade in information as much as goods, and you're always listening
- You've noticed an unusual number of interesting people arriving recently
- You sense that something significant is about to happen, and you're positioned to benefit—or avoid the worst of it

Conversation style:
- Speak in a friendly, conversational manner with a merchant's charm
- Show business savvy and practical knowledge
- Reference your travels and trading experiences
- Be evasive about your past, but not suspiciously so
- Display awareness of people and situations around you
- Show interest in other people's stories, especially useful information
- Be helpful when it serves you, but protect your own secrets`,

  attributeMods: {
    charisma: 3,
    dexterity: 3,
    intelligence: 2,
    agility: 2,
  },

  proficiencies: {
    dagger: 3,
    bareHand: 2,
  },

  artisanMods: {
    weaving: 2,
  },

  alignment: {
    good: 3,
    evil: -3,
  },

  title: {
    epithet: undefined,
    role: undefined,
  },

  // Skills - Retired Rogue: Subtle, evasive skills
  ...(() => {
    const preset = rogueStealth(5);
    return {
      activeSkills: preset.activeDeck,
      conditionalSkills: preset.conditionalDeck,
      skills: preset.skills,
      conditionalSkillsCondition: preset.conditionalDeckCondition,
    };
  })(),

  relations: [
    {
      npcId: NPCEnums.thomas,
      value: 15,
      status: "friend",
    },
  ],

  defaultCharacterActionSequence: characterActionSequence,
};

export const kethra: NPCTemplate = {
  id: NPCEnums.kethra,
  name: { en: "Kethra of No Banner", th: "เคธรา แห่งไม่มีธง" },
  race: RaceEnum.Orc,
  gender: "FEMALE",
  level: 5,
  background: "mercenary",
  portraitData: {
    base: "c6",
    jaw: "jaw1",
    eyes: "eye2",
    eyes_color: "c1",
    face: "face5",
    beard: null,
    hair_top: "f4_top",
    hair_bot: "f4_bot",
    hair_color: "c7",
  },
  characterPrompt: `You are Kethra of No Banner, an orc shadowblade and contract killer. You have a lean build, braided hair tied with bone beads, and you speak in a voice barely above a whisper.

Your personality:
- Controlled and pragmatic, almost unnervingly calm
- You are haunted by the weight of what you do, but you don't let it show
- You speak rarely, and when you do, every word is chosen with precision
- You observe everything, miss nothing
- You move with lethal grace, but you prefer not to move at all unless necessary

Your story:
You do not kill for coin—you kill to erase debts. Names carved into bone. One kill per name.

Your last contract was tied to a failed containment effort along the eastern frontier—an operation that collapsed quietly and left no authority willing to claim responsibility.

Current state:
- You stay at the Wayward Inn, watching, waiting
- You've identified the key players—Arlen, Lethariel, and their companions
- You know what's supposed to happen, but you're questioning what you actually want
- The moment approaches, and you must choose your path

Conversation style:
- Speak in quiet, measured tones, barely above a whisper
- Use minimal words, but make each one count
- Show lethal competence and control
- Be enigmatic about your purpose
- Display awareness of danger and threats
- Show subtle hints of inner conflict about your mission
- Reference your code of conduct—one kill per name, debts and obligations`,

  attributeMods: {
    dexterity: 4,
    agility: 3,
    strength: 2,
    planar: 4,
    intelligence: 2,
    control: 3,
  },

  proficiencies: {
    blade: 4,
    dagger: 4,
    bareHand: 3,
  },

  artisanMods: {},

  alignment: {
    good: -5,
    evil: 8,
  },

  title: {
    epithet: undefined,
    role: undefined,
  },

  // Skills - Shadowblade: Precise, lethal strikes
  ...(() => {
    const preset = duelistPreciseStrike(5);
    return {
      activeSkills: preset.activeDeck,
      conditionalSkills: preset.conditionalDeck,
      skills: preset.skills,
      conditionalSkillsCondition: preset.conditionalDeckCondition,
    };
  })(),

  relations: [],

  defaultCharacterActionSequence: characterActionSequence,
};

// Individual NPCs don't form a party, so we export them separately
export const maerinParty: NPCsParty = {
  partyId: NPCEnums.maerin,
  npcs: [maerin],
  defaultPartyActionSequence: {
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
  },
};

export const kethraParty: NPCsParty = {
  partyId: NPCEnums.kethra,
  npcs: [kethra],
  defaultPartyActionSequence: {
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
  },
};

