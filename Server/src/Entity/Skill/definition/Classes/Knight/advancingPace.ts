import type { Character } from "src/Entity/Character/Character";
import { KnightSkill } from "./index";
import { KnightSkillId } from "../../../enums";
import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import type { TurnResult } from "../../../types";
import { ActorEffect, TargetEffect } from "../../../effects";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { BuffEnum } from "src/Entity/BuffsAndDebuffs/enum";
import { buffsRepository } from "src/Entity/BuffsAndDebuffs/repository";

export const advancingPaceSkill = new KnightSkill({
  id: KnightSkillId.AdvancingPace,
  name: {
    en: "Advancing Pace",
    th: "ก้าวจังหวะรุก",
  },
  description: {
    text: {
      en: "Channel planar force into disciplined footwork, moving with unstoppable momentum.\nGain <BuffAdvancingPace> for {5}4:3{/} turns.",
      th: "ถ่ายทอดพลังภายในสู่จังหวะก้าว เคลื่อนไหวด้วยโมเมนตัมที่ไม่อาจหยุดยั้ง\nได้รับ <BuffAdvancingPace> {5}4:3{/} เทิร์น",
    },
  },
  requirement: {},
  equipmentNeeded: [],
  tier: TierEnum.rare,
  consume: {
    hp: 0,
    mp: 3,
    sp: 4,
    elements: [
      {
        element: "neutral",
        value: 3,
      },
    ],
  },
  produce: {
    hp: 0,
    mp: 0,
    sp: 0,
    elements: [
      {
        element: "fire",
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

    buffsRepository[BuffEnum.advancingPace].appender(
      actor,
      {
        turnsAppending: skillLevel >= 5 ? 4 : 3,
        universalCounter: skillLevel >= 5 ? 1 : 0,
      },
    );

    // Gain AB gauge immediately (+5 at level <5, +10 at level 5)
    const abGaugeGain = skillLevel >= 5 ? 10 : 5;
    actor.abGauge = Math.min(100, actor.abGauge + abGaugeGain);

    return {
      content: {
        en: `${actor.name.en} advances their pace for ${skillLevel >= 5 ? 4 : 3} turns and gains +${abGaugeGain} AB gauge!`,
        th: `${actor.name.th} เร่งจังหวะก้าว ${skillLevel >= 5 ? 4 : 3} เทิร์น และได้รับ +${abGaugeGain} AB gauge!`,
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
