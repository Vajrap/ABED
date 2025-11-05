import { ThreadId } from "../..";
import { ItemMisc } from "../../Misc";
import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { ItemCost } from "src/Entity/Item/Subclass/ItemCost";

export const threadWool = new ItemMisc({
  id: ThreadId.WoolThread,
  name: { en: "Wool Thread", th: "" },
  description: { en: "Simple spun wool used for basic cloth.", th: "" },
  image: "threadWool",
  weight: 2,
  tier: TierEnum.common,
  cost: new ItemCost({ baseCost: 80, bonusCost: 0 }),
  isCraftable: true,
  craftingRecipe: { resource: new Map(), item: new Map() },
});

export const threadLinen = new ItemMisc({
  id: ThreadId.LinenThread,
  name: { en: "Linen Thread", th: "" },
  description: { en: "Durable thread spun from flax fibers.", th: "" },
  image: "threadLinen",
  weight: 2,
  tier: TierEnum.uncommon,
  cost: new ItemCost({ baseCost: 200, bonusCost: 0 }),
  isCraftable: true,
  craftingRecipe: { resource: new Map(), item: new Map() },
});

export const threadSilk = new ItemMisc({
  id: ThreadId.SilkThread,
  name: { en: "Silk Thread", th: "" },
  description: {
    en: "Smooth and fine, used for noble garments and enchantments.",
    th: "",
  },
  image: "threadSilk",
  weight: 1,
  tier: TierEnum.rare,
  cost: new ItemCost({ baseCost: 600, bonusCost: 0 }),
  isCraftable: true,
  craftingRecipe: { resource: new Map(), item: new Map() },
});
