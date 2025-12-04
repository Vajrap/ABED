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

// Input on character scope
export enum ActionInput {
  None = "None",
  Socialize = "Socialize",
  Travel = "Travel",
  RailTravel = "Rail Travel",

  // rest
  Rest = "Rest",
  Inn = "Inn",
  Camping = "Camping",
  HouseRest = "House Rest",

  // Attributes
  TrainAttribute = "Train Attribute",
  // Proficiencies
  TrainProficiency = "Train Proficiency",
  // Artisans
  TrainArtisan = "Train Artisan",
  // Skills, need to... Determine how should we know
  TrainSkill = "Train Skill",
  LearnSkill = "Learn Skill",

  // read
  Read = "Read",

  // stroll
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

  // Part of crafting
  // Smithing = "Smithing",
  // Jewelry = "Jewelry",
  // Cooking = "Cooking",
  // Alchemy = "Alchemy",

  // Item Refining
  Enchanting = "Enchanting", // Need to pick item with slot + maybe rune or something like so

  // Automatically happened
  // Skinning = "Skinning",

  // Special choice in some places, just idea place holder now
  HeavensDecreeMeeting = "Heavens Decree Meeting",
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
  Barrack = "Barrack",
  KnightOrder = "Knight Order",
  MagicSchool = "Magic School",
  MagicAcademy = "Magic Academy",
  ChurchOfLaohMagicLearning = "Church of Laoh Magic Learning",
  CultOfNizarithMagicLearning = "Cult of Nizarith Magic Learning",
  AdventureGuild = "Adventure Guild",
  BountyBoard = "Bounty Board",
  Arena = "Arena",
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
  | { type: ActionInput.Read }
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

  // Religious / special
  | { type: ActionInput.HeavensDecreeMeeting }
  | { type: ActionInput.ChurchOfLaoh }
  | { type: ActionInput.GreatTempleOfLaoh }
  | { type: ActionInput.CultOfNizarith }
  | { type: ActionInput.ShrineOfGelthoran }
  | { type: ActionInput.MajorShrineOfGelthoran }
  | { type: ActionInput.ShrineOfAqorath }
  | { type: ActionInput.MajorShrineOfAqorath }
  | { type: ActionInput.ShrineOfValthoria }
  | { type: ActionInput.MajorShrineOfValthoria }
  | { type: ActionInput.ShrineOfPyrnthanas }
  | { type: ActionInput.MajorShrineOfPyrnthanas }

  // Combat / adventure
  | { type: ActionInput.Barrack }
  | { type: ActionInput.KnightOrder }
  | { type: ActionInput.MagicSchool }
  | { type: ActionInput.MagicAcademy }
  | { type: ActionInput.ChurchOfLaohMagicLearning }
  | { type: ActionInput.CultOfNizarithMagicLearning }
  | { type: ActionInput.AdventureGuild }
  | { type: ActionInput.BountyBoard }
  | { type: ActionInput.Arena };

export const groupRest = [
  ActionInput.Inn,
  ActionInput.HouseRest,
  ActionInput.Camping,
];

export const groupActions = [ActionInput.Stroll];

export const specialActions: ActionInput[] = [];
