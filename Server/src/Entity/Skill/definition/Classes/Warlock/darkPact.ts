import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { WarlockSkillId } from "../../../enums";
import type { Character } from "src/Entity/Character/Character";
import type { TurnResult } from "../../../types";
import { getTarget } from "src/Entity/Battle/getTarget";
import { ActorEffect, TargetEffect } from "../../../effects";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { resolveDamage } from "src/Entity/Battle/damageResolution";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";
import { statMod } from "src/Utils/statMod";
import { buildCombatMessage } from "src/Utils/buildCombatMessage";
import { roll, rollTwenty } from "src/Utils/Dice";
import { WarlockSkill } from "./index";

export const darkPact = new WarlockSkill({
  id: WarlockSkillId.DarkPact,
  name: {
    en: "Dark Pact",
    th: "พันธสัญญามืด",
  },
  description: {
    en: "Sacrifice 10 HP (8 at level 7) to deal 2d10 + (2 × planar mod) * (1 + 0.15 * skill level) dark damage with true damage. At level 7, add 1d6 extra damage.",
    th: "เสียสละ 10 HP (8 ที่เลเวล 7) เพื่อสร้างความเสียหายมืด 2d10 + (2 × ค่า planar) * (1 + 0.15 * เลเวลสกิล) เป็นความเสียหายจริง ที่เลเวล 7 เพิ่มความเสียหาย 1d6",
  },
  requirement: {},
  equipmentNeeded: [],
  tier: TierEnum.rare,
  consume: {
    hp: 10, // Will be adjusted based on skill level in exec
    mp: 0,
    sp: 0,
    elements: [
      {
        element: "chaos",
        value: 2,
      },
      {
        element: "water",
        value: 1,
      },
    ],
  },
  produce: {
    hp: 0,
    mp: 0,
    sp: 0,
    elements: [
      {
        element: "neutral",
        min: 1,
        max: 1,
      },
    ],
  },
  exec: (
    actor: Character,
    actorParty: Character[],
    targetParty: Character[],
    skillLevel: number,
    location: LocationsEnum,
  ): TurnResult => {
    const target = getTarget(actor, actorParty, targetParty, "enemy").one();

    if (!target) {
      return {
        content: {
          en: `${actor.name.en} tried to use Dark Pact but has no target`,
          th: `${actor.name.th} พยายามใช้พันธสัญญามืดแต่ไม่พบเป้าหมาย`,
        },
        actor: {
          actorId: actor.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    }

    // HP cost: 10 at base, 8 at level 7+
    // The system already consumed consume.hp (10), so if level >= 7, refund 2 HP
    const hpCost = skillLevel >= 7 ? 8 : 10;
    const actualHpCost = hpCost;
    
    // If level 7+, refund the difference (system consumed 10, we only want 8)
    if (skillLevel >= 7) {
      actor.vitals.incHp(2);
    }

    // Calculate damage: 2d10 + (2 × planar mod) * (1 + 0.15 * skill level)
    const planarMod = statMod(actor.attribute.getTotal("planar"));
    const controlMod = statMod(actor.attribute.getTotal("control"));
    const luckMod = statMod(actor.attribute.getTotal("luck"));
    
    const baseDiceDamage = roll(2).d(10).total;
    const levelMultiplier = 1 + 0.15 * skillLevel;
    const planarDamage = (2 * planarMod) * levelMultiplier;
    const extraDamage = skillLevel >= 7 ? roll(1).d(6).total : 0;
    
    const totalDamage = Math.max(0, Math.floor(baseDiceDamage + planarDamage + extraDamage));

    const damageOutput = {
      damage: totalDamage,
      hit: rollTwenty().total + controlMod,
      crit: rollTwenty().total + luckMod,
      type: DamageType.dark,
      isMagic: true,
      trueDamage: true,
    };

    const damageResult = resolveDamage(actor.id, target.id, damageOutput, location);

    const message = buildCombatMessage(
      actor,
      target,
      { en: "Dark Pact", th: "พันธสัญญามืด" },
      damageResult,
    );

    return {
      content: {
        en: `${actor.name.en} sacrificed ${actualHpCost} HP! ${message.en}`,
        th: `${actor.name.th} เสียสละ ${actualHpCost} HP! ${message.th}`,
      },
      actor: {
        actorId: actor.id,
        effect: [ActorEffect.Cast],
      },
      targets: [
        {
          actorId: target.id,
          effect: [TargetEffect.ChaosOne],
        },
      ],
    };
  },
});

