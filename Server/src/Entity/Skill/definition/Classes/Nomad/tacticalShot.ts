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
import { roll, rollTwenty } from "src/Utils/Dice";
import { skillLevelMultiplier } from "src/Utils/skillScaling";
import { getWeaponDamageOutput } from "src/Utils/getWeaponDamgeOutput";
import { getPositionModifier } from "src/Utils/getPositionModifier";
import { debuffsRepository } from "src/Entity/BuffsAndDebuffs/repository";

export const tacticalShot = new NomadSkill({
  id: NomadSkillId.TacticalShot,
  name: {
    en: "Tactical Shot",
    th: "ยิงเชิงกลยุทธ์",
  },
  description: {
    text: {
      en: "Adapt your shot to enemy position.\nEnemy in front row: Throw hot sand into enemy eyes, dealing 1d2 true damage. Enemy must roll DC10 (DC12 at level 5) AGI save or get blind for 1 turn.\nEnemy in back row: Launch a powerful shot, dealing <FORMULA> piercing damage. No range penalty.",
      th: "ปรับการยิงตามตำแหน่งศัตรู\nศัตรูในแถวหน้า: โยนทรายร้อนเข้าตาศัตรู สร้างความเสียหายจริง 1d2. ศัตรูต้องทอย DC10 (DC12 ที่ระดับ 5) AGI save หรือถูก blind 1 เทิร์น\nศัตรูในแถวหลัง: ยิงอย่างทรงพลัง สร้างความเสียหายแทง <FORMULA>. ไม่มี range penalty",
    },
    formula: {
      en: "(Weapon damage + attribute modifier) × (<SkillLevelMultiplier> + 0.3)",
      th: "(ความเสียหายจากอาวุธ + ค่า modifier) × (<SkillLevelMultiplier> + 0.3)",
    },
  },
  requirement: {},
  equipmentNeeded: ["bow"],
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
        { element: "wind", min: 1, max: 1 },
    ],
  },
  exec: (
    user: Character,
    userParty: Character[],
    targetParty: Character[],
    skillLevel: number,
    location: LocationsEnum,
  ): TurnResult => {
    const target = getTarget(user, userParty, targetParty, "enemy").one();

    if (!target) {
      return {
        content: {
          en: `${user.name.en} tried to use Tactical Shot but has no target`,
          th: `${user.name.th} พยายามใช้ยิงเชิงกลยุทธ์แต่ไม่พบเป้าหมาย`,
        },
        actor: {
          actorId: user.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    }

    const isTargetFrontRow = target.position <= 2;

    if (isTargetFrontRow) {
      // Front row: Throw hot sand (true damage + blind)
      const trueDamage = roll(1).d(2).total;

      const damageOutput = {
        damage: trueDamage,
        hit: 999, // Auto-hit
        crit: 0,
        type: DamageType.pierce,
        isMagic: false,
        trueDamage: true,
      };

      const damageResult = resolveDamage(user.id, target.id, damageOutput, location);

      // Check for blind application
      let blindMessage = "";
      if (damageResult.isHit) {
        const dc = skillLevel >= 5 ? 12 : 10;
        const saveRoll = target.rollSave("agility");
        if (saveRoll < dc) {
          debuffsRepository.blind.appender(target, { turnsAppending: 1 });
          blindMessage = ` ${target.name.en} failed the save and is blinded!`;
        }
      }

      const message = buildCombatMessage(
        user,
        target,
        { en: "Tactical Shot (Hot Sand)", th: "ยิงเชิงกลยุทธ์ (ทรายร้อน)" },
        damageResult,
      );

      return {
        content: {
          en: `${message.en}${blindMessage}`,
          th: `${message.th}${blindMessage ? ` ${target.name.th} ต้านทานไม่ได้และตาบอด!` : ""}`,
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
      // Back row: Heavy damage shot
      const weapon = user.getWeapon();
      const weaponDamageOutput = getWeaponDamageOutput(user, weapon, "physical");
      const weaponDamage = weaponDamageOutput.damage;
      
      // Calculate damage: (weapon damage + attribute modifier) × (skillLevelMultiplier + 0.3)
      const levelScalar = skillLevelMultiplier(skillLevel);
      const enhancedMultiplier = levelScalar + 0.3;
      const totalDamage = Math.floor((weaponDamage) * enhancedMultiplier);

      // No range penalty (as per description)
      // So we use position modifier but it should be 1.0 for back-back attacks
      const positionModifier = getPositionModifier(
        user.position,
        target.position,
        weapon,
      );

      const damageOutput = {
        damage: Math.floor(totalDamage * positionModifier),
        hit: rollTwenty().total,
        crit: rollTwenty().total,
        type: DamageType.pierce,
        isMagic: false,
      };

      const damageResult = resolveDamage(user.id, target.id, damageOutput, location);

      const message = buildCombatMessage(
        user,
        target,
        { en: "Tactical Shot", th: "ยิงเชิงกลยุทธ์" },
        damageResult,
      );

      return {
        content: {
          en: message.en,
          th: message.th,
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
    }
  },
});

