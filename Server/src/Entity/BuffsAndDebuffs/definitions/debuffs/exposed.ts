import type { Character } from "src/Entity/Character/Character";
import { DebuffDef, type AppenderOptions } from "../../type";
import { DebuffEnum } from "../../enum";
import type { L10N } from "src/InterFacesEnumsAndTypes/L10N";

export const exposed = new DebuffDef({
  name: {
    en: "Exposed",
    th: "เปิดเผยจุดอ่อน",
  },
  description: {
    en: "The target takes additional <FORMULA> from all sources. {COUNTER>=1}[r]And CritDef -2[/r]{/}",
    th: "เป้าหมายรับความเสียหายเพิ่ม <FORMULA> จากทุกแหล่ง {COUNTER>=1}[r]และป้องกันคริติคอล -2[/r]{/}",
  },
  formula: "1d3 damage",
  appender: function (
    actor: Character,
    options: AppenderOptions,
  ): L10N {
    const value = options.turnsAppending;
    const counter = options.universalCounter || 0;
    
    const entry = actor.buffsAndDebuffs.debuffs.entry.get(DebuffEnum.exposed);
    if (!entry) {
      actor.buffsAndDebuffs.debuffs.entry.set(DebuffEnum.exposed, {
        value: value,
        counter: counter || 0, // counter stores skill level indicator (1 = level 5+, 0 = not)
      });
    } else {
      entry.value += value;
    }

    return {
      en: `${actor.name.en} is Exposed! Takes additional 1d3 damage from all sources${counter > 0 ? " and -2 to critical defense" : ""}`,
      th: `${actor.name.th} ถูกเปิดเผยจุดอ่อน! รับความเสียหายเพิ่ม 1d3 จากทุกแหล่ง${counter > 0 ? " และป้องกันคริติคอล -2" : ""}`,
    };
  },

  resolver: function (actor: Character): { canAct: boolean; content: L10N } {
    const entry = actor.buffsAndDebuffs.debuffs.entry.get(DebuffEnum.exposed);
    if (entry) {
      if (entry.value > 0) {
        entry.value -= 1;
      } else if (entry.value === 0 && entry.counter === 0) {
        actor.buffsAndDebuffs.debuffs.entry.delete(DebuffEnum.exposed);
      }
    }

    return {
      canAct: true,
      content: {
        en: `${actor.name.en} Exposed duration decreased`,
        th: `${actor.name.th} "เปิดเผยจุดอ่อน" ลดลง`,
      },
    };
  },
});

