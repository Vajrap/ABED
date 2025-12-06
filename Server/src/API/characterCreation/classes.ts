import {
  BodyId,
  AxeId,
  BladeId,
  BookWId,
  BowId,
  DaggerId,
  HammerId,
  OrbId,
  ShieldId,
  SpearId,
  StaffId,
  SwordId,
  WandId,
} from "src/Entity/Item";
import {
  SkillId,
  BarbarianSkillId,
  ClericSkillId,
  DruidSkillId,
  DuelistSkillId,
  GuardianSkillId,
  InquisitorSkillId,
  KnightSkillId,
  MageSkillId,
  MonkSkillId,
  MysticSkillId,
  PaladinSkillId,
  RogueSkillId,
  ScholarSkillId,
  ShamanSkillId,
  SpellbladeSkillId,
  WarriorSkillId,
  WarlockSkillId,
  WitchSkillId,
  SeerSkillId,
  NomadSkillId,
  EngineerSkillId,
} from "src/Entity/Skill/enums";
import {
  CharacterEquipmentSlot,
  ClassEnum,
} from "src/InterFacesEnumsAndTypes/Enums";
import { ClassBonus } from "./types";
import { CharacterRoleEnum } from "src/Entity/Character/Subclass/Title/Role/enum";


const classBonus: Record<ClassEnum, ClassBonus> = {
  [ClassEnum.Cleric]: {
    proficiencies: {
      three: "book",
      two: "hammer",
      one: "shield",
    },
    startingSkills: [
      ClericSkillId.Heal,
      ClericSkillId.Radiance,
    ],
    startingEquipments: [
      { id: BodyId.Robe, slot: CharacterEquipmentSlot.body },
      { id: StaffId.QuarterStaff, slot: CharacterEquipmentSlot.rightHand },
    ],
    role: CharacterRoleEnum.Cleric,
  },
  [ClassEnum.Seer]: {
    proficiencies: {
      three: "orb",
      two: "dagger",
      one: "book",
    },
    startingSkills: [
      SeerSkillId.PlanarEcho,
      SeerSkillId.ThreadSnip,
    ],
    startingEquipments: [
      { id: BodyId.MageRobe, slot: CharacterEquipmentSlot.body },
      { id: OrbId.Orb, slot: CharacterEquipmentSlot.rightHand },
    ],
    role: CharacterRoleEnum.Mage,
  },
  [ClassEnum.Mage]: {
    proficiencies: {
      three: "wand",
      two: "staff",
      one: "book",
    },
    startingSkills: [
      MageSkillId.ArcaneBolt,
      MageSkillId.ArcaneShield,
    ],
    startingEquipments: [
      { id: BodyId.MageRobe, slot: CharacterEquipmentSlot.body },
      { id: WandId.Wand, slot: CharacterEquipmentSlot.rightHand },
    ],
    role: CharacterRoleEnum.Mage,
  },
  [ClassEnum.Mystic]: {
    proficiencies: {
      three: "orb",
      two: "bareHand",
      one: "wand",
    },
    startingSkills: [
      MysticSkillId.MistStep,
      MysticSkillId.InnerVeil,
    ],
    startingEquipments: [
      { id: BodyId.MageRobe, slot: CharacterEquipmentSlot.body },
      { id: OrbId.Orb, slot: CharacterEquipmentSlot.rightHand },
    ],
    role: CharacterRoleEnum.Mage,
  },
  [ClassEnum.Rogue]: {
    proficiencies: {
      three: "dagger",
      two: "bow",
      one: "blade",
    },
    startingSkills: [
      RogueSkillId.ThrowingKnives,
      RogueSkillId.BleedingCut,
    ],
    startingEquipments: [
      { id: BodyId.LeatherArmor, slot: CharacterEquipmentSlot.body },
      { id: DaggerId.Knife, slot: CharacterEquipmentSlot.rightHand },
    ],
    role: CharacterRoleEnum.Rogue,
  },
  [ClassEnum.Spellblade]: {
    proficiencies: {
      three: "sword",
      two: "blade",
      one: "wand",
    },
    startingSkills: [
      SpellbladeSkillId.PlanarEdge,
      SpellbladeSkillId.WindSlash,
    ],
    startingEquipments: [
      { id: BodyId.LeatherArmor, slot: CharacterEquipmentSlot.body },
      { id: SwordId.ShortSword, slot: CharacterEquipmentSlot.rightHand },
    ],
    role: CharacterRoleEnum.Mage,
  },
  [ClassEnum.Shaman]: {
    proficiencies: {
      three: "staff",
      two: "spear",
      one: "axe",
    },
    startingSkills: [
      ShamanSkillId.MendSpirit,
      ShamanSkillId.HexOfRot,
    ],
    startingEquipments: [
      { id: BodyId.Robe, slot: CharacterEquipmentSlot.body },
      { id: StaffId.QuarterStaff, slot: CharacterEquipmentSlot.rightHand },
    ],
    role: CharacterRoleEnum.Cleric,
  },
  [ClassEnum.Barbarian]: {
    proficiencies: {
      three: "axe",
      two: "hammer",
      one: "bareHand",
    },
    startingSkills: [
      BarbarianSkillId.Rage,
      BarbarianSkillId.RecklessSwing,
    ],
    startingEquipments: [ 
      { id: BodyId.LeatherArmor, slot: CharacterEquipmentSlot.body },
      { id: AxeId.Axe, slot: CharacterEquipmentSlot.rightHand },
    ],
    role: CharacterRoleEnum.Fighter,
  },
  [ClassEnum.Warrior]: {
    proficiencies: {
      three: "blade",
      two: "sword",
      one: "spear",
    },
    startingSkills: [
      WarriorSkillId.PowerStrike,
      WarriorSkillId.WarCry,
    ],
    startingEquipments: [
      { id: BodyId.PaddedArmor, slot: CharacterEquipmentSlot.body },
      { id: BladeId.Scimitar, slot: CharacterEquipmentSlot.rightHand },
    ],
    role: CharacterRoleEnum.Fighter,
  },
  [ClassEnum.Knight]: {
    proficiencies: {
      three: "spear",
      two: "shield",
      one: "sword",
    },
    startingSkills: [
      KnightSkillId.PrecisionThrust,
    ],
    startingEquipments: [
      { id: BodyId.ChainShirt, slot: CharacterEquipmentSlot.body },
      { id: SpearId.Dory, slot: CharacterEquipmentSlot.rightHand },
      { id: ShieldId.Buckler, slot: CharacterEquipmentSlot.leftHand },
    ],
    role: CharacterRoleEnum.Fighter,
  },
  [ClassEnum.Guardian]: {
    proficiencies: {
      three: "shield",
      two: "hammer",
      one: "axe",
    },
    startingSkills: [
      GuardianSkillId.Taunt,
      GuardianSkillId.ShieldUp,
    ],
    startingEquipments: [
      { id: BodyId.ChainShirt, slot: CharacterEquipmentSlot.body },
      { id: HammerId.Hammer, slot: CharacterEquipmentSlot.rightHand },
      { id: ShieldId.Buckler, slot: CharacterEquipmentSlot.leftHand },
    ],
    role: CharacterRoleEnum.Fighter,
  },
  [ClassEnum.Paladin]: {
    proficiencies: {
      three: "hammer",
      two: "shield",
      one: "sword",
    },
    startingSkills: [
      PaladinSkillId.DivineStrike,
    ],
    startingEquipments: [
      { id: BodyId.StuddedLeatherArmor, slot: CharacterEquipmentSlot.body },
      { id: HammerId.Hammer, slot: CharacterEquipmentSlot.rightHand },
      { id: ShieldId.Buckler, slot: CharacterEquipmentSlot.leftHand },
    ],
    role: CharacterRoleEnum.Cleric,
  },
  [ClassEnum.Druid]: {
    proficiencies: {
      three: "staff",
      two: "spear",
      one: "bow",
    },
    startingSkills: [
      DruidSkillId.VineWhip,
      DruidSkillId.ThrowSpear,
    ],
    startingEquipments: [
      { id: BodyId.HideArmor, slot: CharacterEquipmentSlot.body },
      { id: SpearId.Javelin, slot: CharacterEquipmentSlot.rightHand },
    ],
    role: CharacterRoleEnum.Cleric,
  },
  [ClassEnum.Monk]: {
    proficiencies: {
      three: "bareHand",
      two: "staff",
      one: "blade",
    },
    startingSkills: [
      MonkSkillId.Meditation,
      MonkSkillId.PalmStrike,
      MonkSkillId.FlurryOfBlows,
    ],
    startingEquipments: [
      { id: BodyId.Tunic, slot: CharacterEquipmentSlot.body },
    ],
    role: CharacterRoleEnum.Fighter,
  },
  [ClassEnum.Warlock]: {
    proficiencies: {
      three: "orb",
      two: "axe",
      one: "bow",
    },
    startingSkills: [
      WarlockSkillId.ChaosBolt,
      WarlockSkillId.Corruption,
    ],
    startingEquipments: [
      { id: BodyId.MageRobe, slot: CharacterEquipmentSlot.body },
      { id: OrbId.Orb, slot: CharacterEquipmentSlot.rightHand },
    ],
    role: CharacterRoleEnum.Mage,
  },
  [ClassEnum.Duelist]: {
    proficiencies: {
      three: "sword",
      two: "shield",
      one: "bow",
    },
    startingSkills: [
      DuelistSkillId.DuelingStance,
    ],
    startingEquipments: [
      { id: BodyId.LeatherArmor, slot: CharacterEquipmentSlot.body },
      { id: SwordId.ShortSword, slot: CharacterEquipmentSlot.rightHand },
      { id: ShieldId.Buckler, slot: CharacterEquipmentSlot.leftHand },
    ],
    role: CharacterRoleEnum.Fighter,
  },
  [ClassEnum.Witch]: {
    proficiencies: {
      three: "wand",
      two: "book",
      one: "dagger",
    },
    startingSkills: [
      WitchSkillId.ChaosBinding, 
      WitchSkillId.PoisonDart, 
    ],
    startingEquipments: [
      { id: BodyId.MageRobe, slot: CharacterEquipmentSlot.body },
      { id: WandId.Wand, slot: CharacterEquipmentSlot.rightHand },
    ],
    role: CharacterRoleEnum.Mage,
  },
  [ClassEnum.Inquisitor]: {
    proficiencies: {
      three: "book",
      two: "bow",
      one: "wand",
    },
    startingSkills: [
      InquisitorSkillId.RadiantSmite,
      InquisitorSkillId.ExposeWeakness,
    ],
    startingEquipments: [
      { id: BodyId.MageRobe, slot: CharacterEquipmentSlot.body },
      { id: BookWId.Bible, slot: CharacterEquipmentSlot.rightHand },
    ],
    role: CharacterRoleEnum.Cleric,
  },
  [ClassEnum.Scholar]: {
    proficiencies: {
      three: "book",
      two: "sword",
      one: "dagger",
    },
    startingSkills: [
      ScholarSkillId.DisruptPattern,
      ScholarSkillId.CognitiveOverload,
    ],
    startingEquipments: [
      { id: BodyId.MageRobe, slot: CharacterEquipmentSlot.body },
      { id: BookWId.Codex, slot: CharacterEquipmentSlot.rightHand },
    ],
    role: CharacterRoleEnum.Scholar,
  },
  [ClassEnum.Engineer]: {
    proficiencies: {
      three: "bow",
      two: "hammer",
      one: "bareHand",
    },
    startingSkills: [
      EngineerSkillId.BearTrap,
      EngineerSkillId.ExplosiveBolt,
    ],
    startingEquipments: [
      { id: BodyId.LeatherArmor, slot: CharacterEquipmentSlot.body },
      { id: BowId.ShortBow, slot: CharacterEquipmentSlot.rightHand },
    ],
    role: CharacterRoleEnum.Fighter,
  },
  [ClassEnum.Nomad]: {
    proficiencies: {
      three: "blade",
      two: "bow",
      one: "dagger",
    },
    startingSkills: [
      NomadSkillId.AdaptiveStrike,
      NomadSkillId.TacticalSlash,
    ],
    startingEquipments: [
      { id: BodyId.LeatherArmor, slot: CharacterEquipmentSlot.body },
      { id: BladeId.Scimitar, slot: CharacterEquipmentSlot.rightHand },
    ],
    role: CharacterRoleEnum.Fighter,
  },
};

export { classBonus };