import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { RogueSkillId } from "../../../enums";
import type { Character } from "src/Entity/Character/Character";
import type { TurnResult } from "../../../types";
import { buildCombatMessage } from "src/Utils/buildCombatMessage";
import { getTarget } from "src/Entity/Battle/getTarget";
import { ActorEffect, TargetEffect } from "../../../effects";
import { resolveDamage } from "src/Entity/Battle/damageResolution";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { RogueSkill } from "./index";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";
import { skillLevelMultiplier } from "src/Utils/skillScaling";

export const throwingKnives = new RogueSkill({
  id: RogueSkillId.ThrowingKnives,
  name: {
    en: "Throwing Knives",
    th: "ขว้างมีด",
  },
  description: {
    text: {
      en: "Hurl a flurry of knives with deadly precision, striking multiple foes.\nThrow 3 daggers at random targets, each dealing <FORMULA> pierce damage.\nTargets can be the same or different.",
      th: "ขว้างมีดหลายเล่มด้วยความแม่นยำที่ร้ายแรง โจมตีศัตรูหลายคน\nขว้าง 3 มีดกระทำศัตรูที่สุ่ม แต่ละคนสร้างความเสียหายแทง <FORMULA>\nเป้าหมายสามารถเป็นคนเดียวกันหรือต่างกัน",
    },
    formula: {
      en: "(1d3 + <DEXmod>) x <SkillLevelMultiplier>",
      th: "(1d3 + <DEXmod>) x <SkillLevelMultiplier>",
    },
  },
  requirement: {},
  equipmentNeeded: ['dagger'],
  tier: TierEnum.common,
  consume: {
    hp: 0,
    mp: 0,
    sp: 2,
    elements: [],
  },
  produce: {
    hp: 0,
    mp: 0,
    sp: 0,
    elements: [
      {element: 'neutral', min: 1, max: 1},
    ],
  },
  exec: (
    actor: Character,
    actorParty: Character[],
    targetParty: Character[],
    skillLevel: number,
    location: LocationsEnum,
  ): TurnResult => {
    const numKnives = 3; // Always 3 knives (cantrip, no upgrade)

    const messages: string[] = [];
    const targetEffects: { actorId: string; effect: TargetEffect[] }[] = [];

    // Select random targets (can repeat)
    for (let i = 0; i < numKnives; i++) {
      const target = getTarget(actor, actorParty, targetParty, "enemy").one();
      
      if (!target) {
        break; // No more valid targets
      }

      // Each knife deals 1d3 damage (no modifiers, cantrip)
      const totalDamage = actor.roll({ amount: 1, face: 3, stat: "dexterity" }) * skillLevelMultiplier(skillLevel);

      const damageOutput = {
        damage: totalDamage,
        hit: actor.rollTwenty({stat: 'dexterity'}),
        crit: actor.rollTwenty({stat: 'luck'}),
        type: DamageType.pierce,
        isMagic: false,
      };

      const damageResult = resolveDamage(actor.id, target.id, damageOutput, location);
      const combatMsg = buildCombatMessage(actor, target, { en: "Throwing Knives", th: "ขว้างมีด" }, damageResult);
      messages.push(combatMsg.en);

      targetEffects.push({
        actorId: target.id,
        effect: [TargetEffect.TestSkill],
      });
    }

    return {
      content: {
        en: `${actor.name.en} throws knives! ${messages.join(" ")}`,
        th: `${actor.name.th} ขว้างมีด! ${messages.join(" ")}`,
      },
      actor: {
        actorId: actor.id,
        effect: [ActorEffect.TestSkill],
      },
      targets: targetEffects,
    };
  },
});

