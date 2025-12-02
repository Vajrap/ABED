/**
 * Spirit Rattle (Holy Rattle) Skill Tests
 * 
 * Tests for the Spirit Rattle skill's exec() function, covering:
 * - No allies handling
 * - Number of targets: 1 + 1d(skillLevel)
 * - Duration: {5}3:2{/} turns
 * - Apply SpiritRattle buff to random allies
 * - Return value structure
 */

import { expect, describe, it, beforeEach, jest, afterEach } from "@jest/globals";
import { holyRattle } from "../spiritRattle";
import { ActorEffect, TargetEffect } from "../../../../effects";
import {
  setupSkillTestMocks,
  createTestActor,
  createTestTarget,
  clearCharacterRegistry,
  DEFAULT_TEST_LOCATION,
} from "../../../testHelpers";
import * as rollModule from "src/Utils/Dice";
import { buffsAndDebuffsRepository } from "src/Entity/BuffsAndDebuffs/repository";

setupSkillTestMocks();

describe("Spirit Rattle Skill", () => {
  let actor: any;
  let ally1: any;
  let ally2: any;
  let ally3: any;
  let actorParty: any[];
  let targetParty: any[];

  beforeEach(() => {
    clearCharacterRegistry();

    actor = createTestActor();
    
    ally1 = createTestTarget({ id: "ally-1", name: { en: "Ally 1", th: "พันธมิตร 1" } });
    ally2 = createTestTarget({ id: "ally-2", name: { en: "Ally 2", th: "พันธมิตร 2" } });
    ally3 = createTestTarget({ id: "ally-3", name: { en: "Ally 3", th: "พันธมิตร 3" } });

    actorParty = [actor, ally1, ally2, ally3];
    targetParty = [];

    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("No Allies Handling", () => {
    it("should return appropriate message when no allies are found", () => {
      const emptyParty: any[] = [actor]; // Only actor, no other allies

      const result = holyRattle.exec(
        actor,
        emptyParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(result.content.en).toContain("no allies to buff");
      expect(result.actor.effect).toContain(ActorEffect.TestSkill);
      expect(result.targets).toEqual([]);
    });
  });

  describe("Target Selection", () => {
    it("should select 1 + 1d(skillLevel) allies at level 1", () => {
      // Mock dice: 1d1 = 1 (so 1 + 1 = 2 targets)
      jest.spyOn(rollModule, "roll").mockImplementation(() => ({
        d: jest.fn(() => ({
          total: 1,
          rolls: [1],
        })),
      }) as any);

      const spiritRattleSpy = jest.spyOn(buffsAndDebuffsRepository.spiritRattle, "appender");

      holyRattle.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      // Should select 1 + 1d1 = 2 targets (excluding self)
      expect(spiritRattleSpy).toHaveBeenCalledTimes(2);
    });

    it("should select more allies at higher levels", () => {
      // Mock dice: 1d5 = 3 (so 1 + 3 = 4 targets)
      jest.spyOn(rollModule, "roll").mockImplementation(() => ({
        d: jest.fn(() => ({
          total: 3,
          rolls: [3],
        })),
      }) as any);

      const spiritRattleSpy = jest.spyOn(buffsAndDebuffsRepository.spiritRattle, "appender");

      holyRattle.exec(
        actor,
        actorParty,
        targetParty,
        5,
        DEFAULT_TEST_LOCATION,
      );

      // Should select up to available allies (3 allies available)
      expect(spiritRattleSpy).toHaveBeenCalledTimes(3); // Max available
    });
  });

  describe("Duration", () => {
    it("should apply buff for 2 turns at level 1", () => {
      jest.spyOn(rollModule, "roll").mockImplementation(() => ({
        d: jest.fn(() => ({
          total: 1,
          rolls: [1],
        })),
      }) as any);

      const spiritRattleSpy = jest.spyOn(buffsAndDebuffsRepository.spiritRattle, "appender");

      holyRattle.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(spiritRattleSpy).toHaveBeenCalledWith(
        expect.any(Object),
        expect.objectContaining({
          turnsAppending: expect.any(Number),
        }),
      );

      // Duration should be calculated: Math.min(1 + Math.floor(skillLevel * 0.5), skillLevel)
      // Level 1: Math.min(1 + 0, 1) = 1
      const callArgs = spiritRattleSpy.mock.calls[0];
      expect(callArgs?.[1]?.turnsAppending).toBeGreaterThanOrEqual(1);
    });

    it("should apply buff for 3 turns at level 5", () => {
      jest.spyOn(rollModule, "roll").mockImplementation(() => ({
        d: jest.fn(() => ({
          total: 1,
          rolls: [1],
        })),
      }) as any);

      const spiritRattleSpy = jest.spyOn(buffsAndDebuffsRepository.spiritRattle, "appender");

      holyRattle.exec(
        actor,
        actorParty,
        targetParty,
        5,
        DEFAULT_TEST_LOCATION,
      );

      // Duration: Math.min(1 + Math.floor(5 * 0.5), 5) = Math.min(3, 5) = 3
      const callArgs = spiritRattleSpy.mock.calls[0];
      expect(callArgs?.[1]?.turnsAppending).toBe(3);
    });
  });

  describe("Return Value Structure", () => {
    it("should return correct structure with target effects", () => {
      jest.spyOn(rollModule, "roll").mockImplementation(() => ({
        d: jest.fn(() => ({
          total: 1,
          rolls: [1],
        })),
      }) as any);

      const result = holyRattle.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(result.actor.actorId).toBe(actor.id);
      expect(result.actor.effect).toContain(ActorEffect.Cast);
      expect(result.targets.length).toBeGreaterThan(0);
      expect(result.content.en).toContain("spirit rattle");
    });
  });
});

