import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { ScholarSkillId } from "../../../enums";
import type { Character } from "src/Entity/Character/Character";
import type { TurnResult } from "../../../types";
import { ActorEffect, TargetEffect } from "../../../effects";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { getTarget } from "src/Entity/Battle/getTarget";
import { ScholarSkill } from "./index";
import { resolveDamage } from "src/Entity/Battle/damageResolution";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";
import { statMod } from "src/Utils/statMod";
import { roll, rollTwenty } from "src/Utils/Dice";
import { buildCombatMessage } from "src/Utils/buildCombatMessage";
import { skillLevelMultiplier } from "src/Utils/skillScaling";

export const cognitiveOverload = new ScholarSkill({
  id: ScholarSkillId.CognitiveOverload,
  name: {
    en: "Cognitive Overload",
    th: "ความล้นเกินของความคิด",
  },
  description: {
    text: {
      en: "Overwhelm your enemy's mind with an overwhelming surge of arcane knowledge.\nDeal <FORMULA> [r]true arcane damage[/r] that bypasses all defenses.\nRefreshes 1 random debuff on the target.\nIf target has ≥3 debuffs, main dice becomes {5}'1d8':'1d6'{/}.",
      th: "ท่วมท้นจิตใจของศัตรูด้วยคลื่นความรู้อาร์เคนที่ล้นเกิน\nสร้างความเสียหายอาร์เคนแท้ <FORMULA> [r]ที่ผ่านการป้องกันทั้งหมด[/r]\nรีเฟรชดีบัฟแบบสุ่ม 1 ตัวบนเป้าหมาย\nหากเป้าหมายมีดีบัฟ ≥3 ตัว ความเสียหายกลายเป็น {5}'1d8':'1d6'{/}.",
    },
    formula: {
      en: "{5}'1d6':'1d4'{/} + <INTmod> × <SkillLevelMultiplier>",
      th: "{5}'1d6':'1d4'{/} + <INTmod> × <SkillLevelMultiplier>",
    },
  },
  requirement: {},
  equipmentNeeded: [],
  tier: TierEnum.uncommon,
  consume: {
    hp: 0,
    mp: 4,
    sp: 0,
    elements: [{ element: "neutral", value: 2 }],
  },
  produce: {
    hp: 0,
    mp: 0,
    sp: 0,
    elements: [
      { element: "chaos", min: 0, max: 1 },
      { element: "order", min: 0, max: 1 },
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
          en: `${actor.name.en} tried to cause cognitive overload but has no target`,
          th: `${actor.name.th} พยายามทำให้เกิดความล้นเกินของความคิดแต่ไม่พบเป้าหมาย`,
        },
        actor: {
          actorId: actor.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    }

    const intMod = statMod(actor.attribute.getTotal("intelligence"));
    const levelScalar = skillLevelMultiplier(skillLevel);
    const debuffCount = target.buffsAndDebuffs.debuffs.entry.size;

    // Determine damage dice based on debuff count and skill level
    let damageDice: { dice: number; face: number };
    if (debuffCount >= 3) {
      damageDice =
        skillLevel >= 5 ? { dice: 1, face: 8 } : { dice: 1, face: 6 };
    } else {
      damageDice =
        skillLevel >= 5 ? { dice: 1, face: 6 } : { dice: 1, face: 4 };
    }

    const baseDamage = roll(damageDice.dice).d(damageDice.face).total;
    const totalDamage = Math.max(0, (baseDamage + intMod) * levelScalar);

    // Refresh 1 random debuff (extend duration by 1 turn)
    let debuffRefreshed = "";
    if (target.buffsAndDebuffs.debuffs.entry.size > 0) {
      const debuffEntries = Array.from(
        target.buffsAndDebuffs.debuffs.entry.entries(),
      );
      const randomIndex = Math.floor(Math.random() * debuffEntries.length);
      const [debuffId, entry] = debuffEntries[randomIndex]!;
      entry.value += 1; // Refresh by adding 1 turn
      debuffRefreshed = ` ${target.name.en}'s ${debuffId} debuff was refreshed.`;
    }

    const damageOutput = {
      damage: Math.floor(totalDamage),
      hit: rollTwenty().total + statMod(actor.attribute.getTotal("control")),
      crit: rollTwenty().total + statMod(actor.attribute.getTotal("luck")),
      type: DamageType.arcane,
      isMagic: true,
      trueDamage: true,
    };

    const damageResult = resolveDamage(
      actor.id,
      target.id,
      damageOutput,
      location,
    );
    const combatMsg = buildCombatMessage(
      actor,
      target,
      { en: "Cognitive Overload", th: "ความล้นเกินของความคิด" },
      damageResult,
    );

    return {
      content: {
        en: `${combatMsg.en}${debuffRefreshed}`,
        th: `${combatMsg.th}${debuffRefreshed ? ` ${target.name.th} ได้รับการรีเฟรช debuff` : ""}`,
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
