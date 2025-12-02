/**
 * Chaos Brand Skill Tests
 * 
 * Tests for the Chaos Brand skill's exec() function, covering:
 * - No target handling
 * - Apply Exposed debuff for {5}'3':'2'{/} turns
 * - Apply HexMark debuff
 * - Level 5: Reduce critical defense by 2
 * - Apply CurseMarkActive buff to user
 * - Return value structure
 */

import { expect, describe, it, beforeEach, jest, afterEach } from "@jest/globals";
import { chaosBrand } from "../chaosBrand";
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

setupSkillTestMocks();

describe("Chaos Brand Skill", () => {
  let actor: any;
  let target: any;
  let actorParty: any[];
  let targetParty: any[];

  beforeEach(() => {
    clearCharacterRegistry();

    actor = createTestActor();
    // Set INT to 14 (+2 mod)
    actor.attribute.getStat("intelligence").base = 14;
    
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

      const result = chaosBrand.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(result.content.en).toContain("tried to use Curse Mark but has no target");
      expect(result.actor.effect).toContain(ActorEffect.TestSkill);
      expect(result.targets).toEqual([]);
    });
  });

  describe("Debuff Application", () => {
    it("should apply Exposed debuff for 2 turns at level 1", () => {
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        one: jest.fn(() => target),
      }) as any);

      const exposedSpy = jest.spyOn(buffsAndDebuffsRepository.exposed, "appender");
      const hexMarkSpy = jest.spyOn(buffsAndDebuffsRepository.hexMark, "appender");

      chaosBrand.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(exposedSpy).toHaveBeenCalledWith(
        target,
        expect.objectContaining({
          turnsAppending: 2,
        }),
      );
      expect(hexMarkSpy).toHaveBeenCalled();
    });

    it("should apply Exposed debuff for 3 turns at level 5", () => {
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        one: jest.fn(() => target),
      }) as any);

      const exposedSpy = jest.spyOn(buffsAndDebuffsRepository.exposed, "appender");

      chaosBrand.exec(
        actor,
        actorParty,
        targetParty,
        5,
        DEFAULT_TEST_LOCATION,
      );

      expect(exposedSpy).toHaveBeenCalledWith(
        target,
        expect.objectContaining({
          turnsAppending: 3,
          universalCounter: 1, // Level 5: -2 crit defense
        }),
      );
    });
  });

  describe("Buff Application", () => {
    it("should apply CurseMarkActive buff to user", () => {
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        one: jest.fn(() => target),
      }) as any);

      const curseMarkActiveSpy = jest.spyOn(buffsAndDebuffsRepository.curseMarkActive, "appender");

      chaosBrand.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(curseMarkActiveSpy).toHaveBeenCalledWith(
        actor,
        expect.objectContaining({
          turnsAppending: expect.any(Number),
          universalCounter: 2, // INTmod = 2
        }),
      );
    });
  });

  describe("Return Value Structure", () => {
    it("should return correct structure with target effects", () => {
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        one: jest.fn(() => target),
      }) as any);

      const result = chaosBrand.exec(
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
      expect(result.content.en).toContain("curse mark");
    });
  });
});

