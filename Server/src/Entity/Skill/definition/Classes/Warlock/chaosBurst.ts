import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { WarlockSkillId } from "../../../enums";
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
import { WarlockSkill } from "./index";
import { buffsAndDebuffsRepository } from "src/Entity/BuffsAndDebuffs/repository";

export const chaosBurst = new WarlockSkill({
  id: WarlockSkillId.ChaosBurst,
  name: {
    en: "Chaos Burst",
    th: "ระเบิดวินาศ",
  },
  description: {
    text: {
      en: "Release a burst of shadow energy that engulfs the enemy front line.\nDeal <FORMULA> arcane damage to all enemies in front row.\nEnemies must [r]roll DC10 + <PlanarMod> WILsave[/r] or gain <DebuffSlow> for 1 turn.\n{5}\nAlso apply <DebuffCursed> for 1 turn to enemies who fail save.{/}",
      th: "ปล่อยระเบิดพลังงานเงาที่กลืนกินแนวหน้าของศัตรู\nสร้างความเสียหาย arcane <FORMULA> ต่อศัตรูทั้งหมดในแถวหน้า\nศัตรูต้องทอย [r]WILsave DC10 + <PlanarMod>[/r] หรือได้รับ <DebuffSlow> 1 เทิร์น\n{5}\nยังเพิ่ม <DebuffCursed> 1 เทิร์นต่อศัตรูที่เซฟไม่สำเร็จด้วย{/}",
    },
    formula: {
      en: "(1d6 + <PlanarMod>) × <SkillLevelMultiplier>",
      th: "(1d6 + <PlanarMod>) × <SkillLevelMultiplier>",
    },
  },
  requirement: {},
  equipmentNeeded: [],
  tier: TierEnum.uncommon,
  isFallback: false, // ChaosBurst: consumes 1 chaos element
  consume: {
    hp: 0,
    mp: 4,
    sp: 0,
    elements: [
      {
        element: "chaos",
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
  ): TurnResult => {
    // Get all enemies in front row
    const frontRowEnemies = getTarget(actor, actorParty, targetParty, "enemy")
      .from("frontOnly")
      .all();

    if (frontRowEnemies.length === 0) {
      return {
        content: {
          en: `${actor.name.en} tried to use Chaos Burst but has no targets in the front row`,
          th: `${actor.name.th} พยายามใช้ระเบิดวินาศแต่ไม่พบเป้าหมายในแถวหน้า`,
        },
        actor: {
          actorId: actor.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    }

    const planarMod = statMod(actor.attribute.getTotal("planar"));
    const levelMultiplier = skillLevelMultiplier(skillLevel);
    const willpowerDC = 10 + planarMod;

    const targetEffects: { actorId: string; effect: TargetEffect[] }[] = [];
    const messages: string[] = [];
    let totalDamageDealt = 0;

    for (const target of frontRowEnemies) {
      // Calculate damage: 1d6 + planar mod × skill level multiplier arcane damage
      // Damage dice - should not get bless/curse
      const baseDiceDamage = actor.roll({ amount: 1, face: 6, stat: "planar", applyBlessCurse: false });
      const totalDamage = Math.max(0, Math.floor((baseDiceDamage + planarMod) * levelMultiplier));

      // Curse/chaos magic uses WIL for hit, LUCK for crit
      const damageOutput = {
        damage: totalDamage,
        hit: actor.rollTwenty({stat: 'willpower'}),
        crit: actor.rollTwenty({stat: 'luck'}),
        type: DamageType.arcane,
        isMagic: true,
      };

      const damageResult = resolveDamage(actor.id, target.id, damageOutput, location);
      totalDamageDealt += damageResult.actualDamage;

      const message = buildCombatMessage(
        actor,
        target,
        { en: "Chaos Burst", th: "ระเบิดวินาศ" },
        damageResult,
      );
      messages.push(message.en);

      // Save: DC10 + planar mod WIL save
      const willpowerSave = target.rollSave("willpower");
      let debuffMessage = "";

      if (willpowerSave < willpowerDC) {
        // Save failed: Apply Slow debuff for 1 turn
        buffsAndDebuffsRepository.slow.appender(target, { turnsAppending: 1 });
        debuffMessage = ` ${target.name.en} is slowed!`;

        // Level 5: Also apply Cursed debuff for 1 turn
        if (skillLevel >= 5) {
          buffsAndDebuffsRepository.cursed.appender(target, { turnsAppending: 1 });
          debuffMessage += ` ${target.name.en} is also cursed!`;
        }
      }

      if (debuffMessage) {
        messages[messages.length - 1] += debuffMessage;
      }

      targetEffects.push({
        actorId: target.id,
        effect: [TargetEffect.ChaosOne],
      });
    }

    return {
      content: {
        en: `${actor.name.en} releases a burst of chaos energy! ${messages.join(" ")} (${totalDamageDealt} total damage)`,
        th: `${actor.name.th} ปล่อยระเบิดพลังงานวินาศ! ${frontRowEnemies.length} เป้าหมายได้รับความเสียหายรวม ${totalDamageDealt}`,
      },
      actor: {
        actorId: actor.id,
        effect: [ActorEffect.Cast],
      },
      targets: targetEffects,
    };
  },
});

