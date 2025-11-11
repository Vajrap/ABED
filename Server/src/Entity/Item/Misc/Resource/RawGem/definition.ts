import { RawGem } from "./RawGem";
import { RawGemId } from "../..";
import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { ItemCost } from "src/Entity/Item/Subclass/ItemCost";
import { createEquipmentCraftingAttributes } from "src/Entity/Item/Misc/Resource/EquipmentCraftingAttributes";

export const rawGemItems: Record<RawGemId, RawGem> = {
  [RawGemId.RoughGem]: new RawGem({
    id: RawGemId.RoughGem,
    name: { en: "Rough Gemstone", th: "" },
    description: {
      en: "Uncut gemstone bearing raw brilliance; ready for refinement.",
      th: "",
    },
    tier: TierEnum.common,
    weight: 3,
    cost: new ItemCost({ baseCost: 180 }),
    isCraftable: false,
    equipmentCraftingAttributes: createEquipmentCraftingAttributes(),
  }),
};

