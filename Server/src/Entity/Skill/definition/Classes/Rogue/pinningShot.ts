import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { RogueSkillId } from "../../../enums";
import type { Character } from "src/Entity/Character/Character";
import type { TurnResult } from "../../../types";
import { getTarget } from "src/Entity/Battle/getTarget";
import { ActorEffect, TargetEffect } from "../../../effects";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { resolveDamage } from "src/Entity/Battle/damageResolution";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";
import { buildCombatMessage } from "src/Utils/buildCombatMessage";
import { RogueSkill } from "./index";
import { statMod } from "src/Utils/statMod";
import { skillLevelMultiplier } from "src/Utils/skillScaling";

export const pinningShot = new RogueSkill({
  id: RogueSkillId.PinningShot,
  name: {
    en: "Pinning Shot",
    th: "ยิงตรึง",
  },
  description: {
    text: {
      en: "Pin an enemy with a precise shot. Deal <FORMULA> pierce damage to a target. Target must [r]roll DC10 ENDsave[/r]. On fail, target loses {5}'15':'10'{/} AB gauge.",
      th: "ตรึงศัตรูด้วยการยิงที่แม่นยำ สร้างความเสียหายแทง <FORMULA> ให้เป้าหมาย เป้าหมายต้องทอย [r]ENDsave DC10[/r] หากล้มเหลว เป้าหมายเสีย {5}'15':'10'{/} AB gauge",
    },
    formula: {
      en: "1d6 + <DEXmod> x <SkillLevelMultiplier>",
      th: "1d6 + <DEXmod> x <SkillLevelMultiplier>",
    },
  },
  requirement: {},
  equipmentNeeded: ["bow"],
  tier: TierEnum.common,
  consume: {
    hp: 0,
    mp: 0,
    sp: 2,
    elements: [
      { element: "neutral", value: 1 },
    ],
  },
  produce: {
    hp: 0,
    mp: 0,
    sp: 0,
    elements: [
      { element: "wind", min: 1, max: 1 },
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
          en: `${actor.name.en} tried to use Pinning Shot but has no target`,
          th: `${actor.name.th} พยายามใช้ยิงตรึงแต่ไม่พบเป้าหมาย`,
        },
        actor: {
          actorId: actor.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    }

    // Calculate damage: 1d6 + DEX mod
    // Damage dice - should not get bless/curse
    const baseDamage = actor.roll({ amount: 1, face: 6, stat: "dexterity", applyBlessCurse: false }) * skillLevelMultiplier(skillLevel);

    const damageOutput = {
      damage: baseDamage,
      hit: actor.rollTwenty({ stat: "dexterity" }),
      crit: actor.rollTwenty({ stat: "luck" }),
      type: DamageType.pierce,
      isMagic: false,
    };
    const damageResult = resolveDamage(actor.id, target.id, damageOutput, location);

    // Check for AB gauge reduction
    let abGaugeMessage = "";
    if (damageResult.isHit) {
      const saveRoll = target.rollSave("endurance");
      if (saveRoll < 10) {
        // Save failed: lose AB gauge
        const reduction = skillLevel >= 5 ? 15 : 10;
        const initialGauge = target.abGauge;
        target.abGauge = Math.max(0, target.abGauge - reduction);
        const reduced = initialGauge - target.abGauge;
        abGaugeMessage = ` ${target.name.en} failed the save and lost ${reduced} AB gauge!`;
      }
    }

    return {
      content: {
        en: `${buildCombatMessage(actor, target, { en: "Pinning Shot", th: "ยิงตรึง" }, damageResult).en}${abGaugeMessage}`,
        th: `${buildCombatMessage(actor, target, { en: "Pinning Shot", th: "ยิงตรึง" }, damageResult).th}${abGaugeMessage ? ` ${target.name.th} ล้มเหลวในการทดสอบและเสีย ${abGaugeMessage.match(/\d+/)?.[0] || "10"} AB gauge!` : ""}`,
      },
      actor: {
        actorId: actor.id,
        effect: [ActorEffect.TestSkill],
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

