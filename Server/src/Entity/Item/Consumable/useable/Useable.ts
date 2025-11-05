import { ItemConsumable } from "../Consumable";
import type { Item } from "../../Item";
import { UsableId } from "../index";
import { Character } from "src/Entity/Character/Character";
import { SeasonEnum } from "src/InterFacesEnumsAndTypes/Time";
import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";

/**
 * Useable item base class (e.g., camp kits, tools)
 */
export class Useable extends ItemConsumable {
  // Override to narrow type from ConsumableId to UsableId
  declare id: UsableId;

  constructor(data: Item, consume: (actor: Character) => void) {
    super(data, consume);
  }
}

export const campKit = new Useable(
  {
    id: UsableId.campKit,
    name: { en: "", th: "" },
    description: { en: "", th: "" },
    cost: {
      baseCost: 10,
      bonusCost: 0,
      cost: 10,
      marketCost: 10,
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
    blueprintId: undefined,
    image: "healingPotion",
    isCraftable: false,
    tier: TierEnum.common,
    weight: 2,
  },
  (actor: Character) => {
    actor.vitals.incHp(10);
  },
);
