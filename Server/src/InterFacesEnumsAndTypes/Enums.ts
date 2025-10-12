export enum CharacterType {
  abberration = "abberration",
  beast = "beast",
  celestial = "celestial",
  construct = "construct",
  dragon = "dragon",
  elemental = "elemental",
  fey = "fey",
  fiend = "fiend",
  demon = "demon",
  devil = "devil",
  shapechanger = "shapechanger",
  giant = "giant",
  humanoid = "humanoid",
  monstrosity = "monstrosity",
  ooze = "ooze",
  plant = "plant",
  undead = "undead",
  summoned = "summoned",
  magical = "magical",
  vermin = "vermin",
  none = "none",
  slime = "slime",
  insect = "insect",
}

export enum CharacterAlignmentEnum {
  Initiate = "Initiate",
  // Good Side
  Kind = "Kind",
  Noble = "Noble",
  Saint = "Saint",
  Divine = "Divine",
  // Evil Side
  Cruel = "Cruel",
  Vile = "Vile",
  Tyrant = "Tyrant",
  Infernal = "Infernal",
  // Chaotic Side
  Mad = "Mad",
  Lunatic = "Lunatic",
  Maniac = "Maniac",
  Anarch = "Anarch",
}

export const GoodAlignmentMap = {
  29: CharacterAlignmentEnum.Initiate,
  49: CharacterAlignmentEnum.Kind,
  69: CharacterAlignmentEnum.Noble,
  89: CharacterAlignmentEnum.Saint,
  100: CharacterAlignmentEnum.Divine,
};

export const EvilAlignmentMap = {
  29: CharacterAlignmentEnum.Initiate,
  49: CharacterAlignmentEnum.Cruel,
  69: CharacterAlignmentEnum.Vile,
  89: CharacterAlignmentEnum.Tyrant,
  100: CharacterAlignmentEnum.Infernal,
};

export const ChaoticAlignmentMap = {
  29: CharacterAlignmentEnum.Initiate,
  49: CharacterAlignmentEnum.Mad,
  69: CharacterAlignmentEnum.Lunatic,
  89: CharacterAlignmentEnum.Maniac,
  100: CharacterAlignmentEnum.Anarch,
};

export const ATTRIBUTE_KEYS = [
  "charisma",
  "luck",
  "intelligence",
  "leadership",
  "vitality",
  "willpower",
  "planar",
  "control",
  "dexterity",
  "agility",
  "strength",
  "endurance",
] as const;

export type AttributeKey = (typeof ATTRIBUTE_KEYS)[number];

export const ARTISAN_KEYS = [
  "agriculture",
  "mining",
  "smithing",
  "woodCutting",
  "carpentry",
  "foraging",
  "weaving",
  "skinning",
  "tanning",
  "jewelry",
  "cooking",
  "alchemy",
  "enchanting",
  "fishing",
  "masonry",
  "tailoring",
  "brewing",
  "performance",
  "tinkering",
  "electrics",
] as const;
export type ArtisanKey = (typeof ARTISAN_KEYS)[number];

export const ELEMENT_KEYS = [
  "order",
  "chaos",
  "fire",
  "water",
  "earth",
  "wind",
] as const;
export type ElementKey = (typeof ELEMENT_KEYS)[number];

export const EXPANDED_ELEMENT_KEYS = [
  "order",
  "chaos",
  "fire",
  "water",
  "earth",
  "wind",
  // T2 and T3 elements will be added here, use later
] as const;

export type ExpandedElementKey = (typeof EXPANDED_ELEMENT_KEYS)[number];

export const PROFICIENCY_KEYS = [
  "bareHand",
  // Sword
  "dagger",
  "sword",
  "rapier",
  "greatSword",
  // Blade
  "machete",
  "blade",
  "scimitar",
  "zanmadao",
  // Axe
  "axe",
  "warAxe",
  "halberd",
  // Spear
  "spear",
  "javelin",
  // Mace
  "mace",
  "flail",
  "warHammer",
  // Throwing-Range
  "throwingKnife",
  "crossbow",
  "bow",
  "gun",
  // Magic
  "magicWand",
  "staff",
  "tome",
  "orb",
  "relic",
  // Shield
  "shield",
] as const;

export type ProficiencyKey = (typeof PROFICIENCY_KEYS)[number];

export const BATTLE_STAT_KEYS = [
  "pATK",
  "pHIT",
  "pCRT",
  "pDEF",
  "mATK",
  "mHIT",
  "mCRT",
  "mDEF",
  "slashATK",
  "slashDEF",
  "pierceATK",
  "pierceDEF",
  "bluntATK",
  "bluntDEF",
  "orderATK",
  "orderDEF",
  "chaosATK",
  "chaosDEF",
  "fireATK",
  "fireDEF",
  "earthATK",
  "earthDEF",
  "waterATK",
  "waterDEF",
  "windATK",
  "windDEF",
  "dodge",
] as const;

export type BattleStatKey = (typeof BATTLE_STAT_KEYS)[number];

export const DiceEnum = [
  "1d2",
  "1d3",
  "1d4",
  "1d6",
  "1d8",
  "1d10",
  "1d12",
  "1d20",
  "1d100",
  "2d2",
  "2d3",
  "2d4",
  "2d6",
  "2d8",
  "2d10",
  "2d12",
  "2d20",
  "2d100",
  "3d2",
  "3d3",
  "3d4",
  "3d6",
  "3d8",
  "3d10",
  "3d12",
  "3d20",
  "3d100",
  "4d2",
  "4d3",
  "4d4",
  "4d6",
  "4d8",
  "4d10",
  "4d12",
  "4d20",
  "4d100",
  "5d2",
  "5d3",
  "5d4",
  "5d6",
  "5d8",
  "5d10",
  "5d12",
  "5d20",
  "5d100",
  "6d2",
  "6d3",
  "6d4",
  "6d6",
  "6d8",
  "6d10",
  "6d12",
  "6d20",
  "6d100",
] as const;

export type DiceEnum = (typeof DiceEnum)[number];

export enum EquipmentSlot {
  headWear = "headWear",
  body = "body",
  leg = "leg",
  hand = "hand",
  foot = "foot",
  util = "util",
  ring = "ring",
  ear = "ear",
  neck = "neck",
  weapon = "weapon",
}

export enum CharacterEquipmentSlot {
  headWear = "headWear",
  body = "body",
  leg = "leg",
  hand = "hand",
  foot = "foot",
  util = "util",
  ringL = "ringL",
  ringR = "ringR",
  earL = "earL",
  earR = "earR",
  neck = "neck",
  rightHand = "rightHand",
  leftHand = "leftHand",
}

export enum RelationStatusEnum {}
