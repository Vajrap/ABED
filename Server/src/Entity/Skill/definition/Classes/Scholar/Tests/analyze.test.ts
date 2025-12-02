/**
 * Analyze Skill Tests
 * 
 * Tests for the Analyze skill's exec() function, covering:
 * - No target handling
 * - Exposed debuff application (2 turns)
 * - Analyze cooldown debuff (3 turns)
 * - Level 5: critDef debuff application with INTmod (capped 1-3)
 * - Return value structure
 */

import { expect, describe, it, beforeEach, jest, afterEach } from "@jest/globals";
import { analyze } from "../analyze";
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

describe("Analyze Skill", () => {
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

      const result = analyze.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(result.content.en).toContain("tried to analyze but has no target");
      expect(result.actor.effect).toContain(ActorEffect.TestSkill);
      expect(result.targets).toEqual([]);
    });
  });

  describe("Debuff Application", () => {
    it("should apply Exposed debuff for 2 turns at level 1", () => {
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        one: jest.fn(() => target),
      }) as any);

      const exposedSpy = jest.spyOn(debuffsRepository.exposed, "appender");
      const analyzeSpy = jest.spyOn(debuffsRepository.analyze, "appender");

      analyze.exec(
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
      expect(analyzeSpy).toHaveBeenCalledWith(
        actor,
        expect.objectContaining({
          turnsAppending: 3,
        }),
      );
    });

    it("should apply critDef debuff at level 5 with INTmod (capped 1-3)", () => {
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        one: jest.fn(() => target),
      }) as any);

      // INT 14 = +2 mod, should be capped to 2 (within 1-3 range)
      actor.attribute.getStat("intelligence").base = 14;
      const critDefSpy = jest.spyOn(debuffsRepository.critDef, "appender");

      analyze.exec(
        actor,
        actorParty,
        targetParty,
        5,
        DEFAULT_TEST_LOCATION,
      );

      expect(critDefSpy).toHaveBeenCalledWith(
        target,
        expect.objectContaining({
          turnsAppending: 2,
          universalCounter: 2, // INTmod = 2, capped between 1-3
        }),
      );
    });

    it("should cap critDef debuff at 3 even with high INT", () => {
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        one: jest.fn(() => target),
      }) as any);

      // INT 20 = +5 mod, should be capped to 3
      actor.attribute.getStat("intelligence").base = 20;
      const critDefSpy = jest.spyOn(debuffsRepository.critDef, "appender");

      analyze.exec(
        actor,
        actorParty,
        targetParty,
        5,
        DEFAULT_TEST_LOCATION,
      );

      expect(critDefSpy).toHaveBeenCalledWith(
        target,
        expect.objectContaining({
          universalCounter: 3, // Capped at 3
        }),
      );
    });

    it("should cap critDef debuff at minimum 1 even with low INT", () => {
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        one: jest.fn(() => target),
      }) as any);

      // INT 6 = -2 mod, should be capped to 1
      actor.attribute.getStat("intelligence").base = 6;
      const critDefSpy = jest.spyOn(debuffsRepository.critDef, "appender");

      analyze.exec(
        actor,
        actorParty,
        targetParty,
        5,
        DEFAULT_TEST_LOCATION,
      );

      expect(critDefSpy).toHaveBeenCalledWith(
        target,
        expect.objectContaining({
          universalCounter: 1, // Capped at minimum 1
        }),
      );
    });

    it("should not apply critDef debuff below level 5", () => {
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        one: jest.fn(() => target),
      }) as any);

      const critDefSpy = jest.spyOn(debuffsRepository.critDef, "appender");

      analyze.exec(
        actor,
        actorParty,
        targetParty,
        4,
        DEFAULT_TEST_LOCATION,
      );

      expect(critDefSpy).not.toHaveBeenCalled();
    });
  });

  describe("Return Value Structure", () => {
    it("should return correct structure with target effects", () => {
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        one: jest.fn(() => target),
      }) as any);

      const result = analyze.exec(
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
      expect(result.content.en).toContain("analyzes");
      expect(result.content.en).toContain(target.name.en);
    });
  });
});

