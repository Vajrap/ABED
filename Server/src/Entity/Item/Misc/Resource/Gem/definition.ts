import { GemId } from "../..";
import { ItemMisc } from "../../Misc";
import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { ItemCost } from "src/Entity/Item/Subclass/ItemCost";

export const gemRough = new ItemMisc({
  id: GemId.RoughGem,
  name: { en: "Rough Gemstone", th: "" },
  description: { en: "Uncut gem, still bearing raw brilliance.", th: "" },
  image: "gemRough",
  weight: 3,
  tier: TierEnum.uncommon,
  cost: new ItemCost({ baseCost: 300, bonusCost: 0 }),
  isCraftable: false,
  craftingRecipe: { resource: new Map(), item: new Map() },
});

export const gemCut = new ItemMisc({
  id: GemId.CutGem,
  name: { en: "Cut Gemstone", th: "" },
  description: { en: "Polished and cut, gleaming with inner light.", th: "" },
  image: "gemCut",
  weight: 3,
  tier: TierEnum.rare,
  cost: new ItemCost({ baseCost: 1000, bonusCost: 0 }), // 1 gold
  isCraftable: true,
  craftingRecipe: { resource: new Map(), item: new Map([[GemId.RoughGem, 1]]) },
});
