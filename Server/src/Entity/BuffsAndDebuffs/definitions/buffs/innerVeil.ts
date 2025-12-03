import type { Character } from "src/Entity/Character/Character";
import { BuffDef, type AppenderOptions } from "../../type";
import { BuffEnum } from "../../enum";
import type { L10N } from "src/InterFacesEnumsAndTypes/L10N";

export const innerVeil = new BuffDef({
  name: {
    en: "Inner Veil",
    th: "ผ้าคลุมภายใน",
  },
  description: {
    en: "Increases dodge by 2",
    th: "เพิ่มหลบหลีก 2",
  },
  appender: function (
    actor: Character,
    options: AppenderOptions,
  ): L10N {
    const { turnsAppending: value } = options;
    
    const entry = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.innerVeil);
    let isFirst = false;
    if (!entry) {
      actor.buffsAndDebuffs.buffs.entry.set(BuffEnum.innerVeil, {
        value: value,
        counter: 0,
      });
      actor.battleStats.mutateBattle("dodge", 2);
      isFirst = true;
    } else {
      entry.value += value;
    }

    return {
      en: `${actor.name.en} gained Inner Veil: +2 dodge, enemies have -2 hit chance`,
      th: `${actor.name.th} ได้รับ "ผ้าคลุมภายใน": +2 dodge, ศัตรูมีความแม่นยำ -2`,
    };
  },

  resolver: function (actor: Character): { canAct: boolean; content: L10N } {
    const entry = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.innerVeil);
    let isRemoved = false;
    if (entry) {
      if (entry.value > 0) {
        entry.value -= 1;
      } else if (entry.value === 0 ) {
        actor.battleStats.mutateBattle("dodge", -2);
        actor.buffsAndDebuffs.buffs.entry.delete(BuffEnum.innerVeil);
        isRemoved = true;
      }
    }

    return {
      canAct: true,
      content: {
        en: `${actor.name.en} Inner Veil duration decreased${isRemoved ? ", effects removed" : ""}`,
        th: `${actor.name.th} "ผ้าคลุมภายใน" ลดลง${isRemoved ? ", ผลกระทบถูกลบ" : ""}`,
      },
    };
  },
});

