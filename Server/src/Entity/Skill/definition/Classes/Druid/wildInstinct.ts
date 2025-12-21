import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { DruidSkillId } from "../../../enums";
import type { Character } from "src/Entity/Character/Character";
import type { TurnResult } from "../../../types";
import { ActorEffect, TargetEffect } from "../../../effects";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { DruidSkill } from "./index";
import { buffsAndDebuffsRepository } from "src/Entity/BuffsAndDebuffs/repository";
import { BuffEnum } from "src/Entity/BuffsAndDebuffs/enum";

export const wildInstinctSkill = new DruidSkill({
  id: DruidSkillId.WildInstinct,
  name: {
    en: "Wild Instinct",
    th: "สัญชาตญาณดิบ",
  },
  description: {
    text: {
      en: "Tap into your wild instincts, becoming more ferocious.\nGain <BuffWildInstinct> for {5}'3':'2'{/} turns.\n<BuffWildInstinct>: Gain +2 STR and +2 AGI.\nMust not have Wild Instinct buff to use this skill.",
      th: "ปลดปล่อยสัญชาตญาณดิบของคุณ ทำให้ดุร้ายมากขึ้น\nได้รับ <BuffWildInstinct> เป็นเวลา {5}'3':'2'{/} เทิร์น\n<BuffWildInstinct>: ได้รับ +2 STR และ +2 AGI\nต้องไม่มีบัฟ Wild Instinct เพื่อใช้สกิลนี้",
    },
    formula: {
      en: "Wild Instinct buff: +2 STR, +2 AGI for 2 turns (3 at level 5)",
      th: "บัฟ Wild Instinct: +2 STR, +2 AGI เป็นเวลา 2 เทิร์น (3 ที่เลเวล 5)",
    },
  },
  requirement: {},
  equipmentNeeded: [],
  tier: TierEnum.uncommon,
  isFallback: false, // Wild Instinct: consumes 1 earth element
  notExistBuff: [BuffEnum.wildInstinct], // Must not have Wild Instinct buff to use
  consume: {
    hp: 0,
    mp: 0,
    sp: 4,
    elements: [
      {
        element: "earth",
        value: 1,
      },
    ],
  },
  produce: {
    hp: 0,
    mp: 0,
    sp: 0,
    elements: [
      {
        element: "neutral",
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
    const duration = skillLevel >= 5 ? 3 : 2;

    // Grant Wild Instinct buff
    buffsAndDebuffsRepository.wildInstinct.appender(actor, { turnsAppending: duration });

    return {
      content: {
        en: `${actor.name.en} taps into Wild Instinct! Gain +2 STR and +2 AGI for ${duration} turn(s)!`,
        th: `${actor.name.th} ปลดปล่อยสัญชาตญาณดิบ! ได้รับ +2 STR และ +2 AGI เป็นเวลา ${duration} เทิร์น!`,
      },
      actor: {
        actorId: actor.id,
        effect: [ActorEffect.Focus],
      },
      targets: [
        {
          actorId: actor.id,
          effect: [TargetEffect.TestSkill],
        },
      ],
    };
  },
});

