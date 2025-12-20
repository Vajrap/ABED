import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { BarbarianSkillId } from "../../../enums";
import type { Character } from "src/Entity/Character/Character";
import type { TurnResult } from "../../../types";
import { buildCombatMessage } from "src/Utils/buildCombatMessage";
import { getTarget } from "src/Entity/Battle/getTarget";
import { ActorEffect, TargetEffect } from "../../../effects";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { resolveDamage } from "src/Entity/Battle/damageResolution";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";
import { statMod } from "src/Utils/statMod";
import { skillLevelMultiplier } from "src/Utils/skillScaling";
import { BarbarianSkill } from "./index";
import { debuffsRepository } from "src/Entity/BuffsAndDebuffs/repository";

export const groundSlam = new BarbarianSkill({
  id: BarbarianSkillId.GroundSlam,
  name: {
    en: "Ground Slam",
    th: "กระแทกพื้น",
  },
  description: {
    text: {
      en: "Attack one enemy with a powerful ground slam, affecting adjacent enemies.\nDeal <FORMULA> blunt damage.\nTarget [r]rolls DC10 + <STRmod> ENDsave[/r] or gains <DebuffDazed> for 1 turn.\nAdjacent enemies take {5}'75%':'50%'{/} damage and [r]roll DC5 ENDsave[/r] or gain <DebuffDazed> for 1 turn.",
      th: "โจมตีศัตรูหนึ่งคนด้วยการกระแทกพื้นที่ทรงพลัง ส่งผลกระทบต่อศัตรูที่อยู่ใกล้เคียง\nสร้างความเสียหาย <FORMULA>\nเป้าหมาย [r]ทอย DC10 + <STRmod> ENDsave[/r] หรือได้รับ <DebuffDazed> เป็นเวลา 1 เทิร์น\nศัตรูที่อยู่ใกล้เคียงรับความเสียหาย {5}'75%':'50%'{/} และ [r]ทอย DC5 ENDsave[/r] หรือได้รับ <DebuffDazed> เป็นเวลา 1 เทิร์น",
    },
    formula: {
      en: "1d6 + <STRmod> × <SkillLevelMultiplier>",
      th: "1d6 + <STRmod> × <SkillLevelMultiplier>",
    },
  },
  requirement: {},
  equipmentNeeded: [],
  tier: TierEnum.uncommon,
  consume: {
    hp: 0,
    mp: 0,
    sp: 4,
    elements: [
      { element: "earth", value: 2 },
    ],
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
          en: `${actor.name.en} tried to use Ground Slam but has no target`,
          th: `${actor.name.th} พยายามใช้กระแทกพื้นแต่ไม่พบเป้าหมาย`,
        },
        actor: {
          actorId: actor.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    }

    const strMod = statMod(actor.attribute.getTotal("strength"));
    const levelScalar = skillLevelMultiplier(skillLevel);
    const splashMultiplier = skillLevel >= 5 ? 0.75 : 0.5;

    // Base damage: 1d6 + STR mod × skill level multiplier
    const baseDamage = actor.roll({ amount: 1, face: 6, stat: "strength" });
    const totalDamage = Math.floor(baseDamage * levelScalar);

    // Target save: DC10 + STR mod END save
    const targetDC = 10 + strMod;
    const targetSave = target.rollSave("endurance");

    // Deal damage to main target
    const damageOutput = {
      damage: totalDamage,
      hit: actor.rollTwenty({ stat: "control" }),
      crit: actor.rollTwenty({ stat: "luck" }),
      type: DamageType.blunt,
      isMagic: false,
    };

    const damageResult = resolveDamage(actor.id, target.id, damageOutput, location);
    let messages: string[] = [];
    const targetEffects: { actorId: string; effect: TargetEffect[] }[] = [];

    // Main target message
    const mainMessage = buildCombatMessage(
      actor,
      target,
      { en: "Ground Slam", th: "กระแทกพื้น" },
      damageResult,
    );
    messages.push(mainMessage.en);

    // Apply Dazed debuff if save fails
    if (targetSave < targetDC) {
      debuffsRepository.dazed.appender(target, { turnsAppending: 1 });
      messages.push(`${target.name.en} is dazed!`);
    }

    targetEffects.push({
      actorId: target.id,
      effect: [TargetEffect.TestSkill],
    });

    // Splash Damage: Adjacent enemies take 50% damage (75% at level 5) and roll DC5 END save or gain Dazed debuff for 1 turn
    const targetIndex = targetParty.findIndex((char) => char.id === target.id);
    const targetRow = targetIndex < 3 ? "front" : "back";
    const targetPosition = target.position;

    // Find adjacent enemies (same row, position difference of 1)
    const adjacentEnemies = targetParty.filter((enemy) => {
      if (enemy.id === target.id || enemy.vitals.isDead) return false;
      
      const enemyRow = enemy.position <= 2 ? "front" : "back";
      if (enemyRow !== targetRow) return false; // Must be same row
      
      const positionDiff = Math.abs(enemy.position - targetPosition);
      return positionDiff === 1; // Adjacent means difference of 1
    });

    for (const adjacentTarget of adjacentEnemies) {
      const splashDamage = Math.floor(totalDamage * splashMultiplier);
      
      const splashDamageOutput = {
        damage: splashDamage,
        hit: 999, // Auto-hit splash
        crit: 0,
        type: DamageType.blunt,
        isMagic: false,
      };

      const splashResult = resolveDamage(actor.id, adjacentTarget.id, splashDamageOutput, location);
      const splashMessage = buildCombatMessage(
        actor,
        adjacentTarget,
        { en: "Ground Slam (Splash)", th: "กระแทกพื้น (สาด)" },
        splashResult,
      );
      messages.push(splashMessage.en);

      // Adjacent save: DC5 END save
      const adjacentSave = adjacentTarget.rollSave("endurance");
      if (adjacentSave < 5) {
        debuffsRepository.dazed.appender(adjacentTarget, { turnsAppending: 1 });
        messages.push(`${adjacentTarget.name.en} is dazed!`);
      }

      targetEffects.push({
        actorId: adjacentTarget.id,
        effect: [TargetEffect.TestSkill],
      });
    }

    return {
      content: {
        en: `${actor.name.en} slams the ground! ${messages.join(" ")}`,
        th: `${actor.name.th} กระแทกพื้น! ${messages.join(" ")}`,
      },
      actor: {
        actorId: actor.id,
        effect: [ActorEffect.TestSkill],
      },
      targets: targetEffects,
    };
  },
});

