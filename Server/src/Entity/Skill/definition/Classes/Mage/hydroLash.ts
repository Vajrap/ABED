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

export const hydroLash = new MageSkill({
  id: MageSkillId.HydroLash,
  name: { en: "Hydro Lash", th: "สายน้ำ" },
  description: {
    text: {
      en: "Lash a target with water. Deal <FORMULA> water damage to a target. Chance to spill and heal an ally for 1d3 HP.",
      th: "หวดเป้าหมายด้วยน้ำ สร้างความเสียหายน้ำ <FORMULA> ให้เป้าหมาย มีโอกาสไหลล้นและรักษาพันธมิตร 1d3 HP",
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
    elements: [{ element: "water", min: 1, max: 1 }],
  },
  isFallback: true, // Hydro Lash: no elemental resources, no buff requirement
  exec: (actor: Character, allies: Character[], enemies: Character[], skillLevel: number, location: LocationsEnum) => {
    const target = getTarget(actor, allies, enemies, "enemy").one();
    if (!target) {
      return {
        content: { en: `${actor.name.en} tried to cast Hydro Lash but has no target`, th: `${actor.name.th} พยายามใช้สายน้ำแต่ไม่พบเป้าหมาย` },
        actor: { actorId: actor.id, effect: [ActorEffect.TestSkill] },
        targets: [],
      };
    }

    // Calculate damage: (1d6 + planar mod) × skill level multiplier
    // Damage dice - should not get bless/curse
    const levelScalar = skillLevelMultiplier(skillLevel);
    const totalDamage = Math.max(0, actor.roll({ amount: 1, face: 6, stat: "planar", applyBlessCurse: false }) * levelScalar);
    
    // Standard arcane/elemental magic uses CONTROL for hit
    const damageOutput = {
      damage: totalDamage,
      hit: actor.rollTwenty({stat: 'control'}),
      crit: actor.rollTwenty({stat: 'luck'}),
      type: DamageType.water,
      isMagic: true,
    };
    const totalDamageResult = resolveDamage(actor.id, target.id, damageOutput, location);
    
    // Chance to spill and heal an ally for 1d3 HP (55% chance = d20 >= 10)
    // This is a random chance check, not a skill check, so should not get bless/curse
    const spillRoll = actor.rollTwenty({applyBlessCurse: false});
    let healMessageEn = "";
    let healMessageTh = "";
    if (spillRoll >= 10) {
      const ally = getTarget(actor, allies, enemies, "ally").one();
      if (ally && ally.id !== actor.id) {
        // Healing dice - should not get bless/curse
        const healAmount = actor.roll({ amount: 1, face: 3, applyBlessCurse: false });
        const healResult = ally.receiveHeal({ actor, healing: healAmount });
        healMessageEn = ` Water spilled and healed ${ally.name.en} for ${healResult.heal} HP!`;
        healMessageTh = ` น้ำไหลล้นและรักษา ${ally.name.th} ${healResult.heal} HP!`;
      }
    }

    const turnResult: TurnResult = {
      content: {
        en: `${buildCombatMessage(actor, target, { en: `Hydro Lash`, th: `สายน้ำ` }, totalDamageResult).en}${healMessageEn}`,
        th: `${buildCombatMessage(actor, target, { en: `Hydro Lash`, th: `สายน้ำ` }, totalDamageResult).th}${healMessageTh}`,
      },
      actor: { actorId: actor.id, effect: [ActorEffect.Cast] },
      targets: [{ actorId: target.id, effect: [TargetEffect.TestSkill] }],
    };
    return turnResult;
  },
});

