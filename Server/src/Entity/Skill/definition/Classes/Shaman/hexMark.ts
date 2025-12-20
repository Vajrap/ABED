import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { ShamanSkillId } from "../../../enums";
import type { Character } from "src/Entity/Character/Character";
import { getTarget } from "src/Entity/Battle/getTarget";
import { ActorEffect, TargetEffect } from "../../../effects";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { resolveDamage } from "src/Entity/Battle/damageResolution";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";
import { statMod } from "src/Utils/statMod";
import { buffsAndDebuffsRepository } from "src/Entity/BuffsAndDebuffs/repository";
import { DebuffEnum } from "src/Entity/BuffsAndDebuffs/enum";
import { ShamanSkill } from "./index";

export const hexMark = new ShamanSkill({
  id: ShamanSkillId.HexMark,
  name: {
    en: "Hex Mark",
    th: "เครื่องหมายสาป",
  },
  description: {
    text: {
      en: "Mark an enemy with a hex sigil, making them vulnerable to curse effects.\nApply <DebuffHexMark> to target for {5}3:2{/} turns.\n<DebuffHexMark>: While marked, target takes +1d3 extra chaos damage from all sources.\nIf target already has <DebuffHexed> or <DebuffCursed> when marked, deal 1d4 + <PlanarMod> chaos damage and extend those debuffs by 1 turn.\n{5}When any curse debuff is applied to a marked target, deal additional 1d2 chaos damage.{/}",
      th: "ทำเครื่องหมายศัตรูด้วยเครื่องหมายสาป ทำให้พวกเขาอ่อนแอต่อผลกระทบของคำสาป\nใช้ <DebuffHexMark> กับเป้าหมายเป็นเวลา {5}3:2{/} เทิร์น\n<DebuffHexMark>: ขณะที่ถูกทำเครื่องหมาย เป้าหมายจะได้รับความเสียหาย chaos เพิ่ม +1d3 จากทุกแหล่ง\nหากเป้าหมายมี <DebuffHexed> หรือ <DebuffCursed> อยู่แล้วเมื่อถูกทำเครื่องหมาย จะสร้างความเสียหาย chaos 1d4 + <PlanarMod> และขยายเวลา debuff เหล่านั้นออกไป 1 เทิร์น\n{5}เมื่อ debuff คำสาปใดๆ ถูกใช้กับเป้าหมายที่ถูกทำเครื่องหมาย จะสร้างความเสียหาย chaos เพิ่มเติม 1d2{/}",
    },
    formula: {
      en: "HexMark debuff for {5}3:2{/} turns",
      th: "HexMark debuff เป็นเวลา {5}3:2{/} เทิร์น",
    },
  },
  requirement: {},
  equipmentNeeded: [],
  tier: TierEnum.uncommon,
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
    const target = getTarget(actor, actorParty, targetParty, "enemy").one();

    if (!target) {
      return {
        content: {
          en: `${actor.name.en} tried to cast Hex Mark but has no target`,
          th: `${actor.name.th} พยายามใช้เครื่องหมายสาปแต่ไม่พบเป้าหมาย`,
        },
        actor: {
          actorId: actor.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    }

    const duration = skillLevel >= 5 ? 3 : 2;
    const planarMod = statMod(actor.attribute.getTotal("planar"));
    
    // Check if target already has Hexed or Cursed debuff
    const hasHexed = target.buffsAndDebuffs.debuffs.entry.get(DebuffEnum.hexed);
    const hasCursed = target.buffsAndDebuffs.debuffs.entry.get(DebuffEnum.cursed);
    
    let message = "";
    let additionalDamage = 0;

    if ((hasHexed && hasHexed.value > 0) || (hasCursed && hasCursed.value > 0)) {
      // Curse Amplification: Deal damage and extend debuffs
      const damageRoll = actor.roll({ amount: 1, face: 4, applyBlessCurse: false });
      additionalDamage = damageRoll + planarMod;

      // Extend Hexed debuff by 1 turn if present
      if (hasHexed && hasHexed.value > 0) {
        hasHexed.value += 1;
      }
      
      // Extend Cursed debuff by 1 turn if present
      if (hasCursed && hasCursed.value > 0) {
        hasCursed.value += 1;
      }

      message = ` The curse was amplified!`;
    }

    // Apply HexMark debuff
    buffsAndDebuffsRepository.hexMark.appender(target, { turnsAppending: duration });

    // Deal amplification damage if applicable
    if (additionalDamage > 0) {
      const damageOutput = {
        damage: Math.floor(additionalDamage),
        hit: 999, // Auto-hit spell
        crit: 0,
        type: DamageType.chaos,
        isMagic: true,
      };

      const damageResult = resolveDamage(actor.id, target.id, damageOutput, location);
      message += damageResult.isHit
        ? ` Dealt ${damageResult.actualDamage} chaos damage and extended curse debuffs.`
        : ` Extended curse debuffs.`;
    }

    return {
      content: {
        en: `${actor.name.en} marked ${target.name.en} with a hex sigil for ${duration} turn(s).${message}`,
        th: `${actor.name.th} ทำเครื่องหมาย ${target.name.th} ด้วยเครื่องหมายสาปเป็นเวลา ${duration} เทิร์น${message}`,
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

