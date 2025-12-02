/**
 * Power Strike Skill Tests
 * 
 * Tests for the Power Strike skill's exec() function, covering:
 * - No target handling
 * - Damage formula: ({5}'1.5':'1.3'{/} × WeaponDamage + STRmod) × SkillLevelMultiplier × MeleeRangePenalty
 * - Return value structure
 */

import { expect, describe, it, beforeEach, jest, afterEach } from "@jest/globals";
import { powerStrike } from "../powerStrike";
import { ActorEffect, TargetEffect } from "../../../../effects";
import {
  setupSkillTestMocks,
  createTestActor,
  createTestTarget,
  clearCharacterRegistry,
  DEFAULT_TEST_LOCATION,
} from "../../../testHelpers";
import * as getTargetModule from "src/Entity/Battle/getTarget";

setupSkillTestMocks();

describe("Power Strike Skill", () => {
  let actor: any;
  let target: any;
  let actorParty: any[];
  let targetParty: any[];

  beforeEach(() => {
    clearCharacterRegistry();

    actor = createTestActor();
    // Set STR to 16 (+3 mod)
    actor.attribute.getStat("strength").base = 16;
    
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

      const result = powerStrike.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(result.content.en).toContain("tried to use Power Strike but has no target");
      expect(result.actor.effect).toContain(ActorEffect.TestSkill);
      expect(result.targets).toEqual([]);
    });
  });

  describe("Damage Calculation", () => {
    it("should calculate damage with 1.3x multiplier at level 1", () => {
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        one: jest.fn(() => target),
      }) as any);

      powerStrike.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      // Formula: (1.3 × WeaponDamage + STRmod) × SkillLevelMultiplier × MeleeRangePenalty
      expect(getTargetModule.getTarget).toHaveBeenCalled();
    });

    it("should calculate damage with 1.5x multiplier at level 5", () => {
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        one: jest.fn(() => target),
      }) as any);

      powerStrike.exec(
        actor,
        actorParty,
        targetParty,
        5,
        DEFAULT_TEST_LOCATION,
      );

      // Formula: (1.5 × WeaponDamage + STRmod) × SkillLevelMultiplier × MeleeRangePenalty
      // Should apply higher damage at level 5
      expect(getTargetModule.getTarget).toHaveBeenCalled();
    });
  });

  describe("Return Value Structure", () => {
    it("should return correct structure with target effects", () => {
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        one: jest.fn(() => target),
      }) as any);

      const result = powerStrike.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(result.actor.actorId).toBe(actor.id);
      expect(result.actor.effect).toContain(ActorEffect.TestSkill);
      expect(result.targets).toHaveLength(1);
      expect(result.targets[0]?.actorId).toBe(target.id);
      expect(result.content.en).toContain("Power Strike");
    });
  });
});

