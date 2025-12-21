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
import { BuffEnum } from "src/Entity/BuffsAndDebuffs/enum";

export const earthernGrip = new MageSkill({
  id: MageSkillId.EarthernGrip,
  name: { en: "Earthen Grip", th: "กำยึดดิน" },
  description: {
    text: {
      en: "Grip an enemy with earthen power. Deal <FORMULA> earth damage to an enemy in front row (melee). Requires Stone Skin buff (removed after use). Add StoneBounded debuff to the enemy for 2 turns.",
      th: "กำยึดศัตรูด้วยพลังดิน สร้างความเสียหายดิน <FORMULA> ให้ศัตรูแถวหน้า (ระยะประชิด) ต้องมีบัฟ Stone Skin (ถูกลบหลังใช้) เพิ่มดีบัฟ StoneBounded ให้ศัตรู 2 เทิร์น",
    },
    formula: {
      en: "(1d8 + <PlanarMod>) × <SkillLevelMultiplier>",
      th: "(1d8 + <PlanarMod>) × <SkillLevelMultiplier>",
    },
  },
  requirement: {},
  equipmentNeeded: [],
  tier: TierEnum.uncommon,
  consume: { hp: 0, mp: 0, sp: 3, elements: [{ element: "earth", value: 1 }, { element: "order", value: 1 }] },
  produce: {
    hp: 0, mp: 0, sp: 0,
    elements: [{ element: "neutral", min: 1, max: 1 }],
  },
  exec: (actor: Character, _ally: Character[], enemies: Character[], skillLevel: number, location: LocationsEnum) => {
    // Check if actor has Stone Skin buff
    const stoneSkinEntry = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.stoneSkin);
    if (!stoneSkinEntry || stoneSkinEntry.value === 0) {
      return {
        content: {
          en: `${actor.name.en} tried to use Earthen Grip but doesn't have Stone Skin buff!`,
          th: `${actor.name.th} พยายามใช้กำยึดดินแต่ไม่มีบัฟ Stone Skin!`,
        },
        actor: { actorId: actor.id, effect: [ActorEffect.TestSkill] },
        targets: [],
      };
    }

    // Get target enemy in front row (melee)
    const target = getTarget(actor, _ally, enemies, "enemy").from("frontOnly").one();
    if (!target) {
      return {
        content: {
          en: `${actor.name.en} tried to use Earthen Grip but has no front row target`,
          th: `${actor.name.th} พยายามใช้กำยึดดินแต่ไม่มีเป้าหมายแถวหน้า`,
        },
        actor: { actorId: actor.id, effect: [ActorEffect.TestSkill] },
        targets: [],
      };
    }

    // Remove Stone Skin buff (consume all stacks)
    actor.buffsAndDebuffs.buffs.entry.delete(BuffEnum.stoneSkin);
    actor.battleStats.mutateBonus("pDEF", -2);

    // Calculate damage: (1d8 + planar mod) × skill level multiplier
    const levelScalar = skillLevelMultiplier(skillLevel);
    // Damage dice - should not get bless/curse
    const totalDamage = Math.max(0, actor.roll({ amount: 1, face: 8, stat: "planar", applyBlessCurse: false }) * levelScalar);
    
    // Standard arcane/elemental magic uses CONTROL for hit
    const damageOutput = {
      damage: totalDamage,
      hit: actor.rollTwenty({stat: 'control'}),
      crit: actor.rollTwenty({stat: 'luck'}),
      type: DamageType.earth,
      isMagic: true,
    };
    const totalDamageResult = resolveDamage(actor.id, target.id, damageOutput, location);
    
    // Add StoneBounded debuff for 2 turns
    const stoneBoundedResult = buffsAndDebuffsRepository.stoneBounded.appender(target, { turnsAppending: 2 });

    const turnResult: TurnResult = {
      content: {
        en: `${buildCombatMessage(actor, target, { en: `Earthen Grip`, th: `กำยึดดิน` }, totalDamageResult).en} ${stoneBoundedResult.en}`,
        th: `${buildCombatMessage(actor, target, { en: `Earthen Grip`, th: `กำยึดดิน` }, totalDamageResult).th} ${stoneBoundedResult.th}`,
      },
      actor: { actorId: actor.id, effect: [ActorEffect.TestSkill] },
      targets: [{ actorId: target.id, effect: [TargetEffect.TestSkill] }],
    };
    return turnResult;
  },
});

