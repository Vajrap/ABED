import { basicAttack } from "./definition/basicAttack";
import { SkillId } from "./enums";
import type { Skill } from "./Skill";
import {shriek} from "src/Entity/Skill/definition/shriek.ts";
import {throwPebble} from "src/Entity/Skill/definition/throwPebble.ts";
import {backstab} from "src/Entity/Skill/definition/backstab.ts";
import {panicSlash} from "src/Entity/Skill/definition/panicSlash.ts";
import {retreatDash} from "src/Entity/Skill/definition/retreatDash.ts";
import {bash} from "./definition/bash";
import {tauntSkill} from "./definition/taunt";
import {cleave} from "./definition/cleave";
import {herosPose} from "./definition/herosPose";
import {shieldUp} from "./definition/shieldUp";

export const skillRepository: Record<SkillId, Skill> = {
    [SkillId.Basic]: basicAttack,
    [SkillId.Shriek]: shriek,
    [SkillId.ThrowPebble]: throwPebble,
    [SkillId.Backstab]: backstab,
    [SkillId.PanicSlash]: panicSlash,
    [SkillId.RetreatDash]: retreatDash,
    [SkillId.Bash]: bash,
    [SkillId.Taunt]: tauntSkill,
    [SkillId.Cleave]: cleave,
    [SkillId.HerosPose]: herosPose,
    [SkillId.ShieldUp]: shieldUp
};
