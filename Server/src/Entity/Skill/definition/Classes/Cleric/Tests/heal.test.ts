/**
 * Heal Skill Tests
 * 
 * Tests for the Heal skill's exec() function, covering:
 * - No target handling (no valid allies)
 * - Healing formula: 1d6 + WILmod + skill level
 * - Debuff removal at level 3+
 * - Target selection (ally with least HP percentage)
 * - Return value structure
 * 
 * Note: Equipment requirements and resource consumption are tested separately.
 */

import { expect, describe, it, beforeEach, jest, afterEach } from "@jest/globals";
import { heal } from "../heal";
import { ActorEffect, TargetEffect } from "../../../../effects";
import {
  setupSkillTestMocks,
  createTestActor,
  createTestTarget,
  clearCharacterRegistry,
  DEFAULT_TEST_LOCATION,
} from "../../../testHelpers";
import * as getTargetModule from "src/Entity/Battle/getTarget";
import * as rollModule from "src/Utils/Dice";
import { DebuffEnum } from "src/Entity/BuffsAndDebuffs/enum";
import { debuffsRepository } from "src/Entity/BuffsAndDebuffs/repository";

// Setup mocks
setupSkillTestMocks();

describe("Heal Skill", () => {
  let actor: any;
  let ally1: any;
  let ally2: any;
  let actorParty: any[];
  let targetParty: any[];

  beforeEach(() => {
    clearCharacterRegistry();

    actor = createTestActor();
    // Setup actor with willpower for healing
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

  describe("No Target Handling", () => {
    it("should return appropriate message when no valid allies are found", () => {
      const emptyParty = [actor];
      
      const result = heal.exec(
        actor,
        emptyParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(result.content.en).toContain("tried to heal");
      expect(result.content.en).toContain("no valid target");
      expect(result.actor.actorId).toBe(actor.id);
      expect(result.actor.effect).toContain(ActorEffect.TestSkill);
      expect(result.targets).toHaveLength(0);
    });
  });

  describe("Healing Formula", () => {
    it("should heal for 1d6 + WILmod + skill level at level 1", () => {
      // Mock dice: 1d6 = 4, WILmod = +3, skill level = 1, so total = 8
      jest.spyOn(rollModule, "roll").mockImplementation(() => ({
        d: jest.fn(() => ({
          total: 4,
          rolls: [4],
        })),
      }) as any);

      // Mock getTarget to return ally1
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        with: jest.fn(() => ({
          one: jest.fn(() => ally1),
        })),
      }) as any);

      // Ensure ally has room to heal - set max HP high and current low
      ally1.vitals.hp.setBase(200);
      ally1.vitals.hp.setCurrent(50); // Set to injured state
      const beforeHp = ally1.vitals.hp.current;

      const result = heal.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      // Expected heal: 4 + 3 + 1 = 8
      const actualHeal = ally1.vitals.hp.current - beforeHp;
      expect(actualHeal).toBeGreaterThanOrEqual(8);
      expect(result.content.en).toContain("healed");
      expect(result.content.en).toContain("HP");
      expect(result.targets).toHaveLength(1);
      expect(result.targets[0]?.actorId).toBe(ally1.id);
    });

    it("should scale healing with skill level", () => {
      jest.spyOn(rollModule, "roll").mockImplementation(() => ({
        d: jest.fn(() => ({
          total: 4,
          rolls: [4],
        })),
      }) as any);

      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        with: jest.fn(() => ({
          one: jest.fn(() => ally1),
        })),
      }) as any);

      // Ensure ally has room to heal - set max HP high and current low
      ally1.vitals.hp.setBase(200);
      ally1.vitals.hp.setCurrent(50);
      const beforeHp = ally1.vitals.hp.current;

      heal.exec(
        actor,
        actorParty,
        targetParty,
        5,
        DEFAULT_TEST_LOCATION,
      );

      // Expected heal at level 5: 4 + 3 + 5 = 12
      const actualHeal = ally1.vitals.hp.current - beforeHp;
      expect(actualHeal).toBeGreaterThanOrEqual(12);
    });
  });

  describe("Debuff Removal", () => {
    it("should not remove debuff at level 1", () => {
      jest.spyOn(rollModule, "roll").mockImplementation(() => ({
        d: jest.fn(() => ({
          total: 4,
          rolls: [4],
        })),
      }) as any);

      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        with: jest.fn(() => ({
          one: jest.fn(() => ally1),
        })),
      }) as any);

      // Add a debuff
      debuffsRepository.dazed.appender(ally1, { turnsAppending: 1 });
      const debuffCountBefore = ally1.buffsAndDebuffs.debuffs.entry.size;

      const result = heal.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      // Debuff should still be there
      expect(ally1.buffsAndDebuffs.debuffs.entry.size).toBe(debuffCountBefore);
      expect(result.content.en).not.toContain("cleansed");
    });

    it("should remove one random debuff at level 3+", () => {
      jest.spyOn(rollModule, "roll").mockImplementation(() => ({
        d: jest.fn(() => ({
          total: 4,
          rolls: [4],
        })),
      }) as any);

      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        with: jest.fn(() => ({
          one: jest.fn(() => ally1),
        })),
      }) as any);

      // Add multiple debuffs
      debuffsRepository.dazed.appender(ally1, { turnsAppending: 1 });
      debuffsRepository.exposed.appender(ally1, { turnsAppending: 1, universalCounter: 2 });
      const debuffCountBefore = ally1.buffsAndDebuffs.debuffs.entry.size;
      expect(debuffCountBefore).toBeGreaterThan(0);

      const result = heal.exec(
        actor,
        actorParty,
        targetParty,
        3,
        DEFAULT_TEST_LOCATION,
      );

      // One debuff should be removed
      expect(ally1.buffsAndDebuffs.debuffs.entry.size).toBe(debuffCountBefore - 1);
      expect(result.content.en).toContain("cleansed");
    });

    it("should not remove debuff if target has no debuffs at level 3+", () => {
      jest.spyOn(rollModule, "roll").mockImplementation(() => ({
        d: jest.fn(() => ({
          total: 4,
          rolls: [4],
        })),
      }) as any);

      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        with: jest.fn(() => ({
          one: jest.fn(() => ally1),
        })),
      }) as any);

      // Ensure no debuffs
      ally1.buffsAndDebuffs.debuffs.entry.clear();

      const result = heal.exec(
        actor,
        actorParty,
        targetParty,
        3,
        DEFAULT_TEST_LOCATION,
      );

      // Should still heal but no cleanse message
      expect(result.content.en).toContain("healed");
      expect(result.content.en).not.toContain("cleansed");
    });
  });

  describe("Target Selection", () => {
    it("should target ally with least HP percentage", () => {
      jest.spyOn(rollModule, "roll").mockImplementation(() => ({
        d: jest.fn(() => ({
          total: 4,
          rolls: [4],
        })),
      }) as any);

      // Set different HP percentages using setBase to control max
      ally1.vitals.hp.setBase(100);
      ally1.vitals.hp.setCurrent(30); // 30%
      ally2.vitals.hp.setBase(100);
      ally2.vitals.hp.setCurrent(80); // 80%

      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        with: jest.fn(() => ({
          one: jest.fn(() => ally1), // Should return ally1 (lower HP%)
        })),
      }) as any);

      const result = heal.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(result.targets[0]?.actorId).toBe(ally1.id);
    });
  });

  describe("Cooldown Application", () => {
    it("should apply cooldown debuff after healing", () => {
      jest.spyOn(rollModule, "roll").mockImplementation(() => ({
        d: jest.fn(() => ({
          total: 4,
          rolls: [4],
        })),
      }) as any);

      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        with: jest.fn(() => ({
          one: jest.fn(() => ally1),
        })),
      }) as any);

      const cooldownSpy = jest.spyOn(debuffsRepository.healCooldown, "appender");

      heal.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(cooldownSpy).toHaveBeenCalledWith(
        actor,
        { turnsAppending: 3 },
      );
    });
  });

  describe("Return Structure", () => {
    it("should return correct TurnResult structure", () => {
      jest.spyOn(rollModule, "roll").mockImplementation(() => ({
        d: jest.fn(() => ({
          total: 4,
          rolls: [4],
        })),
      }) as any);

      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        with: jest.fn(() => ({
          one: jest.fn(() => ally1),
        })),
      }) as any);

      const result = heal.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(result).toHaveProperty("content");
      expect(result.content).toHaveProperty("en");
      expect(result.content).toHaveProperty("th");
      expect(result.content.en).toContain("healed");
      expect(result.actor).toHaveProperty("actorId", actor.id);
      expect(result.actor).toHaveProperty("effect");
      expect(result.actor.effect).toContain(ActorEffect.Cast);
      expect(result.targets).toHaveLength(1);
      expect(result.targets[0]).toHaveProperty("actorId", ally1.id);
      expect(result.targets[0]).toHaveProperty("effect");
      expect(result.targets[0]?.effect).toContain(TargetEffect.TestSkill);
    });
  });
});

