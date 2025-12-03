import type { Character } from "src/Entity/Character/Character";
import { BuffDef, type AppenderOptions } from "../../type";
import { BuffEnum } from "../../enum";
import type { L10N } from "src/InterFacesEnumsAndTypes/L10N";
import { statMod } from "src/Utils/statMod";

export const spellParry = new BuffDef({
  name: {
    en: "Spell Parry",
    th: "ปัดเวท",
  },
  description: {
    en: "Reduces the next spell damage by <FORMULA>. And given self an Edge Charge. \nIf the amount of damage is 0, given 2 Edge Charge.",
    th: "ลดความเสียหายเวทครั้งถัดไป <FORMULA> และให้ตัวเอง Edge Charge. \nหากความเสียหายเป็น 0, ให้ Edge Charge 2 หน่วย",
  },
  formula: "5 + <INTmod>",
  appender: function (
    actor: Character,
    options: AppenderOptions,
  ): L10N {
    const {
      turnsAppending: value,
      universalCounter = 0,
    } = options;
    
    const entry = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.spellParry);
    if (!entry) {
      const intMod = statMod(actor.attribute.getTotal("intelligence"));
      const reduction = 5 + intMod;
      actor.buffsAndDebuffs.buffs.entry.set(BuffEnum.spellParry, {
        value: value,
        counter: universalCounter, // Store reduction amount in counter
      });
      return {
        en: `${actor.name.en} prepares Spell Parry! Next spell damage reduced by ${reduction}`,
        th: `${actor.name.th} เตรียมปัดเวท! ความเสียหายเวทครั้งถัดไปลดลง ${reduction}`,
      };
    } else {
      // Refresh duration
      entry.value = value;
      return {
        en: `${actor.name.en} refreshes Spell Parry`,
        th: `${actor.name.th} รีเฟรชปัดเวท`,
      };
    }
  },

  resolver: function (actor: Character): { canAct: boolean; content: L10N } {
    const entry = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.spellParry);
    if (entry) {
      if (entry.value > 0) {
        entry.value -= 1;
      } else if (entry.value === 0 && entry.counter === 0) {
        actor.buffsAndDebuffs.buffs.entry.delete(BuffEnum.spellParry);
      }
    }

    return {
      canAct: true,
      content: {
        en: `${actor.name.en} Spell Parry duration decreased`,
        th: `${actor.name.th} "ปัดเวท" ลดลง`,
      },
    };
  },
});

