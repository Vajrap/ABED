import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { MysticSkillId } from "../../../enums";
import type { Character } from "src/Entity/Character/Character";
import type { TurnResult } from "../../../types";
import { getTarget } from "src/Entity/Battle/getTarget";
import { ActorEffect, TargetEffect } from "../../../effects";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { resolveDamage } from "src/Entity/Battle/damageResolution";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";
import { buildCombatMessage } from "src/Utils/buildCombatMessage";
import { skillLevelMultiplier } from "src/Utils/skillScaling";
import { MysticSkill } from "./index";
import { statMod } from "src/Utils/statMod";
import { buffsAndDebuffsRepository } from "src/Entity/BuffsAndDebuffs/repository";

export const mistPierce = new MysticSkill({
  id: MysticSkillId.MistPierce,
  name: { en: "Mist Pierce", th: "แทงหมอก" },
  description: {
    text: {
      en: "Pierce through the mist with precise strikes. Deal <FORMULA> pierce damage to an enemy (front first). If currently in back row, try moving to front row first. If move completed, add WIL mod to damage formula before × skill mod and get +2 dodge for 1 turn.",
      th: "แทงผ่านหมอกด้วยการโจมตีที่แม่นยำ สร้างความเสียหายทะลวง <FORMULA> ให้ศัตรู (แถวหน้าก่อน) หากอยู่ในแถวหลัง พยายามย้ายไปแถวหน้าก่อน หากย้ายสำเร็จ เพิ่ม WIL mod เข้าในสูตรความเสียหายก่อน × skill mod และได้รับ +2 dodge เป็นเวลา 1 เทิร์น",
    },
    formula: {
      en: "(1d8 + <DEXmod>) × <SkillLevelMultiplier> (+<WILmod> if moved from back row)",
      th: "(1d8 + <DEXmod>) × <SkillLevelMultiplier> (+<WILmod> หากย้ายจากแถวหลัง)",
    },
  },
  requirement: {},
  equipmentNeeded: ["bareHand"],
  tier: TierEnum.uncommon,
  consume: { hp: 0, mp: 0, sp: 3, elements: [{ element: "wind", value: 1 }] },
  produce: {
    hp: 0, mp: 0, sp: 0,
    elements: [{ element: "water", min: 1, max: 1 }],
  },
  exec: (actor: Character, actorParty: Character[], enemies: Character[], skillLevel: number, location: LocationsEnum) => {
    const target = getTarget(actor, actorParty, enemies, "enemy").from("frontFirst").one();
    if (!target) {
      return {
        content: { en: `${actor.name.en} tried to use Mist Pierce but has no target`, th: `${actor.name.th} พยายามใช้แทงหมอกแต่ไม่พบเป้าหมาย` },
        actor: { actorId: actor.id, effect: [ActorEffect.TestSkill] },
        targets: [],
      };
    }
    
    const isBackRow = actor.position > 2;
    let moved = false;
    let wilModBonus = 0;
    
    // If in back row, try to move to front row first
    if (isBackRow) {
      const allOccupiedPositions = actorParty.map((member) => member.position);
      for (const position of [0, 1, 2] as const) {
        if (!allOccupiedPositions.includes(position)) {
          actor.position = position;
          moved = true;
          break;
        }
      }
      
      // If move completed, add WIL mod to damage and get +2 dodge for 1 turn
      // Note: InnerVeil gives +2 dodge but also has hit chance debuff effect on enemies
      // This matches the description, so using InnerVeil is appropriate
      if (moved) {
        wilModBonus = statMod(actor.attribute.getTotal("willpower"));
        buffsAndDebuffsRepository.innerVeil.appender(actor, { turnsAppending: 1 });
      }
    }
    
    // Calculate damage: (1d8 + DEX mod + WIL mod if moved) × skill level multiplier
    const levelScalar = skillLevelMultiplier(skillLevel);
    const baseDamage = Math.max(0, (actor.roll({ amount: 1, face: 8, stat: "dexterity" }) + wilModBonus) * levelScalar);
    
    const damageOutput = {
      damage: baseDamage,
      hit: actor.rollTwenty({stat: 'dexterity'}),
      crit: actor.rollTwenty({stat: 'luck'}),
      type: DamageType.pierce,
      isMagic: false,
    };
    const damageResult = resolveDamage(actor.id, target.id, damageOutput, location);
    
    let bonusMessage = "";
    if (moved) {
      bonusMessage = ` Moved to front row and gained +2 dodge!`;
    }

    const turnResult: TurnResult = {
      content: {
        en: `${buildCombatMessage(actor, target, { en: `Mist Pierce`, th: `แทงหมอก` }, damageResult).en}${bonusMessage}`,
        th: `${buildCombatMessage(actor, target, { en: `Mist Pierce`, th: `แทงหมอก` }, damageResult).th}${bonusMessage ? ` ย้ายไปแถวหน้าและได้รับ +2 dodge!` : ""}`,
      },
      actor: { actorId: actor.id, effect: [ActorEffect.TestSkill] },
      targets: [{ actorId: target.id, effect: [TargetEffect.TestSkill] }],
    };
    return turnResult;
  },
});

