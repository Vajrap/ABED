import type { Character } from "src/Entity/Character/Character";
import { DebuffDef, type AppenderOptions } from "../../type";
import { DebuffEnum } from "../../enum";
import type { L10N } from "src/InterFacesEnumsAndTypes/L10N";
import { roll } from "src/Utils/Dice";

export const bleed = new DebuffDef({
  name: {
    en: "Bleed",
    th: "เลือดไหล",
  },
  description: {
    en: "Taking <Formula> true damage each turn.",
    th: "รับความเสียหาย <Formula> จริงในแต่ละเทิร์น",
  },
  formula: "1d3",
  appender: function (
    actor: Character,
    options: AppenderOptions,
  ): L10N {
    const { turnsAppending: value } = options;
    
    const entry = actor.buffsAndDebuffs.debuffs.entry.get(DebuffEnum.bleed);
    if (!entry) {
      actor.buffsAndDebuffs.debuffs.entry.set(DebuffEnum.bleed, {
        value: value,
        counter: 0,
      });
    } else {
      entry.value += value;
    }

    return {
      en: `${actor.name.en} is bleeding! ${value} stack(s)`,
      th: `${actor.name.th} กำลังเลือดไหล! ${value} หน่วย`,
    };
  },

  resolver: function (actor: Character): { canAct: boolean; content: L10N } {
    const entry = actor.buffsAndDebuffs.debuffs.entry.get(DebuffEnum.bleed);
    if (entry && entry.value > 0) {
      // Deal 1d3 damage per stack
      const damage = roll(1).d(3).total;
      actor.vitals.decHp(damage);
      entry.value -= 1; // Reduce duration by 1 turn
      
      return {
        canAct: true,
        content: {
          en: `${actor.name.en} bleeds for ${damage} damage (remaining ${entry.value} turn(s))`,
          th: `${actor.name.th} เลือดไหล ${damage} หน่วย (เหลือ ${entry.value} เทิร์น)`,
        },
      };
    }
    
    if (entry && entry.value === 0) {
      actor.buffsAndDebuffs.debuffs.entry.delete(DebuffEnum.bleed);
    }

    return {
      canAct: true,
      content: {
        en: `${actor.name.en} bleed decreased`,
        th: `${actor.name.th} "เลือดไหล" ลดลง`,
      },
    };
  },
});

