import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { SkillId } from "../enums";
import { Skill } from "../Skill";
import type { Location } from "src/Entity/Location/Location";
import type { Character } from "src/Entity/Character/Character";
import { getWeaponDamageOutput } from "src/Utils/getWeaponDamgeOutput";
import { Weapon, WeaponPosition } from "src/Entity/Item";
import {
  PROFICIENCY_KEYS,
  type ProficiencyKey,
} from "src/InterFacesEnumsAndTypes/Enums";
import type { TurnResult } from "../types";
import { buildCombatMessage } from "src/Utils/buildCombatMessage";
import { getTarget } from "src/Entity/Battle/getTarget";
import { ActorEffect, TargetEffect } from "../effects";

export const backstab = new Skill({
  id: SkillId.Backstab,
  name: {
    en: "Backstab",
    th: "แทงข้างหลัง",
  },
  description: {
    en: "A deadly finisher that consumes 1 Air + 1 Chaos. Deals 1.5× physical damage with +25% crit chance if target has Fear or Daze. 50% chance to generate 1 None if it crits.",
    th: "การโจมตีจบที่อันตราย ใช้ 1 Air + 1 Chaos สร้างความเสียหายกายภาพ 1.5× และเพิ่มโอกาสคริติคอล 25% ถ้าเป้าหมายมีความกลัวหรือมึนงง มีโอกาส 50% ที่จะสร้าง 1 None ถ้าคริติคอล",
  },
  requirement: {},
  equipmentNeeded: ["dagger", "sword", "machete"], // Melee weapons for backstab
  tier: TierEnum.common,
  consume: {
    hp: 0,
    mp: 0,
    sp: 5,
    elements: [
      {
        element: "wind", // Air element
        value: 1,
      },
      {
        element: "chaos", // Chaos element
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
    location: Location,
  ) => {
    const target = getTarget(actor, targetParty).one().randomly()[0];

    if (!target) {
      return {
        content: {
          en: `${actor.name.en} tried to backstab but has no target`,
          th: `${actor.name.th} พยายามแทงข้างหลังแต่ไม่พบเป้าหมาย`,
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
    const damageOutput = getWeaponDamageOutput(actor, weapon, type);

    const positionModifierValue = positionModifier(
      actor.position,
      target.position,
      weapon,
    );

    // Apply 1.5x damage multiplier for backstab
    damageOutput.damage = damageOutput.damage * 1.5 * positionModifierValue;

    // Check if target has Fear or Daze for crit bonus
    // TODO: Implement proper status effect checking
    const hasFearOrDaze = false; // Placeholder - would check target status effects
    let critBonus = 0;
    if (hasFearOrDaze) {
      critBonus = 25; // +25% crit chance
    }

    // TODO: Implement crit chance bonus in damage calculation
    // TODO: Implement 50% chance to generate 1 None on crit

    const totalDamage = target.receiveDamage(
      damageOutput,
      weapon.weaponData.damage[`${type}DamageType`],
      location,
    );

    let turnResult: TurnResult = {
      content: buildCombatMessage(
        actor,
        target,
        { en: "Backstab", th: "แทงข้างหลัง" },
        totalDamage,
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

    return turnResult;
  },
});

function getWeaponDamageType(
  weaponType: ProficiencyKey,
): "physical" | "magical" {
  const magicItems: ProficiencyKey[] = ["magicWand", "orb", "tome"];
  if (magicItems.includes(weaponType)) {
    return "magical";
  } else {
    return "physical";
  }
}

function positionModifier(
  actorPosition: number,
  targetPosition: number,
  weapon: Weapon,
): number {
  const actorFront = actorPosition <= 2;
  const targetFront = targetPosition <= 2;

  switch (weapon.preferredPosition) {
    case WeaponPosition.Melee:
      if (actorFront && targetFront) return 1;
      if (actorFront || targetFront) return 0.7;
      return 0.4;

    case WeaponPosition.Ranged:
      if (!actorFront && !targetFront) return 1;
      if (actorFront && targetFront) return 0.7;
      return 0.4;

    case WeaponPosition.Versatile:
      if (actorFront && !targetFront) return 1;
      if (!actorFront && targetFront) return 1;
      return 0.7;
  }
}
