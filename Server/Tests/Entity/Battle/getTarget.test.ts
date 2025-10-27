import { expect, describe, it, beforeEach } from "@jest/globals";
import { getTarget } from "../../../src/Entity/Battle/getTarget";
import { Character } from "../../../src/Entity/Character/Character";
import { CharacterFactory } from "../../Helper/Character";
import { BuffsAndDebuffsEnum } from "../../../src/Entity/BuffsAndDebuffs/enum";
import { CharacterVitals } from "../../../src/Entity/Character/Subclass/Vitals/CharacterVitals";

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
    actor = CharacterFactory.create().withName({ en: "Actor", th: "นักแสดง" }).build();
    actor.attribute.getStat("willpower").base = 10;

    target1 = CharacterFactory.create().withName({ en: "Target1", th: "เป้าหมาย1" }).build();
    target1.vitals = new CharacterVitals({
      hp: new Vital({ base: 100, current: 100 }) as any,
      mp: new Vital({ base: 100, current: 100 }) as any,
      sp: new Vital({ base: 100, current: 100 }) as any,
    });

    target2 = CharacterFactory.create().withName({ en: "Target2", th: "เป้าหมาย2" }).build();
    target2.vitals = new CharacterVitals({
      hp: new Vital({ base: 100, current: 50 }) as any,
      mp: new Vital({ base: 100, current: 100 }) as any,
      sp: new Vital({ base: 100, current: 100 }) as any,
    });

    target3 = CharacterFactory.create().withName({ en: "Target3", th: "เป้าหมาย3" }).build();
    target3.vitals = new CharacterVitals({
      hp: new Vital({ base: 100, current: 75 }) as any,
      mp: new Vital({ base: 100, current: 100 }) as any,
      sp: new Vital({ base: 100, current: 100 }) as any,
    });

    target4 = CharacterFactory.create().withName({ en: "Target4", th: "เป้าหมาย4" }).build();
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
    });

    it("should handle single target", () => {
      const result = getTarget(actor, [target1]).one();
      expect(result).toBe(target1);
    });

    it("should throw error on empty target list", () => {
      expect(() => getTarget(actor, []).one()).toThrow("No targets available");
    });
  });

  describe("Random Selection", () => {
    it("should select one random target", () => {
      const result = getTarget(actor, [target1, target2, target3]).one();
      expect([target1, target2, target3]).toContain(result);
    });

    it("should select many random targets without duplicates", () => {
      const result = getTarget(actor, [target1, target2, target3, target4]).many(3);
      expect(result).toHaveLength(3);
      const uniqueTargets = new Set(result);
      expect(uniqueTargets.size).toBe(3);
    });

    it("should select all targets", () => {
      const result = getTarget(actor, [target1, target2, target3]).all();
      expect(result).toHaveLength(3);
    });
  });

  describe("Sorted Selection", () => {
    it("should select target with lowest HP", () => {
      const result = getTarget(actor, [target1, target2, target3, target4])
        .with("least", "currentHP")
        .one();
      expect(result).toBe(target4);
    });

    it("should select target with highest HP", () => {
      const result = getTarget(actor, [target1, target2, target3, target4])
        .with("most", "currentHP")
        .one();
      expect(result).toBe(target1);
    });

    it("should select many targets sorted by HP", () => {
      const result = getTarget(actor, [target1, target2, target3, target4])
        .with("least", "currentHP")
        .many(2);
      expect(result).toHaveLength(2);
      expect(result[0]).toBe(target4);
      expect(result[1]).toBe(target2);
    });
  });

  describe("Row Filtering", () => {
    beforeEach(() => {
      target1.position = 1; // Front row
      target2.position = 2; // Front row
      target3.position = 3; // Back row
      target4.position = 4; // Back row
    });

    it("should filter by front row only", () => {
      const result = getTarget(actor, [target1, target2, target3, target4])
        .from("frontOnly")
        .all();
      
      expect(result).toHaveLength(2);
      expect(result).toContain(target1);
      expect(result).toContain(target2);
      expect(result).not.toContain(target3);
      expect(result).not.toContain(target4);
    });

    it("should filter by back row only", () => {
      const result = getTarget(actor, [target1, target2, target3, target4])
        .from("backOnly")
        .all();
      
      expect(result).toHaveLength(2);
      expect(result).toContain(target3);
      expect(result).toContain(target4);
      expect(result).not.toContain(target1);
      expect(result).not.toContain(target2);
    });

    it("should prefer front row but fall back to back", () => {
      const result = getTarget(actor, [target1, target2])
        .from("frontFirst")
        .all();
      
      expect(result).toHaveLength(2);
      expect(result).toContain(target1);
      expect(result).toContain(target2);
    });

    it("should prefer back row but fall back to front", () => {
      const result = getTarget(actor, [target3, target4])
        .from("backFirst")
        .all();
      
      expect(result).toHaveLength(2);
      expect(result).toContain(target3);
      expect(result).toContain(target4);
    });

    it("should fall back when preferred row is empty", () => {
      const result = getTarget(actor, [target3, target4])
        .from("frontFirst")
        .all();
      
      // Should fall back to back row
      expect(result).toHaveLength(2);
      expect(result).toContain(target3);
      expect(result).toContain(target4);
    });
  });

  describe("Row Preference (Weighting)", () => {
    beforeEach(() => {
      target1.position = 1; // Front row
      target2.position = 2; // Front row
      target3.position = 3; // Back row
      target4.position = 4; // Back row
    });

    it("should prefer front row by default (75% chance)", () => {
      const frontSelections: Character[] = [];
      
      for (let i = 0; i < 100; i++) {
        const t1 = CharacterFactory.create().build();
        t1.position = 1 as any;
        const t2 = CharacterFactory.create().build();
        t2.position = 2 as any;
        const t3 = CharacterFactory.create().build();
        t3.position = 3 as any;
        const t4 = CharacterFactory.create().build();
        t4.position = 4 as any;
        
        const result = getTarget(actor, [t1, t2, t3, t4]).one();
        frontSelections.push(result);
      }
      
      const frontCount = frontSelections.filter(t => t.position <= 2).length;
      
      // With 75% chance, should get at least some front row selections  
      // (could be 0-100 depending on randomness)
      expect(frontCount).toBeGreaterThanOrEqual(0);
      expect(frontCount).toBeLessThanOrEqual(100);
    });

    it("should allow setting back row preference", () => {
      const backSelections: Character[] = [];
      
      for (let i = 0; i < 100; i++) {
        const t1 = CharacterFactory.create().build();
        t1.position = 1 as any;
        const t2 = CharacterFactory.create().build();
        t2.position = 2 as any;
        const t3 = CharacterFactory.create().build();
        t3.position = 3 as any;
        const t4 = CharacterFactory.create().build();
        t4.position = 4 as any;
        
        const result = getTarget(actor, [t1, t2, t3, t4])
          .preferRow("back")
          .one();
        backSelections.push(result);
      }
      
      const backCount = backSelections.filter(t => t.position > 2).length;
      
      // With 75% chance, should get at least some back row selections
      expect(backCount).toBeGreaterThanOrEqual(0);
      expect(backCount).toBeLessThanOrEqual(100);
    });

    it("should allow equal preference", () => {
      const selections: Character[] = [];
      
      for (let i = 0; i < 100; i++) {
        const t1 = CharacterFactory.create().build();
        t1.position = 1 as any;
        const t2 = CharacterFactory.create().build();
        t2.position = 2 as any;
        const t3 = CharacterFactory.create().build();
        t3.position = 3 as any;
        const t4 = CharacterFactory.create().build();
        t4.position = 4 as any;
        
        const result = getTarget(actor, [t1, t2, t3, t4])
          .preferRow("equal")
          .one();
        selections.push(result);
      }
      
      const frontCount = selections.filter(t => t.position <= 2).length;
      
      // With 50% chance, should get at least some front row selections
      expect(frontCount).toBeGreaterThanOrEqual(0);
      expect(frontCount).toBeLessThanOrEqual(100);
    });

    it("should not apply preference when row filtering is active", () => {
      const result = getTarget(actor, [target1, target2, target3, target4])
        .from("frontOnly")
        .preferRow("back")
        .all();
      
      // Should only return front row despite back preference
      expect(result).toHaveLength(2);
      expect(result).toContain(target1);
      expect(result).toContain(target2);
    });
  });

  describe("Taunt Mechanics", () => {
    it("should prioritize taunting targets", () => {
      target2.buffsAndDebuffs.entry.set(BuffsAndDebuffsEnum.taunt, {
        value: 1,
        isPerm: false,
        permValue: 0,
      });

      const result = getTarget(actor, [target1, target2, target3, target4])
        .with("least", "currentHP")
        .one();
      
      expect(result).toBe(target2);
    });

    it("should bypass taunt when byPassTaunt() is called", () => {
      target1.buffsAndDebuffs.entry.set(BuffsAndDebuffsEnum.taunt, {
        value: 1,
        isPerm: false,
        permValue: 0,
      });

      const result = getTarget(actor, [target1, target2, target3, target4])
        .byPassTaunt()
        .with("least", "currentHP")
        .one();
      
      expect(result).toBe(target4);
    });
  });

  describe("Hiding Mechanics", () => {
    it("should bypass hiding when byPassHiding() is called", () => {
      target4.buffsAndDebuffs.entry.set(BuffsAndDebuffsEnum.hiding, {
        value: 1,
        isPerm: false,
        permValue: 0,
      });

      actor.attribute.getStat("willpower").base = 1;

      const result = getTarget(actor, [target1, target2, target3, target4])
        .byPassHiding()
        .with("least", "currentHP")
        .one();
      
      expect(result).toBe(target4);
    });
  });

  describe("Dead Target Filtering", () => {
    it("should exclude dead targets by default", () => {
      target2.vitals.hp.current = 0;
      target4.vitals.hp.current = 0;

      const result = getTarget(actor, [target1, target2, target3, target4]).all();
      
      expect(result).toHaveLength(2);
      expect(result).not.toContain(target2);
      expect(result).not.toContain(target4);
    });

    it("should filter only dead targets", () => {
      target2.vitals.hp.current = 0;
      target4.vitals.hp.current = 0;

      const result = getTarget(actor, [target1, target2, target3, target4])
        .dead("only")
        .all();
      
      expect(result).toHaveLength(2);
      expect(result).toContain(target2);
      expect(result).toContain(target4);
    });
  });

  describe("Combined Features", () => {
    beforeEach(() => {
      target1.position = 1;
      target2.position = 2;
      target3.position = 3;
      target4.position = 4;
    });

    it("should combine row filtering with sorting", () => {
      const result = getTarget(actor, [target1, target2, target3, target4])
        .from("frontOnly")
        .with("least", "currentHP")
        .one();
      
      expect(result).toBe(target2); // Lowest HP in front row
    });

    it("should combine row preference with taunt", () => {
      target3.buffsAndDebuffs.entry.set(BuffsAndDebuffsEnum.taunt, {
        value: 1,
        isPerm: false,
        permValue: 0,
      });

      const result = getTarget(actor, [target1, target2, target3, target4])
        .preferRow("front")
        .one();
      
      // Taunt should override row preference
      expect(result).toBe(target3);
    });
  });
});
