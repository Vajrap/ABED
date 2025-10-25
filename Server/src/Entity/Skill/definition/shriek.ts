import {TierEnum} from "src/InterFacesEnumsAndTypes/Tiers";
import {SkillId} from "../enums";
import {Skill} from "../Skill";
import type {Character} from "src/Entity/Character/Character";
import type {TurnResult} from "../types";
import {buildCombatMessage} from "src/Utils/buildCombatMessage";
import {getTarget} from "src/Entity/Battle/getTarget";
import {ActorEffect, TargetEffect} from "../effects";
import {DamageType} from "src/InterFacesEnumsAndTypes/DamageTypes";
import {roll, rollTwenty} from "src/Utils/Dice";
import {statMod} from "src/Utils/statMod.ts";
import {buffsAndDebuffsRepository} from "src/Entity/BuffsAndDebuffs/repository.ts";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";

export const shriek = new Skill({
  id: SkillId.Shriek,
  name: {
    en: "Shriek",
    th: "กรีดร้อง",
  },
  description: {
    en: "A panicked shriek has roll 1D20 VS. DC15 (+target WIL) chance to inflict Minor Fear. If Fear fails, applies Taunt to self for 1 turn.",
    th: "กรีดร้องด้วยความตื่นตระหนก ทอยลูกเต๋า 1D20 VS. DC15 (+target WIL) ที่จะทำให้เกิดความกลัวเล็กน้อย ถ้าล้มเหลวจะทำให้ตัวเองได้รับ Taunt 1 turn",
  },
  requirement: {},
  equipmentNeeded: [], // No equipment needed for vocal skill
  tier: TierEnum.common,
  consume: {
    hp: 0,
    mp: 0,
    sp: 2,
    elements: [
      {
        element: "none",
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
        element: "wind",
        min: 0,
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
  ) => {
    const target = getTarget(actor, targetParty).one().randomly()[0];

    if (!target) {
      return {
        content: {
          en: `${actor.name.en} shrieked but has no target`,
          th: `${actor.name.th} กรีดร้องแต่ไม่พบเป้าหมาย`,
        },
        actor: {
          actorId: actor.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    }

    // DC 15 + will
    const fearSuccess = rollTwenty().total + statMod(actor.attribute.getTotal('willpower')) >= 15 + statMod(target.attribute.getTotal('willpower'));
    if (fearSuccess) {
        buffsAndDebuffsRepository.fear.appender(target, 1, false, 0);
    } else {
        buffsAndDebuffsRepository.taunt.appender(actor, 1, false, 0);
    }

    const actorEffect = [ActorEffect.Shout]
      if (!fearSuccess) actorEffect.push(ActorEffect.Taunt)
      const targetEffect = []
      if (fearSuccess) targetEffect.push(TargetEffect.Fear)

    let turnResult: TurnResult = {
      content: buildCombatMessage(
        actor,
        target,
        {
          en: `${actor.name.en} Shriek caused ${fearSuccess 
              ? `Fear on ${target.name.en}` 
              : 'self to gain taunt'
          }`,
          th: `${actor.name.th} ส่งเสียงกรีดร้อง ${fearSuccess
              ? `สร้างผลหวาดหลัวให้กับ ${target.name.th}` 
              : `ทำให้ตนได้รับ "ยั่วยุ"`
          }`
        },
        { isHit: true, actualDamage: 0, damageType: DamageType.arcane },
      ),
      actor: {
        actorId: actor.id,
        effect: actorEffect,
      },
      targets: [
        {
          actorId: target.id,
          effect: targetEffect,
        },
      ],
    };

    return turnResult;
  },
});
