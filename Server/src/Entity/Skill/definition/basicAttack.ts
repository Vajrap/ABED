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

export const basicAttack = new Skill({
  id: SkillId.Basic,
  name: {
    en: "Basic Attack",
    th: "โจมตีปกติ",
  },
  description: {
    en: "A basic attack, dealing damage equal to weapon's damage (+ modifier)",
    th: "การโจมตีปกติ สร้างความเสียหายเท่ากับความเสียหายจากอาวุธ (+ modifier)",
  },
  requirement: {},
  equipmentNeeded: [],
  tier: TierEnum.common,
  consume: {
    hp: 0,
    mp: 0,
    sp: 2,
    elements: [],
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
    // TODO: Get target methods;
    const target = getTarget(actor, targetParty).one().randomly()[0];

    if (!target) {
      return {
        content: {
          en: `${actor.name.en} tried to attack with basic attack but has no target`,
          th: `${actor.name.th} พยายามโจมตีด้วยการโจมตีปกติแต่ไม่พบเป้าหมาย`,
        },
        actor: {
          actorId: actor.id,
          effect: "ActTestSkill",
        },
        targets: [],
      };
    }
    // Let's say it deal 1.2 weaponDamage
    const weapon = actor.getWeapon();
    const type = getWeaponDamageType(weapon.weaponType);
    const damageOutput = getWeaponDamageOutput(actor, weapon, type);

    const positionMidifier = positionModifier(
      actor.position,
      target.position,
      weapon,
    );

    damageOutput.damage = damageOutput.damage * positionMidifier;

    const totalDamage = target.receiveDamage(
      damageOutput,
      weapon.weaponData.damage[`${type}DamageType`],
      location,
    );

    let turnResult: TurnResult = {
      content: buildCombatMessage(
        actor,
        target,
        { en: "Basic Attack", th: "การโจตีปกติ" },
        totalDamage,
      ),
      actor: {
        actorId: actor.id,
        effect: "ActTestSkill",
      },
      targets: [
        {
          actorId: target.id,
          effect: "TarTestSkill",
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
