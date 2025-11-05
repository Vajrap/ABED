import { LeatherId, SkinId } from "../..";
import { ItemMisc } from "../../Misc";
import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { ItemCost } from "src/Entity/Item/Subclass/ItemCost";

export const leatherBasic = new ItemMisc({
  id: LeatherId.Leather,
  name: { en: "Leather", th: "" },
  description: { en: "Treated animal hide, durable and flexible.", th: "" },
  image: "leatherBasic",
  weight: 8,
  tier: TierEnum.common,
  cost: new ItemCost({ baseCost: 120, bonusCost: 0 }),
  isCraftable: true,
  craftingRecipe: { item: new Map([[SkinId.Hide, 1]]), resource: new Map() },
});

export const leatherFine = new ItemMisc({
  id: LeatherId.FineLeather,
  name: { en: "Fine Leather", th: "" },
  description: { en: "High-quality leather with smooth finish.", th: "" },
  image: "leatherFine",
  weight: 8,
  tier: TierEnum.uncommon,
  cost: new ItemCost({ baseCost: 300, bonusCost: 0 }),
  isCraftable: true,
  craftingRecipe: { item: new Map([[SkinId.Fur, 1]]), resource: new Map() },
});

export const leatherScaled = new ItemMisc({
  id: LeatherId.ScaledLeather,
  name: { en: "Scaled Leather", th: "" },
  description: {
    en: "Leather reinforced with reptile scales for added protection.",
    th: "",
  },
  image: "leatherScaled",
  weight: 10,
  tier: TierEnum.rare,
  cost: new ItemCost({ baseCost: 600, bonusCost: 0 }),
  isCraftable: true,
  craftingRecipe: { item: new Map([[SkinId.Scale, 1]]), resource: new Map() },
});
