import { Season } from "../../../InterFacesEnumsAndTypes/Time";

export class ItemCost {
  baseCost: number;
  bonusCost: number;
  cost: number;
  marketCost: number;
  numberOfSellThisWeek: number;
  possibleDeviation: number;
  seasonalDeviation: { [key in Season]: number };

  constructor(data: {
    baseCost?: number;
    bonusCost?: number;
    possibleDeviation?: number;
    seasonalDeviation?: { [key in Season]: number };
  }) {
    this.baseCost = data.baseCost ?? 0;
    this.bonusCost = data.bonusCost ?? 0;
    this.cost = this.baseCost + this.bonusCost;
    this.marketCost = this.cost;
    this.numberOfSellThisWeek = 0;
    this.possibleDeviation = data.possibleDeviation ?? 1;
    this.seasonalDeviation = data.seasonalDeviation ?? {
      [Season.seeding]: 1,
      [Season.rainFall]: 1,
      [Season.greenTide]: 1,
      [Season.harvestMoon]: 1,
      [Season.sunDry]: 1,
      [Season.frostVeil]: 1,
      [Season.longDark]: 1,
    };
  }
}
