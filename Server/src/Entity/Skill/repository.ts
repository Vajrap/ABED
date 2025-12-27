import { basicAttack } from "./definition/basicAttack";
import {
  BarbarianSkillId,
  BasicSkillId,
  ClericSkillId,
  GuardianSkillId,
  KnightSkillId,
  MageSkillId,
  MobSkillId,
  MysticSkillId,
  PaladinSkillId,
  DruidSkillId,
  MonkSkillId,
  RogueSkillId,
  ScholarSkillId,
  ShamanSkillId,
  SkillId,
  SpellbladeSkillId,
  WarriorSkillId,
  WitchSkillId,
  WarlockSkillId,
  DuelistSkillId,
  InquisitorSkillId,
  SeerSkillId,
  EngineerSkillId,
  NomadSkillId
} from "./enums";
import type { Skill } from "./Skill";
import { shriek } from "src/Entity/Skill/definition/MOBs/Goblin/shriek.ts";
import { throwPebble } from "src/Entity/Skill/definition/MOBs/Goblin/throwPebble.ts";
import { panicSlash } from "src/Entity/Skill/definition/MOBs/Goblin/panicSlash.ts";
import { herosPose } from "./definition/Classes/Guardian/herosPose";
import { arcaneShield } from "./definition/Classes/Mage/arcaneShield";
import { backstab } from "./definition/Classes/Rogue/backstab";
import { retreatDash } from "./definition/Classes/Rogue/retreatDash";
import { bleedingCut } from "./definition/Classes/Rogue/bleedingCut";
import { throwingKnives } from "./definition/Classes/Rogue/throwingKnives";
import { hiding } from "./definition/Classes/Rogue/hiding";
import { crippingSlice } from "./definition/Classes/Rogue/crippingSlice";
import { opportunistStrike } from "./definition/Classes/Rogue/opportunistStrike";
import { pinningShot } from "./definition/Classes/Rogue/pinningShot";
import { splitTrajectory } from "./definition/Classes/Rogue/splitTrajectory";
import { bash } from "./definition/Classes/Guardian/bash";
import { cleave } from "./definition/Classes/Warrior/cleave";
import { powerStrike } from "./definition/Classes/Warrior/powerStrike";
import { warCry } from "./definition/Classes/Warrior/warCry";
import { weaponAdaptation } from "./definition/Classes/Warrior/weaponAdaptation";
import { versatileStrike } from "./definition/Classes/Warrior/versatileStrike";
import { battlefieldDominance } from "./definition/Classes/Warrior/battlefieldDominance";
import { positioningStrike } from "./definition/Classes/Warrior/positioningStrike";
import { challengeStrike } from "./definition/Classes/Warrior/challengeStrike";
import { finishingBlow } from "./definition/Classes/Warrior/finishingBlow";
import { taunt } from "./definition/Classes/Guardian/taunt";
import { shieldUp } from "./definition/Classes/Guardian/shieldUp";
import { fortressStance } from "./definition/Classes/Guardian/fortressStance";
import { sentinelDuty } from "./definition/Classes/Guardian/sentinelDuty";
import { guardian } from "./definition/Classes/Guardian/guardian";
import { fireBolt } from "./definition/Classes/Mage/fireBolt";
import { burningHand } from "./definition/Classes/Mage/burningHand";
import { fireBall } from "./definition/Classes/Mage/fireBall";
import { backdraft } from "./definition/Classes/Mage/backdraft";
import { mendSpirit } from "./definition/Classes/Shaman/mendSpirit";
import { hexOfRot } from "./definition/Classes/Shaman/hexOfRot";
import { holyRattle } from "./definition/Classes/Shaman/spiritRattle";
import { chaoticBlessing } from "./definition/Classes/Shaman/chaoticBlessing";
import { hexMark } from "./definition/Classes/Shaman/hexMark";
import { cleansingBlessing } from "./definition/Classes/Shaman/cleansingBlessing";
import { wardOfProtection } from "./definition/Classes/Shaman/wardOfProtection";
import { harmonization } from "./definition/Classes/Shaman/harmonization";
import { dualNature } from "./definition/Classes/Shaman/dualNature";
import { arcaneBolt } from "./definition/Classes/Mage/arcaneBolt";
import { arcaneMissiles } from "./definition/Classes/Mage/arcaneMissiles";
import { worksYouMaggots } from "./definition/MOBs/Goblin/worksYouMaggots";
import { commanderScream } from "./definition/MOBs/Goblin/commanderScream";
import { whip } from "./definition/MOBs/Goblin/whip";
import { heal } from "./definition/Classes/Cleric/heal";
import { massHeal } from "./definition/Classes/Cleric/massHeal";
import { radiance } from "./definition/Classes/Cleric/radiance";
import { bless } from "./definition/Classes/Cleric/bless";
import { turnUndead } from "./definition/Classes/Cleric/turnUndead";
import { protection } from "./definition/Classes/Cleric/protection";
import { revive } from "./definition/Classes/Cleric/revive";
import { purify } from "./definition/Classes/Cleric/purify";
import { bind } from "./definition/Classes/Cleric/bind";
import { holyWater } from "./definition/Classes/Cleric/holyWater";
import { analyze } from "./definition/Classes/Scholar/analyze";
import { disruptPattern } from "./definition/Classes/Scholar/disruptPattern";
import { cognitiveOverload } from "./definition/Classes/Scholar/cognitiveOverload";
import { weaknessStudy } from "./definition/Classes/Scholar/weaknessStudy";
import { mentalInterference } from "./definition/Classes/Scholar/mentalInterference";
import { debilitatingStrike } from "./definition/Classes/Scholar/debilitatingStrike";
import { mistStep } from "./definition/Classes/Mystic/mistStep";
import { mistPierce } from "./definition/Classes/Mystic/mistPierce";
import { planarAbsorption } from "./definition/Classes/Mystic/planarAbsorption";
import { borrowedMomentum } from "./definition/Classes/Mystic/borrowedMomentum";
import { innerVeil } from "./definition/Classes/Mystic/innerVeil";
import { reversalPalm } from "./definition/Classes/Mystic/reversalPalm";
import { planarEdge } from "./definition/Classes/Spellblade/planarEdge";
import { windSlash } from "./definition/Classes/Spellblade/windSlash";
import { spellParry } from "./definition/Classes/Spellblade/spellParry";
import { edgeBurst } from "./definition/Classes/Spellblade/edgeBurst";
import { galeRush } from "./definition/Classes/Spellblade/galeRush";
import { planarSiphon } from "./definition/Classes/Spellblade/planarSiphon";
import { chargeSurge } from "./definition/Classes/Spellblade/chargeSurge";
import { rage } from "./definition/Classes/Barbarian/rage";
import { recklessSwing } from "./definition/Classes/Barbarian/recklessSwing";
import { earthshatter } from "./definition/Classes/Barbarian/earthshatter";
import { bloodFrenzy } from "./definition/Classes/Barbarian/bloodFrenzy";
import { groundSlam } from "./definition/Classes/Barbarian/groundSlam";
import { battleHardened } from "./definition/Classes/Barbarian/battleHardened";
import { precisionThrust } from "./definition/Classes/Knight/precisionThrust";
import { advancingPaceSkill } from "./definition/Classes/Knight/advancingPace";
import { tacticalCommand } from "./definition/Classes/Knight/tacticalCommand";
import { battleFormation } from "./definition/Classes/Knight/battleFormation";
import { relentlessCharge } from "./definition/Classes/Knight/relentlessCharge";
import { disciplinedAdvance } from "./definition/Classes/Knight/disciplinedAdvance";
import { shieldedStrike } from "./definition/Classes/Knight/shieldedStrike";
import { shieldBash } from "./definition/Classes/Knight/shieldBash";
import { divineStrike } from "./definition/Classes/Paladin/divineStrike";
import { aegisPulse } from "./definition/Classes/Paladin/aegisPulse";
import { aegisShield } from "./definition/Classes/Paladin/aegisShield";
import { righteousSmite } from "./definition/Classes/Paladin/righteousSmite";
import { divineWrath } from "./definition/Classes/Paladin/divineWrath";
import { rallyingCry } from "./definition/Classes/Paladin/rallyingCry";
import { inspiringPresence } from "./definition/Classes/Paladin/inspiringPresence";
import { vineWhip } from "./definition/Classes/Druid/vineWhip";
import { throwSpear } from "./definition/Classes/Druid/throwSpear";
import { rejuvenatingMist } from "./definition/Classes/Druid/rejuvenatingMist";
import { thornBurst } from "./definition/Classes/Druid/thornBurst";
import { naturesGrasp } from "./definition/Classes/Druid/naturesGrasp";
import { nurturingBloom } from "./definition/Classes/Druid/nurturingBloom";
import { naturalResilience } from "./definition/Classes/Druid/naturalResilience";
import { primalStrike } from "./definition/Classes/Druid/primalStrike";
import { wildInstinctSkill } from "./definition/Classes/Druid/wildInstinct";
import { palmStrike } from "./definition/Classes/Monk/palmStrike";
import { meditation } from "./definition/Classes/Monk/meditation";
import { flurryOfBlows } from "./definition/Classes/Monk/flurryOfBlows";
import { stunningFist } from "./definition/Classes/Monk/stunningFist";
import { precisionStrike } from "./definition/Classes/Monk/precisionStrike";
import { dizzyingPalm } from "./definition/Classes/Monk/dizzyingPalm";
import { chaosBolt } from "./definition/Classes/Warlock/shadowBolt";
import { lifeDrain } from "./definition/Classes/Warlock/lifeDrain";
import { darkPact } from "./definition/Classes/Warlock/darkPact";
import { corruption } from "./definition/Classes/Warlock/corruption";
import { chaosBurst } from "./definition/Classes/Warlock/chaosBurst";
import { voidBolt } from "./definition/Classes/Warlock/voidBolt";
import { curseOfWeakness } from "./definition/Classes/Warlock/curseOfWeakness";
import { preciseStrike } from "./definition/Classes/Duelist/preciseStrike";
import { parryRiposte } from "./definition/Classes/Duelist/parryRiposte";
import { bladeFlurry } from "./definition/Classes/Duelist/bladeFlurry";
import { duelingStance } from "./definition/Classes/Duelist/duelingStance";
import { feintStrike } from "./definition/Classes/Duelist/feintStrike";
import { poisonDart } from "./definition/Classes/Witch/poisonDart";
import { chaosBrand } from "./definition/Classes/Witch/chaosBrand";
import { chaosBinding } from "./definition/Classes/Witch/chaosBinding";
import { bewitch } from "./definition/Classes/Witch/bewitch";
import { hexWeave } from "./definition/Classes/Witch/hexWeave";
import { misfortuneCurse } from "./definition/Classes/Witch/misfortuneCurse";
import { chaoticWeave } from "./definition/Classes/Witch/chaoticWeave";
import { radiantSmite } from "./definition/Classes/Inquisitor/radiantSmite";
import { exposeWeakness } from "./definition/Classes/Inquisitor/exposeWeakness";
import { judgmentDay } from "./definition/Classes/Inquisitor/judgmentDay";
import { purgeMagic } from "./definition/Classes/Inquisitor/purgeMagic";
import { cleansingFlame } from "./definition/Classes/Inquisitor/cleansingFlame";
import { precognition } from "./definition/Classes/Seer/precognition";
import { threadSnip } from "./definition/Classes/Seer/threadSnip";
import { grabOnPlanarThreadWithBareHand } from "./definition/Classes/Seer/grabOnPlanarThreadWithBareHand";
import { threadBacklash } from "./definition/Classes/Seer/threadBacklash";
import { planarEcho } from "./definition/Classes/Seer/planarEcho";
import { foreseenStep } from "./definition/Classes/Seer/foreseenStep";
import { explosiveBolt } from "./definition/Classes/Engineer/explosiveBolt";
import { bearTrap } from "./definition/Classes/Engineer/bearTrap";
import { tripwire } from "./definition/Classes/Engineer/tripwire";
import { fragmentationGrenade } from "./definition/Classes/Engineer/fragmentationGrenade";
import { mechanicalOverdrive } from "./definition/Classes/Engineer/mechanicalOverdrive";
import { gearShift } from "./definition/Classes/Engineer/gearShift";
import { adaptiveStrike } from "./definition/Classes/Nomad/adaptiveStrike";
import { tacticalSlash } from "./definition/Classes/Nomad/tacticalSlash";
import { tacticalShot } from "./definition/Classes/Nomad/tacticalShot";
import { adaptiveRetreat } from "./definition/Classes/Nomad/adaptiveRetreat";
import { tacticalAdvance } from "./definition/Classes/Nomad/tacticalAdvance";
import { quickStep } from "./definition/Classes/Nomad/quickStep";
import { repositioningStrike } from "./definition/Classes/Nomad/repositioningStrike";
import { fortuneStrike } from "./definition/Classes/Seer/fortuneStrike";
import { twistOutcome } from "./definition/Classes/Seer/twistOutcome";
import { arcaneBattery } from "./definition/Classes/Mage/arcaneBattery";
import { planarSurge } from "./definition/Classes/Mage/planarSurge";
import { planarEruption } from "./definition/Classes/Mage/planarEruption";
import { hydroLash } from "./definition/Classes/Mage/hydroLash";
import { aquaBlast } from "./definition/Classes/Mage/aquaBlast";
import { cascadePulse } from "./definition/Classes/Mage/cascadePulse";
import { crushingDepths } from "./definition/Classes/Mage/crushingDepths";
import { stoneShard } from "./definition/Classes/Mage/stoneShard";
import { stoneSkin } from "./definition/Classes/Mage/stoneSkin";
import { earthernGrip } from "./definition/Classes/Mage/earthernGrip";
import { tremorWave } from "./definition/Classes/Mage/tremorWave";
import { windSlice } from "./definition/Classes/Mage/windSlice";
import { galeSlash } from "./definition/Classes/Mage/galeSlash";
import { razorGust } from "./definition/Classes/Mage/razorGust";
import { windFury } from "./definition/Classes/Mage/windFury";

export const skillRepository: Record<SkillId, Skill> = {
  [BasicSkillId.Basic]: basicAttack,
  [RogueSkillId.RetreatDash]: retreatDash,
  [RogueSkillId.Backstab]: backstab,
  [RogueSkillId.BleedingCut]: bleedingCut,
  [RogueSkillId.ThrowingKnives]: throwingKnives,
  [RogueSkillId.Hiding]: hiding,
  [RogueSkillId.CrippingSlice]: crippingSlice,
  [RogueSkillId.OpportunistStrike]: opportunistStrike,
  [RogueSkillId.PinningShot]: pinningShot,
  [RogueSkillId.SplitTrajectory]: splitTrajectory,

  [WarriorSkillId.Cleave]: cleave,
  [WarriorSkillId.PowerStrike]: powerStrike,
  [WarriorSkillId.WarCry]: warCry,
  [WarriorSkillId.WeaponAdaptation]: weaponAdaptation,
  [WarriorSkillId.VersatileStrike]: versatileStrike,
  [WarriorSkillId.BattlefieldDominance]: battlefieldDominance,
  [WarriorSkillId.PositioningStrike]: positioningStrike,
  [WarriorSkillId.ChallengeStrike]: challengeStrike,
  [WarriorSkillId.FinishingBlow]: finishingBlow,

  [GuardianSkillId.Bash]: bash,
  [GuardianSkillId.Taunt]: taunt,
  [GuardianSkillId.HerosPose]: herosPose,
  [GuardianSkillId.ShieldUp]: shieldUp,
  [GuardianSkillId.FortressStance]: fortressStance,
  [GuardianSkillId.SentinelDuty]: sentinelDuty,
  [GuardianSkillId.Guardian]: guardian,

  [ShamanSkillId.SpiritRattle]: holyRattle,
  [ShamanSkillId.ChaoticBlessing]: chaoticBlessing,
  [ShamanSkillId.MendSpirit]: mendSpirit,
  [ShamanSkillId.HexOfRot]: hexOfRot,
  [ShamanSkillId.HexMark]: hexMark,
  [ShamanSkillId.CleansingBlessing]: cleansingBlessing,
  [ShamanSkillId.WardOfProtection]: wardOfProtection,
  [ShamanSkillId.Harmonization]: harmonization,
  [ShamanSkillId.DualNature]: dualNature,

  [MageSkillId.ArcaneBolt]: arcaneBolt,
  [MageSkillId.ArcaneMissiles]: arcaneMissiles,
  [MageSkillId.ArcaneShield]: arcaneShield,
  [MageSkillId.PlanarSurge]: planarSurge,
  [MageSkillId.ArcaneBattery]: arcaneBattery,
  [MageSkillId.PlanarEruption]: planarEruption,
  [MageSkillId.Backdraft]: backdraft,
  [MageSkillId.FireBolt]: fireBolt,
  [MageSkillId.FireBall]: fireBall,
  [MageSkillId.BurningHand]: burningHand,
  [MageSkillId.HydroLash]: hydroLash,
  [MageSkillId.AquaBlast]: aquaBlast,
  [MageSkillId.CascadePulse]: cascadePulse,
  [MageSkillId.CrushingDepths]: crushingDepths,
  [MageSkillId.StoneShard]: stoneShard,
  [MageSkillId.StoneSkin]: stoneSkin,
  [MageSkillId.EarthernGrip]: earthernGrip,
  [MageSkillId.TremorWave]: tremorWave,
  [MageSkillId.WindSlice]: windSlice,
  [MageSkillId.GaleSlash]: galeSlash,
  [MageSkillId.RazorGust]: razorGust,
  [MageSkillId.WindFury]: windFury,

  [ClericSkillId.Heal]: heal,
  [ClericSkillId.MassHeal]: massHeal,
  [ClericSkillId.Radiance]: radiance,
  [ClericSkillId.Bless]: bless,
  [ClericSkillId.TurnUndead]: turnUndead,
  [ClericSkillId.Protection]: protection,
  [ClericSkillId.Revive]: revive,
  [ClericSkillId.Purify]: purify,
  [ClericSkillId.Bind]: bind,
  [ClericSkillId.HolyWater]: holyWater,
  [ClericSkillId.DivineStrike]: divineStrike,

  [ScholarSkillId.Analyze]: analyze,
  [ScholarSkillId.DisruptPattern]: disruptPattern,
  [ScholarSkillId.CognitiveOverload]: cognitiveOverload,
  [ScholarSkillId.WeaknessStudy]: weaknessStudy,
  [ScholarSkillId.MentalInterference]: mentalInterference,
  [ScholarSkillId.DebilitatingStrike]: debilitatingStrike,

  [MysticSkillId.MistStep]: mistStep,
  [MysticSkillId.MistPierce]: mistPierce,
  [MysticSkillId.PlanarAbsorption]: planarAbsorption,
  [MysticSkillId.BorrowedMomentum]: borrowedMomentum,
  [MysticSkillId.InnerVeil]: innerVeil,
  [MysticSkillId.ReversalPalm]: reversalPalm,

  [SpellbladeSkillId.PlanarEdge]: planarEdge,
  [SpellbladeSkillId.WindSlash]: windSlash,
  [SpellbladeSkillId.SpellParry]: spellParry,
  [SpellbladeSkillId.EdgeBurst]: edgeBurst,
  [SpellbladeSkillId.GaleRush]: galeRush,
  [SpellbladeSkillId.PlanarSiphon]: planarSiphon,
  [SpellbladeSkillId.ChargeSurge]: chargeSurge,

  [BarbarianSkillId.Rage]: rage,
  [BarbarianSkillId.RecklessSwing]: recklessSwing,
  [BarbarianSkillId.Earthshatter]: earthshatter,
  [BarbarianSkillId.BloodFrenzy]: bloodFrenzy,
  [BarbarianSkillId.GroundSlam]: groundSlam,
  [BarbarianSkillId.BattleHardened]: battleHardened,

  [KnightSkillId.PrecisionThrust]: precisionThrust,
  [KnightSkillId.AdvancingPace]: advancingPaceSkill,
  [KnightSkillId.TacticalCommand]: tacticalCommand,
  [KnightSkillId.BattleFormation]: battleFormation,
  [KnightSkillId.RelentlessCharge]: relentlessCharge,
  [KnightSkillId.DisciplinedAdvance]: disciplinedAdvance,
  [KnightSkillId.ShieldedStrike]: shieldedStrike,
  [KnightSkillId.ShieldBash]: shieldBash,

  [PaladinSkillId.AegisPulse]: aegisPulse,
  [PaladinSkillId.AegisShield]: aegisShield,
  [PaladinSkillId.RighteousSmite]: righteousSmite,
  [PaladinSkillId.DivineWrath]: divineWrath,
  [PaladinSkillId.RallyingCry]: rallyingCry,
  [PaladinSkillId.InspiringPresence]: inspiringPresence,

  [DruidSkillId.VineWhip]: vineWhip,
  [DruidSkillId.ThrowSpear]: throwSpear,
  [DruidSkillId.RejuvenatingMist]: rejuvenatingMist,
  [DruidSkillId.ThornBurst]: thornBurst,
  [DruidSkillId.NaturesGrasp]: naturesGrasp,
  [DruidSkillId.NurturingBloom]: nurturingBloom,
  [DruidSkillId.NaturalResilience]: naturalResilience,
  [DruidSkillId.PrimalStrike]: primalStrike,
  [DruidSkillId.WildInstinct]: wildInstinctSkill,

  [MonkSkillId.PalmStrike]: palmStrike,
  [MonkSkillId.FlurryOfBlows]: flurryOfBlows,
  [MonkSkillId.StunningFist]: stunningFist,
  [MonkSkillId.PrecisionStrike]: precisionStrike,
  [MonkSkillId.DizzyingPalm]: dizzyingPalm,

  [WarlockSkillId.ChaosBolt]: chaosBolt,
  [WarlockSkillId.LifeDrain]: lifeDrain,
  [WarlockSkillId.Corruption]: corruption,
  [WarlockSkillId.DarkPact]: darkPact,
  [WarlockSkillId.ChaosBurst]: chaosBurst,
  [WarlockSkillId.VoidBolt]: voidBolt,
  [WarlockSkillId.CurseOfWeakness]: curseOfWeakness,

  [DuelistSkillId.PreciseStrike]: preciseStrike,
  [DuelistSkillId.ParryRiposte]: parryRiposte,
  [DuelistSkillId.BladeFlurry]: bladeFlurry,
  [DuelistSkillId.DuelingStance]: duelingStance,
  [DuelistSkillId.FeintStrike]: feintStrike,

  [WitchSkillId.CurseBolt]: poisonDart,
  [WitchSkillId.CurseMark]: chaosBrand,
  [WitchSkillId.ChaosBinding]: chaosBinding,
  [WitchSkillId.Bewitch]: bewitch,
  [WitchSkillId.HexWeave]: hexWeave,
  [WitchSkillId.MisfortuneCurse]: misfortuneCurse,
  [WitchSkillId.ChaoticWeave]: chaoticWeave,

  [InquisitorSkillId.RadiantSmite]: radiantSmite,
  [InquisitorSkillId.ExposeWeakness]: exposeWeakness,
  [InquisitorSkillId.PurgeMagic]: purgeMagic,
  [InquisitorSkillId.JudgmentDay]: judgmentDay,
  [InquisitorSkillId.CleansingFlame]: cleansingFlame,

  [SeerSkillId.Precognition]: precognition,
  [SeerSkillId.ThreadSnip]: threadSnip,
  [SeerSkillId.PlanarEcho]: planarEcho,
  [SeerSkillId.ForeseenStep]: foreseenStep,
  [SeerSkillId.FortuneStrike]: fortuneStrike,
  [SeerSkillId.TwistOutcome]: twistOutcome,
  [SeerSkillId.GrabOnPlanarThreadWithBareHand]: grabOnPlanarThreadWithBareHand,
  [SeerSkillId.ThreadBacklash]: threadBacklash,

  [EngineerSkillId.ExplosiveBolt]: explosiveBolt,
  [EngineerSkillId.BearTrap]: bearTrap,
  [EngineerSkillId.Tripwire]: tripwire,
  [EngineerSkillId.FragmentationGrenade]: fragmentationGrenade,
  [EngineerSkillId.MechanicalOverdrive]: mechanicalOverdrive,
  [EngineerSkillId.GearShift]: gearShift,

  [NomadSkillId.AdaptiveStrike]: adaptiveStrike,
  [NomadSkillId.TacticalSlash]: tacticalSlash,
  [NomadSkillId.TacticalShot]: tacticalShot,
  [NomadSkillId.AdaptiveRetreat]: adaptiveRetreat,
  [NomadSkillId.TacticalAdvance]: tacticalAdvance,
  [NomadSkillId.QuickStep]: quickStep,
  [NomadSkillId.RepositioningStrike]: repositioningStrike,

  [MobSkillId.WorksYouMaggots]: worksYouMaggots,
  [MobSkillId.CommanderScream]: commanderScream,
  [MobSkillId.Whip]: whip,
  [MobSkillId.ThrowPebble]: throwPebble,
  [MobSkillId.PanicSlash]: panicSlash,
  [MobSkillId.Shriek]: shriek,
};
