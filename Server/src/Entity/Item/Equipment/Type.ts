import type {
  ArtisanKey,
  AttributeKey,
  BattleStatKey,
  ProficiencyKey,
} from "../../../InterFacesEnumsAndTypes/Enums";
import type { BuffAndDebuffEnum } from "../../BuffsAndDebuffs/enum";
import type { TraitEnum } from "../../Trait/enum";

/**
 * Equipment modifier type - defines stat bonuses and effects from equipment
 */
export type EquipmentModifier = {
  attributes?: Partial<Record<AttributeKey, number>>;
  proficiencies?: Partial<Record<ProficiencyKey, number>>;
  artisans?: Partial<Record<ArtisanKey, number>>;
  battleStatus?: Partial<Record<BattleStatKey, number>>;
  saves?: Partial<Record<AttributeKey, number>>;
  vitals?: { hp?: number; mp?: number; sp?: number };
  buffsAndDebuffs?: Map<BuffAndDebuffEnum, number>;
  traits?: TraitEnum[];
};
