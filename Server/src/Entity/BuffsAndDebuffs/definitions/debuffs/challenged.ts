import type { Character } from "src/Entity/Character/Character";
import { DebuffDef, type AppenderOptions } from "../../type";
import { DebuffEnum } from "../../enum";
import type { L10N } from "src/InterFacesEnumsAndTypes/L10N";

export const challenged = new DebuffDef({
  name: {
    en: "Challenged",
    th: "ถูกท้าทาย",
  },
  description: {
    en: "Marked for single combat. The challenger gains +2 hit/crit against you.",
    th: "ถูกทำเครื่องหมายสำหรับการต่อสู้แบบตัวต่อตัว ผู้ท้าทายได้รับ +2 hit/crit ต่อคุณ",
  },
  formula: "Marked for single combat",
  appender: function (
    actor: Character,
    options: AppenderOptions,
  ): L10N {
    const { turnsAppending: value } = options;
    
    const entry = actor.buffsAndDebuffs.debuffs.entry.get(DebuffEnum.challenged);
    if (!entry) {
      actor.buffsAndDebuffs.debuffs.entry.set(DebuffEnum.challenged, {
        value,
        counter: 0,
      });
    } else {
      entry.value += value;
    }

    return {
      en: `${actor.name.en} has been challenged to single combat!`,
      th: `${actor.name.th} ถูกท้าทายให้ต่อสู้แบบตัวต่อตัว!`,
    };
  },

  resolver: function (actor: Character): { canAct: boolean; content: L10N } {
    const entry = actor.buffsAndDebuffs.debuffs.entry.get(DebuffEnum.challenged);
    
    if (entry && entry.value > 0) {
      entry.value -= 1;

      if (entry.value === 0) {
        actor.buffsAndDebuffs.debuffs.entry.delete(DebuffEnum.challenged);
        return {
          canAct: true,
          content: {
            en: `${actor.name.en}'s Challenged debuff expired.`,
            th: `${actor.name.th} Challenged debuff หมดอายุ`,
          },
        };
      }

      return {
        canAct: true,
        content: {
          en: ``,
          th: ``,
        },
      };
    }

    return {
      canAct: true,
      content: {
        en: ``,
        th: ``,
      },
    };
  },
});

