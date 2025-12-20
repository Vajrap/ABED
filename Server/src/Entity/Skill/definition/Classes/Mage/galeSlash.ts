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

export const galeSlash = new MageSkill({
  id: MageSkillId.GaleSlash,
  name: { en: "Gale Slash", th: "ฟันพายุ" },
  description: {
    text: {
      en: "Create a sword out of wind and slash an enemy. Deal <FORMULA> wind damage to an enemy (melee). Enemy [r]rolls DC10 ENDsave[/r] or gains 2 stacks of Bleed debuff.",
      th: "สร้างดาบจากลมและฟันศัตรู สร้างความเสียหายลม <FORMULA> ให้ศัตรู (ระยะประชิด) ศัตรูทอย [r]ENDsave DC10[/r] หรือถูก Bleed 2 สแต็ก",
    },
    formula: {
      en: "(1d8 + <PlanarMod>) × <SkillLevelMultiplier>",
      th: "(1d8 + <PlanarMod>) × <SkillLevelMultiplier>",
    },
  },
  requirement: {},
  equipmentNeeded: [],
  tier: TierEnum.uncommon,
  consume: { hp: 0, mp: 0, sp: 3, elements: [{ element: "neutral", value: 1 }] },
  produce: {
    hp: 0, mp: 0, sp: 0,
    elements: [{ element: "wind", min: 1, max: 1 }],
  },
  exec: (actor: Character, _ally: Character[], enemies: Character[], skillLevel: number, location: LocationsEnum) => {
    const target = getTarget(actor, _ally, enemies, "enemy").one();
    if (!target) {
      return {
        content: { en: `${actor.name.en} tried to use Gale Slash but has no target`, th: `${actor.name.th} พยายามใช้ฟันพายุแต่ไม่พบเป้าหมาย` },
        actor: { actorId: actor.id, effect: [ActorEffect.TestSkill] },
        targets: [],
      };
    }
    
    // Calculate damage: (1d8 + planar mod) × skill level multiplier
    const levelScalar = skillLevelMultiplier(skillLevel);
    const totalDamage = Math.max(0, actor.roll({ amount: 1, face: 8, stat: "planar" }) * levelScalar);
    
    const damageOutput = {
      damage: totalDamage,
      hit: actor.rollTwenty({}),
      crit: actor.rollTwenty({}),
      type: DamageType.wind,
      isMagic: true,
    };
    const totalDamageResult = resolveDamage(actor.id, target.id, damageOutput, location);
    
    // Check for bleed application (DC10 END save)
    let bleedMessage = "";
    if (totalDamageResult.isHit) {
      const enduranceSave = target.rollSave("endurance");
      if (enduranceSave < 10) {
        // Save failed: gain 2 stacks of Bleed
        const bleedResult = buffsAndDebuffsRepository.bleed.appender(target, { turnsAppending: 2 });
        bleedMessage = ` ${bleedResult.en}`;
      }
    }

    const turnResult: TurnResult = {
      content: {
        en: `${buildCombatMessage(actor, target, { en: `Gale Slash`, th: `ฟันพายุ` }, totalDamageResult).en}${bleedMessage}`,
        th: `${buildCombatMessage(actor, target, { en: `Gale Slash`, th: `ฟันพายุ` }, totalDamageResult).th}${bleedMessage}`,
      },
      actor: { actorId: actor.id, effect: [ActorEffect.TestSkill] },
      targets: [{ actorId: target.id, effect: [TargetEffect.TestSkill] }],
    };
    return turnResult;
  },
});

