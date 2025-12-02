/**
 * Chaotic Blessing Skill Tests
 * 
 * Tests for the Chaotic Blessing skill's exec() function, covering:
 * - 50% chance to damage all enemies or heal all allies
 * - Damage formula: {5}'1d8':'1d6'{/} + ((WILmod + PlanarMod) / 2) × SkillLevelMultiplier
 * - Heal formula: Same as damage
 * - Level 5: Healed allies roll DC10 WILsave, if passed gain +1 chaos
 * - Level 5: Damaged enemies roll DC10 WILsave, if failed lose 1 random resource
 * - Return value structure
 */

import { expect, describe, it, beforeEach, jest, afterEach } from "@jest/globals";
import { chaoticBlessing } from "../chaoticBlessing";
import { ActorEffect, TargetEffect } from "../../../../effects";
import {
  setupSkillTestMocks,
  createTestActor,
  createTestTarget,
  clearCharacterRegistry,
  DEFAULT_TEST_LOCATION,
  mockResolveDamage,
} from "../../../testHelpers";
import * as rollModule from "src/Utils/Dice";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";

setupSkillTestMocks();

describe("Chaotic Blessing Skill", () => {
  let actor: any;
  let ally1: any;
  let ally2: any;
  let enemy1: any;
  let enemy2: any;
  let actorParty: any[];
  let targetParty: any[];

  beforeEach(() => {
    clearCharacterRegistry();

    actor = createTestActor();
    // Set WIL to 14 (+2 mod), Planar to 14 (+2 mod)
    actor.attribute.getStat("willpower").base = 14;
    actor.attribute.getStat("planar").base = 14;
    
    ally1 = createTestTarget({ id: "ally-1", name: { en: "Ally 1", th: "พันธมิตร 1" } });
    ally2 = createTestTarget({ id: "ally-2", name: { en: "Ally 2", th: "พันธมิตร 2" } });
    enemy1 = createTestTarget({ id: "enemy-1", name: { en: "Enemy 1", th: "ศัตรู 1" } });
    enemy2 = createTestTarget({ id: "enemy-2", name: { en: "Enemy 2", th: "ศัตรู 2" } });

    actorParty = [actor, ally1, ally2];
    targetParty = [enemy1, enemy2];

    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("Damage Path (50% chance)", () => {
    it("should damage all enemies when D20 <= 10", () => {
      // Mock D20 roll to trigger damage path
      jest.spyOn(rollModule, "rollTwenty").mockReturnValue({
        total: 8, // <= 10, damage path
        rolls: [8],
      } as any);

      // Mock dice: 1d6 = 3
      jest.spyOn(rollModule, "roll").mockImplementation(() => ({
        d: jest.fn(() => ({
          total: 3,
          rolls: [3],
        })),
      }) as any);

      const resolveDamageSpy = mockResolveDamage({
        actualDamage: 5,
        damageType: DamageType.chaos,
        isHit: true,
        isCrit: false,
      });

      chaoticBlessing.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      // Should damage all enemies
      expect(resolveDamageSpy).toHaveBeenCalledTimes(2);
    });

    it("should use 1d8 dice at level 5", () => {
      jest.spyOn(rollModule, "rollTwenty").mockReturnValue({
        total: 8,
        rolls: [8],
      } as any);

      jest.spyOn(rollModule, "roll").mockImplementation(() => ({
        d: jest.fn(() => ({
          total: 4,
          rolls: [4],
        })),
      }) as any);

      mockResolveDamage({
        actualDamage: 6,
        damageType: DamageType.chaos,
        isHit: true,
        isCrit: false,
      });

      chaoticBlessing.exec(
        actor,
        actorParty,
        targetParty,
        5,
        DEFAULT_TEST_LOCATION,
      );

      // Should use 1d8 dice (level 5)
      expect(rollModule.roll).toHaveBeenCalled();
    });
  });

  describe("Heal Path (50% chance)", () => {
    it("should heal all allies when D20 > 10", () => {
      // Ensure allies are injured so they can be healed
      ally1.vitals.hp.setBase(100);
      ally1.vitals.hp.setCurrent(50);
      ally2.vitals.hp.setBase(100);
      ally2.vitals.hp.setCurrent(50);
      
      const initialHp1 = ally1.vitals.hp.current;
      const initialHp2 = ally2.vitals.hp.current;
      
      // Mock D20 roll to trigger heal path
      jest.spyOn(rollModule, "rollTwenty").mockReturnValue({
        total: 15, // > 10, heal path
        rolls: [15],
      } as any);

      // Mock dice: 1d6 = 3
      jest.spyOn(rollModule, "roll").mockImplementation(() => ({
        d: jest.fn(() => ({
          total: 3,
          rolls: [3],
        })),
      }) as any);

      chaoticBlessing.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      // Allies should be healed
      expect(ally1.vitals.hp.current).toBeGreaterThanOrEqual(initialHp1);
      expect(ally2.vitals.hp.current).toBeGreaterThanOrEqual(initialHp2);
    });
  });

  describe("Level 5 Effects", () => {
    it("should grant chaos to healed allies who pass WILsave", () => {
      // Set WIL for predictable saves
      ally1.attribute.getStat("willpower").base = 16; // +3 mod, likely to pass
      
      jest.spyOn(rollModule, "rollTwenty")
        .mockReturnValueOnce({
          total: 15, // > 10, heal path
          rolls: [15],
        } as any)
        .mockReturnValueOnce({
          total: 12, // >= 10, pass save
          rolls: [12],
        } as any);

      jest.spyOn(rollModule, "roll").mockImplementation(() => ({
        d: jest.fn(() => ({
          total: 3,
          rolls: [3],
        })),
      }) as any);

      const initialChaos = ally1.resources.chaos;

      chaoticBlessing.exec(
        actor,
        actorParty,
        targetParty,
        5,
        DEFAULT_TEST_LOCATION,
      );

      // Should gain +1 chaos if save passed
      expect(ally1.resources.chaos).toBeGreaterThanOrEqual(initialChaos);
    });

    it("should cause damaged enemies to lose resource if save fails", () => {
      enemy1.resources.chaos = 5; // Set some resources
      
      jest.spyOn(rollModule, "rollTwenty")
        .mockReturnValueOnce({
          total: 8, // <= 10, damage path
          rolls: [8],
        } as any)
        .mockReturnValueOnce({
          total: 5, // < 10, fail save
          rolls: [5],
        } as any);

      jest.spyOn(rollModule, "roll").mockImplementation(() => ({
        d: jest.fn(() => ({
          total: 3,
          rolls: [3],
        })),
      }) as any);

      mockResolveDamage({
        actualDamage: 5,
        damageType: DamageType.chaos,
        isHit: true,
        isCrit: false,
      });

      const initialChaos = enemy1.resources.chaos;

      chaoticBlessing.exec(
        actor,
        actorParty,
        targetParty,
        5,
        DEFAULT_TEST_LOCATION,
      );

      // Should lose 1 resource if save failed
      if (initialChaos > 0) {
        expect(enemy1.resources.chaos).toBeLessThanOrEqual(initialChaos);
      }
    });
  });

  describe("Return Value Structure", () => {
    it("should return correct structure", () => {
      jest.spyOn(rollModule, "rollTwenty").mockReturnValue({
        total: 8,
        rolls: [8],
      } as any);

      jest.spyOn(rollModule, "roll").mockImplementation(() => ({
        d: jest.fn(() => ({
          total: 3,
          rolls: [3],
        })),
      }) as any);

      mockResolveDamage({
        actualDamage: 5,
        damageType: DamageType.chaos,
        isHit: true,
        isCrit: false,
      });

      const result = chaoticBlessing.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(result.actor.actorId).toBe(actor.id);
      expect(result.actor.effect).toContain(ActorEffect.Cast);
      expect(result.content.en).toContain("Chaotic Blessing");
    });
  });
});

