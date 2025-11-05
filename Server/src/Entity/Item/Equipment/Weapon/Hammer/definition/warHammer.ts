import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { HammerId } from "../../type";
import { Hammer } from "../Hammer";
import { SeasonEnum } from "src/InterFacesEnumsAndTypes/Time";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";
import { ItemCategoryType } from "src/Entity/Item";
import { ResourceType } from "src/InterFacesEnumsAndTypes/ResourceTypes";

export const warHammer = new Hammer(
  {
    id: HammerId.WarHammer,
    name: { en: "War Hammer", th: "ค้อนสงคราม" },
    description: {
      en: "A massive two-handed war hammer.",
      th: "ค้อนสงครามขนาดยักษ์ ต้องใช้สองมือ",
    },
    tier: TierEnum.common,
    cost: {
      baseCost: 910, // TEMP: ore: 80*10=800 + wood: 2*5=10 + handicraft: 100 = 910
      bonusCost: 0,
      cost: 910,
      marketCost: 910,
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
    image: "ironWarHammer",
    isCraftable: true,
    weight: 30,
    blueprintId: {
      resource: new Map<ResourceType, number>([
        ["ore", 80],
        ["wood", 2],
      ]),
      item: new Map<ItemCategoryType, number>([
        ["ingot", 5],
        ["leather", 1],
      ]),
    },
  },
  { battleStatus: { pHIT: -2 } },
  {
    handle: 2,
    damage: {
      physicalDamageDice: { face: 6, dice: 2 },
      magicalDamageDice: { face: 4, dice: 1 },
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
