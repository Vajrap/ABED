import type { Character } from "src/Entity/Character/Character";
import { BuffDef, type AppenderOptions } from "../../type";
import { BuffEnum } from "../../enum";
import type { L10N } from "src/InterFacesEnumsAndTypes/L10N";
import { roll } from "src/Utils/Dice";
import { statMod } from "src/Utils/statMod";

export const regen = new BuffDef({
  name: {
    en: "Regeneration",
    th: "ฟื้นฟู",
  },
  description: {
    en: "Restores HP each turn. The heal amount is based on 1d4 + Willpower modifier + Vitality modifier. The Willpower modifier is stored in the universal counter and remains constant throughout the buff's duration.",
    th: "ฟื้นฟู HP ในแต่ละเทิร์น ปริมาณการรักษาขึ้นอยู่กับ 1d4 + โมดิไฟเออร์ความตั้งใจ + โมดิไฟเออร์ความแข็งแกร่ง โมดิไฟเออร์ความตั้งใจถูกเก็บใน universal counter และคงที่ตลอดระยะเวลาของบัฟ",
  },
  formula: "Heal per turn = 1d4 + WIL mod (from universalCounter) + VIT mod",
  appender: function (
    actor: Character,
    options: AppenderOptions,
  ): L10N {
    const {
      turnsAppending: value,
      universalCounter = 0,
    } = options;
    
    const entry = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.regen);
    if (!entry) {
      actor.buffsAndDebuffs.buffs.entry.set(BuffEnum.regen, {
        value: value,
        counter: universalCounter, // counter stores willpower mod
      });
    } else {
      entry.value += value;
      // Keep the highest counter (willpower mod)
      if (universalCounter > entry.counter) {
        entry.counter = universalCounter;
      }
    }

    return {
      en: `${actor.name.en} gained Regeneration for ${value} turn(s)!`,
      th: `${actor.name.th} ได้รับการฟื้นฟูเป็นเวลา ${value} เทิร์น!`,
    };
  },

  resolver: function (actor: Character): { canAct: boolean; content: L10N } {
    const entry = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.regen);
    let healed = 0;
    if (entry && entry.value > 0) {
      // Restore (1d4 + WIL mod + vitality mod) HP at the start of their turn
      const willMod = entry.counter || statMod(actor.attribute.getTotal("willpower"));
      const vitalityMod = statMod(actor.attribute.getTotal("vitality"));
      const healAmount = roll(1).d(4).total + willMod + vitalityMod;
      const beforeHp = actor.vitals.hp.current;
      actor.vitals.incHp(healAmount);
      healed = actor.vitals.hp.current - beforeHp;

      entry.value -= 1;
      if (entry.value === 0 && entry.counter === 0) {
        actor.buffsAndDebuffs.buffs.entry.delete(BuffEnum.regen);
      }
    }

    return {
      canAct: true,
      content: {
        en: healed > 0 ? `${actor.name.en} regenerated ${healed} HP!` : ``,
        th: healed > 0 ? `${actor.name.th} ฟื้นฟู ${healed} HP!` : ``,
      },
    };
  },
});

