import type {
  ArtisanKey,
  AttributeKey,
  BattleStatKey,
  ProficiencyKey,
} from "../../../InterFacesEnumsAndTypes/Enums";
import type { BuffsAndDebuffsEnum } from "../../BuffsAndDebuffs/enum";
import type { TraitEnum } from "../../Trait.ts/enum";

/**
 * Equipment modifier type - defines stat bonuses and effects from equipment
 */
export type EquipmentModifier = {
  attributes?: Partial<Record<AttributeKey, number>>;
  proficiencies?: Partial<Record<ProficiencyKey, number>>;
  artisans?: Partial<Record<ArtisanKey, number>>;
  battleStatus?: Partial<Record<BattleStatKey, number>>;
  vitals?: { hp?: number; mp?: number; sp?: number };
  buffsAndDebuffs?: Map<BuffsAndDebuffsEnum, number>;
  traits?: TraitEnum[];
};
