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
import { roll, rollTwenty } from "src/Utils/Dice";
import { buffsAndDebuffsRepository } from "src/Entity/BuffsAndDebuffs/repository";
import { MageSkill } from "./index";
import { skillLevelMultiplier } from "src/Utils/skillScaling";

export const burningHand = new MageSkill({
  id: MageSkillId.BurningHand,
  name: {
    en: "Burning Hand",
    th: "มือไฟแผดเผา",
  },
  description: {
    text: {
      en: "Project waves of searing flame from your hand, engulfing all enemies in the front row.\nDeal <FORMULA> fire damage to each target.\nOn hit, target must [r]roll DC10 + <PlanarMod> ENDsave[/r] or get <DebuffBurn> {5}'2-3':'1-2'{/} stacks.\n{5}\nMay also strike one additional target from another row.{/}",
      th: "ปล่อยคลื่นเปลวไฟจากฝ่ามือ โอบล้อมศัตรูทั้งหมดในแถวหน้า\nสร้างความเสียหายไฟ <FORMULA> ต่อแต่ละเป้าหมาย\nเมื่อโดน เป้าหมายต้องทอย [r]ENDsave DC10 + <PlanarMod>[/r] หรือถูก <DebuffBurn> {5}'2-3':'1-2'{/} สแตค\n{5}\nอาจโจมตีเป้าหมายเพิ่มเติมอีกหนึ่งตัวจากแถวอื่น{/}",
    },
    formula: {
      en: "({5}'1d8':'1d6'{/} + <PlanarMod>) x <SkillLevelMultiplier>",
      th: "({5}'1d8':'1d6'{/} + <PlanarMod>) x <SkillLevelMultiplier>",
    },
  },
  requirement: {},
  equipmentNeeded: [],
  tier: TierEnum.uncommon,
  consume: {
    hp: 0,
    mp: 4,
    sp: 0,
    elements: [
      {
        element: "fire",
        value: 2,
      },
    ],
  },
  produce: {
    hp: 0,
    mp: 0,
    sp: 0,
    elements: [
      {
        element: "chaos",
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
    const targets = getTarget(actor, actorParty, targetParty, "enemy")
      .from("frontFirst")
      .all();

    if (!targets || targets.length === 0) {
      return {
        content: {
          en: `${actor.name.en} tried to cast Burning Hand but has no targets`,
          th: `${actor.name.th} พยายามใช้มือไฟแผดเผาแต่ไม่พบเป้าหมาย`,
        },
        actor: { actorId: actor.id, effect: [ActorEffect.TestSkill] },
        targets: [],
      };
    }

    // additional target if skill level is 5 or higher
    if (skillLevel >= 5) {
      const additionalTarget = getTarget(actor, actorParty, targetParty, "enemy").except(targets).one();
      if (additionalTarget) {
        targets.push(additionalTarget);
      }
    }
    // Attribute modifiers
    const planarMod = statMod(actor.attribute.getTotal("planar"));
    const controlMod = statMod(actor.attribute.getTotal("control"));
    const luckMod = statMod(actor.attribute.getTotal("luck"));

    // --- SHIFT CHECK ---
    const isShifted = skillLevel >= 5;
    const diceSides = isShifted ? 8 : 6;
    const burnDC = 10 + planarMod;
    const minBurnStacks = isShifted ? 2 : 1;
    const maxBurnStacks = isShifted ? 3 : 2;

    // Process all targets
    const targetEffects: { actorId: string; effect: TargetEffect[] }[] = [];
    let combinedMessage = "";

    const levelScalar = skillLevelMultiplier(skillLevel);
    for (const target of targets) {
      // Calculate base damage
      const baseDiceDamage = roll(1).d(diceSides).total;
      const totalDamage = Math.max(0, baseDiceDamage + planarMod) * levelScalar;

      // Hit and crit
      const hitBonus = controlMod;
      const critBonus = luckMod;

      const damageOutput = {
        damage: Math.floor(totalDamage),
        hit: rollTwenty().total + hitBonus,
        crit: rollTwenty().total + critBonus,
        type: DamageType.fire,
        isMagic: true,
      };

      const totalDamageResult = resolveDamage(actor.id, target.id, damageOutput, location);

      // Burn application roll (user rolls; lower DC = easier success)
      let burnMessage = "";
      if (totalDamageResult.isHit) {
        const burnSave = target.rollSave('endurance')
        if (burnSave < burnDC) {
          const burnStacks = roll(1).d(maxBurnStacks).total;
          const finalBurnStacks = Math.max(burnStacks, minBurnStacks);
          const burnResult = buffsAndDebuffsRepository.burn.appender(target, { turnsAppending: finalBurnStacks });
          burnMessage = burnResult.en;
        }
      }

      combinedMessage += buildCombatMessage(
        actor,
        target,
        { en: "Burning Hand", th: "มือไฟแผดเผา" },
        totalDamageResult,
      ).en + " " + burnMessage + " ";

      targetEffects.push({ actorId: target.id, effect: [TargetEffect.FireTwo] });
    }

    const turnResult: TurnResult = {
      content: {
        en: combinedMessage.trim(),
        th: `${actor.name.en} used Burning Hand on ${targets.length} targets`,
      },
      actor: { actorId: actor.id, effect: [ActorEffect.FireTwo] },
      targets: targetEffects,
    };

    return turnResult;
  },
});