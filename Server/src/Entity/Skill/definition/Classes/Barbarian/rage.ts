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
    th: "เดือดดาล",
  },
  description: {
    en: "Cantrip. Gain Rage for 3 turns (4 turns at skill level 5). Rage: +2 pATK, -2 pDEF, -2 mDEF. Cannot be cast while Rage is active.",
    th: "ทักษะพื้นฐาน ได้รับ Rage 3 เทิร์น (4 เทิร์นที่เลเวล 5) Rage: +2 pATK, -2 pDEF, -2 mDEF ไม่สามารถใช้ได้ระหว่างมี Rage",
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
    buffsAndDebuffsRepository.rage.appender(actor, duration, false, 0);

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


