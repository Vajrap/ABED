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

export const palmStrike = new MonkSkill({
  id: MonkSkillId.PalmStrike,
  name: {
    en: "Palm Strike",
    th: "ตบฝ่ามือ",
  },
  description: {
    en: "A precise melee strike using internal force. Deal 1d6 (1d8 at level 5) + (STR or DEX mod, whichever higher) * position modifier blunt damage. Each level ignores 1 point of armor. If armor is NOT cloth, damage is reduced by 70%.",
    th: "การโจมตีระยะประชิดที่แม่นยำด้วยพลังภายใน สร้างความเสียหายทื่อ 1d6 (1d8 ที่เลเวล 5) + (STR หรือ DEX mod สูงสุด) * position modifier แต่ละเลเวลจะเพิกเฉยต่อเกราะ 1 หน่วย หากเกราะไม่ใช่ผ้า ความเสียหายจะลดลง 70%",
  },
  requirement: {},
  equipmentNeeded: ["bareHand"],
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
    const target = getTarget(actor, actorParty, targetParty, "enemy").from("frontFirst").one();
    if (!target) {
      return {
        content: {
          en: `${actor.name.en} tried to use Palm Strike but has no target`,
          th: `${actor.name.th} พยายามใช้ตบฝ่ามือแต่ไม่พบเป้าหมาย`,
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
          en: `${actor.name.en} must be barehanded to use Palm Strike`,
          th: `${actor.name.th} ต้องใช้มือเปล่าเพื่อใช้ตบฝ่ามือ`,
        },
        actor: {
          actorId: actor.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    }

    // deal 1d6 + (str | dex mod whichever higher) * (position modifier) blunt damage
    // at level 5 damage dice = 1d8
    const diceFace = skillLevel >= 5 ? 8 : 6;
    const baseDamage = roll(1).d(diceFace).total;
    const strMod = statMod(actor.attribute.getTotal("strength"));
    const dexMod = statMod(actor.attribute.getTotal("dexterity"));
    const higherMod = Math.max(strMod, dexMod);

    const positionModifier = getPositionModifier(actor.position, target.position, weapon);
    let totalDamage = baseDamage + higherMod;
    totalDamage = Math.floor(totalDamage * positionModifier);

    // Each level ignore 1 point of armor - add as bonus damage to effectively ignore armor
    const armorIgnore = skillLevel;
    totalDamage += armorIgnore;

    const damageOutput = {
      damage: totalDamage,
      hit: rollTwenty().total + statMod(actor.attribute.getTotal("control")),
      crit: rollTwenty().total + statMod(actor.attribute.getTotal("luck")),
      type: DamageType.blunt,
      isMagic: false,
    };

    // If armor is NOT cloth, damageOutput reduce by 70%
    if (actor.equipments.body) {
      const armor = bodyRepository[actor.equipments.body];
      if (armor && armor.armorData.armorClass !== ArmorClass.Cloth) {
        damageOutput.damage = Math.floor(damageOutput.damage * 0.3);
      }
    }

    const damageResult = resolveDamage(actor.id, target.id, damageOutput, location);
    const message = buildCombatMessage(
      actor,
      target,
      { en: "Palm Strike", th: "ตบฝ่ามือ" },
      damageResult,
    );

    return {
      content: message,
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

