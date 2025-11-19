import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { ClericSkillId } from "../../../enums";
import type { Character } from "src/Entity/Character/Character";
import { ActorEffect, TargetEffect } from "../../../effects";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { roll } from "src/Utils/Dice";
import { statMod } from "src/Utils/statMod";
import { getTarget } from "src/Entity/Battle/getTarget";
import { ClericSkill } from "./index";

export const heal = new ClericSkill({
  id: ClericSkillId.Heal,
  name: {
    en: "Heal",
    th: "รักษา",
  },
  description: {
    en: "Restore HP to an ally with least HP percentage. Heals for 1d6 + willpower modifier * (1 + 0.1 * skill level). At level 3+, also removes one debuff from the target.",
    th: "ฟื้นฟู HP ให้กับพันธมิตร รักษา 1d6 + ค่า willpower + เลเวลสกิล ที่เลเวล 3+ จะลบ debuff หนึ่งตัวจากเป้าหมายด้วย",
  },
  requirement: {},
  equipmentNeeded: [],
  tier: TierEnum.common,
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
    const possibleTargets = actorParty.filter(
      (ally) => ally.id !== actor.id && !ally.vitals.isDead,
    );

    if (possibleTargets.length === 0) {
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

    // Prefer injured allies, but can target any ally
    const target = getTarget(actor, actorParty).with('least', 'currentHPPercentage').one();
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
    
    // Calculate healing: 1d6 + willpower mod + skill level
    const willpowerMod = statMod(actor.attribute.getTotal("willpower"));
    const baseHeal = roll(1).d(6).total + willpowerMod + skillLevel;
    const healAmount = Math.max(1, baseHeal);

    // Apply healing
    const beforeHp = target.vitals.hp.current;
    target.vitals.incHp(healAmount);
    const actualHeal = target.vitals.hp.current - beforeHp;

    // At level 3+, remove one debuff
    let debuffRemoved = "";
    if (skillLevel >= 3 && target.buffsAndDebuffs.debuffs.entry.size > 0) {
      const debuffEntries = Array.from(
        target.buffsAndDebuffs.debuffs.entry.entries(),
      );
      const randomIndex = Math.floor(Math.random() * debuffEntries.length);
      const [randomDebuffId] = debuffEntries[randomIndex]!;
      target.buffsAndDebuffs.debuffs.entry.delete(randomDebuffId);
      debuffRemoved = ` ${target.name.en} was cleansed of a debuff.`;
    }

    return {
      content: {
        en: `${actor.name.en} healed ${target.name.en} for ${actualHeal} HP.${debuffRemoved}`,
        th: `${actor.name.th} รักษา ${target.name.th} ${actualHeal} HP.${debuffRemoved ? ` ${target.name.th} ถูกชำระล้าง debuff` : ""}`,
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
  },
});

