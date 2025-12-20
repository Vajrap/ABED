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
import { BuffEnum } from "src/Entity/BuffsAndDebuffs/enum";
import { getPlanarEdgeLikeDamage } from "src/Utils/getPlanarEdgeLikeDamage";

export const edgeBurst = new SpellbladeSkill({
  id: SpellbladeSkillId.EdgeBurst,
  name: {
    en: "Edge Burst",
    th: "ระเบิดขอบ",
  },
  description: {
    text: {
      en: "Unleash all accumulated edge charges in a devastating burst of arcane energy.\nConsume ALL <BuffEdgeCharge> stacks (min 1).\nDeal <FORMULA> arcane damage.\nDamage increases with each edge charge consumed.",
      th: "ปลดปล่อย edge charge ที่สะสมไว้ทั้งหมดในระเบิดพลังงานอาร์เคนที่ทำลายล้าง\nใช้สแตค <BuffEdgeCharge> ทั้งหมด (อย่างน้อย 1)\nสร้างความเสียหายอาร์เคน <FORMULA>\nความเสียหายเพิ่มขึ้นตามจำนวน edge charge ที่ใช้",
    },
    formula: {
      en: "(<WeaponDamage> or Planar Edge dice if no weapon) + <PlanarMod> + (1d2 per <BuffEdgeCharge> stack) × <SkillLevelMultiplier>",
      th: "(<WeaponDamage> หรือลูกเต๋า Planar Edge หากไม่มีอาวุธ) + <PlanarMod> + (1d2 ต่อสแตค <BuffEdgeCharge>) × <SkillLevelMultiplier>",
    },
  },
  requirement: {},
  equipmentNeeded: ["sword", "blade", "dagger", "bareHand"],
  tier: TierEnum.rare,
  consume: {
    hp: 0,
    mp: 2,
    sp: 2,
    elements: [
      { element: "wind", value: 1 },
      { element: "fire", value: 1 },
    ],
  },
  produce: {
    hp: 0,
    mp: 0,
    sp: 0,
    elements: [],
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
          en: `${actor.name.en} tried to use Edge Burst but has no target`,
          th: `${actor.name.th} พยายามใช้ระเบิดขอบแต่ไม่พบเป้าหมาย`,
        },
        actor: {
          actorId: actor.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    }

    // Get Edge Charge stacks (min 1)
    const edgeChargeEntry = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.edgeCharge);
    const edgeChargeStacks = Math.max(1, edgeChargeEntry?.value || 0);

    // Consume ALL Edge Charges
    if (edgeChargeEntry) {
      actor.buffsAndDebuffs.buffs.entry.delete(BuffEnum.edgeCharge);
    } else {
      // If no edge charge exists, create one (min 1 requirement)
      actor.buffsAndDebuffs.buffs.entry.set(BuffEnum.edgeCharge, {
        value: 1,
        counter: 0
      });
      actor.buffsAndDebuffs.buffs.entry.delete(BuffEnum.edgeCharge);
    }

    const weapon = actor.getWeapon();
    const levelScalar = skillLevelMultiplier(skillLevel);

    // Get Planar Edge-like damage (base dice + planar mod, no skill multiplier yet)
    const { baseDamage, hit: hitValue, crit: critValue } = getPlanarEdgeLikeDamage(actor, weapon);

    // Add 1d2 per edge charge stack
    let edgeChargeDamage = 0;
    for (let i = 0; i < edgeChargeStacks; i++) {
      // Random quantity - don't apply bless/curse
      edgeChargeDamage += actor.roll({ amount: 1, face: 2, applyBlessCurse: false });
    }
    const rawDamage = baseDamage + edgeChargeDamage;
    const scaledDamage = Math.max(0, rawDamage * levelScalar);

    const damageOutput = {
      damage: Math.floor(scaledDamage),
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
    damageOutput.damage *= positionModifierValue;

    const damageResult = resolveDamage(actor.id, target.id, damageOutput, location);

    return {
      content: buildCombatMessage(
        actor,
        target,
        { en: `Edge Burst (${edgeChargeStacks} charges)`, th: `ระเบิดขอบ (${edgeChargeStacks} ประจุ)` },
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

