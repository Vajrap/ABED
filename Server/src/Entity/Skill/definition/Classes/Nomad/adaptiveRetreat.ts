import { Character } from "src/Entity/Character/Character";
import { NomadSkill } from ".";
import { NomadSkillId } from "../../../enums";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { buildCombatMessage } from "src/Utils/buildCombatMessage";
import { ActorEffect, TargetEffect } from "src/Entity/Skill/effects";
import { getTarget } from "src/Entity/Battle/getTarget";
import type { TurnResult } from "../../../types";
import { resolveDamage } from "src/Entity/Battle/damageResolution";
import { getWeaponDamageOutput } from "src/Utils/getWeaponDamgeOutput";
import { skillLevelMultiplier } from "src/Utils/skillScaling";
import { buffsRepository } from "src/Entity/BuffsAndDebuffs/repository";

export const adaptiveRetreat = new NomadSkill({
  id: NomadSkillId.AdaptiveRetreat,
  name: {
    en: "Adaptive Retreat",
    th: "ถอยเชิงปรับตัว",
  },
  description: {
    text: {
      en: "Retreat tactically while striking back. Move to back row (if available) and grant Retreat buff for 1 turn (2 turns at level 5). Additionally, deal <FORMULA> damage to a random enemy.",
      th: "ถอยอย่างกลยุทธ์พร้อมตอบโต้. ย้ายไปแถวหลัง (หากมีที่ว่าง) และให้ Retreat buff เป็นเวลา 1 เทิร์น (2 เทิร์นที่ระดับ 5). นอกจากนี้ สร้างความเสียหาย <FORMULA> แก่ศัตรูสุ่มหนึ่งคน",
    },
    formula: {
      en: "(0.8× weapon damage + attribute mod) × <SkillLevelMultiplier>",
      th: "(0.8× ความเสียหายจากอาวุธ + ค่า modifier) × <SkillLevelMultiplier>",
    },
  },
  requirement: {},
  equipmentNeeded: [],
  tier: TierEnum.uncommon,
  consume: {
    hp: 0,
    mp: 0,
    sp: 3,
    elements: [
      { element: "neutral", value: 1 },
    ],
  },
  produce: {
    hp: 0,
    mp: 0,
    sp: 0,
    elements: [
      { element: "wind", min: 1, max: 1 },
    ],
  },
  exec: (
    actor: Character,
    actorParty: Character[],
    targetParty: Character[],
    skillLevel: number,
    location: LocationsEnum,
  ): TurnResult => {
    // Move to back row (if available)
    const allOccupiedPositions = actorParty.map((member) => member.position);
    let movedToBack = false;
    for (const position of [3, 4, 5] as const) {
      if (!allOccupiedPositions.includes(position)) {
        actor.position = position;
        movedToBack = true;
        break;
      }
    }

    // Grant Retreat buff for 1 turn (2 turns at level 5)
    const retreatDuration = skillLevel >= 5 ? 2 : 1;
    buffsRepository.retreat.appender(actor, { turnsAppending: retreatDuration });

    // Deal damage to a random enemy
    const target = getTarget(actor, actorParty, targetParty, "enemy").one();

    if (!target) {
      return {
        content: {
          en: `${actor.name.en} retreats${movedToBack ? " to back row" : ""} and gains Retreat buff for ${retreatDuration} turn(s)!`,
          th: `${actor.name.th} ถอย${movedToBack ? "ไปแถวหลัง" : ""} และได้รับ Retreat buff เป็นเวลา ${retreatDuration} เทิร์น!`,
        },
        actor: {
          actorId: actor.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    }

    const weapon = actor.getWeapon();
    const weaponDamageOutput = getWeaponDamageOutput(actor, weapon, "physical");
    const weaponDamage = weaponDamageOutput.damage;

    // Calculate damage: (0.8× weapon damage + attribute mod) × skill level multiplier
    // Note: getWeaponDamageOutput already includes attribute mod, so we multiply the whole thing by 0.8
    const levelScalar = skillLevelMultiplier(skillLevel);
    const totalDamage = Math.floor((weaponDamage * 0.8) * levelScalar);

    const damageOutput = {
      damage: totalDamage,
      hit: actor.rollTwenty({ stat: "dexterity" }),
      crit: actor.rollTwenty({ stat: "luck" }),
      type: weaponDamageOutput.type,
      isMagic: weaponDamageOutput.isMagic,
    };

    const damageResult = resolveDamage(actor.id, target.id, damageOutput, location);
    const message = buildCombatMessage(
      actor,
      target,
      { en: "Adaptive Retreat", th: "ถอยเชิงปรับตัว" },
      damageResult,
    );

    return {
      content: {
        en: `${actor.name.en} retreats${movedToBack ? " to back row" : ""} and gains Retreat buff for ${retreatDuration} turn(s)! ${message.en}`,
        th: `${actor.name.th} ถอย${movedToBack ? "ไปแถวหลัง" : ""} และได้รับ Retreat buff เป็นเวลา ${retreatDuration} เทิร์น! ${message.th}`,
      },
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
  isFallback: false,
});

