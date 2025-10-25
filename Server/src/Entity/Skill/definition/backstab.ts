import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { SkillId } from "../enums";
import { Skill } from "../Skill";
import type { Location } from "src/Entity/Location/Location";
import type { Character } from "src/Entity/Character/Character";
import { getWeaponDamageOutput } from "src/Utils/getWeaponDamgeOutput";
import type { TurnResult } from "../types";
import { buildCombatMessage } from "src/Utils/buildCombatMessage";
import { getTarget } from "src/Entity/Battle/getTarget";
import { ActorEffect, TargetEffect } from "../effects";
import { BuffsAndDebuffsEnum } from "src/Entity/BuffsAndDebuffs/enum";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";
import { getPositionModifier } from "src/Utils/getPositionModifier";
import { getWeaponDamageType } from "src/Utils/getWeaponDamageType";
import { resolveDamage } from "src/Entity/Battle/damageResolution";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";

export const backstab = new Skill({
  id: SkillId.Backstab,
  name: {
    en: "Backstab",
    th: "แทงข้างหลัง",
  },
  description: {
    en: "A deadly attack that deals 1.5x (+0.1 per skill level) weapon piercing damage. If the user is in a Hiding state, damage is increased by an additional 0.5x. Gains +25% critical chance if the target is affected by Fear or Daze.",
    th: "การโจมตีที่รุนแรง สร้างความเสียหายแบบแทงทะลุ (piercing) 1.5 เท่าของความเสียหายอาวุธ (+0.1 ต่อเลเวลสกิล) หากอยู่ในสถานะเร้นกาย ความเสียหายจะเพิ่มขึ้นอีก 0.5 เท่า และมีโอกิตคริติคอลเพิ่มขึ้น 25% หากเป้าหมายอยู่ในสถานะหวาดกลัว (Fear) หรือมึนงง (Daze)",
  },
  requirement: {},
  equipmentNeeded: ["dagger"],
  tier: TierEnum.uncommon,
  consume: {
    hp: 0,
    mp: 0,
    sp: 5,
    elements: [
      {
        element: "wind",
        value: 2,
      },
      {
        element: "chaos",
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
    location: LocationsEnum,
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

    const positionModifierValue = getPositionModifier(
      actor.position,
      target.position,
      weapon,
    );

    const baseMultiplier = 1.5 + 0.1 * skillLevel;

    if (actor.buffsAndDebuffs.entry.get(BuffsAndDebuffsEnum.hiding)) {
      damageOutput.damage =
        damageOutput.damage * (baseMultiplier + 0.5) * positionModifierValue;
    } else {
      damageOutput.damage =
        damageOutput.damage * baseMultiplier * positionModifierValue;
    }

    const hasFearOrDaze =
      !!target.buffsAndDebuffs.entry.get(BuffsAndDebuffsEnum.fear) ||
      !!target.buffsAndDebuffs.entry.get(BuffsAndDebuffsEnum.dazed);

    const totalDamage = resolveDamage(actor.id, target.id, damageOutput, location, hasFearOrDaze ? 4 : 0);


    let turnResult: TurnResult = {
      content: buildCombatMessage(
        actor,
        target,
        {
          en: `${actor.name.en} use backstab on ${target.name.en} ${totalDamage.isHit ? `deal ${totalDamage.actualDamage} pierce damage.` : `but missed!`}`,
          th: `${actor.name.th} ใช้ท่าจู่โจมจากด้านหลังใส่ ${target.name.th} ${totalDamage.isHit ? `สร้างความเสียหายแบบเจาะเกราะ ${totalDamage.actualDamage} หน่วย` : `แต่พลาดเป้า!`}`,
        },
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
