import { SkinId } from "../..";
import { Skin } from "./Skin";
import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { ItemCost } from "src/Entity/Item/Subclass/ItemCost";

export const skinHide = new Skin({
  id: SkinId.Hide,
  name: { en: "Animal Hide", th: "" },
  description: { en: "Thick raw hide from beasts, used for tanning.", th: "" },
  image: "skinHide",
  weight: 10,
  tier: TierEnum.common,
  cost: new ItemCost({ baseCost: 20, bonusCost: 0 }),
  isCraftable: false,
  blueprintId: { resource: new Map(), item: new Map() },
});

export const skinFur = new Skin({
  id: SkinId.Fur,
  name: { en: "Beast Fur", th: "" },
  description: { en: "Soft and insulating, valued for clothing.", th: "" },
  image: "skinFur",
  weight: 8,
  tier: TierEnum.uncommon,
  cost: new ItemCost({ baseCost: 50, bonusCost: 0 }),
  isCraftable: false,
  blueprintId: { resource: new Map(), item: new Map() },
});

export const skinScale = new Skin({
  id: SkinId.Scale,
  name: { en: "Reptile Scales", th: "" },
  description: {
    en: "Durable, tough scales often used in armor crafting.",
    th: "",
  },
  image: "skinScale",
  weight: 10,
  tier: TierEnum.rare,
  cost: new ItemCost({ baseCost: 100, bonusCost: 0 }), // 1 silver
  isCraftable: false,
  blueprintId: { resource: new Map(), item: new Map() },
});
