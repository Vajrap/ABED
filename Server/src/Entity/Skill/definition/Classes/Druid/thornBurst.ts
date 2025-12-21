import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { DruidSkillId } from "../../../enums";
import type { Character } from "src/Entity/Character/Character";
import type { TurnResult } from "../../../types";
import { getTarget } from "src/Entity/Battle/getTarget";
import { ActorEffect, TargetEffect } from "../../../effects";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { resolveDamage } from "src/Entity/Battle/damageResolution";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";
import { statMod } from "src/Utils/statMod";
import { buildCombatMessage } from "src/Utils/buildCombatMessage";
import { skillLevelMultiplier } from "src/Utils/skillScaling";
import { DruidSkill } from "./index";
import { buffsAndDebuffsRepository } from "src/Entity/BuffsAndDebuffs/repository";

export const thornBurst = new DruidSkill({
  id: DruidSkillId.ThornBurst,
  name: {
    en: "Thorn Burst",
    th: "ระเบิดหนาม",
  },
  description: {
    text: {
      en: "Release a burst of thorns that cuts through the enemy front line.\nDeal <FORMULA> nature damage to all enemies in front row.\nEnemies must [r]roll DC10 + <WILmod> ENDsave[/r] or gain <DebuffBleed> for 2 turns.\n{5}Also apply <DebuffSlow> for 1 turn to enemies who fail save.{/}",
      th: "ปล่อยระเบิดหนามที่ตัดผ่านแนวหน้าศัตรู\nสร้างความเสียหายธรรมชาติ <FORMULA> ให้ศัตรูทั้งหมดในแถวหน้า\nศัตรูต้องทอย [r]ENDsave DC10 + <WILmod>[/r] หรือได้รับ <DebuffBleed> 2 เทิร์น\n{5}ยังเพิ่ม <DebuffSlow> 1 เทิร์นให้ศัตรูที่เซฟล้มเหลว{/}",
    },
    formula: {
      en: "(1d6 + <WILmod>) × <SkillLevelMultiplier>",
      th: "(1d6 + <WILmod>) × <SkillLevelMultiplier>",
    },
  },
  requirement: {},
  equipmentNeeded: [],
  tier: TierEnum.uncommon,
  isFallback: false, // Thorn Burst: consumes 1 earth element
  consume: {
    hp: 0,
    mp: 3,
    sp: 0,
    elements: [
      {
        element: "earth",
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
        element: "water",
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
  ): TurnResult => {
    // Get all enemies in front row
    const targets = getTarget(actor, actorParty, targetParty, "enemy")
      .from("frontOnly")
      .all();

    if (targets.length === 0) {
      return {
        content: {
          en: `${actor.name.en} tried to use Thorn Burst but has no targets`,
          th: `${actor.name.th} พยายามใช้ระเบิดหนามแต่ไม่พบเป้าหมาย`,
        },
        actor: {
          actorId: actor.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    }

    const willMod = statMod(actor.attribute.getTotal("willpower"));
    const levelScalar = skillLevelMultiplier(skillLevel);
    // Damage dice - should not get bless/curse
    const baseDamage = actor.roll({ amount: 1, face: 6, stat: "willpower", applyBlessCurse: false }) + willMod;
    const totalDamage = Math.floor(baseDamage * levelScalar);

    // Nature magic uses CONTROL for hit, LUCK for crit
    const damageOutput = {
      damage: totalDamage,
      hit: actor.rollTwenty({stat: 'control'}),
      crit: actor.rollTwenty({stat: 'luck'}),
      type: DamageType.nature,
      isMagic: true,
    };

    const targetEffects: { actorId: string; effect: TargetEffect[] }[] = [];
    let combinedMessage = "";

    const saveDC = 10 + willMod;

    for (const target of targets) {
      const damageResult = resolveDamage(actor.id, target.id, damageOutput, location);
      const message = buildCombatMessage(actor, target, { en: "Thorn Burst", th: "ระเบิดหนาม" }, damageResult);
      combinedMessage += message.en + " ";

      // Check for bleed application (DC10 + WIL mod endurance save)
      if (damageResult.isHit) {
        const saveRoll = target.rollSave("endurance");
        if (saveRoll < saveDC) {
          // Apply bleed for 2 turns
          buffsAndDebuffsRepository.bleed.appender(target, { turnsAppending: 2 });
          combinedMessage += `${target.name.en} is bleeding! `;

          // Level 5: Also apply Slow for 1 turn
          if (skillLevel >= 5) {
            buffsAndDebuffsRepository.slow.appender(target, { turnsAppending: 1 });
            combinedMessage += `${target.name.en} is slowed! `;
          }
        }
      }

      targetEffects.push({
        actorId: target.id,
        effect: [TargetEffect.TestSkill],
      });
    }

    return {
      content: {
        en: combinedMessage.trim(),
        th: `${actor.name.th} ใช้ระเบิดหนามกับ ${targets.length} เป้าหมาย`,
      },
      actor: {
        actorId: actor.id,
        effect: [ActorEffect.Cast],
      },
      targets: targetEffects,
    };
  },
});

