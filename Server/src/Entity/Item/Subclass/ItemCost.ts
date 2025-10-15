import { SeasonEnum } from "../../../InterFacesEnumsAndTypes/Time";

export class ItemCost {
  baseCost: number;
  bonusCost: number;
  cost: number;
  marketCost: number;
  numberOfSellThisWeek: number;
  possibleDeviation: number;
  seasonalDeviation: { [key in SeasonEnum]: number };

  constructor(data: {
    baseCost?: number;
    bonusCost?: number;
    possibleDeviation?: number;
    seasonalDeviation?: { [key in SeasonEnum]: number };
  }) {
    this.baseCost = data.baseCost ?? 0;
    this.bonusCost = data.bonusCost ?? 0;
    this.cost = this.baseCost + this.bonusCost;
    this.marketCost = this.cost;
    this.numberOfSellThisWeek = 0;
    this.possibleDeviation = data.possibleDeviation ?? 1;
    this.seasonalDeviation = data.seasonalDeviation ?? {
      [SeasonEnum.Seeding]: 1,
      [SeasonEnum.RainFall]: 1,
      [SeasonEnum.GreenTide]: 1,
      [SeasonEnum.HarvestMoon]: 1,
      [SeasonEnum.SunDry]: 1,
      [SeasonEnum.Frostveil]: 1,
      [SeasonEnum.LongDark]: 1,
    };
  }
}
