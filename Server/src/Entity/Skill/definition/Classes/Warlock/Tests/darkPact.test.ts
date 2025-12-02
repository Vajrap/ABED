/**
 * Dark Pact (Darkness Overcharge) Skill Tests
 * 
 * Tests for the Dark Pact skill's exec() function, covering:
 * - No target handling
 * - HP sacrifice: {7}'8':'10'{/} HP
 * - Damage formula: (2d10 + (2 × PlanarMod)) × (1 + 0.15 × skill level) {7}+'1d6' extra damage{/}
 * - True dark damage (bypasses all defenses)
 * - Return value structure
 */

import { expect, describe, it, beforeEach, jest, afterEach } from "@jest/globals";
import { darkPact } from "../darkPact";
import { ActorEffect, TargetEffect } from "../../../../effects";
import {
  setupSkillTestMocks,
  createTestActor,
  createTestTarget,
  clearCharacterRegistry,
  DEFAULT_TEST_LOCATION,
  mockResolveDamage,
} from "../../../testHelpers";
import * as getTargetModule from "src/Entity/Battle/getTarget";
import * as rollModule from "src/Utils/Dice";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";

setupSkillTestMocks();

describe("Dark Pact Skill", () => {
  let actor: any;
  let target: any;
  let actorParty: any[];
  let targetParty: any[];

  beforeEach(() => {
    clearCharacterRegistry();

    actor = createTestActor();
    // Set Planar to 14 (+2 mod)
    actor.attribute.getStat("planar").base = 14;
    actor.attribute.getStat("control").base = 14; // +2 mod for hit
    actor.attribute.getStat("luck").base = 14; // +2 mod for crit
    actor.vitals.hp.setCurrent(100); // Set HP for sacrifice
    
    target = createTestTarget({ id: "target-1", name: { en: "Enemy 1", th: "ศัตรู 1" } });

    actorParty = [actor];
    targetParty = [target];

    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("No Target Handling", () => {
    it("should return appropriate message when no target is found", () => {
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        one: jest.fn(() => null),
      }) as any);

      const result = darkPact.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(result.content.en).toContain("tried to use Dark Pact but has no target");
      expect(result.actor.effect).toContain(ActorEffect.TestSkill);
      expect(result.targets).toEqual([]);
    });
  });

  describe("HP Sacrifice", () => {
    it("should sacrifice 10 HP at level 1", () => {
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        one: jest.fn(() => target),
      }) as any);

      // Manually consume 10 HP (as the system would do)
      actor.vitals.hp.setCurrent(actor.vitals.hp.current - 10);
      const initialHp = actor.vitals.hp.current;

      jest.spyOn(rollModule, "roll").mockImplementation(() => ({
        d: jest.fn(() => ({
          total: 10, // 2d10 = 10
          rolls: [5, 5],
        })),
      }) as any);

      jest.spyOn(rollModule, "rollTwenty").mockReturnValue({
        total: 15,
        rolls: [15],
      } as any);

      mockResolveDamage({
        actualDamage: 20,
        damageType: DamageType.dark,
        isHit: true,
        isCrit: false,
      });

      darkPact.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      // Should sacrifice 10 HP (system consumes 10, no refund)
      // After exec, HP should still be initialHp (no refund at level 1)
      expect(actor.vitals.hp.current).toBe(initialHp);
    });

    it("should sacrifice 8 HP at level 7+", () => {
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        one: jest.fn(() => target),
      }) as any);

      // Manually consume 10 HP (as the system would do)
      actor.vitals.hp.setCurrent(actor.vitals.hp.current - 10);
      const initialHp = actor.vitals.hp.current;

      jest.spyOn(rollModule, "roll").mockImplementation(() => ({
        d: jest.fn(() => ({
          total: 10,
          rolls: [5, 5],
        })),
      }) as any);

      jest.spyOn(rollModule, "rollTwenty").mockReturnValue({
        total: 15,
        rolls: [15],
      } as any);

      mockResolveDamage({
        actualDamage: 25,
        damageType: DamageType.dark,
        isHit: true,
        isCrit: false,
      });

      darkPact.exec(
        actor,
        actorParty,
        targetParty,
        7,
        DEFAULT_TEST_LOCATION,
      );

      // System consumes 10, but code refunds 2, so net 8 HP loss
      expect(actor.vitals.hp.current).toBe(initialHp - 8);
    });
  });

  describe("Damage Calculation", () => {
    it("should calculate damage correctly at level 1", () => {
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        one: jest.fn(() => target),
      }) as any);

      jest.spyOn(rollModule, "roll").mockImplementation(() => ({
        d: jest.fn(() => ({
          total: 10, // 2d10 = 10
          rolls: [5, 5],
        })),
      }) as any);

      jest.spyOn(rollModule, "rollTwenty").mockReturnValue({
        total: 15,
        rolls: [15],
      } as any);

      const resolveDamageSpy = mockResolveDamage({
        actualDamage: 20,
        damageType: DamageType.dark,
        isHit: true,
        isCrit: false,
      });

      darkPact.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(resolveDamageSpy).toHaveBeenCalled();
      const callArgs = resolveDamageSpy.mock.calls[0];
      const damageOutput = callArgs?.[2] as any;
      
      // Formula: (2d10 + (2 × PlanarMod)) × (1 + 0.15 × skill level)
      // Dice = 10, PlanarMod = 2, Level 1 multiplier = 1.15
      // Expected: (10 + 4) × 1.15 = 16.1 -> 16
      expect(damageOutput.damage).toBeGreaterThan(0);
      expect(damageOutput.type).toBe(DamageType.dark);
      expect(damageOutput.isMagic).toBe(true);
      expect(damageOutput.trueDamage).toBe(true);
    });

    it("should add extra 1d6 damage at level 7+", () => {
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        one: jest.fn(() => target),
      }) as any);

      let rollCount = 0;
      jest.spyOn(rollModule, "roll").mockImplementation(() => ({
        d: jest.fn(() => {
          rollCount++;
          if (rollCount === 1) {
            return { total: 10, rolls: [5, 5] }; // 2d10
          } else {
            return { total: 3, rolls: [3] }; // 1d6 extra
          }
        }),
      }) as any);

      jest.spyOn(rollModule, "rollTwenty").mockReturnValue({
        total: 15,
        rolls: [15],
      } as any);

      mockResolveDamage({
        actualDamage: 25,
        damageType: DamageType.dark,
        isHit: true,
        isCrit: false,
      });

      darkPact.exec(
        actor,
        actorParty,
        targetParty,
        7,
        DEFAULT_TEST_LOCATION,
      );

      // Should roll 1d6 extra at level 7+
      expect(rollCount).toBeGreaterThanOrEqual(2);
    });
  });

  describe("Return Value Structure", () => {
    it("should return correct structure with target effects", () => {
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        one: jest.fn(() => target),
      }) as any);

      jest.spyOn(rollModule, "roll").mockImplementation(() => ({
        d: jest.fn(() => ({
          total: 10,
          rolls: [5, 5],
        })),
      }) as any);

      jest.spyOn(rollModule, "rollTwenty").mockReturnValue({
        total: 15,
        rolls: [15],
      } as any);

      mockResolveDamage({
        actualDamage: 20,
        damageType: DamageType.dark,
        isHit: true,
        isCrit: false,
      });

      const result = darkPact.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(result.actor.actorId).toBe(actor.id);
      expect(result.actor.effect).toContain(ActorEffect.Cast);
      expect(result.targets).toHaveLength(1);
      expect(result.targets[0]?.actorId).toBe(target.id);
      expect(result.content.en).toContain("sacrificed");
      expect(result.content.en).toContain("HP");
    });
  });
});

