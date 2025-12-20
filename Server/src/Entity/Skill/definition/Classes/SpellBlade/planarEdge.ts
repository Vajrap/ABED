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
import { SpellbladeSkill } from "./index";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";
import { buffsAndDebuffsRepository } from "src/Entity/BuffsAndDebuffs/repository";

import { getPlanarEdgeLikeDamage } from "src/Utils/getPlanarEdgeLikeDamage";

export const planarEdge = new SpellbladeSkill({
  id: SpellbladeSkillId.PlanarEdge,
  name: {
    en: "Planar Edge",
    th: "ขอบแห่งระนาบ",
  },
  description: {
    text: {
      en: "Channel planar energy into your weapon's edge, creating a blade of pure arcane power.\nDeal <FORMULA> arcane damage.\n[b]Gain 1 <BuffEdgeCharge>[/b] (max 5 stacks).\nThis skill Damage dice is based on weapon's physical damage dice or if you don't equip any weapon the damage dice will be (1d6, 1d6, 1d8, 1d8 or 2d4) based on skill level.",
      th: "ควบคุมพลังงานระนาบเข้าสู่ขอบอาวุธ สร้างใบมีดจากพลังอาร์เคนบริสุทธิ์\nสร้างความเสียหายอาร์เคน <FORMULA>\n[b]ได้รับ <BuffEdgeCharge> 1 สแตค[/b] (สูงสุด 5 สแตค)\nลูกเต๋าความเสียหายของสกิลนี้ขึ้นอยู่กับความเสียหายกายภาพของอาวุธที่ถือ แต่ถ้าหากไม่ได้ถืออาวุธอยู่ ลูกเต๋าความเสียหายจะเป็น (1d6, 1d6, 1d8, 1d8, 2d4) ขึ้นอยู่กับเลเวลของสกิล",
    },
    formula: {
      en: "Damage Dice + <PlanarMod>",
      th: "ลูกเต๋าความเสียหาย + <PlanarMod>",
    },
  },
  requirement: {},
  equipmentNeeded: ["sword", "blade", "dagger", "bareHand"],
  tier: TierEnum.common,
  consume: {
    hp: 0,
    mp: 2,
    sp: 0,
    elements: [],
  },
  produce: {
    hp: 0,
    mp: 0,
    sp: 0,
    elements: [
      { element: "neutral", min: 1, max: 1 },
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
          en: `${actor.name.en} tried to use Planar Edge but has no target`,
          th: `${actor.name.th} พยายามใช้ขอบแห่งระนาบแต่ไม่พบเป้าหมาย`,
        },
        actor: {
          actorId: actor.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    }

    const weapon = actor.getWeapon();

    // Get Planar Edge-like damage (base dice + planar mod, no skill multiplier, no Edge Charge)
    const { baseDamage, hit: hitValue, crit: critValue } = getPlanarEdgeLikeDamage(actor, weapon);

    const damageOutput = {
      damage: baseDamage,
      hit: hitValue,
      crit: critValue,
      type: DamageType.arcane,
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

    // Generate 1 Edge Charge
    buffsAndDebuffsRepository.edgeCharge.appender(actor, { turnsAppending: 1 });

    return {
      content: buildCombatMessage(
        actor,
        target,
        { en: "Planar Edge", th: "ขอบแห่งระนาบ" },
        damageResult,
      ),
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

