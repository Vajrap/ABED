import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { BookWId } from "../../type";
import { Tome } from "../Tome";
import { SeasonEnum } from "src/InterFacesEnumsAndTypes/Time";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";
import { ItemCategoryType } from "src/Entity/Item";
import { ResourceType } from "src/InterFacesEnumsAndTypes/ResourceTypes";

export const grimoire = new Tome(
  {
    id: BookWId.Grimoire,
    name: { en: "Grimoire", th: "สมุดเวทมนตร์" },
    description: { en: "A magical grimoire.", th: "สมุดเวทมนตร์" },
    tier: TierEnum.common,
    cost: {
      baseCost: 110, // TEMP: wood: 1*5=5 + handicraft: 100 + brass corners = 105
      bonusCost: 0,
      cost: 110,
      marketCost: 110,
      numberOfSellThisWeek: 0,
      possibleDeviation: 0,
      seasonalDeviation: {
        [SeasonEnum.Seeding]: 0,
        [SeasonEnum.RainFall]: 0,
        [SeasonEnum.GreenTide]: 0,
        [SeasonEnum.HarvestMoon]: 0,
        [SeasonEnum.SunDry]: 0,
        [SeasonEnum.Frostveil]: 0,
        [SeasonEnum.LongDark]: 0,
      },
    },
    image: "leatherGrimoire",
    isCraftable: true,
    weight: 3,
    blueprintId: {
      resource: new Map<ResourceType, number>([["wood", 1]]),
      item: new Map<ItemCategoryType, number>([
        ["leather", 2],
        ["gem", 1],
      ]),
    },
  },
  {},
  {
    handle: 1,
    damage: {
      physicalDamageDice: { face: 4, dice: 1 },
      magicalDamageDice: { face: 5, dice: 2 },
      physicalDamageType: DamageType.blunt,
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
