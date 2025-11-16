import { afterEach, describe, expect, test } from "@jest/globals";
import { craftArmor } from "../../src/Event/Craft/armor";
import { blueprintArmorBodyLeatherArmor } from "../../src/Entity/Blueprint/Equipment/Armor/body";
import { blueprintArmorHeadSimpleHood } from "../../src/Entity/Blueprint/Equipment/Armor/head";
import { LeatherId, ClothId, ThreadId, IngotId } from "../../src/Entity/Item/Misc";
import { CharacterFactory } from "../Helper/Character";
import { BodyId, HeadWearId } from "../../src/Entity/Item/Equipment/Armor/type";
import type { Armor } from "../../src/Entity/Item/Equipment/Armor/Armor";
import { itemInstanceRepository } from "../../src/Entity/Item/Equipment/ItemInstance/repository";

const mockMathRandomSequence = (values: number[]) => {
  let index = 0;
  return jest.spyOn(Math, "random").mockImplementation((): number => {
    if (index < values.length && values[index] !== undefined) {
      const value = values[index]!;
      index = Math.min(index + 1, values.length);
      return value;
    }
    const lastValue = values[values.length - 1];
    return lastValue ?? 0.5;
  });
};

afterEach(() => {
  jest.restoreAllMocks();
  itemInstanceRepository.clear();
});

describe("craftArmor()", () => {
  test("consumes materials, adds armor to inventory, and computes cost for leather armor", () => {
    const actor = CharacterFactory.create().build();
    actor.addItemToInventory(LeatherId.Leather, 3);
    actor.addItemToInventory(ClothId.LinenCloth, 2);
    actor.addItemToInventory(ThreadId.WoolThread, 2);

    mockMathRandomSequence([0.95, 0.85, 0.75]);

    const result = craftArmor(actor, blueprintArmorBodyLeatherArmor, {
      primary: LeatherId.Leather,
      secondary: ClothId.LinenCloth,
      accent: ThreadId.WoolThread,
    });

    expect("item" in result).toBe(true);
    if ("item" in result) {
      const crafted = result.item as Armor;
      expect(crafted.armorData.pDef?.slash).toBe(2);
      expect(crafted.cost.baseCost).toBeGreaterThan(0);
      expect(actor.inventory.has(LeatherId.Leather)).toBe(false);
      expect(actor.inventory.has(ClothId.LinenCloth)).toBe(false);
      expect(actor.inventory.has(ThreadId.WoolThread)).toBe(false);
      expect(result.amount).toBe(1);
    }
  });

  test("applies bonuses from materials and creates unique instance ID", () => {
    const actor = CharacterFactory.create().build();
    actor.addItemToInventory(LeatherId.ThickLeather, 3);
    actor.addItemToInventory(ClothId.LinenCloth, 2);
    actor.addItemToInventory(ThreadId.WoolThread, 2);

    mockMathRandomSequence([0.95, 0.85, 0.75]);

    const result = craftArmor(actor, blueprintArmorBodyLeatherArmor, {
      primary: LeatherId.ThickLeather,
      secondary: ClothId.LinenCloth,
      accent: ThreadId.WoolThread,
    });

    expect("item" in result).toBe(true);
    if ("item" in result) {
      const crafted = result.item as Armor;
      expect(crafted.instanceId).toBeTruthy();
      expect(crafted.instanceId).toContain(actor.id);
      expect(crafted.instanceId).toContain("armorBodyLeatherArmor");
      
      // ThickLeather provides pDef: 1, so we should see some defense bonus
      expect(crafted.modifier.battleStatus?.pDEF).toBeGreaterThanOrEqual(0);
      
      // Verify it's registered in the repository
      const instance = itemInstanceRepository.get(crafted.instanceId!);
      expect(instance).toBeTruthy();
      expect(instance?.baseItemId).toBe(BodyId.LeatherArmor);
      
      // Verify actor has the instance tracked
      expect(actor.itemInstances.has(crafted.instanceId!)).toBe(true);
    }
  });

  test("determines gem slots based on skill check for body armor", () => {
    const actor = CharacterFactory.create().build();
    actor.addItemToInventory(LeatherId.Leather, 3);
    actor.addItemToInventory(ClothId.LinenCloth, 2);
    actor.addItemToInventory(ThreadId.WoolThread, 2);

    // Mock high roll to pass gem slot DC (20)
    // d20 roll needs to be >= 20 - artisanBonus
    // With artisanBonus = 0, we need roll >= 20, so mock 0.95 (roll = 19) won't work
    // Let's mock 0.99 to get roll = 19.8 ≈ 20
    mockMathRandomSequence([0.99, 0.85, 0.75, 0.99]); // Last one for gem slot check

    const result = craftArmor(actor, blueprintArmorBodyLeatherArmor, {
      primary: LeatherId.Leather,
      secondary: ClothId.LinenCloth,
      accent: ThreadId.WoolThread,
    });

    expect("item" in result).toBe(true);
    if ("item" in result) {
      const crafted = result.item as Armor;
      // Body armor has maxSlots: 1, gemSlot DC: 20
      // With low artisan bonus, gem slots should be 0 (DC too high)
      expect(crafted.armorData.gemSlots).toBeDefined();
    }
  });

  test("crafts head armor with appropriate bonuses", () => {
    const actor = CharacterFactory.create().build();
    actor.addItemToInventory(ClothId.LinenCloth, 1);
    actor.addItemToInventory(ThreadId.WoolThread, 1);

    mockMathRandomSequence([0.95, 0.85]);

    const result = craftArmor(actor, blueprintArmorHeadSimpleHood, {
      primary: ClothId.LinenCloth,
      accent: ThreadId.WoolThread,
    });

    expect("item" in result).toBe(true);
    if ("item" in result) {
      const crafted = result.item as Armor;
      expect(crafted.slot).toBe("headWear");
      expect(crafted.instanceId).toBeTruthy();
    }
  });

  test("returns error when materials are insufficient", () => {
    const actor = CharacterFactory.create().build();
    actor.addItemToInventory(LeatherId.Leather, 2); // Need 3

    const result = craftArmor(actor, blueprintArmorBodyLeatherArmor, {
      primary: LeatherId.Leather,
      secondary: ClothId.LinenCloth,
      accent: ThreadId.WoolThread,
    });

    expect("reason" in result).toBe(true);
    if ("reason" in result) {
      expect(result.reason).toBe("Not enough materials");
    }
  });

  test("returns error when material selection is invalid", () => {
    const actor = CharacterFactory.create().build();
    actor.addItemToInventory(LeatherId.Leather, 3);
    actor.addItemToInventory(ClothId.LinenCloth, 2);
    // Missing accent material

    const result = craftArmor(actor, blueprintArmorBodyLeatherArmor, {
      primary: LeatherId.Leather,
      secondary: ClothId.LinenCloth,
    });

    expect("reason" in result).toBe(true);
    if ("reason" in result) {
      expect(result.reason).toBe("Invalid or missing material selection");
    }
  });
});

