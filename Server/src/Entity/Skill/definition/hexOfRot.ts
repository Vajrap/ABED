import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { SkillId } from "../enums";
import { Skill } from "../Skill";
import type { Character } from "src/Entity/Character/Character";
import type { TurnResult } from "../types";
import { getTarget } from "src/Entity/Battle/getTarget";
import { ActorEffect, TargetEffect } from "../effects";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { resolveDamage } from "src/Entity/Battle/damageResolution";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";
import { statMod } from "src/Utils/statMod";
import { buildCombatMessage } from "src/Utils/buildCombatMessage";
import { roll, rollTwenty } from "src/Utils/Dice";

export const hexOfRot = new Skill({
  id: SkillId.HexOfRot,
  name: {
    en: "Hex of Rot",
    th: "คำสาปเน่าเปื่อย",
  },
  description: {
    en: "Calls upon restless spirits to curse a foe. Deals 1d4 Chaos damage + planar mod + 0.5 * skill level. Target hit must roll DC10 willpower saves or get hexed: Endurance reduced by 2 points for 2 turns.",
    th: "เรียกวิญญาณที่ไม่สงบมาสาปแช่งศัตรู สร้างความเสียหาย Chaos 1d4 + ค่า planar + 0.5 * เลเวลสกิล เป้าหมายที่โดนต้องทอย DC10 willpower saves หรือจะถูกสาป: Endurance ลดลง 2 หน่วยเป็นเวลา 2 เทิร์น",
  },
  requirement: {},
  equipmentNeeded: [],
  tier: TierEnum.common,
  consume: {
    hp: 0,
    mp: 0,
    sp: 0,
    elements: [
      {
        element: "chaos",
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
  ) => {
    const target = getTarget(actor, targetParty).one();

    if (!target) {
      return {
        content: {
          en: `${actor.name.en} tried to cast Hex of Rot but has no target`,
          th: `${actor.name.th} พยายามใช้คำสาปเน่าเปื่อยแต่ไม่พบเป้าหมาย`,
        },
        actor: {
          actorId: actor.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    }

    // Calculate damage
    const planarMod = statMod(actor.attribute.getTotal("planar"));
    const damageRoll = roll(1).d(4).total;
    const totalDamage = damageRoll + planarMod + 0.5 * skillLevel;

    const damageOutput = {
      damage: Math.floor(totalDamage),
      hit: 999, // Auto-hit spell
      crit: 0,
      type: DamageType.chaos,
    };

    const damageResult = resolveDamage(actor.id, target.id, damageOutput, location);

    // Check for hex debuff (DC 10 willpower save)
    let hexMessage = "";
    const willpowerSave = rollTwenty().total;
    if (willpowerSave < 10 + statMod(target.attribute.getTotal("willpower"))) {
      // Target fails save - reduce endurance (TODO: implement endurance debuff)
      hexMessage = ` ${target.name.en} was hexed! Endurance reduced by 2 (not yet implemented)`;
    } else {
      hexMessage = ` ${target.name.en} resisted the hex!`;
    }

    return {
      content: {
        en: `${buildCombatMessage(actor, target, { en: "Hex of Rot", th: "คำสาปเน่าเปื่อย" }, damageResult).en}${hexMessage}`,
        th: `${buildCombatMessage(actor, target, { en: "Hex of Rot", th: "คำสาปเน่าเปื่อย" }, damageResult).th}${hexMessage}`,
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

