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
import { skillLevelMultiplier } from "src/Utils/skillScaling";
import { MonkSkill } from "./index";
import { BareHandId } from "src/Entity/Item/Equipment/Weapon/type";
import { ArmorClass } from "src/Entity/Item/Equipment/Armor/Armor";
import { bodyRepository } from "src/Entity/Item/Equipment/Armor/Body/repository";
import { buffsAndDebuffsRepository } from "src/Entity/BuffsAndDebuffs/repository";

export const stunningFist = new MonkSkill({
  id: MonkSkillId.StunningFist,
  name: {
    en: "Stunning Fist",
    th: "หมัดมึนงง",
  },
  description: {
    text: {
      en: "Strike with stunning force, disrupting your enemy.\nDeal <FORMULA> blunt damage.\nTarget must [r]roll {5}DC12:DC10{/} + max(<STRmod>, <DEXmod>) ENDsave[/r] or become <DebuffStun> for 1 turn.\n[r]Damage reduced by 70% and DC reduced by 3[/r] if wearing non-cloth armor.",
      th: "โจมตีด้วยแรงที่ทำให้มึนงง รบกวนศัตรู\nสร้างความเสียหายทื่อ <FORMULA>\nเป้าหมายต้องทอย [r]{5}DC12:DC10{/} + max(<STRmod>, <DEXmod>) ENDsave[/r] หรือถูก <DebuffStun> 1 เทิร์น\n[r]ความเสียหายลดลง 70% และ DC ลดลง 3[/r] หากสวมเกราะที่ไม่ใช่ผ้า",
    },
    formula: {
      en: "(1d6 + max(<STRmod>, <DEXmod>)) × <SkillLevelMultiplier>",
      th: "(1d6 + max(<STRmod>, <DEXmod>)) × <SkillLevelMultiplier>",
    },
  },
  requirement: {},
  equipmentNeeded: ["bareHand"],
  tier: TierEnum.uncommon,
  isFallback: true, // Stunning Fist: no elemental resources, no buff requirement
  consume: {
    hp: 0,
    mp: 0,
    sp: 3,
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
    const target = getTarget(actor, actorParty, targetParty, "enemy").from("frontFirst").one();
    if (!target) {
      return {
        content: {
          en: `${actor.name.en} tried to use Stunning Fist but has no target`,
          th: `${actor.name.th} พยายามใช้หมัดมึนงงแต่ไม่พบเป้าหมาย`,
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
          en: `${actor.name.en} must be barehanded to use Stunning Fist`,
          th: `${actor.name.th} ต้องใช้มือเปล่าเพื่อใช้หมัดมึนงง`,
        },
        actor: {
          actorId: actor.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    }

    const strMod = statMod(actor.attribute.getTotal("strength"));
    const dexMod = statMod(actor.attribute.getTotal("dexterity"));
    const higherMod = Math.max(strMod, dexMod);

    // Calculate damage: (1d6 + (STR or DEX mod, whichever is higher)) × skill level multiplier
    const levelScalar = skillLevelMultiplier(skillLevel);
    // Damage dice - should not get bless/curse
    const baseDamage = actor.roll({ amount: 1, face: 6, stat: higherMod === strMod ? "strength" : "dexterity", applyBlessCurse: false }) + higherMod;
    let totalDamage = Math.floor(baseDamage * levelScalar);

    // Armor Penalty: If your armor is NOT cloth, damage reduced by 70%
    if (actor.equipments.body) {
      const armor = bodyRepository[actor.equipments.body];
      if (armor && armor.armorData.armorClass !== ArmorClass.Cloth) {
        totalDamage = Math.floor(totalDamage * 0.3);
      }
    }

    // Physical attacks use DEX for accuracy
    const damageOutput = {
      damage: totalDamage,
      hit: actor.rollTwenty({stat: 'dexterity'}),
      crit: actor.rollTwenty({stat: 'luck'}),
      type: DamageType.blunt,
      isMagic: false,
    };

    const damageResult = resolveDamage(actor.id, target.id, damageOutput, location);
    let stunMessage = "";

    // Check for stun application if hit
    if (damageResult.isHit) {
      // Save DC: DC10 (DC12 at level 5) + (STR or DEX mod, whichever is higher)
      // Armor Penalty: If your armor is NOT cloth, DC reduced by 3
      let saveDC = skillLevel >= 5 ? 12 : 10;
      saveDC += higherMod;
      
      // Apply armor penalty to DC
      if (actor.equipments.body) {
        const armor = bodyRepository[actor.equipments.body];
        if (armor && armor.armorData.armorClass !== ArmorClass.Cloth) {
          saveDC -= 3;
        }
      }

      const saveRoll = target.rollSave("endurance");
      if (saveRoll < saveDC) {
        buffsAndDebuffsRepository.stun.appender(target, { turnsAppending: 1 });
        stunMessage = ` ${target.name.en} is stunned!`;
      }
    }

    const message = buildCombatMessage(
      actor,
      target,
      { en: "Stunning Fist", th: "หมัดมึนงง" },
      damageResult,
    );

    return {
      content: {
        en: `${message.en}${stunMessage}`,
        th: `${message.th}${stunMessage ? ` ${target.name.th} ถูกทำให้มึนงง!` : ""}`,
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

