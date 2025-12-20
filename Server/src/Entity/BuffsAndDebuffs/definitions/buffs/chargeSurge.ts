import type { Character } from "src/Entity/Character/Character";
import { BuffDef, type AppenderOptions } from "../../type";
import { BuffEnum } from "../../enum";
import type { L10N } from "src/InterFacesEnumsAndTypes/L10N";
import { buffsAndDebuffsRepository } from "../../repository";

export const chargeSurge = new BuffDef({
  name: {
    en: "Charge Surge",
    th: "ระเบิดประจุ",
  },
  description: {
    en: "Each turn, gain +1 Edge Charge.",
    th: "ทุกเทิร์น ได้รับ Edge Charge +1",
  },
  formula: "Each turn: +1 Edge Charge",
  appender: function (
    actor: Character,
    options: AppenderOptions,
  ): L10N {
    const { turnsAppending: value } = options;
    
    const entry = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.chargeSurge);
    if (!entry) {
      actor.buffsAndDebuffs.buffs.entry.set(BuffEnum.chargeSurge, {
        value: value,
        counter: 0,
      });
    } else {
      entry.value += value;
    }

    return {
      en: `${actor.name.en} gains Charge Surge for ${value} turn(s)!`,
      th: `${actor.name.th} ได้รับ Charge Surge เป็นเวลา ${value} เทิร์น!`,
    };
  },

  resolver: function (actor: Character): { canAct: boolean; content: L10N } {
    const entry = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.chargeSurge);

    if (entry && entry.value > 0) {
      // Gain +1 Edge Charge each turn
      buffsAndDebuffsRepository.edgeCharge.appender(actor, { turnsAppending: 1 });
      
      entry.value -= 1;

      // Remove if duration reaches 0
      if (entry.value === 0) {
        actor.buffsAndDebuffs.buffs.entry.delete(BuffEnum.chargeSurge);
      }

      return {
        canAct: true,
        content: {
          en: `${actor.name.en} gains +1 Edge Charge from Charge Surge!`,
          th: `${actor.name.th} ได้รับ Edge Charge +1 จาก Charge Surge!`,
        },
      };
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

