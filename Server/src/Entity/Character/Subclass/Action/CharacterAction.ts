import type {
  ArtisanKey,
  AttributeKey,
  ProficiencyKey,
} from "src/InterFacesEnumsAndTypes/Enums.ts";
import { DayOfWeek, TimeOfDay } from "src/InterFacesEnumsAndTypes/Time.ts";
import type { ItemId } from "../../../Item/type";
import type { BookId } from "../../../Item/Books";
import type { SkillId } from "../../../Skill/enums";

export enum restEnums {
  None = "None",
  Rest = "Rest",
  Inn = "Inn",
  Camping = "Camping",
  HouseRest = "House Rest",
}

// Organization/Sect Action Enums
export enum HeavensDecreeAction {
  Meeting = "Meeting",
  Join = "Join",
  Leave = "Leave",
  Train = "Train",
  Socialize = "Socialize",
}

export enum ChurchOfLaohAction {
  Meeting = "Meeting",
  Join = "Join",
  Leave = "Leave",
  Train = "Train",
  Socialize = "Socialize",
  MagicLearning = "Magic Learning",
}

export enum GreatTempleOfLaohAction {
  Meeting = "Meeting",
  Train = "Train",
  Socialize = "Socialize",
}

export enum CultOfNizarithAction {
  Join = "Join",
  Leave = "Leave",
  Train = "Train",
  Socialize = "Socialize",
  MagicLearning = "Magic Learning",
}

export enum ShrineAction {
  Meeting = "Meeting",
  Join = "Join",
  Leave = "Leave",
  Train = "Train",
  Socialize = "Socialize",
}

export enum MajorShrineAction {
  Meeting = "Meeting",
  Train = "Train",
  Socialize = "Socialize",
}

export enum KnightOrderAction {
  Join = "Join",
  Leave = "Leave",
  Train = "Train",
  Socialize = "Socialize",
}

export enum MagicSchoolAction {
  Join = "Join",
  Leave = "Leave",
  Train = "Train",
  Socialize = "Socialize",
}

export enum ArcaneAcademiaAction {
  Join = "Join",
  Leave = "Leave",
  Train = "Train",
  Socialize = "Socialize",
}

// Input on character scope
export enum ActionInput {
  None = "None",
  // Travel are part of Group Action
  Travel = "Travel",
  RailTravel = "Rail Travel",

  // rest
  Rest = "Rest",
  Inn = "Inn",
  Camping = "Camping",
  HouseRest = "House Rest",

  // Randomly select an NPC on location to socialize with
  Socialize = "Socialize",
  

  // Attributes
  TrainAttribute = "Train Attribute",
  // Proficiencies
  TrainProficiency = "Train Proficiency",
  // Artisans
  TrainArtisan = "Train Artisan",
  // Skills, need to... Determine how should we know
  TrainSkill = "Train Skill",
  LearnSkill = "Learn Skill",

  // TODO: Implement Reading Book
  Read = "Read",

  // strolling, encounter random events
  Stroll = "Stroll",
  Tavern = "Tavern",

  // artisan
  // Craft, automated, use character's config
  Craft = "Craft",

  // Gathering
  Mining = "Mining",
  WoodCutting = "Wood Cutting",
  Foraging = "Foraging",

  // Refining
  Smelting = "Smelting",
  Tanning = "Tanning",
  Carpentry = "Carpentry",
  Weaving = "Weaving",

  // Item Refining
  Enchanting = "Enchanting", // TODO: Need to pick item with slot + maybe rune or something like so, Gem ETC,

  
  // Organization/Sect actions (require sub-selection)
  HeavensDecree = "Heavens Decree",
  ChurchOfLaoh = "Church of Laoh",
  GreatTempleOfLaoh = "Great Temple of Laoh",
  CultOfNizarith = "Cult of Nizarith",
  ShrineOfGelthoran = "Shrine of Gelthoran",
  MajorShrineOfGelthoran = "Major Shrine of Gelthoran",
  ShrineOfAqorath = "Shrine of Aqorath",
  MajorShrineOfAqorath = "Major Shrine of Aqorath",
  ShrineOfValthoria = "Shrine of Valthoria",
  MajorShrineOfValthoria = "Major Shrine of Valthoria",
  ShrineOfPyrnthanas = "Shrine of Pyrnthanas",
  MajorShrineOfPyrnthanas = "Major Shrine of Pyrnthanas",
  KnightOrder = "Knight Order",
  MagicSchool = "Magic School",
  ArcaneAcademia = "Arcane Academia",

  // TODO: Take hunting quest
  BountyBoard = "Bounty Board",

  // TODO: Participating needded money, get reward while watching also get reward if bet right.
  ArenaWatching = "Arena Watching",
  ArenaParticipating = "Arena Participating",

  // Looking for quest in Adventure Guild. If you come solo, the quest might put you into a party when you accept.
  AdventureGuildQuest = "Adventure Guild Quest",
  // Hiring some random NPC
  AdventureGuildHire = "Adventure Guild Hire",
}

export type CharacterActionSequence = {
  [DayOfWeek.laoh]: {
    [TimeOfDay.morning]: CharacterAction;
    [TimeOfDay.afternoon]: CharacterAction;
    [TimeOfDay.evening]: CharacterAction;
    [TimeOfDay.night]: CharacterAction;
  };
  [DayOfWeek.rowana]: {
    [TimeOfDay.morning]: CharacterAction;
    [TimeOfDay.afternoon]: CharacterAction;
    [TimeOfDay.evening]: CharacterAction;
    [TimeOfDay.night]: CharacterAction;
  };
  [DayOfWeek.aftree]: {
    [TimeOfDay.morning]: CharacterAction;
    [TimeOfDay.afternoon]: CharacterAction;
    [TimeOfDay.evening]: CharacterAction;
    [TimeOfDay.night]: CharacterAction;
  };
  [DayOfWeek.udur]: {
    [TimeOfDay.morning]: CharacterAction;
    [TimeOfDay.afternoon]: CharacterAction;
    [TimeOfDay.evening]: CharacterAction;
    [TimeOfDay.night]: CharacterAction;
  };
  [DayOfWeek.matris]: {
    [TimeOfDay.morning]: CharacterAction;
    [TimeOfDay.afternoon]: CharacterAction;
    [TimeOfDay.evening]: CharacterAction;
    [TimeOfDay.night]: CharacterAction;
  };
  [DayOfWeek.seethar]: {
    [TimeOfDay.morning]: CharacterAction;
    [TimeOfDay.afternoon]: CharacterAction;
    [TimeOfDay.evening]: CharacterAction;
    [TimeOfDay.night]: CharacterAction;
  };
};

export function defaultActionSequence(): CharacterActionSequence {
  return {
    [DayOfWeek.laoh]: {
      [TimeOfDay.morning]: { type: ActionInput.None },
      [TimeOfDay.afternoon]: { type: ActionInput.None },
      [TimeOfDay.evening]: { type: ActionInput.None },
      [TimeOfDay.night]: { type: ActionInput.None },
    },
    [DayOfWeek.rowana]: {
      [TimeOfDay.morning]: { type: ActionInput.None },
      [TimeOfDay.afternoon]: { type: ActionInput.None },
      [TimeOfDay.evening]: { type: ActionInput.None },
      [TimeOfDay.night]: { type: ActionInput.None },
    },
    [DayOfWeek.aftree]: {
      [TimeOfDay.morning]: { type: ActionInput.None },
      [TimeOfDay.afternoon]: { type: ActionInput.None },
      [TimeOfDay.evening]: { type: ActionInput.None },
      [TimeOfDay.night]: { type: ActionInput.None },
    },
    [DayOfWeek.udur]: {
      [TimeOfDay.morning]: { type: ActionInput.None },
      [TimeOfDay.afternoon]: { type: ActionInput.None },
      [TimeOfDay.evening]: { type: ActionInput.None },
      [TimeOfDay.night]: { type: ActionInput.None },
    },
    [DayOfWeek.matris]: {
      [TimeOfDay.morning]: { type: ActionInput.None },
      [TimeOfDay.afternoon]: { type: ActionInput.None },
      [TimeOfDay.evening]: { type: ActionInput.None },
      [TimeOfDay.night]: { type: ActionInput.None },
    },
    [DayOfWeek.seethar]: {
      [TimeOfDay.morning]: { type: ActionInput.None },
      [TimeOfDay.afternoon]: { type: ActionInput.None },
      [TimeOfDay.evening]: { type: ActionInput.None },
      [TimeOfDay.night]: { type: ActionInput.None },
    },
  };
}

export type CharacterAction =
  | { type: ActionInput.None }
  | { type: ActionInput.Travel }
  | { type: ActionInput.RailTravel }
  | { type: ActionInput.Rest }
  | { type: ActionInput.Inn }
  | { type: ActionInput.Camping }
  | { type: ActionInput.HouseRest }

  // Training
  | { type: ActionInput.TrainAttribute; attribute: AttributeKey }
  | { type: ActionInput.TrainProficiency; proficiency: ProficiencyKey }
  | { type: ActionInput.TrainArtisan; artisan: ArtisanKey }
  | { type: ActionInput.TrainSkill; skillId: SkillId }
  | { type: ActionInput.LearnSkill; skillId: SkillId }
  | { type: ActionInput.Read; bookId: BookId }
  | { type: ActionInput.Craft; itemId: ItemId }

  // Other actions
  | { type: ActionInput.Socialize }
  | { type: ActionInput.Stroll }
  | { type: ActionInput.Tavern }
  | { type: ActionInput.Mining }
  | { type: ActionInput.WoodCutting }
  | { type: ActionInput.Foraging }
  | { type: ActionInput.Smelting }
  | { type: ActionInput.Tanning }
  | { type: ActionInput.Carpentry }
  | { type: ActionInput.Weaving }
  | { type: ActionInput.Enchanting }

  // Religious / special (with sub-selection)
  | { type: ActionInput.HeavensDecree; action: HeavensDecreeAction }
  | { type: ActionInput.ChurchOfLaoh; action: ChurchOfLaohAction }
  | { type: ActionInput.GreatTempleOfLaoh; action: GreatTempleOfLaohAction }
  | { type: ActionInput.CultOfNizarith; action: CultOfNizarithAction }
  | { type: ActionInput.ShrineOfGelthoran; action: ShrineAction }
  | { type: ActionInput.MajorShrineOfGelthoran; action: MajorShrineAction }
  | { type: ActionInput.ShrineOfAqorath; action: ShrineAction }
  | { type: ActionInput.MajorShrineOfAqorath; action: MajorShrineAction }
  | { type: ActionInput.ShrineOfValthoria; action: ShrineAction }
  | { type: ActionInput.MajorShrineOfValthoria; action: MajorShrineAction }
  | { type: ActionInput.ShrineOfPyrnthanas; action: ShrineAction }
  | { type: ActionInput.MajorShrineOfPyrnthanas; action: MajorShrineAction }

  // Combat / adventure (with sub-selection)
  | { type: ActionInput.KnightOrder; action: KnightOrderAction }
  | { type: ActionInput.MagicSchool; action: MagicSchoolAction }
  | { type: ActionInput.ArcaneAcademia; action: ArcaneAcademiaAction }
  | { type: ActionInput.BountyBoard }
  | { type: ActionInput.ArenaWatching }
  | { type: ActionInput.ArenaParticipating }
  | { type: ActionInput.AdventureGuildQuest }
  | { type: ActionInput.AdventureGuildHire };

export const groupRest = [
  ActionInput.Inn,
  ActionInput.HouseRest,
  ActionInput.Camping,
];

export const groupActions = [ActionInput.Stroll];

export const specialActions: ActionInput[] = [];
