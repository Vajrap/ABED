import type { Character } from "src/Entity/Character/Character";
import type { BuffsAndDebuffsDef } from "../type";
import { BuffsAndDebuffsEnum } from "../enum";
import type { L10N } from "src/InterFacesEnumsAndTypes/L10N";
import { roll } from "src/Utils/Dice";
import { statMod } from "src/Utils/statMod";

export const spiritRattle: BuffsAndDebuffsDef = {
  name: {
    en: "spiritRattle",
    th: "กระดิ่งวิญญาณ",
  },
  appender: function (
    actor: Character,
    value: number,
  ): L10N {
    const entry = actor.buffsAndDebuffs.entry.get(BuffsAndDebuffsEnum.spiritRattle);
    if (!entry) {
      actor.buffsAndDebuffs.entry.set(BuffsAndDebuffsEnum.spiritRattle, {
        value: value,
        isPerm: false,
        permValue: 0,
      });
    } else {
      entry.value += value;
    }

    return {
      en: `${actor.name.en} got spirit rattle buff: duration ${value} turns`,
      th: `${actor.name.th} ได้รับ "กระดิ่งวิญญาณ" เป็นเวลา ${value} เทิร์น`,
    };
  },

  resolver: function (actor: Character): { canAct: boolean; content: L10N } {
    const entry = actor.buffsAndDebuffs.entry.get(BuffsAndDebuffsEnum.spiritRattle);
    let heall = 0;
    if (entry) {
      if (entry.value > 0) {
        entry.value -= 1;
        heall = roll(1).d(4).total + statMod(actor.attribute.getTotal("willpower"));
        actor.vitals.incHp(heall);
      }
    }
    if (entry && entry.value === 0) {
      actor.buffsAndDebuffs.entry.delete(BuffsAndDebuffsEnum.spiritRattle);
    }

    return {
      canAct: true,
      content: {
        en: `${actor.name.en} spirit rattle decreased: duration goes down by 1 turn and healed for ${heall} HP`,
        th: `${actor.name.th} "กระดิ่งวิญญาณ" ลดลง 1 เทิร์นและรักษาตัวเอง ${heall} HP`,
      },
    };
  },
};
