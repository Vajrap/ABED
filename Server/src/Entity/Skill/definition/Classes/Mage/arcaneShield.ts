import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { SkillId } from "../../../enums";
import { Skill } from "../../../Skill";
import type { Character } from "src/Entity/Character/Character";
import { ActorEffect, TargetEffect } from "../../../effects";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { buffsAndDebuffsRepository } from "src/Entity/BuffsAndDebuffs/repository";

export const arcaneShield = new Skill({
  id: SkillId.ArcaneShield,
  name: { en: "Arcane Shield", th: "เกราะเวทมนตร์" },
  description: { en: "Raise a shield of arcane energy.", th: "ยกเกราะเวทมนตร์" },
  requirement: {},
  equipmentNeeded: [],
  tier: TierEnum.common,
  consume: { hp: 0, mp: 3, sp: 0, elements: [] },
  produce: { hp: 0, mp: 0, sp: 0, elements: [] },
  exec: (actor: Character, _ally: Character[], _enemies: Character[], _sl: number, _loc: LocationsEnum) => {
    // TODO: Implement arcaneShield buff/debuff
    return {
      content: {
        en: `${actor.name.en} conjured an arcane shield (placeholder).`,
        th: `${actor.name.th} สร้างเกราะเวทมนตร์ (ชั่วคราว)`,
      },
      actor: { actorId: actor.id, effect: [ActorEffect.ArcaneOne] },
      targets: [],
    };
  },
});


