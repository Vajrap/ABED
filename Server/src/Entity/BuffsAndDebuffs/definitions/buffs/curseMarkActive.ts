import type { Character } from "src/Entity/Character/Character";
import { BuffDef, type AppenderOptions } from "../../type";
import { BuffEnum } from "../../enum";
import type { L10N } from "src/InterFacesEnumsAndTypes/L10N";

export const curseMarkActive = new BuffDef({
  name: {
    en: "Curse Mark Active",
    th: "เครื่องหมายคำสาปใช้งาน",
  },
  description: {
    en: "Grants bonus damage against marked enemies. The Intelligence modifier for bonus damage is stored in universalCounter and remains constant throughout the buff's duration.",
    th: "ให้ความเสียหายเพิ่มต่อศัตรูที่ถูกทำเครื่องหมาย โมดิไฟเออร์ปัญญาสำหรับความเสียหายเพิ่มถูกเก็บใน universalCounter และคงที่ตลอดระยะเวลาของบัฟ",
  },
  formula: "Bonus damage = INT mod (stored in universalCounter, constant during buff duration)",
  appender: function (
    actor: Character,
    options: AppenderOptions,
  ): L10N {
    const {
      turnsAppending: value,
      universalCounter = 0,
    } = options;
    
    const entry = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.curseMarkActive);
    if (!entry) {
      actor.buffsAndDebuffs.buffs.entry.set(BuffEnum.curseMarkActive, {
        value: value,
        counter: universalCounter, // Store INT mod for bonus damage
      });
    } else {
      entry.value += value;
      // Use higher INT mod
      entry.counter = Math.max(entry.counter, universalCounter);
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
      } else if (entry.value === 0 && entry.counter === 0) {
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

