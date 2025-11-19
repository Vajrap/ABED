import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { MysticSkillId } from "../../../enums";
import type { Character } from "src/Entity/Character/Character";
import type { TurnResult } from "../../../types";
import { ActorEffect, TargetEffect } from "../../../effects";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { getTarget } from "src/Entity/Battle/getTarget";
import { MysticSkill } from "./index";
import { buffsAndDebuffsRepository } from "src/Entity/BuffsAndDebuffs/repository";

export const innerVeil = new MysticSkill({
  id: MysticSkillId.InnerVeil,
  name: {
    en: "Inner Veil",
    th: "ผ้าคลุมภายใน",
  },
  description: {
    en: "Cast a veil on one frontline ally, make them harder to target or hit. Grants +2 dodge and -2 to enemy hit chance for 2 turns (3 turns at skill level 5).",
    th: "สร้างผ้าคลุมให้กับพันธมิตรในแถวหน้าหนึ่งคน ทำให้ยากต่อการโจมตี เพิ่ม dodge +2 และลดความแม่นยำของศัตรู -2 เป็นเวลา 2 เทิร์น (3 เทิร์นที่เลเวล 5)",
  },
  requirement: {},
  equipmentNeeded: [],
  tier: TierEnum.uncommon,
  consume: {
    hp: 0,
    mp: 4,
    sp: 0,
    elements: [
      { element: "wind", value: 1 },
      { element: "neutral", value: 1 },
    ],
  },
  produce: {
    hp: 0,
    mp: 0,
    sp: 0,
    elements: [],
  },
  exec: (
    actor: Character,
    actorParty: Character[],
    targetParty: Character[],
    skillLevel: number,
    location: LocationsEnum,
  ): TurnResult => {
    // Target a frontline ally
    const target = getTarget(actor, actorParty)
      .from("frontOnly").with('least', 'currentHPPercentage')
      .one();

    if (!target) {
      return {
        content: {
          en: `${actor.name.en} tried to cast Inner Veil but has no valid frontline ally target`,
          th: `${actor.name.th} พยายามใช้ผ้าคลุมภายในแต่ไม่พบพันธมิตรในแถวหน้า`,
        },
        actor: {
          actorId: actor.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    }

    // Apply Inner Veil buff
    const duration = skillLevel >= 5 ? 3 : 2;
    buffsAndDebuffsRepository.innerVeil.appender(target, duration, false, 0);

    return {
      content: {
        en: `${actor.name.en} casts Inner Veil on ${target.name.en}, making them harder to hit!`,
        th: `${actor.name.th} ใช้ผ้าคลุมภายในกับ ${target.name.th} ทำให้ยากต่อการโจมตี!`,
      },
      actor: {
        actorId: actor.id,
        effect: [ActorEffect.Cast],
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

