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

export const preciseStrike = new DuelistSkill({
  id: DuelistSkillId.PreciseStrike,
  name: {
    en: "Precise Strike",
    th: "โจมตีแม่นยำ",
  },
  description: {
    text: {
      en: "Execute a precise blade strike with perfect timing. \nDeals <FORMULA> slash damage. \n{5}\nGains [g]+2 crit[/g].{/}",
      th: "โจมตีด้วยดาบอย่างแม่นยำด้วยจังหวะที่สมบูรณ์แบบ \nสร้างความเสียหาย <FORMULA> เป็นความเสียหายตัด \n{5}\nได้รับ [g]+2 crit[/g]{/}",
    },
    formula: {
      en: "((<WeaponDamage> × {5}'1.2':'1.0'{/}) × <SkillLevelMultiplier> × <MeleeRangePenalty>",
      th: "((<WeaponDamage> × {5}'1.2':'1.0'{/}) × <SkillLevelMultiplier> × <MeleeRangePenalty>",
    },
  },
  requirement: {},
  equipmentNeeded: ["blade", 'sword', 'dagger'],
  tier: TierEnum.common,
  isFallback: true, // Precise Strike: no elemental resources, no buff requirement
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
   
    const type = getWeaponDamageType(weapon.weaponType);
    // Physical attacks use DEX for hit, LUCK for crit
    const damageOutput = getWeaponDamageOutput(actor, weapon, type);
    // Override hit/crit to use proper stat-based rolls
    damageOutput.hit = actor.rollTwenty({stat: 'dexterity'});
    damageOutput.crit = actor.rollTwenty({stat: 'luck'});
    const positionModifier = getPositionModifier(actor.position, target.position, weapon);

    const levelScalar = skillLevelMultiplier(skillLevel);

    // Damage: weapon × weaponMultiplier × skillScalar
    // Note: getWeaponDamageOutput already includes attribute modifiers
    // At level 5: 1.2x weapon instead of 1.0x
    const weaponMultiplier = skillLevel >= 5 ? 1.2 : 1.0;
    damageOutput.damage = Math.floor((damageOutput.damage * weaponMultiplier * levelScalar) * positionModifier);
    
    // +3 hit roll bonus (from enum description)
    damageOutput.hit += 3;
    
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

