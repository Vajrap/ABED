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
import { DebuffEnum } from "src/Entity/BuffsAndDebuffs/enum";

export const crushingDepths = new MageSkill({
  id: MageSkillId.CrushingDepths,
  name: { en: "Crushing Depths", th: "ความลึกที่บดขยี้" },
  description: {
    text: {
      en: "Drag an enemy into overwhelming water pressure like abyssal depths. Deal <FORMULA> water damage. Add {5}'3':'2'{/} stacks of Soaked debuff.",
      th: "ดึงศัตรูเข้าสู่แรงดันน้ำที่ท่วมท้นเหมือนความลึกที่ไม่มีวันสิ้นสุด สร้างความเสียหายน้ำ <FORMULA> เพิ่มดีบัฟ Soaked {5}'3':'2'{/} สแต็ก",
    },
    formula: {
      en: "(1d12 + <PlanarMod> + skill level) × <SkillLevelMultiplier>",
      th: "(1d12 + <PlanarMod> + skill level) × <SkillLevelMultiplier>",
    },
  },
  requirement: {},
  equipmentNeeded: [],
  tier: TierEnum.rare,
  consume: { hp: 0, mp: 4, sp: 0, elements: [{ element: "water", value: 2 }, { element: "chaos", value: 1 }] },
  produce: {
    hp: 0, mp: 0, sp: 0,
    elements: [{ element: "neutral", min: 1, max: 1 }],
  },
  exec: (actor: Character, _allies: Character[], enemies: Character[], skillLevel: number, location: LocationsEnum) => {
    const target = getTarget(actor, _allies, enemies, "enemy").one();
    if (!target) {
      return {
        content: { en: `${actor.name.en} tried to cast Crushing Depths but has no target`, th: `${actor.name.th} พยายามใช้ความลึกที่บดขยี้แต่ไม่พบเป้าหมาย` },
        actor: { actorId: actor.id, effect: [ActorEffect.TestSkill] },
        targets: [],
      };
    }

    // Calculate damage: (1d12 + planar mod + skill level) × skill level multiplier
    const levelScalar = skillLevelMultiplier(skillLevel);
    // Damage dice - should not get bless/curse
    const totalDamage = Math.max(0, actor.roll({ amount: 1, face: 12, stat: "planar", applyBlessCurse: false }) + skillLevel);
    const scaledDamage = Math.floor(totalDamage * levelScalar);
    
    // Standard arcane/elemental magic uses CONTROL for hit
    const damageOutput = {
      damage: scaledDamage,
      hit: actor.rollTwenty({stat: 'control'}),
      crit: actor.rollTwenty({stat: 'luck'}),
      type: DamageType.water,
      isMagic: true,
    };
    const totalDamageResult = resolveDamage(actor.id, target.id, damageOutput, location);
    // Add Soaked stacks: 2 stacks (3 at level 5)
    buffsAndDebuffsRepository.soaked.appender(target, { turnsAppending: skillLevel >= 5 ? 3 : 2 });
    
    

    const turnResult: TurnResult = {
      content: {
        en: `${buildCombatMessage(actor, target, { en: `Crushing Depths`, th: `ความลึกที่บดขยี้` }, totalDamageResult).en}`,
        th: `${buildCombatMessage(actor, target, { en: `Crushing Depths`, th: `ความลึกที่บดขยี้` }, totalDamageResult).th}`,
      },
      actor: { actorId: actor.id, effect: [ActorEffect.Cast] },
      targets: [{ actorId: target.id, effect: [TargetEffect.TestSkill] }],
    };
    return turnResult;
  },
});

