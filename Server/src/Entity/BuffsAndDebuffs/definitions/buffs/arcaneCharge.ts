import type { Character } from "src/Entity/Character/Character";
import { BuffDef, type AppenderOptions } from "../../type";
import { BuffEnum } from "../../enum";
import type { L10N } from "src/InterFacesEnumsAndTypes/L10N";

export const arcaneCharge = new BuffDef({
  name: {
    en: "Arcane Charge",
    th: "ประจุเวทมนตร์",
  },
  description: {
    en: "Arcane Charge can stack to the maximum of 5. Consumed by some arcane skills.",
    th: "ประจุเวทมนตร์สามารถสแตคได้สูงสุด 5 สแตคไม่ลดลงโดยอัตโนมัติและถูกใช้โดยทักษะบางประเภท",
  },
  appender: function (
    actor: Character,
    options: AppenderOptions,
  ): L10N {
    const { turnsAppending: value } = options;
    
    const entry = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.arcaneCharge);
    const existingValue = entry?.value;
    const newValue = existingValue ? Math.min(existingValue + value, 5) : value;
    
    if (entry) {
      entry.value = newValue;
    } else {
      actor.buffsAndDebuffs.buffs.entry.set(BuffEnum.arcaneCharge, {
        value: newValue,
        counter: 0,
      });
    }

    return {
      en: `${actor.name.en} gained Arcane Charge!`,
      th: `${actor.name.th} ได้รับประจุเวทมนตร์!`,
    };
  },

  resolver: function (actor: Character): { canAct: boolean; content: L10N } {
    // Arcane Charge doesn't decrease automatically - it persists until consumed by skills
    // Only clean up if value is 0
    const entry = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.arcaneCharge);
    if (entry && entry.value === 0) {
      actor.buffsAndDebuffs.buffs.entry.delete(BuffEnum.arcaneCharge);
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

