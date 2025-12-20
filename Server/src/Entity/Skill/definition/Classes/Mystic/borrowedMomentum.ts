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
import { getPositionModifier } from "src/Utils/getPositionModifier";
import { BareHandId } from "src/Entity/Item/Equipment/Weapon/type";

export const borrowedMomentum = new MysticSkill({
  id: MysticSkillId.BorrowedMomentum,
  name: { en: "Borrowed Momentum", th: "ยืมโมเมนตัม" },
  description: {
    text: {
      en: "Borrow momentum from your enemy to enhance your own speed. Deal <FORMULA> blunt damage (palm strike damage) to an enemy. If enemy has ≤50 AB gauge, gain +15 AB gauge. Else, decrease enemy AB gauge by 15.",
      th: "ยืมโมเมนตัมจากศัตรูเพื่อเพิ่มความเร็วของคุณ สร้างความเสียหายทื่อ <FORMULA> (ความเสียหายตบฝ่ามือ) ให้ศัตรู หากศัตรูมี AB gauge ≤50 ได้รับ +15 AB gauge มิฉะนั้น ลด AB gauge ของศัตรูลง 15",
    },
    formula: {
      en: "(1d6 + <DEXmod>) × <SkillLevelMultiplier> (palm strike damage)",
      th: "(1d6 + <DEXmod>) × <SkillLevelMultiplier> (ความเสียหายตบฝ่ามือ)",
    },
  },
  requirement: {},
  equipmentNeeded: ["bareHand"],
  tier: TierEnum.uncommon,
  consume: { hp: 0, mp: 0, sp: 3, elements: [{ element: "wind", value: 1 }, { element: "water", value: 1 }] },
  produce: {
    hp: 0, mp: 0, sp: 0,
    elements: [{ element: "neutral", min: 1, max: 1 }],
  },
  exec: (actor: Character, actorParty: Character[], enemies: Character[], skillLevel: number, location: LocationsEnum) => {
    const target = getTarget(actor, actorParty, enemies, "enemy").one();
    if (!target) {
      return {
        content: { en: `${actor.name.en} tried to use Borrowed Momentum but has no target`, th: `${actor.name.th} พยายามใช้ยืมโมเมนตัมแต่ไม่พบเป้าหมาย` },
        actor: { actorId: actor.id, effect: [ActorEffect.TestSkill] },
        targets: [],
      };
    }
    
    // Calculate palm strike damage: 1d6 + DEX mod × skill level multiplier
    // (Using palm strike style, which is simpler than full palm strike - just base damage)
    const levelScalar = skillLevelMultiplier(skillLevel);
    const baseDamage = Math.max(0, (actor.roll({ amount: 1, face: 6, stat: "dexterity" })) * levelScalar);
    
    // Apply position modifier (palm strike uses position modifier)
    const weapon = actor.getWeapon();
    const positionModifier = weapon.id === BareHandId.BareHand 
      ? getPositionModifier(actor.position, target.position, weapon)
      : 1.0;
    const totalDamage = Math.floor(baseDamage * positionModifier);
    
    const damageOutput = {
      damage: totalDamage,
      hit: actor.rollTwenty({}),
      crit: actor.rollTwenty({}),
      type: DamageType.blunt,
      isMagic: false,
    };
    const damageResult = resolveDamage(actor.id, target.id, damageOutput, location);
    
    // AB Gauge Manipulation: If enemy has ≤50 AB gauge, gain +15 AB gauge. Else, decrease enemy AB gauge by 15
    // Only applies on hit
    let abGaugeMessage = "";
    if (damageResult.isHit) {
      if (target.abGauge <= 50) {
        actor.abGauge = Math.min(100, actor.abGauge + 15);
        abGaugeMessage = ` ${actor.name.en} gains +15 AB gauge!`;
      } else {
        const initialGauge = target.abGauge;
        target.abGauge = Math.max(0, target.abGauge - 15);
        const reduced = initialGauge - target.abGauge;
        abGaugeMessage = ` ${target.name.en}'s AB gauge reduced by ${reduced}!`;
      }
    }

    const turnResult: TurnResult = {
      content: {
        en: `${buildCombatMessage(actor, target, { en: `Borrowed Momentum`, th: `ยืมโมเมนตัม` }, damageResult).en}${abGaugeMessage}`,
        th: `${buildCombatMessage(actor, target, { en: `Borrowed Momentum`, th: `ยืมโมเมนตัม` }, damageResult).th}${abGaugeMessage ? ` ${actor.name.th} ได้รับ +15 AB gauge!` : ""}`,
      },
      actor: { actorId: actor.id, effect: [ActorEffect.TestSkill] },
      targets: [{ actorId: target.id, effect: [TargetEffect.TestSkill] }],
    };
    return turnResult;
  },
});

