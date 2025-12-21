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

export const tremorWave = new MageSkill({
  id: MageSkillId.TremorWave,
  name: { en: "Tremor Wave", th: "คลื่นสั่นสะเทือน" },
  description: {
    text: {
      en: "Send a ground shock through the front row. Deal <FORMULA> earth damage to all enemies in front line.",
      th: "ส่งคลื่นสั่นสะเทือนผ่านแถวหน้า สร้างความเสียหายดิน <FORMULA> ให้ศัตรูทุกคนในแถวหน้า",
    },
    formula: {
      en: "(1d8 + <PlanarMod>) × <SkillLevelMultiplier>",
      th: "(1d8 + <PlanarMod>) × <SkillLevelMultiplier>",
    },
  },
  requirement: {},
  equipmentNeeded: [],
  tier: TierEnum.uncommon,
  consume: { hp: 0, mp: 4, sp: 0, elements: [{ element: "earth", value: 2 }] },
  produce: {
    hp: 0, mp: 0, sp: 0,
    elements: [{ element: "neutral", min: 1, max: 1 }],
  },
  exec: (actor: Character, _ally: Character[], enemies: Character[], skillLevel: number, location: LocationsEnum) => {
    // Get all enemies in front row
    const targets = getTarget(actor, _ally, enemies, "enemy").from("frontOnly").all();
    
    if (targets.length === 0) {
      return {
        content: {
          en: `${actor.name.en} tried to use Tremor Wave but has no front row targets`,
          th: `${actor.name.th} พยายามใช้คลื่นสั่นสะเทือนแต่ไม่มีเป้าหมายแถวหน้า`,
        },
        actor: { actorId: actor.id, effect: [ActorEffect.TestSkill] },
        targets: [],
      };
    }

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

    // Damage all targets
    const targetResults = targets.map(target => {
      const damageResult = resolveDamage(actor.id, target.id, damageOutput, location);
      return {
        actorId: target.id,
        effect: [TargetEffect.TestSkill] as TargetEffect[],
        damageResult,
      };
    });

    // Build combined message
    const messages = targetResults.map((tr, idx) => {
      const target = targets[idx];
      if (!target) {
        return;
      }
      return buildCombatMessage(actor, target, { en: `Tremor Wave`, th: `คลื่นสั่นสะเทือน` }, tr.damageResult);
    }).filter(m => m !== undefined);

    const combinedMessage = {
      en: messages.map(m => m.en).join(" "),
      th: messages.map(m => m.th).join(" "),
    };

    const turnResult: TurnResult = {
      content: combinedMessage,
      actor: { actorId: actor.id, effect: [ActorEffect.TestSkill] },
      targets: targetResults.map(tr => ({ actorId: tr.actorId, effect: tr.effect })),
    };
    return turnResult;
  },
});

