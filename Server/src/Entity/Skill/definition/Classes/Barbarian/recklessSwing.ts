import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { BarbarianSkillId } from "../../../enums";
import type { Character } from "src/Entity/Character/Character";
import { getWeaponDamageOutput } from "src/Utils/getWeaponDamgeOutput";
import type { TurnResult } from "../../../types";
import { buildCombatMessage } from "src/Utils/buildCombatMessage";
import { getTarget } from "src/Entity/Battle/getTarget";
import { ActorEffect, TargetEffect } from "../../../effects";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { resolveDamage } from "src/Entity/Battle/damageResolution";
import { getPositionModifier } from "src/Utils/getPositionModifier";
import { getWeaponDamageType } from "src/Utils/getWeaponDamageType";
import { statMod } from "src/Utils/statMod";
import { skillLevelMultiplier } from "src/Utils/skillScaling";
import { BarbarianSkill } from "./index";

export const recklessSwing = new BarbarianSkill({
  id: BarbarianSkillId.RecklessSwing,
  name: {
    en: "Reckless Swing",
    th: "ฟาดไม่ยั้ง",
  },
  description: {
    en: "Multi-hit melee attack. Must equip sword, axe, blade, hammer, spear, or fight barehanded. Two hits (three hits at level 5), each dealing (0.7 × weapon damage + STR mod) * (1 + 0.1 * skill level) * positionModifier. Hit rolls suffer -3 penalty.",
    th: "การโจมตีหลายครั้ง ต้องใช้อาวุธประเภทดาบ ขวาน ใบมีด ฆ้อน หอก หรือมือเปล่า ฟัน 2 ครั้ง (3 ครั้งที่เลเวล 5) แต่ละครั้งสร้างความเสียหาย (0.7 × ความเสียหายอาวุธ + STR mod) * (1 + 0.1 * เลเวลสกิล) * positionModifier และลดโอกาสโจมตีลง 3",
  },
  requirement: {},
  equipmentNeeded: ["sword", "axe", "blade", "hammer", "spear", "bareHand"],
  tier: TierEnum.common,
  consume: {
    hp: 0,
    mp: 0,
    sp: 4,
    elements: [
      { element: "fire", value: 1 },
    ],
  },
  produce: {
    hp: 0,
    mp: 0,
    sp: 0,
    elements: [
      { element: "neutral", min: 1, max: 1 },
    ],
  },
  exec: (
    actor: Character,
    actorParty: Character[],
    targetParty: Character[],
    skillLevel: number,
    location: LocationsEnum,
  ): TurnResult => {
    const target = getTarget(actor, targetParty).from("frontFirst").one();

    if (!target) {
      return {
        content: {
          en: `${actor.name.en} tried to unleash Reckless Swing but has no target`,
          th: `${actor.name.th} พยายามฟาดไม่ยั้งแต่ไม่พบเป้าหมาย`,
        },
        actor: {
          actorId: actor.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    }

    const hits = skillLevel >= 5 ? 3 : 2;
    const weapon = actor.getWeapon();
    const damageTypeMode = "physical";
    const levelScalar = skillLevelMultiplier(skillLevel);
    const strMod = statMod(actor.attribute.getTotal("strength"));
    const positionModifierValue = getPositionModifier(
      actor.position,
      target.position,
      weapon,
    );

    const hitMessagesEn: string[] = [];
    const hitMessagesTh: string[] = [];

    for (let i = 0; i < hits; i++) {
      const weaponDamage = getWeaponDamageOutput(actor, weapon, damageTypeMode);
      const rawDamage = (weaponDamage.damage * 0.7 + strMod);
      const scaledDamage = Math.max(
        0,
        rawDamage * levelScalar * positionModifierValue,
      );

      const damageOutput = {
        damage: Math.floor(scaledDamage),
        hit: weaponDamage.hit - 3,
        crit: weaponDamage.crit,
        type: weaponDamage.type,
        isMagic: false,
      };

      const result = resolveDamage(actor.id, target.id, damageOutput, location);
      const combatMsg = buildCombatMessage(
        actor,
        target,
        { en: `Reckless Swing (${i + 1})`, th: `ฟาดไม่ยั้ง (${i + 1})` },
        result,
      );

      hitMessagesEn.push(combatMsg.en);
      hitMessagesTh.push(combatMsg.th);
    }

    return {
      content: {
        en: hitMessagesEn.join(" "),
        th: hitMessagesTh.join(" "),
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


