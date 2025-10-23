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
import { roll } from "src/Utils/Dice";

export const panicSlash = new Skill({
  id: SkillId.PanicSlash,
  name: {
    en: "Panic Slash",
    th: "ฟันแบบตื่นตระหนก",
  },
  description: {
    en: "A reckless melee attack that consumes 1 Air. Deals 1.0× physical damage with a 25% chance to miss, but grants +10% crit chance if it hits.",
    th: "การโจมตีระยะประชิดแบบไม่คิดหน้าคิดหลัง ใช้ 1 Air สร้างความเสียหายกายภาพ 1.0× มีโอกาสพลาด 25% แต่ถ้าตีโดนจะเพิ่มโอกาสคริติคอล 10%",
  },
  requirement: {},
  equipmentNeeded: ["dagger", "sword", "machete"], // Melee weapons
  tier: TierEnum.common,
  consume: {
    hp: 0,
    mp: 0,
    sp: 3,
    elements: [
      {
        element: "wind", // Air element
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
    location: Location,
  ) => {
    const target = getTarget(actor, targetParty).one().randomly()[0];

    if (!target) {
      return {
        content: {
          en: `${actor.name.en} tried to panic slash but has no target`,
          th: `${actor.name.th} พยายามฟันแบบตื่นตระหนกแต่ไม่พบเป้าหมาย`,
        },
        actor: {
          actorId: actor.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    }

    // Check for miss chance (25%)
    if (roll(1).d(100).total <= 25) {
      return {
        content: {
          en: `${actor.name.en} panicked and missed their wild slash!`,
          th: `${actor.name.th} ตื่นตระหนกและฟันพลาด!`,
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

    damageOutput.damage = damageOutput.damage * positionModifierValue;

    // Apply +10% crit chance (this would need to be implemented in the damage system)
    // TODO: Implement crit chance bonus in damage calculation

    const totalDamage = target.receiveDamage(
      damageOutput,
      weapon.weaponData.damage[`${type}DamageType`],
      location,
    );

    let turnResult: TurnResult = {
      content: buildCombatMessage(
        actor,
        target,
        { en: "Panic Slash", th: "ฟันแบบตื่นตระหนก" },
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
