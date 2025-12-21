import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { ScholarSkillId } from "../../../enums";
import type { Character } from "src/Entity/Character/Character";
import type { TurnResult } from "../../../types";
import { getTarget } from "src/Entity/Battle/getTarget";
import { ActorEffect, TargetEffect } from "../../../effects";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { resolveDamage } from "src/Entity/Battle/damageResolution";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";
import { statMod } from "src/Utils/statMod";
import { buildCombatMessage } from "src/Utils/buildCombatMessage";
import { skillLevelMultiplier } from "src/Utils/skillScaling";
import { getWeaponDamageOutput } from "src/Utils/getWeaponDamgeOutput";
import { getWeaponDamageType } from "src/Utils/getWeaponDamageType";
import { getPositionModifier } from "src/Utils/getPositionModifier";
import { ScholarSkill } from "./index";
import { buffsAndDebuffsRepository } from "src/Entity/BuffsAndDebuffs/repository";

export const debilitatingStrike = new ScholarSkill({
  id: ScholarSkillId.DebilitatingStrike,
  name: {
    en: "Debilitating Strike",
    th: "โจมตีที่ทำให้อ่อนแอ",
  },
  description: {
    text: {
      en: "Strike with debilitating precision, exploiting vulnerabilities.\nDeal <FORMULA> arcane damage.\n[r]Deal +1d4 damage[/r] if target has ≥2 debuffs.\nIf target has ≥3 debuffs, also apply <DebuffSlow> for 1 turn.",
      th: "โจมตีด้วยความแม่นยำที่ทำให้อ่อนแอ ใช้ประโยชน์จากจุดอ่อน\nสร้างความเสียหาย arcane <FORMULA>\n[r]สร้างความเสียหายเพิ่ม +1d4[/r] หากเป้าหมายมีดีบัฟ ≥2 ตัว\nหากเป้าหมายมีดีบัฟ ≥3 ตัว ยังเพิ่ม <DebuffSlow> 1 เทิร์นด้วย",
    },
    formula: {
      en: "([r]0.8[/r] × <WeaponDamage> + <INTmod>) × <SkillLevelMultiplier>",
      th: "([r]0.8[/r] × <WeaponDamage> + <INTmod>) × <SkillLevelMultiplier>",
    },
  },
  requirement: {},
  equipmentNeeded: ["blade", "sword", "dagger"],
  tier: TierEnum.common,
  isFallback: false, // DebilitatingStrike: consumes 1 order element
  consume: {
    hp: 0,
    mp: 0,
    sp: 3,
    elements: [
      {
        element: "order",
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
          en: `${actor.name.en} tried to use Debilitating Strike but has no target`,
          th: `${actor.name.th} พยายามใช้โจมตีที่ทำให้อ่อนแอแต่ไม่พบเป้าหมาย`,
        },
        actor: {
          actorId: actor.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    }

    const weapon = actor.getWeapon();
    const type = getWeaponDamageType(weapon.weaponType);
    // Get base weapon damage without attribute modifiers
    const weaponDamage = getWeaponDamageOutput(actor, weapon, type, false);
    const positionModifier = getPositionModifier(actor.position, target.position, weapon);
    const levelScalar = skillLevelMultiplier(skillLevel);
    const intMod = statMod(actor.attribute.getTotal("intelligence"));

    // Damage: (0.8× weapon damage + INT mod) × skill level multiplier
    const weaponBaseDamage = weaponDamage.damage * 0.8;
    const totalDamage = Math.floor((weaponBaseDamage + intMod) * levelScalar * positionModifier);

    // Check debuff count
    const debuffCount = target.buffsAndDebuffs.debuffs.entry.size;
    let bonusDamage = 0;
    let slowMessage = "";

    // Debuff Bonus: If target has ≥2 debuffs, deal +1d4 damage
    if (debuffCount >= 2) {
      bonusDamage = actor.roll({ amount: 1, face: 4, applyBlessCurse: false });
    }

    // Multi-Debuff: If target has ≥3 debuffs, also apply Slow debuff for 1 turn
    if (debuffCount >= 3) {
      buffsAndDebuffsRepository.slow.appender(target, { turnsAppending: 1 });
      slowMessage = ` ${target.name.en} is slowed!`;
    }

    // Arcane damage uses CONTROL for hit, LUCK for crit
    const damageOutput = {
      damage: totalDamage + bonusDamage,
      hit: actor.rollTwenty({stat: 'control'}),
      crit: actor.rollTwenty({stat: 'luck'}),
      type: DamageType.arcane,
      isMagic: true,
    };

    const damageResult = resolveDamage(actor.id, target.id, damageOutput, location);
    const message = buildCombatMessage(
      actor,
      target,
      { en: "Debilitating Strike", th: "โจมตีที่ทำให้อ่อนแอ" },
      damageResult,
    );

    const bonusMessage = bonusDamage > 0 ? ` +${bonusDamage} (≥2 debuffs)` : "";

    return {
      content: {
        en: `${message.en}${bonusMessage}${slowMessage}`,
        th: `${message.th}${bonusDamage > 0 ? ` +${bonusDamage} (≥2 ดีบัฟ)` : ""}${slowMessage}`,
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

