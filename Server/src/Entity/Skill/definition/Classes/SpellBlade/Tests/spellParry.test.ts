/**
 * Spell Parry Skill Tests
 * 
 * Tests for the Spell Parry skill's exec() function, covering:
 * - Apply SpellParry buff for {5}2:1{/} turn
 * - Level 5: Gain 1 EdgeCharge when used
 * - Return value structure
 */

import { expect, describe, it, beforeEach, jest, afterEach } from "@jest/globals";
import { spellParry } from "../spellParry";
import { ActorEffect, TargetEffect } from "../../../../effects";
import {
  setupSkillTestMocks,
  createTestActor,
  createTestTarget,
  clearCharacterRegistry,
  DEFAULT_TEST_LOCATION,
} from "../../../testHelpers";
import { BuffEnum } from "src/Entity/BuffsAndDebuffs/enum";
import { buffsAndDebuffsRepository } from "src/Entity/BuffsAndDebuffs/repository";

setupSkillTestMocks();

describe("Spell Parry Skill", () => {
  let actor: any;
  let actorParty: any[];
  let targetParty: any[];

  beforeEach(() => {
    clearCharacterRegistry();

    actor = createTestActor();
    actorParty = [actor];
    targetParty = [];

    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("Buff Application", () => {
    it("should apply SpellParry buff for 1 turn at level 1", () => {
      const spellParrySpy = jest.spyOn(buffsAndDebuffsRepository.spellParry, "appender");

      spellParry.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(spellParrySpy).toHaveBeenCalledWith(
        actor,
        expect.objectContaining({
          turnsAppending: 1,
        }),
      );
    });

    it("should apply SpellParry buff for 2 turns at level 5", () => {
      const spellParrySpy = jest.spyOn(buffsAndDebuffsRepository.spellParry, "appender");

      spellParry.exec(
        actor,
        actorParty,
        targetParty,
        5,
        DEFAULT_TEST_LOCATION,
      );

      expect(spellParrySpy).toHaveBeenCalledWith(
        actor,
        expect.objectContaining({
          turnsAppending: 2,
        }),
      );
    });
  });

  describe("EdgeCharge Generation (Level 5)", () => {
    it("should generate 1 EdgeCharge at level 5", () => {
      const edgeChargeSpy = jest.spyOn(buffsAndDebuffsRepository.edgeCharge, "appender");

      spellParry.exec(
        actor,
        actorParty,
        targetParty,
        5,
        DEFAULT_TEST_LOCATION,
      );

      expect(edgeChargeSpy).toHaveBeenCalledWith(
        actor,
        expect.objectContaining({
          turnsAppending: 1,
        }),
      );
    });

    it("should not generate EdgeCharge below level 5", () => {
      const edgeChargeSpy = jest.spyOn(buffsAndDebuffsRepository.edgeCharge, "appender");

      spellParry.exec(
        actor,
        actorParty,
        targetParty,
        4,
        DEFAULT_TEST_LOCATION,
      );

      expect(edgeChargeSpy).not.toHaveBeenCalled();
    });
  });

  describe("Return Value Structure", () => {
    it("should return correct structure", () => {
      const result = spellParry.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(result.actor.actorId).toBe(actor.id);
      expect(result.actor.effect).toContain(ActorEffect.TestSkill);
      expect(result.targets).toHaveLength(1);
      expect(result.targets[0]?.actorId).toBe(actor.id);
      expect(result.content.en).toContain("Spell Parry");
    });

    it("should mention EdgeCharge gain at level 5", () => {
      const result = spellParry.exec(
        actor,
        actorParty,
        targetParty,
        5,
        DEFAULT_TEST_LOCATION,
      );

      expect(result.content.en).toContain("Edge Charge");
    });
  });
});

