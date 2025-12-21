import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { DuelistSkillId } from "../../../enums";
import type { Character } from "src/Entity/Character/Character";
import type { TurnResult } from "../../../types";
import { getTarget } from "src/Entity/Battle/getTarget";
import { ActorEffect, TargetEffect } from "../../../effects";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { resolveDamage } from "src/Entity/Battle/damageResolution";
import { buildCombatMessage } from "src/Utils/buildCombatMessage";
import { getWeaponDamageOutput } from "src/Utils/getWeaponDamgeOutput";
import { getWeaponDamageType } from "src/Utils/getWeaponDamageType";
import { getPositionModifier } from "src/Utils/getPositionModifier";
import { skillLevelMultiplier } from "src/Utils/skillScaling";
import { DuelistSkill } from "./index";

export const feintStrike = new DuelistSkill({
  id: DuelistSkillId.FeintStrike,
  name: {
    en: "Feint Strike",
    th: "โจมตีหลอกล่อ",
  },
  description: {
    text: {
      en: "Feint to create an opening, then strike with precision.\nDeal <FORMULA> damage.\nHit Bonus: +4 hit roll (+6 at level 5).\nOn Hit: Gain +10 AB gauge and target loses 10 AB gauge.",
      th: "หลอกล่อเพื่อสร้างช่องว่าง จากนั้นโจมตีด้วยความแม่นยำ\nสร้างความเสียหาย <FORMULA>\nโบนัสตี: +4 hit roll (+6 ที่เลเวล 5)\nเมื่อตี: ได้รับ +10 AB gauge และเป้าหมายสูญเสีย 10 AB gauge",
    },
    formula: {
      en: "<WeaponDamage> × <SkillLevelMultiplier>",
      th: "<WeaponDamage> × <SkillLevelMultiplier>",
    },
  },
  requirement: {},
  equipmentNeeded: ["blade", 'sword', 'dagger'],
  tier: TierEnum.uncommon,
  isFallback: false, // FeintStrike: consumes 1 wind element
  consume: {
    hp: 0,
    mp: 0,
    sp: 3,
    elements: [
      {
        element: "wind",
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
          en: `${actor.name.en} tried to use Feint Strike but has no target`,
          th: `${actor.name.th} พยายามใช้โจมตีหลอกล่อแต่ไม่พบเป้าหมาย`,
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
    const damageOutput = getWeaponDamageOutput(actor, weapon, type);
    const positionModifier = getPositionModifier(actor.position, target.position, weapon);
    const levelScalar = skillLevelMultiplier(skillLevel);

    // Damage: Weapon damage × skill level multiplier
    // Note: getWeaponDamageOutput already includes attribute modifiers
    damageOutput.damage = Math.floor(damageOutput.damage * levelScalar * positionModifier);
    
    // Physical attacks use DEX for hit, LUCK for crit
    damageOutput.hit = actor.rollTwenty({stat: 'dexterity'});
    damageOutput.crit = actor.rollTwenty({stat: 'luck'});
    
    // Hit Bonus: +4 hit roll (+6 at level 5)
    const hitBonus = skillLevel >= 5 ? 6 : 4;
    damageOutput.hit += hitBonus;

    const damageResult = resolveDamage(actor.id, target.id, damageOutput, location);
    
    let abGaugeMessage = "";
    // On Hit: Gain +10 AB gauge and target loses 10 AB gauge
    if (damageResult.isHit) {
      const initialActorGauge = actor.abGauge;
      actor.abGauge = Math.min(100, actor.abGauge + 10);
      const actorGained = actor.abGauge - initialActorGauge;
      
      const initialTargetGauge = target.abGauge;
      target.abGauge = Math.max(0, target.abGauge - 10);
      const targetLost = initialTargetGauge - target.abGauge;
      
      if (actorGained > 0 || targetLost > 0) {
        abGaugeMessage = ` ${actor.name.en} gained ${actorGained} AB gauge, ${target.name.en} lost ${targetLost} AB gauge!`;
      }
    }

    const message = buildCombatMessage(actor, target, { en: "Feint Strike", th: "โจมตีหลอกล่อ" }, damageResult);

    return {
      content: {
        en: `${message.en}${abGaugeMessage}`,
        th: `${message.th}${abGaugeMessage ? ` ${actor.name.th} ได้รับ AB gauge, ${target.name.th} สูญเสีย AB gauge!` : ""}`,
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

