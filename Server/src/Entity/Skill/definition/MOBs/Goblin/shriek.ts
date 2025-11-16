import {TierEnum} from "src/InterFacesEnumsAndTypes/Tiers";
import {MobSkillId} from "../../../enums";
import {Skill} from "../../../Skill";
import type {Character} from "src/Entity/Character/Character";
import type {TurnResult} from "../../../types";
import {getTarget} from "src/Entity/Battle/getTarget";
import {ActorEffect, TargetEffect} from "../../../effects";
import {rollTwenty} from "src/Utils/Dice";
import {statMod} from "src/Utils/statMod.ts";
import {buffsAndDebuffsRepository} from "src/Entity/BuffsAndDebuffs/repository.ts";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { BuffsAndDebuffsEnum } from "src/Entity/BuffsAndDebuffs/enum";

export const shriek = new Skill({
  id: MobSkillId.Shriek,
  name: {
    en: "Shriek",
    th: "กรีดร้อง",
  },
  description: {
    en: "A panicked shriek all enemy must roll DC10 willpower save, if failed gain Minor Fear. the user also have roll D20, if the result is 15+ gain 1 turn of taunt.",
    th: "กรีดร้องด้วยความตื่นตระหนก ศัตรูทั้งหมดต้องทอย DC10 willpower save, ถ้าล้มเหลวจะทำให้เกิด Minor Fear ผู้ใช้ทอย D20, ถ้าผลลัพธ์คือ 15+ จะได้รับสถานะยั่วยุ 1 เทิร์น",
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
        element: 'neutral',
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
  ) => {
    const targets = getTarget(actor, targetParty).all();

    if (!targets || targets.length === 0) {
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

    // DC 10 willpower save for all targets
    const affectedTargets: Character[] = [];
    const targetEffects: { actorId: string; effect: TargetEffect[] }[] = [];
    
    for (const target of targets) {
      const saveRoll = rollTwenty().total + statMod(target.saveRolls.getStat("willpower").total);
      const saveSuccess = saveRoll >= 10;
      if (!saveSuccess) {
        // Failed save - apply fear
        buffsAndDebuffsRepository.fear.appender(target, 1, false, 0);
        affectedTargets.push(target);
        targetEffects.push({
          actorId: target.id,
          effect: [TargetEffect.Fear],
        });
      } else {
        // Passed save - no effect
        targetEffects.push({
          actorId: target.id,
          effect: [TargetEffect.TestSkill],
        });
      }
    }

    const tauntSuccess = rollTwenty().total >= 15
    if (tauntSuccess) {
      const existingTaunt = actor.buffsAndDebuffs.entry.get(BuffsAndDebuffsEnum.taunt);
      if (existingTaunt) {
        existingTaunt.value += 1;
      } else {
        actor.buffsAndDebuffs.entry.set(BuffsAndDebuffsEnum.taunt, {
          value: 1,
          isPerm: false,
          permValue: 0,
        });
      }
    }

    // Build message describing the effects
    const fearCount = affectedTargets.length;
    const fearTargetsText = fearCount > 0 
      ? affectedTargets.map(t => t.name.en).join(", ")
      : "";
    const fearTargetsTextTH = fearCount > 0 
      ? affectedTargets.map(t => t.name.th).join(", ")
      : "";

    let content = {
      en: `${actor.name.en} shrieked!`,
      th: `${actor.name.th} กรีดร้อง!`,
    };

    if (fearCount > 0 && tauntSuccess) {
      content = {
        en: `${actor.name.en} shrieked! Caused fear on ${fearTargetsText} and gained taunt.`,
        th: `${actor.name.th} กรีดร้อง! สร้างผลหวาดหลัวให้กับ ${fearTargetsTextTH} และได้รับสถานะยั่วยุ`,
      };
    } else if (fearCount > 0) {
      content = {
        en: `${actor.name.en} shrieked! Caused fear on ${fearTargetsText}.`,
        th: `${actor.name.th} กรีดร้อง! สร้างผลหวาดหลัวให้กับ ${fearTargetsTextTH}`,
      };
    } else if (tauntSuccess) {
      content = {
        en: `${actor.name.en} shrieked! Gained taunt.`,
        th: `${actor.name.th} กรีดร้อง! ได้รับสถานะยั่วยุ`,
      };
    }

    const actorEffect = tauntSuccess 
      ? [ActorEffect.Shout, ActorEffect.Taunt]
      : [ActorEffect.Shout];

    let turnResult: TurnResult = {
      content: content,
      actor: {
        actorId: actor.id,
        effect: actorEffect,
      },
      targets: targetEffects,
    };

    return turnResult;
  },
});
