import { basicAttack } from "./definition/basicAttack";
import { BarbarianSkillId, BasicSkillId, ClericSkillId, GuardianSkillId, KnightSkillId, MageSkillId, MobSkillId, MysticSkillId, PaladinSkillId, RogueSkillId, ScholarSkillId, ShamanSkillId, SkillId, SpellBladeSkillId, WarriorSkillId, WitchSkillId } from "./enums";
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
    [SpellBladeSkillId.PlanarEdge]: planarEdge,
    [SpellBladeSkillId.WindSlash]: windSlash,
    [SpellBladeSkillId.SpellParry]: spellParry,
    [SpellBladeSkillId.EdgeBurst]: edgeBurst,
    [BarbarianSkillId.Rage]: rage,
    [BarbarianSkillId.RecklessSwing]: recklessSwing,
    [BarbarianSkillId.Earthshatter]: earthshatter,
    [KnightSkillId.GuardStance]: undefined,
    [KnightSkillId.ShieldBash]: undefined,
    [KnightSkillId.PrecisionThrust]: undefined,
    [KnightSkillId.RallyingCall]: undefined,
    [KnightSkillId.IronAdvance]: undefined,
    [KnightSkillId.ArmoredMastery]: undefined,
    [GuardianSkillId.IronWall]: undefined,
    [GuardianSkillId.ProtectAlly]: undefined,
    [GuardianSkillId.Sentinel]: undefined,
    [PaladinSkillId.DivineStrike]: undefined,
    [PaladinSkillId.HolyAegis]: undefined,
    [PaladinSkillId.Judgment]: undefined,
    [PaladinSkillId.PurifyingWave]: undefined,
    [PaladinSkillId.RadiantCharge]: undefined,
    [PaladinSkillId.RighteousGuard]: undefined,
    [DruidSkillId.VineWhip]: undefined,
    [DruidSkillId.Regrowth]: undefined,
    [DruidSkillId.EntanglingRoots]: undefined,
    [DruidSkillId.ThornShield]: undefined,
    [DruidSkillId.WildShape]: undefined,
    [DruidSkillId.NatureBond]: undefined,
    [MonkSkillId.PalmStrike]: undefined,
    [MonkSkillId.Meditation]: undefined,
    [MonkSkillId.CounterStance]: undefined,
    [MonkSkillId.ChiBurst]: undefined,
    [MonkSkillId.InnerHarmony]: undefined,
    [MonkSkillId.MartialDiscipline]: undefined,
    [WarlockSkillId.ShadowBolt]: undefined,
    [WarlockSkillId.LifeDrain]: undefined,
    [WarlockSkillId.SoulTether]: undefined,
    [WarlockSkillId.GloomField]: undefined,
    [WarlockSkillId.DarkPact]: undefined,
    [WarlockSkillId.ForbiddenKnowledge]: undefined,
    [RangerSkillId.AimedShot]: undefined,
    [RangerSkillId.TwinArrows]: undefined,
    [RangerSkillId.TripwireTrap]: undefined,
    [RangerSkillId.HunterMark]: undefined,
    [RangerSkillId.VolleyRain]: undefined,
    [RangerSkillId.TrackerInstinct]: undefined,
    [WitchSkillId.CurseMark]: undefined,
    [WitchSkillId.PoisonMist]: undefined,
    [WitchSkillId.HexDoll]: undefined,
    [WitchSkillId.Bewitch]: undefined,
    [WitchSkillId.RitualCircle]: undefined,
    [WitchSkillId.Malice]: undefined,
    [InquisitorSkillId.RadiantSmite]: undefined,
    [InquisitorSkillId.ExposeWeakness]: undefined,
    [InquisitorSkillId.PurgeMagic]: undefined,
    [InquisitorSkillId.TruthSentence]: undefined,
    [InquisitorSkillId.JudgmentDay]: undefined,
    [InquisitorSkillId.Zeal]: undefined
};
