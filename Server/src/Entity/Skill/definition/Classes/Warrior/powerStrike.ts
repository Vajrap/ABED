import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { WarriorSkillId } from "../../../enums";
import type { Character } from "src/Entity/Character/Character";
import { getWeaponDamageOutput } from "src/Utils/getWeaponDamgeOutput";
import type { TurnResult } from "../../../types";
import { buildCombatMessage } from "src/Utils/buildCombatMessage";
import { getTarget } from "src/Entity/Battle/getTarget";
import { ActorEffect, TargetEffect } from "../../../effects";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { resolveDamage } from "src/Entity/Battle/damageResolution";
import { getPositionModifier } from "src/Utils/getPositionModifier";
import { getWeaponDamageType } from "src/Utils/getWeaponDamageType";
import { statMod } from "src/Utils/statMod";
import { skillLevelMultiplier } from "src/Utils/skillScaling";
import { WarriorSkill } from ".";

export const powerStrike = new WarriorSkill({
  id: WarriorSkillId.PowerStrike,
  name: {
    en: "Power Strike",
    th: "โจมตีแรง",
  },
  description: {
    en: "Strong single-target melee attack. Deals 1.3x (1.5x at level 5) weapon damage + Strength mod * skillScalar * positionModifier.",
    th: "การโจมตีระยะประชิดที่รุนแรงต่อเป้าหมายเดียว สร้างความเสียหาย 1.3 เท่า (1.5 เท่าที่เลเวล 5) ของอาวุธ + Strength mod * skillScalar * positionModifier",
  },
  requirement: {},
  equipmentNeeded: [],
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
        element: "fire",
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
    const target = getTarget(actor, targetParty).one();

    if (!target) {
      return {
        content: {
          en: `${actor.name.en} tried to use Power Strike but has no target`,
          th: `${actor.name.th} พยายามใช้โจมตีแรงแต่ไม่พบเป้าหมาย`,
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

    const baseTimes = skillLevel >= 5 ? 1.5 : 1.3;
    const strMod = statMod(actor.attribute.getTotal("strength"));
    const levelScalar = skillLevelMultiplier(skillLevel);

    const positionModifierValue = getPositionModifier(
      actor.position,
      target.position,
      weapon,
    );

    damageOutput.damage =
      (damageOutput.damage * baseTimes + strMod) *
      levelScalar *
      positionModifierValue;

    const totalDamage = resolveDamage(
      actor.id,
      target.id,
      damageOutput,
      location,
    );

    return {
      content: buildCombatMessage(
        actor,
        target,
        { en: "Power Strike", th: "โจมตีแรง" },
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
  },
});

