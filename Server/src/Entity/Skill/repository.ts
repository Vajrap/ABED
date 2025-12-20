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
import { vineWhip } from "./definition/Classes/Druid/vineWhip";
import { throwSpear } from "./definition/Classes/Druid/throwSpear";
import { rejuvenatingMist } from "./definition/Classes/Druid/rejuvenatingMist";
import { palmStrike } from "./definition/Classes/Monk/palmStrike";
import { meditation } from "./definition/Classes/Monk/meditation";
import { flurryOfBlows } from "./definition/Classes/Monk/flurryOfBlows";
import { chaosBolt } from "./definition/Classes/Warlock/shadowBolt";
import { lifeDrain } from "./definition/Classes/Warlock/lifeDrain";
import { darkPact } from "./definition/Classes/Warlock/darkPact";
import { corruption } from "./definition/Classes/Warlock/corruption";
import { preciseStrike } from "./definition/Classes/Duelist/preciseStrike";
import { parryRiposte } from "./definition/Classes/Duelist/parryRiposte";
import { bladeFlurry } from "./definition/Classes/Duelist/bladeFlurry";
import { duelingStance } from "./definition/Classes/Duelist/duelingStance";
import { poisonDart } from "./definition/Classes/Witch/poisonDart";
import { chaosBrand } from "./definition/Classes/Witch/chaosBrand";
import { chaosBinding } from "./definition/Classes/Witch/chaosBinding";
import { bewitch } from "./definition/Classes/Witch/bewitch";
import { radiantSmite } from "./definition/Classes/Inquisitor/radiantSmite";
import { exposeWeakness } from "./definition/Classes/Inquisitor/exposeWeakness";
import { judgmentDay } from "./definition/Classes/Inquisitor/judgmentDay";
import { purgeMagic } from "./definition/Classes/Inquisitor/purgeMagic";
import { precognition } from "./definition/Classes/Seer/precognition";
import { threadSnip } from "./definition/Classes/Seer/threadSnip";
import { grabOnPlanarThreadWithBareHand } from "./definition/Classes/Seer/grabOnPlanarThreadWithBareHand";
import { threadBacklash } from "./definition/Classes/Seer/threadBacklash";
import { planarEcho } from "./definition/Classes/Seer/planarEcho";
import { foreseenStep } from "./definition/Classes/Seer/foreseenStep";
import { explosiveBolt } from "./definition/Classes/Engineer/explosiveBolt";
import { bearTrap } from "./definition/Classes/Engineer/bearTrap";
import { adaptiveStrike } from "./definition/Classes/Nomad/adaptiveStrike";
import { tacticalSlash } from "./definition/Classes/Nomad/tacticalSlash";
import { tacticalShot } from "./definition/Classes/Nomad/tacticalShot";
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
  [ShamanSkillId.HolyRattle]: holyRattle,
  [ShamanSkillId.ChaoticBlessing]: chaoticBlessing,
  [ShamanSkillId.MendSpirit]: mendSpirit,
  [ShamanSkillId.HexOfRot]: hexOfRot,
  [ShamanSkillId.HexMark]: hexMark,
  [ShamanSkillId.CleansingBlessing]: cleansingBlessing,
  [ShamanSkillId.WardOfProtection]: wardOfProtection,
  [ShamanSkillId.Harmonization]: harmonization,
  [ShamanSkillId.DualNature]: dualNature,
  [MageSkillId.ArcaneBolt]: arcaneBolt,
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
  [MobSkillId.WorksYouMaggots]: worksYouMaggots,
  [MobSkillId.CommanderScream]: commanderScream,
  [MobSkillId.Whip]: whip,
  [MobSkillId.ThrowPebble]: throwPebble,
  [MobSkillId.PanicSlash]: panicSlash,
  [MobSkillId.Shriek]: shriek,
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
  [DruidSkillId.VineWhip]: vineWhip,
  [DruidSkillId.ThrowSpear]: throwSpear,
  [DruidSkillId.RejuvenatingMist]: rejuvenatingMist,
  [MonkSkillId.PalmStrike]: palmStrike,
  [MonkSkillId.Meditation]: meditation,
  [MonkSkillId.FlurryOfBlows]: flurryOfBlows,
  [WarlockSkillId.ChaosBolt]: chaosBolt,
  [WarlockSkillId.LifeDrain]: lifeDrain,
  [WarlockSkillId.Corruption]: corruption,
  [WarlockSkillId.DarkPact]: darkPact,
  [DuelistSkillId.PreciseStrike]: preciseStrike,
  [DuelistSkillId.ParryRiposte]: parryRiposte,
  [DuelistSkillId.BladeFlurry]: bladeFlurry,
  [DuelistSkillId.DuelingStance]: duelingStance,
  [WitchSkillId.PoisonDart]: poisonDart,
  [WitchSkillId.ChaosBrand]: chaosBrand,
  [WitchSkillId.ChaosBinding]: chaosBinding,
  [WitchSkillId.Bewitch]: bewitch,
  [InquisitorSkillId.RadiantSmite]: radiantSmite,
  [InquisitorSkillId.ExposeWeakness]: exposeWeakness,
  [InquisitorSkillId.PurgeMagic]: purgeMagic,
  [InquisitorSkillId.JudgmentDay]: judgmentDay,
  [SeerSkillId.Precognition]: precognition,
  [SeerSkillId.ThreadSnip]: threadSnip,
  [SeerSkillId.PlanarEcho]: planarEcho,
  [EngineerSkillId.ExplosiveBolt]: explosiveBolt,
  [EngineerSkillId.BearTrap]: bearTrap,
  [NomadSkillId.AdaptiveStrike]: adaptiveStrike,
  [NomadSkillId.TacticalSlash]: tacticalSlash,
  [NomadSkillId.TacticalShot]: tacticalShot,
  [SeerSkillId.ForeseenStep]: foreseenStep,
  [SeerSkillId.FortuneStrike]: fortuneStrike,
  [SeerSkillId.TwistOutcome]: twistOutcome,
  [SeerSkillId.GrabOnPlanarThreadWithBareHand]: grabOnPlanarThreadWithBareHand,
  [SeerSkillId.ThreadBacklash]: threadBacklash,
  [ScholarSkillId.WeaknessStudy]: undefined,
  [ScholarSkillId.MentalInterference]: undefined,
  [ScholarSkillId.DebilitatingStrike]: undefined,
  [GuardianSkillId.FortressStance]: undefined,
  [GuardianSkillId.SentinelDuty]: undefined,
  [GuardianSkillId.GuardAlly]: undefined,
  [GuardianSkillId.ProtectiveBarrier]: undefined,
  [PaladinSkillId.AegisWard]: undefined,
  [PaladinSkillId.RighteousSmite]: undefined,
  [PaladinSkillId.DivineWrath]: undefined,
  [PaladinSkillId.RallyingCry]: undefined,
  [PaladinSkillId.InspiringPresence]: undefined,
  [DruidSkillId.ThornBurst]: undefined,
  [DruidSkillId.NaturesGrasp]: undefined,
  [DruidSkillId.NurturingBloom]: undefined,
  [DruidSkillId.NaturalResilience]: undefined,
  [DruidSkillId.PrimalStrike]: undefined,
  [DruidSkillId.WildInstinct]: undefined,
  [MonkSkillId.StunningFist]: undefined,
  [MonkSkillId.InnerPeace]: undefined,
  [MonkSkillId.ChiFlow]: undefined,
  [MonkSkillId.PrecisionStrike]: undefined,
  [MonkSkillId.DizzyingPalm]: undefined,
  [WarlockSkillId.ShadowBurst]: undefined,
  [WarlockSkillId.VoidBolt]: undefined,
  [WarlockSkillId.CurseOfWeakness]: undefined,
  [DuelistSkillId.PerfectParry]: undefined,
  [DuelistSkillId.FeintStrike]: undefined,
  [DuelistSkillId.ComboStrike]: undefined,
  [WitchSkillId.HexWeave]: undefined,
  [WitchSkillId.MisfortuneCurse]: undefined,
  [WitchSkillId.ChaoticWeave]: undefined,
  [InquisitorSkillId.CleansingFlame]: undefined,
  [EngineerSkillId.Tripwire]: undefined,
  [EngineerSkillId.FragmentationGrenade]: undefined,
  [EngineerSkillId.MechanicalOverdrive]: undefined,
  [EngineerSkillId.GearShift]: undefined,
  [NomadSkillId.AdaptiveRetreat]: undefined,
  [NomadSkillId.TacticalAdvance]: undefined,
  [NomadSkillId.QuickStep]: undefined,
  [NomadSkillId.RepositioningStrike]: undefined
};
