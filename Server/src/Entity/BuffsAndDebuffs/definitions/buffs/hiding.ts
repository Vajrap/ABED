import { Character } from "src/Entity/Character/Character";
import { L10N } from "src/InterFacesEnumsAndTypes/L10N";
import { BuffDef } from "../../type";
import { BuffEnum } from "../../enum";

export const hiding = new BuffDef({
    name: {
        en: "hiding",
        th: "ซ่อนตัว",
    },
    appender: function (actor: Character, value: number): L10N {
        const entry = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.hiding);
        if (!entry) {
            actor.buffsAndDebuffs.buffs.entry.set(BuffEnum.hiding, {
                value: value,
                isPerm: false,
                permValue: 0,
                counter: 0,
            });
        } else {
            entry.value += value;
        }
        
        return {
            en: `${actor.name.en} got hiding buff: value goes up by ${value}`,
            th: `${actor.name.th} ได้รับ "ซ่อนตัว" ${value} หน่วย`,
        };
    },
    
    resolver: function (actor: Character): { canAct: boolean; content: L10N; } {
        const entry = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.hiding);
        if (entry) {
            if (entry.value > 0) {
                entry.value -= 1;
            }
        }
        if (entry && entry.value === 0) {
            actor.buffsAndDebuffs.buffs.entry.delete(BuffEnum.hiding);
        }

        return {
            canAct: true,
            content: {
                en: `${actor.name.en} hiding decreased: value goes down by 1`,
                th: `${actor.name.th} "ซ่อนตัว" ลดลง 1 หน่วย`,
            },
        };
    }
});