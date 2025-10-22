import { expect, describe, it, beforeEach } from "bun:test";
import { getTarget } from "../../../src/Entity/Battle/getTarget";
import { Character } from "../../../src/Entity/Character/Character";
import { CharacterFactory } from "../../Helper/Character";
import { BuffsAndDebuffsEnum } from "../../../src/Entity/BuffsAndDebuffs/enum";
import { CharacterVitals } from "../../../src/Entity/Character/Subclass/Vitals/CharacterVitals";
import { CharacterAttributes } from "../../../src/Entity/Character/Subclass/Stats/CharacterAttributes";
import { CharacterElements } from "../../../src/Entity/Character/Subclass/Stats/CharacterElements";
import { L10N } from "../../../src/InterFacesEnumsAndTypes/L10N";

// Helper to create characters with specific vital values
class Vital {
  base: number;
  bonus: number;
  current: number;
  constructor(data: { base?: number; bonus?: number; current?: number }) {
    this.base = data.base ?? 10;
    this.bonus = data.bonus ?? 0;
    this.current = data.current ?? (this.base + this.bonus);
  }
  get max() {
    return Math.max(1, this.base + this.bonus);
  }
}

describe("getTarget", () => {
  let actor: Character;
  let target1: Character;
  let target2: Character;
  let target3: Character;
  let target4: Character;

  beforeEach(() => {
    // Create an actor
    actor = CharacterFactory.create().withName("Actor").build();
    actor.attribute.getStat("willpower").base = 10; // For perception checks

    // Create multiple targets with different HP values for testing
    target1 = CharacterFactory.create().withName("Target1").build();
    target1.vitals = new CharacterVitals({
      hp: new Vital({ base: 100, current: 100 }) as any,
      mp: new Vital({ base: 100, current: 100 }) as any,
      sp: new Vital({ base: 100, current: 100 }) as any,
    });

    target2 = CharacterFactory.create().withName("Target2").build();
    target2.vitals = new CharacterVitals({
      hp: new Vital({ base: 100, current: 50 }) as any,
      mp: new Vital({ base: 100, current: 100 }) as any,
      sp: new Vital({ base: 100, current: 100 }) as any,
    });

    target3 = CharacterFactory.create().withName("Target3").build();
    target3.vitals = new CharacterVitals({
      hp: new Vital({ base: 100, current: 75 }) as any,
      mp: new Vital({ base: 100, current: 100 }) as any,
      sp: new Vital({ base: 100, current: 100 }) as any,
    });

    target4 = CharacterFactory.create().withName("Target4").build();
    target4.vitals = new CharacterVitals({
      hp: new Vital({ base: 100, current: 25 }) as any,
      mp: new Vital({ base: 100, current: 100 }) as any,
      sp: new Vital({ base: 100, current: 100 }) as any,
    });
  });

  describe("Basic Functionality", () => {
    it("should return a TargetSelector instance", () => {
      const selector = getTarget(actor, [target1, target2]);
      expect(selector).toBeDefined();
      expect(selector).not.toBeNull();
    });

    it("should handle empty target list", () => {
      const selector = getTarget(actor, []);
      expect(selector).toBeDefined();
    });

    it("should handle single target", () => {
      const selector = getTarget(actor, [target1]);
      const result = selector!.randomly();
      expect(result).toHaveLength(1);
      expect(result[0]).toBe(target1);
    });
  });

  describe("Random Selection", () => {
    it("should select one random target", () => {
      const selector = getTarget(actor, [target1, target2, target3]);
      const result = selector!.randomly();
      
      expect(result).toHaveLength(1);
      expect([target1, target2, target3]).toContain(result[0]);
    });

    it("should select many random targets without duplicates", () => {
      const selector = getTarget(actor, [target1, target2, target3, target4]);
      selector!.many(3);
      const result = selector!.randomly();
      
      expect(result).toHaveLength(3);
      // Check no duplicates
      const uniqueTargets = new Set(result);
      expect(uniqueTargets.size).toBe(3);
    });

    it("should handle requesting more targets than available", () => {
      const selector = getTarget(actor, [target1, target2]);
      selector!.many(5);
      const result = selector!.randomly();
      
      expect(result.length).toBeLessThanOrEqual(2);
    });

    it("should select all targets when using all()", () => {
      const selector = getTarget(actor, [target1, target2, target3]);
      const result = selector!.all();
      
      expect(result).toHaveLength(3);
      expect(result).toContain(target1);
      expect(result).toContain(target2);
      expect(result).toContain(target3);
    });
  });

  describe("Sorted Selection - with()", () => {
    describe("HP Sorting", () => {
    it("should select one target with lowest HP using with()", () => {
      const selector = getTarget(actor, [target1, target2, target3, target4]);
      selector!.one();
      const result = selector!.with("less", "currentHP");
      
      expect(result).toHaveLength(1);
      expect(result[0]).toBe(target4); // 25 HP
    });

    it("should select one target with highest HP using with()", () => {
      const selector = getTarget(actor, [target1, target2, target3, target4]);
      selector!.one();
      const result = selector!.with("most", "currentHP");
      
      expect(result).toHaveLength(1);
      expect(result[0]).toBe(target1); // 100 HP
    });

      it("should select many targets sorted by HP", () => {
        const selector = getTarget(actor, [target1, target2, target3, target4]);
        selector!.many(2);
        const result = selector!.with("less", "currentHP");
        
        expect(result).toHaveLength(2);
        expect(result[0]).toBe(target4); // 25 HP
        expect(result[1]).toBe(target2); // 50 HP
      });
    });

    describe("MP Sorting", () => {
      beforeEach(() => {
        target1.vitals.mp.current = 100;
        target2.vitals.mp.current = 30;
        target3.vitals.mp.current = 60;
        target4.vitals.mp.current = 10;
      });

      it("should sort by currentMP ascending", () => {
        const selector = getTarget(actor, [target1, target2, target3, target4]);
        selector!.many(2);
        const result = selector!.with("less", "currentMP");
        
        expect(result[0]).toBe(target4); // 10 MP
        expect(result[1]).toBe(target2); // 30 MP
      });

      it("should sort by currentMP descending", () => {
        const selector = getTarget(actor, [target1, target2, target3, target4]);
        selector!.many(2);
        const result = selector!.with("most", "currentMP");
        
        expect(result[0]).toBe(target1); // 100 MP
        expect(result[1]).toBe(target3); // 60 MP
      });
    });

    describe("SP Sorting", () => {
      beforeEach(() => {
        target1.vitals.sp.current = 50;
        target2.vitals.sp.current = 75;
        target3.vitals.sp.current = 25;
        target4.vitals.sp.current = 100;
      });

      it("should sort by currentSP ascending", () => {
        const selector = getTarget(actor, [target1, target2, target3, target4]);
        selector!.many(2);
        const result = selector!.with("less", "currentSP");
        
        expect(result[0]).toBe(target3); // 25 SP
        expect(result[1]).toBe(target1); // 50 SP
      });

      it("should sort by currentSP descending", () => {
        const selector = getTarget(actor, [target1, target2, target3, target4]);
        selector!.many(2);
        const result = selector!.with("most", "currentSP");
        
        expect(result[0]).toBe(target4); // 100 SP
        expect(result[1]).toBe(target2); // 75 SP
      });
    });

    describe("Attribute Sorting", () => {
      beforeEach(() => {
        target1.attribute.getStat("strength").base = 10;
        target2.attribute.getStat("strength").base = 20;
        target3.attribute.getStat("strength").base = 5;
        target4.attribute.getStat("strength").base = 15;
      });

      it("should sort by attribute ascending", () => {
        const selector = getTarget(actor, [target1, target2, target3, target4]);
        selector!.many(2);
        const result = selector!.with("less", "strength");
        
        expect(result[0]).toBe(target3); // 5 strength
        expect(result[1]).toBe(target1); // 10 strength
      });

      it("should sort by attribute descending", () => {
        const selector = getTarget(actor, [target1, target2, target3, target4]);
        selector!.many(2);
        const result = selector!.with("most", "strength");
        
        expect(result[0]).toBe(target2); // 20 strength
        expect(result[1]).toBe(target4); // 15 strength
      });

      it("should sort by different attributes", () => {
        target1.attribute.getStat("intelligence").base = 8;
        target2.attribute.getStat("intelligence").base = 12;
        
        const selector = getTarget(actor, [target1, target2]);
        const result = selector!.with("most", "intelligence");
        
        expect(result[0]).toBe(target2);
      });
    });

    describe("Element Sorting", () => {
      beforeEach(() => {
        target1.elements.getStat("fire").base = 15;
        target2.elements.getStat("fire").base = 5;
        target3.elements.getStat("fire").base = 10;
        target4.elements.getStat("fire").base = 20;
      });

      it("should sort by element ascending", () => {
        const selector = getTarget(actor, [target1, target2, target3, target4]);
        selector!.many(2);
        const result = selector!.with("less", "fire");
        
        expect(result[0]).toBe(target2); // 5 fire
        expect(result[1]).toBe(target3); // 10 fire
      });

      it("should sort by element descending", () => {
        const selector = getTarget(actor, [target1, target2, target3, target4]);
        selector!.many(2);
        const result = selector!.with("most", "fire");
        
        expect(result[0]).toBe(target4); // 20 fire
        expect(result[1]).toBe(target1); // 15 fire
      });

      it("should sort by different elements", () => {
        target1.elements.getStat("water").base = 3;
        target2.elements.getStat("water").base = 7;
        
        const selector = getTarget(actor, [target1, target2]);
        const result = selector!.with("less", "water");
        
        expect(result[0]).toBe(target1);
      });
    });
  });

  describe("Taunt Mechanics", () => {
    it("should prioritize taunting targets in with()", () => {
      // Set target2 as taunting
      target2.buffsAndDebuffs.entry.set(BuffsAndDebuffsEnum.taunt, {
        value: 1,
        isPerm: false,
        permValue: 0,
      });

      const selector = getTarget(actor, [target1, target2, target3, target4]);
      selector!.one();
      const result = selector!.with("less", "currentHP");
      
      // Target2 should be first even though it doesn't have the lowest HP
      expect(result[0]).toBe(target2);
    });

    it("should prioritize multiple taunting targets", () => {
      target2.buffsAndDebuffs.entry.set(BuffsAndDebuffsEnum.taunt, {
        value: 1,
        isPerm: false,
        permValue: 0,
      });
      target3.buffsAndDebuffs.entry.set(BuffsAndDebuffsEnum.taunt, {
        value: 1,
        isPerm: false,
        permValue: 0,
      });

      const selector = getTarget(actor, [target1, target2, target3, target4]);
      selector!.many(2);
      const result = selector!.with("less", "currentHP");
      
      // First two should be the taunting targets (in random order)
      expect([target2, target3]).toContain(result[0]);
      expect([target2, target3]).toContain(result[1]);
      expect(result[0]).not.toBe(result[1]);
    });

    it("should not select taunting targets twice in many()", () => {
      target1.buffsAndDebuffs.entry.set(BuffsAndDebuffsEnum.taunt, {
        value: 1,
        isPerm: false,
        permValue: 0,
      });

      const selector = getTarget(actor, [target1, target2, target3]);
      selector!.many(3);
      const result = selector!.with("less", "currentHP");
      
      expect(result).toHaveLength(3);
      // Check no duplicates
      const uniqueTargets = new Set(result);
      expect(uniqueTargets.size).toBe(3);
      // First should be the taunting target
      expect(result[0]).toBe(target1);
    });

    it("should bypass taunt when byPassTaunt() is called", () => {
      target1.buffsAndDebuffs.entry.set(BuffsAndDebuffsEnum.taunt, {
        value: 1,
        isPerm: false,
        permValue: 0,
      });

      const selector = getTarget(actor, [target1, target2, target3, target4]);
      selector!.byPassTaunt();
      const result = selector!.with("less", "currentHP");
      
      // Should select by HP, not taunt
      expect(result[0]).toBe(target4); // 25 HP
    });

    it("should handle taunting targets in randomly()", () => {
      target2.buffsAndDebuffs.entry.set(BuffsAndDebuffsEnum.taunt, {
        value: 1,
        isPerm: false,
        permValue: 0,
      });

      const selector = getTarget(actor, [target1, target2, target3, target4]);
      const result = selector!.randomly();
      
      // Should always select the taunting target
      expect(result[0]).toBe(target2);
    });

    it("should randomize between multiple taunting targets", () => {
      target1.buffsAndDebuffs.entry.set(BuffsAndDebuffsEnum.taunt, {
        value: 1,
        isPerm: false,
        permValue: 0,
      });
      target2.buffsAndDebuffs.entry.set(BuffsAndDebuffsEnum.taunt, {
        value: 1,
        isPerm: false,
        permValue: 0,
      });

      // Run multiple times to check randomization
      const results = new Set();
      for (let i = 0; i < 10; i++) {
        const selector = getTarget(actor, [target1, target2, target3]);
        const result = selector!.randomly();
        results.add(result[0]?.id);
      }
      
      // Should pick from taunting targets
      for (const id of results) {
        expect([target1.id, target2.id]).toContain(id);
      }
    });
  });

  describe("Hiding Mechanics", () => {
    it("should check hiding and potentially skip target in with()", () => {
      // Make target with lowest HP hiding
      target4.buffsAndDebuffs.entry.set(BuffsAndDebuffsEnum.hiding, {
        value: 1,
        isPerm: false,
        permValue: 0,
      });

      // Set actor's willpower to 5 (low perception)
      actor.attribute.getStat("willpower").base = 5;

      const selector = getTarget(actor, [target1, target2, target3, target4]);
      selector!.one();
      const result = selector!.with("less", "currentHP");
      
      // Should still return a target (might be target4 if perception passes, or next in line)
      expect(result).toHaveLength(1);
      expect([target1, target2, target3, target4]).toContain(result[0]);
    });

    it("should always select target if only one available even if hiding", () => {
      target1.buffsAndDebuffs.entry.set(BuffsAndDebuffsEnum.hiding, {
        value: 1,
        isPerm: false,
        permValue: 0,
      });

      actor.attribute.getStat("willpower").base = 1; // Very low perception

      const selector = getTarget(actor, [target1]);
      const result = selector!.with("less", "currentHP");
      
      expect(result).toHaveLength(1);
      expect(result[0]).toBe(target1); // Must select even if hiding
    });

    it("should bypass hiding when byPassHiding() is called", () => {
      target4.buffsAndDebuffs.entry.set(BuffsAndDebuffsEnum.hiding, {
        value: 1,
        isPerm: false,
        permValue: 0,
      });

      actor.attribute.getStat("willpower").base = 1;

      const selector = getTarget(actor, [target1, target2, target3, target4]);
      selector!.byPassHiding();
      const result = selector!.with("less", "currentHP");
      
      // Should select target4 regardless of hiding
      expect(result[0]).toBe(target4);
    });

    it("should handle hiding in randomly() with multiple attempts", () => {
      target1.buffsAndDebuffs.entry.set(BuffsAndDebuffsEnum.hiding, {
        value: 1,
        isPerm: false,
        permValue: 0,
      });

      actor.attribute.getStat("willpower").base = 5;

      const selector = getTarget(actor, [target1, target2, target3]);
      const result = selector!.randomly();
      
      expect(result).toHaveLength(1);
      expect([target1, target2, target3]).toContain(result[0]);
    });

    it("should eventually select a target even if all are hiding", () => {
      // Make all targets hiding
      [target1, target2, target3, target4].forEach(t => {
        t.buffsAndDebuffs.entry.set(BuffsAndDebuffsEnum.hiding, {
          value: 1,
          isPerm: false,
          permValue: 0,
        });
      });

      actor.attribute.getStat("willpower").base = 1; // Very low perception

      const selector = getTarget(actor, [target1, target2, target3, target4]);
      const result = selector!.randomly();
      
      // Should still select someone
      expect(result).toHaveLength(1);
      expect([target1, target2, target3, target4]).toContain(result[0]);
    });
  });

  describe("Combined Mechanics", () => {
    it("should handle taunt and hiding together", () => {
      // Target with taunt and hiding
      target2.buffsAndDebuffs.entry.set(BuffsAndDebuffsEnum.taunt, {
        value: 1,
        isPerm: false,
        permValue: 0,
      });
      target2.buffsAndDebuffs.entry.set(BuffsAndDebuffsEnum.hiding, {
        value: 1,
        isPerm: false,
        permValue: 0,
      });

      actor.attribute.getStat("willpower").base = 20; // High perception

      const selector = getTarget(actor, [target1, target2, target3, target4]);
      const result = selector!.with("less", "currentHP");
      
      // Taunt should still prioritize, and high perception should see through hiding
      expect(result[0]).toBe(target2);
    });

    it("should handle multiple taunting targets with some hiding", () => {
      target1.buffsAndDebuffs.entry.set(BuffsAndDebuffsEnum.taunt, {
        value: 1,
        isPerm: false,
        permValue: 0,
      });
      target2.buffsAndDebuffs.entry.set(BuffsAndDebuffsEnum.taunt, {
        value: 1,
        isPerm: false,
        permValue: 0,
      });
      target2.buffsAndDebuffs.entry.set(BuffsAndDebuffsEnum.hiding, {
        value: 1,
        isPerm: false,
        permValue: 0,
      });

      const selector = getTarget(actor, [target1, target2, target3, target4]);
      selector!.many(2);
      const result = selector!.with("less", "currentHP");
      
      expect(result).toHaveLength(2);
      // Both taunting targets should be selected (order depends on hiding check and shuffle)
      const selectedTaunts = result.filter(t => [target1, target2].includes(t));
      expect(selectedTaunts.length).toBeGreaterThan(0);
    });
  });

  describe("Exception Handling", () => {
    it("should handle except() to filter out specific targets", () => {
      const selector = getTarget(actor, [target1, target2, target3, target4]);
      selector!.except([target2, target4]);
      const result = selector!.all();
      
      expect(result).toHaveLength(2);
      expect(result).toContain(target1);
      expect(result).toContain(target3);
      expect(result).not.toContain(target2);
      expect(result).not.toContain(target4);
    });

    it("should work with except() and sorting", () => {
      const selector = getTarget(actor, [target1, target2, target3, target4]);
      selector!.except([target1]); // Remove the one with 100 HP
      selector!.many(3);
      const result = selector!.with("most", "currentHP");
      
      expect(result).toHaveLength(3);
      expect(result[0]).toBe(target3); // 75 HP should be highest now
      expect(result).not.toContain(target1);
    });
  });

  describe("Dead Target Filtering", () => {
    it("should filter dead targets", () => {
      target2.vitals.hp.current = 0;
      target4.vitals.hp.current = 0;

      const selector = getTarget(actor, [target1, target2, target3, target4]);
      const result = selector!.dead();
      
      expect(result).toHaveLength(2);
      expect(result).toContain(target2);
      expect(result).toContain(target4);
    });

    it("should return empty array when no dead targets", () => {
      const selector = getTarget(actor, [target1, target2, target3, target4]);
      const result = selector!.dead();
      
      expect(result).toHaveLength(0);
    });
  });

  describe("Edge Cases", () => {
    it("should handle empty target list in with()", () => {
      const selector = getTarget(actor, []);
      selector!.one();
      const result = selector!.with("less", "currentHP");
      
      expect(result).toHaveLength(0);
    });

    it("should handle empty target list in randomly()", () => {
      const selector = getTarget(actor, []);
      const result = selector!.randomly();
      
      // randomly() returns array based on scope, default is "one"
      // When there are no targets, it should return empty array
      expect(result.length).toBeLessThanOrEqual(1);
    });

    it("should handle requesting 0 targets in many()", () => {
      const selector = getTarget(actor, [target1, target2]);
      selector!.many(0);
      const result = selector!.with("less", "currentHP");
      
      expect(result).toHaveLength(0);
    });

    it("should handle all targets with same HP", () => {
      target1.vitals.hp.current = 50;
      target2.vitals.hp.current = 50;
      target3.vitals.hp.current = 50;

      const selector = getTarget(actor, [target1, target2, target3]);
      selector!.many(3);
      const result = selector!.with("less", "currentHP");
      
      expect(result).toHaveLength(3);
      // All should be included since they have the same HP
    });

    it("should handle scope changes", () => {
      const selector = getTarget(actor, [target1, target2, target3, target4]);
      
      // Start with one
      selector!.one();
      let result = selector!.with("less", "currentHP");
      expect(result).toHaveLength(1);
      
      // Can't change scope after using, but testing the default behavior
    });

    it("should maintain target order when not sorting", () => {
      const selector = getTarget(actor, [target1, target2, target3]);
      const result = selector!.all();
      
      expect(result[0]).toBe(target1);
      expect(result[1]).toBe(target2);
      expect(result[2]).toBe(target3);
    });
  });

  describe("Attribute Variations", () => {
    it("should sort by different attribute types", () => {
      const attributes = ["strength", "dexterity", "intelligence", "willpower"] as const;
      
      attributes.forEach(attr => {
        target1.attribute.getStat(attr).base = 5;
        target2.attribute.getStat(attr).base = 15;
        
        const selector = getTarget(actor, [target1, target2]);
        const result = selector!.with("most", attr);
        
        expect(result[0]).toBe(target2);
      });
    });

    it("should sort by different element types", () => {
      const elements = ["fire", "water", "earth", "wind", "order", "chaos"] as const;
      
      elements.forEach(elem => {
        target1.elements.getStat(elem).base = 5;
        target2.elements.getStat(elem).base = 15;
        
        const selector = getTarget(actor, [target1, target2]);
        const result = selector!.with("most", elem);
        
        expect(result[0]).toBe(target2);
      });
    });
  });

  describe("Randomization Testing", () => {
    it("should handle multiple taunting targets in with()", () => {
      // Set multiple taunting targets
      target1.buffsAndDebuffs.entry.set(BuffsAndDebuffsEnum.taunt, {
        value: 1,
        isPerm: false,
        permValue: 0,
      });
      target2.buffsAndDebuffs.entry.set(BuffsAndDebuffsEnum.taunt, {
        value: 1,
        isPerm: false,
        permValue: 0,
      });
      target3.buffsAndDebuffs.entry.set(BuffsAndDebuffsEnum.taunt, {
        value: 1,
        isPerm: false,
        permValue: 0,
      });

      const selector = getTarget(actor, [target1, target2, target3, target4]);
      selector!.one();
      const result = selector!.with("less", "currentHP");
      
      // Should select one of the taunting targets (not target4 which doesn't have taunt)
      expect([target1, target2, target3]).toContain(result[0]);
      expect(result[0]).not.toBe(target4);
    });

    it("should distribute random selections across multiple runs", () => {
      const selections = new Map<string, number>();
      selections.set(target1.id, 0);
      selections.set(target2.id, 0);
      selections.set(target3.id, 0);

      // Run many random selections
      for (let i = 0; i < 30; i++) {
        const selector = getTarget(actor, [target1, target2, target3]);
        const result = selector!.randomly();
        const id = result[0]!.id;
        const count = selections.get(id) || 0;
        selections.set(id, count + 1);
      }

      // Each target should have been selected at least once
      expect(selections.get(target1.id)!).toBeGreaterThan(0);
      expect(selections.get(target2.id)!).toBeGreaterThan(0);
      expect(selections.get(target3.id)!).toBeGreaterThan(0);
    });
  });

  describe("allWith() Method - Filter by Buff/Debuff", () => {
    it("should return all targets with specific buff", () => {
      // Add 'slow' to some targets
      target2.buffsAndDebuffs.entry.set(BuffsAndDebuffsEnum.slow, {
        value: 1,
        isPerm: false,
        permValue: 0,
      });
      target4.buffsAndDebuffs.entry.set(BuffsAndDebuffsEnum.slow, {
        value: 1,
        isPerm: false,
        permValue: 0,
      });

      const selector = getTarget(actor, [target1, target2, target3, target4]);
      const result = selector!.allWith(BuffsAndDebuffsEnum.slow);
      
      expect(result).toHaveLength(2);
      expect(result).toContain(target2);
      expect(result).toContain(target4);
      expect(result).not.toContain(target1);
      expect(result).not.toContain(target3);
    });

    it("should return all targets with taunt buff", () => {
      target1.buffsAndDebuffs.entry.set(BuffsAndDebuffsEnum.taunt, {
        value: 1,
        isPerm: false,
        permValue: 0,
      });
      target3.buffsAndDebuffs.entry.set(BuffsAndDebuffsEnum.taunt, {
        value: 1,
        isPerm: false,
        permValue: 0,
      });

      const selector = getTarget(actor, [target1, target2, target3, target4]);
      const result = selector!.allWith(BuffsAndDebuffsEnum.taunt);
      
      expect(result).toHaveLength(2);
      expect(result).toContain(target1);
      expect(result).toContain(target3);
    });

    it("should return all targets with hiding buff", () => {
      target1.buffsAndDebuffs.entry.set(BuffsAndDebuffsEnum.hiding, {
        value: 1,
        isPerm: false,
        permValue: 0,
      });
      target2.buffsAndDebuffs.entry.set(BuffsAndDebuffsEnum.hiding, {
        value: 1,
        isPerm: false,
        permValue: 0,
      });
      target3.buffsAndDebuffs.entry.set(BuffsAndDebuffsEnum.hiding, {
        value: 1,
        isPerm: false,
        permValue: 0,
      });

      const selector = getTarget(actor, [target1, target2, target3, target4]);
      const result = selector!.allWith(BuffsAndDebuffsEnum.hiding);
      
      expect(result).toHaveLength(3);
      expect(result).toContain(target1);
      expect(result).toContain(target2);
      expect(result).toContain(target3);
      expect(result).not.toContain(target4);
    });

    it("should return empty array when no targets have the buff", () => {
      const selector = getTarget(actor, [target1, target2, target3, target4]);
      const result = selector!.allWith(BuffsAndDebuffsEnum.haste);
      
      expect(result).toHaveLength(0);
    });

    it("should return all targets when all have the buff", () => {
      [target1, target2, target3, target4].forEach(t => {
        t.buffsAndDebuffs.entry.set(BuffsAndDebuffsEnum.slow, {
          value: 1,
          isPerm: false,
          permValue: 0,
        });
      });

      const selector = getTarget(actor, [target1, target2, target3, target4]);
      const result = selector!.allWith(BuffsAndDebuffsEnum.slow);
      
      expect(result).toHaveLength(4);
      expect(result).toContain(target1);
      expect(result).toContain(target2);
      expect(result).toContain(target3);
      expect(result).toContain(target4);
    });

    it("should work with except() to further filter", () => {
      target1.buffsAndDebuffs.entry.set(BuffsAndDebuffsEnum.slow, {
        value: 1,
        isPerm: false,
        permValue: 0,
      });
      target2.buffsAndDebuffs.entry.set(BuffsAndDebuffsEnum.slow, {
        value: 1,
        isPerm: false,
        permValue: 0,
      });
      target3.buffsAndDebuffs.entry.set(BuffsAndDebuffsEnum.slow, {
        value: 1,
        isPerm: false,
        permValue: 0,
      });

      const selector = getTarget(actor, [target1, target2, target3, target4]);
      selector!.except([target1]); // Exclude target1
      const result = selector!.allWith(BuffsAndDebuffsEnum.slow);
      
      expect(result).toHaveLength(2);
      expect(result).toContain(target2);
      expect(result).toContain(target3);
      expect(result).not.toContain(target1);
    });

    it("should handle empty target list", () => {
      const selector = getTarget(actor, []);
      const result = selector!.allWith(BuffsAndDebuffsEnum.slow);
      
      expect(result).toHaveLength(0);
    });

    it("should work with different buff/debuff types", () => {
      // Test with haste
      target1.buffsAndDebuffs.entry.set(BuffsAndDebuffsEnum.haste, {
        value: 2,
        isPerm: false,
        permValue: 0,
      });

      const selector1 = getTarget(actor, [target1, target2, target3, target4]);
      const result1 = selector1!.allWith(BuffsAndDebuffsEnum.haste);
      
      expect(result1).toHaveLength(1);
      expect(result1[0]).toBe(target1);

      // Test with slow
      target2.buffsAndDebuffs.entry.set(BuffsAndDebuffsEnum.slow, {
        value: 1,
        isPerm: false,
        permValue: 0,
      });

      const selector2 = getTarget(actor, [target1, target2, target3, target4]);
      const result2 = selector2!.allWith(BuffsAndDebuffsEnum.slow);
      
      expect(result2).toHaveLength(1);
      expect(result2[0]).toBe(target2);
    });

    it("should return targets even if buff value is 0", () => {
      target1.buffsAndDebuffs.entry.set(BuffsAndDebuffsEnum.slow, {
        value: 0, // Value is 0 but entry exists
        isPerm: false,
        permValue: 0,
      });

      const selector = getTarget(actor, [target1, target2, target3, target4]);
      const result = selector!.allWith(BuffsAndDebuffsEnum.slow);
      
      // Should still include target1 because the entry exists
      expect(result).toHaveLength(1);
      expect(result[0]).toBe(target1);
    });
  });

  describe("Chaining and Scope", () => {
    it("should allow method chaining for configuration", () => {
      const selector = getTarget(actor, [target1, target2, target3, target4]);
      selector!.many(2);
      selector!.byPassTaunt();
      selector!.byPassHiding();
      selector!.except([target4]);
      
      const result = selector!.with("less", "currentHP");
      
      expect(result.length).toBeLessThanOrEqual(2);
      expect(result).not.toContain(target4);
    });

    it("should handle scope one with all configurations", () => {
      target2.buffsAndDebuffs.entry.set(BuffsAndDebuffsEnum.taunt, {
        value: 1,
        isPerm: false,
        permValue: 0,
      });

      const selector = getTarget(actor, [target1, target2, target3, target4]);
      selector!.one();
      const result = selector!.with("less", "currentHP");
      
      expect(result).toHaveLength(1);
      // Should prioritize taunt
      expect(result[0]).toBe(target2);
    });

    it("should handle scope many with all configurations", () => {
      target1.buffsAndDebuffs.entry.set(BuffsAndDebuffsEnum.taunt, {
        value: 1,
        isPerm: false,
        permValue: 0,
      });

      const selector = getTarget(actor, [target1, target2, target3, target4]);
      selector!.many(3);
      selector!.except([target4]);
      const result = selector!.with("less", "currentHP");
      
      expect(result).toHaveLength(3);
      expect(result[0]).toBe(target1); // Taunt priority
      expect(result).not.toContain(target4); // Excepted
    });

    it("should handle scope all returning all targets", () => {
      const selector = getTarget(actor, [target1, target2, target3, target4]);
      const result = selector!.all();
      
      expect(result).toHaveLength(4);
      expect(result).toContain(target1);
      expect(result).toContain(target2);
      expect(result).toContain(target3);
      expect(result).toContain(target4);
    });
  });
});

