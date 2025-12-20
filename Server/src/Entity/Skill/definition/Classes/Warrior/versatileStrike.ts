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
import { getPositionModifier } from "src/Utils/getPositionModifier";
import { skillLevelMultiplier } from "src/Utils/skillScaling";
import { WarriorSkill } from ".";
import { debuffsRepository } from "src/Entity/BuffsAndDebuffs/repository";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";
import { statMod } from "src/Utils/statMod";

export const versatileStrike = new WarriorSkill({
  id: WarriorSkillId.VersatileStrike,
  name: {
    en: "Versatile Strike",
    th: "โจมตีหลากหลาย",
  },
  description: {
    text: {
      en: "Strike with adaptive technique, exploiting every aspect of your weapon.\nDeal <FORMULA> damage.\n<FORMULA_EFFECT>\nVersatility Bonus: Trigger one additional effect from another damage type (random, excluding the base one).",
      th: "โจมตีด้วยเทคนิคปรับตัว ใช้ประโยชน์จากทุกด้านของอาวุธ\nสร้างความเสียหาย <FORMULA>\n<FORMULA_EFFECT>\nโบนัสความหลากหลาย: เปิดใช้งานผลพิเศษเพิ่มเติมจากประเภทความเสียหายอื่นหนึ่งประเภท (สุ่ม ไม่รวมประเภทพื้นฐาน)",
    },
    formula: {
      en: "<WeaponDamage> × <SkillLevelMultiplier>",
      th: "<WeaponDamage> × <SkillLevelMultiplier>",
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
      { element: "neutral", value: 2 },
    ],
  },
  produce: {
    hp: 0,
    mp: 0,
    sp: 0,
    elements: [
      { element: "fire", min: 1, max: 1 },
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
          en: `${actor.name.en} tried to use Versatile Strike but has no target`,
          th: `${actor.name.th} พยายามใช้โจมตีหลากหลายแต่ไม่พบเป้าหมาย`,
        },
        actor: {
          actorId: actor.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    }

    const weapon = actor.getWeapon();
    const weaponDamage = getWeaponDamageOutput(actor, weapon, "physical", false); // Get base damage without mods
    const levelScalar = skillLevelMultiplier(skillLevel);
    const positionModifierValue = getPositionModifier(
      actor.position,
      target.position,
      weapon,
    );

    // Base damage: Weapon damage + (STR mod or DEX mod, whichever is higher) × skill level multiplier
    const baseDamage = (weaponDamage.damage * levelScalar) * positionModifierValue;

    // Get weapon's physical damage type
    const weaponDamageType = weapon.weaponData.damage.physicalDamageType;

    // Versatility Bonus: Determine random additional effect type before calculating damage
    const otherDamageTypes = [DamageType.slash, DamageType.blunt, DamageType.pierce].filter(
      (type) => type !== weaponDamageType
    );
    const randomOtherType = otherDamageTypes[Math.floor(Math.random() * otherDamageTypes.length)]!;
    
    // Apply pDEF ignore if base type is Pierce or versatility bonus is Pierce
    let ignorePDEF = 0;
    if (weaponDamageType === DamageType.pierce) {
      ignorePDEF = skillLevel >= 5 ? 4 : 2;
    } else if (randomOtherType === DamageType.pierce) {
      // Versatility bonus Pierce: also ignore pDEF
      ignorePDEF = skillLevel >= 5 ? 4 : 2;
    }
    
    const damageOutput = {
      damage: Math.floor(baseDamage),
      hit: weaponDamage.hit,
      crit: weaponDamage.crit,
      type: weaponDamageType,
      isMagic: false,
      ignorePDEF: ignorePDEF > 0 ? ignorePDEF : undefined,
    };

    // Apply base effect based on weapon damage type
    const damageResult = resolveDamage(actor.id, target.id, damageOutput, location);
    const message = buildCombatMessage(
      actor,
      target,
      { en: "Versatile Strike", th: "โจมตีหลากหลาย" },
      damageResult,
    );

    let effectMessages: string[] = [];

    // Base effect based on weapon damage type
    if (weaponDamageType === DamageType.slash) {
      // Slash: Apply Bleed (DC8 END save negates, DC10 at level 5)
      if (damageResult.isHit) {
        const dc = skillLevel >= 5 ? 10 : 8;
        const saveRoll = target.rollSave("endurance");
        if (saveRoll < dc) {
          const bleedStacks = actor.roll({ amount: 1, face: 3, applyBlessCurse: false });
          debuffsRepository.bleed.appender(target, { turnsAppending: bleedStacks });
          effectMessages.push(`Bleed applied!`);
        }
      }
    } else if (weaponDamageType === DamageType.blunt) {
      // Blunt: Reduce target AB gauge by 10 (15 at level 5)
      if (damageResult.isHit) {
        const reduction = skillLevel >= 5 ? 15 : 10;
        const initialGauge = target.abGauge;
        target.abGauge = Math.max(0, target.abGauge - reduction);
        const reduced = initialGauge - target.abGauge;
        effectMessages.push(`AB gauge reduced by ${reduced}!`);
      }
    } else if (weaponDamageType === DamageType.pierce) {
      // Pierce: Ignore pDEF (already applied via ignorePDEF)
      effectMessages.push(`Pierced defenses!`);
    }

    // Versatility Bonus: Apply additional effect (already determined above)
    if (damageResult.isHit) {
      if (randomOtherType === DamageType.slash) {
        // Apply Bleed
        const dc = skillLevel >= 5 ? 10 : 8;
        const saveRoll = target.rollSave("endurance");
        if (saveRoll < dc) {
          const bleedStacks = actor.roll({ amount: 1, face: 3, applyBlessCurse: false });
          debuffsRepository.bleed.appender(target, { turnsAppending: bleedStacks });
          effectMessages.push(`Versatility: Bleed applied!`);
        }
      } else if (randomOtherType === DamageType.blunt) {
        // Reduce AB gauge
        const reduction = skillLevel >= 5 ? 15 : 10;
        const initialGauge = target.abGauge;
        target.abGauge = Math.max(0, target.abGauge - reduction);
        const reduced = initialGauge - target.abGauge;
        effectMessages.push(`Versatility: AB gauge reduced by ${reduced}!`);
      } else if (randomOtherType === DamageType.pierce) {
        // Pierce versatility bonus: pDEF ignore was already applied in damage calculation
        effectMessages.push(`Versatility: Pierced defenses!`);
      }
    }

    return {
      content: {
        en: `${message.en} ${effectMessages.join(" ")}`,
        th: `${message.th} ${effectMessages.join(" ")}`,
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

