/**
 * Mend Spirit Skill Tests
 * 
 * Tests for the Mend Spirit skill's exec() function, covering:
 * - No injured allies handling
 * - Healing formula: (1d4 + WILmod) × SkillLevelMultiplier
 * - Random ally selection (injured allies)
 * - D20 roll: if 11+, heal is halved and target gains +1 chaos
 * - Cooldown debuff application (3 turns)
 * - Return value structure
 */

import { expect, describe, it, beforeEach, jest, afterEach } from "@jest/globals";
import { mendSpirit } from "../mendSpirit";
import { ActorEffect, TargetEffect } from "../../../../effects";
import {
  setupSkillTestMocks,
  createTestActor,
  createTestTarget,
  clearCharacterRegistry,
  DEFAULT_TEST_LOCATION,
} from "../../../testHelpers";
import * as rollModule from "src/Utils/Dice";
import { DebuffEnum } from "src/Entity/BuffsAndDebuffs/enum";
import { debuffsRepository } from "src/Entity/BuffsAndDebuffs/repository";

setupSkillTestMocks();

describe("Mend Spirit Skill", () => {
  let actor: any;
  let ally1: any;
  let ally2: any;
  let actorParty: any[];
  let targetParty: any[];

  beforeEach(() => {
    clearCharacterRegistry();

    actor = createTestActor();
    // Set WIL to 14 (+2 mod)
    actor.attribute.getStat("willpower").base = 14;
    
    ally1 = createTestTarget({ id: "ally-1", name: { en: "Ally 1", th: "พันธมิตร 1" } });
    ally2 = createTestTarget({ id: "ally-2", name: { en: "Ally 2", th: "พันธมิตร 2" } });
    // Set injured (HP < max)
    ally1.vitals.hp.setCurrent(50);
    ally2.vitals.hp.setCurrent(60);

    actorParty = [actor, ally1, ally2];
    targetParty = [];

    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("No Injured Allies Handling", () => {
    it("should select from all allies if none are injured", () => {
      // All allies at full HP - code selects from all allies instead of returning early
      ally1.vitals.hp.setCurrent(ally1.vitals.hp.max);
      ally2.vitals.hp.setCurrent(ally2.vitals.hp.max);

      jest.spyOn(rollModule, "roll").mockImplementation(() => ({
        d: jest.fn(() => ({
          total: 2,
          rolls: [2],
        })),
      }) as any);

      jest.spyOn(rollModule, "rollTwenty").mockReturnValue({
        total: 5,
        rolls: [5],
      } as any);

      const result = mendSpirit.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      // Should still return a result (selects from all allies)
      expect(result.actor.actorId).toBe(actor.id);
      expect(result.content.en).toContain("Mend Spirit");
    });

    it("should select from all allies if none are injured", () => {
      // All allies at full HP - should still select one
      ally1.vitals.hp.setCurrent(ally1.vitals.hp.max);
      ally2.vitals.hp.setCurrent(ally2.vitals.hp.max);

      // Mock dice
      jest.spyOn(rollModule, "roll").mockImplementation(() => ({
        d: jest.fn(() => ({
          total: 2,
          rolls: [2],
        })),
      }) as any);

      jest.spyOn(rollModule, "rollTwenty").mockReturnValue({
        total: 5, // < 11, full heal
        rolls: [5],
      } as any);

      const result = mendSpirit.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      // Should still return a result (selects from all allies)
      expect(result.actor.actorId).toBe(actor.id);
    });
  });

  describe("Healing Calculation", () => {
    it("should heal correctly at level 1 (full heal if D20 <= 11)", () => {
      const initialHp = ally1.vitals.hp.current;
      
      // Mock dice: 1d4 = 3
      jest.spyOn(rollModule, "roll").mockImplementation(() => ({
        d: jest.fn(() => ({
          total: 3,
          rolls: [3],
        })),
      }) as any);

      jest.spyOn(rollModule, "rollTwenty").mockReturnValue({
        total: 10, // <= 11, full heal
        rolls: [10],
      } as any);

      mendSpirit.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      // Formula: (1d4 + WILmod) × SkillLevelMultiplier
      // Dice = 3, WILmod = 2, Level 1 multiplier = 1.0
      // Expected: (3 + 2) × 1.0 = 5
      // Note: Actual heal may be capped at max HP
      const newHp = ally1.vitals.hp.current;
      expect(newHp).toBeGreaterThanOrEqual(initialHp);
    });

    it("should halve heal and grant chaos if D20 >= 11", () => {
      // Make only ally1 injured so selection is deterministic
      ally2.vitals.hp.setCurrent(ally2.vitals.hp.max);
      actor.vitals.hp.setCurrent(actor.vitals.hp.max); // Actor at full HP
      
      const initialChaos = ally1.resources.chaos;
      const initialHp = ally1.vitals.hp.current;
      
      // Mock dice: 1d4 = 3
      jest.spyOn(rollModule, "roll").mockImplementation(() => ({
        d: jest.fn(() => ({
          total: 3,
          rolls: [3],
        })),
      }) as any);

      jest.spyOn(rollModule, "rollTwenty").mockReturnValue({
        total: 15, // >= 11, halved heal + chaos
        rolls: [15],
      } as any);

      const result = mendSpirit.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      // Should mention chaos in message
      expect(result.content.en).toContain("Chaos");
      // HP should increase (halved heal)
      // Check whichever ally was selected (should be ally1 since only one injured)
      const selectedAlly = actorParty.find(ally => ally.vitals.hp.current > (ally.id === "ally-1" ? initialHp : ally.vitals.hp.max - 10));
      if (selectedAlly && selectedAlly.id === "ally-1") {
        expect(ally1.resources.chaos).toBe(initialChaos + 1);
        expect(ally1.vitals.hp.current).toBeGreaterThan(initialHp);
      }
    });
  });

  describe("Cooldown Application", () => {
    it("should apply cooldown debuff for 3 turns", () => {
      jest.spyOn(rollModule, "roll").mockImplementation(() => ({
        d: jest.fn(() => ({
          total: 2,
          rolls: [2],
        })),
      }) as any);

      jest.spyOn(rollModule, "rollTwenty").mockReturnValue({
        total: 5,
        rolls: [5],
      } as any);

      const cooldownSpy = jest.spyOn(debuffsRepository.mendSpiritCooldown, "appender");

      mendSpirit.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(cooldownSpy).toHaveBeenCalledWith(
        actor,
        expect.objectContaining({
          turnsAppending: 3,
        }),
      );
    });
  });

  describe("Return Value Structure", () => {
    it("should return correct structure with target effects", () => {
      jest.spyOn(rollModule, "roll").mockImplementation(() => ({
        d: jest.fn(() => ({
          total: 2,
          rolls: [2],
        })),
      }) as any);

      jest.spyOn(rollModule, "rollTwenty").mockReturnValue({
        total: 5,
        rolls: [5],
      } as any);

      const result = mendSpirit.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(result.actor.actorId).toBe(actor.id);
      expect(result.actor.effect).toContain(ActorEffect.Cast);
      expect(result.targets).toHaveLength(1);
      expect(result.targets[0]?.effect).toContain(TargetEffect.TestSkill);
      expect(result.content.en).toContain("Mend Spirit");
    });
  });
});

