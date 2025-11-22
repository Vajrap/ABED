import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { ScholarSkillId } from "../../../enums";
import type { Character } from "src/Entity/Character/Character";
import type { TurnResult } from "../../../types";
import { ActorEffect, TargetEffect } from "../../../effects";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { getTarget } from "src/Entity/Battle/getTarget";
import { ScholarSkill } from "./index";
import { debuffsRepository } from "src/Entity/BuffsAndDebuffs/repository";
import { DebuffEnum } from "src/Entity/BuffsAndDebuffs/enum";

export const analyze = new ScholarSkill({
  id: ScholarSkillId.Analyze,
  name: {
    en: "Analyze",
    th: "วิเคราะห์",
  },
  description: {
    en: "Mark a vulnerable spot on the enemy. For 2 turns, the marked enemy gets Exposed debuff. Exposed: takes additional 1d3 damage from all sources. If skill level is 5, the exposed enemy also gains -2 to critical defense.",
    th: "ทำเครื่องหมายจุดอ่อนบนศัตรู เป็นเวลา 2 เทิร์น ศัตรูที่ถูกทำเครื่องหมายจะได้รับ debuff 'เปิดเผยจุดอ่อน' เปิดเผยจุดอ่อน: รับความเสียหายเพิ่ม 1d3 จากทุกแหล่ง หากเลเวลสกิลถึง 5 ศัตรูที่ถูกเปิดเผยจะได้รับ -2 ต่อการป้องกันคริติคอลด้วย",
  },
  requirement: {},
  equipmentNeeded: [],
  tier: TierEnum.uncommon,
  consume: {
    hp: 0,
    mp: 3,
    sp: 0,
    elements: [],
  },
  produce: {
    hp: 0,
    mp: 0,
    sp: 0,
    elements: [
      { element: "neutral", min: 1, max: 1 },
    ],
  },
  exec: (
    actor: Character,
    actorParty: Character[],
    targetParty: Character[],
    skillLevel: number,
    location: LocationsEnum,
  ): TurnResult => {
    const target = getTarget(actor, actorParty, targetParty, "enemy").one();

    if (!target) {
      return {
        content: {
          en: `${actor.name.en} tried to analyze but has no target`,
          th: `${actor.name.th} พยายามวิเคราะห์แต่ไม่พบเป้าหมาย`,
        },
        actor: {
          actorId: actor.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    }

    // Apply Exposed debuff for 2 turns
    // permValue = 1 if skill level >= 5 (for -2 crit defense)
    // TODO: Let's add some condition, maybe DC8 + target int mod against D20 + user int mod
    const permValue = skillLevel >= 5 ? 1 : 0;
    debuffsRepository.exposed.appender(target, 2, false, permValue);

    return {
      content: {
        en: `${actor.name.en} analyzes ${target.name.en}, marking their weak points!`,
        th: `${actor.name.th} วิเคราะห์ ${target.name.th} ทำเครื่องหมายจุดอ่อน!`,
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

