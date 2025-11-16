import {Trait} from "src/Entity/Trait/index";
import {TraitEnum} from "src/Entity/Trait/enum";

export const traitPackInstinct = new Trait({
    id: TraitEnum.PackInstinct,
    name: {
        en: "Pack Instinct",
        th: "รวมกันเราอยู่"
    },
    description: {
        en: "Together we stand stronger: If in your party there're another character with the same race and this trait, once you get turn, pAtk, mAtk, pHit and mHit + 2",
        th: "รวมกันเราอยู่ แยกหมู่เราตาย: หายในปาร์ตี้มีเพื่อนที่มีเผ่าเดียวกันและมีลักษณะนี้ pAtk, mAtk, pHit และ mHit + 2"
    },
    onTurn(actor, value, allies, enemies, context) {
        const hasSelfRace = allies.some(ally =>
            (ally !== "none") && (ally.race === actor.race) && (ally.traits.get(TraitEnum.PackInstinct))
        );
        if (hasSelfRace) {
            actor.battleStats.mutateBonus('pATK', 2)
            actor.battleStats.mutateBonus('mATK', 2)
            actor.battleStats.mutateBonus('pHIT', 2)
            actor.battleStats.mutateBonus('mHIT', 2)

            context.set(TraitEnum.PackInstinct, true)
        }
    },
    onEndTurn(actor, value, allies, enemies, context) {
        if (context.get(TraitEnum.PackInstinct) === true) {
            actor.battleStats.mutateBonus('pATK', -2)
            actor.battleStats.mutateBonus('mATK', -2)
            actor.battleStats.mutateBonus('pHIT', -2)
            actor.battleStats.mutateBonus('mHIT', -2)

            context.set(TraitEnum.PackInstinct, false)
        }
    },
})