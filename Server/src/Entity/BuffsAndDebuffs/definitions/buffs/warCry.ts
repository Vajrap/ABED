import type { Character } from "src/Entity/Character/Character";
import { BuffDef } from "../../type";
import { BuffEnum } from "../../enum";
import type { L10N } from "src/InterFacesEnumsAndTypes/L10N";

export const warCry = new BuffDef({
  name: {
    en: "War Cry",
    th: "เสียงร้องศึก",
  },
  appender: function (
    actor: Character,
    value: number,
    isPerm: boolean,
    permValue: number,
  ): L10N {
    const entry = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.warCry);
    let isFirst = false;
    if (!entry) {
      actor.buffsAndDebuffs.buffs.entry.set(BuffEnum.warCry, {
        value: value,
        isPerm: isPerm,
        permValue: permValue,
      });
      // War Cry gives +2 agility and +2 strength
      actor.attribute.mutateBattle("agility", 2);
      actor.attribute.mutateBattle("strength", 2);
      isFirst = true;
    } else {
      if (!entry.isPerm && isPerm) {
        entry.isPerm = true;
      }
      entry.value += value;
      entry.permValue += permValue;
    }

    return {
      en: `${actor.name.en} is emboldened by War Cry! +2 agility, +2 strength`,
      th: `${actor.name.th} ได้รับกำลังใจจากเสียงร้องศึก! +2 agility, +2 strength`,
    };
  },

  resolver: function (actor: Character): { canAct: boolean; content: L10N } {
    const entry = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.warCry);
    let isRemoved = false;
    if (entry) {
      if (entry.value > 0) {
        entry.value -= 1;
      } else if (entry.value === 0 && entry.permValue === 0) {
        // Remove stat bonuses
        actor.attribute.mutateBattle("agility", -2);
        actor.attribute.mutateBattle("strength", -2);
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

