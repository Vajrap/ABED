import { ItemMisc } from "../Misc";
import type { Item } from "../../Item";
import { QuestItemId } from "../index";
import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { ItemCost } from "../../Subclass/ItemCost";

/**
 * Quest item base class
 * Quest items are special items used in quests (keys, packages, etc.)
 */
export class QuestItem extends ItemMisc {
  // Override to narrow type from MiscItemId to QuestItemId
  declare id: QuestItemId;

  constructor(data: Item) {
    super(data);
  }
}

export const ancientKey = new QuestItem({
  id: QuestItemId.ancientKey,
  name: {
    en: "Ancient Key",
    th: "กุญแจโบราณ",
  },
  description: {
    en: "An ancient key with mysterious engravings. It seems to unlock something important.",
    th: "กุญแจโบราณที่มีลวดลายลึกลับ ดูเหมือนจะเปิดอะไรบางอย่างที่สำคัญ",
  },
  image: "ancientKey",
  weight: 0.5,
  tier: TierEnum.rare,
  cost: new ItemCost({
    baseCost: 0, // Quest reward, not purchasable
    bonusCost: 0,
  }),
  isCraftable: false,
  blueprintId: undefined,
});

export const secretPackage = new QuestItem({
  id: QuestItemId.secretPackage,
  name: {
    en: "Secret Package",
    th: "พัสดุลับ",
  },
  description: {
    en: "A sealed package wrapped in cloth. It feels important.",
    th: "พัสดุที่ปิดผนึกห่อด้วยผ้า รู้สึกว่าสำคัญ",
  },
  image: "secretPackage",
  weight: 1,
  tier: TierEnum.common,
  cost: new ItemCost({
    baseCost: 0, // Quest item, not purchasable
    bonusCost: 0,
  }),
  isCraftable: false,
  blueprintId: undefined,
});

