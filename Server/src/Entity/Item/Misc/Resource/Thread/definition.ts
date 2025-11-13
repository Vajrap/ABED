import { ThreadId } from "../..";
import { ItemMisc } from "../../Misc";
import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { ItemCost } from "src/Entity/Item/Subclass/ItemCost";
import { createEquipmentCraftingAttributes } from "src/Entity/Item/Misc/Resource/EquipmentCraftingAttributes";
import { BlueprintId } from "src/Entity/Blueprint/enum";

type ThreadDefinition = {
  name: string;
  description: string;
  tier: TierEnum;
  weight: number;
  baseCost: number;
  craftingAttributes?: ReturnType<typeof createEquipmentCraftingAttributes>;
};

const THREAD_DATA: Record<ThreadId, ThreadDefinition> = {
  [ThreadId.WoolThread]: {
    name: "Wool Thread",
    description: "Simple spun wool used for everyday cloth.",
    tier: TierEnum.common,
    weight: 2,
    baseCost: 110,
    craftingAttributes: createEquipmentCraftingAttributes({
      attributes: { dexterity: 1 },
      needs: { moodBonus: 1 },
    }),
  },
  [ThreadId.LinenThread]: {
    name: "Linen Thread",
    description: "Durable thread spun from flax fibers.",
    tier: TierEnum.uncommon,
    weight: 2,
    baseCost: 240,
    craftingAttributes: createEquipmentCraftingAttributes({
      attributes: { control: 1 },
    }),
  },
  [ThreadId.SilkThread]: {
    name: "Silk Thread",
    description: "Smooth and fine thread for noble garments and enchantments.",
    tier: TierEnum.rare,
    weight: 1,
    baseCost: 480,
    craftingAttributes: createEquipmentCraftingAttributes({ planarAttunement: 1 }),
  },
  [ThreadId.CottonThread]: {
    name: "Cotton Thread",
    description: "Soft, versatile thread used across the realm.",
    tier: TierEnum.common,
    weight: 2,
    baseCost: 100,
    craftingAttributes: createEquipmentCraftingAttributes({ tags: ["comfort"] }),
  },
  [ThreadId.SpiderSilk]: {
    name: "Spider Silk Thread",
    description: "Incredibly strong thread spun from giant spider silk.",
    tier: TierEnum.rare,
    weight: 1,
    baseCost: 540,
    craftingAttributes: createEquipmentCraftingAttributes({ dodge: 1 }),
  },
  [ThreadId.YetiThread]: {
    name: "Yeti Thread",
    description: "Thick insulating thread from Yeti fur.",
    tier: TierEnum.uncommon,
    weight: 3,
    baseCost: 240,
    craftingAttributes: createEquipmentCraftingAttributes({ defense: { water: 1 } }),
  },
  [ThreadId.PhoenixThread]: {
    name: "Phoenix Thread",
    description: "Glowing thread woven from phoenix down, faintly warm.",
    tier: TierEnum.epic,
    weight: 1,
    baseCost: 1800,
    craftingAttributes: createEquipmentCraftingAttributes({ defense: { fire: 1 }, vitals: { hp: 5 } }),
  },
  [ThreadId.SalamanderThread]: {
    name: "Salamander Thread",
    description: "Heatproof thread ideal for flame-resistant garb.",
    tier: TierEnum.rare,
    weight: 1,
    baseCost: 500,
    craftingAttributes: createEquipmentCraftingAttributes({ defense: { fire: 1 } }),
  },
  [ThreadId.SpiritThread]: {
    name: "Spirit Thread",
    description: "Ethereal fiber that shimmers with spectral light.",
    tier: TierEnum.rare,
    weight: 1,
    baseCost: 520,
    craftingAttributes: createEquipmentCraftingAttributes({ planarAttunement: 1 }),
  },
  [ThreadId.AetherThread]: {
    name: "Aether Thread",
    description: "Planar essence spun into thread; highly conductive to magic.",
    tier: TierEnum.epic,
    weight: 1,
    baseCost: 1900,
    craftingAttributes: createEquipmentCraftingAttributes({ planarAttunement: 2 }),
  },
  [ThreadId.SteamspunFiber]: {
    name: "Steamspun Fiber",
    description: "Machine-made fiber with uniform tension and resilience.",
    tier: TierEnum.uncommon,
    weight: 2,
    baseCost: 220,
    craftingAttributes: createEquipmentCraftingAttributes({ defense: { order: 1 } }),
  },
  [ThreadId.FluxWeave]: {
    name: "Flux Weave Fiber",
    description: "Hybrid mechanical-magical fiber used in magitech clothing.",
    tier: TierEnum.rare,
    weight: 2,
    baseCost: 540,
    craftingAttributes: createEquipmentCraftingAttributes({ defense: { order: 1, chaos: 1 }, tags: ["magitech"] }),
  },
};

const THREAD_BLUEPRINT: Record<ThreadId, BlueprintId> = {
  [ThreadId.WoolThread]: BlueprintId.Spin_Thread_Wool,
  [ThreadId.LinenThread]: BlueprintId.Spin_Thread_Linen,
  [ThreadId.SilkThread]: BlueprintId.Spin_Thread_Silk,
  [ThreadId.CottonThread]: BlueprintId.Spin_Thread_Cotton,
  [ThreadId.SpiderSilk]: BlueprintId.Spin_Thread_SpiderSilk,
  [ThreadId.YetiThread]: BlueprintId.Spin_Thread_Yeti,
  [ThreadId.PhoenixThread]: BlueprintId.Spin_Thread_Phoenix,
  [ThreadId.SalamanderThread]: BlueprintId.Spin_Thread_Salamander,
  [ThreadId.SpiritThread]: BlueprintId.Spin_Thread_Spirit,
  [ThreadId.AetherThread]: BlueprintId.Spin_Thread_Aether,
  [ThreadId.SteamspunFiber]: BlueprintId.Spin_Thread_Steamspun,
  [ThreadId.FluxWeave]: BlueprintId.Spin_Thread_FluxWeave,
};

export const threadItems: Record<ThreadId, ItemMisc> = Object.fromEntries(
  Object.entries(THREAD_DATA).map(([id, data]) => [
    id,
    new ItemMisc({
      id: id as ThreadId,
      name: { en: data.name, th: "" },
      description: { en: data.description, th: "" },
      tier: data.tier,
      weight: data.weight,
      cost: new ItemCost({ baseCost: data.baseCost }),
      isCraftable: true,
      blueprintId: THREAD_BLUEPRINT[id as ThreadId],
      equipmentCraftingAttributes: data.craftingAttributes ?? createEquipmentCraftingAttributes(),
    }),
  ]),
) as Record<ThreadId, ItemMisc>;
