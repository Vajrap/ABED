import type { Character } from "src/Entity/Character/Character";
import { BuffDef, type AppenderOptions } from "../../type";
import { BuffEnum } from "../../enum";
import type { L10N } from "src/InterFacesEnumsAndTypes/L10N";
import { roll } from "src/Utils/Dice";
import { ATTRIBUTE_KEYS, type AttributeKey } from "src/InterFacesEnumsAndTypes/Enums";

export const inspired = new BuffDef({
  name: {
    en: "Inspired",
    th: "แรงบันดาลใจ",
  },
  description: {
    en: "Gain +1 to all saving throws. At the start of each turn, restore 1d3 HP.",
    th: "ได้ +1 ต่อการทอยเซฟทั้งหมด เมื่อเริ่มเทิร์นใหม่ ฟื้นฟู 1d3 HP",
  },
  formula: "+1 to all saving throws, restore 1d3 HP per turn",
  appender: function (
    actor: Character,
    options: AppenderOptions,
  ): L10N {
    const { turnsAppending: value } = options;
    
    const entry = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.inspired);
    if (!entry) {
      actor.buffsAndDebuffs.buffs.entry.set(BuffEnum.inspired, {
        value,
        counter: 0,
      });
      // Apply +1 to all saving throws
      for (const attr of ATTRIBUTE_KEYS) {
        actor.saveRolls.mutateBattle(attr as AttributeKey, 1);
      }
    } else {
      entry.value += value;
    }

    return {
      en: `${actor.name.en} is Inspired! (+1 to all saves, restore 1d3 HP per turn)`,
      th: `${actor.name.th} ได้รับแรงบันดาลใจ! (+1 ต่อการทอยเซฟทั้งหมด ฟื้นฟู 1d3 HP ต่อเทิร์น)`,
    };
  },

  resolver: function (actor: Character): { canAct: boolean; content: L10N } {
    const entry = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.inspired);
    let healed = 0;
    if (entry && entry.value > 0) {
      // Restore 1d3 HP at the start of their turn
      const healAmount = roll(1).d(3).total;
      const beforeHp = actor.vitals.hp.current;
      actor.vitals.incHp(healAmount);
      healed = actor.vitals.hp.current - beforeHp;

      entry.value -= 1;
      if (entry.value === 0) {
        // Remove +1 to all saving throws
        for (const attr of ATTRIBUTE_KEYS) {
          actor.saveRolls.mutateBattle(attr as AttributeKey, -1);
        }
        actor.buffsAndDebuffs.buffs.entry.delete(BuffEnum.inspired);
      }
    }

    return {
      canAct: true,
      content: {
        en: healed > 0 ? `${actor.name.en} restored ${healed} HP from inspiration!` : ``,
        th: healed > 0 ? `${actor.name.th} ฟื้นฟู ${healed} HP จากแรงบันดาลใจ!` : ``,
      },
    };
  },
});

