import { ItemConsumable } from "../Consumable";
import type { Item } from "../../Item";
import { UsableId } from "../index";
import { Character } from "src/Entity/Character/Character";
import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { ItemCost } from "../../Subclass/ItemCost";

/**
 * Useable item base class (e.g., camp kits, tools)
 */
export class Useable extends ItemConsumable {
  // Override to narrow type from ConsumableId to UsableId
  declare id: UsableId;

  constructor(data: Item) {
    super(data);
  }
}

export const campKit = new Useable(
  {
    id: UsableId.campKit,
    name: { en: "Camp Kit", th: "ชุดตั้งแคมป์" },
    description: {
      en: "Basic camp supplies that improve rest quality for one night.",
      th: "ชุดอุปกรณ์ตั้งแคมป์ที่ช่วยให้พักผ่อนได้ดีขึ้นหนึ่งคืน",
    },
    cost: new ItemCost({ baseCost: 120, bonusCost: 0 }),
    blueprintId: undefined,
    image: "healingPotion",
    isCraftable: false,
    tier: TierEnum.common,
    weight: 2,
  },
);
