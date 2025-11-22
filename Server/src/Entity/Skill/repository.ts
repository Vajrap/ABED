import { basicAttack } from "./definition/basicAttack";
import { BarbarianSkillId, BasicSkillId, ClericSkillId, GuardianSkillId, KnightSkillId, MageSkillId, MobSkillId, MysticSkillId, PaladinSkillId, DruidSkillId, MonkSkillId, RogueSkillId, ScholarSkillId, ShamanSkillId, SkillId, SpellBladeSkillId, WarriorSkillId, WitchSkillId, WarlockSkillId, DuelistSkillId, InquisitorSkillId } from "./enums";
import type { Skill } from "./Skill";
import {shriek} from "src/Entity/Skill/definition/MOBs/Goblin/shriek.ts";
import {throwPebble} from "src/Entity/Skill/definition/MOBs/Goblin/throwPebble.ts";
import {panicSlash} from "src/Entity/Skill/definition/MOBs/Goblin/panicSlash.ts";
import {herosPose} from "./definition/Classes/Guardian/herosPose";
import {arcaneShield} from "./definition/Classes/Mage/arcaneShield";
import { backstab } from "./definition/Classes/Rogue/backstab";
import { retreatDash } from "./definition/Classes/Rogue/retreatDash";
import { bleedingCut } from "./definition/Classes/Rogue/bleedingCut";
import { throwingKnives } from "./definition/Classes/Rogue/throwingKnives";
import { hiding } from "./definition/Classes/Rogue/hiding";
import { bash } from "./definition/Classes/Warrior/bash";
import { cleave } from "./definition/Classes/Warrior/cleave";
import { powerStrike } from "./definition/Classes/Warrior/powerStrike";
import { warCry } from "./definition/Classes/Warrior/warCry";
import { taunt } from "./definition/Classes/Guardian/taunt";
import { shieldUp } from "./definition/Classes/Guardian/shieldUp";
import { fireBolt } from "./definition/Classes/Mage/fireBolt";
import { burningHand } from "./definition/Classes/Mage/burningHand";
import { fireBall } from "./definition/Classes/Mage/fireBall";
import { backdraft } from "./definition/Classes/Mage/backdraft";
import { mendSpirit } from "./definition/Classes/Shaman/mendSpirit";
import { hexOfRot } from "./definition/Classes/Shaman/hexOfRot";
import { spiritRattle } from "./definition/Classes/Shaman/spiritRattle";
import { chaoticBlessing } from "./definition/Classes/Shaman/chaoticBlessing";
import { arcaneBolt } from "./definition/Classes/Mage/arcaneBolt";
import { worksYouMaggots } from "./definition/MOBs/Goblin/worksYouMaggots";
import { commanderScream } from "./definition/MOBs/Goblin/commanderScream";
import { whip } from "./definition/MOBs/Goblin/whip";
import { heal } from "./definition/Classes/Cleric/heal";
import { massHeal } from "./definition/Classes/Cleric/massHeal";
import { radiance } from "./definition/Classes/Cleric/radiance";
import { bless } from "./definition/Classes/Cleric/bless";
import { turnUndead } from "./definition/Classes/Cleric/turnUndead";
import { analyze } from "./definition/Classes/Scholar/analyze";
import { disruptPattern } from "./definition/Classes/Scholar/disruptPattern";
import { cognitiveOverload } from "./definition/Classes/Scholar/cognitiveOverload";
import { mistStep } from "./definition/Classes/Mystic/mistStep";
import { planarAbsorption } from "./definition/Classes/Mystic/planarAbsorption";
import { innerVeil } from "./definition/Classes/Mystic/innerVeil";
import { reversalPalm } from "./definition/Classes/Mystic/reversalPalm";
import { planarEdge } from "./definition/Classes/SpellBlade/planarEdge";
import { windSlash } from "./definition/Classes/SpellBlade/windSlash";
import { spellParry } from "./definition/Classes/SpellBlade/spellParry";
import { edgeBurst } from "./definition/Classes/SpellBlade/edgeBurst";
import { rage } from "./definition/Classes/Barbarian/rage";
import { recklessSwing } from "./definition/Classes/Barbarian/recklessSwing";
import { earthshatter } from "./definition/Classes/Barbarian/earthshatter";
import { precisionThrust } from "./definition/Classes/Knight/precisionThrust";
import { advancingPaceSkill } from "./definition/Classes/Knight/advancingPace";
import { divineStrike } from "./definition/Classes/Paladin/divineStrike";
import { aegisPulse } from "./definition/Classes/Paladin/aegisPulse";
import { aegisShield } from "./definition/Classes/Paladin/aegisShield";
import { vineWhip } from "./definition/Classes/Druid/vineWhip";
import { throwSpear } from "./definition/Classes/Druid/throwSpear";
import { rejuvenatingMist } from "./definition/Classes/Druid/rejuvenatingMist";
import { palmStrike } from "./definition/Classes/Monk/palmStrike";
import { meditation } from "./definition/Classes/Monk/meditation";
import { flurryOfBlows } from "./definition/Classes/Monk/flurryOfBlows";
import { shadowBolt } from "./definition/Classes/Warlock/shadowBolt";
import { lifeDrain } from "./definition/Classes/Warlock/lifeDrain";
import { darkPact } from "./definition/Classes/Warlock/darkPact";
import { corruption } from "./definition/Classes/Warlock/corruption";
import { preciseStrike } from "./definition/Classes/Duelist/preciseStrike";
import { parryRiposte } from "./definition/Classes/Duelist/parryRiposte";
import { bladeFlurry } from "./definition/Classes/Duelist/bladeFlurry";
import { duelingStance } from "./definition/Classes/Duelist/duelingStance";
import { curseBolt } from "./definition/Classes/Witch/curseBolt";
import { curseMark } from "./definition/Classes/Witch/curseMark";
import { hexDoll } from "./definition/Classes/Witch/hexDoll";
import { bewitch } from "./definition/Classes/Witch/bewitch";
import { radiantSmite } from "./definition/Classes/Inquisitor/radiantSmite";
import { exposeWeakness } from "./definition/Classes/Inquisitor/exposeWeakness";
import { judgmentDay } from "./definition/Classes/Inquisitor/judgmentDay";
import { purgeMagic } from "./definition/Classes/Inquisitor/purgeMagic";

export const skillRepository: Record<SkillId, Skill> = {
    [BasicSkillId.Basic]: basicAttack,
    [RogueSkillId.RetreatDash]: retreatDash,
    [RogueSkillId.Backstab]: backstab,
    [RogueSkillId.BleedingCut]: bleedingCut,
    [RogueSkillId.ThrowingKnives]: throwingKnives,
    [RogueSkillId.Hiding]: hiding,
    [WarriorSkillId.Bash]: bash,
    [WarriorSkillId.Cleave]: cleave,
    [WarriorSkillId.PowerStrike]: powerStrike,
    [WarriorSkillId.WarCry]: warCry,
    [GuardianSkillId.Taunt]: taunt,
    [GuardianSkillId.HerosPose]: herosPose,
    [GuardianSkillId.ShieldUp]: shieldUp,
    [ShamanSkillId.SpiritRattle]: spiritRattle,
    [ShamanSkillId.ChaoticBlessing]: chaoticBlessing,
    [ShamanSkillId.MendSpirit]: mendSpirit,
    [ShamanSkillId.HexOfRot]: hexOfRot,
    [MageSkillId.ArcaneBolt]: arcaneBolt,
    [MageSkillId.ArcaneShield]: arcaneShield,
    [MageSkillId.Backdraft]: backdraft,
    [MageSkillId.FireBolt]: fireBolt,
    [MageSkillId.FireBall]: fireBall,
    [MageSkillId.BurningHand]: burningHand,
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
    [ScholarSkillId.Analyze]: analyze,
    [ScholarSkillId.DisruptPattern]: disruptPattern,
    [ScholarSkillId.CognitiveOverload]: cognitiveOverload,
    [MysticSkillId.MistStep]: mistStep,
    [MysticSkillId.PlanarAbsorption]: planarAbsorption,
    [MysticSkillId.InnerVeil]: innerVeil,
    [MysticSkillId.ReversalPalm]: reversalPalm,
    [MysticSkillId.Serenity]: undefined as any,
    [MysticSkillId.FluidMotion]: undefined as any,
    [SpellBladeSkillId.PlanarEdge]: planarEdge,
    [SpellBladeSkillId.WindSlash]: windSlash,
    [SpellBladeSkillId.SpellParry]: spellParry,
    [SpellBladeSkillId.EdgeBurst]: edgeBurst,
    [BarbarianSkillId.Rage]: rage,
    [BarbarianSkillId.RecklessSwing]: recklessSwing,
    [BarbarianSkillId.Earthshatter]: earthshatter,
    [KnightSkillId.PrecisionThrust]: precisionThrust,
    [KnightSkillId.AdvancingPace]: advancingPaceSkill,
    [PaladinSkillId.DivineStrike]: divineStrike,
    [PaladinSkillId.AegisPulse]: aegisPulse,
    [PaladinSkillId.AegisShield]: aegisShield,
    [DruidSkillId.VineWhip]: vineWhip,
    [DruidSkillId.ThrowSpear]: throwSpear,
    [DruidSkillId.RejuvenatingMist]: rejuvenatingMist,
    [MonkSkillId.PalmStrike]: palmStrike,
    [MonkSkillId.Meditation]: meditation,
    [MonkSkillId.FlurryOfBlows]: flurryOfBlows,
    [WarlockSkillId.ShadowBolt]: shadowBolt,
    [WarlockSkillId.LifeDrain]: lifeDrain,
    [WarlockSkillId.Corruption]: corruption,
    [WarlockSkillId.DarkPact]: darkPact,
    [DuelistSkillId.PreciseStrike]: preciseStrike,
    [DuelistSkillId.ParryRiposte]: parryRiposte,
    [DuelistSkillId.BladeFlurry]: bladeFlurry,
    [DuelistSkillId.DuelingStance]: duelingStance,
    [WitchSkillId.CurseBolt]: curseBolt,
    [WitchSkillId.CurseMark]: curseMark,
    [WitchSkillId.HexDoll]: hexDoll,
    [WitchSkillId.Bewitch]: bewitch,
    [InquisitorSkillId.RadiantSmite]: radiantSmite,
    [InquisitorSkillId.ExposeWeakness]: exposeWeakness,
    [InquisitorSkillId.PurgeMagic]: purgeMagic,
    [InquisitorSkillId.JudgmentDay]: judgmentDay,
};

// TODO: Seer, Nomad, Engineer