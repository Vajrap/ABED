import type { Character } from "src/Entity/Character/Character";
import { BuffDef, type AppenderOptions } from "../../type";
import { BuffEnum } from "../../enum";
import type { L10N } from "src/InterFacesEnumsAndTypes/L10N";
import { roll } from "src/Utils/Dice";
import { statMod } from "src/Utils/statMod";

export const spiritRattle = new BuffDef({
  name: {
    en: "spiritRattle",
    th: "กระดิ่งวิญญาณ",
  },
  description: {
    en: "Heals the character each turn for <FORMULA>",
    th: "รักษาตัวละครในแต่ละเทิร์น <FORMULA>",
  },
  formula: "1d4 + <WILmod>",
  appender: function (
    actor: Character,
    options: AppenderOptions,
  ): L10N {
    const { turnsAppending: value } = options;
    const entry = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.spiritRattle);
    if (!entry) {
      actor.buffsAndDebuffs.buffs.entry.set(BuffEnum.spiritRattle, {
        value: value,
        counter: 0,
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
    const entry = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.spiritRattle);
    let heall = 0;
    if (entry) {
      if (entry.value > 0) {
        entry.value -= 1;
        heall = roll(1).d(4).total + statMod(actor.attribute.getTotal("willpower"));
        actor.vitals.incHp(heall);
      }
    }
    if (entry && entry.value === 0) {
      actor.buffsAndDebuffs.buffs.entry.delete(BuffEnum.spiritRattle);
    }

    return {
      canAct: true,
      content: {
        en: `${actor.name.en} spirit rattle decreased: duration goes down by 1 turn and healed for ${heall} HP`,
        th: `${actor.name.th} "กระดิ่งวิญญาณ" ลดลง 1 เทิร์นและรักษาตัวเอง ${heall} HP`,
      },
    };
  },
});
