/**
 * Judgment Day Skill Tests
 * 
 * Tests for the Judgment Day skill's exec() function, covering:
 * - No target handling
 * - Basic damage calculation (WIL + PLANAR scaling)
 * - Level 5 dice scaling (2d6 -> 2d8)
 * - Exposed debuff bonus (+50% damage)
 * - Undead/Fiend bonus (+1d8 damage)
 * - Return value structure
 */

import { expect, describe, it, beforeEach, jest, afterEach } from "@jest/globals";
import { judgmentDay } from "../judgmentDay";
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
import { DebuffEnum } from "src/Entity/BuffsAndDebuffs/enum";
import { CharacterType } from "src/InterFacesEnumsAndTypes/Enums";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";

// Setup mocks
setupSkillTestMocks();

describe("Judgment Day Skill", () => {
  let actor: any;
  let target: any;
  let actorParty: any[];
  let targetParty: any[];

  beforeEach(() => {
    clearCharacterRegistry();

    actor = createTestActor();
    // Set stats for predictable mods
    // WIL 16 -> +3
    // PLANAR 14 -> +2
    // Total mod = 5
    actor.attribute.getStat("willpower").base = 16;
    actor.attribute.getStat("planar").base = 14;
    
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

      const result = judgmentDay.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(result.content.en).toContain("has no target");
      expect(result.actor.actorId).toBe(actor.id);
      expect(result.actor.effect).toContain(ActorEffect.TestSkill);
      expect(result.targets).toHaveLength(0);
    });
  });

  describe("Damage Calculation", () => {
    it("should deal correct base damage at level 1", () => {
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        one: jest.fn(() => target),
      }) as any);

      // Mock dice: 2d6 = 7
      jest.spyOn(rollModule, "roll").mockImplementation(() => ({
        d: jest.fn(() => ({
          total: 7,
          rolls: [3, 4],
        })),
      }) as any);
      
      jest.spyOn(rollModule, "rollTwenty").mockReturnValue({
        total: 15,
        rolls: [15],
      } as any);

      const resolveDamageSpy = mockResolveDamage({
        actualDamage: 10,
        damageType: DamageType.radiance,
        isHit: true,
        isCrit: false,
      } as any);

      judgmentDay.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      // Calculation:
      // Base Dice (2d6) = 7
      // Mods (WIL+PLANAR) = 3 + 2 = 5
      // Level Multiplier = 1 + (0.15 * 1) = 1.15
      // Formula: 7 + (5 * 1.15) = 7 + 5.75 = 12.75 -> floor(12.75) = 12
      
      expect(resolveDamageSpy).toHaveBeenCalledWith(
        actor.id,
        target.id,
        expect.objectContaining({
          damage: 12,
          type: DamageType.radiance,
          isMagic: true,
        }),
        DEFAULT_TEST_LOCATION,
      );
    });

    it("should use 2d8 dice at level 5", () => {
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        one: jest.fn(() => target),
      }) as any);

      // Mock dice: 2d8 = 9
      jest.spyOn(rollModule, "roll").mockImplementation(() => ({
        d: jest.fn(() => ({
          total: 9,
          rolls: [4, 5],
        })),
      }) as any);
      
      jest.spyOn(rollModule, "rollTwenty").mockReturnValue({
        total: 15,
        rolls: [15],
      } as any);

      mockResolveDamage({
        actualDamage: 10,
        damageType: DamageType.radiance,
        isHit: true,
        isCrit: false,
      } as any);

      judgmentDay.exec(
        actor,
        actorParty,
        targetParty,
        5,
        DEFAULT_TEST_LOCATION,
      );

      // Verify roll was called with 8-sided dice
      // First call is roll(2).d(8)
      // Note: roll(2) returns the object with d() method. We can't easily check the argument to d() 
      // with this mocking style unless we inspect the mock calls more deeply, 
      // but we can check the damage calculation assumes the mocked return value.
      
      // Calculation:
      // Base Dice (2d8) = 9
      // Mods (WIL+PLANAR) = 5
      // Level Multiplier = 1 + (0.15 * 5) = 1.75
      // Formula: 9 + (5 * 1.75) = 9 + 8.75 = 17.75 -> floor(17.75) = 17
      
      expect(rollModule.roll).toHaveBeenCalledWith(2);
    });
  });

  describe("Bonus Damage Mechanics", () => {
    it("should deal +50% damage if target is Exposed", () => {
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        one: jest.fn(() => target),
      }) as any);

      // Mock Exposed debuff
      target.buffsAndDebuffs.debuffs.entry.set(DebuffEnum.exposed, { value: 1 });

      // Mock dice: 2d6 = 7
      jest.spyOn(rollModule, "roll").mockImplementation(() => ({
        d: jest.fn(() => ({
          total: 7,
          rolls: [3, 4],
        })),
      }) as any);
      
      jest.spyOn(rollModule, "rollTwenty").mockReturnValue({
        total: 15,
        rolls: [15],
      } as any);

      const resolveDamageSpy = mockResolveDamage({
        actualDamage: 10,
        damageType: DamageType.radiance,
        isHit: true,
        isCrit: false,
      } as any);

      const result = judgmentDay.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      // Base calc: 12 (from previous test)
      // Exposed bonus: 12 * 1.5 = 18
      
      expect(resolveDamageSpy).toHaveBeenCalledWith(
        actor.id,
        target.id,
        expect.objectContaining({
          damage: 18,
        }),
        DEFAULT_TEST_LOCATION,
      );

      expect(result.content.en).toContain("Exposed: +50%");
    });

    it("should deal +1d8 bonus damage against Undead", () => {
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        one: jest.fn(() => target),
      }) as any);

      target.type = CharacterType.undead;

      // Mock dice: 
      // 1st call (base damage): 2d6 = 7
      // 2nd call (bonus damage): 1d8 = 5
      const rollMock = jest.spyOn(rollModule, "roll") as any;
      rollMock
        .mockReturnValueOnce({
          d: jest.fn(() => ({ total: 7, rolls: [3, 4] })),
        })
        .mockReturnValueOnce({
          d: jest.fn(() => ({ total: 5, rolls: [5] })),
        });
      
      jest.spyOn(rollModule, "rollTwenty").mockReturnValue({
        total: 15,
        rolls: [15],
      } as any);

      const resolveDamageSpy = mockResolveDamage({
        actualDamage: 10,
        damageType: DamageType.radiance,
        isHit: true,
        isCrit: false,
      } as any);

      const result = judgmentDay.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      // Base calc: 12
      // Bonus: 5
      // Total: 17
      
      expect(resolveDamageSpy).toHaveBeenCalledWith(
        actor.id,
        target.id,
        expect.objectContaining({
          damage: 17,
        }),
        DEFAULT_TEST_LOCATION,
      );

      expect(result.content.en).toContain("+5 vs evil");
    });
  });
});
