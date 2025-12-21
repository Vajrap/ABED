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

export const aquaBlast = new MageSkill({
  id: MageSkillId.AquaBlast,
  name: { en: "Aqua Blast", th: "น้ำพุ่งแรง" },
  description: {
    text: {
      en: "Blast a target with pressurized water. Deal <FORMULA> water damage to a target. Add 1 Soaked debuff to target.",
      th: "พ่นน้ำแรงดันสูงใส่เป้าหมาย สร้างความเสียหายน้ำ <FORMULA> ให้เป้าหมาย เพิ่มดีบัฟ Soaked 1 สแต็กให้เป้าหมาย",
    },
    formula: {
      en: "(1d6 + <PlanarMod>) × <SkillLevelMultiplier>",
      th: "(1d6 + <PlanarMod>) × <SkillLevelMultiplier>",
    },
  },
  requirement: {},
  equipmentNeeded: [],
  tier: TierEnum.common,
  consume: { hp: 0, mp: 3, sp: 0, elements: [{ element: "water", value: 1 }] },
  produce: {
    hp: 0, mp: 0, sp: 0,
    elements: [{ element: "neutral", min: 1, max: 1 }],
  },
  exec: (actor: Character, _allies: Character[], enemies: Character[], skillLevel: number, location: LocationsEnum) => {
    const target = getTarget(actor, _allies, enemies, "enemy").one();
    if (!target) {
      return {
        content: { en: `${actor.name.en} tried to cast Aqua Blast but has no target`, th: `${actor.name.th} พยายามใช้น้ำพุ่งแรงแต่ไม่พบเป้าหมาย` },
        actor: { actorId: actor.id, effect: [ActorEffect.TestSkill] },
        targets: [],
      };
    }

    // Calculate damage: (1d6 + planar mod) × skill level multiplier
    const levelScalar = skillLevelMultiplier(skillLevel);
    // Damage dice - should not get bless/curse
    const totalDamage = Math.max(0, actor.roll({ amount: 1, face: 6, stat: "planar", applyBlessCurse: false }) * levelScalar);
    
    const damageOutput = {
      damage: totalDamage,
      hit: actor.rollTwenty({stat: 'control'}),
      crit: actor.rollTwenty({stat: 'luck'}),
      type: DamageType.water,
      isMagic: true,
    };
    const totalDamageResult = resolveDamage(actor.id, target.id, damageOutput, location);
    
    // Add 1 Soaked debuff stack
    buffsAndDebuffsRepository.soaked.appender(target, { turnsAppending: 1 });
    

    const turnResult: TurnResult = {
      content: {
        en: `${buildCombatMessage(actor, target, { en: `Aqua Blast`, th: `น้ำพุ่งแรง` }, totalDamageResult).en}`,
        th: `${buildCombatMessage(actor, target, { en: `Aqua Blast`, th: `น้ำพุ่งแรง` }, totalDamageResult).th}`,
      },
      actor: { actorId: actor.id, effect: [ActorEffect.Cast] },
      targets: [{ actorId: target.id, effect: [TargetEffect.TestSkill] }],
    };
    return turnResult;
  },
});

