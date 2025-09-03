// Input on character scope
export enum ActionInput {
  None = "None",
  Travel = "Travel",

  // rest
  Rest = "Rest",
  Inn = "Inn",
  Camping = "Camping",
  HouseRest = "House Rest",

  // train
  TrainAttribute = "Train Attribute",
  TrainProficiency = "Train Proficiency",
  TrainArtisan = "Train Artisan",
  TrainSkill = "Train Skill",
  LearnSkill = "Learn Skill",

  // read
  Read = "Read",

  // stroll
  Stroll = "Stroll",
  Tavern = "Tavern",

  // artisan
  Craft = "Craft",
  Blacksmith = "Blacksmith",
  Apothecary = "Apothecary",
  Tailor = "Tailor",
  Armorer = "Armorer",
  Jeweler = "Jeweler",
  Arcanist = "Arcanist",
  Grocery = "Grocery",

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

export const specialActions: ActionInput[] = [];
