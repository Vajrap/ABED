import type { Character } from "src/Entity/Character/Character";
import { SeerSkill } from ".";
import { SeerSkillId } from "../../../enums";
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
import type { ElementResourceKey } from "src/InterFacesEnumsAndTypes/Enums";

export const threadSnip = new SeerSkill({
  id: SeerSkillId.ThreadSnip,
  name: {
    en: "Thread Snip",
    th: "ตัดลวดระนาบ",
  },
  description: {
    text: {
      en: "Look into the planar thread and pulled it away from an enemy: Deal <FORMULA> to an enemy, roll DC14 (-1 per skill level) dice. If passed, randomly steal 1 element from the enemy",
      th: "มองไปยังสายใยพลังพลานาบของศัตรู และตัดมันออก: สร้างความเสียหาย <FORMULA> ให้ศัตรู, ทอยลูกเต๋า D14 (-1 ต่อเลเวลสกิล). หากสำเร็จ, สุ่มคัดลอกธาตุหนึ่งจากศัตรู",
    },
    formula: {
      en: "(1d4 + <CHAmod>) × <SkillLevelMultiplier>",
      th: "(1d4 + <CHAmod>) × <SkillLevelMultiplier>",
    },
  },
  requirement: {},
  equipmentNeeded: [],
  tier: TierEnum.uncommon,
  consume: {
    hp: 0,
    mp: 0,
    sp: 0,
    elements: [
      { element: "wind", value: 1 },
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
  exec: (user: Character, userParty: Character[], targetParty: Character[], skillLevel: number, location: LocationsEnum): TurnResult => {
    const target = getTarget(user, userParty, targetParty, "enemy").one();
    
    if (!target) {
      return {
        content: {
          en: `${user.name.en} tried to snip thread but has no target`,
          th: `${user.name.th} พยายามตัดลวดระนาบแต่ไม่พบเป้าหมาย`,
        },
        actor: {
          actorId: user.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    }
    
    // Calculate damage: (1d4 + CHA mod) × skillLevelMultiplier
    const chaMod = statMod(user.attribute.getTotal("charisma"));
    // Damage dice - don't apply bless/curse
    const diceDamage = user.roll({ amount: 1, face: 4, applyBlessCurse: false });
    const levelScalar = skillLevelMultiplier(skillLevel);
    const totalDamage = Math.floor((diceDamage + chaMod) * levelScalar);
    
    // Calculate hit/crit
    // Hit/Crit rolls - apply bless/curse automatically
    const hitRoll = user.rollTwenty({});
    const critRoll = user.rollTwenty({});
    
    const damageOutput = {
      damage: totalDamage,
      hit: hitRoll,
      crit: critRoll,
      type: DamageType.arcane,
      isMagic: true,
    };
    
    const damageResult = resolveDamage(user.id, target.id, damageOutput, location);
    
    let dc = 14 - skillLevel;
    const stealRoll = user.rollTwenty({});

    let stolenElement: ElementResourceKey | null = null;
    
    if (stealRoll > dc && target.resources) {
      // Find available elements
      const availableElements: ElementResourceKey[] = [];
      const elementKeys: ElementResourceKey[] = ["fire", "water", "earth", "wind", "order", "chaos", "neutral"];
      
      for (const element of elementKeys) {
        if (target.resources[element] && target.resources[element] > 0) {
          availableElements.push(element);
        }
      }
      
      if (availableElements.length > 0) {
        // Randomly select one element - don't apply bless/curse
        const randomRoll = user.roll({ amount: 1, face: availableElements.length, applyBlessCurse: false });
        stolenElement = availableElements[randomRoll - 1]!; // Convert 1-based to 0-based index
        
        // Steal 1 element from target
        if (target.resources[stolenElement] !== undefined) {
          target.resources[stolenElement] = Math.max(0, target.resources[stolenElement] - 1);
        }
        // Give 1 element to user
        if (!user.resources[stolenElement]) {
          user.resources[stolenElement] = 0;
        }
        user.resources[stolenElement] = (user.resources[stolenElement] || 0) + 1;
      }
    }
    
    const stealMessage = stolenElement 
      ? ` and stole 1 ${stolenElement}!`
      : "";
    
    return {
      content: buildCombatMessage(
        user,
        target,
        {
          en: `Thread Snip${stealMessage}`,
          th: `ตัดลวดระนาบ${stolenElement ? ` และขโมย ${stolenElement} 1 หน่วย!` : ""}`,
        },
        damageResult,
      ),
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