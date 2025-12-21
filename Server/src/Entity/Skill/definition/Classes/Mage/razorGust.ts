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
import { BuffEnum } from "src/Entity/BuffsAndDebuffs/enum";

export const razorGust = new MageSkill({
  id: MageSkillId.RazorGust,
  name: { en: "Razor Gust", th: "ลมคมกริบ" },
  description: {
    text: {
      en: "Release cutting winds that repeat based on your momentum. Deal <FORMULA> wind damage to random enemies. Every 2 stacks of Tailwind will repeat the attack.",
      th: "ปล่อยลมตัดที่ทำซ้ำตามโมเมนตัมของคุณ สร้างความเสียหายลม <FORMULA> ให้ศัตรู ทุก 2 สแต็ก Tailwind จะทำการโจมตีซ้ำ",
    },
    formula: {
      en: "(1d6 + <PlanarMod>) × <SkillLevelMultiplier>",
      th: "(1d6 + <PlanarMod>) × <SkillLevelMultiplier>",
    },
  },
  requirement: {},
  equipmentNeeded: [],
  tier: TierEnum.rare,
  consume: { hp: 0, mp: 4, sp: 0, elements: [{ element: "wind", value: 2 }] },
  produce: {
    hp: 0, mp: 0, sp: 0,
    elements: [{ element: "neutral", min: 1, max: 1 }],
  },
  exec: (actor: Character, _ally: Character[], enemies: Character[], skillLevel: number, location: LocationsEnum) => {
    // Get Tailwind stacks
    const tailwindEntry = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.tailwind);
    const tailwindStacks = tailwindEntry?.value || 0;
      
    const numAttacks = 1 + Math.floor(tailwindStacks / 2);

    const targets = getTarget(actor, _ally, enemies, "enemy").many(numAttacks);
    if (targets.length === 0) {
      return {
        content: { en: `${actor.name.en} tried to use Razor Gust but has no target`, th: `${actor.name.th} พยายามใช้ลมคมกริบแต่ไม่พบเป้าหมาย` },
        actor: { actorId: actor.id, effect: [ActorEffect.TestSkill] },
        targets: [],
      };
    }
    
    // Calculate number of repeats: every 2 stacks of Tailwind = 1 repeat
    // So with 0 stacks = 1 attack, 2 stacks = 2 attacks, 4 stacks = 3 attacks, etc.
    const levelScalar = skillLevelMultiplier(skillLevel);
    // Damage dice - should not get bless/curse
    const baseDamage = Math.max(0, actor.roll({ amount: 1, face: 6, stat: "planar", applyBlessCurse: false }) * levelScalar);

    // Standard arcane/elemental magic uses CONTROL for hit
    const damageOutput = {
      damage: baseDamage,
      hit: actor.rollTwenty({stat: 'control'}),
      crit: actor.rollTwenty({stat: 'luck'}),
      type: DamageType.wind,
      isMagic: true,
    };
    
    // Perform all attacks
    const attackMessages: string[] = [];
    const attackMessagesTh: string[] = [];
    for (const target of targets) {
      const damageResult = resolveDamage(actor.id, target.id, damageOutput, location);
      const msg = buildCombatMessage(actor, target, { en: `Razor Gust`, th: `ลมคมกริบ` }, damageResult);
      attackMessages.push(msg.en);
      attackMessagesTh.push(msg.th);
    }

    const turnResult: TurnResult = {
      content: {
        en: attackMessages.join(" "),
        th: attackMessagesTh.join(" "),
      },
      actor: { actorId: actor.id, effect: [ActorEffect.TestSkill] },
      targets: targets.map(t => ({ actorId: t.id, effect: [TargetEffect.TestSkill] })),
    };
    return turnResult;
  },
});

