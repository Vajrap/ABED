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
import { roll, rollTwenty } from "src/Utils/Dice";
import { skillLevelMultiplier } from "src/Utils/skillScaling";

export const planarEcho = new SeerSkill({
  id: SeerSkillId.PlanarEcho,
  name: {
    en: "Planar Echo",
    th: "การสะท้อนพลังระนาบ",
  },
  description: {
    text: {
      en: "Echo the planar energy around, dealing <FORMULA> arcane damage to a target. If hit, the target must roll DC10 LUKsave or decrease AB gauge by 10.",
      th: "คาดการณ์อนาคต, ได้รับพระการันตี Precognition ของ 1 รอบ: การคาดการณ์: ศัตรูต� procon",
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
    const diceDamage = roll(1).d(6).total;
    const multiplier = skillLevelMultiplier(skillLevel);
    const totalDamage = Math.floor(diceDamage + (chaMod * multiplier));
    
    // Calculate hit/crit
    const hitRoll = rollTwenty().total;
    const critRoll = rollTwenty().total;
    
    const damageOutput = {
      damage: totalDamage,
      hit: hitRoll,
      crit: critRoll,
      type: DamageType.arcane,
      isMagic: true,
    };
    
    const damageResult = resolveDamage(user.id, target.id, damageOutput, location);
    
    // If hit, target must roll DC10 LUK save or decrease AB gauge by 10
    let abGaugeReduced = 0;
    if (damageResult.isHit) {
      const saveRoll = target.rollSave("luck");
      const dc = 10;
      
      if (saveRoll < dc) {
        // Save failed: reduce AB gauge by 10
        const initialGauge = target.abGauge;
        target.abGauge = Math.max(0, target.abGauge - 10);
        abGaugeReduced = initialGauge - target.abGauge;
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