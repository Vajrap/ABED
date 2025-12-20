import type { Character } from "src/Entity/Character/Character";
import { BuffDef, type AppenderOptions } from "../../type";
import { BuffEnum } from "../../enum";
import type { L10N } from "src/InterFacesEnumsAndTypes/L10N";

export const arcaneBattery = new BuffDef({
  name: {
    en: "Arcane Battery",
    th: "แบตเตอรี่อาร์เคน",
  },
  description: {
    en: "Each stack gives +1 damage to all arcane damage attacks.",
    th: "แต่ละสแต็กให้ +1 ความเสียหายต่อการโจมตีด้วยความเสียหายอาร์เคนทั้งหมด",
  },
  formula: "+1 damage per stack to all arcane damage attacks",
  appender: function (
    actor: Character,
    options: AppenderOptions,
  ): L10N {
    const { turnsAppending: value, universalCounter: stacks = 0 } = options;
    const entry = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.arcaneBattery);
    if (!entry) {
      actor.buffsAndDebuffs.buffs.entry.set(BuffEnum.arcaneBattery, {
        value: stacks, // Store stack count in value
        counter: value, // Store duration in counter
      });
    } else {
      entry.value += stacks;
      entry.counter = Math.max(entry.counter, value); // Extend duration if longer
    }

    return {
      en: `${actor.name.en} gained ${stacks} Arcane Battery stack(s) for ${value} turn(s)!`,
      th: `${actor.name.th} ได้รับ ${stacks} สแต็ก "แบตเตอรี่อาร์เคน" เป็นเวลา ${value} เทิร์น!`,
    };
  },

  resolver: function (actor: Character): { canAct: boolean; content: L10N } {
    const entry = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.arcaneBattery);
    if (entry) {
      // Decrease duration (stored in counter)
      if (entry.counter > 0) {
        entry.counter -= 1;
      }
      // Remove buff when duration expires
      if (entry.counter <= 0) {
        actor.buffsAndDebuffs.buffs.entry.delete(BuffEnum.arcaneBattery);
      }
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

