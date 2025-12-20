import type { Character } from "src/Entity/Character/Character";
import { SeerSkill } from ".";
import { SeerSkillId } from "../../../enums";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import type { TurnResult } from "../../../types";
import { ActorEffect, TargetEffect } from "../../../effects";
import { buffsRepository } from "src/Entity/BuffsAndDebuffs/repository";
import { BuffEnum } from "src/Entity/BuffsAndDebuffs/enum";
import { getTarget } from "src/Entity/Battle/getTarget";
import { resolveDamage } from "src/Entity/Battle/damageResolution";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";
import { skillLevelMultiplier } from "src/Utils/skillScaling";

export const twistOutcome = new SeerSkill({
  id: SeerSkillId.TwistOutcome,
  name: {
    en: "Twist Outcome",
    th: "บิดผลลัพธ์",
  },
  description: {
    text: {
      en: "Twist the outcome by consuming your fortune stacks. Check Lucky and BadLuck stacks. Pick the one with most stacks (if equal, roll d20 > 10 = pick Lucky). If Lucky chosen, randomly heal one teammate with least HP percentage for (1d4 + Lucky stacks) × skill level multiplier. If BadLuck chosen, deal slash damage to one random enemy for (1d8 + BadLuck stacks) × skill level multiplier.{7} Use both buffs/debuffs together.{/}",
      th: "บิดผลลัพธ์โดยใช้สแต็กโชคชะตาของคุณ ตรวจสอบสแต็ก Lucky และ BadLuck เลือกอันที่มีสแต็กมากที่สุด (ถ้าเท่ากัน ทอย d20 > 10 = เลือก Lucky) หากเลือก Lucky รักษาพันธมิตรที่มีเปอร์เซ็นต์ HP น้อยที่สุดแบบสุ่ม (1d4 + สแต็ก Lucky) × คูณระดับทักษะ หากเลือก BadLuck สร้างความเสียหาย slash ให้ศัตรูแบบสุ่ม (1d8 + สแต็ก BadLuck) × คูณระดับทักษะ{7} ใช้ทั้งสองบัฟ/ดีบัฟพร้อมกัน{/}",
    },
  },
  requirement: {},
  equipmentNeeded: [],
  tier: TierEnum.rare,
  consume: {
    hp: 0,
    mp: 0,
    sp: 0,
    elements: [
      { element: "order", value: 1 },
      { element: "chaos", value: 1 },
    ],
  },
  produce: {
    hp: 0,
    mp: 0,
    sp: 0,
    elements: [
      { element: "neutral", min: 0, max: 1 },
    ],
  },
  exec: (
    user: Character,
    userParty: Character[],
    targetParty: Character[],
    skillLevel: number,
    location: LocationsEnum,
  ): TurnResult => {
    // Get Lucky and BadLuck stack counts
    const luckyEntry = user.buffsAndDebuffs.buffs.entry.get(BuffEnum.lucky);
    const badLuckEntry = user.buffsAndDebuffs.buffs.entry.get(BuffEnum.badLuck);
    
    const luckyStacks = luckyEntry?.value || 0;
    const badLuckStacks = badLuckEntry?.value || 0;

    // Check if we have any stacks at all
    if (luckyStacks === 0 && badLuckStacks === 0) {
      return {
        content: {
          en: `${user.name.en} tried to twist the outcome but has no fortune stacks!`,
          th: `${user.name.th} พยายามบิดผลลัพธ์แต่ไม่มีสแต็กโชคชะตา!`,
        },
        actor: {
          actorId: user.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    }

    const rolled = user.rollTwenty({});
    // At level 7: use both if both stacks exist
    // Otherwise: pick the one with more stacks, or use tiebreaker (rolled > 10 = pick Lucky)
    const useBoth = skillLevel >= 7 && luckyStacks > 0 && badLuckStacks > 0;
    let useLc = false;
    let useBl = false;

    if (useBoth) {
      useLc = true;
      useBl = true;
    } else {
      if (luckyStacks > badLuckStacks) {
        useLc = true;
      } else if (badLuckStacks > luckyStacks) {
        useBl = true;
      } else if (luckyStacks === badLuckStacks && luckyStacks > 0) {
        // Equal stacks: rolled > 10 = pick Lucky
        if (rolled > 10) {
          useLc = true;
        } else {
          useBl = true;
        }
      }
    }

    // Only use if stacks exist
    useLc = useLc && luckyStacks > 0;
    useBl = useBl && badLuckStacks > 0;

    
    function heal() {
      const levelScalar = skillLevelMultiplier(skillLevel);
      const healAmount = Math.floor((user.roll({ amount: 1, face: 4, stat: 'luck' }) + luckyStacks) * levelScalar);
      const healTarget = getTarget(user, userParty, targetParty, "ally")
        .with("least", "currentHPPercentage")
        .one();
    
      let healMessageEn = "";
      let healMessageTh = "";

      if (healTarget) {
        const beforeHp = healTarget.vitals.hp.current;
        healTarget.vitals.incHp(healAmount);
        const actualHeal = healTarget.vitals.hp.current - beforeHp;
        healMessageEn = `${healTarget.name.en} healed for ${actualHeal} HP`;
        healMessageTh = `${healTarget.name.th} ถูกรักษา ${actualHeal} HP`;
      }
  
      return { healMessageEn, healMessageTh, healTarget };
    }

    function damage() {
      const levelScalar = skillLevelMultiplier(skillLevel);
      const damageAmount = Math.floor((user.roll({ amount: 1, face: 8, stat: 'luck' }) + badLuckStacks) * levelScalar);
      const damageTarget = getTarget(user, userParty, targetParty, "enemy").one();
      
      let damageMessageEn = "";
      let damageMessageTh = "";
      if (damageTarget) {
        const damageOutput = {
          damage: damageAmount,
          hit: user.rollTwenty({}),
          crit: user.rollTwenty({}),
          type: DamageType.slash,
          isMagic: false,
        };
        resolveDamage(user.id, damageTarget.id, damageOutput, location);
        damageMessageEn = `dealt ${damageAmount} slash damage to ${damageTarget.name.en}`;
        damageMessageTh = `สร้างความเสียหาย slash ${damageAmount} ให้${damageTarget.name.th}`;
      }
      return { damageMessageEn, damageMessageTh, damageTarget };
    }

    const targetEffects: { actorId: string; effect: TargetEffect[] }[] = [];
    let contentEn = "";
    let contentTh = "";

    // Execute effects based on flags
    if (useLc) {
      const { healMessageEn, healMessageTh, healTarget } = heal();
      if (healTarget) {
        contentEn += healMessageEn;
        contentTh += healMessageTh;
        targetEffects.push({ actorId: healTarget.id, effect: [TargetEffect.TestSkill] });
      } else {
        return {
          content: {
            en: `${user.name.en} tried to heal but has no valid target!`,
            th: `${user.name.th} พยายามรักษาแต่ไม่พบเป้าหมาย!`,
          },
          actor: {
            actorId: user.id,
            effect: [ActorEffect.TestSkill],
          },
          targets: [],
        };
      }
    }
    if (useBl) {
      const { damageMessageEn, damageMessageTh, damageTarget } = damage();
      if (damageTarget) {
        if (contentEn) {
          contentEn += " and ";
          contentTh += " และ ";
        }
        contentEn += damageMessageEn;
        contentTh += damageMessageTh;
        targetEffects.push({ actorId: damageTarget.id, effect: [TargetEffect.TestSkill] });
      } else {
        return {
          content: {
            en: `${user.name.en} tried to damage but has no valid target!`,
            th: `${user.name.th} พยายามโจมตีแต่ไม่พบเป้าหมาย!`,
          },
          actor: {
            actorId: user.id,
            effect: [ActorEffect.TestSkill],
          },
          targets: [],
        };
      }
    }

    // Consume stacks after use
    if (useLc && luckyEntry) {
      luckyEntry.value = 0;
      if (luckyEntry.value === 0 && luckyEntry.counter === 0) {
        user.buffsAndDebuffs.buffs.entry.delete(BuffEnum.lucky);
      }
    }
    if (useBl && badLuckEntry) {
      badLuckEntry.value = 0;
      if (badLuckEntry.value === 0 && badLuckEntry.counter === 0) {
        user.buffsAndDebuffs.buffs.entry.delete(BuffEnum.badLuck);
      }
    }

    // Build final message
    let finalMessageEn = "";
    let finalMessageTh = "";
    if (useBoth) {
      finalMessageEn = `${user.name.en} twisted the outcome with both fortune and misfortune! ${contentEn}!`;
      finalMessageTh = `${user.name.th} บิดผลลัพธ์ด้วยโชคดีและโชคร้าย! ${contentTh}!`;
    } else if (useLc) {
      finalMessageEn = `${user.name.en} twisted fate with ${luckyStacks} Lucky stacks! ${contentEn}!`;
      finalMessageTh = `${user.name.th} บิดชะตากรรมด้วย ${luckyStacks} สแต็ก Lucky! ${contentTh}!`;
    } else if (useBl) {
      finalMessageEn = `${user.name.en} twisted fate with ${badLuckStacks} BadLuck stacks! ${contentEn}!`;
      finalMessageTh = `${user.name.th} บิดชะตากรรมด้วย ${badLuckStacks} สแต็ก BadLuck! ${contentTh}!`;
    }

    return {
      content: {
        en: finalMessageEn,
        th: finalMessageTh,
      },
      actor: {
        actorId: user.id,
        effect: [ActorEffect.Cast],
      },
      targets: targetEffects,
    };
  },
});
