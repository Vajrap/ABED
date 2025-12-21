import type { Character } from "src/Entity/Character/Character";
import { BuffDef, type AppenderOptions } from "../../type";
import { BuffEnum } from "../../enum";
import type { L10N } from "src/InterFacesEnumsAndTypes/L10N";

export const mechanicalOverdrive = new BuffDef({
  name: {
    en: "Mechanical Overdrive",
    th: "โอเวอร์ไดรฟ์เครื่องกล",
  },
  description: {
    en: "Gain +2 STR and +2 AGI. Additionally, gain +5 AB gauge at the start of each turn.",
    th: "ได้รับ +2 STR และ +2 AGI. นอกจากนี้ ยังได้รับ +5 AB gauge เมื่อเริ่มเทิร์น",
  },
  formula: "STR +2, AGI +2, +5 AB gauge per turn",
  appender: function (
    actor: Character,
    options: AppenderOptions,
  ): L10N {
    const { turnsAppending: value } = options;
    
    const entry = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.mechanicalOverdrive);
    if (!entry) {
      actor.attribute.mutateBattle("strength", 2);
      actor.attribute.mutateBattle("agility", 2);

      actor.buffsAndDebuffs.buffs.entry.set(BuffEnum.mechanicalOverdrive, {
        value,
        counter: 0,
      });
    } else {
      entry.value += value;
    }

    return {
      en: `${actor.name.en} enters Mechanical Overdrive! (+2 STR, +2 AGI, +5 AB gauge per turn)`,
      th: `${actor.name.th} เข้าสู่โอเวอร์ไดรฟ์เครื่องกล! (+2 STR, +2 AGI, +5 AB gauge ต่อเทิร์น)`,
    };
  },

  resolver: function (actor: Character): { canAct: boolean; content: L10N } {
    const entry = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.mechanicalOverdrive);
    let removed = false;
    if (entry) {
      // Gain +5 AB gauge at the start of each turn
      actor.abGauge = Math.min(100, actor.abGauge + 5);
      
      if (entry.value > 0) {
        entry.value -= 1;
      } else if (entry.value === 0) {
        actor.attribute.mutateBattle("strength", -2);
        actor.attribute.mutateBattle("agility", -2);
        actor.buffsAndDebuffs.buffs.entry.delete(BuffEnum.mechanicalOverdrive);
        removed = true;
      }
    }

    return {
      canAct: true,
      content: {
        en: removed
          ? `${actor.name.en}'s Mechanical Overdrive shuts down.`
          : `${actor.name.en}'s Mechanical Overdrive grants +5 AB gauge.`,
        th: removed
          ? `โอเวอร์ไดรฟ์เครื่องกลของ ${actor.name.th} หยุดทำงาน`
          : `โอเวอร์ไดรฟ์เครื่องกลของ ${actor.name.th} ให้ +5 AB gauge`,
      },
    };
  },
});

