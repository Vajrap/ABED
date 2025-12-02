/**
 * Turn Undead Skill Tests
 * 
 * Tests for the Turn Undead skill's exec() function, covering:
 * - No target handling
 * - Non-undead damage: 1d4 + WILmod true damage
 * - Undead save mechanics: DC10 (DC12 at level 5+)
 * - Instant kill (9999 true damage) on failed save
 * - 1d12 + WILmod holy damage on successful save
 * - Return value structure
 * 
 * Note: Equipment requirements and resource consumption are tested separately.
 */

import { expect, describe, it, beforeEach, jest, afterEach } from "@jest/globals";
import { turnUndead } from "../turnUndead";
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

describe("Turn Undead Skill", () => {
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

      const result = turnUndead.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(result.content.en).toContain("tried to use Turn Undead");
      expect(result.content.en).toContain("no target");
      expect(result.actor.actorId).toBe(actor.id);
      expect(result.actor.effect).toContain(ActorEffect.TestSkill);
      expect(result.targets).toHaveLength(0);
    });
  });

  describe("Non-Undead Damage", () => {
    it("should deal 1d4 + WILmod true damage to non-undead targets", () => {
      mockGetTarget(target);
      
      // Mock dice: 1d4 = 3, WILmod = +3, so total = 6
      let rollCallCount = 0;
      jest.spyOn(rollModule, "roll").mockImplementation(() => ({
        d: jest.fn(() => {
          rollCallCount++;
          // First call: damage dice 1d4 = 3
          if (rollCallCount === 1) {
            return { total: 3, rolls: [3] };
          }
          // Subsequent calls: hit/crit rolls
          return { total: 15, rolls: [15] };
        }),
      }) as any);

      const resolveDamageSpy = mockResolveDamage({
        actualDamage: 6,
        damageType: DamageType.radiance,
        isHit: true,
        isCrit: false,
      });

      turnUndead.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      // Expected: 3 + 3 = 6 true damage
      expect(resolveDamageSpy).toHaveBeenCalledWith(
        actor.id,
        target.id,
        expect.objectContaining({
          damage: 6,
          type: DamageType.radiance,
          trueDamage: true,
        }),
        DEFAULT_TEST_LOCATION,
      );
    });
  });

  describe("Undead Save Mechanics", () => {
    it("should use DC10 for undead at level 1-4", () => {
      mockGetTarget(undeadTarget);
      
      jest.spyOn(rollModule, "roll").mockImplementation(() => ({
        d: jest.fn(() => ({
          total: 10,
          rolls: [10],
        })),
      }) as any);

      // Target fails save (roll < 10)
      jest.spyOn(undeadTarget, "rollSave").mockReturnValue(5);

      const resolveDamageSpy = mockResolveDamage({
        actualDamage: 9999,
        damageType: DamageType.radiance,
        isHit: true,
        isCrit: false,
      });

      turnUndead.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      // Should deal instant kill damage
      expect(resolveDamageSpy).toHaveBeenCalledWith(
        actor.id,
        undeadTarget.id,
        expect.objectContaining({
          damage: 9999,
          trueDamage: true,
        }),
        DEFAULT_TEST_LOCATION,
      );
    });

    it("should use DC12 for undead at level 5+", () => {
      mockGetTarget(undeadTarget);
      
      jest.spyOn(rollModule, "roll").mockImplementation(() => ({
        d: jest.fn(() => ({
          total: 10,
          rolls: [10],
        })),
      }) as any);

      // Target fails save (roll < 12)
      jest.spyOn(undeadTarget, "rollSave").mockReturnValue(8);

      const resolveDamageSpy = mockResolveDamage({
        actualDamage: 9999,
        damageType: DamageType.radiance,
        isHit: true,
        isCrit: false,
      });

      turnUndead.exec(
        actor,
        actorParty,
        targetParty,
        5,
        DEFAULT_TEST_LOCATION,
      );

      // Should deal instant kill damage
      expect(resolveDamageSpy).toHaveBeenCalledWith(
        actor.id,
        undeadTarget.id,
        expect.objectContaining({
          damage: 9999,
          trueDamage: true,
        }),
        DEFAULT_TEST_LOCATION,
      );
    });

    it("should instant kill undead on failed save", () => {
      mockGetTarget(undeadTarget);
      
      jest.spyOn(rollModule, "roll").mockImplementation(() => ({
        d: jest.fn(() => ({
          total: 10,
          rolls: [10],
        })),
      }) as any);

      // Target fails save
      jest.spyOn(undeadTarget, "rollSave").mockReturnValue(5);

      const resolveDamageSpy = mockResolveDamage({
        actualDamage: 9999,
        damageType: DamageType.radiance,
        isHit: true,
        isCrit: false,
      });

      const result = turnUndead.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(resolveDamageSpy).toHaveBeenCalledWith(
        actor.id,
        undeadTarget.id,
        expect.objectContaining({
          damage: 9999,
          trueDamage: true,
        }),
        DEFAULT_TEST_LOCATION,
      );

      expect(result.content.en).toContain("turned by holy light");
    });

    it("should deal 1d12 + WILmod holy damage on successful save", () => {
      mockGetTarget(undeadTarget);
      
      let rollCallCount = 0;
      jest.spyOn(rollModule, "roll").mockImplementation(() => ({
        d: jest.fn(() => {
          rollCallCount++;
          // Only one roll for damage: 1d12 = 8
          if (rollCallCount === 1) {
            return { total: 8, rolls: [8] };
          }
          return { total: 15, rolls: [15] };
        }),
      }) as any);

      // Target passes save
      jest.spyOn(undeadTarget, "rollSave").mockReturnValue(15);

      const resolveDamageSpy = mockResolveDamage({
        actualDamage: 11,
        damageType: DamageType.radiance,
        isHit: true,
        isCrit: false,
      });

      const result = turnUndead.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      // Expected: 8 + 3 = 11 holy damage
      expect(resolveDamageSpy).toHaveBeenCalledWith(
        actor.id,
        undeadTarget.id,
        expect.objectContaining({
          damage: 11,
          type: DamageType.radiance,
          isMagic: true,
        }),
        DEFAULT_TEST_LOCATION,
      );

      expect(result.content.en).toContain("resists");
    });
  });

  describe("Return Structure", () => {
    it("should return correct TurnResult structure for non-undead", () => {
      mockGetTarget(target);
      
      jest.spyOn(rollModule, "roll").mockImplementation(() => ({
        d: jest.fn(() => ({
          total: 3,
          rolls: [3],
        })),
      }) as any);

      mockResolveDamage({
        actualDamage: 6,
        damageType: DamageType.radiance,
        isHit: true,
        isCrit: false,
      });

      const result = turnUndead.exec(
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

    it("should return correct TurnResult structure for undead (failed save)", () => {
      mockGetTarget(undeadTarget);
      
      jest.spyOn(rollModule, "roll").mockImplementation(() => ({
        d: jest.fn(() => ({
          total: 10,
          rolls: [10],
        })),
      }) as any);

      jest.spyOn(undeadTarget, "rollSave").mockReturnValue(5);

      mockResolveDamage({
        actualDamage: 9999,
        damageType: DamageType.radiance,
        isHit: true,
        isCrit: false,
      });

      const result = turnUndead.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(result.content.en).toContain("turned by holy light");
      expect(result.targets[0]?.effect).toContain(TargetEffect.OrderOne);
    });
  });
});

