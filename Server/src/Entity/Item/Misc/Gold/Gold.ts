import { ItemMisc } from "../Misc";
import type { Item } from "../../Item";
import { GoldId } from "../index";
import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { ItemCost } from "../../Subclass/ItemCost";

/**
 * Gold currency item class
 */
export class Gold extends ItemMisc {
  // Override to narrow type from MiscItemId to GoldId
  declare id: GoldId;
  
  constructor(data: Item) {
    super(data);
  }
}

export const gold = new Gold({
  id: GoldId.gold,
  name: {
    en: "Gold",
    th: "ทอง",
  },
  description: {
    en: "Gold is a precious metal that is used as currency.",
    th: "ทองเป็นโลหะหนึ่งที่ใช้เป็นสกุลเงิน",
  },
  image: "gold.png",
  weight: 0,
  tier: TierEnum.common,
  cost: new ItemCost({
    baseCost: 1,
    bonusCost: 0,
  }),
  isCraftable: false,
  resource: new Map()
})