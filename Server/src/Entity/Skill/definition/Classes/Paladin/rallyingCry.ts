import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { PaladinSkillId } from "../../../enums";
import type { Character } from "src/Entity/Character/Character";
import type { TurnResult } from "../../../types";
import { ActorEffect, TargetEffect } from "../../../effects";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { statMod } from "src/Utils/statMod";
import { skillLevelMultiplier } from "src/Utils/skillScaling";
import { PaladinSkill } from "./index";
import { getTarget } from "src/Entity/Battle/getTarget";

export const rallyingCry = new PaladinSkill({
  id: PaladinSkillId.RallyingCry,
  name: {
    en: "Rallying Cry",
    th: "เสียงเรียกขวัญ",
  },
  description: {
    text: {
      en: "Rally your allies with an inspiring cry.\nAll allies gain your CHA Mod × Skill level multiplier HP, MP and SP restored, + CHA mod AB gauge. Except you.",
      th: "เรียกขวัญพันธมิตรด้วยเสียงเรียกที่สร้างแรงบันดาลใจ\nพันธมิตรทั้งหมดได้รับ CHA Mod × Skill level multiplier HP, MP และ SP ฟื้นฟู + CHA mod AB gauge ยกเว้นคุณ",
    },
  },
  requirement: {},
  equipmentNeeded: [],
  tier: TierEnum.common,
  consume: {
    hp: 0,
    mp: 0,
    sp: 4,
    elements: [
      {
        element: "order",
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
        element: "neutral",
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
    const charismaMod = statMod(actor.attribute.getTotal("charisma"));
    const levelScalar = skillLevelMultiplier(skillLevel);
    
    // Calculate restore amount: CHA Mod × Skill level multiplier
    const restoreAmount = Math.floor(charismaMod * levelScalar);
    const abGaugeAmount = charismaMod;

    // Get all living allies except self
    const allies = getTarget(actor, actorParty, targetParty, "ally").except([actor]).all();

    if (allies.length === 0) {
      return {
        content: {
          en: `${actor.name.en} tried to rally but has no allies`,
          th: `${actor.name.th} พยายามเรียกขวัญแต่ไม่มีพันธมิตร`,
        },
        actor: {
          actorId: actor.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    }

    const targetEffects: { actorId: string; effect: TargetEffect[] }[] = [];
    let combinedMessage = "";

    for (const ally of allies) {
      // Restore HP, MP, SP
      const beforeHp = ally.vitals.hp.current;
      const beforeMp = ally.vitals.mp.current;
      const beforeSp = ally.vitals.sp.current;
      
      ally.vitals.incHp(restoreAmount);
      ally.vitals.incMp(restoreAmount);
      ally.vitals.incSp(restoreAmount);
      
      // Gain AB gauge
      ally.abGauge = Math.min(100, ally.abGauge + abGaugeAmount);

      const actualHpRestored = ally.vitals.hp.current - beforeHp;
      const actualMpRestored = ally.vitals.mp.current - beforeMp;
      const actualSpRestored = ally.vitals.sp.current - beforeSp;

      combinedMessage += `${ally.name.en} restored ${actualHpRestored} HP, ${actualMpRestored} MP, ${actualSpRestored} SP, +${abGaugeAmount} AB! `;

      targetEffects.push({
        actorId: ally.id,
        effect: [TargetEffect.OrderOne],
      });
    }

    return {
      content: {
        en: `${actor.name.en} rallied the party! ${combinedMessage.trim()}`,
        th: `${actor.name.th} เรียกขวัญทีม! ${combinedMessage.trim()}`,
      },
      actor: {
        actorId: actor.id,
        effect: [ActorEffect.TestSkill],
      },
      targets: targetEffects,
    };
  },
});

