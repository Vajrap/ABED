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

export const repositioningStrike = new NomadSkill({
  id: NomadSkillId.RepositioningStrike,
  name: {
    en: "Repositioning Strike",
    th: "โจมตีจัดตำแหน่ง",
  },
  description: {
    text: {
      en: "Strike while repositioning the enemy. Deal <FORMULA> damage. If target is in front row, push target to back row (if slot available) and deal +1d4 damage. If target is in back row, pull target to front row (if slot available) and deal +1d4 damage. At level 5, also gain +5 AB gauge if position change succeeds.",
      th: "โจมตีพร้อมจัดตำแหน่งศัตรู. สร้างความเสียหาย <FORMULA>. หากเป้าหมายอยู่ในแถวหน้า ให้ผลักเป้าหมายไปแถวหลัง (หากมีที่ว่าง) และสร้างความเสียหาย +1d4. หากเป้าหมายอยู่ในแถวหลัง ให้ดึงเป้าหมายมาแถวหน้า (หากมีที่ว่าง) และสร้างความเสียหาย +1d4. ที่ระดับ 5, ยังได้รับ +5 AB gauge หากเปลี่ยนตำแหน่งสำเร็จ",
    },
    formula: {
      en: "(Weapon damage + attribute mod) × <SkillLevelMultiplier>",
      th: "(ความเสียหายจากอาวุธ + ค่า modifier) × <SkillLevelMultiplier>",
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
      { element: "wind", value: 1 },
      { element: "fire", value: 1 },
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
          en: `${actor.name.en} tried to use Repositioning Strike but has no target`,
          th: `${actor.name.th} พยายามใช้โจมตีจัดตำแหน่งแต่ไม่พบเป้าหมาย`,
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
    const levelScalar = skillLevelMultiplier(skillLevel);

    // Base damage: (weapon damage + attribute mod) × skill level multiplier
    damageOutput.damage = Math.floor(damageOutput.damage * levelScalar);

    const isTargetFrontRow = target.position <= 2;
    let positionChanged = false;
    let bonusDamage = 0;
    let positionMessage = "";

    // Front Row Push: If target is in front row, push target to back row (if slot available) and deal +1d4 damage
    if (isTargetFrontRow) {
      const allOccupiedPositions = targetParty.map((member) => member.position);
      for (const position of [3, 4, 5] as const) {
        if (!allOccupiedPositions.includes(position)) {
          target.position = position;
          positionChanged = true;
          // Bonus damage dice - should not get bless/curse
          bonusDamage = actor.roll({ amount: 1, face: 4, applyBlessCurse: false });
          positionMessage = ` Pushed ${target.name.en} to back row!`;
          break;
        }
      }
    }
    // Back Row Pull: If target is in back row, pull target to front row (if slot available) and deal +1d4 damage
    else {
      const allOccupiedPositions = targetParty.map((member) => member.position);
      for (const position of [0, 1, 2] as const) {
        if (!allOccupiedPositions.includes(position)) {
          target.position = position;
          positionChanged = true;
          // Bonus damage dice - should not get bless/curse
          bonusDamage = actor.roll({ amount: 1, face: 4, applyBlessCurse: false });
          positionMessage = ` Pulled ${target.name.en} to front row!`;
          break;
        }
      }
    }

    // Add bonus damage if position changed
    if (positionChanged && bonusDamage > 0) {
      damageOutput.damage += bonusDamage;
    }

    // Level 5: Also gain +5 AB gauge if position change succeeds
    let abGaugeMessage = "";
    if (skillLevel >= 5 && positionChanged) {
      actor.abGauge = Math.min(100, actor.abGauge + 5);
      abGaugeMessage = ` ${actor.name.en} gains +5 AB gauge!`;
    }

    const damageResult = resolveDamage(actor.id, target.id, damageOutput, location);
    const message = buildCombatMessage(
      actor,
      target,
      { en: "Repositioning Strike", th: "โจมตีจัดตำแหน่ง" },
      damageResult,
    );

    return {
      content: {
        en: `${message.en}${positionMessage}${abGaugeMessage}`,
        th: `${message.th}${positionMessage ? ` ผลัก/ดึง${target.name.th} ไปแถว${isTargetFrontRow ? "หลัง" : "หน้า"}!` : ""}${abGaugeMessage ? ` ${actor.name.th} ได้รับ +5 AB gauge!` : ""}`,
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

