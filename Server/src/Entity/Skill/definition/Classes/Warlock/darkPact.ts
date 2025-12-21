/**
 * TODO: LORE ALIGNMENT - Character Creation Level 1
 * 
 * Current: "Dark Pact" - Very mystical concept of making a "pact" which doesn't align
 * with elemental system. The sacrifice mechanic is good, but the framing is too mystical.
 * 
 * Suggested Changes:
 * - Rename to "Elemental Sacrifice" or "Chaos Surge" or "Overcharge"
 * - Description: "Sacrifice HP to channel overwhelming chaos/water energy" instead of "dark pact"
 * - Frame as overcharging elemental power by sacrificing vitality, not making a mystical pact
 * - The chaos + water consumption already exists, so emphasize elemental overcharge
 * - Consider: "Berserker Surge" - sacrifice HP to unleash massive chaos damage
 */
import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { WarlockSkillId } from "../../../enums";
import type { Character } from "src/Entity/Character/Character";
import type { TurnResult } from "../../../types";
import { getTarget } from "src/Entity/Battle/getTarget";
import { ActorEffect, TargetEffect } from "../../../effects";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { resolveDamage } from "src/Entity/Battle/damageResolution";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";
import { statMod } from "src/Utils/statMod";
import { buildCombatMessage } from "src/Utils/buildCombatMessage";
import { WarlockSkill } from "./index";

export const darkPact = new WarlockSkill({
  id: WarlockSkillId.DarkPact,
  name: {
    en: "Darkness Overcharge",
    th: "วินาศกรรมมืด",
  },
  description: {
    text: {
      en: "Sacrifice your own vitality to unleash overwhelming dark power.\nSacrifice {7}'8':'10'{/} HP to deal <FORMULA> [r]true dark damage[/r] that bypasses all defenses.",
      th: "เสียสละพลังชีวิตของตัวเองเพื่อปลดปล่อยพลังมืดที่ล้นเกิน\nเสียสละ {7}'8':'10'{/} HP เพื่อสร้างความเสียหายมืดแท้ <FORMULA> [r]ที่ผ่านการป้องกันทั้งหมด[/r]",
    },
    formula: {
      en: "(2d10 + (2 × <PlanarMod>)) × (1 + 0.15 × skill level) {7}+'1d6' extra damage{/}",
      th: "(2d10 + (2 × <PlanarMod>)) × (1 + 0.15 × เลเวลสกิล) {7}+'1d6' ความเสียหายพิเศษเพิ่มเติม{/}",
    },
  },
  requirement: {},
  equipmentNeeded: [],
  tier: TierEnum.rare,
  isFallback: false, // DarkPact: consumes 1 fire element (and 5 HP)
  // Note: This skill needs a DarkPact buff definition, currently implemented incorrectly as damage skill
  consume: {
    hp: 5, // Enum says 5 HP
    mp: 0,
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
        element: "chaos",
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
          en: `${actor.name.en} tried to use Dark Pact but has no target`,
          th: `${actor.name.th} พยายามใช้พันธสัญญามืดแต่ไม่พบเป้าหมาย`,
        },
        actor: {
          actorId: actor.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    }

    // HP cost: 10 at base, 8 at level 7+
    // The system already consumed consume.hp (10), so if level >= 7, refund 2 HP
    const hpCost = skillLevel >= 7 ? 8 : 10;
    const actualHpCost = hpCost;
    
    // If level 7+, refund the difference (system consumed 10, we only want 8)
    if (skillLevel >= 7) {
      actor.vitals.incHp(2);
    }

    // Calculate damage: 2d10 + (2 × planar mod) * (1 + 0.15 * skill level)
    const planarMod = statMod(actor.attribute.getTotal("planar"));
    const controlMod = statMod(actor.attribute.getTotal("control"));
    const luckMod = statMod(actor.attribute.getTotal("luck"));
    
    // Damage dice - should not get bless/curse
    const baseDiceDamage = actor.roll({ amount: 2, face: 10, stat: "planar", applyBlessCurse: false });
    const levelMultiplier = 1 + 0.15 * skillLevel;
    const planarDamage = (2 * planarMod) * levelMultiplier;
    const extraDamage = skillLevel >= 7 ? actor.roll({ amount: 1, face: 6, applyBlessCurse: false }) : 0;
    
    const totalDamage = Math.max(0, Math.floor(baseDiceDamage + planarDamage + extraDamage));

    // Dark/chaos magic - context suggests CONTROL for hit
    const damageOutput = {
      damage: totalDamage,
      hit: actor.rollTwenty({stat: 'control'}),
      crit: actor.rollTwenty({stat: 'luck'}),
      type: DamageType.dark,
      isMagic: true,
      trueDamage: true,
    };

    const damageResult = resolveDamage(actor.id, target.id, damageOutput, location);

    const message = buildCombatMessage(
      actor,
      target,
      { en: "Darkness Overcharge", th: "วินาศกรรมมืด" },
      damageResult,
    );

    return {
      content: {
        en: `${actor.name.en} sacrificed ${actualHpCost} HP! ${message.en}`,
        th: `${actor.name.th} เสียสละ ${actualHpCost} HP! ${message.th}`,
      },
      actor: {
        actorId: actor.id,
        effect: [ActorEffect.Cast],
      },
      targets: [
        {
          actorId: target.id,
          effect: [TargetEffect.ChaosOne],
        },
      ],
    };
  },
});

