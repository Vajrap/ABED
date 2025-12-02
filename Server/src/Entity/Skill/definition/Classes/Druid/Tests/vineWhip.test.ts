/**
 * Vine Whip Skill Tests
 * 
 * Tests for the Vine Whip skill's exec() function, covering:
 * - No target handling
 * - Damage formula: (1d6 + WILmod) × SkillLevelMultiplier
 * - Entanglement debuff on failed DC7 + ControlMod endurance save
 * - Return value structure
 * 
 * Note: Equipment requirements and resource consumption are tested separately.
 */

import { expect, describe, it, beforeEach, jest, afterEach } from "@jest/globals";
import { vineWhip } from "../vineWhip";
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
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";
import { DebuffEnum } from "src/Entity/BuffsAndDebuffs/enum";
import { buffsAndDebuffsRepository } from "src/Entity/BuffsAndDebuffs/repository";

// Setup mocks
setupSkillTestMocks();

describe("Vine Whip Skill", () => {
  let actor: any;
  let target: any;
  let actorParty: any[];
  let targetParty: any[];

  beforeEach(() => {
    clearCharacterRegistry();

    actor = createTestActor();
    actor.attribute.getStat("willpower").base = 16; // +3 mod
    actor.attribute.getStat("control").base = 14; // +2 mod
    
    target = createTestTarget();

    actorParty = [actor];
    targetParty = [target];

    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("No Target Handling", () => {
    it("should return appropriate message when no target is found", () => {
      mockGetTarget(null);

      const result = vineWhip.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(result.content.en).toContain("tried to use Vine Whip");
      expect(result.content.en).toContain("no target");
      expect(result.actor.actorId).toBe(actor.id);
      expect(result.actor.effect).toContain(ActorEffect.TestSkill);
      expect(result.targets).toHaveLength(0);
    });
  });

  describe("Damage Formula", () => {
    it("should deal (1d6 + WILmod) × SkillLevelMultiplier damage", () => {
      mockGetTarget(target);
      
      // Mock dice: 1d6 = 4, WILmod = +3, level 1 multiplier = 1.1
      // Expected: (4 + 3) × 1.1 = 7.7 → 7
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

      const resolveDamageSpy = mockResolveDamage({
        actualDamage: 5,
        damageType: DamageType.nature,
        isHit: true,
        isCrit: false,
      } as any);

      vineWhip.exec(
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
          type: DamageType.nature,
          isMagic: true,
        }),
        DEFAULT_TEST_LOCATION,
      );
    });
  });

  describe("Entanglement Debuff", () => {
    it("should apply Entangled debuff when target fails DC7 + ControlMod endurance save", () => {
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

      // ControlMod = +2, so DC = 7 + 2 = 9
      // Target fails save (roll < 9)
      jest.spyOn(target, "rollSave").mockReturnValue(5);

      mockResolveDamage({
        actualDamage: 5,
        damageType: DamageType.nature,
        isHit: true,
        isCrit: false,
      } as any);

      const entangledSpy = jest.spyOn(buffsAndDebuffsRepository.entangled, "appender");

      const result = vineWhip.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(entangledSpy).toHaveBeenCalledWith(
        target,
        { turnsAppending: 1 },
      );
      expect(result.content.en).toContain("entangled");
    });

    it("should not apply Entangled when target passes save", () => {
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

      // ControlMod = +2, so DC = 7 + 2 = 9
      // Target passes save (roll >= 9)
      jest.spyOn(target, "rollSave").mockReturnValue(12);

      mockResolveDamage({
        actualDamage: 5,
        damageType: DamageType.nature,
        isHit: true,
        isCrit: false,
      } as any);

      const entangledSpy = jest.spyOn(buffsAndDebuffsRepository.entangled, "appender");

      const result = vineWhip.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(entangledSpy).not.toHaveBeenCalled();
      expect(result.content.en).not.toContain("entangled");
    });

    it("should only apply Entangled if the attack hits", () => {
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

      // Attack misses
      mockResolveDamage({
        actualDamage: 0,
        damageType: DamageType.nature,
        isHit: false,
        isCrit: false,
      } as any);

      jest.spyOn(target, "rollSave").mockReturnValue(5); // Would fail save

      const entangledSpy = jest.spyOn(buffsAndDebuffsRepository.entangled, "appender");

      vineWhip.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      // Should not apply entangled if attack misses
      expect(entangledSpy).not.toHaveBeenCalled();
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

      jest.spyOn(target, "rollSave").mockReturnValue(10);

      mockResolveDamage({
        actualDamage: 5,
        damageType: DamageType.nature,
        isHit: true,
        isCrit: false,
      } as any);

      const result = vineWhip.exec(
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
      expect(result.actor.effect).toContain(ActorEffect.TestSkill);
      expect(result.targets).toHaveLength(1);
      expect(result.targets[0]).toHaveProperty("actorId", target.id);
      expect(result.targets[0]).toHaveProperty("effect");
      expect(result.targets[0]?.effect).toContain(TargetEffect.TestSkill);
    });
  });
});

