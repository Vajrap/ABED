import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { SkillId } from "../enums";
import { Skill } from "../Skill";
import type { Character } from "src/Entity/Character/Character";
import { getWeaponDamageOutput } from "src/Utils/getWeaponDamgeOutput";
import type { TurnResult } from "../types";
import { buildCombatMessage } from "src/Utils/buildCombatMessage";
import { getTarget } from "src/Entity/Battle/getTarget";
import { ActorEffect, TargetEffect } from "../effects";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { resolveDamage } from "src/Entity/Battle/damageResolution";
import { getPositionModifier } from "src/Utils/getPositionModifier";

export const cleave = new Skill({
  id: SkillId.Cleave,
  name: {
    en: "Cleave",
    th: "ฟันกว้าง",
  },
  description: {
    en: "A sweeping attack that consumes 2 Fire. Deals 1.0× weapon damage to all enemies in the front row. Requires slash weapons like sword or axe.",
    th: "การโจมตีแบบกว้าง ใช้ 2 Fire สร้างความเสียหาย 1.0 เท่าให้ศัตรูทั้งหมดในแถวหน้า ต้องใช้อาวุธแบบฟันเช่นดาบหรือขวาน",
  },
  requirement: {},
  equipmentNeeded: ["sword", "axe", "machete", "blade", "scimitar", "zanmadao", "warAxe", "greatSword"], // Slash weapons
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
        element: "none",
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
    const targets = getTarget(actor, targetParty)
      .from("frontPrefer")
      .all();

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
      damageOutput.damage = (damageOutput.damage * positionModifierValue) * (skillLevel * 0.1);

      const totalDamage = resolveDamage(actor.id, target.id, damageOutput, location);

      targetEffects.push({
        actorId: target.id,
        effect: [TargetEffect.TestSkill],
      });
    }

    let turnResult: TurnResult = {
      content: {
        en: `${actor.name.en} cleaved ${targets.length} enemies!`,
        th: `${actor.name.th} ฟันกว้างใส่ศัตรู ${targets.length} ตัว!`,
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
