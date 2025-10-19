import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { SkillId } from "../enums";
import { Skill } from "../Skill";
import type { Character } from "src/Entity/Character/Character";
import type { Location } from "src/Entity/Location/Location";
import type { TurnResult } from "../types";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";
import { getWeaponDamageOutput } from "src/Utils/getWeaponDamgeOutput";
import { buildCombatMessage } from "src/Utils/buildCombatMessage";

export const testSkill2 = new Skill({
  id: SkillId.Test,
  name: {
    en: "Test Skill 2",
    th: "Test Skill 2",
  },
  description: {
    en: "A Test Skill 2, dealing arcane damage 1.2 times of weapon magical damage + skill level (+pla)",
    th: "Test Skill 2 สร้างความเสียหาย arcane 1.2 เท่าของความเสียหายเวทย์มนต์จากอาวุธ + ระดับสกิล (+pla)",
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
        min: 0,
        max: 1,
      },
      {
        element: "chaos",
        min: 0,
        max: 1,
      },
    ],
  },
  exec: (
    actor: Character,
    target: Character,
    skillLevel: number,
    location: Location,
  ) => {
    // Let's say it deal 1.2 weaponDamage
    const weapon = actor.getWeapon();
    const damageOutput = getWeaponDamageOutput(actor, weapon, "magical");
    damageOutput.damage *= 1.2;
    damageOutput.damage += skillLevel;

    const totalDamage = target.receiveDamage(
      damageOutput,
      DamageType.arcane,
      location,
    );

    let turnResult: TurnResult = {
      content: buildCombatMessage(
        actor,
        target,
        { en: "Test Skill 2", th: "Test Skill 2" },
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
