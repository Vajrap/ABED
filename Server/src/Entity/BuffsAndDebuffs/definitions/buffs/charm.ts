import type { Character } from "src/Entity/Character/Character";
import { BuffDef } from "../../type";
import { BuffEnum } from "../../enum";
import type { L10N } from "src/InterFacesEnumsAndTypes/L10N";

export const charm = new BuffDef({
  name: {
    en: "Charm",
    th: "สะกดจิต",
  },
  appender: function (
    actor: Character,
    value: number,
    isPerm: boolean,
    permValue: number,
  ): L10N {
    const entry = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.charm);
    if (!entry) {
      actor.buffsAndDebuffs.buffs.entry.set(BuffEnum.charm, {
        value: value,
        isPerm: isPerm,
        permValue: permValue,
      });
    } else {
      if (!entry.isPerm && isPerm) {
        entry.isPerm = true;
      }
      entry.value += value;
      entry.permValue = Math.max(entry.permValue, permValue);
    }

    return {
      en: `${actor.name.en} is charmed!`,
      th: `${actor.name.th} ถูกสะกดจิต!`,
    };
  },

  resolver: function (actor: Character): { canAct: boolean; content: L10N } {
    const entry = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.charm);
    if (entry) {
      if (entry.value > 0) {
        entry.value -= 1;
      } else if (entry.value === 0 && entry.permValue === 0) {
        actor.buffsAndDebuffs.buffs.entry.delete(BuffEnum.charm);
      }
    }

    return {
      canAct: true,
      content: {
        en: `${actor.name.en} Charm duration decreased`,
        th: `${actor.name.th} "สะกดจิต" ลดลง`,
      },
    };
  },
});

