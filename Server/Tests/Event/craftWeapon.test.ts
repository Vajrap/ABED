import { afterEach, describe, expect, test } from "@jest/globals";
import { craftWeapon } from "../../src/Event/Craft/weapon";
import { blueprintWeaponLongSword } from "../../src/Entity/Blueprint/Equipment/Weapon/Sword/longSword";
import { IngotId, PlankId } from "../../src/Entity/Item/Misc";
import { CharacterFactory } from "../Helper/Character";
import { SwordId } from "../../src/Entity/Item/Equipment/Weapon/type";
import type { Weapon } from "../../src/Entity/Item/Equipment/Weapon/Weapon";
import { itemInstanceRepository } from "../../src/Entity/Item/Equipment/ItemInstance/repository";

const mockMathRandomSequence = (values: number[]) => {
  let index = 0;
  return jest.spyOn(Math, "random").mockImplementation(() => {
    let value: number;
    if (index < values.length) {
      value = Number(values[index]);
    } else if (values.length > 0) {
      value = Number(values[values.length - 1]);
    } else {
      value = 0.5;
    }
    index = Math.min(index + 1, values.length);
    return value;
  });
};

afterEach(() => {
  jest.restoreAllMocks();
  itemInstanceRepository.clear();
});

describe("craftWeapon()", () => {
  test("consumes materials, adds weapon to inventory, and computes cost for iron longsword", () => {
    const actor = CharacterFactory.create().build();
    actor.addItemToInventory(IngotId.IronIngot, 3);
    actor.addItemToInventory(PlankId.OakPlank, 1);

    mockMathRandomSequence([0.95, 0.85]);

    const result = craftWeapon(actor, blueprintWeaponLongSword, {
      blade: IngotId.IronIngot,
      handle: PlankId.OakPlank,
    });

    expect("item" in result).toBe(true);
    if ("item" in result) {
      const crafted = result.item as Weapon;
      expect(crafted.id).toBe(SwordId.LongSword);
      expect(crafted.weaponData.damage.physicalDamageDice).toEqual({ dice: 1, face: 8 });
      expect(crafted.weight).toBe(26); // base weight 15 + blueprint modifier 11
      expect(crafted.cost.baseCost).toBe(790); // (3*180 + 1*150) + 100 fee
      expect(crafted.cost.marketCost).toBe(869);
      expect(crafted.modifier.battleStatus?.pATK ?? 0).toBe(0);
      expect(actor.inventory.has(IngotId.IronIngot)).toBe(false);
      expect(actor.inventory.has(PlankId.OakPlank)).toBe(false);
      expect(actor.inventory.get(SwordId.LongSword)).toBe(1);
      expect(result.amount).toBe(1);
    }
  });

  test("upgrades damage dice and battle stats when using steel ingots", () => {
    const actor = CharacterFactory.create().build();
    actor.addItemToInventory(IngotId.SteelIngot, 3);
    actor.addItemToInventory(PlankId.OakPlank, 1);

    mockMathRandomSequence([0.95, 0.85]);

    const result = craftWeapon(actor, blueprintWeaponLongSword, {
      blade: IngotId.SteelIngot,
      handle: PlankId.OakPlank,
    });

    expect("item" in result).toBe(true);
    if ("item" in result) {
      const crafted = result.item as Weapon;
      expect(crafted.weaponData.damage.physicalDamageDice).toEqual({ dice: 1, face: 10 });
      expect(crafted.cost.baseCost).toBe(1330); // (3*360 + 1*150) + 100 fee
      expect(crafted.modifier.battleStatus?.pATK).toBe(1);
      expect(actor.inventory.has(IngotId.SteelIngot)).toBe(false);
      expect(actor.inventory.has(PlankId.OakPlank)).toBe(false);
      expect(actor.inventory.get(SwordId.LongSword)).toBe(1);
    }
  });

  test("creates unique instance ID and registers in repository", () => {
    const actor = CharacterFactory.create().build();
    actor.addItemToInventory(IngotId.IronIngot, 3);
    actor.addItemToInventory(PlankId.OakPlank, 1);

    mockMathRandomSequence([0.95, 0.85]);

    const result = craftWeapon(actor, blueprintWeaponLongSword, {
      blade: IngotId.IronIngot,
      handle: PlankId.OakPlank,
    });

    expect("item" in result).toBe(true);
    if ("item" in result) {
      const crafted = result.item as Weapon;
      expect(crafted.instanceId).toBeTruthy();
      expect(crafted.instanceId).toContain(actor.id);
      expect(crafted.instanceId).toContain("weaponLongSword");
      
      // Verify it's registered in the repository
      const instance = itemInstanceRepository.get(crafted.instanceId!);
      expect(instance).toBeTruthy();
      expect(instance?.id).toBe(SwordId.LongSword);
      
      // Verify actor has the instance tracked
      expect(actor.itemInstances.has(crafted.instanceId!)).toBe(true);
      expect(actor.itemInstances.get(crafted.instanceId!)).toBe(SwordId.LongSword);
    }
  });

  test("each crafted weapon has a unique instance ID", () => {
    const actor = CharacterFactory.create().build();
    actor.addItemToInventory(IngotId.IronIngot, 6);
    actor.addItemToInventory(PlankId.OakPlank, 2);

    mockMathRandomSequence([0.95, 0.85, 0.95, 0.85]);

    const result1 = craftWeapon(actor, blueprintWeaponLongSword, {
      blade: IngotId.IronIngot,
      handle: PlankId.OakPlank,
    });

    const result2 = craftWeapon(actor, blueprintWeaponLongSword, {
      blade: IngotId.IronIngot,
      handle: PlankId.OakPlank,
    });

    expect("item" in result1).toBe(true);
    expect("item" in result2).toBe(true);
    if ("item" in result1 && "item" in result2) {
      const crafted1 = result1.item as Weapon;
      const crafted2 = result2.item as Weapon;
      expect(crafted1.instanceId).not.toBe(crafted2.instanceId);
      expect(crafted1.instanceId).toBeTruthy();
      expect(crafted2.instanceId).toBeTruthy();
    }
  });

  test("determines gem slots based on skill check for weapons", () => {
    const actor = CharacterFactory.create().build();
    actor.addItemToInventory(IngotId.IronIngot, 3);
    actor.addItemToInventory(PlankId.OakPlank, 1);

    // Mock high roll to potentially pass gem slot DC (18)
    // Weapon gem slot DC is 18, maxSlots is 2
    mockMathRandomSequence([0.95, 0.85, 0.99, 0.99]); // Last two for gem slot checks

    const result = craftWeapon(actor, blueprintWeaponLongSword, {
      blade: IngotId.IronIngot,
      handle: PlankId.OakPlank,
    });

    expect("item" in result).toBe(true);
    if ("item" in result) {
      const crafted = result.item as Weapon;
      // Gem slots should be defined (0-2 based on rolls)
      expect(crafted.weaponData.gemSlots).toBeDefined();
      expect(crafted.weaponData.gemSlots).toBeGreaterThanOrEqual(0);
      expect(crafted.weaponData.gemSlots).toBeLessThanOrEqual(2);
    }
  });
});

