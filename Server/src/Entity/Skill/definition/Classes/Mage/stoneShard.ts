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

export const stoneShard = new MageSkill({
  id: MageSkillId.StoneShard,
  name: { en: "Stone Shard", th: "เศษหิน" },
  description: {
    text: {
      en: "Hurl a sharp fragment of stone at a target. Deal <FORMULA> earth damage. Low chance to give self Stone Skin buff for 1 turn.",
      th: "ขว้างเศษหินแหลมคมใส่เป้าหมาย สร้างความเสียหายดิน <FORMULA> โอกาสต่ำที่จะให้บัฟ Stone Skin กับตัวเอง 1 เทิร์น",
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
    elements: [{ element: "earth", min: 1, max: 1 }],
  },
  exec: (actor: Character, _ally: Character[], enemies: Character[], skillLevel: number, location: LocationsEnum) => {
    const target = getTarget(actor, _ally, enemies, "enemy").one();
    if (!target) {
      return {
        content: { en: `${actor.name.en} tried to cast Stone Shard but has no target`, th: `${actor.name.th} พยายามใช้เศษหินแต่ไม่พบเป้าหมาย` },
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
      type: DamageType.earth,
      isMagic: true,
    };
    const totalDamageResult = resolveDamage(actor.id, target.id, damageOutput, location);
    
    // Low chance (20% = roll d20 >= 17) to give self Stone Skin buff for 1 turn
    let stoneSkinMessage = "";
    const roll = actor.rollTwenty({ applyBlessCurse: false });
    if (roll >= 17) {
      const stoneSkinResult = buffsAndDebuffsRepository.stoneSkin.appender(actor, { turnsAppending: 1 });
      stoneSkinMessage = ` ${stoneSkinResult.en}`;
    }

    const turnResult: TurnResult = {
      content: {
        en: `${buildCombatMessage(actor, target, { en: `Stone Shard`, th: `เศษหิน` }, totalDamageResult).en}${stoneSkinMessage}`,
        th: `${buildCombatMessage(actor, target, { en: `Stone Shard`, th: `เศษหิน` }, totalDamageResult).th}${stoneSkinMessage}`,
      },
      actor: { actorId: actor.id, effect: [ActorEffect.TestSkill] },
      targets: [{ actorId: target.id, effect: [TargetEffect.TestSkill] }],
    };
    return turnResult;
  },
});

