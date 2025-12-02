import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { MageSkillId } from "../../../enums";
import type { Character } from "src/Entity/Character/Character";
import type { TurnResult } from "../../../types";
import { getTarget } from "src/Entity/Battle/getTarget";
import { ActorEffect, TargetEffect } from "../../../effects";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { resolveDamage } from "src/Entity/Battle/damageResolution";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";
import { statMod } from "src/Utils/statMod";
import { buildCombatMessage } from "src/Utils/buildCombatMessage";
import { buffsAndDebuffsRepository } from "src/Entity/BuffsAndDebuffs/repository";
import { roll, rollTwenty } from "src/Utils/Dice";
import { MageSkill } from "./index";

export const fireBall = new MageSkill({
  id: MageSkillId.FireBall,
  name: {
    en: "Fireball",
    th: "ลูกไฟระเบิด",
  },
  description: {
    text: {
      en: "Unleash a blazing sphere of fire that explodes upon impact, engulfing 1–6 enemies in a devastating inferno.\nDeal <FORMULA> fire damage to each target.\nOn hit, target must [r]roll DC10 + <PlanarMod> ENDsave[/r] or get <DebuffBurn> 1–2 stacks.",
      th: "ปลดปล่อยลูกไฟทรงพลังที่ระเบิดกลางสนาม โอบล้อมศัตรู 1–6 ตัวในไฟนรกที่ทำลายล้าง\nสร้างความเสียหายไฟ <FORMULA> ต่อแต่ละเป้าหมาย\nเมื่อโดน เป้าหมายต้องทอย [r]ENDsave DC10 + <PlanarMod>[/r] หรือถูก <DebuffBurn> 1–2 สแตค",
    },
    formula: {
      en: "{5}'1d12':'1d10'{/} + <PlanarMod> + 0.5 × skill level",
      th: "{5}'1d12':'1d10'{/} + <PlanarMod> + 0.5 × เลเวลสกิล",
    },
  },
  requirement: {},
  equipmentNeeded: [],
  tier: TierEnum.uncommon,
  consume: {
    hp: 0,
    mp: 5,
    sp: 0,
    elements: [
      { element: "fire", value: 2 },
      { element: "chaos", value: 2 },
    ],
  },
  produce: {
    hp: 0,
    mp: 0,
    sp: 0,
    elements: [],
  },
  exec: (
    actor: Character,
    actorParty: Character[],
    targetParty: Character[],
    skillLevel: number,
    location: LocationsEnum,
  ) => {
    // Determine number of targets (1-6, weighted toward 1-3)
    // Roll 2d6, if both are <=3, use first die, else sum them
    const roll1 = roll(6).d(1).total;
    const roll2 = roll(6).d(1).total;
    let numTargets: number;

    if (roll1 <= 3 || roll2 <= 3) {
      numTargets = roll1; // 1-3 targets
    } else {
      numTargets = Math.min(6, Math.floor((roll1 + roll2)/2)); // 2-6 targets
    }

    const targets = getTarget(actor, actorParty, targetParty, "enemy").many(numTargets);

    if (!targets || targets.length === 0) {
      return {
        content: {
          en: `${actor.name.en} tried to cast Fireball but has no targets`,
          th: `${actor.name.th} พยายามใช้ลูกไฟระเบิดแต่ไม่พบเป้าหมาย`,
        },
        actor: {
          actorId: actor.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    }

    // Magic damage calculation: 1d12 + planar mod + 0.5 per skill level
    const planarMod = statMod(actor.attribute.getTotal("planar"));
    const controlMod = statMod(actor.attribute.getTotal("control"));
    const luckMod = statMod(actor.attribute.getTotal("luck"));

    const burnDC = 10 + planarMod;

    // Process all targets
    const targetEffects: { actorId: string; effect: TargetEffect[] }[] = [];
    let combinedMessage = "";

    for (const target of targets) {
      // Calculate base damage
      const baseDiceDamage = roll(12).d(1).total;
      const skillLevelBonus = 0.5 * skillLevel;
      const totalDamage = Math.max(
        0,
        baseDiceDamage + planarMod + skillLevelBonus,
      );

      // Hit comes from control mod
      const hitBonus = controlMod;

      // Crit from luck
      const critBonus = luckMod;

      // Create damage output
      const damageOutput = {
        damage: Math.floor(totalDamage),
        hit: rollTwenty().total - 3 + hitBonus,
        crit: rollTwenty().total + critBonus,
        type: DamageType.fire,
        isMagic: true,
      };

      const totalDamageResult = resolveDamage(
        actor.id,
        target.id,
        damageOutput,
        location,
      );

      // Check for burn application (DC 13)
      let burnMessage = "";
      if (totalDamageResult.isHit) {
        const burnSave = target.rollSave('endurance')
        if (burnSave < burnDC) {
          const burnStacks = roll(2).d(1).total;
          // Actually apply the burn debuff
          const burnResult = buffsAndDebuffsRepository.burn.appender(target, { turnsAppending: burnStacks });
          burnMessage = burnResult.en;
        }
      }

      combinedMessage +=
        buildCombatMessage(
          actor,
          target,
          { en: `Fireball`, th: `ลูกไฟระเบิด` },
          totalDamageResult,
        ).en +
        " " +
        burnMessage +
        " ";

      targetEffects.push({
        actorId: target.id,
        effect: [TargetEffect.FireThree],
      });
    }

    let turnResult: TurnResult = {
      content: {
        en: combinedMessage.trim(),
        th: `${actor.name.en} used Fireball on ${targets.length} targets`,
      },
      actor: {
        actorId: actor.id,
        effect: [ActorEffect.FireThree],
      },
      targets: targetEffects,
    };

    return turnResult;
  },
});
