import { SeasonEnum } from "../../../InterFacesEnumsAndTypes/Time";

export type ItemCostInit = Partial<{
  baseCost: number;
  bonusCost: number;
  cost: number;
  marketCost: number;
  numberOfSellThisWeek: number;
  possibleDeviation: number;
  seasonalDeviation: Partial<Record<SeasonEnum, number>>;
}>;

const defaultSeasonalDeviation: Record<SeasonEnum, number> = {
  [SeasonEnum.Seeding]: 1,
  [SeasonEnum.RainFall]: 1,
  [SeasonEnum.GreenTide]: 1,
  [SeasonEnum.HarvestMoon]: 1,
  [SeasonEnum.SunDry]: 1,
  [SeasonEnum.Frostveil]: 1,
  [SeasonEnum.LongDark]: 1,
};

export class ItemCost {
  baseCost: number;
  bonusCost?: number;
  cost?: number;
  marketCost?: number;
  numberOfSellThisWeek?: number;
  possibleDeviation?: number;
  seasonalDeviation?: Record<SeasonEnum, number>;

  constructor(data: ItemCostInit = {}) {
    this.baseCost = data.baseCost ?? 0;
    this.bonusCost = data.bonusCost ?? 0;
    this.cost = data.cost ?? this.baseCost + this.bonusCost;
    this.marketCost = data.marketCost ?? this.cost;
    this.numberOfSellThisWeek = data.numberOfSellThisWeek ?? 0;
    this.seasonalDeviation = {
      ...defaultSeasonalDeviation,
      ...(data.seasonalDeviation ?? {}),
    };
  }
}
