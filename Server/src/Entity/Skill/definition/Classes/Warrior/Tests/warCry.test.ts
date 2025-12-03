/**
 * War Cry Skill Tests
 * 
 * Tests for the War Cry skill's exec() function, covering:
 * - Affects self + CHAmod closest allies
 * - Apply WarCry buff for {5}'3':'2'{/} turns
 * - Buff strength: +2 + LeadershipMod/2
 * - Return value structure
 */

import { expect, describe, it, beforeEach, jest, afterEach } from "@jest/globals";
import { warCry } from "../warCry";
import { ActorEffect, TargetEffect } from "../../../../effects";
import {
  setupSkillTestMocks,
  createTestActor,
  createTestTarget,
  clearCharacterRegistry,
  DEFAULT_TEST_LOCATION,
} from "../../../testHelpers";
import { buffsAndDebuffsRepository } from "src/Entity/BuffsAndDebuffs/repository";

setupSkillTestMocks();

describe("War Cry Skill", () => {
  let actor: any;
  let ally1: any;
  let ally2: any;
  let ally3: any;
  let actorParty: any[];
  let targetParty: any[];

  beforeEach(() => {
    clearCharacterRegistry();

    actor = createTestActor();
    // Set CHA to 14 (+2 mod), Leadership to 14 (+2 mod)
    actor.attribute.getStat("charisma").base = 14;
    actor.attribute.getStat("leadership").base = 14;
    
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

  describe("Target Selection", () => {
    it("should affect self + CHAmod allies", () => {
      const warCrySpy = jest.spyOn(buffsAndDebuffsRepository.warCry, "appender");

      warCry.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      // CHAmod = 2, so should affect self + 2 allies = 3 total
      expect(warCrySpy).toHaveBeenCalledTimes(3);
    });

    it("should affect at least self even with negative CHAmod", () => {
      actor.attribute.getStat("charisma").base = 6; // -2 mod
      actor.attribute.getStat("leadership").base = 6; // -2 mod
      
      const warCrySpy = jest.spyOn(buffsAndDebuffsRepository.warCry, "appender");

      warCry.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      // Should affect at least self (Math.max(1, 1 + Math.floor(leadershipMod)) = 1)
      // With leadership mod -2: Math.max(1, 1 + Math.floor(-2)) = Math.max(1, 1 + -2) = Math.max(1, -1) = 1
      expect(warCrySpy).toHaveBeenCalledTimes(1);
    });
  });

  describe("Buff Duration", () => {
    it("should apply buff for 2 turns at level 1", () => {
      const warCrySpy = jest.spyOn(buffsAndDebuffsRepository.warCry, "appender");

      warCry.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(warCrySpy).toHaveBeenCalledWith(
        expect.any(Object),
        expect.objectContaining({
          turnsAppending: 2,
        }),
      );
    });

    it("should apply buff for 3 turns at level 5", () => {
      const warCrySpy = jest.spyOn(buffsAndDebuffsRepository.warCry, "appender");

      warCry.exec(
        actor,
        actorParty,
        targetParty,
        5,
        DEFAULT_TEST_LOCATION,
      );

      expect(warCrySpy).toHaveBeenCalledWith(
        expect.any(Object),
        expect.objectContaining({
          turnsAppending: 3,
        }),
      );
    });
  });

  describe("Buff Strength", () => {
    it("should calculate buff strength correctly", () => {
      // Charisma 14 = +2 mod, so buff strength = Math.max(1, 2) = 2
      const warCrySpy = jest.spyOn(buffsAndDebuffsRepository.warCry, "appender");

      warCry.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      const callArgs = warCrySpy.mock.calls[0];
      // Buff strength stored in universalCounter (charisma mod, at least 1)
      expect(callArgs?.[1]?.universalCounter).toBe(2);
    });
  });

  describe("Return Value Structure", () => {
    it("should return correct structure with target effects", () => {
      const result = warCry.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(result.actor.actorId).toBe(actor.id);
      expect(result.actor.effect).toContain(ActorEffect.TestSkill);
      expect(result.targets.length).toBeGreaterThan(0);
      expect(result.content.en).toContain("War Cry");
      expect(result.content.en).toContain("agility");
      expect(result.content.en).toContain("strength");
    });
  });
});

