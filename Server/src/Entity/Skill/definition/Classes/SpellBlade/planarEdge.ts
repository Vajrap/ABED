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
import { statMod } from "src/Utils/statMod";
import { skillLevelMultiplier } from "src/Utils/skillScaling";
import { SpellbladeSkill } from "./index";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";
import { roll, rollTwenty } from "src/Utils/Dice";
import { buffsAndDebuffsRepository } from "src/Entity/BuffsAndDebuffs/repository";
import { BuffEnum } from "src/Entity/BuffsAndDebuffs/enum";
import { BareHandId } from "src/Entity/Item/Equipment/Weapon/type";

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
      en: "(Damage Dice + <PlanarMod> + <BuffEdgeCharge> stacks) × <SkillLevelMultiplier>",
      th: "(ลูกเต๋าความเสียหาย + <PlanarMod> + สแตค <BuffEdgeCharge>) × <SkillLevelMultiplier>",
    },
  },
  requirement: {},
  equipmentNeeded: ["sword", "blade", "dagger", "bareHand"],
  tier: TierEnum.common,
  consume: {
    hp: 0,
    mp: 0,
    sp: 0,
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
    const isBareHand = weapon.id === BareHandId.BareHand;
    const planarMod = statMod(actor.attribute.getTotal("planar"));
    const levelScalar = skillLevelMultiplier(skillLevel);

    // Get Edge Charge stacks
    const edgeChargeEntry = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.edgeCharge);
    const edgeChargeStacks = edgeChargeEntry?.value || 0;

    // TODO: Cantrip damage - should be 1d6 since it has special effect (Edge Charge)
    // Currently varies by level, but should be consistent 1d6 for bare hand
    // Damage dice - don't apply bless/curse
    const baseDamage = 
      isBareHand ? 
        actor.roll({ amount: 1, face: 6, applyBlessCurse: false }) : // Should be 1d6 consistently (has special effect)
      actor.roll({ 
        amount: weapon.weaponData.damage.magicalDamageDice.dice, 
        face: weapon.weaponData.damage.magicalDamageDice.face, 
        applyBlessCurse: false 
      });
    // Hit/Crit rolls - apply bless/curse automatically
    const hitValue = actor.rollTwenty({}) + statMod(actor.attribute.getTotal("dexterity"));
    const critValue = actor.rollTwenty({}) + statMod(actor.attribute.getTotal("luck"));

    const rawDamage = baseDamage + planarMod + edgeChargeStacks;
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

