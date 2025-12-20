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
    text: {
      en: "Weave a protective veil of planar energy around a frontline ally, obscuring them from enemy sight.\nGain <BuffInnerVeil> for 1 turn.",
      th: "ถักทอผ้าคลุมป้องกันจากพลังงานระนาบรอบพันธมิตรแถวหน้า ทำให้ศัตรูมองไม่เห็น\nได้รับ <BuffInnerVeil> เป็นเวลา 1 เทิร์น",
    },
  },
  requirement: {},
  equipmentNeeded: [],
  tier: TierEnum.common,
  consume: {
    hp: 0,
    mp: 2,
    sp: 0,
    elements: [],
  },
  produce: {
    hp: 0,
    mp: 0,
    sp: 0,
    elements: [{ element: "neutral", min: 1, max: 1 }],
  },
  exec: (
    actor: Character,
    actorParty: Character[],
    targetParty: Character[],
    skillLevel: number,
    location: LocationsEnum,
  ): TurnResult => {
    // Target a frontline ally
    const target = getTarget(actor, actorParty, targetParty, "ally")
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

    // Apply Inner Veil buff for 1 turn (cantrip, no upgrade)
    buffsAndDebuffsRepository.innerVeil.appender(target, { turnsAppending: 1 });

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

