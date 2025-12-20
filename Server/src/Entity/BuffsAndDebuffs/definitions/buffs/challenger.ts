import type { Character } from "src/Entity/Character/Character";
import { BuffDef, type AppenderOptions } from "../../type";
import { BuffEnum } from "../../enum";
import type { L10N } from "src/InterFacesEnumsAndTypes/L10N";

export const challenger = new BuffDef({
  name: {
    en: "Challenger",
    th: "ผู้ท้าทาย",
  },
  description: {
    en: "+2 hit roll, +2 crit chance against Challenged target",
    th: "+2 hit roll, +2 crit chance ต่อเป้าหมายที่ถูกท้าทาย",
  },
  formula: "+2 hit roll, +2 crit chance against Challenged target",
  appender: function (
    actor: Character,
    options: AppenderOptions,
  ): L10N {
    const { turnsAppending: value } = options;
    
    const entry = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.challenger);
    if (!entry) {
      actor.buffsAndDebuffs.buffs.entry.set(BuffEnum.challenger, {
        value,
        counter: 0,
      });
      // Note: Hit and crit bonuses are handled in damage resolution when checking against Challenged target
    } else {
      entry.value += value;
    }

    return {
      en: `${actor.name.en} challenges an opponent! (+2 hit/crit vs Challenged target)`,
      th: `${actor.name.th} ท้าทายคู่ต่อสู้! (+2 hit/crit ต่อเป้าหมายที่ถูกท้าทาย)`,
    };
  },

  resolver: function (actor: Character): { canAct: boolean; content: L10N } {
    const entry = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.challenger);
    
    if (entry && entry.value > 0) {
      entry.value -= 1;

      if (entry.value === 0) {
        actor.buffsAndDebuffs.buffs.entry.delete(BuffEnum.challenger);
        return {
          canAct: true,
          content: {
            en: `${actor.name.en}'s Challenger buff expired.`,
            th: `${actor.name.th} Challenger buff หมดอายุ`,
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

