import type { Character } from "src/Entity/Character/Character";
import { KnightSkill } from "./index";
import { KnightSkillId } from "../../../enums";
import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import type { TurnResult } from "../../../types";
import { ActorEffect, TargetEffect } from "../../../effects";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { BuffEnum } from "src/Entity/BuffsAndDebuffs/enum";
import { buffsRepository } from "src/Entity/BuffsAndDebuffs/repository";

const ADVANCING_PACE_DURATION = 3;

export const advancingPaceSkill = new KnightSkill({
  id: KnightSkillId.AdvancingPace,
  name: {
    en: "Advancing Pace",
    th: "ก้าวจังหวะรุก",
  },
  description: {
    en: "Channel planar force into disciplined footwork. Grants Advancing Pace for 3 turns: +2 STR, +1d4 AB gauge per tick, -1 DEF. At skill level 5 the DEF penalty is removed and AB speed becomes +35%.",
    th: "ถ่ายทอดพลังภายในสู่จังหวะก้าว ได้รับบัฟ 3 เทิร์น: STR +2, AB gauge +1d4 ต่อรอบ แต่ DEF -1. เมื่อเลเวล 5 จะไม่มีโทษ DEF และความเร็ว AB เพิ่ม 35%",
  },
  requirement: {},
  equipmentNeeded: [],
  tier: TierEnum.rare,
  consume: {
    hp: 0,
    mp: 0,
    sp: 4,
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
    elements: [],
  },
  exec: (
    actor: Character,
    actorParty: Character[],
    targetParty: Character[],
    skillLevel: number,
    _location: LocationsEnum,
  ): TurnResult => {
    const activeEntry = actor.buffsAndDebuffs.buffs.entry.get(
      BuffEnum.advancingPace,
    );
    if (activeEntry && activeEntry.value > 0) {
      return {
        content: {
          en: `${actor.name.en} is already maintaining an Advancing Pace.`,
          th: `${actor.name.th} กำลังอยู่ในสถานะก้าวจังหวะรุกอยู่แล้ว`,
        },
        actor: {
          actorId: actor.id,
          effect: [ActorEffect.Focus],
        },
        targets: [
          {
            actorId: actor.id,
            effect: [TargetEffect.Haste],
          },
        ],
      };
    }

    const advancedTierFlag = skillLevel >= 5 ? 1 : 0;
    buffsRepository[BuffEnum.advancingPace].appender(
      actor,
      ADVANCING_PACE_DURATION,
      false,
      advancedTierFlag,
    );

    return {
      content: {
        en: `${actor.name.en} quickens their step${advancedTierFlag ? ", moving with unstoppable rhythm!" : "."}`,
        th: `${actor.name.th} เร่งจังหวะก้าว${advancedTierFlag ? " จนยากจะหยุดยั้ง!" : ""}`,
      },
      actor: {
        actorId: actor.id,
        effect: [ActorEffect.Charge],
      },
      targets: [
        {
          actorId: actor.id,
          effect: [TargetEffect.Haste],
        },
      ],
    };
  },
});
