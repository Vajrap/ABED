import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { WarriorSkillId } from "../../../enums";
import type { Character } from "src/Entity/Character/Character";
import { getWeaponDamageOutput } from "src/Utils/getWeaponDamgeOutput";
import type { TurnResult } from "../../../types";
import { buildCombatMessage } from "src/Utils/buildCombatMessage";
import { getTarget } from "src/Entity/Battle/getTarget";
import { ActorEffect, TargetEffect } from "../../../effects";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { resolveDamage } from "src/Entity/Battle/damageResolution";
import { WarriorSkill } from ".";
import { debuffsRepository } from "src/Entity/BuffsAndDebuffs/repository";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";

export const weaponAdaptation = new WarriorSkill({
  id: WarriorSkillId.WeaponAdaptation,
  name: {
    en: "Weapon Adaptation",
    th: "ปรับตัวอาวุธ",
  },
  description: {
    text: {
      en: "Adapt your attack to your weapon's nature, dealing special effect.\nDeal <FORMULA> damage.\n<FORMULA_EFFECT>",
      th: "ปรับตัวการโจมตีให้เข้ากับธรรมชาติของอาวุธ สร้างผลพิเศษ\nสร้างความเสียหาย <FORMULA>\n<FORMULA_EFFECT>",
    },
    formula: {
      en: "<WeaponDamage>",
      th: "<WeaponDamage>",
    },
  },
  requirement: {},
  equipmentNeeded: [],
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
          en: `${actor.name.en} tried to use Weapon Adaptation but has no target`,
          th: `${actor.name.th} พยายามใช้ปรับตัวอาวุธแต่ไม่พบเป้าหมาย`,
        },
        actor: {
          actorId: actor.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    }

    const weapon = actor.getWeapon();
    const damageOutput = getWeaponDamageOutput(actor, weapon, "physical");
    
    // Determine weapon's physical damage type
    const weaponDamageType = weapon.weaponData.damage.physicalDamageType;
    
    // Apply special effect based on weapon damage type
    let effectMessage = "";
    
    if (weaponDamageType === DamageType.slash) {
      // Slash: DC 8 END save or bleed
      const damageResult = resolveDamage(actor.id, target.id, damageOutput, location);
      const message = buildCombatMessage(
        actor,
        target,
        { en: "Weapon Adaptation", th: "ปรับตัวอาวุธ" },
        damageResult,
      );
      
      if (damageResult.isHit) {
        const saveRoll = target.rollSave("endurance");
        if (saveRoll < 8) {
          // Save failed: apply bleed (1d3 stacks)
          const bleedStacks = actor.roll({ amount: 1, face: 3, applyBlessCurse: false });
          debuffsRepository.bleed.appender(target, { turnsAppending: bleedStacks });
          effectMessage = ` ${target.name.en} failed the save and is bleeding!`;
        }
      }
      
      return {
        content: {
          en: `${message.en}${effectMessage}`,
          th: `${message.th}${effectMessage}`,
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
    } else if (weaponDamageType === DamageType.blunt) {
      // Blunt: reduce target AB gauge by 10
      const damageResult = resolveDamage(actor.id, target.id, damageOutput, location);
      const message = buildCombatMessage(
        actor,
        target,
        { en: "Weapon Adaptation", th: "ปรับตัวอาวุธ" },
        damageResult,
      );
      
      if (damageResult.isHit) {
        const initialGauge = target.abGauge;
        target.abGauge = Math.max(0, target.abGauge - 10);
        const reduced = initialGauge - target.abGauge;
        effectMessage = ` ${target.name.en} lost ${reduced} AB gauge!`;
      }
      
      return {
        content: {
          en: `${message.en}${effectMessage}`,
          th: `${message.th}${effectMessage}`,
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
    } else if (weaponDamageType === DamageType.pierce) {
      // Pierce: negate 2 pDEF (ignore 2 pDEF during this attack)
      damageOutput.ignorePDEF = 2;
      const damageResult = resolveDamage(actor.id, target.id, damageOutput, location);
      const message = buildCombatMessage(
        actor,
        target,
        { en: "Weapon Adaptation", th: "ปรับตัวอาวุธ" },
        damageResult,
      );
      
      return {
        content: {
          en: `${message.en} (Pierced through defenses!)`,
          th: `${message.th} (เจาะทะลุป้องกัน!)`,
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
    } else {
      // Fallback: just deal damage (shouldn't happen for physical weapons)
      const damageResult = resolveDamage(actor.id, target.id, damageOutput, location);
      const message = buildCombatMessage(
        actor,
        target,
        { en: "Weapon Adaptation", th: "ปรับตัวอาวุธ" },
        damageResult,
      );
      
      return {
        content: {
          en: message.en,
          th: message.th,
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
    }
  },
});

