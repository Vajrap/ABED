import { Character } from "src/Entity/Character/Character";
import { NomadSkill } from ".";
import { NomadSkillId } from "../../../enums";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { buildCombatMessage } from "src/Utils/buildCombatMessage";
import { ActorEffect, TargetEffect } from "src/Entity/Skill/effects";
import { getTarget } from "src/Entity/Battle/getTarget";
import type { TurnResult } from "../../../types";
import { resolveDamage } from "src/Entity/Battle/damageResolution";
import { getWeaponDamageOutput } from "src/Utils/getWeaponDamgeOutput";
import { skillLevelMultiplier } from "src/Utils/skillScaling";

export const tacticalAdvance = new NomadSkill({
  id: NomadSkillId.TacticalAdvance,
  name: {
    en: "Tactical Advance",
    th: "รุกเชิงกลยุทธ์",
  },
  description: {
    text: {
      en: "Advance tactically while attacking. Move to front row (if available) and deal <FORMULA> damage. If moving from back row, gain +5 AB gauge.",
      th: "รุกอย่างกลยุทธ์พร้อมโจมตี. ย้ายไปแถวหน้า (หากมีที่ว่าง) และสร้างความเสียหาย <FORMULA>. หากย้ายจากแถวหลัง จะได้รับ +5 AB gauge",
    },
    formula: {
      en: "(Weapon damage + attribute mod) × <SkillLevelMultiplier>",
      th: "(ความเสียหายจากอาวุธ + ค่า modifier) × <SkillLevelMultiplier>",
    },
  },
  requirement: {},
  equipmentNeeded: [],
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
          en: `${actor.name.en} tried to use Tactical Advance but has no target`,
          th: `${actor.name.th} พยายามใช้รุกเชิงกลยุทธ์แต่ไม่พบเป้าหมาย`,
        },
        actor: {
          actorId: actor.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    }

    // Check if moving from back row
    const wasInBackRow = actor.position > 2;

    // Move to front row (if available)
    const allOccupiedPositions = actorParty.map((member) => member.position);
    let movedToFront = false;
    for (const position of [0, 1, 2] as const) {
      if (!allOccupiedPositions.includes(position)) {
        actor.position = position;
        movedToFront = true;
        break;
      }
    }

    // If moving from back row, gain +5 AB gauge
    let abGaugeMessage = "";
    if (wasInBackRow && movedToFront) {
      actor.abGauge = Math.min(100, actor.abGauge + 5);
      abGaugeMessage = ` ${actor.name.en} gains +5 AB gauge!`;
    }

    const weapon = actor.getWeapon();
    const damageOutput = getWeaponDamageOutput(actor, weapon, "physical");
    const levelScalar = skillLevelMultiplier(skillLevel);

    // Base damage: (weapon damage + attribute mod) × skill level multiplier
    damageOutput.damage = Math.floor(damageOutput.damage * levelScalar);

    const damageResult = resolveDamage(actor.id, target.id, damageOutput, location);
    const message = buildCombatMessage(
      actor,
      target,
      { en: "Tactical Advance", th: "รุกเชิงกลยุทธ์" },
      damageResult,
    );

    return {
      content: {
        en: `${message.en}${movedToFront ? " and moves to front row" : ""}${abGaugeMessage}`,
        th: `${message.th}${movedToFront ? " และย้ายไปแถวหน้า" : ""}${abGaugeMessage ? ` ${actor.name.th} ได้รับ +5 AB gauge!` : ""}`,
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
  isFallback: false,
});

