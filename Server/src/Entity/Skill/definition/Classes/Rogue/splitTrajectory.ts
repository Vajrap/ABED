import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { RogueSkillId } from "../../../enums";
import type { Character } from "src/Entity/Character/Character";
import type { TurnResult } from "../../../types";
import { getTarget } from "src/Entity/Battle/getTarget";
import { ActorEffect, TargetEffect } from "../../../effects";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { resolveDamage } from "src/Entity/Battle/damageResolution";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";
import { buildCombatMessage } from "src/Utils/buildCombatMessage";
import { RogueSkill } from "./index";
import { statMod } from "src/Utils/statMod";
import { DebuffEnum } from "src/Entity/BuffsAndDebuffs/enum";
import { skillLevelMultiplier } from "src/Utils/skillScaling";

export const splitTrajectory = new RogueSkill({
  id: RogueSkillId.SplitTrajectory,
  name: {
    en: "Split Trajectory",
    th: "แยกวิถี",
  },
  description: {
    text: {
      en: "Split your shot to hit multiple targets. Deal <FORMULA> pierce damage to primary target. Select a second random enemy, deal half damage (rounded down). If the primary target is bleeding, second hit deals full damage instead.",
      th: "แยกการยิงเพื่อโจมตีเป้าหมายหลายคน สร้างความเสียหายแทง <FORMULA> ให้เป้าหมายหลัก เลือกศัตรูที่สองแบบสุ่ม สร้างความเสียหายครึ่งหนึ่ง (ปัดลง) หากเป้าหมายหลักกำลังเลือดไหล การโจมตีครั้งที่สองจะสร้างความเสียหายเต็มแทน",
    },
    formula: {
      en: "Primary: 1d6 + <DEXmod> x <SkillLevelMultiplier>. Second: half damage (full if primary is bleeding)",
      th: "หลัก: 1d6 + <DEXmod> x <SkillLevelMultiplier>. ที่สอง: ความเสียหายครึ่งหนึ่ง (เต็มหากหลักเลือดไหล)",
    },
  },
  requirement: {},
  equipmentNeeded: ["bow"],
  tier: TierEnum.uncommon,
  consume: {
    hp: 0,
    mp: 0,
    sp: 3,
    elements: [
      { element: "wind", value: 2 },
    ],
  },
  produce: {
    hp: 0,
    mp: 0,
    sp: 0,
    elements: [
      { element: "neutral", min: 1, max: 1 },
    ],
  },
  exec: (
    actor: Character,
    actorParty: Character[],
    targetParty: Character[],
    skillLevel: number,
    location: LocationsEnum,
  ): TurnResult => {
    // Primary target
    const primaryTarget = getTarget(actor, actorParty, targetParty, "enemy").one();

    if (!primaryTarget) {
      return {
        content: {
          en: `${actor.name.en} tried to use Split Trajectory but has no target`,
          th: `${actor.name.th} พยายามใช้แยกวิถีแต่ไม่พบเป้าหมาย`,
        },
        actor: {
          actorId: actor.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    }

    // Calculate primary damage: 1d6 + DEX mod x skill level multiplier
    // Damage dice - should not get bless/curse
    const baseDamage = actor.roll({ amount: 1, face: 6, stat: "dexterity", applyBlessCurse: false }) * skillLevelMultiplier(skillLevel);
    const primaryDamage = baseDamage;

    const primaryDamageOutput = {
      damage: primaryDamage,
      hit: actor.rollTwenty({ stat: "dexterity" }),
      crit: actor.rollTwenty({ stat: "luck" }),
      type: DamageType.pierce,
      isMagic: false,
    };
    const primaryResult = resolveDamage(actor.id, primaryTarget.id, primaryDamageOutput, location);

    // Check if primary target is bleeding
    const isPrimaryBleeding = !!primaryTarget.buffsAndDebuffs.debuffs.entry.get(DebuffEnum.bleed);

    // Second target: random enemy
    const secondTarget = getTarget(actor, actorParty, targetParty, "enemy").one();
    let secondResult = null;
    let secondMessage = "";

    if (secondTarget && secondTarget.id !== primaryTarget.id) {
      // Calculate second damage: half damage (full if primary is bleeding)
      const secondDamage = isPrimaryBleeding 
        ? primaryDamage 
        : Math.floor(primaryDamage / 2);

      const secondDamageOutput = {
        damage: secondDamage,
        hit: actor.rollTwenty({ stat: "dexterity" }),
        crit: actor.rollTwenty({ stat: "luck" }),
        type: DamageType.pierce,
        isMagic: false,
      };
      secondResult = resolveDamage(actor.id, secondTarget.id, secondDamageOutput, location);
      const secondMsg = buildCombatMessage(actor, secondTarget, { en: "Split Trajectory", th: "แยกวิถี" }, secondResult);
      secondMessage = ` ${secondMsg.en}`;
    }

    const primaryMsg = buildCombatMessage(actor, primaryTarget, { en: "Split Trajectory", th: "แยกวิถี" }, primaryResult);
    const bleedBonus = isPrimaryBleeding ? " (Bleed bonus: second hit deals full damage)" : "";

    return {
      content: {
        en: `${primaryMsg.en}${secondMessage}${bleedBonus}`,
        th: `${primaryMsg.th}${secondMessage ? ` ${secondMessage}` : ""}${bleedBonus ? " (โบนัสเลือดไหล: การโจมตีครั้งที่สองสร้างความเสียหายเต็ม)" : ""}`,
      },
      actor: {
        actorId: actor.id,
        effect: [ActorEffect.TestSkill],
      },
      targets: [
        {
          actorId: primaryTarget.id,
          effect: [TargetEffect.TestSkill],
        },
        ...(secondTarget && secondTarget.id !== primaryTarget.id ? [{
          actorId: secondTarget.id,
          effect: [TargetEffect.TestSkill],
        }] : []),
      ],
    };
  },
});

