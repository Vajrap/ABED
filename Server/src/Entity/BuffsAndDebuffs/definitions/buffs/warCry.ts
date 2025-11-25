import type { Character } from "src/Entity/Character/Character";
import { BuffDef } from "../../type";
import { BuffEnum } from "../../enum";
import type { L10N } from "src/InterFacesEnumsAndTypes/L10N";
import { statMod } from "src/Utils/statMod";

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
        permValue: 0,
        counter: permValue, // counter stores buff strength (2 + leadership mod/2)
      });
      // War Cry gives +agility and +strength based on counter (buff strength)
      const buffStrength = permValue > 0 ? permValue : 2; // Default to 2 if not set
      actor.attribute.mutateBattle("agility", buffStrength);
      actor.attribute.mutateBattle("strength", buffStrength);
      isFirst = true;
    } else {
      if (!entry.isPerm && isPerm) {
        entry.isPerm = true;
      }
      entry.value += value;
      // Keep the highest counter (buff strength) when stacking
      if (permValue > entry.counter) {
        const oldStrength = entry.counter > 0 ? entry.counter : 2;
        const newStrength = permValue;
        // Adjust stat bonuses if strength changed: remove old, add new
        if (newStrength !== oldStrength) {
          actor.attribute.mutateBattle("agility", -oldStrength); // Remove old
          actor.attribute.mutateBattle("strength", -oldStrength);
          actor.attribute.mutateBattle("agility", newStrength); // Add new
          actor.attribute.mutateBattle("strength", newStrength);
        }
        entry.counter = permValue;
      }
    }

    const buffStrength = permValue > 0 ? permValue : 2;
    return {
      en: `${actor.name.en} is emboldened by War Cry! +${buffStrength} agility, +${buffStrength} strength`,
      th: `${actor.name.th} ได้รับกำลังใจจากเสียงร้องศึก! +${buffStrength} agility, +${buffStrength} strength`,
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
        const buffStrength = entry.counter > 0 ? entry.counter : 2;
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

