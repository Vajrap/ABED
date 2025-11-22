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
import { roll } from "src/Utils/Dice";
import { skillLevelMultiplier } from "src/Utils/skillScaling";
import { WitchSkill } from "./index";
import { buffsAndDebuffsRepository } from "src/Entity/BuffsAndDebuffs/repository";
import { DebuffEnum } from "src/Entity/BuffsAndDebuffs/enum";

export const hexDoll = new WitchSkill({
  id: WitchSkillId.HexDoll,
  name: {
    en: "Hex Doll",
    th: "ตุ๊กตาสาป",
  },
  description: {
    en: "Bind a target to a small effigy, creating a sympathetic link. Deals 1d4 + INT mod * (1 + 0.1 * skill level) dark damage immediately. Target rolls DC10 + control mod willpower save or gets hexed for 2 turns (3 at level 5). Hexed reduces endurance by 2. At level 5, also applies cursed debuff.",
    th: "ผูกเป้าหมายกับตุ๊กตาตัวเล็ก สร้างความเชื่อมโยง สร้างความเสียหายมืด 1d4 + ค่า INT * (1 + 0.1 * เลเวลสกิล) ทันที เป้าหมายทอย willpower save DC10 + control mod หรือจะถูก hexed 2 เทิร์น (3 เทิร์นที่เลเวล 5) Hexed ลด endurance ลง 2 ที่เลเวล 5 จะเพิ่ม cursed debuff ด้วย",
  },
  requirement: {},
  equipmentNeeded: [],
  tier: TierEnum.common,
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
          en: `${actor.name.en} tried to use Hex Doll but has no target`,
          th: `${actor.name.th} พยายามใช้ตุ๊กตาสาปแต่ไม่พบเป้าหมาย`,
        },
        actor: {
          actorId: actor.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    }

    // Calculate immediate damage: 1d4 + INT mod * (1 + 0.1 * skill level)
    const intMod = statMod(actor.attribute.getTotal("intelligence"));
    const controlMod = statMod(actor.attribute.getTotal("control"));
    const levelMultiplier = skillLevelMultiplier(skillLevel);
    
    const baseDiceDamage = roll(1).d(4).total;
    const totalDamage = Math.max(0, Math.floor((baseDiceDamage + intMod) * levelMultiplier));

    const damageOutput = {
      damage: totalDamage,
      hit: 999, // Auto-hit
      crit: 0,
      type: DamageType.dark,
      isMagic: true,
    };

    const damageResult = resolveDamage(actor.id, target.id, damageOutput, location);

    // Check for hexed debuff (DC10 + control mod willpower save)
    let hexedMessage = "";
    const willpowerDC = 10 + controlMod;
    const willpowerSave = target.rollSave("willpower");
    
    if (willpowerSave < willpowerDC) {
      const hexedDuration = skillLevel >= 5 ? 3 : 2;
      buffsAndDebuffsRepository.hexed.appender(target, hexedDuration, false, 0);
      hexedMessage = ` ${target.name.en} is hexed!`;
      
      // At level 5, also apply cursed debuff
      if (skillLevel >= 5) {
        buffsAndDebuffsRepository.cursed.appender(target, 2, false, 0);
        hexedMessage += ` ${target.name.en} is also cursed!`;
      }
    }

    const message = buildCombatMessage(
      actor,
      target,
      { en: "Hex Doll", th: "ตุ๊กตาสาป" },
      damageResult,
    );

    return {
      content: {
        en: `${message.en}${hexedMessage}`,
        th: `${message.th}${hexedMessage ? ` ${target.name.th} ถูกสาป!` : ""}`,
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

