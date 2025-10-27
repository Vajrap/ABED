import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { SkillId } from "../enums";
import { Skill } from "../Skill";
import type { Character } from "src/Entity/Character/Character";
import type { TurnResult } from "../types";
import { buildCombatMessage } from "src/Utils/buildCombatMessage";
import { getTarget } from "src/Entity/Battle/getTarget";
import { rollTwenty } from "src/Utils/Dice";
import { getDamageOutput } from "src/Utils/getDamgeOutput";
import { statMod } from "src/Utils/statMod";
import { buffsAndDebuffsRepository } from "src/Entity/BuffsAndDebuffs/repository";
import { ActorEffect, TargetEffect } from "../effects";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { resolveDamage } from "src/Entity/Battle/damageResolution";

export const throwPebble = new Skill({
  id: SkillId.ThrowPebble,
  name: {
    en: "Throw Pebble",
    th: "ขว้างก้อนหิน",
  },
  description: {
    en: "A simple ranged attack with a pebble. Deals 1d6 blunt damage. If hit, roll 1D20 (+self STR mod) VS. DC15 (+target END mod) to daze the target.",
    th: "การโจมตีระยะไกลด้วยก้อนหิน สร้างความเสียหาย blunt 1d6 หน่วย หากโจมตีถูกเป้าหมาย ทอย 1D20 (+self STR mod) VS. DC15 (+target END mod) ถ้าสำเร็จจะทำให้เป้าหมายสับสน",
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
        element: "neutral",
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
    const target = getTarget(actor, targetParty).one();

    if (!target) {
      return {
        content: {
          en: `${actor.name.en} tried to throw a pebble but has no target`,
          th: `${actor.name.th} พยายามขว้างก้อนหินแต่ไม่พบเป้าหมาย`,
        },
        actor: {
          actorId: actor.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    }

    const damageOutput = getDamageOutput(
      actor,
      1,
      6,
      ["strength"],
      0,
      ["dexterity"],
      0,
      [],
    );
    if (actor.position > 2) {
      // If user is in the backrow
      if (target.position > 2) {
        // and target is in the backrow
        // too far
        damageOutput.damage = damageOutput.damage * 0.8;
      } else {
        // But the target is in the frontrow
        // good position
        damageOutput.damage = damageOutput.damage * 1.2;
      }
    } else {
      // If user is in the frontrow
      if (target.position > 2) {
        // And the target is in the backrow
        // good position
        damageOutput.damage = damageOutput.damage * 1.2;
      } else {
        // And the target is in the frontrow
        // too close
        damageOutput.damage = damageOutput.damage * 0.8;
      }
    }

    const totalDamage = resolveDamage(actor.id, target.id, damageOutput, location);

    const isHit = totalDamage.isHit;

    let dazedHit = false;
    if (isHit) {
      const roll = rollTwenty().total;
      if (
        roll + statMod(actor.attribute.getTotal("strength")) >=
        15 + statMod(target.attribute.getTotal("endurance"))
      ) {
        dazedHit = true;
        buffsAndDebuffsRepository.dazed.appender(target, 1, false, 0);
      }
    }

    const targetEffect = dazedHit
      ? [TargetEffect.BluntOne, TargetEffect.Dazed]
      : isHit
        ? [TargetEffect.BluntOne]
        : [TargetEffect.Dodge];

    let turnResult: TurnResult = {
      content: buildCombatMessage(
        actor,
        target,
        {
          en: `${actor.name.en} Throw Pebble at ${target.name.en} deal ${totalDamage.actualDamage} blunt damage. ${dazedHit ? "And dazed the target." : ""}`,
          th: `${actor.name.th} ขว้างก้อนหินใส่ ${target.name.th} สร้างความเสียหาย blunt ${totalDamage.actualDamage} หน่วย. ${dazedHit ? "และทำให้เป้าหมายสับสน." : ""}`,
        },
        totalDamage,
      ),
      actor: {
        actorId: actor.id,
        effect: [ActorEffect.BluntOne],
      },
      targets: [
        {
          actorId: target.id,
          effect: targetEffect,
        },
      ],
    };

    return turnResult;
  },
});
