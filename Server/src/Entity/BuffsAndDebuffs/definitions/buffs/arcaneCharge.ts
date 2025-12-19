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
    // Aegis Pulse should be removed when it is used. Not depleted by itself.
    const entry = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.arcaneCharge);
    // Don't decrease value by itself - it's removed when the skill is used
    // Only clean up if value is 0
    if (entry && entry.value === 0 ) {
      actor.buffsAndDebuffs.buffs.entry.delete(BuffEnum.aegisPulse);
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

