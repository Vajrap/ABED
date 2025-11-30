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
import { statMod } from "src/Utils/statMod";

export const analyze = new ScholarSkill({
  id: ScholarSkillId.Analyze,
  name: {
    en: "Analyze",
    th: "วิเคราะห์",
  },
  description: {
    text: {
      en: "Study your enemy's movements and mark their most vulnerable points.\nMark target with <DebuffExposed> for 2 turns.\n{5}\nAlso reduces their [r]critical defense by <INTmod> but not exceed 3 or below 1[/r].{/}",
      th: "ศึกษาการเคลื่อนไหวของศัตรูและทำเครื่องหมายจุดอ่อนที่สุด\nทำเครื่องหมายเป้าหมายด้วย <DebuffExposed> 2 เทิร์น\n{5}\nยังลด [r]การป้องกันคริติคอล 2[/r] ด้วย{/}",
    },
  },
  requirement: {},
  equipmentNeeded: [],
  notExistDebuff: [DebuffEnum.analyze],
  tier: TierEnum.uncommon,
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
    // universalCounter = 1 if skill level >= 5 (for -2 crit defense)

    debuffsRepository.exposed.appender(target, { 
      turnsAppending: 2, 
    });
    debuffsRepository.analyze.appender(actor, { 
      turnsAppending: 3, 
    });
    if (skillLevel >= 5) {
      const intMod = Math.max(Math.min(statMod(actor.attribute.getTotal("intelligence")), 3), 1);
      // TODO: Add critDef debuff (later we'll have debuff for most stats)
      debuffsRepository.critDef.appender(target, {
        turnsAppending: 2,
        universalCounter: intMod
      })
    }

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
