import type { Character } from "src/Entity/Character/Character";
import { BuffDef, type AppenderOptions } from "../../type";
import { BuffEnum } from "../../enum";
import type { L10N } from "src/InterFacesEnumsAndTypes/L10N";

export const wardOfProtection = new BuffDef({
  name: {
    en: "Ward of Protection",
    th: "การป้องกันพิเศษ",
  },
  description: {
    en: "Reduce incoming damage by (3 + WIL mod / 2) per attack, up to 5 stacks per turn.",
    th: "ลดความเสียหายที่เข้ามา (3 + WIL mod / 2) ต่อการโจมตี สูงสุด 5 สแตคต่อเทิร์น",
  },
  formula: "Reduce damage by (3 + WIL mod / 2) per attack, up to 5 stacks per turn",
  appender: function (
    actor: Character,
    options: AppenderOptions,
  ): L10N {
    const { turnsAppending: value } = options;
    
    const entry = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.wardOfProtection);
    if (!entry) {
      actor.buffsAndDebuffs.buffs.entry.set(BuffEnum.wardOfProtection, {
        value: value,
        counter: 0,
      });
    } else {
      entry.value += value;
    }

    return {
      en: `${actor.name.en} gains Ward of Protection for ${value} turn(s)!`,
      th: `${actor.name.th} ได้รับ Ward of Protection เป็นเวลา ${value} เทิร์น!`,
    };
  },

  resolver: function (actor: Character): { canAct: boolean; content: L10N } {
    const entry = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.wardOfProtection);
    
    if (entry && entry.value > 0) {
      // Reset counter at start of turn (stacks are per turn, up to 5)
      entry.counter = 0;
      
      entry.value -= 1;

      // Remove if duration reaches 0
      if (entry.value === 0) {
        actor.buffsAndDebuffs.buffs.entry.delete(BuffEnum.wardOfProtection);
        return {
          canAct: true,
          content: {
            en: `${actor.name.en}'s Ward of Protection expired.`,
            th: `${actor.name.th} การป้องกันพิเศษหมดอายุ`,
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

