import { Character } from "src/Entity/Character/Character";
import { L10N } from "src/InterFacesEnumsAndTypes/L10N";
import { DebuffDef, type AppenderOptions } from "../../type";
import { DebuffEnum } from "../../enum";

export const healCooldown = new DebuffDef({
  name: {
    en: "heal: cooldown",
    th: "heal: cooldown",
  },
  description: {
    en: "Cooldown debuff for the Heal skill. Prevents using the skill until the cooldown expires.",
    th: "ดีบัฟคูลดาวน์สำหรับทักษะ Heal ป้องกันการใช้ทักษะจนกว่าคูลดาวน์จะหมดอายุ",
  },
  appender: function (actor: Character, options: AppenderOptions): L10N {
    const { turnsAppending: value } = options;
    const entry = actor.buffsAndDebuffs.debuffs.entry.get(
      DebuffEnum.healCooldown,
    );
    if (!entry) {
      actor.buffsAndDebuffs.debuffs.entry.set(DebuffEnum.healCooldown, {
        value: value,
        counter: 0,
      });
    } else {
      entry.value += value;
    }

    return {
      en: ``,
      th: ``,
    };
  },

  resolver: function (actor: Character): { canAct: boolean; content: L10N } {
    const entry = actor.buffsAndDebuffs.debuffs.entry.get(
      DebuffEnum.healCooldown,
    );
    if (entry) {
      if (entry.value > 0) {
        entry.value -= 1;
      }
    }
    if (entry && entry.value === 0) {
      actor.buffsAndDebuffs.debuffs.entry.delete(DebuffEnum.healCooldown);
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

