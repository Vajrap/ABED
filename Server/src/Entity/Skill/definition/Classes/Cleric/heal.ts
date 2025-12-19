import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { ClericSkillId } from "../../../enums";
import type { Character } from "src/Entity/Character/Character";
import { ActorEffect, TargetEffect } from "../../../effects";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { getTarget } from "src/Entity/Battle/getTarget";
import { ClericSkill } from "./index";
import { buffsRepository } from "src/Entity/BuffsAndDebuffs/repository";
import { BuffEnum } from "src/Entity/BuffsAndDebuffs/enum";
import { basicAttack } from "../../basicAttack";

export const heal = new ClericSkill({
  id: ClericSkillId.Heal,
  name: {
    en: "Heal",
    th: "รักษา",
  },
  description: {
    text: {
      en: "Cast a healing spell, restore HP to an ally with least HP percentage. \nHeals for <FORMULA>. \nThen roll D20 + will mod vs DC13 if success [b]removes one random debuff[/b] from the target.\nIf all allies are at full HP, will deal basic attack instead.\nIf successful heal, gain 1 Faith.",
      th: "ร่ายเวทย์มนต์รักษา ฟื้นฟู HP ให้กับพันธมิตร \nรักษา <FORMULA> \nจากนั้นทอย D20 + will mod vs DC13 หากผ่าน [b]ลบหนึ่งดีบัฟแบบสุ่ม[/b]จากเป้าหมาย\nหากพันธมิตรทั้งหมดมี HP เต็ม จะโจมตีปกติแทน\nหากรักษาสำเร็จ ได้รับ 1 ศรัทธา",
    },
    formula: {
      en: "1d4 + <WILmod>",
      th: "1d4 + <WILmod>",
    },
  },
  requirement: {},
  equipmentNeeded: [],
  tier: TierEnum.common,
  cooldown: 3,
  consume: {
    hp: 0,
    mp: 3,
    sp: 0,
    elements: [],
  },
  produce: {
    hp: 0,
    mp: 0,
    sp: 0,
    elements: [
      {
        element: "order",
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
  ) => {
    // Find injured allies (prioritize injured, but can heal full HP allies too)
    let canHeal = false;
    let possibleTargets = actorParty.filter(
      (ally) => ally.id !== actor.id && !ally.vitals.isDead && ally.vitals.hp.current < ally.vitals.hp.max,
    );

    if (possibleTargets.length > 0) {
      canHeal = true;
    }

    if (canHeal) {
      // Prefer injured allies, but can target any ally
      const target = getTarget(actor, actorParty, targetParty, "ally")
        .with("least", "currentHPPercentage")
        .one();
      if (!target) {
        return {
          content: {
            en: `${actor.name.en} tried to heal but has no valid target`,
            th: `${actor.name.th} พยายามรักษาแต่ไม่พบเป้าหมาย`,
          },
          actor: {
            actorId: actor.id,
            effect: [ActorEffect.TestSkill],
          },
          targets: [],
        };
      }

      const healAmount = actor.roll({
        amount: 1,
        face: 4,
        stat: "willpower",
      });

      // Apply healing
      const beforeHp = target.vitals.hp.current;
      target.vitals.incHp(healAmount);
      const actualHeal = target.vitals.hp.current - beforeHp;

      // Remove one debuff: roll D20 + willMod vs DC13
      let debuffRemoved = "";
      const debuffRoll = actor.roll({
        amount: 1,
        face: 20,
        stat: "willpower",
      });
      
      if (debuffRoll >= 13 && target.buffsAndDebuffs.debuffs.entry.size > 0) {
        const debuffEntries = Array.from(
          target.buffsAndDebuffs.debuffs.entry.entries(),
        );
        const randomIndex = Math.floor(Math.random() * debuffEntries.length);
        const [randomDebuffId] = debuffEntries[randomIndex]!;
        target.buffsAndDebuffs.debuffs.entry.delete(randomDebuffId);
        debuffRemoved = ` ${target.name.en} was cleansed of a debuff.`;
      }

      // Gain 1 Faith if successful heal
      if (actualHeal > 0) {
        buffsRepository[BuffEnum.faith].appender(actor, { turnsAppending: 1 });
      }

      return {
        content: {
          en: `${actor.name.en} healed ${target.name.en} for ${actualHeal} HP.${debuffRemoved}${actualHeal > 0 ? " Gained 1 Faith." : ""}`,
          th: `${actor.name.th} รักษา ${target.name.th} ${actualHeal} HP.${debuffRemoved ? ` ${target.name.th} ถูกชำระล้าง debuff` : ""}${actualHeal > 0 ? " ได้รับ 1 ศรัทธา" : ""}`,
        },
        actor: {
          actorId: actor.id,
          effect: [ActorEffect.Cast],
        },
        targets: [
          {
            actorId: target.id,
            effect: [TargetEffect.TestSkill],
          },
        ],
      };
    } else {
      return basicAttack.exec(actor, actorParty, targetParty, skillLevel, location);
    }
  },
});
