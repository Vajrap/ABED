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
import { skillLevelMultiplier } from "src/Utils/skillScaling";
import { BarbarianSkill } from "./index";

export const recklessSwing = new BarbarianSkill({
  id: BarbarianSkillId.RecklessSwing,
  name: {
    en: "Reckless Swing",
    th: "ฟาดไม่ยั้ง",
  },
  description: {
    text: {
      en: "Swing your weapon recklessly attacking targeted enemy {5}'three':'two'{/} times, \neach dealing <FORMULA>. {5}\n :Hit roll suffer [r]-2[/r] penalty.{/}",
      th: "เหวี่ยงอาวุธฟาดไม่ยั้งใส่เป้าหมาย โจมตีต่อเนื่อง {5}'3':'2'{/} ครั้ง \nแต่ละครั้งสร้างความเสียหาย <FORMULA> ความแม่นยำในการโจมตีลดลง [r]2[/r]",
    },
    formula: {
      en: "([r]0.7[/r] × <WeaponDamage> × <SkillLevelMultiplier>) × <MeleeRangePenalty>",
      th: "([r]0.7[/r] × <WeaponDamage> × <SkillLevelMultiplier>) × <MeleeRangePenalty>",
    },
  },
  requirement: {},
  equipmentNeeded: ["sword", "axe", "blade", "hammer", "spear", "bareHand"],
  tier: TierEnum.uncommon,
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
    const target = getTarget(actor, actorParty, targetParty, "enemy").from("frontFirst").one();

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
    const damageTypeMode = 'physical';
    const levelScalar = skillLevelMultiplier(skillLevel);
    const positionModifierValue = getPositionModifier(
      actor.position,
      target.position,
      weapon,
    );

    const hitMessagesEn: string[] = [];
    const hitMessagesTh: string[] = [];

    for (let i = 0; i < hits; i++) {
      const weaponDamage = getWeaponDamageOutput(actor, weapon, damageTypeMode);
      const rawDamage = weaponDamage.damage * 0.7;
      const scaledDamage = Math.max(
        0,
        rawDamage * levelScalar * positionModifierValue,
      );

      const damageOutput = {
        damage: Math.floor(scaledDamage),
        hit: weaponDamage.hit - (skillLevel >= 5 ? 0 : 2),
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


