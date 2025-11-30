import type { Character } from "src/Entity/Character/Character";
import { DebuffDef, type AppenderOptions } from "../../type";
import type { L10N } from "src/InterFacesEnumsAndTypes/L10N";
import { DebuffEnum } from "../../enum";

export const fear = new DebuffDef({
    name: {
        en: "fear",
        th: "หวาดกลัว",
    },
    appender: function (
        actor: Character,
        options: AppenderOptions,
    ): L10N {
        const {
            turnsAppending: value,
            isPerm = false,
            permanentCounter = 0,
        } = options;
        
        const entry = actor.buffsAndDebuffs.debuffs.entry.get(DebuffEnum.fear);
        if (!entry) {
            actor.buffsAndDebuffs.debuffs.entry.set(DebuffEnum.fear, {
                value,
                isPerm,
                permValue: permanentCounter,
                counter: 0,
            });
        } else {
            if (!entry.isPerm && isPerm) {
                entry.isPerm = true;
            }
            entry.value += value;
            entry.permValue += permanentCounter;
        }

        actor.attribute.mutateBattle("agility", value + permanentCounter);
        return {
            en: `${actor.name.en} got hasted buff: agi goes up by ${value + permanentCounter}`,
            th: `${actor.name.th} ได้รับ "เร่งความเร็ว": agi เพิ่มขึ้น ${value + permanentCounter} หน่วย`,
        };
    },

    resolver: function (actor: Character): { canAct: boolean; content: L10N } {
        const entry = actor.buffsAndDebuffs.debuffs.entry.get(DebuffEnum.fear);
        if (entry) {
            if (entry.value > 0) {
                entry.value -= 1;
                actor.attribute.mutateBattle("agility", -1);
            }
        }

        return {
            canAct: true,
            content: {
                en: `${actor.name.en} hasted decreased: agi goes down by 1`,
                th: `${actor.name.th} "เร่งความเร็ว" ลดลง: agi ลดลง 1 หน่วย`,
            },
        };
    },
});
