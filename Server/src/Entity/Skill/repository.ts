import { basicAttack } from "./definition/basicAttack";
import { BasicSkillId, GuardianSkillId, MageSkillId, MobSkillId, RogueSkillId, ShamanSkillId, SkillId, WarriorSkillId, WitchSkillId } from "./enums";
import type { Skill } from "./Skill";
import {shriek} from "src/Entity/Skill/definition/MOBs/Goblin/shriek.ts";
import {throwPebble} from "src/Entity/Skill/definition/MOBs/Goblin/throwPebble.ts";
import {panicSlash} from "src/Entity/Skill/definition/MOBs/Goblin/panicSlash.ts";
import {herosPose} from "./definition/Classes/Guardian/herosPose";
import {arcaneShield} from "./definition/Classes/Mage/arcaneShield";
import { backstab } from "./definition/Classes/Rogue/backstab";
import { retreatDash } from "./definition/Classes/Rogue/retreatDash";
import { bash } from "./definition/Classes/Warrior/bash";
import { taunt } from "./definition/Classes/Guardian/taunt";
import { cleave } from "./definition/Classes/Warrior/cleave";
import { shieldUp } from "./definition/Classes/Guardian/shieldUp";
import { fireBolt } from "./definition/Classes/Mage/fireBolt";
import { burningHand } from "./definition/Classes/Mage/burningHand";
import { fireBall } from "./definition/Classes/Mage/fireBall";
import { backdraft } from "./definition/Classes/Mage/backdraft";
import { mendSpirit } from "./definition/Classes/Shaman/mendSpirit";
import { hexOfRot } from "./definition/Classes/Shaman/hexOfRot";
import { spiritRattle } from "./definition/Classes/Witch/spiritRattle";
import { chaoticBlessing } from "./definition/Classes/Shaman/chaoticBlessing";
import { arcaneBolt } from "./definition/Classes/Mage/arcaneBolt";
import { worksYouMaggots } from "./definition/MOBs/Goblin/worksYouMaggots";
import { commanderScream } from "./definition/MOBs/Goblin/commanderScream";
import { whip } from "./definition/MOBs/Goblin/whip";

export const skillRepository: Record<SkillId, Skill> = {
    [BasicSkillId.Basic]: basicAttack,
    [RogueSkillId.RetreatDash]: retreatDash,
    [RogueSkillId.Backstab]: backstab,
    [WarriorSkillId.Bash]: bash,
    [WarriorSkillId.Cleave]: cleave,
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
    [MobSkillId.Shriek]: shriek
};
