import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { InquisitorSkillId } from "../../../enums";
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
import { InquisitorSkill } from "./index";

export const purgeMagic = new InquisitorSkill({
  id: InquisitorSkillId.PurgeMagic,
  name: {
    en: "Purge Magic",
    th: "ล้างเวทมนตร์",
  },
  description: {
    text: {
      en: "Unleash purifying flames that strip away all magical enhancements, the stronger the magic, the greater the backlash.\nDeal <FORMULA> [r]true holy damage[/r] that bypasses all defenses.\nRemoves {5}'2':'1'{/} random buff(s) from the target.\n{5}\nDeals [r]+2 additional damage[/r].{/}",
      th: "ปล่อยเปลวไฟชำระล้างที่ลบการเสริมเวทมนตร์ทั้งหมด ยิ่งเวทมนตร์แข็งแกร่ง ยิ่งได้รับผลกระทบมากขึ้น\nสร้างความเสียหายศักดิ์สิทธิ์แท้ <FORMULA> [r]ที่ผ่านการป้องกันทั้งหมด[/r]\nลบบัฟแบบสุ่ม {5}'2':'1'{/} ตัวจากเป้าหมาย\n{5}\nสร้างความเสียหาย [r]เพิ่ม +2[/r]{/}",
    },
    formula: {
      en: "1d4 + target's PlanarMod + number of target's buffs {5} + 2{/}",
      th: "1d4 + PlanarMod ของเป้าหมาย + จำนวนบัฟของเป้าหมาย {5} + 2{/}",
    },
  },
  requirement: {},
  equipmentNeeded: [],
  tier: TierEnum.uncommon,
  isFallback: false, // PurgeMagic: consumes 1 fire element
  consume: {
    hp: 0,
    mp: 3,
    sp: 0,
    elements: [
      {
        element: "fire",
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
        element: "order",
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
    const target = getTarget(actor, actorParty, targetParty, "enemy").one();

    if (!target) {
      return {
        content: {
          en: `${actor.name.en} tried to cast Purge Magic but has no target`,
          th: `${actor.name.th} พยายามใช้ล้างเวทมนตร์แต่ไม่พบเป้าหมาย`,
        },
        actor: {
          actorId: actor.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    }

    // Check save first (enum says DC10 + CONTROL mod WIL save)
    const controlMod = statMod(actor.attribute.getTotal("control"));
    const willpowerDC = 10 + controlMod;
    const willpowerSave = target.rollSave("willpower");
    
    // Calculate damage: (1d4 + WIL mod) × skill level multiplier
    const levelMultiplier = skillLevelMultiplier(skillLevel);
    // Damage dice - should not get bless/curse (stat modifier already included in roll)
    const baseDamage = actor.roll({ amount: 1, face: 4, stat: "willpower", applyBlessCurse: false });
    let damage = Math.max(0, Math.floor(baseDamage * levelMultiplier));
    
    // Remove random buff(s) if save failed
    let numBuffsToRemove = 0;
    const buffsRemoved: string[] = [];
    
    if (willpowerSave < willpowerDC) {
      // Save failed: Remove 1-2 random buffs
      numBuffsToRemove = skillLevel >= 5 ? 2 : actor.roll({ amount: 1, face: 2, applyBlessCurse: false });
      const buffEntries = Array.from(target.buffsAndDebuffs.buffs.entry.entries());
      
      // Randomly select buffs to remove (use actor.roll for consistency)
      const shuffledBuffs = [...buffEntries].sort(() => Math.random() - 0.5);
      const buffsToRemove = shuffledBuffs.slice(0, Math.min(numBuffsToRemove, buffEntries.length));
      
      for (const [buffId] of buffsToRemove) {
        target.buffsAndDebuffs.buffs.entry.delete(buffId);
        buffsRemoved.push(buffId);
      }
    } else {
      // Save passed: Deal half damage
      damage = Math.floor(damage / 2);
    }

    // Divine/holy magic uses WIL for hit, LUCK for crit (even for true damage)
    const damageOutput = {
      damage,
      hit: actor.rollTwenty({stat: 'willpower'}),
      crit: actor.rollTwenty({stat: 'luck'}),
      type: DamageType.radiance,
      isMagic: true,
      trueDamage: true, // TRUE DAMAGE - bypasses all mitigation
    };

    const damageResult = resolveDamage(actor.id, target.id, damageOutput, location);

    const message = buildCombatMessage(
      actor,
      target,
      { en: "Purge Magic", th: "ล้างเวทมนตร์" },
      damageResult,
    );

    const buffsRemovedMessage = buffsRemoved.length > 0 
      ? ` ${buffsRemoved.length} buff(s) removed!`
      : " (no buffs to remove)";

    return {
      content: {
        en: `${message.en}${buffsRemovedMessage}`,
        th: `${message.th}${buffsRemoved.length > 0 ? ` ลบบัฟ ${buffsRemoved.length} ตัว!` : " (ไม่มีบัฟให้ลบ)"}`,
      },
      actor: {
        actorId: actor.id,
        effect: [ActorEffect.Cast],
      },
      targets: [
        {
          actorId: target.id,
          effect: [TargetEffect.TestSkill],
        },
      ],
    };
  },
});

