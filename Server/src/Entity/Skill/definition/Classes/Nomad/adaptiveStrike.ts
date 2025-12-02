import { Character } from "src/Entity/Character/Character";
import { NomadSkill } from ".";
import { NomadSkillId } from "../../../enums";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { buildCombatMessage } from "src/Utils/buildCombatMessage";
import { ActorEffect, TargetEffect } from "src/Entity/Skill/effects";
import { getTarget } from "src/Entity/Battle/getTarget";
import type { TurnResult } from "../../../types";
import { resolveDamage } from "src/Entity/Battle/damageResolution";
import { getWeaponDamageOutput } from "src/Utils/getWeaponDamgeOutput";
import { getWeaponDamageType } from "src/Utils/getWeaponDamageType";

export const adaptiveStrike = new NomadSkill({
  id: NomadSkillId.AdaptiveStrike,
  name: {
    en: "Adaptive Strike",
    th: "การโจมตีปรับตัว",
  },
  description: {
    text: {
      en: "Strike while repositioning. Deal weapon damage and change position from front to back or back to front. This attack has -2 hit penalty but no range penalty.",
      th: "โจมตีพร้อมเปลี่ยนตำแหน่ง. สร้างความเสียหายจากอาวุธและเปลี่ยนตำแหน่งจากหน้าไปหลังหรือหลังไปหน้า. การโจมตีนี้มี -2 hit แต่ไม่มี range penalty",
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
        { element: "neutral", min: 1, max: 1 },
    ],
  },
  exec: (
    user: Character,
    userParty: Character[],
    targetParty: Character[],
    skillLevel: number,
    location: LocationsEnum,
  ): TurnResult => {
    const target = getTarget(user, userParty, targetParty, "enemy").one();

    if (!target) {
      return {
        content: {
          en: `${user.name.en} tried to use Adaptive Strike but has no target`,
          th: `${user.name.th} พยายามใช้การโจมตีปรับตัวแต่ไม่พบเป้าหมาย`,
        },
        actor: {
          actorId: user.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    }

    const weapon = user.getWeapon();
    const type = getWeaponDamageType(weapon.weaponType);
    const damageOutput = getWeaponDamageOutput(user, weapon, type);

    // Apply -2 hit penalty
    damageOutput.hit -= 2;

    // Calculate character level multiplier (same as basic attack)
    const levelMultiplier = Math.min(1.0 + Math.floor(user.level / 2) * 0.1, 1.5);

    let finalPositionModifier = 1.0;
    
    const isTargetFrontRow = target.position <= 2;
    const isEnemyFrontRowExists = targetParty.some((member) => member.position <= 2);
    if (!isTargetFrontRow && isEnemyFrontRowExists) {
      finalPositionModifier = 0.75;
    }

    damageOutput.damage = Math.floor(damageOutput.damage * finalPositionModifier * levelMultiplier);

    const damageResult = resolveDamage(user.id, target.id, damageOutput, location);

    // Change position: front -> back or back -> front
    const isFrontRow = user.position <= 2;
    let positionChanged = false;
    const allOccupiedPositions = userParty.map((member) => member.position);

    if (isFrontRow) {
      // Try to move to back row (positions 3, 4, 5)
      for (const position of [3, 4, 5] as const) {
        if (!allOccupiedPositions.includes(position)) {
          user.position = position;
          positionChanged = true;
          break;
        }
      }
    } else {
      // Try to move to front row (positions 0, 1, 2)
      for (const position of [0, 1, 2] as const) {
        if (!allOccupiedPositions.includes(position)) {
          user.position = position;
          positionChanged = true;
          break;
        }
      }
    }

    const positionMessage = positionChanged 
      ? ` and moved to ${user.position <= 2 ? "front" : "back"} row`
      : " (could not change position)";

    const message = buildCombatMessage(
      user,
      target,
      { en: "Adaptive Strike", th: "การโจมตีปรับตัว" },
      damageResult,
    );

    return {
      content: {
        en: `${message.en}${positionMessage}`,
        th: `${message.th}${positionChanged ? ` และย้ายไปแถว${user.position <= 2 ? "หน้า" : "หลัง"}` : " (ไม่สามารถเปลี่ยนตำแหน่งได้)"}`,
      },
      actor: {
        actorId: user.id,
        effect: [ActorEffect.TestSkill],
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

