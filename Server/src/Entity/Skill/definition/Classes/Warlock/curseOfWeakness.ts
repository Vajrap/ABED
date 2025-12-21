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
import { WarlockSkill } from "./index";
import { buffsAndDebuffsRepository } from "src/Entity/BuffsAndDebuffs/repository";

export const curseOfWeakness = new WarlockSkill({
  id: WarlockSkillId.CurseOfWeakness,
  name: {
    en: "Curse of Weakness",
    th: "คำสาปความอ่อนแอ",
  },
  description: {
    text: {
      en: "Curse a target with weakness, reducing their resolve.\nTarget must [r]roll DC10 + <PlanarMod> WILsave[/r] or gain <DebuffCursed> for {5}'3':'2'{/} turns.\nIf save fails, also deal 1d3 + <PlanarMod> arcane damage.",
      th: "สาปเป้าหมายด้วยความอ่อนแอ ลดความมุ่งมั่นของพวกเขา\nเป้าหมายต้องทอย [r]WILsave DC10 + <PlanarMod>[/r] หรือได้รับ <DebuffCursed> {5}'3':'2'{/} เทิร์น\nหากเซฟล้มเหลว ยังสร้างความเสียหาย 1d3 + <PlanarMod> arcane ด้วย",
    },
    formula: {
      en: "1d3 + <PlanarMod> (if save fails)",
      th: "1d3 + <PlanarMod> (หากเซฟล้มเหลว)",
    },
  },
  requirement: {},
  equipmentNeeded: [],
  tier: TierEnum.common,
  isFallback: true, // CurseOfWeakness: no elemental resources (produces chaos, but doesn't consume any), no buff requirement
  consume: {
    hp: 0,
    mp: 2,
    sp: 0,
    elements: [],
  },
  produce: {
    hp: 0,
    mp: 0,
    sp: 0,
    elements: [
      {
        element: "chaos",
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
          en: `${actor.name.en} tried to use Curse of Weakness but has no target`,
          th: `${actor.name.th} พยายามใช้คำสาปความอ่อนแอแต่ไม่พบเป้าหมาย`,
        },
        actor: {
          actorId: actor.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    }

    const planarMod = statMod(actor.attribute.getTotal("planar"));
    const willpowerDC = 10 + planarMod;
    const willpowerSave = target.rollSave("willpower");

    let cursedMessage = "";
    let damageMessage = "";
    let damageResult = null;

    if (willpowerSave < willpowerDC) {
      // Save failed: Apply Cursed debuff for 2 turns (3 at level 5)
      const cursedDuration = skillLevel >= 5 ? 3 : 2;
      buffsAndDebuffsRepository.cursed.appender(target, { turnsAppending: cursedDuration });
      cursedMessage = ` ${target.name.en} is cursed!`;

      // Damage: If save fails, also deal 1d3 + planar mod arcane damage
      // Damage dice - should not get bless/curse
      const baseDiceDamage = actor.roll({ amount: 1, face: 3, stat: "planar", applyBlessCurse: false });
      const totalDamage = Math.max(0, baseDiceDamage + planarMod);

      // Curse/chaos magic uses WIL for hit, LUCK for crit
      const damageOutput = {
        damage: totalDamage,
        hit: actor.rollTwenty({stat: 'willpower'}),
        crit: actor.rollTwenty({stat: 'luck'}),
        type: DamageType.arcane,
        isMagic: true,
      };

      damageResult = resolveDamage(actor.id, target.id, damageOutput, location);
      damageMessage = buildCombatMessage(
        actor,
        target,
        { en: "Curse of Weakness", th: "คำสาปความอ่อนแอ" },
        damageResult,
      ).en;
    }

    return {
      content: {
        en: `${actor.name.en} casts Curse of Weakness on ${target.name.en}!${damageMessage ? ` ${damageMessage}` : ""}${cursedMessage}`,
        th: `${actor.name.th} ใช้คำสาปความอ่อนแอกับ ${target.name.th}!${damageMessage ? ` ${damageMessage}` : ""}${cursedMessage ? ` ${target.name.th} ถูกสาป!` : ""}`,
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

