import { Character } from "src/Entity/Character/Character";
import { NomadSkill } from ".";
import { NomadSkillId } from "../../../enums";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { buildCombatMessage } from "src/Utils/buildCombatMessage";
import { ActorEffect, TargetEffect } from "src/Entity/Skill/effects";
import { getTarget } from "src/Entity/Battle/getTarget";
import type { TurnResult } from "../../../types";
import { resolveDamage } from "src/Entity/Battle/damageResolution";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";
import { skillLevelMultiplier } from "src/Utils/skillScaling";
import { getWeaponDamageOutput } from "src/Utils/getWeaponDamgeOutput";
import { getPositionModifier } from "src/Utils/getPositionModifier";
import { debuffsRepository, buffsAndDebuffsRepository } from "src/Entity/BuffsAndDebuffs/repository";

export const tacticalSlash = new NomadSkill({
  id: NomadSkillId.TacticalSlash,
  name: {
    en: "Tactical Slash",
    th: "ฟันเชิงกลยุทธ์",
  },
  description: {
    text: {
      en: "Adapt your attack to your position.\nFront row: Engulf your weapon with fire and attack, dealing <FORMULA> fire damage. Enemy must roll DC10 (DC12 at level 5) Endurance save or get burn for 1d3 turns.\nBack row: Gain <BuffRetreat> for 1 turn.",
      th: "ปรับการโจมตีตามตำแหน่งของคุณ\nแถวหน้า: อาบอาวุธด้วยไฟและโจมตี สร้างความเสียหายไฟ <FORMULA>. ศัตรูต้องทอย DC10 (DC12 ที่ระดับ 5) Endurance save หรือถูก burn 1d3 เทิร์น\nแถวหลัง: ได้รับ <BuffRetreat> 1 เทิร์น",
    },
    formula: {
      en: "(Weapon damage + attribute modifier + 1d4) × <SkillLevelMultiplier>",
      th: "(ความเสียหายจากอาวุธ + ค่า modifier + 1d4) × <SkillLevelMultiplier>",
    },
  },
  requirement: {},
  equipmentNeeded: ["dagger", "blade"],
  tier: TierEnum.uncommon,
  consume: {
    hp: 0,
    mp: 0,
    sp: 3,
    elements: [
      { element: "neutral", value: 1 },
    ],
  },
  produce: {
    hp: 0,
    mp: 0,
    sp: 0,
    elements: [
      { element: "fire", min: 1, max: 1 },
    ],
  },
  exec: (
    user: Character,
    userParty: Character[],
    targetParty: Character[],
    skillLevel: number,
    location: LocationsEnum,
  ): TurnResult => {
    const isFrontRow = user.position <= 2;

    if (isFrontRow) {
      // Front row: Fire attack
      const target = getTarget(user, userParty, targetParty, "enemy").one();

      if (!target) {
        return {
          content: {
            en: `${user.name.en} tried to use Tactical Slash but has no target`,
            th: `${user.name.th} พยายามใช้ฟันเชิงกลยุทธ์แต่ไม่พบเป้าหมาย`,
          },
          actor: {
            actorId: user.id,
            effect: [ActorEffect.TestSkill],
          },
          targets: [],
        };
      }

      const weapon = user.getWeapon();
      const weaponDamageOutput = getWeaponDamageOutput(user, weapon, "physical");
      const weaponDamage = weaponDamageOutput.damage;

      // Calculate damage: (weapon damage + attribute modifier(This comes from getWeaponDamageOutput) + 1d4) × skillLevelMultiplier
      const diceBonus = user.roll({ amount: 1, face: 4, applyBlessCurse: false });
      const levelScalar = skillLevelMultiplier(skillLevel);
      const totalDamage = Math.floor((weaponDamage + diceBonus) * levelScalar);

      const positionModifier = getPositionModifier(
        user.position,
        target.position,
        weapon,
      );

      const damageOutput = {
        damage: Math.floor(totalDamage * positionModifier),
        hit: user.rollTwenty({}),
        crit: user.rollTwenty({}),
        type: DamageType.fire,
        isMagic: true,
      };

      const damageResult = resolveDamage(user.id, target.id, damageOutput, location);

      // Check for burn application
      let burnMessage = "";
      if (damageResult.isHit) {
        const dc = skillLevel >= 5 ? 12 : 10;
        const saveRoll = target.rollSave("endurance");
        if (saveRoll < dc) {
          const burnStacks = target.roll({ amount: 1, face: 3, applyBlessCurse: false });
          debuffsRepository.burn.appender(target, { turnsAppending: burnStacks });
          burnMessage = ` ${target.name.en} failed the save and is burning!`;
        }
      }

      const message = buildCombatMessage(
        user,
        target,
        { en: "Tactical Slash", th: "ฟันเชิงกลยุทธ์" },
        damageResult,
      );

      return {
        content: {
          en: `${message.en}${burnMessage}`,
          th: `${message.th}${burnMessage ? ` ${target.name.th} ต้านทานไม่ได้และถูกเผาไหม้!` : ""}`,
        },
        actor: {
          actorId: user.id,
          effect: [ActorEffect.Cast],
        },
        targets: [
          {
            actorId: target.id,
            effect: [TargetEffect.TestSkill],
          },
        ],
      };
    } else {
      // Back row: Gain retreat buff
      buffsAndDebuffsRepository.retreat.appender(user, { turnsAppending: 1 });

      return {
        content: {
          en: `${user.name.en} adopts a tactical stance and gains +3 dodge!`,
          th: `${user.name.th} ใช้ท่าทางเชิงกลยุทธ์และได้รับ +3 dodge!`,
        },
        actor: {
          actorId: user.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    }
  },
});

