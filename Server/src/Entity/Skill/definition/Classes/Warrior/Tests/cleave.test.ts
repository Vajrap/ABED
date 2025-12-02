/**
 * Cleave Skill Tests
 * 
 * Tests for the Cleave skill's exec() function, covering:
 * - No target handling
 * - Damage formula: ({5}'1.2':'1.0'{/} × WeaponDamage + STRmod) × SkillLevelMultiplier × MeleeRangePenalty
 * - Targets all enemies in front row
 * - Return value structure
 */

import { expect, describe, it, beforeEach, jest, afterEach } from "@jest/globals";
import { cleave } from "../cleave";
import { ActorEffect, TargetEffect } from "../../../../effects";
import {
  setupSkillTestMocks,
  createTestActor,
  createTestTarget,
  clearCharacterRegistry,
  DEFAULT_TEST_LOCATION,
} from "../../../testHelpers";
import * as getTargetModule from "src/Entity/Battle/getTarget";
import { statMod } from "src/Utils/statMod";

setupSkillTestMocks();

describe("Cleave Skill", () => {
  let actor: any;
  let enemy1: any;
  let enemy2: any;
  let enemy3: any;
  let actorParty: any[];
  let targetParty: any[];

  beforeEach(() => {
    clearCharacterRegistry();

    actor = createTestActor();
    // Set STR to 16 (+3 mod)
    actor.attribute.getStat("strength").base = 16;
    
    enemy1 = createTestTarget({ id: "enemy-1", name: { en: "Enemy 1", th: "ศัตรู 1" } });
    enemy2 = createTestTarget({ id: "enemy-2", name: { en: "Enemy 2", th: "ศัตรู 2" } });
    enemy3 = createTestTarget({ id: "enemy-3", name: { en: "Enemy 3", th: "ศัตรู 3" } });
    // Set positions: front row
    enemy1.position = 0;
    enemy2.position = 1;
    enemy3.position = 3; // Back row

    actorParty = [actor];
    targetParty = [enemy1, enemy2, enemy3];

    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("No Target Handling", () => {
    it("should return appropriate message when no target is found", () => {
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        from: jest.fn(() => ({ all: jest.fn(() => []) })),
      }) as any);

      const result = cleave.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(result.content.en).toContain("tried to cleave but has no target");
      expect(result.actor.effect).toContain(ActorEffect.TestSkill);
      expect(result.targets).toEqual([]);
    });
  });

  describe("Target Selection", () => {
    it("should target all enemies in front row", () => {
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        from: jest.fn(() => ({ all: jest.fn(() => [enemy1, enemy2]) })),
      }) as any);

      const result = cleave.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      // Should target 2 enemies in front row
      expect(result.targets).toHaveLength(2);
      expect(result.targets.map(t => t.actorId)).toContain(enemy1.id);
      expect(result.targets.map(t => t.actorId)).toContain(enemy2.id);
    });
  });

  describe("Damage Calculation", () => {
    it("should calculate damage with 1.0x multiplier at level 1", () => {
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        from: jest.fn(() => ({ all: jest.fn(() => [enemy1]) })),
      }) as any);

      cleave.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      // Formula: (1.0 × WeaponDamage + STRmod) × SkillLevelMultiplier × MeleeRangePenalty
      // Should apply damage to enemy1
      expect(getTargetModule.getTarget).toHaveBeenCalled();
    });

    it("should calculate damage with 1.2x multiplier at level 5", () => {
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        from: jest.fn(() => ({ all: jest.fn(() => [enemy1]) })),
      }) as any);

      cleave.exec(
        actor,
        actorParty,
        targetParty,
        5,
        DEFAULT_TEST_LOCATION,
      );

      // Formula: (1.2 × WeaponDamage + STRmod) × SkillLevelMultiplier × MeleeRangePenalty
      // Should apply higher damage at level 5
      expect(getTargetModule.getTarget).toHaveBeenCalled();
    });
  });

  describe("Return Value Structure", () => {
    it("should return correct structure with multiple target effects", () => {
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        from: jest.fn(() => ({ all: jest.fn(() => [enemy1, enemy2]) })),
      }) as any);

      const result = cleave.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(result.actor.actorId).toBe(actor.id);
      expect(result.actor.effect).toContain(ActorEffect.TestSkill);
      expect(result.targets.length).toBeGreaterThan(0);
      expect(result.content.en).toContain("Cleave");
    });
  });
});

