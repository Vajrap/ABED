import { describe, expect, test, beforeEach } from "@jest/globals";
import { Market } from "../../../src/Entity/Market/Market";
import { Item } from "../../../src/Entity/Item/Item";
import type { ItemCostInit } from "../../../src/Entity/Item/Subclass/ItemCost";
import { SpearId } from "../../../src/Entity/Item/Equipment/Weapon/type";
import { LocationsEnum } from "../../../src/InterFacesEnumsAndTypes/Enums/Location";
import type { ResourceType } from "../../../src/InterFacesEnumsAndTypes/ResourceTypes";

const createItem = (cost: ItemCostInit, primary?: ResourceType | null) =>
  new Item({
    id: SpearId.Javelin,
    name: { en: "Test Item", th: "ทดสอบ" },
    cost,
    primaryResource: primary ?? null,
  });

describe("Market.getPrice", () => {
  let market: Market;

  beforeEach(() => {
    market = new Market();
  });

  test("returns base price when no primary resource is defined", () => {
    const item = createItem({ baseCost: 120 });

    const price = market.getPrice(item, LocationsEnum.WaywardInn);

    expect(price).toBe(120);
  });

  test("applies primary resource modifiers when present", () => {
    const item = createItem({ baseCost: 100 }, "ore");
    market.yearlyModifiers.set("ore", 1.5);

    const price = market.getPrice(item, LocationsEnum.WaywardInn);

    expect(price).toBeCloseTo(150);
  });
});

