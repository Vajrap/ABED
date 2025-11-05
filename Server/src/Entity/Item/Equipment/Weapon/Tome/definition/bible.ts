import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { BookWId } from "../../type";
import { Tome } from "../Tome";
import { SeasonEnum } from "src/InterFacesEnumsAndTypes/Time";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";
import { ItemCategoryType } from "src/Entity/Item";
import { ResourceType } from "src/InterFacesEnumsAndTypes/ResourceTypes";

export const bible = new Tome(
  {
    id: BookWId.Bible,
    name: { en: "Bible", th: "คัมภีร์" },
    description: { en: "A holy bible.", th: "คัมภีร์ศักดิ์สิทธิ์" },
    tier: TierEnum.common,
    cost: {
      baseCost: 105, // TEMP: wood: 1*5=5 + handicraft: 100 = 105
      bonusCost: 0,
      cost: 105,
      marketCost: 105,
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
    image: "leatherBible",
    isCraftable: true,
    weight: 3,
    blueprintId: {
      resource: new Map<ResourceType, number>([["wood", 1]]),
      item: new Map<ItemCategoryType, number>([
        ["leather", 2],
        ["thread", 1],
      ]),
    },
  },
  {},
  {
    handle: 1,
    damage: {
      physicalDamageDice: { face: 4, dice: 1 },
      magicalDamageDice: { face: 4, dice: 2 },
      physicalDamageType: DamageType.blunt,
      magicalDamageType: DamageType.arcane,
      physicalDamageStat: ["strength"],
      magicalDamageStat: ["willpower"],
      physicalHitStat: ["dexterity"],
      magicalHitStat: ["control"],
      physicalCritStat: ["luck"],
      magicalCritStat: ["luck"],
    },
  },
);
