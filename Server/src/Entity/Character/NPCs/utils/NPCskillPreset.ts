import { SkillId } from "src/Entity/Skill/enums";
import { DeckCondition } from "../../Subclass/DeckCondition/DeckCondition";

/**
 * NPC Skill Preset type
 * Defines a complete skill configuration for an NPC including active deck, conditional deck, and skill levels
 */
export type NPCskillPreset = {
  activeDeck: SkillId[];
  conditionalDeck?: SkillId[];
  conditionalDeckCondition?: DeckCondition;
  skills: Map<SkillId, { level: number; exp: number }>;
};

/**
 * Helper function to create a skill preset
 * Automatically ensures all skills in decks are added to the skills Map
 * @param characterLevel The character's level, used for scaling skill levels
 */
export function createSkillPreset(
  activeDeck: SkillId[],
  conditionalDeck: SkillId[] | undefined,
  skillLevels: Map<SkillId, number | ((level: number) => number)>,
  characterLevel: number,
  conditionalDeckCondition?: DeckCondition,
): NPCskillPreset {
  const skills = new Map<SkillId, { level: number; exp: number }>();

  // Get all unique skill IDs from both decks
  const allSkillIds = new Set<SkillId>([...activeDeck, ...(conditionalDeck || [])]);

  // Add all skills to the Map with their specified levels
  allSkillIds.forEach((skillId) => {
    const levelConfig = skillLevels.get(skillId);
    let level: number;

    if (levelConfig === undefined) {
      // Default to level 1 if not specified
      level = 1;
    } else if (typeof levelConfig === "function") {
      // If it's a scaling function, call it with the character level
      level = levelConfig(characterLevel);
    } else {
      // Fixed level
      level = levelConfig;
    }

    skills.set(skillId, { level, exp: 0 });
  });

  return {
    activeDeck,
    conditionalDeck,
    conditionalDeckCondition,
    skills,
  };
}

/**
 * Utility function to scale skill levels based on character level
 * @param characterLevel The character's level
 * @param baseLevel Base skill level to scale from
 * @param scaleFactor Factor to multiply (default 0.7, meaning level 3 → ~2)
 * @param minLevel Minimum level (default 1)
 * @param maxLevel Maximum level (default 5 for common/uncommon)
 */
export function scaleSkillLevel(
  characterLevel: number,
  baseLevel: number = 1,
  scaleFactor: number = 0.7,
  minLevel: number = 1,
  maxLevel: number = 5,
): number {
  const scaled = Math.floor(baseLevel + (characterLevel - 1) * scaleFactor);
  return Math.min(Math.max(scaled, minLevel), maxLevel);
}

// ============================================================================
// PRESET FUNCTIONS BY ARCHETYPE
// ============================================================================

import {
  BasicSkillId,
  WarriorSkillId,
  GuardianSkillId,
  RogueSkillId,
  MageSkillId,
  ClericSkillId,
  ShamanSkillId,
  BarbarianSkillId,
  KnightSkillId,
  PaladinSkillId,
  DruidSkillId,
  MonkSkillId,
  WarlockSkillId,
  DuelistSkillId,
  WitchSkillId,
  InquisitorSkillId,
  ScholarSkillId,
  SeerSkillId,
  MysticSkillId,
  SpellbladeSkillId,
  EngineerSkillId,
  NomadSkillId,
} from "src/Entity/Skill/enums";
import { rollTwenty } from "src/Utils/Dice";

// ============================================================================
// WARRIOR PRESETS
// ============================================================================
// Weapon Master
export function warriorWeaponMaster(level: number): NPCskillPreset {
  const skillForActive = [
    WarriorSkillId.WarCry, // Consume: 2 fire | Produce: 1 neutral
    WarriorSkillId.VersatileStrike, // Consume: 2 neutral | Produce: 1 fire
    WarriorSkillId.WeaponAdaptation, // Consume: - | Produce: 1 neutral
  ];

  return createSkillPreset(skillForActive, [], new Map(), level);
}
// Battlefield Control
export function warriorBattleFieldControl(level: number): NPCskillPreset {
    const skillForActive = [
        WarriorSkillId.PositioningStrike, // Consume: 1 earth | Produce: 1 fire
        WarriorSkillId.BattlefieldDominance, // Consume: 2 neutral | Produce: 1 earth
    ];
  
    return createSkillPreset(skillForActive, [], new Map(), level);
}
// Champion
export function warriorChampion(level: number): NPCskillPreset {
    const skillForActive = [
        WarriorSkillId.FinishingBlow, // Consume: 2 fire | Produce: 1 earth
        WarriorSkillId.ChallengeStrike, // Consume: 2 neutral | Produce: 1 fire
    ];
  
    return createSkillPreset(skillForActive, [], new Map(), level);
}

// ============================================================================
// GUARDIAN PRESETS
// ============================================================================
// Bulwark
export function guardianBulwark(level: number): NPCskillPreset {
  const skillForActive = [
      GuardianSkillId.FortressStance, // Consume: 1 earth | Produce: 1 neutral
      GuardianSkillId.Taunt, // Consume: - | Produce: 1 earth
      GuardianSkillId.ShieldUp, // Consume: - | Produce: 1 earth
  ];

  return createSkillPreset(skillForActive, [], new Map(), level);
}

// Sentinel
export function guardianSentinel(level: number): NPCskillPreset {
  const skillForActive = [
      GuardianSkillId.Bash, // Consume: 1 fire | Produce: 1 neutral
      GuardianSkillId.SentinelDuty, // Consume: 2 earth | Produce: 1 neutral
      GuardianSkillId.Taunt, // Consume: - | Produce: 1 earth
  ];

  return createSkillPreset(skillForActive, [], new Map(), level);
}

// Bastion
export function guardianBastion(level: number): NPCskillPreset {
  const skillForActive = [
    GuardianSkillId.FortressStance, // Consume: 1 earth | Produce: 1 neutral
    GuardianSkillId.Guardian, // Consume: 1 neutral | Produce: 1 earth
  ];

  return createSkillPreset(skillForActive, [], new Map(), level);
}

// ============================================================================
// ROGUE PRESETS
// ============================================================================

// Stealth
export function rogueStealth(level: number): NPCskillPreset {
  const skillForActive = [
    RogueSkillId.Backstab,
    RogueSkillId.Hiding,
    RogueSkillId.ThrowingKnives
  ];

  return createSkillPreset(skillForActive, [], new Map(), level);
}

// Melee
export function rogueMelee(level: number): NPCskillPreset {
  const randomSkill = rollTwenty().total > 10 ? RogueSkillId.BleedingCut : RogueSkillId.CrippingSlice;
  
  const skillForActive = [
    RogueSkillId.OpportunistStrike,
    randomSkill,
  ];

  return createSkillPreset(skillForActive, [], new Map(), level);
}

// Range
export function rogueRange(level: number): NPCskillPreset {
  const skillForActive = [
    RogueSkillId.SplitTrajectory,
    RogueSkillId.PinningShot,
  ];

  return createSkillPreset(skillForActive, [], new Map(), level);
}

// ============================================================================
// CLERIC PRESETS
// ============================================================================

// Healing
export function clericHeal(level: number): NPCskillPreset {
  const skillForActive = [
    ClericSkillId.MassHeal,
    ClericSkillId.Protection,
    ClericSkillId.Heal,
  ];

  return createSkillPreset(skillForActive, [], new Map(), level);
}

// Sanctuary
export function clericSanctuary(level: number): NPCskillPreset {
  const skillForActive = [
    ClericSkillId.Bind,
    ClericSkillId.Bless,
    ClericSkillId.Heal,
  ];

  return createSkillPreset(skillForActive, [], new Map(), level);
}

// Exorcist
export function clericExorcist(level: number): NPCskillPreset {
  const skillForActive = [
    ClericSkillId.DivineStrike,
    ClericSkillId.Radiance,
  ];

  return createSkillPreset(skillForActive, [], new Map(), level);
}

// ============================================================================
// MAGE PRESETS
// ============================================================================

// Arcane
export function mageArcane(level: number): NPCskillPreset {
  const skillForActive = [
    MageSkillId.PlanarEruption,
    MageSkillId.ArcaneMissiles,
    MageSkillId.ArcaneBolt,
  ];

  return createSkillPreset(skillForActive, [], new Map(), level);
}

// Fire
export function mageFire(level: number): NPCskillPreset {
  const skillForActive = [
      MageSkillId.FireBall,
      MageSkillId.BurningHand,
      MageSkillId.FireBolt,
  ];

  return createSkillPreset(skillForActive, [], new Map(), level);
}

// Water
export function mageWater(level: number): NPCskillPreset {
  const skillForActive = [
      MageSkillId.CrushingDepths,
      MageSkillId.CascadePulse,
      MageSkillId.HydroLash,
  ];

  return createSkillPreset(skillForActive, [], new Map(), level);
}

// Earth
export function mageEarth(level: number): NPCskillPreset {
  const skillForActive = [
      MageSkillId.EarthernGrip,
      MageSkillId.StoneSkin,
      MageSkillId.StoneShard,
  ];

  return createSkillPreset(skillForActive, [], new Map(), level);
}

// Wind
export function mageWind(level: number): NPCskillPreset {
  const skillForActive = [
      MageSkillId.GaleSlash,
      MageSkillId.RazorGust,
      MageSkillId.WindSlice,
  ];

  return createSkillPreset(skillForActive, [], new Map(), level);
}

// ============================================================================
// SHAMAN PRESETS
// ============================================================================

// Curse
export function shamanCurse(level: number): NPCskillPreset {
  const skillForActive = [
      ShamanSkillId.HexOfRot,
      ShamanSkillId.MendSpirit,
  ];

  return createSkillPreset(skillForActive, [], new Map(), level);
}

// Bless
export function shamanBless(level: number): NPCskillPreset {
  const skillForActive = [
      ShamanSkillId.CleansingBlessing,
      ShamanSkillId.SpiritRattle,
  ];

  return createSkillPreset(skillForActive, [], new Map(), level);
}

// Harmony
export function shamanHarmony(level: number): NPCskillPreset {
  const skillForActive = [
    ShamanSkillId.ChaoticBlessing,
    ShamanSkillId.Harmonization,
    ShamanSkillId.DualNature,
  ];

  return createSkillPreset(skillForActive, [], new Map(), level);
}

// ============================================================================
// BARBARIAN PRESETS
// ============================================================================

// BERSERKER
export function barbarianBerserker(level: number): NPCskillPreset {
  const skillForActive = [
      BarbarianSkillId.BloodFrenzy,
      BarbarianSkillId.Rage,
  ];

  return createSkillPreset(skillForActive, [], new Map(), level);
}

// BRUTE
export function barbarianBrute(level: number): NPCskillPreset {
  const skillForActive = [
    BarbarianSkillId.GroundSlam,
    BarbarianSkillId.Earthshatter,
    BarbarianSkillId.Rage,
  ];

  return createSkillPreset(skillForActive, [], new Map(), level);
}

// ============================================================================
// KNIGHT PRESETS
// ============================================================================

// Commander
export function knightPrecision(level: number): NPCskillPreset {
  const skillForActive = [
    KnightSkillId.PrecisionThrust,
    KnightSkillId.TacticalCommand,
  ];

  return createSkillPreset(skillForActive, [], new Map(), level);
}

// Order
export function knightOrder(level: number): NPCskillPreset {
  const skillForActive = [
    KnightSkillId.DisciplinedAdvance,
    KnightSkillId.AdvancingPace,
    KnightSkillId.RelentlessCharge,
  ];

  return createSkillPreset(skillForActive, [], new Map(), level);
}

// Oathbound
export function knightOathbound(level: number): NPCskillPreset {
  const skillForActive = [
    KnightSkillId.ShieldBash,
    KnightSkillId.ShieldedStrike,
  ];

  return createSkillPreset(skillForActive, [], new Map(), level);
}

// ============================================================================
// PALADIN PRESETS
// ============================================================================

// Aegis
export function paladinAegis(level: number): NPCskillPreset {
  const skillForActive = [
      PaladinSkillId.AegisPulse,
      PaladinSkillId.AegisShield,
      ClericSkillId.Radiance,
  ];

  return createSkillPreset(skillForActive, [], new Map(), level);
}

// Retribution
export function paladinRetribution(level: number): NPCskillPreset {
  const skillForActive = [
    PaladinSkillId.DivineWrath,
    PaladinSkillId.RighteousSmite,
  ];

  return createSkillPreset(skillForActive, [], new Map(), level);
}

// Leadership
export function paladinLeaders(level: number): NPCskillPreset {
  const skillForActive = [
    PaladinSkillId.RallyingCry,
    PaladinSkillId.InspiringPresence,
  ];

  return createSkillPreset(skillForActive, [], new Map(), level);
}

// ============================================================================
// SPELLBLADE PRESETS
// ============================================================================

// Swift Blade
export function spellbladeSwiftBlade(level: number): NPCskillPreset {
  const skillForActive = [
    SpellbladeSkillId.WindSlash,
    SpellbladeSkillId.GaleRush,
    SpellbladeSkillId.PlanarEdge,
  ];

  return createSkillPreset(skillForActive, [], new Map(), level);
}

// Mage Hunter
export function spellbladeMageHunter(level: number): NPCskillPreset {
  const skillForActive = [
    SpellbladeSkillId.PlanarSiphon,
    SpellbladeSkillId.SpellParry,
    SpellbladeSkillId.PlanarEdge,
  ];

  return createSkillPreset(skillForActive, [], new Map(), level);
}

// Edege Charge
export function spellbladeEdgeCharge(level: number): NPCskillPreset {
  const skillForActive = [
    SpellbladeSkillId.EdgeBurst,
    SpellbladeSkillId.ChargeSurge,
    SpellbladeSkillId.PlanarEdge,
  ];

  return createSkillPreset(skillForActive, [], new Map(), level);
}

// ============================================================================
// DRUID PRESETS
// ============================================================================

// Nature's Wrath
export function druidNatureWrath(level: number): NPCskillPreset {
  const skillForActive = [
    DruidSkillId.NaturesGrasp,
    DruidSkillId.ThornBurst,
    DruidSkillId.VineWhip,
  ];

  return createSkillPreset(skillForActive, [], new Map(), level);
}

// Growth
export function druidGrowth(level: number): NPCskillPreset {
  const skillForActive = [
    DruidSkillId.RejuvenatingMist,
    DruidSkillId.NurturingBloom,
    DruidSkillId.NaturalResilience,
  ];

  return createSkillPreset(skillForActive, [], new Map(), level);
}

// Wild
export function druidWild(level: number): NPCskillPreset {
  const skillForActive = [
    DruidSkillId.WildInstinct,
    DruidSkillId.PrimalStrike,
  ];

  return createSkillPreset(skillForActive, [], new Map(), level);
}

// ============================================================================
// MONK PRESETS
// ============================================================================

// Fist
export function monkFist(level: number): NPCskillPreset {
  const skillForActive = [
    MonkSkillId.StunningFist,
    MonkSkillId.FlurryOfBlows,
    MonkSkillId.PalmStrike,
  ];

  return createSkillPreset(skillForActive, [], new Map(), level);
}

// Master
export function monkMaster(level: number): NPCskillPreset {
  const skillForActive = [
    MonkSkillId.PrecisionStrike,
    MonkSkillId.DizzyingPalm,
    MonkSkillId.PalmStrike,
  ];

  return createSkillPreset(skillForActive, [], new Map(), level);
}

// ============================================================================
// WARLOCK PRESETS
// ============================================================================

// Shadow
export function warlockShadow(level: number): NPCskillPreset {
  const skillForActive = [
    WarlockSkillId.ChaosBurst,
    WarlockSkillId.ChaosBolt,
  ];


  return createSkillPreset(skillForActive, [], new Map(), level);
}

// Corruption
export function warlockCorruption(level: number): NPCskillPreset {
  const skillForActive = [
    WarlockSkillId.Corruption,
    WarlockSkillId.ChaosBurst,
    WarlockSkillId.CurseOfWeakness,
  ];

  return createSkillPreset(skillForActive, [], new Map(), level);
}

// Pact
export function warlockPact(level: number): NPCskillPreset {
  const skillForActive = [
    WarlockSkillId.DarkPact,
    WarlockSkillId.LifeDrain,
    WarlockSkillId.ChaosBolt,
  ];

  return createSkillPreset(skillForActive, [], new Map(), level);
}

// ============================================================================
// DUELIST PRESETS
// ============================================================================

// Parry
export function duelistParry(level: number): NPCskillPreset {
  const skillForActive = [
    DuelistSkillId.DuelingStance,
    DuelistSkillId.ParryRiposte,
  ];

  return createSkillPreset(skillForActive, [], new Map(), level);
}

// Precision
export function duelistPreciseStrike(level: number): NPCskillPreset {
  const skillForActive = [
    DuelistSkillId.BladeFlurry,
    DuelistSkillId.FeintStrike,
    DuelistSkillId.PreciseStrike,
  ];

  return createSkillPreset(skillForActive, [], new Map(), level);
}

// ============================================================================
// WITCH PRESETS
// ============================================================================

// Hex
export function witchHex(level: number): NPCskillPreset {
  const skillForActive = [
    WitchSkillId.CurseMark,
    WitchSkillId.HexWeave,
  ];

  return createSkillPreset(skillForActive, [], new Map(), level);
}

// Curse
export function witchCurse(level: number): NPCskillPreset {
  const skillForActive = [
      WitchSkillId.MisfortuneCurse,
      WitchSkillId.CurseBolt,
  ];

  return createSkillPreset(skillForActive, [], new Map(), level);
}

// Chaos
export function witchChaos(level: number): NPCskillPreset {
  const skillForActive = [
    WitchSkillId.Bewitch,
    WitchSkillId.ChaoticWeave,
  ];

  return createSkillPreset(skillForActive, [], new Map(), level);
}

// ============================================================================
// INQUISITOR PRESETS
// ============================================================================

// Smite
export function inquisitorSmite(level: number): NPCskillPreset {
  const skillForActive = [
    InquisitorSkillId.JudgmentDay,
    InquisitorSkillId.ExposeWeakness,
    InquisitorSkillId.RadiantSmite,
  ];

  return createSkillPreset(skillForActive, [], new Map(), level);
}

// Purge
export function inquisitorPurge(level: number): NPCskillPreset {
  const skillForActive = [
    InquisitorSkillId.JudgmentDay,
    InquisitorSkillId.PurgeMagic,
    InquisitorSkillId.CleansingFlame,
  ];

  return createSkillPreset(skillForActive, [], new Map(), level);
}

// ============================================================================
// SCHOLAR PRESETS
// ============================================================================

// Analyze
export function scholarAnalyze(level: number): NPCskillPreset {
  const skillForActive = [
    ScholarSkillId.Analyze,
  ];

  return createSkillPreset(skillForActive, [], new Map(), level);
}

// Disrupt
export function scholarDisrupt(level: number): NPCskillPreset {
  const skillForActive = [
    ScholarSkillId.MentalInterference,
    ScholarSkillId.DisruptPattern,
  ];

  return createSkillPreset(skillForActive, [], new Map(), level);
}

// Overload
export function scholarOverload(level: number): NPCskillPreset {
  const skillForActive = [
    ScholarSkillId.CognitiveOverload,
    ScholarSkillId.DebilitatingStrike,
    ScholarSkillId.MentalInterference,
    ScholarSkillId.DisruptPattern,
  ];

  return createSkillPreset(skillForActive, [], new Map(), level);
}

// ============================================================================
// SEER PRESETS
// ============================================================================

// Foreseen
export function seerForeseen(level: number): NPCskillPreset {
  const skillForActive = [
      SeerSkillId.ForeseenStep,
      SeerSkillId.FortuneStrike,
      SeerSkillId.PlanarEcho,
  ];

  return createSkillPreset(skillForActive, [], new Map(), level);
}

// Manipulator
export function seerManipulator(level: number): NPCskillPreset {
  const skillForActive = [
    SeerSkillId.ThreadBacklash,
    SeerSkillId.GrabOnPlanarThreadWithBareHand,
    SeerSkillId.PlanarEcho,
  ];

  return createSkillPreset(skillForActive, [], new Map(), level);
}

// ============================================================================
// MYSTIC PRESETS
// ============================================================================

// Mist
export function mysticMist(level: number): NPCskillPreset {
  const skillForActive = [
    MysticSkillId.MistPierce,
    MysticSkillId.MistStep,
    MysticSkillId.ReversalPalm,
  ];

  return createSkillPreset(skillForActive, [], new Map(), level);
}

// Absorber
export function mysticAbsorber(level: number): NPCskillPreset {
  const skillForActive = [
    MysticSkillId.BorrowedMomentum,
    MysticSkillId.MistPierce,
    MysticSkillId.MistStep,
    MysticSkillId.ReversalPalm,
  ];

  return createSkillPreset(skillForActive, [], new Map(), level);
}

// ============================================================================
// ENGINEER PRESETS
// ============================================================================

// Trap
export function engineerTrap(level: number): NPCskillPreset {
  const skillForActive = [
    EngineerSkillId.Tripwire,
    EngineerSkillId.BearTrap,
  ];

  return createSkillPreset(skillForActive, [], new Map(), level);
}

// Explosion
export function engineerExplosion(level: number): NPCskillPreset {
  const skillForActive = [
    EngineerSkillId.FragmentationGrenade,
    EngineerSkillId.ExplosiveBolt,
  ];

  return createSkillPreset(skillForActive, [], new Map(), level);
}

// Construct
export function engineerConstruct(level: number): NPCskillPreset {
  const skillForActive = [
    EngineerSkillId.MechanicalOverdrive,
    EngineerSkillId.GearShift,
  ];

  return createSkillPreset(skillForActive, [], new Map(), level);
}

// ============================================================================
// NOMAD PRESETS
// ============================================================================

// Adaptive Strike
export function nomadAdaptiveStrike(level: number): NPCskillPreset {
  const skillForActive = [
    NomadSkillId.AdaptiveRetreat,
    NomadSkillId.AdaptiveStrike,
  ];

  return createSkillPreset(skillForActive, [], new Map(), level);
}

// Tactical
export function nomadTactical(level: number): NPCskillPreset {
  const skillForActive = [
    NomadSkillId.TacticalShot,
    NomadSkillId.TacticalAdvance,
  ];

  return createSkillPreset(skillForActive, [], new Map(), level);
}

// Mobility
export function nomadMobility(level: number): NPCskillPreset {
  const skillForActive = [
    NomadSkillId.RepositioningStrike,
    NomadSkillId.TacticalSlash,
    NomadSkillId.QuickStep,
  ];

  return createSkillPreset(skillForActive, [], new Map(), level);
}