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
import { roll } from "src/Utils/Dice";
import { WarlockSkill } from "./index";
import { buffsAndDebuffsRepository } from "src/Entity/BuffsAndDebuffs/repository";

export const corruption = new WarlockSkill({
  id: WarlockSkillId.Corruption,
  name: {
    en: "Corruption",
    th: "การเสื่อมสลาย",
  },
  description: {
    en: "Corrupt the target with dark energy. Deals 1d4 + planar mod dark damage immediately. Target rolls DC10 (+control mod) endurance save or gets cursed for 3 turns AND hexed for 2 turns. At level 5, also applies 2 stack of burn.",
    th: "ทำให้เป้าหมายเสื่อมสลายด้วยพลังงานมืด สร้างความเสียหายมืด 1d4 + ค่า planar ทันที เป้าหมายทอย endurance save DC10 (+ค่า planar) หรือจะถูกสาป 3 เทิร์น และ hexed 2 เทิร์น ที่เลเวล 5 จะเพิ่ม burn 2 สแต็ก",
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
  ): TurnResult => {
    const target = getTarget(actor, actorParty, targetParty, "enemy").one();

    if (!target) {
      return {
        content: {
          en: `${actor.name.en} tried to use Corruption but has no target`,
          th: `${actor.name.th} พยายามใช้การเสื่อมสลายแต่ไม่พบเป้าหมาย`,
        },
        actor: {
          actorId: actor.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    }

    // Calculate immediate damage: 1d4 + planar mod
    const planarMod = statMod(actor.attribute.getTotal("planar"));
    const controlMod = statMod(actor.attribute.getTotal("control"));
    
    const baseDiceDamage = roll(1).d(4).total;
    const totalDamage = Math.max(0, baseDiceDamage + planarMod);

    const damageOutput = {
      damage: totalDamage,
      hit: 999, // Auto-hit
      crit: 0,
      type: DamageType.dark,
      isMagic: true,
    };

    const damageResult = resolveDamage(actor.id, target.id, damageOutput, location);

    // Check for debuff application (DC10 + control mod endurance save)
    let debuffMessage = "";
    const enduranceDC = 10 + controlMod;
    const saveRoll = target.rollSave("endurance");
    
    if (saveRoll < enduranceDC) {
      // Apply cursed for 3 turns
      buffsAndDebuffsRepository.cursed.appender(target, 3, false, 0);
      
      // Apply hexed for 2 turns
      buffsAndDebuffsRepository.hexed.appender(target, 2, false, 0);
      
      debuffMessage = ` ${target.name.en} is corrupted!`;
      
      // At level 5, also apply 2 stack of burn
      if (skillLevel >= 5) {
        buffsAndDebuffsRepository.burn.appender(target, 2, false, 0);
        debuffMessage += ` ${target.name.en} is burning!`;
      }
    } else {
      debuffMessage = ` ${target.name.en} resisted the corruption!`;
    }

    const message = buildCombatMessage(
      actor,
      target,
      { en: "Corruption", th: "การเสื่อมสลาย" },
      damageResult,
    );

    return {
      content: {
        en: `${message.en}${debuffMessage}`,
        th: `${message.th}${debuffMessage.includes("corrupted") ? ` ${target.name.th} ถูกทำให้เสื่อมสลาย!` : debuffMessage.includes("resisted") ? ` ${target.name.th} ต้านทานการเสื่อมสลาย!` : ""}`,
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

