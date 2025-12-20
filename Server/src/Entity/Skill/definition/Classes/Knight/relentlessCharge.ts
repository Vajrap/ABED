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
import { buildCombatMessage } from "src/Utils/buildCombatMessage";
import { skillLevelMultiplier } from "src/Utils/skillScaling";
import { BuffEnum } from "src/Entity/BuffsAndDebuffs/enum";
import { roll } from "src/Utils/Dice";

export const relentlessCharge = new KnightSkill({
  id: KnightSkillId.RelentlessCharge,
  name: {
    en: "Relentless Charge",
    th: "พุ่งชนอย่างไม่หยุดยั้ง",
  },
  description: {
    text: {
      en: "Charge relentlessly forward, striking with momentum.\nDeal <FORMULA> damage.\nMust move to front row if not already there.\nIf you have <BuffAdvancingPace>, deal +1d4 damage (+1d6 at level 5) and gain +10 AB gauge.",
      th: "พุ่งชนอย่างไม่หยุดยั้งด้วยโมเมนตัม\nสร้างความเสียหาย <FORMULA>\nต้องย้ายไปแถวหน้าถ้ายังไม่อยู่ที่นั่น\nหากคุณมี <BuffAdvancingPace> สร้างความเสียหาย +1d4 (+1d6 ที่เลเวล 5) และได้รับ +10 AB gauge",
    },
    formula: {
      en: "<WeaponDamage> × <SkillLevelMultiplier>",
      th: "<WeaponDamage> × <SkillLevelMultiplier>",
    },
  },
  requirement: {},
  equipmentNeeded: [],
  tier: TierEnum.uncommon,
  consume: {
    hp: 0,
    mp: 0,
    sp: 3,
    elements: [
      {
        element: "fire",
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
    const target = getTarget(actor, actorParty, targetParty, "enemy").one();

    if (!target) {
      return {
        content: {
          en: `${actor.name.en} tried to charge but has no target`,
          th: `${actor.name.th} พยายามพุ่งชนแต่ไม่พบเป้าหมาย`,
        },
        actor: {
          actorId: actor.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    }

    // Move to front row if not already there (if slot available)
    const isFrontRow = actor.position <= 2;
    if (!isFrontRow) {
      const allOccupiedPositions = actorParty.map((member) => member.position);
      // Try to move to front row (positions 0, 1, 2)
      for (const position of [0, 1, 2] as const) {
        if (!allOccupiedPositions.includes(position)) {
          actor.position = position;
          break;
        }
      }
    }

    const weapon = actor.getWeapon();
    const damageType = getWeaponDamageType(weapon.weaponType);
    const damageOutput = getWeaponDamageOutput(actor, weapon, damageType);
    const levelScalar = skillLevelMultiplier(skillLevel);

    // Base damage: Weapon damage × skill level multiplier
    damageOutput.damage = Math.floor(damageOutput.damage * levelScalar);

    // AdvancingPace Bonus: +1d4 damage (+1d6 at level 5) and +10 AB gauge
    const hasAdvancingPace = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.advancingPace)?.value && actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.advancingPace)!.value > 0;
    let bonusMessage = "";
    if (hasAdvancingPace) {
      const bonusDice = skillLevel >= 5 ? 6 : 4;
      const bonusDamage = roll(1).d(bonusDice).total;
      damageOutput.damage += bonusDamage;
      actor.abGauge = Math.min(100, actor.abGauge + 10);
      bonusMessage = ` ${actor.name.en} gains +10 AB gauge!`;
    }

    const damageResult = resolveDamage(actor.id, target.id, damageOutput, location);
    const message = buildCombatMessage(
      actor,
      target,
      { en: "Relentless Charge", th: "พุ่งชนอย่างไม่หยุดยั้ง" },
      damageResult,
    );

    return {
      content: {
        en: `${message.en}${bonusMessage}`,
        th: `${message.th}${bonusMessage ? ` ${actor.name.th} ได้รับ +10 AB gauge!` : ""}`,
      },
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

