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
import { ActorEffect, TargetEffect } from "../effects";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";
import { buildCombatMessage } from "src/Utils/buildCombatMessage";

export const retreatDash = new Skill({
  id: SkillId.RetreatDash,
  name: {
    en: "Retreat Dash",
    th: "วิ่งหนี",
  },
  description: {
    en: "A desperate retreat that consumes 1 Air. Only usable when HP < 30%. Grants +30% Evasion for 1 turn and attempts to move to backline.",
    th: "การหนีแบบสิ้นหวัง ใช้ 1 Air ใช้ได้เฉพาะเมื่อ HP < 30% เพิ่มการหลบหลีก 30% เป็นเวลา 1 ตา และพยายามย้ายไปแถวหลัง",
  },
  requirement: {},
  equipmentNeeded: [], // No equipment needed for movement skill
  tier: TierEnum.common,
  consume: {
    hp: 0,
    mp: 0,
    sp: 4,
    elements: [
      {
        element: "wind", // Air element
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
        element: "none",
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
    location: Location,
  ) => {
    // Check HP condition (HP < 30%)
    const currentHp = actor.vitals.hp.current;
    const maxHp = actor.vitals.hp.max;
    const hpPercentage = (currentHp / maxHp) * 100;

    if (hpPercentage >= 30) {
      return {
        content: {
          en: `${actor.name.en} is not desperate enough to retreat!`,
          th: `${actor.name.th} ยังไม่สิ้นหวังพอที่จะหนี!`,
        },
        actor: {
          actorId: actor.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    }

    // TODO: Implement Evasion +30% for 1 turn
    // TODO: Implement movement to backline logic
    // TODO: Implement flee logic if already far

    let turnResult: TurnResult = {
      content: buildCombatMessage(
        actor,
        actor, // Self-target for retreat
        { en: "Retreat Dash", th: "วิ่งหนี" },
        { isHit: true, actualDamage: 0, damageType: DamageType.arcane },
      ),
      actor: {
        actorId: actor.id,
        effect: [ActorEffect.Retreat],
      },
      targets: [
        {
          actorId: actor.id,
          effect: [TargetEffect.Evasion],
        },
      ],
    };

    return turnResult;
  },
});
