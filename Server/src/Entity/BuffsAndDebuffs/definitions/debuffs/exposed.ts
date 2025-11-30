import type { Character } from "src/Entity/Character/Character";
import { DebuffDef, type AppenderOptions } from "../../type";
import { DebuffEnum } from "../../enum";
import type { L10N } from "src/InterFacesEnumsAndTypes/L10N";

export const exposed = new DebuffDef({
  name: {
    en: "Exposed",
    th: "เปิดเผยจุดอ่อน",
  },
  appender: function (
    actor: Character,
    options: AppenderOptions,
  ): L10N {
    const {
      turnsAppending: value,
      isPerm = false,
      universalCounter = 0,
    } = options;
    
    const entry = actor.buffsAndDebuffs.debuffs.entry.get(DebuffEnum.exposed);
    let isFirst = false;
    if (!entry) {
      actor.buffsAndDebuffs.debuffs.entry.set(DebuffEnum.exposed, {
        value: value,
        isPerm: isPerm,
        permValue: 0,
        counter: universalCounter, // counter stores skill level indicator (1 = level 5+, 0 = not)
      });
      // At skill level 5+, counter is 1, which means -2 to critical defense
      if (universalCounter > 0) {
        // Critical defense is based on endurance mod, so we reduce it via battle stats
        // Actually, critical defense is calculated as statMod(endurance), so we can't directly modify it
        // Instead, we'll track this in the debuff and apply it in damageResolution
        isFirst = true;
      }
    } else {
      if (!entry.isPerm && isPerm) {
        entry.isPerm = true;
      }
      entry.value += value;
      entry.counter = Math.max(entry.counter, universalCounter); // Keep the higher counter
    }

    return {
      en: `${actor.name.en} is Exposed! Takes additional 1d3 damage from all sources${universalCounter > 0 ? " and -2 to critical defense" : ""}`,
      th: `${actor.name.th} ถูกเปิดเผยจุดอ่อน! รับความเสียหายเพิ่ม 1d3 จากทุกแหล่ง${universalCounter > 0 ? " และป้องกันคริติคอล -2" : ""}`,
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

