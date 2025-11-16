import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { MageSkillId } from "../../../enums";
import { Skill } from "../../../Skill";
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

export const burningHand = new Skill({
  id: MageSkillId.BurningHand,
  name: {
    en: "Burning Hand",
    th: "มือไฟแผดเผา",
  },
  description: {
    en: "Project waves of searing flame from your hand, engulfing all enemies in the front most row. Deals 1d6 (1d8 at Skill Level 5) + Planar modifier + 0.5× Skill Level as Fire damage. On hit, roll DC 13 to apply 1–2 Burn stacks to each enemy. When skill reaches level 5, the damage increases to 1d8 and the DC decreases to 10 with small possibility to deal damage to one more target from another row if the attack lands on the front row.",
    th: "ปล่อยคลื่นเปลวไฟจากฝ่ามือ โอบล้อมศัตรูทั้งหมดในแถวหน้าสุด สร้างความเสียหาย 1d6 (1d8 ที่เลเวล 5) + ค่าพลังเวท (Planar) + 0.5×เลเวลสกิล เป็นความเสียหายประเภทไฟ หลังโจมตีโดน ทอย DC 13 เพื่อติดสถานะเผาไหม้ (1–2 สแตค) แก่ศัตรูแต่ละตัว. เมื่อเลเวลสกิลถึง 5 ความเสียหายเพิ่มเป็น 1d8 และ DC ลดลงเป็น 10 มีโอกาสเล็กน้อยที่จะสร้างความเสียหายให้ศัตรูอีกหนึ่งตัวจากแถวอื่น ถ้าการโจมตีสำเร็จบนแถวหน้า",
  },
  requirement: {},
  equipmentNeeded: [],
  tier: TierEnum.uncommon,
  consume: {
    hp: 0,
    mp: 3,
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
    location: LocationsEnum,
  ) => {
    const targets = getTarget(actor, targetParty)
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
      const additionalTarget = getTarget(actor, targetParty).except(targets).one();
      if (additionalTarget) {
        targets.push(additionalTarget);
      }
    }

    // --- SHIFT CHECK ---
    const isShifted = skillLevel >= 5;
    const diceSides = isShifted ? 8 : 6;
    const burnDC = isShifted ? 11 : 13;
    const minBurnStacks = isShifted ? 2 : 1;
    const maxBurnStacks = isShifted ? 3 : 2;

    // Attribute modifiers
    const planarMod = statMod(actor.attribute.getTotal("planar"));
    const controlMod = statMod(actor.attribute.getTotal("control"));
    const luckMod = statMod(actor.attribute.getTotal("luck"));

    // Process all targets
    const targetEffects: { actorId: string; effect: TargetEffect[] }[] = [];
    let combinedMessage = "";

    for (const target of targets) {
      // Calculate base damage
      const baseDiceDamage = roll(diceSides).d(1).total;
      const skillLevelBonus = 0.5 * skillLevel;
      const totalDamage = Math.max(0, baseDiceDamage + planarMod + skillLevelBonus);

      // Hit and crit
      const hitBonus = controlMod;
      const critBonus = luckMod;

      const damageOutput = {
        damage: Math.floor(totalDamage),
        hit: rollTwenty().total + hitBonus,
        crit: rollTwenty().total + critBonus,
        type: DamageType.fire,
      };

      const totalDamageResult = resolveDamage(actor.id, target.id, damageOutput, location);

      // Burn application roll (user rolls; lower DC = easier success)
      let burnMessage = "";
      if (totalDamageResult.isHit) {
        const burnRoll = rollTwenty().total;
        if (burnRoll >= burnDC) {
          const burnStacks = roll(maxBurnStacks).d(1).total;
          const finalBurnStacks = Math.max(burnStacks, minBurnStacks);
          // Actually apply the burn debuff
          const burnResult = buffsAndDebuffsRepository.burn.appender(target, finalBurnStacks, false, 0);
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