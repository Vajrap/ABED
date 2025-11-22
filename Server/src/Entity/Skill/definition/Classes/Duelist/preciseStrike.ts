import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { DuelistSkillId } from "../../../enums";
import type { Character } from "src/Entity/Character/Character";
import { getWeaponDamageOutput } from "src/Utils/getWeaponDamgeOutput";
import type { TurnResult } from "../../../types";
import { buildCombatMessage } from "src/Utils/buildCombatMessage";
import { getTarget } from "src/Entity/Battle/getTarget";
import { ActorEffect, TargetEffect } from "../../../effects";
import { getPositionModifier } from "src/Utils/getPositionModifier";
import { getWeaponDamageType } from "src/Utils/getWeaponDamageType";
import { resolveDamage } from "src/Entity/Battle/damageResolution";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { DuelistSkill } from "./index";
import { statMod } from "src/Utils/statMod";
import { skillLevelMultiplier } from "src/Utils/skillScaling";
import { buffsAndDebuffsRepository } from "src/Entity/BuffsAndDebuffs/repository";
import { BuffEnum } from "src/Entity/BuffsAndDebuffs/enum";

export const preciseStrike = new DuelistSkill({
  id: DuelistSkillId.PreciseStrike,
  name: {
    en: "Precise Strike",
    th: "โจมตีแม่นยำ",
  },
  description: {
    en: "Execute a precise blade strike with perfect timing. Deals weapon damage + DEX mod * (1 + 0.1 * skill level) slash damage. At level 5, damage increases to 1.2x weapon damage and gains +2 crit.",
    th: "โจมตีด้วยดาบอย่างแม่นยำด้วยจังหวะที่สมบูรณ์แบบ สร้างความเสียหายอาวุธ + DEX mod * (1 + 0.1 * เลเวลสกิล) เป็นความเสียหายตัด ที่เลเวล 5 ความเสียหายเพิ่มเป็น 1.2x อาวุธและได้รับ +2 crit",
  },
  requirement: {},
  equipmentNeeded: ["blade"],
  tier: TierEnum.common,
  consume: {
    hp: 0,
    mp: 0,
    sp: 2,
    elements: [],
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
          en: `${actor.name.en} tried to use Precise Strike but has no target`,
          th: `${actor.name.th} พยายามใช้โจมตีแม่นยำแต่ไม่พบเป้าหมาย`,
        },
        actor: {
          actorId: actor.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    }

    const weapon = actor.getWeapon();
    if (weapon.weaponType !== "blade") {
      return {
        content: {
          en: `${actor.name.en} must equip a blade to use Precise Strike`,
          th: `${actor.name.th} ต้องใช้อาวุธประเภทดาบเพื่อใช้โจมตีแม่นยำ`,
        },
        actor: {
          actorId: actor.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    }

    const type = getWeaponDamageType(weapon.weaponType);
    const damageOutput = getWeaponDamageOutput(actor, weapon, type);
    const positionModifier = getPositionModifier(actor.position, target.position, weapon);

    const dexMod = statMod(actor.attribute.getTotal("dexterity"));
    const levelScalar = skillLevelMultiplier(skillLevel);

    // Damage: weapon + DEX mod * skillScalar
    // At level 5: 1.2x weapon instead of 1.0x
    const weaponMultiplier = skillLevel >= 5 ? 1.2 : 1.0;
    damageOutput.damage = Math.floor((((damageOutput.damage * weaponMultiplier) + dexMod) * levelScalar) * positionModifier);
    
    // +control mod to hit roll
    damageOutput.hit += dexMod;
    
    // +2 crit at level 5
    if (skillLevel >= 5) {
      damageOutput.crit += 2;
    }
    
    // Force slash damage type
    damageOutput.type = "slash" as any;

    const damageResult = resolveDamage(actor.id, target.id, damageOutput, location);

    return {
      content: buildCombatMessage(actor, target, { en: "Precise Strike", th: "โจมตีแม่นยำ" }, damageResult),
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

