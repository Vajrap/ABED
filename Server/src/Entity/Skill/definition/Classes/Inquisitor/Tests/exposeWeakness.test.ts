/**
 * Expose Weakness Skill Tests
 * 
 * Tests for the Expose Weakness skill's exec() function, covering:
 * - No target handling
 * - Exposed debuff application (duration and universalCounter based on level)
 * - ExposeWeaknessActive buff application (duration and universalCounter based on WIL mod)
 * - Return value structure
 */

import { expect, describe, it, beforeEach, jest, afterEach } from "@jest/globals";
import { exposeWeakness } from "../exposeWeakness";
import { ActorEffect, TargetEffect } from "../../../../effects";
import {
  setupSkillTestMocks,
  createTestActor,
  createTestTarget,
  clearCharacterRegistry,
  DEFAULT_TEST_LOCATION,
} from "../../../testHelpers";
import * as getTargetModule from "src/Entity/Battle/getTarget";
import { buffsAndDebuffsRepository } from "src/Entity/BuffsAndDebuffs/repository";

// Setup mocks
setupSkillTestMocks();

describe("Expose Weakness Skill", () => {
  let actor: any;
  let target: any;
  let actorParty: any[];
  let targetParty: any[];

  beforeEach(() => {
    clearCharacterRegistry();

    actor = createTestActor();
    // Set Willpower to 16 for a +3 mod ((16-10)/2 = 3)
    actor.attribute.getStat("willpower").base = 16;
    
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

      const result = exposeWeakness.exec(
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

  describe("Basic Execution (Level < 5)", () => {
    it("should apply Exposed debuff and ExposeWeaknessActive buff for 2 turns", () => {
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        one: jest.fn(() => target),
      }) as any);

      const exposedAppenderSpy = jest.spyOn(buffsAndDebuffsRepository.exposed, "appender");
      const activeAppenderSpy = jest.spyOn(buffsAndDebuffsRepository.exposeWeaknessActive, "appender");

      const result = exposeWeakness.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      // Check Exposed debuff on target
      expect(exposedAppenderSpy).toHaveBeenCalledWith(
        target,
        { turnsAppending: 2, universalCounter: 0 }
      );

      // Check ExposeWeaknessActive buff on actor
      // Willpower 16 -> Mod +3
      expect(activeAppenderSpy).toHaveBeenCalledWith(
        actor,
        { turnsAppending: 2, universalCounter: 3 }
      );

      // Check message
      expect(result.content.en).toContain("exposes Enemy 1's weakness");
      expect(result.content.en).toContain("gains +1 hit"); // floor(3/2) = 1

      // Check return structure
      expect(result.actor.effect).toContain(ActorEffect.Cast);
      expect(result.targets).toHaveLength(1);
      expect(result.targets[0]!.actorId).toBe(target.id);
      expect(result.targets[0]!.effect).toContain(TargetEffect.TestSkill);
    });
  });

  describe("Level 5 Execution", () => {
    it("should apply Exposed debuff and ExposeWeaknessActive buff for 3 turns with enhanced effect", () => {
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        one: jest.fn(() => target),
      }) as any);

      const exposedAppenderSpy = jest.spyOn(buffsAndDebuffsRepository.exposed, "appender");
      const activeAppenderSpy = jest.spyOn(buffsAndDebuffsRepository.exposeWeaknessActive, "appender");

      const result = exposeWeakness.exec(
        actor,
        actorParty,
        targetParty,
        5,
        DEFAULT_TEST_LOCATION,
      );

      // Check Exposed debuff on target (duration 3, universalCounter 1)
      expect(exposedAppenderSpy).toHaveBeenCalledWith(
        target,
        { turnsAppending: 3, universalCounter: 1 }
      );

      // Check ExposeWeaknessActive buff on actor (duration 3)
      expect(activeAppenderSpy).toHaveBeenCalledWith(
        actor,
        { turnsAppending: 3, universalCounter: 3 }
      );
    });
  });
});
