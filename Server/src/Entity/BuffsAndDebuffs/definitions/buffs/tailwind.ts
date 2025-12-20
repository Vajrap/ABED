import type { Character } from "src/Entity/Character/Character";
import { BuffDef, type AppenderOptions } from "../../type";
import { BuffEnum } from "../../enum";
import type { L10N } from "src/InterFacesEnumsAndTypes/L10N";

export const tailwind = new BuffDef({
  name: {
    en: "Tailwind",
    th: "ลมหนุน",
  },
  description: {
    en: "Each stack increases AB gauge gain. Decreases every turn unless WindFury is active.",
    th: "แต่ละสแต็กเพิ่ม AB gauge gain ลดลงทุกเทิร์นเว้นแต่ WindFury เปิดใช้งาน",
  },
  formula: "Each stack: +X AB gauge gain per cycle (X = stack count). Decreases by 1 each turn unless WindFury active",
  appender: function (actor: Character, options: AppenderOptions): L10N {
    const { turnsAppending: value } = options;
    const entry = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.tailwind);
    if (!entry) {
      actor.buffsAndDebuffs.buffs.entry.set(BuffEnum.tailwind, {
        value: value,
        counter: 0,
      });
    } else {
      entry.value += value;
    }

    return {
      en: `${actor.name.en} gained ${value} stack(s) of Tailwind!`,
      th: `${actor.name.th} ได้รับ Tailwind ${value} สแต็ก!`,
    };
  },

  resolver: function (actor: Character): { canAct: boolean; content: L10N } {
    const entry = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.tailwind);
    
    if (entry && entry.value > 0) {
      // Check if WindFury is active - if so, Tailwind won't decrease
      const windFuryEntry = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.windFury);
      if (!windFuryEntry || windFuryEntry.value === 0) {
        // No WindFury active, decrease Tailwind by 1
        entry.value -= 1;
      }
      // If WindFury is active, do nothing (Tailwind stays the same)
      
      // Remove if stacks reach 0
      if (entry.value === 0) {
        actor.buffsAndDebuffs.buffs.entry.delete(BuffEnum.tailwind);
      }
    }

    return {
      canAct: true,
      content: {
        en: entry && entry.value > 0 
          ? `${actor.name.en} has ${entry.value} stack(s) of Tailwind${actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.windFury)?.value ? " (protected by WindFury)" : ""}`
          : `${actor.name.en}'s Tailwind has expired`,
        th: entry && entry.value > 0
          ? `${actor.name.th} มี Tailwind ${entry.value} สแต็ก${actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.windFury)?.value ? " (ป้องกันโดย WindFury)" : ""}`
          : `${actor.name.th} Tailwind หมดอายุแล้ว`,
      },
    };
  },
});

