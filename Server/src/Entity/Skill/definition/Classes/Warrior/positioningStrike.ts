import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { WarriorSkillId } from "../../../enums";
import type { Character } from "src/Entity/Character/Character";
import { getWeaponDamageOutput } from "src/Utils/getWeaponDamgeOutput";
import type { TurnResult } from "../../../types";
import { buildCombatMessage } from "src/Utils/buildCombatMessage";
import { getTarget } from "src/Entity/Battle/getTarget";
import { ActorEffect, TargetEffect } from "../../../effects";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { resolveDamage } from "src/Entity/Battle/damageResolution";
import { skillLevelMultiplier } from "src/Utils/skillScaling";
import { WarriorSkill } from ".";
import { roll } from "src/Utils/Dice";

export const positioningStrike = new WarriorSkill({
  id: WarriorSkillId.PositioningStrike,
  name: {
    en: "Positioning Strike",
    th: "โจมตีจัดตำแหน่ง",
  },
  description: {
    text: {
      en: "Strike while manipulating enemy positioning.\nDeal <FORMULA> damage.\nFront Row Push: If target is in front row and you're in front row, push target to back row (if slot available) and deal +1d4 damage.\nBack Row Pull: If target is in back row, pull target to front row (if slot available) and deal +1d4 damage.",
      th: "โจมตีพร้อมควบคุมตำแหน่งของศัตรู\nสร้างความเสียหาย <FORMULA>\nผลักแถวหน้า: หากเป้าหมายอยู่ในแถวหน้าและคุณอยู่ในแถวหน้า ผลักเป้าหมายไปแถวหลัง (หากมีที่ว่าง) และสร้างความเสียหาย +1d4\nดึงแถวหลัง: หากเป้าหมายอยู่ในแถวหลัง ดึงเป้าหมายมาแถวหน้า (หากมีที่ว่าง) และสร้างความเสียหาย +1d4",
    },
    formula: {
      en: "<WeaponDamage> × <SkillLevelMultiplier>",
      th: "<WeaponDamage> × <SkillLevelMultiplier>",
    },
  },
  requirement: {},
  equipmentNeeded: [],
  tier: TierEnum.common,
  consume: {
    hp: 0,
    mp: 0,
    sp: 3,
    elements: [
      { element: "earth", value: 1 },
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
          en: `${actor.name.en} tried to use Positioning Strike but has no target`,
          th: `${actor.name.th} พยายามใช้โจมตีจัดตำแหน่งแต่ไม่พบเป้าหมาย`,
        },
        actor: {
          actorId: actor.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    }

    const weapon = actor.getWeapon();
    const damageOutput = getWeaponDamageOutput(actor, weapon, "physical");
    const levelScalar = skillLevelMultiplier(skillLevel);

    // Base damage
    damageOutput.damage = Math.floor(damageOutput.damage * levelScalar);

    const isTargetFrontRow = target.position <= 2;
    let positionChanged = false;
    let bonusDamage = 0;
    let positionMessage = "";

    // Front Row Push: If target is in front row and you're in front row, push target to back row (if slot available) and deal +1d4 damage
    if (isTargetFrontRow) {
      const allOccupiedPositions = targetParty.map((member) => member.position);
      // Try to move target to back row (positions 3, 4, 5)
      for (const position of [3, 4, 5] as const) {
        if (!allOccupiedPositions.includes(position)) {
          target.position = position;
          positionChanged = true;
          bonusDamage = roll(1).d(4).total;
          positionMessage = ` Pushed ${target.name.en} to back row!`;
          break;
        }
      }
    }
    // Back Row Pull: If target is in back row, pull target to front row (if slot available) and deal +1d4 damage
    else if (!isTargetFrontRow) {
      const allOccupiedPositions = targetParty.map((member) => member.position);
      // Try to move target to front row (positions 0, 1, 2)
      for (const position of [0, 1, 2] as const) {
        if (!allOccupiedPositions.includes(position)) {
          target.position = position;
          positionChanged = true;
          bonusDamage = roll(1).d(4).total;
          positionMessage = ` Pulled ${target.name.en} to front row!`;
          break;
        }
      }
    }

    // Add bonus damage if position changed
    if (positionChanged && bonusDamage > 0) {
      damageOutput.damage += bonusDamage;
    }

    const damageResult = resolveDamage(actor.id, target.id, damageOutput, location);
    const message = buildCombatMessage(
      actor,
      target,
      { en: "Positioning Strike", th: "โจมตีจัดตำแหน่ง" },
      damageResult,
    );

    return {
      content: {
        en: `${message.en}${positionMessage}${bonusDamage > 0 ? ` (+${bonusDamage} positioning damage!)` : ""}`,
        th: `${message.th}${positionMessage}${bonusDamage > 0 ? ` (+${bonusDamage} ความเสียหายจัดตำแหน่ง!)` : ""}`,
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

