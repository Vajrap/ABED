import { Character } from "src/Entity/Character/Character";
import { EngineerSkill } from ".";
import { EngineerSkillId } from "../../../enums";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { ActorEffect, TargetEffect } from "src/Entity/Skill/effects";
import { BuffEnum } from "src/Entity/BuffsAndDebuffs/enum";
import type { TurnResult } from "../../../types";
import { buffsRepository } from "src/Entity/BuffsAndDebuffs/repository";

export const gearShift = new EngineerSkill({
  id: EngineerSkillId.GearShift,
  name: {
    en: "Gear Shift",
    th: "เปลี่ยนเกียร์",
  },
  description: {
    text: {
      en: "Shift gears to boost your performance. Grant Haste buff for 2 turns. Additionally, restore 2 SP. Must not have Haste buff to use this skill.",
      th: "เปลี่ยนเกียร์เพื่อเพิ่มประสิทธิภาพของคุณ. ให้ Haste buff เป็นเวลา 2 เทิร์น. นอกจากนี้ ฟื้นฟู 2 SP. ต้องไม่มี Haste buff ถึงจะใช้ท่าสกิลนี้ได้",
    },
    formula: {
      en: "Haste 2 turns, +2 SP",
      th: "Haste 2 เทิร์น, +2 SP",
    },
  },
  requirement: {},
  equipmentNeeded: [],
  tier: TierEnum.common,
  consume: {
    hp: 0,
    mp: 0,
    sp: 2,
    elements: [],
  },
  produce: {
    hp: 0,
    mp: 0,
    sp: 0,
    elements: [
      { element: "fire", min: 1, max: 1 },
    ],
  },
  notExistBuff: [BuffEnum.haste],
  exec: (
    actor: Character,
    actorParty: Character[],
    targetParty: Character[],
    skillLevel: number,
    location: LocationsEnum,
  ): TurnResult => {
    // Apply Haste buff for 2 turns
    buffsRepository.haste.appender(actor, { turnsAppending: 2 });

    // Restore 2 SP
    actor.vitals.incSp(2);

    return {
      content: {
        en: `${actor.name.en} shifts gears! Gains Haste for 2 turns and restores 2 SP!`,
        th: `${actor.name.th} เปลี่ยนเกียร์! ได้รับ Haste เป็นเวลา 2 เทิร์น และฟื้นฟู 2 SP!`,
      },
      actor: {
        actorId: actor.id,
        effect: [ActorEffect.TestSkill],
      },
      targets: [
        {
          actorId: actor.id,
          effect: [TargetEffect.TestSkill],
        },
      ],
    };
  },
  isFallback: false,
});

