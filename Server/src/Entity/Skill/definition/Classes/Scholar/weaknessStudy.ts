import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { ScholarSkillId } from "../../../enums";
import type { Character } from "src/Entity/Character/Character";
import type { TurnResult } from "../../../types";
import { getTarget } from "src/Entity/Battle/getTarget";
import { ActorEffect, TargetEffect } from "../../../effects";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { resolveDamage } from "src/Entity/Battle/damageResolution";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";
import { statMod } from "src/Utils/statMod";
import { buildCombatMessage } from "src/Utils/buildCombatMessage";
import { ScholarSkill } from "./index";
import { buffsAndDebuffsRepository } from "src/Entity/BuffsAndDebuffs/repository";

export const weaknessStudy = new ScholarSkill({
  id: ScholarSkillId.WeaknessStudy,
  name: {
    en: "Weakness Study",
    th: "ศึกษาจุดอ่อน",
  },
  description: {
    text: {
      en: "Study the enemy's weakness and strike.\nApply <DebuffExposed> to target for 1 turn.\nAdditionally, deal 1d3 + <INTmod> [r]true arcane damage[/r] that bypasses all defenses.",
      th: "ศึกษาจุดอ่อนของศัตรูและโจมตี\nเพิ่ม <DebuffExposed> ให้เป้าหมาย 1 เทิร์น\nนอกจากนี้ ยังสร้างความเสียหาย arcane แท้ 1d3 + <INTmod> [r]ที่ผ่านการป้องกันทั้งหมด[/r]",
    },
    formula: {
      en: "1d3 + <INTmod> (true damage)",
      th: "1d3 + <INTmod> (ความเสียหายแท้)",
    },
  },
  requirement: {},
  equipmentNeeded: [],
  tier: TierEnum.common,
  isFallback: true, // WeaknessStudy: no elemental resources (produces neutral, but doesn't consume any), no buff requirement
  consume: {
    hp: 0,
    mp: 2,
    sp: 0,
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
  ): TurnResult => {
    const target = getTarget(actor, actorParty, targetParty, "enemy").one();

    if (!target) {
      return {
        content: {
          en: `${actor.name.en} tried to use Weakness Study but has no target`,
          th: `${actor.name.th} พยายามศึกษาจุดอ่อนแต่ไม่พบเป้าหมาย`,
        },
        actor: {
          actorId: actor.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    }

    // Apply Exposed debuff for 1 turn
    buffsAndDebuffsRepository.exposed.appender(target, { turnsAppending: 1 });

    // Calculate damage: 1d3 + INT mod true arcane damage
    const intMod = statMod(actor.attribute.getTotal("intelligence"));
    // Damage dice - should not get bless/curse
    const baseDiceDamage = actor.roll({ amount: 1, face: 3, stat: "intelligence", applyBlessCurse: false });
    const totalDamage = Math.max(0, baseDiceDamage + intMod);

    // True damage, but still use hit/crit rolls for consistency
    // Scholar/arcane magic uses CONTROL for hit, LUCK for crit
    const damageOutput = {
      damage: totalDamage,
      hit: actor.rollTwenty({stat: 'control'}),
      crit: actor.rollTwenty({stat: 'luck'}),
      type: DamageType.arcane,
      isMagic: true,
      trueDamage: true,
    };

    const damageResult = resolveDamage(actor.id, target.id, damageOutput, location);
    const message = buildCombatMessage(
      actor,
      target,
      { en: "Weakness Study", th: "ศึกษาจุดอ่อน" },
      damageResult,
    );

    return {
      content: {
        en: `${message.en} ${target.name.en} is exposed!`,
        th: `${message.th} ${target.name.th} ถูกเปิดเผยจุดอ่อน!`,
      },
      actor: {
        actorId: actor.id,
        effect: [ActorEffect.Cast],
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

