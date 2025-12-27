import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { WitchSkillId } from "../../../enums";
import type { Character } from "src/Entity/Character/Character";
import type { TurnResult } from "../../../types";
import { getTarget } from "src/Entity/Battle/getTarget";
import { ActorEffect, TargetEffect } from "../../../effects";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { resolveDamage } from "src/Entity/Battle/damageResolution";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";
import { statMod } from "src/Utils/statMod";
import { buildCombatMessage } from "src/Utils/buildCombatMessage";
import { WitchSkill } from "./index";
import { buffsAndDebuffsRepository } from "src/Entity/BuffsAndDebuffs/repository";
import { DebuffEnum } from "src/Entity/BuffsAndDebuffs/enum";

export const misfortuneCurse = new WitchSkill({
  id: WitchSkillId.MisfortuneCurse,
  name: {
    en: "Misfortune Curse",
    th: "คำสาปโชคร้าย",
  },
  description: {
    text: {
      en: "Curse a target with misfortune, hindering their abilities.\nTarget must [r]roll DC10 + <ControlMod> WILsave[/r] or gain <DebuffCursed> for {5}'3':'2'{/} turns.\nIf save fails, also apply <DebuffSlow> for 1 turn.\nIf target already has Cursed debuff, deal 1d4 + <PlanarMod> arcane damage.",
      th: "สาปเป้าหมายด้วยโชคร้าย ขัดขวางความสามารถของพวกเขา\nเป้าหมายต้องทอย [r]WILsave DC10 + <ControlMod>[/r] หรือได้รับ <DebuffCursed> {5}'3':'2'{/} เทิร์น\nหากเซฟล้มเหลว เพิ่ม <DebuffSlow> 1 เทิร์นด้วย\nหากเป้าหมายมี Cursed อยู่แล้ว สร้างความเสียหาย 1d4 + <PlanarMod> arcane",
    },
    formula: {
      en: "1d4 + <PlanarMod> (if target has Cursed)",
      th: "1d4 + <PlanarMod> (หากเป้าหมายมี Cursed)",
    },
  },
  requirement: {},
  equipmentNeeded: [],
  tier: TierEnum.uncommon,
  isFallback: false, // MisfortuneCurse: consumes 1 chaos element
  consume: {
    hp: 0,
    mp: 3,
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
        element: "wind",
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
          en: `${actor.name.en} tried to use Misfortune Curse but has no target`,
          th: `${actor.name.th} พยายามใช้คำสาปโชคร้ายแต่ไม่พบเป้าหมาย`,
        },
        actor: {
          actorId: actor.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    }

    const controlMod = statMod(actor.attribute.getTotal("control"));
    const planarMod = statMod(actor.attribute.getTotal("planar"));
    
    // Check if target already has Cursed debuff
    const hasCursed = target.buffsAndDebuffs.debuffs.entry.has(DebuffEnum.cursed);
    
    let damageMessage = "";
    let damageResult = null;
    
    // If target already has Cursed debuff, deal 1d4 + planar mod arcane damage
    if (hasCursed) {
      // Damage dice - should not get bless/curse
      const baseDiceDamage = actor.roll({ amount: 1, face: 4, stat: "planar", applyBlessCurse: false });
      const totalDamage = Math.max(0, baseDiceDamage + planarMod);
      
      const damageOutput = {
        damage: totalDamage,
        hit: actor.rollTwenty({stat: 'willpower'}), // Curse/dark magic uses WIL for hit
        crit: actor.rollTwenty({stat: 'luck'}),
        type: DamageType.arcane,
        isMagic: true,
      };
      
      damageResult = resolveDamage(actor.id, target.id, damageOutput, location);
      damageMessage = buildCombatMessage(
        actor,
        target,
        { en: "Misfortune Curse", th: "คำสาปโชคร้าย" },
        damageResult,
      ).en;
    }

    // Save: DC10 + CONTROL mod WIL save
    const willpowerDC = 10 + controlMod;
    const willpowerSave = target.rollSave("willpower");
    let curseMessage = "";
    let slowMessage = "";
    
    if (willpowerSave < willpowerDC) {
      // Save failed: apply Cursed debuff for 2 turns (3 at level 5)
      const cursedDuration = skillLevel >= 5 ? 3 : 2;
      buffsAndDebuffsRepository.cursed.appender(target, { turnsAppending: cursedDuration });
      curseMessage = ` ${target.name.en} is cursed!`;
      
      // If save fails, also apply Slow debuff for 1 turn
      buffsAndDebuffsRepository.slow.appender(target, { turnsAppending: 1 });
      slowMessage = ` ${target.name.en} is slowed!`;
    }

    return {
      content: {
        en: `${actor.name.en} casts Misfortune Curse on ${target.name.en}!${damageMessage ? ` ${damageMessage}` : ""}${curseMessage}${slowMessage}`,
        th: `${actor.name.th} ใช้คำสาปโชคร้ายกับ ${target.name.th}!${damageMessage ? ` ${damageMessage}` : ""}${curseMessage ? ` ${target.name.th} ถูกสาป!` : ""}${slowMessage ? ` ${target.name.th} ถูกทำให้ช้า!` : ""}`,
      },
      actor: {
        actorId: actor.id,
        effect: [ActorEffect.Cast],
      },
      targets: [
        {
          actorId: target.id,
          effect: [TargetEffect.TestSkill],
        },
      ],
    };
  },
});

