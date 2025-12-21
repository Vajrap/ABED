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
import { debuffsRepository } from "src/Entity/BuffsAndDebuffs/repository";

export const fragmentationGrenade = new EngineerSkill({
  id: EngineerSkillId.FragmentationGrenade,
  name: {
    en: "Fragmentation Grenade",
    th: "ระเบิดสะเก็ด",
  },
  description: {
    text: {
      en: "Throw a fragmentation grenade at the enemy front line. Deal <FORMULA> fire damage to all enemies in front row. Enemies must roll DC10 + DEX mod END save or gain Bleed debuff for 2 turns (1d3 damage per turn). At level 5, also apply Slow debuff for 1 turn to enemies who fail save.",
      th: "โยนระเบิดสะเก็ดไปที่แถวหน้าศัตรู. สร้างความเสียหายไฟ <FORMULA> แก่ศัตรูทั้งหมดในแถวหน้า. ศัตรูต้องทอย DC10 + DEX mod END save หรือถูก Bleed 2 เทิร์น (1d3 ความเสียหายต่อเทิร์น). ที่ระดับ 5, ยังทำให้ Slow 1 เทิร์นแก่ศัตรูที่ต้านทานไม่ได้ด้วย",
    },
    formula: {
      en: "(1d6 + <DEXmod>) × <SkillLevelMultiplier>",
      th: "(1d6 + <DEXmod>) × <SkillLevelMultiplier>",
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
      { element: "fire", value: 1 },
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
    // Get all enemies in front row
    const enemies = getTarget(actor, actorParty, targetParty, "enemy")
      .from("frontOnly")
      .all();

    if (enemies.length === 0) {
      return {
        content: {
          en: `${actor.name.en} tried to use Fragmentation Grenade but has no targets in front row`,
          th: `${actor.name.th} พยายามใช้ระเบิดสะเก็ดแต่ไม่พบเป้าหมายในแถวหน้า`,
        },
        actor: {
          actorId: actor.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    }

    const dexMod = statMod(actor.attribute.getTotal("dexterity"));
    const levelMultiplier = skillLevelMultiplier(skillLevel);
    const saveDC = 10 + dexMod;

    // Calculate base damage: (1d6 + DEX mod) × skill level multiplier
    const diceDamage = actor.roll({ amount: 1, face: 6, applyBlessCurse: false });
    const damageAmount = Math.floor((diceDamage + dexMod) * levelMultiplier);

    const targetEffects: { actorId: string; effect: TargetEffect[] }[] = [];
    const messages: string[] = [];

    for (const enemy of enemies) {
      const damageOutput = {
        damage: damageAmount,
        hit: 999, // Auto-hit AOE
        crit: 0,
        type: DamageType.fire,
        isMagic: true,
      };

      const damageResult = resolveDamage(actor.id, enemy.id, damageOutput, location);

      const message = buildCombatMessage(
        actor,
        enemy,
        { en: "Fragmentation Grenade", th: "ระเบิดสะเก็ด" },
        damageResult,
      );
      messages.push(message.en);

      // Save check: DC10 + DEX mod END save
      const saveRoll = enemy.rollSave("endurance");
      if (saveRoll < saveDC) {
        // Apply Bleed debuff for 2 turns
        debuffsRepository.bleed.appender(enemy, { turnsAppending: 2 });
        
        // Level 5: Also apply Slow debuff for 1 turn
        if (skillLevel >= 5) {
          debuffsRepository.slow.appender(enemy, { turnsAppending: 1 });
          messages.push(`${enemy.name.en} failed the save and is bleeding and slowed!`);
        } else {
          messages.push(`${enemy.name.en} failed the save and is bleeding!`);
        }
      }

      targetEffects.push({
        actorId: enemy.id,
        effect: [TargetEffect.TestSkill],
      });
    }

    return {
      content: {
        en: messages.join(" "),
        th: messages.join(" "),
      },
      actor: {
        actorId: actor.id,
        effect: [ActorEffect.Cast],
      },
      targets: targetEffects,
    };
  },
  isFallback: false,
});

