import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { BasicSkillId } from "../enums";
import { Skill } from "../Skill";
import type { Character } from "src/Entity/Character/Character";
import { getWeaponDamageOutput } from "src/Utils/getWeaponDamgeOutput";
import type { TurnResult } from "../types";
import { buildCombatMessage } from "src/Utils/buildCombatMessage";
import { ActorEffect, TargetEffect } from "../effects";
import { getTarget } from "src/Entity/Battle/getTarget";
import { getWeaponDamageType } from "src/Utils/getWeaponDamageType";
import { getPositionModifier } from "src/Utils/getPositionModifier";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { resolveDamage } from "src/Entity/Battle/damageResolution";

export const basicAttack = new Skill({
  id: BasicSkillId.Basic,
  name: {
    en: "Basic Attack",
    th: "โจมตีปกติ",
  },
  description: {
    text: {
      en: "A basic attack, dealing damage equal to weapon's damage (+ modifier)",
      th: "การโจมตีปกติ สร้างความเสียหายเท่ากับความเสียหายจากอาวุธ (+ modifier)",
    },
    formula: {
      en: "(Weapon damage + attribute modifier) × (1.0 + 0.1 per 2 character levels, max 1.5 at level 10)",
      th: "(ความเสียหายจากอาวุธ + ค่า modifier) × (1.0 + 0.1 ทุก 2 ระดับตัวละคร, สูงสุด 1.5 ที่ระดับ 10)",
    },
  },
  requirement: {},
  equipmentNeeded: [],
  tier: TierEnum.common,
  consume: {
    hp: 0,
    mp: 0,
    sp: 2,
    elements: [],
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
  ) => {
    const target = getTarget(actor, actorParty, targetParty, "enemy").one();

    if (!target) {
      return {
        content: {
          en: `${actor.name.en} tried to attack with basic attack but has no target`,
          th: `${actor.name.th} พยายามโจมตีด้วยการโจมตีปกติแต่ไม่พบเป้าหมาย`,
        },
        actor: {
          actorId: actor.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    }

    const weapon = actor.getWeapon();
    const type = getWeaponDamageType(weapon.weaponType);
    const damageOutput = getWeaponDamageOutput(actor, weapon, type);
    
    const positionMidifier = getPositionModifier(
      actor.position,
      target.position,
      weapon,
    );

    // Calculate level multiplier: 1.0 at level 1, +0.1 every 2 levels starting from level 2, max 1.5 at level 10+
    // Level 1: 1.0, Level 2-3: 1.1, Level 4-5: 1.2, Level 6-7: 1.3, Level 8-9: 1.4, Level 10+: 1.5
    const levelMultiplier = Math.min(1.0 + Math.floor(actor.level / 2) * 0.1, 1.5);

    damageOutput.damage = Math.floor(damageOutput.damage * positionMidifier * levelMultiplier);

    const totalDamage = resolveDamage(
      actor.id,
      target.id,
      damageOutput,
      location,
    );

    let turnResult: TurnResult = {
      content: buildCombatMessage(
        actor,
        target,
        { en: "Basic Attack", th: "การโจตีปกติ" },
        totalDamage,
      ),
      actor: {
        actorId: actor.id,
        effect: [ActorEffect.TestSkill],
      },
      targets: [
        {
          actorId: target.id,
          effect: [TargetEffect.TestSkill],
        },
      ],
    };

    return turnResult;
  },
});
