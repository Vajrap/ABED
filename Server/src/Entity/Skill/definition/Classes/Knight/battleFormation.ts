import type { Character } from "src/Entity/Character/Character";
import { KnightSkill } from "./index";
import { KnightSkillId } from "../../../enums";
import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import type { TurnResult } from "../../../types";
import { ActorEffect, TargetEffect } from "../../../effects";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { BuffEnum } from "src/Entity/BuffsAndDebuffs/enum";
import { buffsRepository } from "src/Entity/BuffsAndDebuffs/repository";

export const battleFormation = new KnightSkill({
  id: KnightSkillId.BattleFormation,
  name: {
    en: "Battle Formation",
    th: "รูปแบบการรบ",
  },
  description: {
    text: {
      en: "Form your allies into a defensive battle formation.\nAll allies gain +2 pDEF and +2 mDEF for {5}4:3{/} turns.\nBonus: All allies gain +1 to all saving throws while active.",
      th: "จัดพันธมิตรของคุณเป็นรูปแบบการรบป้องกัน\nพันธมิตรทั้งหมดได้รับ +2 pDEF และ +2 mDEF เป็นเวลา {5}4:3{/} เทิร์น\nโบนัส: พันธมิตรทั้งหมดได้รับ +1 ต่อการทอย save ทั้งหมดในขณะที่ใช้งาน",
    },
  },
  requirement: {},
  equipmentNeeded: [],
  tier: TierEnum.rare,
  consume: {
    hp: 0,
    mp: 0,
    sp: 5,
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
    _location: LocationsEnum,
  ): TurnResult => {
    const duration = skillLevel >= 5 ? 4 : 3;

    // Apply Battle Formation buff to all allies (excluding dead ones)
    const aliveAllies = actorParty.filter((ally) => !ally.vitals.isDead);

    for (const ally of aliveAllies) {
      buffsRepository.battleFormation.appender(ally, { turnsAppending: duration });
    }

    const allyNames = aliveAllies.map((ally) => ally.name.en).join(", ");
    const allyNamesTh = aliveAllies.map((ally) => ally.name.th).join(", ");

    return {
      content: {
        en: `${actor.name.en} forms a defensive battle formation! ${allyNames} gain +2 pDEF, +2 mDEF, and +1 to all saves for ${duration} turn(s)!`,
        th: `${actor.name.th} จัดรูปแบบการรบป้องกัน! ${allyNamesTh} ได้รับ +2 pDEF, +2 mDEF และ +1 ต่อการทอย save ทั้งหมดเป็นเวลา ${duration} เทิร์น!`,
      },
      actor: {
        actorId: actor.id,
        effect: [ActorEffect.TestSkill],
      },
      targets: aliveAllies.map((ally) => ({
        actorId: ally.id,
        effect: [TargetEffect.TestSkill],
      })),
    };
  },
});

