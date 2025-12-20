import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { ShamanSkillId } from "../../../enums";
import type { Character } from "src/Entity/Character/Character";
import { ActorEffect, TargetEffect } from "../../../effects";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { resolveDamage } from "src/Entity/Battle/damageResolution";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";
import { statMod } from "src/Utils/statMod";
import { buildCombatMessage } from "src/Utils/buildCombatMessage";
import { roll, rollTwenty } from "src/Utils/Dice";
import { ShamanSkill } from "./index";
import { skillLevelMultiplier } from "src/Utils/skillScaling";

export const chaoticBlessing = new ShamanSkill({
  id: ShamanSkillId.ChaoticBlessing,
  name: {
    en: "Chaotic Blessing",
    th: "พรแห่งความยุ่งเหยิง",
  },
  description: {
    text: {
      en: "Channel the chaotic forces of the planes, unleashing unpredictable energy.\n50% chance to deal <FORMULA> chaos damage to all enemies, or heal all allies for <FORMULA> HP.\n{5}\nHealed allies [r]roll DC10 WILsave[/r], if passed, [b]give self +1 chaos[/b].\nDamaged enemies [r]roll DC10 WILsave[/r], if failed, [r]lose 1 random resource[/r].{/}",
      th: "ควบคุมพลังแห่งระนาบที่ยุ่งเหยิง ปลดปล่อยพลังงานที่คาดเดาไม่ได้\n50% โอกาสสร้างความเสียหาย chaos <FORMULA> ให้ศัตรูทั้งหมด หรือรักษาพันธมิตรทั้งหมด <FORMULA> HP\n{5}\nพันธมิตรที่ได้รับการรักษา: ทอย [r]WILsave DC10[/r] หากสำเร็จ [b]ได้รับ +1 chaos[/b]\nศัตรูที่ถูกโจมตี: ทอย [r]WILsave DC10[/r] หากล้มเหลว [r]สูญเสียทรัพยากรแบบสุ่ม 1 หน่วย[/r]{/}",
    },
    formula: {
      en: "{5}'1d8':'1d6'{/} + ((<WILmod> + <PlanarMod>) / 2) × <SkillLevelMultiplier>",
      th: "{5}'1d8':'1d6'{/} + ((<WILmod> + <PlanarMod>) / 2) × <SkillLevelMultiplier>",
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
      { element: "chaos", value: 1 },
      { element: "order", value: 1 },
    ],
  },
  produce: {
    hp: 0,
    mp: 0,
    sp: 0,
    elements: [
      {
        element: "neutral",
        min: 0,
        max: 2,
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
    // 50/50 chance to damage or heal
    const isDamage = rollTwenty().total <= 10;
    
    const additionalDamage =
      (statMod(actor.attribute.getTotal("planar")) +
        statMod(actor.attribute.getTotal("willpower"))) /
      2;
    const levelScalar = skillLevelMultiplier(skillLevel);
    
    let messages: string[] = [];

    if (isDamage) {
      for (const target of targetParty) {
        const total =
          roll(1).d(skillLevel >= 5 ? 8 : 6).total +
          additionalDamage * levelScalar;
        const damageOutput = {
          damage: Math.floor(total),
          hit: 999,
          crit: 0,
          type: DamageType.chaos,
          isMagic: true,
        };
        
        const damageResult = resolveDamage(actor.id, target.id, damageOutput, location);
        const msg = buildCombatMessage(actor, target, { en: "Chaotic Blessing", th: "พรแห่งความยุ่งเหยิง" }, damageResult);
        
        // Level 5: Damaged enemies roll DC10 WIL save, if failed lose 1 random resource
        if (skillLevel >= 5 && damageResult.isHit) {
          const saveResult = target.rollSave("willpower");
          if (saveResult < 10) {
            // Save failed - lose 1 random resource
            const resourceKeys = Object.keys(target.resources) as Array<keyof typeof target.resources>;
            const nonZeroResources = resourceKeys.filter(key => target.resources[key] > 0);
            if (nonZeroResources.length > 0) {
              const resource = nonZeroResources[Math.floor(Math.random() * nonZeroResources.length)]!;
              target.resources[resource] -= 1;
              msg.en += ` ${target.name.en} lost 1 ${resource}!`;
              msg.th += ` ${target.name.th} สูญเสีย 1 ${resource}!`;
            }
          }
        }
        messages.push(msg.en);
      }
    } else {
      // Heal whole team
      for (const ally of actorParty) {
        if (!ally.vitals.isDead) {
          const total =
            roll(1).d(skillLevel >= 5 ? 8 : 6).total +
            additionalDamage * levelScalar;
          ally.vitals.incHp(Math.floor(total));
          let msg = `${ally.name.en} healed for ${Math.floor(total)} HP!`;
          
          // Level 5: Healed allies roll DC10 WIL save, if passed gain +1 chaos
          if (skillLevel >= 5) {
            const saveResult = ally.rollSave("willpower");
            if (saveResult >= 10) {
              // Save passed - gain +1 chaos
              actor.resources.chaos += 1;
              msg += ` ${actor.name.en} gained 1 Chaos!`;
            }
          }
          messages.push(msg);
        }
      }
    }

    return {
      content: {
        en: `${actor.name.en} used Chaotic Blessing! ${messages.join(" ")}`,
        th: `${actor.name.th} ใช้พรแห่งความยุ่งเหยิง!`,
      },
      actor: {
        actorId: actor.id,
        effect: [ActorEffect.Cast],
      },
      targets: [...targetParty, ...actorParty].map(char => ({
        actorId: char.id,
        effect: [TargetEffect.ChaosTwo, TargetEffect.OrderTwo],
      })),
    };
  },
});

