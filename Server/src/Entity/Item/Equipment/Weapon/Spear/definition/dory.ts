import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { SpearId } from "../../type";
import { SeasonEnum } from "src/InterFacesEnumsAndTypes/Time";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";
import { Spear } from "../Spear";
import { ResourceType } from "src/InterFacesEnumsAndTypes/ResourceTypes.ts";
import { ItemCategoryType } from "src/Entity/Item";

export const dory = new Spear(
  {
    id: SpearId.Dory,
    name: {
      en: "Dory",
      th: "หอก",
    },
    description: {
      en: "",
      th: "",
    },
    tier: TierEnum.common,
    cost: {
      baseCost: 505,
    },
    image: "ironRapier",
    isCraftable: true,
    weight: 20,
    blueprintId: undefined
  },
  {},
  {
    handle: 1,
    damage: {
      physicalDamageDice: {
        face: 8,
        dice: 1,
      },
      magicalDamageDice: {
        face: 4,
        dice: 1,
      },
      physicalDamageType: DamageType.pierce,
      magicalDamageType: DamageType.arcane,
      physicalDamageStat: ["strength"],
      magicalDamageStat: ["planar"],
      physicalHitStat: ["dexterity"],
      magicalHitStat: ["control"],
      physicalCritStat: ["luck"],
      magicalCritStat: ["luck"],
    },
  },
);
