import type { Character } from "src/Entity/Character/Character";
import { BuffDef, type AppenderOptions } from "../../type";
import { BuffEnum } from "../../enum";
import type { L10N } from "src/InterFacesEnumsAndTypes/L10N";

export const warCry = new BuffDef({
  name: {
    en: "War Cry",
    th: "เสียงร้องศึก",
  },
  description: {
    en: "Get <FORMULA>.",
    th: "เพิ่ม <FORMULA>",
  },
  formula: "+<COUNTER> agility, +<COUNTER> strength",
  appender: function (
    actor: Character,
    options: AppenderOptions,
  ): L10N {
    const {
      turnsAppending: value,
      universalCounter: counter
    } = options;
    
    const entry = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.warCry);
    let isFirst = false;
    if (!entry) {
      actor.buffsAndDebuffs.buffs.entry.set(BuffEnum.warCry, {
        value: value,
        counter: counter || 1,
      });
      // War Cry gives +agility and +strength based on counter (buff strength, comes from charisma mod, at least 1)
      actor.attribute.mutateBattle("agility", counter || 1);
      actor.attribute.mutateBattle("strength", counter || 1);
      isFirst = true;
    } else {
      entry.value += value;
      // Keep the highest counter (buff strength) when stacking
    }

    return {
      en: `${actor.name.en} is emboldened by War Cry! +${counter || 1} agility, +${counter || 1} strength`,
      th: `${actor.name.th} ได้รับกำลังใจจากเสียงร้องศึก! +${counter || 1} agility, +${counter || 1} strength`,
    };
  },

  resolver: function (actor: Character): { canAct: boolean; content: L10N } {
    const entry = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.warCry);
    let isRemoved = false;
    if (entry) {
      if (entry.value > 0) {
        entry.value -= 1;
      }
      // When duration expires, remove stat bonuses and delete buff
      if (entry.value === 0) {
        // Remove stat bonuses based on the buff strength stored in counter
        const buffStrength = entry.counter || 1;
        actor.attribute.mutateBattle("agility", -buffStrength);
        actor.attribute.mutateBattle("strength", -buffStrength);
        actor.buffsAndDebuffs.buffs.entry.delete(BuffEnum.warCry);
        isRemoved = true;
      }
    }

    return {
      canAct: true,
      content: {
        en: `${actor.name.en} War Cry duration decreased${isRemoved ? ", stat bonuses removed" : ""}`,
        th: `${actor.name.th} "เสียงร้องศึก" ลดลง${isRemoved ? ", โบนัสสถิติถูกลบ" : ""}`,
      },
    };
  },
});

