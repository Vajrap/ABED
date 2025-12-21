import type { Character } from "src/Entity/Character/Character";
import { resolveDamage } from "src/Entity/Battle/damageResolution";
import { getTarget } from "src/Entity/Battle/getTarget";
import { KnightSkillId } from "../../../enums";
import { KnightSkill } from "./index";
import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import type { TurnResult } from "../../../types";
import { ActorEffect, TargetEffect } from "../../../effects";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { getWeaponDamageType } from "src/Utils/getWeaponDamageType";
import { getWeaponDamageOutput } from "src/Utils/getWeaponDamgeOutput";
import { buildCombatMessage } from "src/Utils/buildCombatMessage";
import { skillLevelMultiplier } from "src/Utils/skillScaling";
import { BuffEnum } from "src/Entity/BuffsAndDebuffs/enum";
import { buffsRepository } from "src/Entity/BuffsAndDebuffs/repository";

export const disciplinedAdvance = new KnightSkill({
  id: KnightSkillId.DisciplinedAdvance,
  name: {
    en: "Disciplined Advance",
    th: "ก้าวรุกอย่างมีระเบียบ",
  },
  description: {
    text: {
      en: "Advance with discipline, maintaining formation while attacking.\nMove to front row (if available).\nDeal <FORMULA> damage.\nIf you have <BuffAdvancingPace>, get DefenseUp buff for 1 turn.",
      th: "ก้าวรุกอย่างมีระเบียบ รักษาแถวในขณะที่โจมตี\nย้ายไปแถวหน้า (หากมีที่ว่าง)\nสร้างความเสียหาย <FORMULA>\nหากคุณมี <BuffAdvancingPace> ได้รับ DefenseUp เป็นเวลา 1 เทิร์น",
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
    sp: 4,
    elements: [
      {
        element: "earth",
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
        element: "fire",
        min: 0,
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
          en: `${actor.name.en} tried to advance but has no target`,
          th: `${actor.name.th} พยายามก้าวรุกแต่ไม่พบเป้าหมาย`,
        },
        actor: {
          actorId: actor.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    }

    // Move to front row if available
    const isFrontRow = actor.position <= 2;
    if (!isFrontRow) {
      const allOccupiedPositions = actorParty.map((member) => member.position);
      // Try to move to front row (positions 0, 1, 2)
      for (const position of [0, 1, 2] as const) {
        if (!allOccupiedPositions.includes(position)) {
          actor.position = position;
          break;
        }
      }
    }

    const weapon = actor.getWeapon();
    const damageType = getWeaponDamageType(weapon.weaponType);
    const damageOutput = getWeaponDamageOutput(actor, weapon, damageType);
    const levelScalar = skillLevelMultiplier(skillLevel);

    // Base damage: Weapon damage × skill level multiplier
    damageOutput.damage = Math.floor(damageOutput.damage * levelScalar);

    // AdvancingPace Bonus: Get DefenseUp buff for 1 turn
    const hasAdvancingPace = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.advancingPace)?.value && actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.advancingPace)!.value > 0;
    let bonusMessage = "";
    if (hasAdvancingPace) {
      buffsRepository.defenseUp.appender(actor, { turnsAppending: 1 });
      bonusMessage = ` ${actor.name.en} gains DefenseUp for 1 turn!`;
    }

    const damageResult = resolveDamage(actor.id, target.id, damageOutput, location);
    const message = buildCombatMessage(
      actor,
      target,
      { en: "Disciplined Advance", th: "ก้าวรุกอย่างมีระเบียบ" },
      damageResult,
    );

    return {
      content: {
        en: `${message.en}${bonusMessage}`,
        th: `${message.th}${bonusMessage ? ` ${actor.name.th} ได้รับ DefenseUp เป็นเวลา 1 เทิร์น!` : ""}`,
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

