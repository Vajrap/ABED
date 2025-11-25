import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { ScholarSkillId } from "../../../enums";
import type { Character } from "src/Entity/Character/Character";
import type { TurnResult } from "../../../types";
import { ActorEffect, TargetEffect } from "../../../effects";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { getTarget } from "src/Entity/Battle/getTarget";
import { ScholarSkill } from "./index";
import {
  buffsAndDebuffsRepository,
  debuffsRepository,
} from "src/Entity/BuffsAndDebuffs/repository";
import { DebuffEnum } from "src/Entity/BuffsAndDebuffs/enum";

export const disruptPattern = new ScholarSkill({
  id: ScholarSkillId.DisruptPattern,
  name: {
    en: "Disrupt Pattern",
    th: "ทำลายรูปแบบ",
  },
  description: {
    en: "Force DC10 (DC12 at level 5) Will save. Fail: target is Dazed 1 turn. Success: reduce target's next initiative by 20 (30 at level 5). After using, if the reducing is success, this skill will go into cooldown (Debuff) for 3 turns.",
    th: "บังคับให้ทำการทดสอบ Will DC10 (DC12 ที่เลเวล 5) หากล้มเหลว: เป้าหมายจะสับสน 1 เทิร์น หากสำเร็จ: ลด initiative ครั้งถัดไปของเป้าหมาย 20 (30 ที่เลเวล 5). หลังใช้เสร็จสิ้น ทักษะนี้จะอยู่ในช่วง Cooldown 3 เทิร์น",
  },
  requirement: {},
  equipmentNeeded: [],
  notExistDebuff: [DebuffEnum.disruptPattern],
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
    const target = getTarget(actor, actorParty, targetParty, "enemy").one();

    if (!target) {
      return {
        content: {
          en: `${actor.name.en} tried to disrupt pattern but has no target`,
          th: `${actor.name.th} พยายามทำลายรูปแบบแต่ไม่พบเป้าหมาย`,
        },
        actor: {
          actorId: actor.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    }

    const dc = skillLevel >= 5 ? 12 : 10;
    const saveRoll = target.rollSave("willpower");

    if (saveRoll < dc) {
      // Save failed: Apply Dazed debuff
      debuffsRepository.disruptPattern.appender(actor, 3, false, 0);
      debuffsRepository.dazed.appender(target, 1, false, 0);
      return {
        content: {
          en: `${actor.name.en} disrupts ${target.name.en}'s pattern! ${target.name.en} is dazed!`,
          th: `${actor.name.th} ทำลายรูปแบบของ ${target.name.th}! ${target.name.th} สับสน!`,
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
    } else {
      // Save succeeded: Reduce AB gauge (initiative)
      const reduction = skillLevel >= 5 ? 30 : 20;
      target.abGauge = Math.max(0, target.abGauge - reduction);
      return {
        content: {
          en: `${actor.name.en} disrupts ${target.name.en}'s pattern! ${target.name.en} resists but their initiative is reduced by ${reduction}!`,
          th: `${actor.name.th} ทำลายรูปแบบของ ${target.name.th}! ${target.name.th} ต้านทานได้แต่ initiative ลดลง ${reduction}!`,
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
    }
  },
});
