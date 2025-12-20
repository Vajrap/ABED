import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { MageSkillId } from "../../../enums";
import type { Character } from "src/Entity/Character/Character";
import type { TurnResult } from "../../../types";
import { getTarget } from "src/Entity/Battle/getTarget";
import { ActorEffect, TargetEffect } from "../../../effects";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { resolveDamage } from "src/Entity/Battle/damageResolution";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";
import { buildCombatMessage } from "src/Utils/buildCombatMessage";
import { skillLevelMultiplier } from "src/Utils/skillScaling";
import { MageSkill } from "./index";
import { buffsAndDebuffsRepository } from "src/Entity/BuffsAndDebuffs/repository";

export const windSlice = new MageSkill({
  id: MageSkillId.WindSlice,
  name: { en: "Wind Slice", th: "ตัดลม" },
  description: {
    text: {
      en: "Slice a target with cutting wind. Deal <FORMULA> wind damage. Gain 1 stack of Tailwind.",
      th: "ตัดเป้าหมายด้วยลมคม สร้างความเสียหายลม <FORMULA> ได้รับ 1 สแต็ก Tailwind",
    },
    formula: {
      en: "(1d6 + <PlanarMod>) × <SkillLevelMultiplier>",
      th: "(1d6 + <PlanarMod>) × <SkillLevelMultiplier>",
    },
  },
  requirement: {},
  equipmentNeeded: [],
  tier: TierEnum.common,
  consume: { hp: 0, mp: 2, sp: 0, elements: [] },
  produce: {
    hp: 0, mp: 0, sp: 0,
    elements: [{ element: "wind", min: 1, max: 1 }],
  },
  exec: (actor: Character, _ally: Character[], enemies: Character[], skillLevel: number, location: LocationsEnum) => {
    const target = getTarget(actor, _ally, enemies, "enemy").one();
    if (!target) {
      return {
        content: { en: `${actor.name.en} tried to cast Wind Slice but has no target`, th: `${actor.name.th} พยายามใช้ตัดลมแต่ไม่พบเป้าหมาย` },
        actor: { actorId: actor.id, effect: [ActorEffect.TestSkill] },
        targets: [],
      };
    }
    
    // Calculate damage: (1d6 + planar mod) × skill level multiplier
    const levelScalar = skillLevelMultiplier(skillLevel);
    const totalDamage = Math.max(0, actor.roll({ amount: 1, face: 6, stat: "planar" }) * levelScalar);
    
    const damageOutput = {
      damage: totalDamage,
      hit: actor.rollTwenty({}),
      crit: actor.rollTwenty({}),
      type: DamageType.wind,
      isMagic: true,
    };
    const totalDamageResult = resolveDamage(actor.id, target.id, damageOutput, location);
    
    // Gain 1 stack of Tailwind
    const tailwindResult = buffsAndDebuffsRepository.tailwind.appender(actor, { turnsAppending: 1 });

    const turnResult: TurnResult = {
      content: {
        en: `${buildCombatMessage(actor, target, { en: `Wind Slice`, th: `ตัดลม` }, totalDamageResult).en} ${tailwindResult.en}`,
        th: `${buildCombatMessage(actor, target, { en: `Wind Slice`, th: `ตัดลม` }, totalDamageResult).th} ${tailwindResult.th}`,
      },
      actor: { actorId: actor.id, effect: [ActorEffect.TestSkill] },
      targets: [{ actorId: target.id, effect: [TargetEffect.TestSkill] }],
    };
    return turnResult;
  },
});

