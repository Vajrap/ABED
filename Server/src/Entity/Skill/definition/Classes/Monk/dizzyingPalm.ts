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

export const dizzyingPalm = new MonkSkill({
  id: MonkSkillId.DizzyingPalm,
  name: {
    en: "Dizzying Palm",
    th: "ฝ่ามือทำให้เวียนหัว",
  },
  description: {
    text: {
      en: "Strike with a dizzying palm technique that disorients enemies.\nDeal <FORMULA> blunt damage.\nTarget must [r]roll DC10 + max(<STRmod>, <DEXmod>) ENDsave[/r] or gain <DebuffDazed> for 2 turns.\n{5}Also reduce target's AB gauge by 10 if save fails.{/}\n[r]Damage reduced by 70% and DC reduced by 3[/r] if wearing non-cloth armor.",
      th: "โจมตีด้วยเทคนิคฝ่ามือที่ทำให้เวียนหัว ทำให้ศัตรูสับสน\nสร้างความเสียหายทื่อ <FORMULA>\nเป้าหมายต้องทอย [r]ENDsave DC10 + max(<STRmod>, <DEXmod>)[/r] หรือได้รับ <DebuffDazed> 2 เทิร์น\n{5}ยังลด AB gauge ของเป้าหมาย 10 หากเซฟล้มเหลว{/}\n[r]ความเสียหายลดลง 70% และ DC ลดลง 3[/r] หากสวมเกราะที่ไม่ใช่ผ้า",
    },
    formula: {
      en: "(1d4 + max(<STRmod>, <DEXmod>)) × <SkillLevelMultiplier>",
      th: "(1d4 + max(<STRmod>, <DEXmod>)) × <SkillLevelMultiplier>",
    },
  },
  requirement: {},
  equipmentNeeded: ["bareHand"],
  tier: TierEnum.uncommon,
  isFallback: false, // Dizzying Palm: consumes 1 wind element
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
    const target = getTarget(actor, actorParty, targetParty, "enemy").from("frontFirst").one();
    if (!target) {
      return {
        content: {
          en: `${actor.name.en} tried to use Dizzying Palm but has no target`,
          th: `${actor.name.th} พยายามใช้ฝ่ามือทำให้เวียนหัวแต่ไม่พบเป้าหมาย`,
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
          en: `${actor.name.en} must be barehanded to use Dizzying Palm`,
          th: `${actor.name.th} ต้องใช้มือเปล่าเพื่อใช้ฝ่ามือทำให้เวียนหัว`,
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

    // Calculate damage: (1d4 + (STR or DEX mod, whichever is higher)) × skill level multiplier
    const levelScalar = skillLevelMultiplier(skillLevel);
    // Damage dice - should not get bless/curse
    const baseDamage = actor.roll({ amount: 1, face: 4, stat: higherMod === strMod ? "strength" : "dexterity", applyBlessCurse: false }) + higherMod;
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
    let dazeMessage = "";
    let abGaugeMessage = "";

    // Check for daze application if hit
    if (damageResult.isHit) {
      // Save DC: DC10 + (STR or DEX mod, whichever is higher)
      // Armor Penalty: If your armor is NOT cloth, DC reduced by 3
      let saveDC = 10 + higherMod;
      
      // Apply armor penalty to DC
      if (actor.equipments.body) {
        const armor = bodyRepository[actor.equipments.body];
        if (armor && armor.armorData.armorClass !== ArmorClass.Cloth) {
          saveDC -= 3;
        }
      }

      const saveRoll = target.rollSave("endurance");
      if (saveRoll < saveDC) {
        // Save failed: apply Dazed debuff for 2 turns
        buffsAndDebuffsRepository.dazed.appender(target, { turnsAppending: 2 });
        dazeMessage = ` ${target.name.en} is dazed!`;

        // Level 5: Also reduce target's AB gauge by 10 if save fails
        if (skillLevel >= 5) {
          const initialGauge = target.abGauge;
          target.abGauge = Math.max(0, target.abGauge - 10);
          const reduced = initialGauge - target.abGauge;
          if (reduced > 0) {
            abGaugeMessage = ` ${target.name.en} lost ${reduced} AB gauge!`;
          }
        }
      }
    }

    const message = buildCombatMessage(
      actor,
      target,
      { en: "Dizzying Palm", th: "ฝ่ามือทำให้เวียนหัว" },
      damageResult,
    );

    return {
      content: {
        en: `${message.en}${dazeMessage}${abGaugeMessage}`,
        th: `${message.th}${dazeMessage ? ` ${target.name.th} ถูกทำให้มึนงง!` : ""}${abGaugeMessage ? ` ${target.name.th} สูญเสีย AB gauge!` : ""}`,
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

