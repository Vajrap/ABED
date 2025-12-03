import type { Character } from "src/Entity/Character/Character";
import { DebuffDef, type AppenderOptions } from "../../type";
import { DebuffEnum } from "../../enum";
import type { L10N } from "src/InterFacesEnumsAndTypes/L10N";

export const hexMark = new DebuffDef({
  name: {
    en: "Hex Mark",
    th: "เครื่องหมายสาป",
  },
  description: {
    en: "The target is marked with a hex sigil. The mark value decreases by 1 each turn.",
    th: "เป้าหมายถูกทำเครื่องหมายด้วยเครื่องหมายสาป ค่าเครื่องหมายลดลง 1 ในแต่ละเทิร์น",
  },
  appender: function (
    actor: Character,
    options: AppenderOptions,
  ): L10N {
    const { turnsAppending: value } = options;
    
    const entry = actor.buffsAndDebuffs.debuffs.entry.get(DebuffEnum.hexMark);
    if (!entry) {
      actor.buffsAndDebuffs.debuffs.entry.set(DebuffEnum.hexMark, {
        value: value,
        counter: 0,
      });
    } else {
      entry.value += value;
    }

    return {
      en: `${actor.name.en} is marked with a hex sigil!`,
      th: `${actor.name.th} ถูกทำเครื่องหมายด้วยเครื่องหมายสาป!`,
    };
  },

  resolver: function (actor: Character): { canAct: boolean; content: L10N } {
    const entry = actor.buffsAndDebuffs.debuffs.entry.get(DebuffEnum.hexMark);
    if (entry) {
      if (entry.value > 0) {
        entry.value -= 1;
      } else if (entry.value === 0 ) {
        actor.buffsAndDebuffs.debuffs.entry.delete(DebuffEnum.hexMark);
      }
    }

    return {
      canAct: true,
      content: {
        en: `${actor.name.en} Hex Mark duration decreased`,
        th: `${actor.name.th} "เครื่องหมายสาป" ลดลง`,
      },
    };
  },
});

