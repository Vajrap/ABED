import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { BarbarianSkillId } from "../../../enums";
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
import { BarbarianSkill } from "./index";
import { statMod } from "src/Utils/statMod";
import { buffsAndDebuffsRepository } from "src/Entity/BuffsAndDebuffs/repository";
import { BuffEnum } from "src/Entity/BuffsAndDebuffs/enum";

export const bloodFrenzy = new BarbarianSkill({
  id: BarbarianSkillId.BloodFrenzy,
  name: {
    en: "Blood Frenzy",
    th: "คลั่งเลือด",
  },
  description: {
    text: {
      en: "Strike with blood-fueled frenzy, dealing increased damage when wounded.\nDeal <FORMULA> damage.\nIf HP ≤ {5}'40%':'20%'{/}, damage +25%.\nOn Kill: Extend Rage duration by 1 turn.",
      th: "โจมตีด้วยความคลั่งเลือด สร้างความเสียหายเพิ่มขึ้นเมื่อบาดเจ็บ\nสร้างความเสียหาย <FORMULA>\nหาก HP ≤ {5}'40%':'20%'{/} ความเสียหาย +25%\nเมื่อฆ่า: ขยายระยะเวลา Rage ออกไป 1 เทิร์น",
    },
    formula: {
      en: "<WeaponDamage> × <SkillLevelMultiplier>",
      th: "<WeaponDamage> × <SkillLevelMultiplier>",
    },
  },
  requirement: {},
  equipmentNeeded: ['axe', 'bareHand', 'blade', 'hammer', 'spear', 'sword'],
  tier: TierEnum.uncommon,
  consume: {
    hp: 0,
    mp: 0,
    sp: 4,
    elements: [
      { element: "fire", value: 2 },
    ],
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
          en: `${actor.name.en} tried to use Blood Frenzy but has no target`,
          th: `${actor.name.th} พยายามใช้คลั่งเลือดแต่ไม่พบเป้าหมาย`,
        },
        actor: {
          actorId: actor.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    }

    const weapon = actor.getWeapon();
    const damageTypeMode = 'physical';
    const levelScalar = skillLevelMultiplier(skillLevel);
    const positionModifierValue = getPositionModifier(
      actor.position,
      target.position,
      weapon,
    );

    // Get weapon damage WITHOUT attribute modifiers to add STR mod separately
    const weaponDamage = getWeaponDamageOutput(actor, weapon, damageTypeMode);
    // Get hit/crit WITH modifiers (these don't need special handling)
    
    // Calculate base damage: (weapon damage + STR mod) × skill level multiplier
    const baseDamage = (weaponDamage.damage) * levelScalar;

    // Low HP Bonus: If HP ≤ 20% (40% at level 5), damage +25%
    const hpPercent = (actor.vitals.hp.current / actor.vitals.hp.max) * 100;
    const hpThreshold = skillLevel >= 5 ? 40 : 20;
    const lowHPBonus = hpPercent <= hpThreshold ? 1.25 : 1.0;

    const totalDamage = Math.floor(baseDamage * lowHPBonus * positionModifierValue);

    const damageOutput = {
      damage: totalDamage,
      hit: weaponDamage.hit,
      crit: weaponDamage.crit,
      type: weaponDamage.type,
      isMagic: false,
    };

    const damageResult = resolveDamage(actor.id, target.id, damageOutput, location);

    // On Kill: Extend Rage duration by 1 turn
    let killMessage = "";
    if (damageResult.isHit && target.vitals.isDead) {
      const rage = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.rage);
      if (rage && rage.value > 0) {
        rage.value += 1;
        killMessage = ` Rage extended!`;
      }
    }

    const message = buildCombatMessage(
      actor,
      target,
      { en: "Blood Frenzy", th: "คลั่งเลือด" },
      damageResult,
    );

    return {
      content: {
        en: `${message.en}${killMessage}`,
        th: `${message.th}${killMessage}`,
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

