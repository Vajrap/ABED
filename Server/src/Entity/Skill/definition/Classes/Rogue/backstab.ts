import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { RogueSkillId } from "../../../enums";
import type { Character } from "src/Entity/Character/Character";
import { getWeaponDamageOutput } from "src/Utils/getWeaponDamgeOutput";
import type { TurnResult } from "../../../types";
import { buildCombatMessage } from "src/Utils/buildCombatMessage";
import { getTarget } from "src/Entity/Battle/getTarget";
import { ActorEffect, TargetEffect } from "../../../effects";
import { BuffEnum, DebuffEnum } from "src/Entity/BuffsAndDebuffs/enum";
import { getPositionModifier } from "src/Utils/getPositionModifier";
import { getWeaponDamageType } from "src/Utils/getWeaponDamageType";
import { resolveDamage } from "src/Entity/Battle/damageResolution";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { RogueSkill } from "./index";

export const backstab = new RogueSkill({
  id: RogueSkillId.Backstab,
  name: {
    en: "Backstab",
    th: "แทงข้างหลัง",
  },
  description: {
    en: "Slip into your enemy’s blind spot and drive your blade deep. The user must be in hiding state, Deals 1.3× weapon damage + Dexterity mod * (+0.1 per skill level). Gains +4 critical roll if the target is Frightened or Dazed. If skill level reached 5 the base damage went up to 1.5 times weapon damage and critical roll + 5.",
    th: "เคลื่อนไหวจากเงามืด แทงทะลุจุดอ่อนของศัตรูสร้างความเสียหายแบบแทงทะลุ (Piercing) 1.3 เท่า (+0.1 ต่อเลเวลสกิล) ของความเสียหายอาวุธหากอยู่ในสถานะเร้นกาย ความเสียหายจะเพิ่มขึ้นอีก 0.5 เท่าและ critical roll เพิ่มขึ้น 4 หน่วย หากเป้าหมายอยู่ในสถานะ “หวาดกลัว” หรือ “มึนงง. เมื่อเลเวลสกิลถึง 5 ความเสียหายเพิ่มเป็น 1.5 เท่าและ critical roll 5 หน่วย”",
  },
  requirement: {},
  equipmentNeeded: ["dagger"],
  existBuff: [BuffEnum.hiding],
  tier: TierEnum.uncommon,
  consume: {
    hp: 0,
    mp: 0,
    sp: 5,
    elements: [
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
    const target = getTarget(actor, actorParty, targetParty, "enemy").from("backFirst").one();

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

    const baseTimes = skillLevel >= 5 ? 1.5 : 1.3;
    const baseMultiplier = baseTimes + 0.1 * skillLevel;

    if (actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.hiding)) {
      damageOutput.damage =
        damageOutput.damage * (baseMultiplier + 0.5) * positionModifierValue;
    } else {
      damageOutput.damage =
        damageOutput.damage * baseMultiplier * positionModifierValue;
    }

    const additionCrit = skillLevel >= 5 ? 5 : 4;
    const hasFearOrDaze =
      !!target.buffsAndDebuffs.debuffs.entry.get(DebuffEnum.fear) ||
      !!target.buffsAndDebuffs.debuffs.entry.get(DebuffEnum.dazed);

    const totalDamage = resolveDamage(
      actor.id,
      target.id,
      damageOutput,
      location,
      hasFearOrDaze ? additionCrit : 0,
    );

    let turnResult: TurnResult = {
      content: buildCombatMessage(
        actor,
        target,
        {
          en: `backstab`,
          th: `แทงข้างหลัง`,
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
