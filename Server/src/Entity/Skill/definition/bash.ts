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
import { getWeaponDamageType } from "src/Utils/getWeaponDamageType";
import { statMod } from "src/Utils/statMod";

export const bash = new Skill({
  id: SkillId.Bash,
  name: {
    en: "Bash",
    th: "ทุบสุดแรง",
  },
  description: {
    en: "Swing with your full strength, smashing the enemy with a crushing blow. [Melee attack] Deals 1.4× (+0.05 per skill level) of weapon damage plus your Strength modifier.",
    th: "เหวี่ยงอาวุธอย่างสุดแรง ทุบใส่ศัตรูด้วยพลังทำลายล้างสูง [การโจมตีระยะประชิด] สร้างความเสียหาย 1.4 เท่า (+0.05 ต่อเลเวลสกิล) ของความเสียหายอาวุธ รวมค่าสถานะ STR",
  },
  requirement: {},
  equipmentNeeded: [],
  tier: TierEnum.common,
  consume: {
    hp: 0,
    mp: 0,
    sp: 5,
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
        element: "earth",
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
    const target = getTarget(actor, targetParty).one();

    if (!target) {
      return {
        content: {
          en: `${actor.name.en} tried to bash but has no target`,
          th: `${actor.name.th} พยายามทุบแต่ไม่พบเป้าหมาย`,
        },
        actor: {
          actorId: actor.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    }

    const weapon = actor.getWeapon();
    const damageType = getWeaponDamageType(weapon.weaponType);
    const damageOutput = getWeaponDamageOutput(actor, weapon, damageType);

    const multiplier = 1.4 + 0.05 * skillLevel;

    // Add strength modifier
    const strengthMod = statMod(actor.attribute.getTotal("strength"));

    const positionModifierValue = getPositionModifier(
      actor.position,
      target.position,
      weapon,
    );

    damageOutput.damage =
      (damageOutput.damage * multiplier + strengthMod) * positionModifierValue;

    const totalDamage = resolveDamage(
      actor.id,
      target.id,
      damageOutput,
      location,
    );

    let turnResult: TurnResult = {
      content: buildCombatMessage(
        actor,
        target,
        { en: `Bash`, th: `ทุบสุดแรง` },
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
