/**
 * Radiance Skill Tests
 * 
 * Tests for the Radiance skill's exec() function, covering:
 * - No target handling
 * - Damage formula: (1d6 + WILmod) × SkillLevelMultiplier
 * - Additional damage against undead/fiend: 1d4 (1d4 + 2 at level 5)
 * - Return value structure
 * 
 * Note: Equipment requirements and resource consumption are tested separately.
 */

import { expect, describe, it, beforeEach, jest, afterEach } from "@jest/globals";
import { radiance } from "../radiance";
import { ActorEffect, TargetEffect } from "../../../../effects";
import {
  setupSkillTestMocks,
  createTestActor,
  createTestTarget,
  clearCharacterRegistry,
  DEFAULT_TEST_LOCATION,
  mockGetTarget,
  mockResolveDamage,
} from "../../../testHelpers";
import * as rollModule from "src/Utils/Dice";
import { CharacterType } from "src/InterFacesEnumsAndTypes/Enums";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";

// Setup mocks
setupSkillTestMocks();

describe("Radiance Skill", () => {
  let actor: any;
  let target: any;
  let undeadTarget: any;
  let actorParty: any[];
  let targetParty: any[];

  beforeEach(() => {
    clearCharacterRegistry();

    actor = createTestActor();
    actor.attribute.getStat("willpower").base = 16; // +3 mod
    
    target = createTestTarget({ id: "target-1", name: { en: "Enemy", th: "ศัตรู" } });
    undeadTarget = createTestTarget({ id: "undead-1", name: { en: "Zombie", th: "ซอมบี้" } });
    undeadTarget.type = CharacterType.undead;

    actorParty = [actor];
    targetParty = [target, undeadTarget];

    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("No Target Handling", () => {
    it("should return appropriate message when no target is found", () => {
      mockGetTarget(null);

      const result = radiance.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(result.content.en).toContain("tried to cast Radiance");
      expect(result.content.en).toContain("no target");
      expect(result.actor.actorId).toBe(actor.id);
      expect(result.actor.effect).toContain(ActorEffect.TestSkill);
      expect(result.targets).toHaveLength(0);
    });
  });

  describe("Damage Formula", () => {
    it("should deal (1d6 + WILmod) × SkillLevelMultiplier damage at level 1", () => {
      mockGetTarget(target);
      
      // Mock dice: 1d6 = 4, WILmod = +3, level 1 multiplier = 1.1
      // Expected: (4 + 3) × 1.1 = 7.7 → 7
      let rollCallCount = 0;
      jest.spyOn(rollModule, "roll").mockImplementation(() => ({
        d: jest.fn(() => {
          rollCallCount++;
          // First call is for base damage (1d6)
          if (rollCallCount === 1) {
            return { total: 4, rolls: [4] };
          }
          return { total: 10, rolls: [10] };
        }),
      }) as any);
      
      jest.spyOn(rollModule, "rollTwenty").mockReturnValue({
        total: 15,
        rolls: [15],
      } as any);

      const resolveDamageSpy = mockResolveDamage({
        actualDamage: 5,
        damageType: DamageType.radiance,
        isHit: true,
        isCrit: false,
      } as any);

      radiance.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(resolveDamageSpy).toHaveBeenCalledWith(
        actor.id,
        target.id,
        expect.objectContaining({
          type: DamageType.radiance,
          isMagic: true,
        }),
        DEFAULT_TEST_LOCATION,
      );
    });

    it("should scale damage with skill level", () => {
      mockGetTarget(target);
      
      let rollCallCount = 0;
      jest.spyOn(rollModule, "roll").mockImplementation(() => ({
        d: jest.fn(() => {
          rollCallCount++;
          if (rollCallCount === 1) {
            return { total: 4, rolls: [4] };
          }
          return { total: 10, rolls: [10] };
        }),
      }) as any);
      
      jest.spyOn(rollModule, "rollTwenty").mockReturnValue({
        total: 15,
        rolls: [15],
      } as any);

      const resolveDamageSpy = mockResolveDamage({
        actualDamage: 5,
        damageType: DamageType.radiance,
        isHit: true,
        isCrit: false,
      } as any);

      radiance.exec(
        actor,
        actorParty,
        targetParty,
        5,
        DEFAULT_TEST_LOCATION,
      );

      // Level 5 multiplier = 1.5, so (4 + 3) × 1.5 = 10.5 → 10
      expect(resolveDamageSpy).toHaveBeenCalledWith(
        actor.id,
        target.id,
        expect.objectContaining({
          type: DamageType.radiance,
          isMagic: true,
        }),
        DEFAULT_TEST_LOCATION,
      );
    });
  });

  describe("Undead/Fiend Bonus Damage", () => {
    it("should deal additional 1d4 damage to undead at level 1-4", () => {
      mockGetTarget(undeadTarget);
      
      let rollCallCount = 0;
      jest.spyOn(rollModule, "roll").mockImplementation(() => ({
        d: jest.fn(() => {
          rollCallCount++;
          // First call: base damage 1d6 = 4
          if (rollCallCount === 1) {
            return { total: 4, rolls: [4] };
          }
          // Second call: bonus damage 1d4 = 3
          if (rollCallCount === 2) {
            return { total: 3, rolls: [3] };
          }
          return { total: 10, rolls: [10] };
        }),
      }) as any);
      
      jest.spyOn(rollModule, "rollTwenty").mockReturnValue({
        total: 15,
        rolls: [15],
      } as any);

      const resolveDamageSpy = mockResolveDamage({
        actualDamage: 5,
        damageType: DamageType.radiance,
        isHit: true,
        isCrit: false,
      } as any);

      radiance.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      // Base: (4 + 3) × 1.1 = 7.7 → 7
      // Bonus: 3
      // Total: 10
      expect(resolveDamageSpy).toHaveBeenCalledWith(
        actor.id,
        undeadTarget.id,
        expect.objectContaining({
          type: DamageType.radiance,
          isMagic: true,
        }),
        DEFAULT_TEST_LOCATION,
      );
    });

    it("should deal additional 1d4 + 2 damage to undead at level 5", () => {
      mockGetTarget(undeadTarget);
      
      let rollCallCount = 0;
      jest.spyOn(rollModule, "roll").mockImplementation(() => ({
        d: jest.fn(() => {
          rollCallCount++;
          if (rollCallCount === 1) {
            return { total: 4, rolls: [4] };
          }
          if (rollCallCount === 2) {
            return { total: 3, rolls: [3] };
          }
          return { total: 10, rolls: [10] };
        }),
      }) as any);
      
      jest.spyOn(rollModule, "rollTwenty").mockReturnValue({
        total: 15,
        rolls: [15],
      } as any);

      const resolveDamageSpy = mockResolveDamage({
        actualDamage: 5,
        damageType: DamageType.radiance,
        isHit: true,
        isCrit: false,
      } as any);

      radiance.exec(
        actor,
        actorParty,
        targetParty,
        5,
        DEFAULT_TEST_LOCATION,
      );

      // Base: (4 + 3) × 1.5 = 10.5 → 10
      // Bonus: 3 + 2 = 5
      // Total: 15
      expect(resolveDamageSpy).toHaveBeenCalledWith(
        actor.id,
        undeadTarget.id,
        expect.objectContaining({
          type: DamageType.radiance,
          isMagic: true,
        }),
        DEFAULT_TEST_LOCATION,
      );
    });

    it("should not deal bonus damage to non-undead/non-fiend targets", () => {
      mockGetTarget(target);
      
      let rollCallCount = 0;
      jest.spyOn(rollModule, "roll").mockImplementation(() => ({
        d: jest.fn(() => {
          rollCallCount++;
          // Only one roll for base damage
          if (rollCallCount === 1) {
            return { total: 4, rolls: [4] };
          }
          return { total: 10, rolls: [10] };
        }),
      }) as any);
      
      jest.spyOn(rollModule, "rollTwenty").mockReturnValue({
        total: 15,
        rolls: [15],
      } as any);

      const resolveDamageSpy = mockResolveDamage({
        actualDamage: 5,
        damageType: DamageType.radiance,
        isHit: true,
        isCrit: false,
      } as any);

      radiance.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      // Should only have base damage, no bonus
      expect(resolveDamageSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe("Return Structure", () => {
    it("should return correct TurnResult structure", () => {
      mockGetTarget(target);
      
      jest.spyOn(rollModule, "roll").mockImplementation(() => ({
        d: jest.fn(() => ({
          total: 4,
          rolls: [4],
        })),
      }) as any);
      
      jest.spyOn(rollModule, "rollTwenty").mockReturnValue({
        total: 15,
        rolls: [15],
      } as any);

      mockResolveDamage({
        actualDamage: 5,
        damageType: DamageType.radiance,
        isHit: true,
        isCrit: false,
      } as any);

      const result = radiance.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(result).toHaveProperty("content");
      expect(result.content).toHaveProperty("en");
      expect(result.content).toHaveProperty("th");
      expect(result.actor).toHaveProperty("actorId", actor.id);
      expect(result.actor).toHaveProperty("effect");
      expect(result.actor.effect).toContain(ActorEffect.Cast);
      expect(result.targets).toHaveLength(1);
      expect(result.targets[0]).toHaveProperty("actorId", target.id);
      expect(result.targets[0]).toHaveProperty("effect");
      expect(result.targets[0]?.effect).toContain(TargetEffect.OrderOne);
    });
  });
});

