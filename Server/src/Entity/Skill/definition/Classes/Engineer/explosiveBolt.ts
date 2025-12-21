import { Character } from "src/Entity/Character/Character";
import { EngineerSkill } from ".";
import { EngineerSkillId } from "../../../enums";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { buildCombatMessage } from "src/Utils/buildCombatMessage";
import { ActorEffect, TargetEffect } from "src/Entity/Skill/effects";
import { getTarget } from "src/Entity/Battle/getTarget";
import { statMod } from "src/Utils/statMod";
import type { TurnResult } from "../../../types";
import { resolveDamage } from "src/Entity/Battle/damageResolution";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";
import { skillLevelMultiplier } from "src/Utils/skillScaling";

export const explosiveBolt = new EngineerSkill({
  id: EngineerSkillId.ExplosiveBolt,
  name: {
    en: "Explosive Bolt",
    th: "ลูกธนูระเบิด",
  },
  description: {
    text: {
      en: "Fire an explosive bolt that deals <FORMULA> fire damage to a target. If hit, deals 50% splash damage to adjacent enemies in the same row.",
      th: "ยิงลูกธนูระเบิดที่สร้างความเสียหายไฟ <FORMULA> แก่เป้าหมาย. หากโดน, สร้างความเสียหายสาด 50% แก่ศัตรูที่อยู่ติดกันในแถวเดียวกัน",
    },
    formula: {
      en: "(1d8 + <DEXmod>) × <SkillLevelMultiplier>",
      th: "(1d8 + <DEXmod>) × <SkillLevelMultiplier>",
    },
  },
  requirement: {},
  equipmentNeeded: [],
  tier: TierEnum.uncommon,
  consume: {
    hp: 0,
    mp: 0,
    sp: 3,
    elements: [],
  },
  produce: {
    hp: 0,
    mp: 0,
    sp: 0,
    elements: [
      { element: "fire", min: 1, max: 1 },
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
          en: `${user.name.en} tried to fire explosive bolt but has no target`,
          th: `${user.name.th} พยายามยิงลูกธนูระเบิดแต่ไม่พบเป้าหมาย`,
        },
        actor: {
          actorId: user.id,
          effect: [ActorEffect.Cast],
        },
        targets: [],
      };
    }

    // Calculate main damage: (1d8 + DEX mod) × skillLevelMultiplier
    const dexMod = statMod(user.attribute.getTotal("dexterity"));
    const diceDamage = user.roll({ amount: 1, face: 8, applyBlessCurse: false });
    const levelScalar = skillLevelMultiplier(skillLevel);
    const totalDamage = Math.floor((diceDamage + dexMod) * levelScalar);

    // Calculate hit/crit - fire damage, use CONTROL for hit (magical)
    const hitRoll = user.rollTwenty({ stat: "control" });
    const critRoll = user.rollTwenty({ stat: "luck" });

    const damageOutput = {
      damage: totalDamage,
      hit: hitRoll,
      crit: critRoll,
      type: DamageType.fire,
      isMagic: true,
    };

    const damageResult = resolveDamage(user.id, target.id, damageOutput, location);

    const messages: string[] = [];
    const targetEffects: { actorId: string; effect: TargetEffect[] }[] = [];

    // Main target message
    const mainMessage = buildCombatMessage(
      user,
      target,
      { en: "Explosive Bolt", th: "ลูกธนูระเบิด" },
      damageResult,
    );
    messages.push(mainMessage.en);
    targetEffects.push({
      actorId: target.id,
      effect: [TargetEffect.TestSkill],
    });

    // Splash damage if hit
    if (damageResult.isHit) {
      const splashDamage = Math.floor(totalDamage * 0.5);
      
      // Find adjacent enemies in the same row
      const targetIndex = targetParty.findIndex((char) => char.id === target.id);
      const targetRow = targetIndex < 3 ? "front" : "back";
      
      // Check left and right adjacent positions
      const adjacentIndices: number[] = [];
      if (targetIndex > 0 && targetIndex < 3) {
        // Front row
        adjacentIndices.push(targetIndex - 1);
        if (targetIndex < 2) adjacentIndices.push(targetIndex + 1);
      } else if (targetIndex >= 3 && targetIndex < 6) {
        // Back row
        adjacentIndices.push(targetIndex - 1);
        if (targetIndex < 5) adjacentIndices.push(targetIndex + 1);
      }

      for (const adjIndex of adjacentIndices) {
        if (adjIndex >= 0 && adjIndex < targetParty.length) {
          const adjacentTarget = targetParty[adjIndex];
          if (adjacentTarget && adjacentTarget.id !== target.id && adjacentTarget.vitals.hp.current > 0) {
            const splashDamageOutput = {
              damage: splashDamage,
              hit: 999, // Auto-hit splash
              crit: 0,
              type: DamageType.fire,
              isMagic: true,
            };

            const splashResult = resolveDamage(user.id, adjacentTarget.id, splashDamageOutput, location);
            const splashMessage = buildCombatMessage(
              user,
              adjacentTarget,
              { en: "Explosive Bolt (Splash)", th: "ลูกธนูระเบิด (สาด)" },
              splashResult,
            );
            messages.push(splashMessage.en);

            targetEffects.push({
              actorId: adjacentTarget.id,
              effect: [TargetEffect.TestSkill],
            });
          }
        }
      }
    }

    return {
      content: {
        en: messages.join(" "),
        th: messages.map((m) => m.replace(user.name.en, user.name.th)).join(" "),
      },
      actor: {
        actorId: user.id,
        effect: [ActorEffect.Cast],
      },
      targets: targetEffects,
    };
  },
  isFallback: false,
});

