import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { SkillId } from "../enums";
import { Skill } from "../Skill";
import type { Location } from "src/Entity/Location/Location";
import type { Character } from "src/Entity/Character/Character";
import {
  PROFICIENCY_KEYS,
  type ProficiencyKey,
} from "src/InterFacesEnumsAndTypes/Enums";
import type { TurnResult } from "../types";
import { buildCombatMessage } from "src/Utils/buildCombatMessage";
import { getTarget } from "src/Entity/Battle/getTarget";
import { ActorEffect, TargetEffect } from "../effects";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";
import { roll } from "src/Utils/Dice";

export const shriek = new Skill({
  id: SkillId.Shriek,
  name: {
    en: "Shriek",
    th: "เสียงกรีดร้อง",
  },
  description: {
    en: "A panicked shriek has DC 10 (-target Endurance mod) chance to inflict Minor Fear. If Fear fails, applies Taunt to self for 1 turn.",
    th: "เสียงกรีดร้องแบบตื่นตระหนก มีโอกาส DC 10 (-mod endurance ของเป้าหมาย) ที่จะทำให้เกิดความกลัวเล็กน้อย ถ้าล้มเหลวจะทำให้ตัวเองได้รับ Taunt 1 turn",
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
    location: Location,
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

    // Check for Minor Fear effect (15% chance)
    const fearSuccess = roll(1).d(100).total <= 15;
    let effectMessage = "";
    let targetEffect = [TargetEffect.TestSkill];

    if (fearSuccess) {
      // TODO: Implement Minor Fear effect (-5% ATK, 1 turn)
      effectMessage = " (Minor Fear!)";
      targetEffect = [TargetEffect.Fear];
    } else {
      // TODO: Implement Taunt effect on self (1 turn)
      effectMessage = " (Self-Taunt!)";
      targetEffect = [TargetEffect.Taunt];
    }

    // Check for Air generation (50% chance)
    const airGenerated = roll(1).d(100).total <= 50;
    let airMessage = "";
    if (airGenerated) {
      airMessage = " (Generated Air!)";
    }

    let turnResult: TurnResult = {
      content: buildCombatMessage(
        actor,
        target,
        { 
          en: `Shriek${effectMessage}${airMessage}`, 
          th: `เสียงกรีดร้อง${effectMessage}${airMessage}` 
        },
        { isHit: true, actualDamage: 0, damageType: DamageType.arcane },
      ),
      actor: {
        actorId: actor.id,
        effect: [ActorEffect.TestSkill],
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
