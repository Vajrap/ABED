import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { SkillId } from "../enums";
import { Skill } from "../Skill";
import type { Character } from "src/Entity/Character/Character";
import { getWeaponDamageOutput } from "src/Utils/getWeaponDamgeOutput";
import type { TurnResult } from "../types";
import { getTarget } from "src/Entity/Battle/getTarget";
import { ActorEffect, TargetEffect } from "../effects";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { resolveDamage } from "src/Entity/Battle/damageResolution";
import { getPositionModifier } from "src/Utils/getPositionModifier";

export const cleave = new Skill({
  id: SkillId.Cleave,
  name: {
    en: "Cleave",
    th: "ฟันกวาด",
  },
  description: {
    en: "A sweeping attack deals 1.0× weapon damage to all enemies in the front most row. At level 5 damage increase to 1.2× weapon damage",
    th: "การโจมตีแบบกว้าง สร้างความเสียหาย 1.0 เท่าให้ศัตรูทั้งหมดในแถวหน้าสุด. เมื่อเลเวล 5 ความเสียหายเพิ่มเป็น 1.2 เท่า",
  },
  requirement: {},
  equipmentNeeded: [
    "sword",
    "axe",
    "blade",
  ], // Slash weapons
  tier: TierEnum.uncommon,
  consume: {
    hp: 0,
    mp: 0,
    sp: 6,
    elements: [
      {
        element: "fire",
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
        element: "neutral",
        min: 0,
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
    const targets = getTarget(actor, targetParty).from("frontFirst").all();

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

      // Cleave deals 1x weapon damage
      const baseTimes = skillLevel >= 5 ? 1.0 : 1.2;

      damageOutput.damage =
        damageOutput.damage *
        (baseTimes + skillLevel * 0.1) *
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
