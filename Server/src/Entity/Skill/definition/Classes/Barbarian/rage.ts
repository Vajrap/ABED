import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { BarbarianSkillId } from "../../../enums";
import type { Character } from "src/Entity/Character/Character";
import type { TurnResult } from "../../../types";
import { ActorEffect, TargetEffect } from "../../../effects";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { BarbarianSkill } from "./index";
import { buffsAndDebuffsRepository } from "src/Entity/BuffsAndDebuffs/repository";
import { BuffEnum } from "src/Entity/BuffsAndDebuffs/enum";

export const rage = new BarbarianSkill({
  id: BarbarianSkillId.Rage,
  name: {
    en: "Rage",
    th: "บ้าคลั่ง",
  },
  description: {
    text: {
      en: "Roar fiercefully and enter the <BuffRage> state for {5}'4':'3'{/} turns.",
      th: "เข้าสู่สถานะ <BuffRage> เป็นเวลา {5}'4':'3'{/} เทิร์น",
    },
  },
  requirement: {},
  notExistBuff: [BuffEnum.rage],
  equipmentNeeded: [],
  tier: TierEnum.common,
  consume: {
    hp: 0,
    mp: 0,
    sp: 3,
    elements: [],
  },
  produce: {
    hp: 0,
    mp: 0,
    sp: 0,
    elements: [{ element: "fire", min: 1, max: 1 }],
  },
  exec: (
    actor: Character,
    actorParty: Character[],
    targetParty: Character[],
    skillLevel: number,
    location: LocationsEnum,
  ): TurnResult => {
    const duration = skillLevel >= 5 ? 4 : 3;
    buffsAndDebuffsRepository.rage.appender(actor, { turnsAppending: duration });

    return {
      content: {
        en: `${actor.name.en} flies into a rage for ${duration} turn(s)!`,
        th: `${actor.name.th} ระเบิดโทสะเป็นเวลา ${duration} เทิร์น!`,
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
});


