import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { SpellBladeSkillId } from "../../../enums";
import type { Character } from "src/Entity/Character/Character";
import { getWeaponDamageOutput } from "src/Utils/getWeaponDamgeOutput";
import type { TurnResult } from "../../../types";
import { buildCombatMessage } from "src/Utils/buildCombatMessage";
import { getTarget } from "src/Entity/Battle/getTarget";
import { ActorEffect, TargetEffect } from "../../../effects";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { resolveDamage } from "src/Entity/Battle/damageResolution";
import { getPositionModifier } from "src/Utils/getPositionModifier";
import { getWeaponDamageType } from "src/Utils/getWeaponDamageType";
import { statMod } from "src/Utils/statMod";
import { skillLevelMultiplier } from "src/Utils/skillScaling";
import { SpellBladeSkill } from "./index";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";
import { roll, rollTwenty } from "src/Utils/Dice";
import { BuffEnum } from "src/Entity/BuffsAndDebuffs/enum";
import { BareHandId } from "src/Entity/Item/Equipment/Weapon/type";

export const edgeBurst = new SpellBladeSkill({
  id: SpellBladeSkillId.EdgeBurst,
  name: {
    en: "Edge Burst",
    th: "ระเบิดขอบ",
  },
  description: {
    en: "Consume ALL Edge Charges (min 1). Strike target for weapon damage (or Planar Edge dice if no weapon) + Planar mod + (1d2 per edge charge stack) * (1 + 0.1 * skill level) arcane damage.",
    th: "ใช้ Edge Charge ทั้งหมด (อย่างน้อย 1) โจมตีเป้าหมายด้วยความเสียหายอาวุธ (หรือลูกเต๋า Planar Edge หากไม่มีอาวุธ) + Planar mod + (1d2 ต่อ edge charge stack) * (1 + 0.1 * เลเวลสกิล)",
  },
  requirement: {},
  equipmentNeeded: ["sword", "blade", "dagger", "bareHand"],
  tier: TierEnum.rare,
  consume: {
    hp: 0,
    mp: 0,
    sp: 0,
    elements: [
      { element: "chaos", value: 2 },
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
        isPerm: false,
        permValue: 0,
      });
      actor.buffsAndDebuffs.buffs.entry.delete(BuffEnum.edgeCharge);
    }

    const weapon = actor.getWeapon();
    const isBareHand = weapon.id === BareHandId.BareHand;
    const planarMod = statMod(actor.attribute.getTotal("planar"));
    const levelScalar = skillLevelMultiplier(skillLevel);

    // Calculate base damage (weapon or Planar Edge dice)
    let baseDamage = 0;
    let hitValue = 0;
    let critValue = 0;
    if (isBareHand) {
      // No weapon: use skill level dice
      let diceConfig: { dice: number; face: number };
      if (skillLevel === 1) diceConfig = { dice: 1, face: 6 };
      else if (skillLevel === 2) diceConfig = { dice: 1, face: 6 };
      else if (skillLevel === 3) diceConfig = { dice: 1, face: 8 };
      else if (skillLevel === 4) diceConfig = { dice: 1, face: 8 };
      else diceConfig = { dice: 2, face: 4 }; // level 5+

      baseDamage = roll(diceConfig.dice).d(diceConfig.face).total;
      hitValue = rollTwenty().total + statMod(actor.attribute.getTotal("control"));
      critValue = rollTwenty().total + statMod(actor.attribute.getTotal("luck"));
    } else {
      // Has weapon: use weapon damage
      const type = getWeaponDamageType(weapon.weaponType);
      const weaponDamage = getWeaponDamageOutput(actor, weapon, type);
      baseDamage = weaponDamage.damage;
      hitValue = weaponDamage.hit;
      critValue = weaponDamage.crit;
    }

    // Add 1d2 per edge charge stack
    let edgeChargeDamage = 0;
    for (let i = 0; i < edgeChargeStacks; i++) {
      edgeChargeDamage += roll(1).d(2).total;
    }
    const rawDamage = baseDamage + planarMod + edgeChargeDamage;
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

