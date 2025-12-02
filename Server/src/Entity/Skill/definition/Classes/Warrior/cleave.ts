import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { WarriorSkillId } from "../../../enums";
import type { Character } from "src/Entity/Character/Character";
import { getWeaponDamageOutput } from "src/Utils/getWeaponDamgeOutput";
import type { TurnResult } from "../../../types";
import { getTarget } from "src/Entity/Battle/getTarget";
import { ActorEffect, TargetEffect } from "../../../effects";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { resolveDamage } from "src/Entity/Battle/damageResolution";
import { getPositionModifier } from "src/Utils/getPositionModifier";
import { WarriorSkill } from ".";
import { skillLevelMultiplier } from "src/Utils/skillScaling";

export const cleave = new WarriorSkill({
  id: WarriorSkillId.Cleave,
  name: {
    en: "Cleave",
    th: "ฟันกวาด",
  },
  description: {
    text: {
      en: "Swing your weapon in a wide arc, cutting through all enemies in the front row.\nDeal <FORMULA> damage to all enemies in the front row.",
      th: "ฟันอาวุธในวงกว้าง ตัดผ่านศัตรูทั้งหมดในแถวหน้า\nสร้างความเสียหาย <FORMULA> ให้ศัตรูทั้งหมดในแถวหน้า",
    },
    formula: {
      en: "({5}'1.2':'1.0'{/} × <WeaponDamage>) × <SkillLevelMultiplier> × <MeleeRangePenalty>",
      th: "({5}'1.2':'1.0'{/} × <WeaponDamage>) × <SkillLevelMultiplier> × <MeleeRangePenalty>",
    },
  },
  requirement: {},
  equipmentNeeded: [
    "sword",
    "axe",
    "blade",
  ], // Slash weapons
  tier: TierEnum.common,
  consume: {
    hp: 0,
    mp: 0,
    sp: 0,
    elements: [
      {
        element: "neutral",
        value: 2,
      },
    ],
  },
  produce: {
    hp: 0,
    mp: 0,
    sp: 0,
    elements: [
      {
        element: "wind",
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
  ) => {
    // Get all targets in front row (front prefer)
    const targets = getTarget(actor, actorParty, targetParty, "enemy").from("frontFirst").all();

    if (!targets || targets.length === 0) {
      return {
        content: {
          en: `${actor.name.en} tried to cleave but has no target`,
          th: `${actor.name.th} พยายามฟันกว้างแต่ไม่พบเป้าหมาย`,
        },
        actor: {
          actorId: actor.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    }

    const weapon = actor.getWeapon();

    // Process all targets
    const targetEffects: { actorId: string; effect: TargetEffect[] }[] = [];

    for (const target of targets) {
      // Get base damage
      const damageOutput = getWeaponDamageOutput(actor, weapon, "physical");

      const positionModifierValue = getPositionModifier(
        actor.position,
        target.position,
        weapon,
      );

      // Cleave deals 1x weapon damage (1.2x at level 5)
      // Note: getWeaponDamageOutput already includes attribute modifiers
      const baseTimes = skillLevel >= 5 ? 1.2 : 1.0;
      const levelScalar = skillLevelMultiplier(skillLevel);

      damageOutput.damage =
        (damageOutput.damage * baseTimes) *
        levelScalar *
        positionModifierValue;

      const totalDamage = resolveDamage(
        actor.id,
        target.id,
        damageOutput,
        location,
      );

      targetEffects.push({
        actorId: target.id,
        effect: [TargetEffect.TestSkill],
      });
    }

    let turnResult: TurnResult = {
      content: {
        en: `Cleave`,
        th: `ฟันกวาด`,
      },
      actor: {
        actorId: actor.id,
        effect: [ActorEffect.TestSkill],
      },
      targets: targetEffects,
    };

    return turnResult;
  },
});
