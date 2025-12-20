import type { Character } from "src/Entity/Character/Character";
import { BuffDef, type AppenderOptions } from "../../type";
import { BuffEnum } from "../../enum";
import type { L10N } from "src/InterFacesEnumsAndTypes/L10N";
import { ATTRIBUTE_KEYS, type AttributeKey } from "src/InterFacesEnumsAndTypes/Enums";

export const battleFormation = new BuffDef({
  name: {
    en: "Battle Formation",
    th: "รูปแบบการรบ",
  },
  description: {
    en: "Grants +2 pDEF, +2 mDEF, and +1 to all saving throws.",
    th: "ให้ +2 pDEF, +2 mDEF และ +1 ต่อการทอย save ทั้งหมด",
  },
  formula: "pDEF +2, mDEF +2, All saves +1",
  appender: function (
    actor: Character,
    options: AppenderOptions,
  ): L10N {
    const { turnsAppending: value } = options;
    
    const entry = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.battleFormation);
    if (!entry) {
      actor.buffsAndDebuffs.buffs.entry.set(BuffEnum.battleFormation, {
        value,
        counter: 0,
      });
      // Apply pDEF and mDEF bonuses
      actor.battleStats.mutateBattle("pDEF", 2);
      actor.battleStats.mutateBattle("mDEF", 2);
      // Apply +1 to all saving throws
      for (const attr of ATTRIBUTE_KEYS) {
        actor.saveRolls.mutateBattle(attr as AttributeKey, 1);
      }
    } else {
      entry.value += value;
    }

    return {
      en: `${actor.name.en} gains Battle Formation! (+2 pDEF, +2 mDEF, +1 to all saves)`,
      th: `${actor.name.th} ได้รับ Battle Formation! (+2 pDEF, +2 mDEF, +1 ต่อการทอย save ทั้งหมด)`,
    };
  },

  resolver: function (actor: Character): { canAct: boolean; content: L10N } {
    let removed = false;
    const entry = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.battleFormation);
    if (entry) {
      if (entry.value > 0) {
        entry.value -= 1;
      } else if (entry.value === 0) {
        // Remove bonuses
        actor.battleStats.mutateBattle("pDEF", -2);
        actor.battleStats.mutateBattle("mDEF", -2);
        // Remove +1 from all saving throws
        for (const attr of ATTRIBUTE_KEYS) {
          actor.saveRolls.mutateBattle(attr as AttributeKey, -1);
        }
        actor.buffsAndDebuffs.buffs.entry.delete(BuffEnum.battleFormation);
        removed = true;
      }
    }

    return {
      canAct: true,
      content: {
        en: `${actor.name.en} Battle Formation decreased by 1 turn. ${removed ? "Bonuses removed." : ""}`,
        th: `${actor.name.th} Battle Formation ลดลง 1 เทิร์น. ${removed ? "โบนัสถูกลบแล้ว" : ""}`,
      },
    };
  },
});

