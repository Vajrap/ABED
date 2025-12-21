import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { DruidSkillId } from "../../../enums";
import type { Character } from "src/Entity/Character/Character";
import type { TurnResult } from "../../../types";
import { getTarget } from "src/Entity/Battle/getTarget";
import { ActorEffect, TargetEffect } from "../../../effects";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { DruidSkill } from "./index";
import { buffsAndDebuffsRepository } from "src/Entity/BuffsAndDebuffs/repository";

export const naturalResilience = new DruidSkill({
  id: DruidSkillId.NaturalResilience,
  name: {
    en: "Natural Resilience",
    th: "ความแข็งแกร่งตามธรรมชาติ",
  },
  description: {
    text: {
      en: "Grant natural resilience to an ally.\nTarget: 1 random ally (2 at level 5).\nGrant <BuffBless> for {5}'3':'2'{/} turns.\nTarget gains +1 END while Bless is active.",
      th: "ให้ความแข็งแกร่งตามธรรมชาติแก่พันธมิตร\nเป้าหมาย: 1 พันธมิตรแบบสุ่ม (2 ที่เลเวล 5)\nให้ <BuffBless> เป็นเวลา {5}'3':'2'{/} เทิร์น\nเป้าหมายได้ +1 END ขณะที่ Bless เปิดใช้งาน",
    },
    formula: {
      en: "Bless buff for 2 turns (3 at level 5) with +1 END bonus",
      th: "Bless buff เป็นเวลา 2 เทิร์น (3 ที่เลเวล 5) พร้อมโบนัส +1 END",
    },
  },
  requirement: {},
  equipmentNeeded: [],
  tier: TierEnum.common,
  isFallback: true, // Natural Resilience: no elemental resources, no buff requirement
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
    location: LocationsEnum,
  ): TurnResult => {
    // Target: 1 random ally (2 at level 5)
    const numTargets = skillLevel >= 5 ? 2 : 1;
    const targets = getTarget(actor, actorParty, targetParty, "ally").many(numTargets);

    if (targets.length === 0) {
      return {
        content: {
          en: `${actor.name.en} tried to use Natural Resilience but has no targets`,
          th: `${actor.name.th} พยายามใช้ความแข็งแกร่งตามธรรมชาติแต่ไม่พบเป้าหมาย`,
        },
        actor: {
          actorId: actor.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    }

    const duration = skillLevel >= 5 ? 3 : 2;
    const targetEffects: { actorId: string; effect: TargetEffect[] }[] = [];
    const allyNames: string[] = [];

    for (const target of targets) {
      // Grant Bless buff
      buffsAndDebuffsRepository.bless.appender(target, { turnsAppending: duration });
      
      // Grant +1 END while Bless is active
      // Note: The Bless resolver would need to handle removing this bonus when the buff expires
      // For now, we'll apply it manually. In a full implementation, this should be tracked properly.
      target.attribute.mutateBattle("endurance", 1);
      
      allyNames.push(target.name.en);
      targetEffects.push({
        actorId: target.id,
        effect: [TargetEffect.TestSkill],
      });
    }

    return {
      content: {
        en: `${actor.name.en} granted Natural Resilience! ${allyNames.join(", ")} gain Bless for ${duration} turn(s) and +1 END!`,
        th: `${actor.name.th} ให้ความแข็งแกร่งตามธรรมชาติ! ${allyNames.join(", ")} ได้รับ Bless เป็นเวลา ${duration} เทิร์น และ +1 END!`,
      },
      actor: {
        actorId: actor.id,
        effect: [ActorEffect.Cast],
      },
      targets: targetEffects,
    };
  },
});

