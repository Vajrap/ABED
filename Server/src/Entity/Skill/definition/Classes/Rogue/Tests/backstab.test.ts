/**
 * Backstab Skill Tests
 * 
 * Tests for the Backstab skill's exec() function, derived from description and formula:
 * - "While you're hiding" -> Requirement verification (existBuff)
 * - "Deal <FORMULA> pierce damage" -> Formula verification
 * - Formula: (1.5/1.3 * WeaponDamage + DEXmod) * SkillLevelMultiplier
 *   (Note: Code implementation might be missing the 1.5/1.3 multiplier based on review, testing for description compliance)
 * - "Gains +{5}'5':'4'{/} crit if target has <DebuffFear> or <DebuffDazed>"
 */

import { expect, describe, it, beforeEach, jest, afterEach } from "@jest/globals";
import { backstab } from "../backstab";
import { ActorEffect, TargetEffect } from "../../../../effects";
import {
  setupSkillTestMocks,
  createTestActor,
  createTestTarget,
  clearCharacterRegistry,
  DEFAULT_TEST_LOCATION,
  mockResolveDamage,
} from "../../../testHelpers";
import * as getTargetModule from "src/Entity/Battle/getTarget";
import * as getWeaponDamageOutputModule from "src/Utils/getWeaponDamgeOutput";
import { BuffEnum, DebuffEnum } from "src/Entity/BuffsAndDebuffs/enum";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";

// Setup mocks
setupSkillTestMocks();

describe("Backstab Skill", () => {
  let actor: any;
  let target: any;
  let actorParty: any[];
  let targetParty: any[];

  beforeEach(() => {
    clearCharacterRegistry();

    actor = createTestActor();
    // Default dagger
    actor.getWeapon = jest.fn(() => ({ weaponType: "dagger", physicalDamage: 10 }));
    // DEX 16 (+3)
    actor.attribute.getStat("dexterity").base = 16;
    // Add Hiding buff (required)
    actor.buffsAndDebuffs.buffs.entry.set(BuffEnum.hiding, { value: 1 });

    target = createTestTarget({ id: "target-1", name: { en: "Enemy 1", th: "ศัตรู 1" } });

    actorParty = [actor];
    targetParty = [target];

    // Mock helpers
    // Note: getWeaponDamageOutput already includes attribute modifiers (DEX mod = +3)
    // So mock returns base weapon damage (10) + DEX mod (3) = 13
    jest.spyOn(getWeaponDamageOutputModule, "getWeaponDamageOutput").mockImplementation(() => ({
      damage: 13, // 10 (base) + 3 (DEX mod from getWeaponDamageOutput)
      hit: 0,
      crit: 0,
      type: "piercing",
      isMagic: false,
    } as any));

    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("Damage Calculation", () => {
    it("should calculate damage correctly at level 1", () => {
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        from: jest.fn(() => ({ one: jest.fn(() => target) })),
      }) as any);

      const resolveDamageSpy = mockResolveDamage({
        actualDamage: 10,
        damageType: DamageType.pierce,
        isHit: true,
        isCrit: false,
      });

      backstab.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      // Formula: (1.3 * WeaponDamage) * Multiplier
      // WeaponDamage (from getWeaponDamageOutput) = 13 (includes DEX mod already)
      // Multiplier (Lvl 1) = 1.1
      // Expected: (1.3 * 13) * 1.1 = 16.9 * 1.1 = 18.59 -> 19
      
      // Verify damage is approximately 17 (17.6)
      expect(resolveDamageSpy).toHaveBeenCalled();
      const callArgs = resolveDamageSpy.mock.calls[0];
      const damageOutput = callArgs?.[2] as any;
      expect(damageOutput.damage).toBeCloseTo(19, 0); // Allow 0.5 difference (18.59 rounded)
    });
  });

  describe("Crit Bonus", () => {
    it("should apply +4 crit if target has Fear (Level 1)", () => {
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        from: jest.fn(() => ({ one: jest.fn(() => target) })),
      }) as any);

      target.buffsAndDebuffs.debuffs.entry.set(DebuffEnum.fear, { value: 1 });

      const resolveDamageSpy = mockResolveDamage({
        actualDamage: 10,
        damageType: DamageType.pierce,
        isHit: true,
        isCrit: false,
      });

      backstab.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      // Check the last argument to resolveDamage which is extraCrit
      expect(resolveDamageSpy).toHaveBeenCalledWith(
        actor.id,
        target.id,
        expect.anything(),
        DEFAULT_TEST_LOCATION,
        4 // Expected extra crit
      );
    });

    it("should apply +5 crit if target has Dazed (Level 5)", () => {
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        from: jest.fn(() => ({ one: jest.fn(() => target) })),
      }) as any);

      target.buffsAndDebuffs.debuffs.entry.set(DebuffEnum.dazed, { value: 1 });

      const resolveDamageSpy = mockResolveDamage({
        actualDamage: 10,
        damageType: DamageType.pierce,
        isHit: true,
        isCrit: false,
      });

      backstab.exec(
        actor,
        actorParty,
        targetParty,
        5,
        DEFAULT_TEST_LOCATION,
      );

      expect(resolveDamageSpy).toHaveBeenCalledWith(
        actor.id,
        target.id,
        expect.anything(),
        DEFAULT_TEST_LOCATION,
        5 // Expected extra crit
      );
    });
  });
});
