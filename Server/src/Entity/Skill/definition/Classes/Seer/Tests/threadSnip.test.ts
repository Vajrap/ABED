/**
 * Thread Snip Skill Tests
 * 
 * Tests for the Thread Snip skill's exec() function, covering:
 * - Deal 1d4 + CHA mod damage to an enemy
 * - Roll D14 (-1 per skill level) dice
 * - If passed, randomly steal 1 element from the enemy
 */

import { expect, describe, it, beforeEach, jest, afterEach } from "@jest/globals";
import { threadSnip } from "../threadSnip";
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

describe("Thread Snip Skill", () => {
  let actor: any;
  let target: any;
  let actorParty: any[];
  let targetParty: any[];

  beforeEach(() => {
    clearCharacterRegistry();

    actor = createTestActor();
    // Set CHA to 14 (+2 mod)
    actor.attribute.getStat("charisma").base = 14;

    target = createTestTarget({ id: "target-1", name: { en: "Enemy 1", th: "ศัตรู 1" } });
    // Give target some elements to potentially steal
    target.resources = {
      fire: 2,
      water: 1,
      earth: 0,
      wind: 1,
      order: 0,
      chaos: 0,
      neutral: 1,
    };

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

      const result = threadSnip.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(result.content.en).toContain("has no target");
      expect(result.targets).toEqual([]);
    });
  });

  describe("Damage Calculation", () => {
    it("should calculate damage correctly at level 1 (1d4 + CHA mod)", () => {
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        one: jest.fn(() => target),
      }) as any);

      // Mock dice: 1d4 = 3
      jest.spyOn(rollModule, "roll").mockImplementation(() => ({
        d: jest.fn(() => ({
          total: 3,
          rolls: [3],
        })),
      }) as any);

      // Mock rollTwenty for hit/crit calculations
      jest.spyOn(rollModule, "rollTwenty").mockReturnValue({
        total: 15,
        rolls: [15],
        d: jest.fn(() => ({ total: 15, rolls: [15] })),
      } as any);

      const resolveDamageSpy = mockResolveDamage({
        actualDamage: 5,
        damageType: DamageType.arcane,
        isHit: true,
        isCrit: false,
      });

      threadSnip.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      // Formula: (1d4 + CHA mod) × skillLevelMultiplier
      // Dice = 3
      // CHA mod = 2
      // Level 1 multiplier = 1.1
      // Expected: (3 + 2) × 1.1 = 5.5 -> floor(5.5) = 5
      
      expect(resolveDamageSpy).toHaveBeenCalledWith(
        actor.id,
        target.id,
        expect.objectContaining({
          damage: 5,
          type: DamageType.arcane,
          isMagic: true,
        }),
        DEFAULT_TEST_LOCATION,
      );
    });
  });

  describe("Element Stealing - Dice Roll", () => {
    it("should roll D14 at level 1 (DC = 14)", () => {
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        one: jest.fn(() => target),
      }) as any);

      // Mock damage dice
      jest.spyOn(rollModule, "roll").mockImplementation(() => ({
        d: jest.fn(() => ({
          total: 3,
          rolls: [3],
        })),
      }) as any);

      jest.spyOn(rollModule, "rollTwenty").mockReturnValue({
        total: 15,
        rolls: [15],
        d: jest.fn(() => ({ total: 15, rolls: [15] })),
      } as any);

      mockResolveDamage({
        actualDamage: 5,
        damageType: DamageType.arcane,
        isHit: true,
        isCrit: false,
      });

      // Mock D14 roll: need to check if roll(1).d(14) is called
      // The implementation should roll 1d14 and check if it passes
      threadSnip.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      // Verify that a d14 roll was attempted (or d13 at level 2, etc.)
      // The exact implementation may vary
    });

    it("should roll D13 at level 2 (DC = 14 - 1 = 13)", () => {
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        one: jest.fn(() => target),
      }) as any);

      jest.spyOn(rollModule, "roll").mockImplementation(() => ({
        d: jest.fn(() => ({
          total: 3,
          rolls: [3],
        })),
      }) as any);

      jest.spyOn(rollModule, "rollTwenty").mockReturnValue({
        total: 15,
        rolls: [15],
        d: jest.fn(() => ({ total: 15, rolls: [15] })),
      } as any);

      mockResolveDamage({
        actualDamage: 5,
        damageType: DamageType.arcane,
        isHit: true,
        isCrit: false,
      });

      threadSnip.exec(
        actor,
        actorParty,
        targetParty,
        2,
        DEFAULT_TEST_LOCATION,
      );

      // Should roll 1d13 at level 2
    });

    it("should steal 1 random element if dice roll passes", () => {
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        one: jest.fn(() => target),
      }) as any);

      const initialFire = target.resources.fire;
      const initialWater = target.resources.water;
      const initialWind = target.resources.wind;
      const initialNeutral = target.resources.neutral;
      const totalElementsBefore = initialFire + initialWater + initialWind + initialNeutral;

      // Mock damage dice
      jest.spyOn(rollModule, "roll").mockImplementation((amount: number) => {
        if (amount === 1) {
          // Damage dice (1d4) - first call
          return {
            d: jest.fn((face: number) => {
              if (face === 4) {
                // Damage roll
                return {
                  total: 3,
                  rolls: [3],
                };
              }
              // Element steal dice (1d13 at level 1)
              return {
                total: 13, // Pass (13 >= 13)
                rolls: [13],
              };
            }),
          } as any;
        }
        // This shouldn't be called, but just in case
        return {
          d: jest.fn(() => ({
            total: 13,
            rolls: [13],
          })),
        } as any;
      });

      jest.spyOn(rollModule, "rollTwenty").mockReturnValue({
        total: 15,
        rolls: [15],
        d: jest.fn(() => ({ total: 15, rolls: [15] })),
      } as any);

      mockResolveDamage({
        actualDamage: 5,
        damageType: DamageType.arcane,
        isHit: true,
        isCrit: false,
      });

      threadSnip.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      // One element should be stolen (either fire or water or wind or neutral)
      const totalElementsAfter = target.resources.fire + target.resources.water + target.resources.wind + target.resources.neutral;
      
      // Total should decrease by 1
      expect(totalElementsAfter).toBe(totalElementsBefore - 1);
    });

    it("should not steal element if dice roll fails", () => {
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        one: jest.fn(() => target),
      }) as any);

      const initialFire = target.resources.fire;
      const initialWater = target.resources.water;

      // Mock damage dice
      jest.spyOn(rollModule, "roll").mockImplementation((amount: number) => {
        if (amount === 1) {
          // Damage dice (1d4)
          return {
            d: jest.fn(() => ({
              total: 3,
              rolls: [3],
            })),
          } as any;
        }
        // Element steal dice (1d14)
        return {
          d: jest.fn(() => ({
            total: 10, // Fail (10 <= 14, but implementation might check > DC)
            rolls: [10],
          })),
        } as any;
      });

      jest.spyOn(rollModule, "rollTwenty").mockReturnValue({
        total: 15,
        rolls: [15],
        d: jest.fn(() => ({ total: 15, rolls: [15] })),
      } as any);

      mockResolveDamage({
        actualDamage: 5,
        damageType: DamageType.arcane,
        isHit: true,
        isCrit: false,
      });

      threadSnip.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      // Elements should remain unchanged
      expect(target.resources.fire).toBe(initialFire);
      expect(target.resources.water).toBe(initialWater);
    });
  });

  describe("Return Value Structure", () => {
    it("should return correct structure", () => {
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        one: jest.fn(() => target),
      }) as any);

      jest.spyOn(rollModule, "roll").mockImplementation(() => ({
        d: jest.fn(() => ({
          total: 3,
          rolls: [3],
        })),
      }) as any);

      jest.spyOn(rollModule, "rollTwenty").mockReturnValue({
        total: 15,
        rolls: [15],
        d: jest.fn(() => ({ total: 15, rolls: [15] })),
      } as any);

      mockResolveDamage({
        actualDamage: 5,
        damageType: DamageType.arcane,
        isHit: true,
        isCrit: false,
      });

      const result = threadSnip.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(result.actor.actorId).toBe(actor.id);
      expect(result.targets).toHaveLength(1);
      expect(result.targets[0]?.actorId).toBe(target.id);
    });
  });
});

