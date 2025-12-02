/**
 * Bash Skill Tests
 * 
 * Tests for the Bash skill's exec() function, covering:
 * - No target handling
 * - Damage formula: WeaponDamage + STRmod × MeleeRangePenalty
 * - Stun debuff on failed DC8 + STRmod endurance save
 * - Return value structure
 * 
 * Note: Equipment requirements and resource consumption are tested separately.
 */

import { expect, describe, it, beforeEach, jest, afterEach } from "@jest/globals";
import { bash } from "../bash";
import { ActorEffect, TargetEffect } from "../../../../effects";
import {
  setupSkillTestMocks,
  createTestActor,
  createTestTarget,
  clearCharacterRegistry,
  DEFAULT_TEST_LOCATION,
  mockGetTarget,
  mockResolveDamage,
} from "../../../testHelpers";
import * as getWeaponDamageOutputModule from "src/Utils/getWeaponDamgeOutput";
import * as getPositionModifierModule from "src/Utils/getPositionModifier";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";
import { debuffsRepository } from "src/Entity/BuffsAndDebuffs/repository";

// Setup mocks
setupSkillTestMocks();

describe("Bash Skill", () => {
  let actor: any;
  let target: any;
  let actorParty: any[];
  let targetParty: any[];

  beforeEach(() => {
    clearCharacterRegistry();

    actor = createTestActor();
    actor.attribute.getStat("strength").base = 16; // +3 mod
    
    target = createTestTarget();

    actorParty = [actor];
    targetParty = [target];

    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("No Target Handling", () => {
    it("should return appropriate message when no target is found", () => {
      mockGetTarget(null);

      const result = bash.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(result.content.en).toContain("tried to bash");
      expect(result.content.en).toContain("no target");
      expect(result.actor.actorId).toBe(actor.id);
      expect(result.actor.effect).toContain(ActorEffect.TestSkill);
      expect(result.targets).toHaveLength(0);
    });
  });

  describe("Stun Debuff", () => {
    it("should apply Stun debuff when target fails DC8 + STRmod endurance save", () => {
      mockGetTarget(target);
      
      const mockWeaponDamage = {
        damage: 10,
        hit: 15,
        crit: 5,
        type: DamageType.blunt,
      };
      
      jest.spyOn(getWeaponDamageOutputModule, "getWeaponDamageOutput").mockReturnValue(mockWeaponDamage);
      jest.spyOn(getPositionModifierModule, "getPositionModifier").mockReturnValue(1.0);

      // STRmod = +3, so DC = 8 + 3 = 11
      // Target fails save (roll < 11)
      jest.spyOn(target, "rollSave").mockReturnValue(8);

      mockResolveDamage({
        actualDamage: 5,
        damageType: DamageType.blunt,
        isHit: true,
        isCrit: false,
      });

      const stunSpy = jest.spyOn(debuffsRepository.stun, "appender");

      const result = bash.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(stunSpy).toHaveBeenCalledWith(
        target,
        { turnsAppending: 1 },
      );
      expect(result.content.en).toContain("stunned");
    });

    it("should not apply Stun when target passes save", () => {
      mockGetTarget(target);
      
      const mockWeaponDamage = {
        damage: 10,
        hit: 15,
        crit: 5,
        type: DamageType.blunt,
      };
      
      jest.spyOn(getWeaponDamageOutputModule, "getWeaponDamageOutput").mockReturnValue(mockWeaponDamage);
      jest.spyOn(getPositionModifierModule, "getPositionModifier").mockReturnValue(1.0);

      // STRmod = +3, so DC = 8 + 3 = 11
      // Target passes save (roll >= 11)
      jest.spyOn(target, "rollSave").mockReturnValue(15);

      mockResolveDamage({
        actualDamage: 5,
        damageType: DamageType.blunt,
        isHit: true,
        isCrit: false,
      });

      const stunSpy = jest.spyOn(debuffsRepository.stun, "appender");

      const result = bash.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(stunSpy).not.toHaveBeenCalled();
      expect(result.content.en).not.toContain("stunned");
    });
  });

  describe("Return Structure", () => {
    it("should return correct TurnResult structure", () => {
      mockGetTarget(target);
      
      const mockWeaponDamage = {
        damage: 10,
        hit: 15,
        crit: 5,
        type: DamageType.blunt,
      };
      
      jest.spyOn(getWeaponDamageOutputModule, "getWeaponDamageOutput").mockReturnValue(mockWeaponDamage);
      jest.spyOn(getPositionModifierModule, "getPositionModifier").mockReturnValue(1.0);

      jest.spyOn(target, "rollSave").mockReturnValue(15);

      mockResolveDamage({
        actualDamage: 5,
        damageType: DamageType.blunt,
        isHit: true,
        isCrit: false,
      });

      const result = bash.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(result).toHaveProperty("content");
      expect(result.content).toHaveProperty("en");
      expect(result.content).toHaveProperty("th");
      expect(result.actor).toHaveProperty("actorId", actor.id);
      expect(result.actor).toHaveProperty("effect");
      expect(result.actor.effect).toContain(ActorEffect.TestSkill);
      expect(result.targets).toHaveLength(1);
      expect(result.targets[0]).toHaveProperty("actorId", target.id);
      expect(result.targets[0]).toHaveProperty("effect");
      expect(result.targets[0]?.effect).toContain(TargetEffect.TestSkill);
    });
  });
});

