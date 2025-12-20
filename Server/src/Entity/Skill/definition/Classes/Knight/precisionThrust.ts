import type { Character } from "src/Entity/Character/Character";
import { resolveDamage } from "src/Entity/Battle/damageResolution";
import { getTarget } from "src/Entity/Battle/getTarget";
import { KnightSkillId } from "../../../enums";
import { KnightSkill } from "./index";
import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import type { TurnResult } from "../../../types";
import { ActorEffect, TargetEffect } from "../../../effects";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { getWeaponDamageType } from "src/Utils/getWeaponDamageType";
import { getWeaponDamageOutput } from "src/Utils/getWeaponDamgeOutput";
import { getPositionModifier } from "src/Utils/getPositionModifier";
import { buildCombatMessage } from "src/Utils/buildCombatMessage";
import type { ProficiencyKey } from "src/InterFacesEnumsAndTypes/Enums";

const allowedWeapons: ProficiencyKey[] = ["sword", "spear"];

export const precisionThrust = new KnightSkill({
  id: KnightSkillId.PrecisionThrust,
  name: {
    en: "Precision Thrust",
    th: "แทงทะลุจุด",
  },
  description: {
    text: {
      en: "Lunge at a front-line foe with surgical accuracy, finding the perfect opening.\nDeal <FORMULA> damage.with [b]+3 hit[/b].\n[b]Gains bonus crit[/b] if target has any debuff.",
      th: "พุ่งแทงศัตรูแถวหน้าอย่างแม่นยำ หาช่องว่างที่สมบูรณ์แบบ\nสร้างความเสียหาย <FORMULA> พร้อมกับ [b]+3 hit[/b]\n[b]ได้รับ crit เพิ่ม[/b] หากเป้าหมายมีดีบัฟ",
    },
    formula: {
      en: "<WeaponDamage> × (1 + 0.1 × skill level) × <MeleeRangePenalty>",
      th: "<WeaponDamage> × (1 + 0.1 × เลเวลสกิล) × <MeleeRangePenalty>",
    },
  },
  requirement: {},
  equipmentNeeded: allowedWeapons,
  tier: TierEnum.uncommon,
  consume: {
    hp: 0,
    mp: 0,
    sp: 3,
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
    const target = getTarget(actor, actorParty, targetParty, "enemy")
      .from("frontFirst")
      .one();
    if (!target) {
      return {
        content: {
          en: `${actor.name.en} attempts a precision thrust, but there is no viable target.`,
          th: `${actor.name.th} พยายามแทงทะลุจุด แต่ไม่มีเป้าหมายที่เหมาะสม`,
        },
        actor: {
          actorId: actor.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    }

    const weapon = actor.getWeapon();
    if (!allowedWeapons.includes(weapon.weaponType as ProficiencyKey)) {
      return {
        content: {
          en: `${actor.name.en} needs a sword or spear to execute Precision Thrust.`,
          th: `${actor.name.th} ต้องใช้อาวุธประเภทดาบหรือหอกเพื่อใช้ท่าแทงทะลุจุด`,
        },
        actor: {
          actorId: actor.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    }

    const damageKind = getWeaponDamageType(weapon.weaponType);
    const damageOutput = getWeaponDamageOutput(actor, weapon, damageKind);
    const positionModifier = getPositionModifier(
      actor.position,
      target.position,
      weapon,
    );
    // Note: getWeaponDamageOutput already includes attribute modifiers
    const scale = 1 + 0.1 * skillLevel;

    damageOutput.damage =
      damageOutput.damage * scale * positionModifier;
    damageOutput.hit += 3;

    const hasAnyDebuff = target.buffsAndDebuffs.debuffs.entry.size > 0;
    if (hasAnyDebuff) {
      damageOutput.crit += skillLevel >= 5 ? 4 : 2;
    }

    const totalDamage = resolveDamage(
      actor.id,
      target.id,
      damageOutput,
      location,
    );
    const message = buildCombatMessage(
      actor,
      target,
      { en: "Precision Thrust", th: "แทงทะลุจุด" },
      totalDamage,
    );

    return {
      content: message,
      actor: {
        actorId: actor.id,
        effect: [ActorEffect.PierceTwo],
      },
      targets: [
        {
          actorId: target.id,
          effect: [TargetEffect.PierceTwo],
        },
      ],
    };
  },
});
