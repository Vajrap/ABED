import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { DruidSkillId } from "../../../enums";
import type { Character } from "src/Entity/Character/Character";
import type { TurnResult } from "../../../types";
import { getTarget } from "src/Entity/Battle/getTarget";
import { ActorEffect, TargetEffect } from "../../../effects";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { resolveDamage } from "src/Entity/Battle/damageResolution";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";
import { statMod } from "src/Utils/statMod";
import { buildCombatMessage } from "src/Utils/buildCombatMessage";
import { getWeaponDamageOutput } from "src/Utils/getWeaponDamgeOutput";
import { getWeaponDamageType } from "src/Utils/getWeaponDamageType";
import { rollTwenty } from "src/Utils/Dice";
import { DruidSkill } from "./index";
import type { ProficiencyKey } from "src/InterFacesEnumsAndTypes/Enums";

export const throwSpear = new DruidSkill({
  id: DruidSkillId.ThrowSpear,
  name: {
    en: "Throw Spear",
    th: "ขว้างหอก",
  },
  description: {
    en: "Throw your spear at the enemy. Damage based on range: front-front 0.8+level (1.0+level at level 5), front-back 1.2+level (1.4+level at level 5), back-back 1.6+level (1.8+level at level 5). Must equip Spear.",
    th: "ขว้างหอกใส่ศัตรู ความเสียหายขึ้นกับระยะ: front-front 0.8+level (1.0+level ที่เลเวล 5), front-back 1.2+level (1.4+level ที่เลเวล 5), back-back 1.6+level (1.8+level ที่เลเวล 5) ต้องติดตั้งหอก",
  },
  requirement: {},
  equipmentNeeded: ["spear"],
  tier: TierEnum.rare,
  consume: {
    hp: 0,
    mp: 0,
    sp: 2,
    elements: [
      {
        element: "neutral",
        value: 2,
      },
    ],
  },
  produce: {
    hp: 0,
    mp: 0,
    sp: 0,
    elements: [
      {
        element: "earth",
        min: 1,
        max: 1,
      },
    ],
  },
  exec: (
    actor: Character,
    actorParty: Character[],
    targetParty: Character[],
    skillLevel: number,
    location: LocationsEnum,
  ): TurnResult => {
    const target = getTarget(actor, actorParty, targetParty, "enemy").one();
    if (!target) {
      return {
        content: {
          en: `${actor.name.en} tried to throw spear but has no target`,
          th: `${actor.name.th} พยายามขว้างหอกแต่ไม่พบเป้าหมาย`,
        },
        actor: {
          actorId: actor.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    }

    const weapon = actor.getWeapon();
    if (weapon.weaponType !== "spear") {
      return {
        content: {
          en: `${actor.name.en} must equip a spear to use Throw Spear`,
          th: `${actor.name.th} ต้องติดตั้งหอกเพื่อใช้ขว้างหอก`,
        },
        actor: {
          actorId: actor.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    }

    const damageType = getWeaponDamageType(weapon.weaponType);
    const damageOutput = getWeaponDamageOutput(actor, weapon, damageType);

    // Determine range-based damage multiplier
    // Front row is position <= 2, back row is position > 2
    const actorPos = actor.position <= 2 ? 0 : 1;
    const targetPos = target.position <= 2 ? 0 : 1;
    const range = actorPos + targetPos;
    // if front-front => 0 ; front-back => 1 ; back-back => 2
    let rangeMultiplier = range === 0 ? 0.8 : range === 1 ? 1.2 : 1.6;
    if (skillLevel >= 5) { rangeMultiplier += 0.2; }

    // Note: this skill doesn't have level multiplier but add the level into damage directly
    damageOutput.damage = Math.floor((damageOutput.damage * rangeMultiplier) + skillLevel);
    damageOutput.hit = rollTwenty().total + damageOutput.hit;
    damageOutput.crit = rollTwenty().total + damageOutput.crit;

    const totalDamage = resolveDamage(actor.id, target.id, damageOutput, location);
    const message = buildCombatMessage(
      actor,
      target,
      { en: "Throw Spear", th: "ขว้างหอก" },
      totalDamage,
    );

    return {
      content: message,
      actor: {
        actorId: actor.id,
        effect: [ActorEffect.TestSkill],
      },
      targets: [
        {
          actorId: target.id,
          effect: [TargetEffect.TestSkill],
        },
      ],
    };
  },
});

