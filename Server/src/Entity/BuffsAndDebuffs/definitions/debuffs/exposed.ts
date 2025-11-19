import type { Character } from "src/Entity/Character/Character";
import { DebuffDef } from "../../type";
import { DebuffEnum } from "../../enum";
import type { L10N } from "src/InterFacesEnumsAndTypes/L10N";

export const exposed = new DebuffDef({
  name: {
    en: "Exposed",
    th: "เปิดเผยจุดอ่อน",
  },
  appender: function (
    actor: Character,
    value: number,
    isPerm: boolean,
    permValue: number,
  ): L10N {
    const entry = actor.buffsAndDebuffs.debuffs.entry.get(DebuffEnum.exposed);
    let isFirst = false;
    if (!entry) {
      actor.buffsAndDebuffs.debuffs.entry.set(DebuffEnum.exposed, {
        value: value,
        isPerm: isPerm,
        permValue: permValue,
      });
      // At skill level 5+, permValue is 1, which means -2 to critical defense
      if (permValue > 0) {
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
      entry.permValue = Math.max(entry.permValue, permValue); // Keep the higher permValue
    }

    return {
      en: `${actor.name.en} is Exposed! Takes additional 1d3 damage from all sources${permValue > 0 ? " and -2 to critical defense" : ""}`,
      th: `${actor.name.th} ถูกเปิดเผยจุดอ่อน! รับความเสียหายเพิ่ม 1d3 จากทุกแหล่ง${permValue > 0 ? " และป้องกันคริติคอล -2" : ""}`,
    };
  },

  resolver: function (actor: Character): { canAct: boolean; content: L10N } {
    const entry = actor.buffsAndDebuffs.debuffs.entry.get(DebuffEnum.exposed);
    if (entry) {
      if (entry.value > 0) {
        entry.value -= 1;
      } else if (entry.value === 0 && entry.permValue === 0) {
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

