import type { Character } from "src/Entity/Character/Character";
import { BuffDef } from "../../type";
import { BuffEnum } from "../../enum";
import type { L10N } from "src/InterFacesEnumsAndTypes/L10N";

export const curseMarkActive = new BuffDef({
  name: {
    en: "Curse Mark Active",
    th: "เครื่องหมายคำสาปใช้งาน",
  },
  appender: function (
    actor: Character,
    value: number,
    isPerm: boolean,
    permValue: number,
  ): L10N {
    const entry = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.curseMarkActive);
    if (!entry) {
      actor.buffsAndDebuffs.buffs.entry.set(BuffEnum.curseMarkActive, {
        value: value,
        isPerm: isPerm,
        permValue: permValue, // Store INT mod for bonus damage
      });
    } else {
      if (!entry.isPerm && isPerm) {
        entry.isPerm = true;
      }
      entry.value += value;
      // Use higher INT mod
      entry.permValue = Math.max(entry.permValue, permValue);
    }

    return {
      en: `${actor.name.en} gains Curse Mark Active: bonus damage against marked enemies!`,
      th: `${actor.name.th} ได้รับ "เครื่องหมายคำสาปใช้งาน": ความเสียหายเพิ่มต่อเป้าหมายที่ถูกทำเครื่องหมาย!`,
    };
  },

  resolver: function (actor: Character): { canAct: boolean; content: L10N } {
    const entry = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.curseMarkActive);
    if (entry) {
      if (entry.value > 0) {
        entry.value -= 1;
      } else if (entry.value === 0 && entry.permValue === 0) {
        actor.buffsAndDebuffs.buffs.entry.delete(BuffEnum.curseMarkActive);
      }
    }

    return {
      canAct: true,
      content: {
        en: `${actor.name.en} Curse Mark Active duration decreased`,
        th: `${actor.name.th} "เครื่องหมายคำสาปใช้งาน" ลดลง`,
      },
    };
  },
});

