import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { SeasonEnum } from "src/InterFacesEnumsAndTypes/Time";
import { Neck } from "..";
import { ArmorClass } from "../../Armor";
import { NeckId } from "../../type";

export const silverNecklace = new Neck(
  {
    id: NeckId.SilverNecklace,
    name: { en: "Silver Necklace", th: "" },
    description: { en: "A silver chain necklace.", th: "" },
    tier: TierEnum.common,
    cost: {
      baseCost: 2,
      bonusCost: 0,
      cost: 2,
      marketCost: 2,
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
    image: "silverNecklace",
    isCraftable: true,
    weight: 2,
    blueprintId: undefined,
  },
  {},
  { armorClass: ArmorClass.Cloth },
);

// Iron, Silver, Gold necklaces same pattern (weight 2–3, cost 3–12)
