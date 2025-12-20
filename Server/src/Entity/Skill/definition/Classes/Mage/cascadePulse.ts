import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { MageSkillId } from "../../../enums";
import type { Character } from "src/Entity/Character/Character";
import type { TurnResult } from "../../../types";
import { getTarget } from "src/Entity/Battle/getTarget";
import { ActorEffect, TargetEffect } from "../../../effects";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { resolveDamage } from "src/Entity/Battle/damageResolution";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";
import { skillLevelMultiplier } from "src/Utils/skillScaling";
import { MageSkill } from "./index";
import { statMod } from "src/Utils/statMod";

export const cascadePulse = new MageSkill({
  id: MageSkillId.CascadePulse,
  name: { en: "Cascade Pulse", th: "คลื่นต่อเนื่อง" },
  description: {
    text: {
      en: "Release a flowing pulse of water that may chain between targets. Deal 1d6 + planar + skill mod damage to enemies, or heal 1d3 + planar + skill mod HP to allies. To chain, roll DC15 vs control + skill level.",
      th: "ปล่อยคลื่นน้ำที่อาจต่อเนื่องระหว่างเป้าหมาย สร้างความเสียหาย 1d6 + planar + skill mod ให้ศัตรู หรือรักษา 1d3 + planar + skill mod HP ให้พันธมิตร หากต้องการต่อเนื่อง ทอย DC15 เทียบกับ control + skill level",
    },
    formula: {
      en: "Enemy: (1d6 + <PlanarMod> + skill level) × <SkillLevelMultiplier> | Ally: 1d3 + <PlanarMod> + skill level",
      th: "ศัตรู: (1d6 + <PlanarMod> + skill level) × <SkillLevelMultiplier> | พันธมิตร: 1d3 + <PlanarMod> + skill level",
    },
  },
  requirement: {},
  equipmentNeeded: [],
  tier: TierEnum.uncommon,
  consume: { hp: 0, mp: 3, sp: 0, elements: [{ element: "water", value: 2 }] },
  produce: {
    hp: 0, mp: 0, sp: 0,
    elements: [{ element: "chaos", min: 1, max: 1 }],
  },
  exec: (actor: Character, allies: Character[], enemies: Character[], skillLevel: number, location: LocationsEnum) => {
    const firstTarget = getTarget(actor, allies, enemies, "any").one();
    if (!firstTarget) {
      return {
        content: { en: `${actor.name.en} tried to cast Cascade Pulse but has no target`, th: `${actor.name.th} พยายามใช้คลื่นต่อเนื่องแต่ไม่พบเป้าหมาย` },
        actor: { actorId: actor.id, effect: [ActorEffect.TestSkill] },
        targets: [],
      };
    }

    const targets: Character[] = [firstTarget];
    const targetEffects: { actorId: string; effect: TargetEffect[] }[] = [];
    let totalDamage = 0;
    let totalHealing = 0;
    const messages: string[] = [];

    // Process each target in the chain
    let currentTarget = firstTarget;
    while (targets.length < 6) { // Max 6 targets
      const isEnemy = enemies.includes(currentTarget);
      const planarMod = statMod(actor.attribute.getTotal("planar"));
      const levelScalar = skillLevelMultiplier(skillLevel);

      if (isEnemy) {
        // Deal damage: 1d6 + planar + skill level
        const baseDamage = actor.roll({ amount: 1, face: 6, applyBlessCurse: false }) + planarMod + skillLevel;
        const damage = Math.floor(baseDamage * levelScalar);
        const damageOutput = {
          damage,
          hit: actor.rollTwenty({}),
          crit: actor.rollTwenty({}),
          type: DamageType.water,
          isMagic: true,
        };
        const damageResult = resolveDamage(actor.id, currentTarget.id, damageOutput, location);
        totalDamage += damageResult.actualDamage;
        messages.push(`${currentTarget.name.en} took ${damageResult.actualDamage} water damage`);
        targetEffects.push({ actorId: currentTarget.id, effect: [TargetEffect.TestSkill] });
      } else {
        // Heal: 1d3 + planar + skill level
        const healAmount = actor.roll({ amount: 1, face: 3, applyBlessCurse: false }) + planarMod + skillLevel;
        const beforeHp = currentTarget.vitals.hp.current;
        currentTarget.vitals.incHp(healAmount);
        const actualHeal = currentTarget.vitals.hp.current - beforeHp;
        totalHealing += actualHeal;
        messages.push(`${currentTarget.name.en} healed for ${actualHeal} HP`);
        targetEffects.push({ actorId: currentTarget.id, effect: [TargetEffect.TestSkill] });
      }

      // Try to chain to next target: roll DC15 vs control + skill level
      const chainRoll = actor.rollTwenty({stat: 'control'}) + skillLevel;
      
      if (chainRoll < 15) {
        // Chain failed
        break;
      }

      // Chain succeeded - find next target (alternate between enemies and allies if possible)
      const nextTarget = getTarget(actor, allies, enemies, "any").except(targets).one();
      
      if (!nextTarget || nextTarget.id === currentTarget.id) {
        // No valid target to chain to
        break;
      }

      currentTarget = nextTarget;
      targets.push(currentTarget);
    }

    const summary = messages.join(", ");
    const turnResult: TurnResult = {
      content: {
        en: `${actor.name.en} released a Cascade Pulse, chaining to ${targets.length} target(s)! ${summary}.`,
        th: `${actor.name.th} ปล่อยคลื่นต่อเนื่อง ต่อเนื่องไปยัง ${targets.length} เป้าหมาย! ${summary}.`,
      },
      actor: { actorId: actor.id, effect: [ActorEffect.Cast] },
      targets: targetEffects,
    };
    return turnResult;
  },
});

