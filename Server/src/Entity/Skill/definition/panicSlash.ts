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

export const panicSlash = new Skill({
  id: SkillId.PanicSlash,
  name: {
    en: "Panic Slash",
    th: "ฟันแบบตื่นตระหนก",
  },
  description: {
    en: "A reckless melee attack. Deals 1.0× physical damage (+skill Level) with a -4 hit roll penalty, but grants +2 crit roll instead.",
    th: "การโจมตีระยะประชิดแบบไม่คิดหน้าคิดหลัง สร้างความเสียหายกายภาพ 1.0× (+เลเวบของสกิล) โอกาสโจมตีโดนลดลง 4 แต่โอกาสเกิดคริติคอลเพิ่มขึ้น 2",
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
    const target = getTarget(actor, targetParty).one();

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

    const weapon = actor.getWeapon();
    const damageOutput = getWeaponDamageOutput(actor, weapon, "physical");

    damageOutput.hit -= 4;

    damageOutput.crit += 2;

    const positionModifierValue = getPositionModifier(
      actor.position,
      target.position,
      weapon,
    );

    damageOutput.damage = damageOutput.damage * positionModifierValue;

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
