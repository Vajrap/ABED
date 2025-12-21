import type { Character } from "src/Entity/Character/Character";
import { resolveDamage } from "src/Entity/Battle/damageResolution";
import { getTarget } from "src/Entity/Battle/getTarget";
import { GuardianSkillId } from "../../../enums";
import { GuardianSkill } from "./index";
import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import type { TurnResult } from "../../../types";
import { ActorEffect, TargetEffect } from "../../../effects";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { getWeaponDamageType } from "src/Utils/getWeaponDamageType";
import { getWeaponDamageOutput } from "src/Utils/getWeaponDamgeOutput";
import { buildCombatMessage } from "src/Utils/buildCombatMessage";
import { skillLevelMultiplier } from "src/Utils/skillScaling";
import { BuffEnum } from "src/Entity/BuffsAndDebuffs/enum";
import { buffsRepository, debuffsRepository } from "src/Entity/BuffsAndDebuffs/repository";
import { statMod } from "src/Utils/statMod";

export const sentinelDuty = new GuardianSkill({
  id: GuardianSkillId.SentinelDuty,
  name: {
    en: "Sentinel Duty",
    th: "หน้าที่ทหารยาม",
  },
  description: {
    text: {
      en: "Fulfill your sentinel duty, attacking while drawing enemy attention.\nDeal <FORMULA> damage.\nApply <BuffTaunt> to self for 1 turn if not existed.\nIf Taunt is already active, gain 1 turn of <BuffDefenseUp>.\nTarget must roll DC10 + <STRmod> END save or gain <DebuffDazed> for 1 turn.",
      th: "ทำหน้าที่ทหารยาม โจมตีในขณะที่ดึงความสนใจของศัตรู\nสร้างความเสียหาย <FORMULA>\nให้ <BuffTaunt> แก่ตัวเองเป็นเวลา 1 เทิร์นหากยังไม่มี\nหาก Taunt เปิดใช้งานอยู่แล้ว ได้รับ <BuffDefenseUp> เป็นเวลา 1 เทิร์น\nเป้าหมายต้องทอย DC10 + <STRmod> END save หรือได้รับ <DebuffDazed> เป็นเวลา 1 เทิร์น",
    },
    formula: {
      en: "<WeaponDamage> × <SkillLevelMultiplier>",
      th: "<WeaponDamage> × <SkillLevelMultiplier>",
    },
  },
  requirement: {},
  equipmentNeeded: [],
  tier: TierEnum.uncommon,
  consume: {
    hp: 0,
    mp: 0,
    sp: 3,
    elements: [
      {
        element: "earth",
        value: 2,
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
          en: `${actor.name.en} tried to fulfill sentinel duty but has no target`,
          th: `${actor.name.th} พยายามทำหน้าที่ทหารยามแต่ไม่พบเป้าหมาย`,
        },
        actor: {
          actorId: actor.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    }

    const weapon = actor.getWeapon();
    const damageType = getWeaponDamageType(weapon.weaponType);
    const damageOutput = getWeaponDamageOutput(actor, weapon, damageType);
    const levelScalar = skillLevelMultiplier(skillLevel);

    // Base damage: Weapon damage × skill level multiplier
    damageOutput.damage = Math.floor(damageOutput.damage * levelScalar);

    const damageResult = resolveDamage(actor.id, target.id, damageOutput, location);
    const message = buildCombatMessage(
      actor,
      target,
      { en: "Sentinel Duty", th: "หน้าที่ทหารยาม" },
      damageResult,
    );

    // Taunt/DefenseUp logic
    const hasTaunt = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.taunt)?.value && actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.taunt)!.value > 0;
    let buffMessage = "";
    if (hasTaunt) {
      // If Taunt is already active, gain 1 turn of DefenseUp
      buffsRepository.defenseUp.appender(actor, { turnsAppending: 1 });
      buffMessage = ` ${actor.name.en} gains DefenseUp for 1 turn!`;
    } else {
      // Apply Taunt buff to self for 1 turn if not existed
      buffsRepository.taunt.appender(actor, { turnsAppending: 1 });
      buffMessage = ` ${actor.name.en} gains Taunt for 1 turn!`;
    }

    // Dazed save check
    const actorStrMod = statMod(actor.attribute.getTotal("strength"));
    const dc = 10 + actorStrMod;
    const saveRoll = target.rollSave("endurance");
    let dazedMessage = "";
    if (saveRoll < dc) {
      // Save failed: apply Dazed debuff
      debuffsRepository.dazed.appender(target, { turnsAppending: 1 });
      dazedMessage = ` ${target.name.en} failed the save and is dazed!`;
    }

    return {
      content: {
        en: `${message.en}${buffMessage}${dazedMessage}`,
        th: `${message.th}${buffMessage ? ` ${actor.name.th} ได้รับบัฟ!` : ""}${dazedMessage ? ` ${target.name.th} ล้มเหลวในการทดสอบและสับสน!` : ""}`,
      },
      actor: {
        actorId: actor.id,
        effect: [ActorEffect.TestSkill],
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

