import {TraitEnum} from "src/Entity/Trait/enum";
import {L10N} from "src/InterFacesEnumsAndTypes/L10N.ts";
import {Character} from "src/Entity/Character/Character.ts";
import {DamageType} from "src/InterFacesEnumsAndTypes/DamageTypes.ts";

export class Trait {
    constructor(public config: {
        id: TraitEnum,
        name: L10N,
        description: L10N,
        onAttain?: (actor: Character, value: number) => void,
        onLose?: (actor: Character, value: number) => void,
        beforeTurn?: (actor: Character, value: number, allies: (Character | "none")[], enemies: (Character | "none")[]) => void,
        onTurn?: (actor: Character, value: number, allies: (Character | "none")[], enemies: (Character | "none")[], context: Map<TraitEnum, boolean>) => void,
        onEndTurn?: (actor: Character, value: number, allies: (Character | "none")[], enemies: (Character | "none")[], context: Map<TraitEnum, boolean>) => void,
        onAttack?: (actor: Character, target: Character, damageObject: DamageObject, value: number) => void,
        onTakingDamage?: (actor: Character, attacker: Character, damageObject: DamageObject, value: number, finalDamage: number) => void,
    }) {}
}

interface DamageObject {
    damage: number;
    hit: number;
    crit: number;
    type: DamageType;
}