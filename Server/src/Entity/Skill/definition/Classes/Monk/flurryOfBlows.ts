import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { MonkSkillId } from "../../../enums";
import type { Character } from "src/Entity/Character/Character";
import type { TurnResult } from "../../../types";
import { getTarget } from "src/Entity/Battle/getTarget";
import { ActorEffect, TargetEffect } from "../../../effects";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { resolveDamage } from "src/Entity/Battle/damageResolution";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";
import { statMod } from "src/Utils/statMod";
import { buildCombatMessage } from "src/Utils/buildCombatMessage";
import { getPositionModifier } from "src/Utils/getPositionModifier";
import { roll, rollTwenty } from "src/Utils/Dice";
import { MonkSkill } from "./index";
import { BareHandId } from "src/Entity/Item/Equipment/Weapon/type";
import { ArmorClass } from "src/Entity/Item/Equipment/Armor/Armor";
import { bodyRepository } from "src/Entity/Item/Equipment/Armor/Body/repository";
import { skillRepository } from "../../../repository";

export const flurryOfBlows = new MonkSkill({
  id: MonkSkillId.FlurryOfBlows,
  name: {
    en: "Flurry of Blows",
    th: "ชุดการโจมตี",
  },
  description: {
    text: {
      en: "Unleash a rapid flurry of strikes, overwhelming your enemy with sheer speed.\nDeal {5}'3':'2'{/} hits of <FORMULA> blunt damage.\n[r]Damage reduced by 70%[/r] if wearing non-cloth armor.",
      th: "ปล่อยชุดการโจมตีอย่างรวดเร็ว ท่วมท้นศัตรูด้วยความเร็ว\nสร้างความเสียหายทื่อ {5}'3':'2'{/} ครั้ง แต่ละครั้ง <FORMULA>\n[r]ความเสียหายลดลง 70%[/r] หากสวมเกราะที่ไม่ใช่ผ้า",
    },
    formula: {
      en: "Palm Strike damage (if learned), else 1d4 + max(<STRmod>, <DEXmod>) × <MeleeRangePenalty>",
      th: "ความเสียหาย Palm Strike (หากเรียนรู้) หรือ 1d4 + max(<STRmod>, <DEXmod>) × <MeleeRangePenalty>",
    },
  },
  requirement: {},
  equipmentNeeded: ["bareHand"],
  tier: TierEnum.uncommon,
  consume: {
    hp: 0,
    mp: 0,
    sp: 2,
    elements: [
      {
        element: "wind",
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
    const target = getTarget(actor, actorParty, targetParty, "enemy").from("frontFirst").one();
    if (!target) {
      return {
        content: {
          en: `${actor.name.en} tried to use Flurry of Blows but has no target`,
          th: `${actor.name.th} พยายามใช้ชุดการโจมตีแต่ไม่พบเป้าหมาย`,
        },
        actor: {
          actorId: actor.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    }

    const weapon = actor.getWeapon();
    if (weapon.id !== BareHandId.BareHand) {
      return {
        content: {
          en: `${actor.name.en} must be barehanded to use Flurry of Blows`,
          th: `${actor.name.th} ต้องใช้มือเปล่าเพื่อใช้ชุดการโจมตี`,
        },
        actor: {
          actorId: actor.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    }

    // Get Palm Strike level from character's skills
    let palmStrikeLevel = 0;
    const palmStrikeFromSkills = actor.skills.get(MonkSkillId.PalmStrike);
    const palmStrikeFromActive = actor.activeSkills.find(s => s.id === MonkSkillId.PalmStrike);
    const palmStrikeFromConditional = actor.conditionalSkills.find(s => s.id === MonkSkillId.PalmStrike);
    
    if (palmStrikeFromSkills) {
      palmStrikeLevel = typeof palmStrikeFromSkills.level === 'number' ? palmStrikeFromSkills.level : 1;
    } else if (palmStrikeFromActive) {
      palmStrikeLevel = typeof palmStrikeFromActive.level === 'number' ? palmStrikeFromActive.level : 1;
    } else if (palmStrikeFromConditional) {
      palmStrikeLevel = typeof palmStrikeFromConditional.level === 'number' ? palmStrikeFromConditional.level : 1;
    }

    // Deal 2 hits (3 hits at lvl5)
    const numHits = skillLevel >= 5 ? 3 : 2;
    const positionModifier = getPositionModifier(actor.position, target.position, weapon);
    const strMod = statMod(actor.attribute.getTotal("strength"));
    const dexMod = statMod(actor.attribute.getTotal("dexterity"));
    const higherMod = Math.max(strMod, dexMod);

    const targetEffects: { actorId: string; effect: TargetEffect[] }[] = [];
    let combinedMessage = "";
    let totalDamageDealt = 0;

    // Check armor penalty
    let armorPenaltyMultiplier = 1.0;
    if (actor.equipments.body) {
      const armor = bodyRepository[actor.equipments.body];
      if (armor && armor.armorData.armorClass !== ArmorClass.Cloth) {
        armorPenaltyMultiplier = 0.3; // 70% reduction
      }
    }

    for (let i = 0; i < numHits; i++) {
      let hitDamage = 0;
      
      if (palmStrikeLevel > 0) {
        // Deal damage FROM Palm Strike level
        const palmStrikeSkill = skillRepository[MonkSkillId.PalmStrike];
        if (palmStrikeSkill) {
          // Simulate Palm Strike damage calculation
          const diceFace = palmStrikeLevel >= 5 ? 8 : 6;
          const baseDamage = roll(1).d(diceFace).total;
          hitDamage = baseDamage + higherMod;
          hitDamage = Math.floor(hitDamage * positionModifier);
          // Each level ignore 1 point of armor
          hitDamage += palmStrikeLevel;
        }
      } else {
        // If no palm strike, damage = 1d4 + (str | dex mod whichever higher) * (position modifier) blunt damage
        const baseDamage = roll(1).d(4).total;
        hitDamage = baseDamage + higherMod;
        hitDamage = Math.floor(hitDamage * positionModifier);
      }

      // Apply armor penalty
      hitDamage = Math.floor(hitDamage * armorPenaltyMultiplier);

      const damageOutput = {
        damage: hitDamage,
        hit: rollTwenty().total + statMod(actor.attribute.getTotal("control")),
        crit: rollTwenty().total + statMod(actor.attribute.getTotal("luck")),
        type: DamageType.blunt,
        isMagic: false,
      };

      const damageResult = resolveDamage(actor.id, target.id, damageOutput, location);
      totalDamageDealt += damageResult.actualDamage;
      
      if (i === 0) {
        combinedMessage += buildCombatMessage(
          actor,
          target,
          { en: "Flurry of Blows", th: "ชุดการโจมตี" },
          damageResult,
        ).en;
      } else {
        combinedMessage += ` (hit ${i + 1}: ${damageResult.actualDamage} damage)`;
      }
    }

    targetEffects.push({
      actorId: target.id,
      effect: [TargetEffect.TestSkill],
    });

    return {
      content: {
        en: `${combinedMessage} (${numHits} hits, ${totalDamageDealt} total damage)`,
        th: `${actor.name.th} ใช้ชุดการโจมตี ${numHits} ครั้ง สร้างความเสียหายรวม ${totalDamageDealt}`,
      },
      actor: {
        actorId: actor.id,
        effect: [ActorEffect.TestSkill],
      },
      targets: targetEffects,
    };
  },
});

