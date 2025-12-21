import type { Character } from "src/Entity/Character/Character";
import { SeerSkill } from ".";
import { SeerSkillId } from "../../../enums";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import type { TurnResult } from "../../../types";
import { getTarget } from "src/Entity/Battle/getTarget";
import { ActorEffect, TargetEffect } from "../../../effects";
import { resolveDamage } from "src/Entity/Battle/damageResolution";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";
import { statMod } from "src/Utils/statMod";
import { buildCombatMessage } from "src/Utils/buildCombatMessage";
import { skillLevelMultiplier } from "src/Utils/skillScaling";
import { buffsRepository } from "src/Entity/BuffsAndDebuffs/repository";
import { BuffEnum } from "src/Entity/BuffsAndDebuffs/enum";

export const planarEcho = new SeerSkill({
  id: SeerSkillId.PlanarEcho,
  name: {
    en: "Planar Echo",
    th: "การสะท้อนพลังระนาบ",
  },
  description: {
    text: {
      en: "Echo the planar energy around, dealing <FORMULA> arcane damage to a target. If hit, the target must roll DC10 LUK save or decrease AB gauge by 10. On save failed, gain 1 Lucky stack. On save success, gain 1 BadLuck stack.",
      th: "สะท้อนพลังระนาบ สร้างความเสียหายอาร์เคน <FORMULA> ให้เป้าหมาย หากถูกโจมตี เป้าหมายต้องทอย DC10 LUK save หรือลด AB gauge ลง 10 หากเซฟล้มเหลว ได้รับ 1 Lucky หากเซฟสำเร็จ ได้รับ 1 BadLuck",
    },
    formula: {
      en: "1d6 + <CHAmod> * (1 + 0.1 * skill level)",
      th: "1d6 + <CHAmod> * (1 + 0.1 * เลเวลสกิล)",
    },
  },
  requirement: {},
  equipmentNeeded: [],
  tier: TierEnum.common,
  consume: {
    hp: 0,
    mp: 3,
    sp: 0,
    elements: [],
  },
  produce: {
    hp: 0,
    mp: 0,
    sp: 0,
    elements: [
        {element: 'wind', min: 1, max: 1},
    ],
  },
  exec: (user: Character, userParty: Character[], targetParty: Character[], skillLevel: number, location: LocationsEnum): TurnResult => {
    const target = getTarget(user, userParty, targetParty, "enemy").one();
    
    if (!target) {
      return {
        content: {
          en: `${user.name.en} tried to echo planar energy but has no target`,
          th: `${user.name.th} พยายามสะท้อนพลังระนาบแต่ไม่พบเป้าหมาย`,
        },
        actor: {
          actorId: user.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    }
    
    // Calculate damage: 1d6 + CHA mod * (1 + 0.1 * skill level)
    const chaMod = statMod(user.attribute.getTotal("charisma"));
    // Damage dice - should not get bless/curse
    const diceDamage = user.roll({ amount: 1, face: 6, stat: "charisma", applyBlessCurse: false });
    const multiplier = skillLevelMultiplier(skillLevel);
    const totalDamage = Math.floor(diceDamage + (chaMod * multiplier));
    
    // Arcane magic uses CONTROL for hit, LUCK for crit
    const hitRoll = user.rollTwenty({stat: 'control'});
    const critRoll = user.rollTwenty({stat: 'luck'});
    
    const damageOutput = {
      damage: totalDamage,
      hit: hitRoll,
      crit: critRoll,
      type: DamageType.arcane,
      isMagic: true,
    };
    
    const damageResult = resolveDamage(user.id, target.id, damageOutput, location);
    
    // If hit, target must roll DC10 LUK save or decrease AB gauge by 10
    // If save failed, gain 1 Lucky stack to self else gain 1 BadLuck stack to self
    let abGaugeReduced = 0;
    if (damageResult.isHit) {
      const saveRoll = target.rollSave("luck");
      const dc = 10;
      
      if (saveRoll < dc) {
        // Save failed: reduce AB gauge by 10
        const initialGauge = target.abGauge;
        target.abGauge = Math.max(0, target.abGauge - 10);
        abGaugeReduced = initialGauge - target.abGauge;
        
        // Gain 1 Lucky stack to self
        buffsRepository[BuffEnum.lucky].appender(user, { turnsAppending: 1 });
      } else {
        buffsRepository[BuffEnum.badLuck].appender(user, { turnsAppending: 1 });
      }
    }
    
    let message = buildCombatMessage(
      user,
      target,
      {
        en: "Planar Echo",
        th: "การสะท้อนพลังระนาบ",
      },
      damageResult,
    );
    
    if (abGaugeReduced > 0) {
      message = {
        en: `${message.en} ${target.name.en}'s AB gauge reduced by ${abGaugeReduced}!`,
        th: `${message.th} ${target.name.th} AB gauge ลดลง ${abGaugeReduced}!`,
      };
    }
    
    return {
      content: message,
      actor: {
        actorId: user.id,
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