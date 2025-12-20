import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { SpellbladeSkillId } from "../../../enums";
import type { Character } from "src/Entity/Character/Character";
import type { TurnResult } from "../../../types";
import { buildCombatMessage } from "src/Utils/buildCombatMessage";
import { getTarget } from "src/Entity/Battle/getTarget";
import { ActorEffect, TargetEffect } from "../../../effects";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { resolveDamage } from "src/Entity/Battle/damageResolution";
import { getPositionModifier } from "src/Utils/getPositionModifier";
import { skillLevelMultiplier } from "src/Utils/skillScaling";
import { SpellbladeSkill } from "./index";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";
import { getPlanarEdgeLikeDamage } from "src/Utils/getPlanarEdgeLikeDamage";

export const galeRush = new SpellbladeSkill({
  id: SpellbladeSkillId.GaleRush,
  name: {
    en: "Gale Rush",
    th: "พุ่งลม",
  },
  description: {
    text: {
      en: "Rush forward with gale force, cutting through enemies with wind-infused arcane energy.\nDeal <FORMULA> wind damage.\nIf wind resource exists after use, gain +{5}'10':'5'{/} AB gauge.",
      th: "พุ่งไปข้างหน้าด้วยพลังลมกรด ตัดผ่านศัตรูด้วยพลังงานอาร์เคนที่ผสมลม\nสร้างความเสียหายลม <FORMULA>\nหากมีทรัพยากรลมหลังใช้ ได้รับ +{5}'10':'5'{/} AB gauge",
    },
    formula: {
      en: "Planar Edge-like damage × <SkillLevelMultiplier>",
      th: "ความเสียหายแบบ Planar Edge × <SkillLevelMultiplier>",
    },
  },
  requirement: {},
  equipmentNeeded: [],
  tier: TierEnum.uncommon,
  consume: {
    hp: 0,
    mp: 0,
    sp: 3,
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
    const target = getTarget(actor, actorParty, targetParty, "enemy").from("frontFirst").one();

    if (!target) {
      return {
        content: {
          en: `${actor.name.en} tried to use Gale Rush but has no target`,
          th: `${actor.name.th} พยายามใช้พุ่งลมแต่ไม่พบเป้าหมาย`,
        },
        actor: {
          actorId: actor.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    }

    const weapon = actor.getWeapon();
    const levelScalar = skillLevelMultiplier(skillLevel);

    // Get Planar Edge-like damage (base dice + planar mod, no skill multiplier yet)
    const { baseDamage, hit: hitValue, crit: critValue } = getPlanarEdgeLikeDamage(actor, weapon);

    const scaledDamage = Math.max(0, baseDamage * levelScalar);

    const damageOutput = {
      damage: Math.floor(scaledDamage),
      hit: hitValue,
      crit: critValue,
      type: DamageType.wind,
      isMagic: true,
    };

    // Apply position modifier (melee)
    const positionModifierValue = getPositionModifier(
      actor.position,
      target.position,
      weapon,
    );
    damageOutput.damage = Math.floor(damageOutput.damage * positionModifierValue);

    const damageResult = resolveDamage(actor.id, target.id, damageOutput, location);

    // AB Gauge: If wind resource exists after use, gain +5 AB gauge (+10 at level 5)
    // Since produce creates wind, we check if actor has wind resource (which they will after produce)
    let abGaugeMessage = "";
    const windResource = actor.resources.wind;
    if (windResource > 0) {
      const abGaugeGain = skillLevel >= 5 ? 10 : 5;
      actor.abGauge = Math.min(100, actor.abGauge + abGaugeGain);
      abGaugeMessage = ` ${actor.name.en} gains +${abGaugeGain} AB gauge!`;
    }

    return {
      content: {
        en: `${buildCombatMessage(actor, target, { en: "Gale Rush", th: "พุ่งลม" }, damageResult).en}${abGaugeMessage}`,
        th: `${buildCombatMessage(actor, target, { en: "Gale Rush", th: "พุ่งลม" }, damageResult).th}${abGaugeMessage ? ` ${actor.name.th} ได้รับ +${skillLevel >= 5 ? 10 : 5} AB gauge!` : ""}`,
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

