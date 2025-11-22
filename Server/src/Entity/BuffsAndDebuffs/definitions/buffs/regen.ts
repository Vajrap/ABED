import type { Character } from "src/Entity/Character/Character";
import { BuffDef } from "../../type";
import { BuffEnum } from "../../enum";
import type { L10N } from "src/InterFacesEnumsAndTypes/L10N";
import { roll } from "src/Utils/Dice";
import { statMod } from "src/Utils/statMod";

export const regen = new BuffDef({
  name: {
    en: "Regeneration",
    th: "ฟื้นฟู",
  },
  appender: function (
    actor: Character,
    value: number,
    isPerm: boolean,
    permValue: number,
  ): L10N {
    const entry = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.regen);
    if (!entry) {
      actor.buffsAndDebuffs.buffs.entry.set(BuffEnum.regen, {
        value: value,
        isPerm: isPerm,
        permValue: permValue, // permValue stores willpower mod
      });
    } else {
      if (!entry.isPerm && isPerm) {
        entry.isPerm = true;
      }
      entry.value += value;
      // Keep the highest permValue (willpower mod)
      if (permValue > entry.permValue) {
        entry.permValue = permValue;
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
      const willMod = entry.permValue || statMod(actor.attribute.getTotal("willpower"));
      const vitalityMod = statMod(actor.attribute.getTotal("vitality"));
      const healAmount = roll(1).d(4).total + willMod + vitalityMod;
      const beforeHp = actor.vitals.hp.current;
      actor.vitals.incHp(healAmount);
      healed = actor.vitals.hp.current - beforeHp;

      entry.value -= 1;
      if (entry.value === 0 && entry.permValue === 0) {
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

