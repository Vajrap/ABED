/**
 * Rejuvenating Mist Skill Tests
 * 
 * Tests for the Rejuvenating Mist skill's exec() function, covering:
 * - No allies handling
 * - Regen buff application to all living allies
 * - Duration: 2 turns (3 at level 5+)
 * - Will mod stored in universalCounter (with +2 bonus at level 7+)
 * - Return value structure
 * 
 * Note: Equipment requirements and resource consumption are tested separately.
 */

import { expect, describe, it, beforeEach, jest, afterEach } from "@jest/globals";
import { rejuvenatingMist } from "../rejuvenatingMist";
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

// Setup mocks
setupSkillTestMocks();

describe("Rejuvenating Mist Skill", () => {
  let actor: any;
  let ally1: any;
  let ally2: any;
  let actorParty: any[];
  let targetParty: any[];

  beforeEach(() => {
    clearCharacterRegistry();

    actor = createTestActor();
    actor.attribute.getStat("willpower").base = 16; // +3 mod
    
    ally1 = createTestTarget({ id: "ally-1", name: { en: "Ally 1", th: "พันธมิตร 1" } });
    ally2 = createTestTarget({ id: "ally-2", name: { en: "Ally 2", th: "พันธมิตร 2" } });

    actorParty = [actor, ally1, ally2];
    targetParty = [];

    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("No Allies Handling", () => {
    it("should return appropriate message when no living allies are found", () => {
      const emptyParty: any[] = [];
      
      const result = rejuvenatingMist.exec(
        actor,
        emptyParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(result.content.en).toContain("tried to cast Rejuvenating Mist");
      expect(result.content.en).toContain("no allies");
      expect(result.actor.actorId).toBe(actor.id);
      expect(result.actor.effect).toContain(ActorEffect.TestSkill);
      expect(result.targets).toHaveLength(0);
    });
  });

  describe("Regen Buff Application", () => {
    it("should apply Regen buff to all living allies for 2 turns at level 1-4", () => {
      const regenSpy = jest.spyOn(buffsAndDebuffsRepository.regen, "appender");

      const result = rejuvenatingMist.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      // Should apply to all 3 allies (actor, ally1, ally2)
      expect(regenSpy).toHaveBeenCalledTimes(3);
      expect(regenSpy).toHaveBeenCalledWith(
        actor,
        { turnsAppending: 2, universalCounter: 3 }, // WILmod = +3
      );
      expect(regenSpy).toHaveBeenCalledWith(
        ally1,
        { turnsAppending: 2, universalCounter: 3 },
      );
      expect(regenSpy).toHaveBeenCalledWith(
        ally2,
        { turnsAppending: 2, universalCounter: 3 },
      );

      expect(result.content.en).toContain("Rejuvenating Mist");
      expect(result.content.en).toContain("Regeneration");
      expect(result.content.en).toContain("2 turn(s)");
      expect(result.targets).toHaveLength(3);
    });

    it("should apply Regen buff for 3 turns at level 5+", () => {
      const regenSpy = jest.spyOn(buffsAndDebuffsRepository.regen, "appender");

      const result = rejuvenatingMist.exec(
        actor,
        actorParty,
        targetParty,
        5,
        DEFAULT_TEST_LOCATION,
      );

      expect(regenSpy).toHaveBeenCalledWith(
        actor,
        { turnsAppending: 3, universalCounter: 3 },
      );
      expect(result.content.en).toContain("3 turn(s)");
    });

    it("should store will mod + 2 in universalCounter at level 7+", () => {
      const regenSpy = jest.spyOn(buffsAndDebuffsRepository.regen, "appender");

      rejuvenatingMist.exec(
        actor,
        actorParty,
        targetParty,
        7,
        DEFAULT_TEST_LOCATION,
      );

      // WILmod = +3, so at level 7+ it should be 3 + 2 = 5
      expect(regenSpy).toHaveBeenCalledWith(
        actor,
        { turnsAppending: 3, universalCounter: 5 },
      );
    });

    it("should not apply Regen to dead allies", () => {
      ally1.vitals.hp.setCurrent(0);
      const regenSpy = jest.spyOn(buffsAndDebuffsRepository.regen, "appender");

      rejuvenatingMist.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      // Should only apply to actor and ally2 (ally1 is dead)
      expect(regenSpy).toHaveBeenCalledTimes(2);
      expect(regenSpy).not.toHaveBeenCalledWith(
        ally1,
        expect.anything(),
      );
    });
  });

  describe("Return Structure", () => {
    it("should return correct TurnResult structure", () => {
      const result = rejuvenatingMist.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(result).toHaveProperty("content");
      expect(result.content).toHaveProperty("en");
      expect(result.content).toHaveProperty("th");
      expect(result.content.en).toContain("Rejuvenating Mist");
      expect(result.actor).toHaveProperty("actorId", actor.id);
      expect(result.actor).toHaveProperty("effect");
      expect(result.actor.effect).toContain(ActorEffect.Cast);
      expect(result.targets.length).toBeGreaterThan(0);
      result.targets.forEach(target => {
        expect(target).toHaveProperty("actorId");
        expect(target).toHaveProperty("effect");
        expect(target.effect).toContain(TargetEffect.TestSkill);
      });
    });
  });
});

