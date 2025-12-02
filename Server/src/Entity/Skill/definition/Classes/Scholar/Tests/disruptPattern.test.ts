/**
 * Disrupt Pattern Skill Tests
 * 
 * Tests for the Disrupt Pattern skill's exec() function, covering:
 * - No target handling
 * - Save roll: DC{5}'12':'10'{/} WILsave
 * - Save failed: Apply Dazed debuff for 1 turn
 * - Save passed: Reduce target's AB gauge (initiative) by {5}'30':'20'{/}
 * - Return value structure
 */

import { expect, describe, it, beforeEach, jest, afterEach } from "@jest/globals";
import { disruptPattern } from "../disruptPattern";
import { ActorEffect, TargetEffect } from "../../../../effects";
import {
  setupSkillTestMocks,
  createTestActor,
  createTestTarget,
  clearCharacterRegistry,
  DEFAULT_TEST_LOCATION,
} from "../../../testHelpers";
import * as getTargetModule from "src/Entity/Battle/getTarget";
import { DebuffEnum } from "src/Entity/BuffsAndDebuffs/enum";
import { debuffsRepository } from "src/Entity/BuffsAndDebuffs/repository";

setupSkillTestMocks();

describe("Disrupt Pattern Skill", () => {
  let actor: any;
  let target: any;
  let actorParty: any[];
  let targetParty: any[];

  beforeEach(() => {
    clearCharacterRegistry();

    actor = createTestActor();
    target = createTestTarget({ id: "target-1", name: { en: "Enemy 1", th: "ศัตรู 1" } });
    // Set WIL to 10 (0 mod) for predictable saves
    target.attribute.getStat("willpower").base = 10;
    target.abGauge = 50; // Set initial AB gauge

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

      const result = disruptPattern.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(result.content.en).toContain("tried to disrupt pattern but has no target");
      expect(result.actor.effect).toContain(ActorEffect.TestSkill);
      expect(result.targets).toEqual([]);
    });
  });

  describe("Save Roll - Failed (Dazed Debuff)", () => {
    it("should apply Dazed debuff when save fails at level 1 (DC10)", () => {
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        one: jest.fn(() => target),
      }) as any);

      // Mock save roll to fail (roll 5, DC 10)
      jest.spyOn(target, "rollSave").mockReturnValue(5);

      const dazedSpy = jest.spyOn(debuffsRepository.dazed, "appender");
      const disruptPatternSpy = jest.spyOn(debuffsRepository.disruptPattern, "appender");

      const result = disruptPattern.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(dazedSpy).toHaveBeenCalledWith(
        target,
        expect.objectContaining({
          turnsAppending: 1,
        }),
      );
      expect(disruptPatternSpy).toHaveBeenCalledWith(
        actor,
        expect.objectContaining({
          turnsAppending: 3,
        }),
      );
      expect(result.content.en).toContain("is dazed");
    });

    it("should apply Dazed debuff when save fails at level 5 (DC12)", () => {
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        one: jest.fn(() => target),
      }) as any);

      // Mock save roll to fail (roll 10, DC 12)
      jest.spyOn(target, "rollSave").mockReturnValue(10);

      const dazedSpy = jest.spyOn(debuffsRepository.dazed, "appender");

      disruptPattern.exec(
        actor,
        actorParty,
        targetParty,
        5,
        DEFAULT_TEST_LOCATION,
      );

      expect(dazedSpy).toHaveBeenCalled();
    });
  });

  describe("Save Roll - Passed (AB Gauge Reduction)", () => {
    it("should reduce AB gauge by 20 at level 1 when save passes", () => {
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        one: jest.fn(() => target),
      }) as any);

      const initialGauge = 50;
      target.abGauge = initialGauge;

      // Mock save roll to pass (roll 15, DC 10)
      jest.spyOn(target, "rollSave").mockReturnValue(15);

      const result = disruptPattern.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(target.abGauge).toBe(initialGauge - 20);
      expect(result.content.en).toContain("initiative is reduced by 20");
    });

    it("should reduce AB gauge by 30 at level 5 when save passes", () => {
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        one: jest.fn(() => target),
      }) as any);

      const initialGauge = 50;
      target.abGauge = initialGauge;

      // Mock save roll to pass (roll 15, DC 12)
      jest.spyOn(target, "rollSave").mockReturnValue(15);

      const result = disruptPattern.exec(
        actor,
        actorParty,
        targetParty,
        5,
        DEFAULT_TEST_LOCATION,
      );

      expect(target.abGauge).toBe(initialGauge - 30);
      expect(result.content.en).toContain("initiative is reduced by 30");
    });

    it("should not reduce AB gauge below 0", () => {
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        one: jest.fn(() => target),
      }) as any);

      target.abGauge = 10; // Low gauge

      // Mock save roll to pass
      jest.spyOn(target, "rollSave").mockReturnValue(15);

      disruptPattern.exec(
        actor,
        actorParty,
        targetParty,
        5,
        DEFAULT_TEST_LOCATION,
      );

      expect(target.abGauge).toBe(0); // Should be capped at 0
    });
  });

  describe("Return Value Structure", () => {
    it("should return correct structure when save fails", () => {
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        one: jest.fn(() => target),
      }) as any);

      jest.spyOn(target, "rollSave").mockReturnValue(5); // Fail

      const result = disruptPattern.exec(
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
      expect(result.targets[0]?.effect).toContain(TargetEffect.TestSkill);
    });

    it("should return correct structure when save passes", () => {
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        one: jest.fn(() => target),
      }) as any);

      jest.spyOn(target, "rollSave").mockReturnValue(15); // Pass

      const result = disruptPattern.exec(
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
    });
  });
});

