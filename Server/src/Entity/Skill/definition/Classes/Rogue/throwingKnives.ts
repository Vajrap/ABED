import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { RogueSkillId } from "../../../enums";
import type { Character } from "src/Entity/Character/Character";
import type { TurnResult } from "../../../types";
import { buildCombatMessage } from "src/Utils/buildCombatMessage";
import { getTarget } from "src/Entity/Battle/getTarget";
import { ActorEffect, TargetEffect } from "../../../effects";
import { resolveDamage } from "src/Entity/Battle/damageResolution";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { RogueSkill } from "./index";
import { statMod } from "src/Utils/statMod";
import { skillLevelMultiplier } from "src/Utils/skillScaling";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";
import { roll, rollTwenty } from "src/Utils/Dice";

export const throwingKnives = new RogueSkill({
  id: RogueSkillId.ThrowingKnives,
  name: {
    en: "Throwing Knives",
    th: "ขว้างมีด",
  },
  description: {
    en: "Throw knives at 2 targets (4 at level 5), each deals 1d4 + Dex mod * (1 + 0.1 * skill level) pierce damage. Targets can be repeated.",
    th: "ขว้างมีดไปที่เป้าหมาย 2 คน (4 คนที่เลเวล 5) แต่ละคนรับความเสียหาย 1d4 + Dex mod * (1 + 0.1 * เลเวลสกิล) เป้าหมายสามารถซ้ำกันได้",
  },
  requirement: {},
  equipmentNeeded: [],
  tier: TierEnum.common,
  consume: {
    hp: 0,
    mp: 0,
    sp: 2,
    elements: [],
  },
  produce: {
    hp: 0,
    mp: 0,
    sp: 0,
    elements: [
      {element: 'neutral', min: 1, max: 1},
    ],
  },
  exec: (
    actor: Character,
    actorParty: Character[],
    targetParty: Character[],
    skillLevel: number,
    location: LocationsEnum,
  ): TurnResult => {
    const numTargets = skillLevel >= 5 ? 4 : 2;
    const dexMod = statMod(actor.attribute.getTotal("dexterity"));
    const levelScalar = skillLevelMultiplier(skillLevel);
    const bonusDamage = dexMod * levelScalar;

    const messages: string[] = [];
    const targetEffects: { actorId: string; effect: TargetEffect[] }[] = [];

    // Select random targets (can repeat)
    for (let i = 0; i < numTargets; i++) {
      const target = getTarget(actor, targetParty).one();
      
      if (!target) {
        break; // No more valid targets
      }

      const baseDamage = roll(1).d(4).total;
      const totalDamage = Math.max(0, baseDamage + bonusDamage);

      const damageOutput = {
        damage: Math.floor(totalDamage),
        hit: rollTwenty().total + statMod(actor.attribute.getTotal("control")),
        crit: rollTwenty().total + statMod(actor.attribute.getTotal("luck")),
        type: DamageType.pierce,
        isMagic: false,
      };

      const damageResult = resolveDamage(actor.id, target.id, damageOutput, location);
      const combatMsg = buildCombatMessage(actor, target, { en: "Throwing Knives", th: "ขว้างมีด" }, damageResult);
      messages.push(combatMsg.en);

      targetEffects.push({
        actorId: target.id,
        effect: [TargetEffect.TestSkill],
      });
    }

    return {
      content: {
        en: `${actor.name.en} throws knives! ${messages.join(" ")}`,
        th: `${actor.name.th} ขว้างมีด! ${messages.join(" ")}`,
      },
      actor: {
        actorId: actor.id,
        effect: [ActorEffect.TestSkill],
      },
      targets: targetEffects,
    };
  },
});

