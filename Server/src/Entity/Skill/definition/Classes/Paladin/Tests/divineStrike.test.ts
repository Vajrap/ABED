/**
 * Divine Strike Skill Tests
 * 
 * Tests for the Divine Strike skill's exec() function, derived from description and formula:
 * - "Deal <FORMULA> holy damage" -> Formula verification
 * - Formula: ((WeaponDamage * 1.2) + (STRmod + WILmod)) * SkillLevelMultiplier * RangePenalty
 * - "Deal +{5}'1d10':'1d6'{/} bonus damage against undead or fiends" -> Bonus damage verification
 * - Weapon Requirement: Allowed weapons only
 */

import { expect, describe, it, beforeEach, jest, afterEach } from "@jest/globals";
import { divineStrike } from "../divineStrike";
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
import * as rollModule from "src/Utils/Dice";
import * as getWeaponDamageOutputModule from "src/Utils/getWeaponDamgeOutput";
import * as getPositionModifierModule from "src/Utils/getPositionModifier";
import * as rollModule from "src/Utils/Dice";
import { CharacterType } from "src/InterFacesEnumsAndTypes/Enums";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";

// Setup mocks
setupSkillTestMocks();

describe("Divine Strike Skill", () => {
  let actor: any;
  let target: any;
  let actorParty: any[];
  let targetParty: any[];

  beforeEach(() => {
    clearCharacterRegistry();

    actor = createTestActor();
    // Default sword
    actor.getWeapon = jest.fn(() => ({ weaponType: "sword", physicalDamage: 10 }));
    // Stats: STR 16 (+3), WIL 14 (+2)
    actor.attribute.getStat("strength").base = 16;
    actor.attribute.getStat("willpower").base = 14;

    target = createTestTarget({ id: "target-1", name: { en: "Enemy 1", th: "ศัตรู 1" } });

    actorParty = [actor];
    targetParty = [target];

    // Mock helpers
    jest.spyOn(getWeaponDamageOutputModule, "getWeaponDamageOutput").mockImplementation(() => ({
      damage: 10,
      hit: 0,
      crit: 0,
      type: "slashing",
      isMagic: false,
    } as any));

    jest.spyOn(getPositionModifierModule, "getPositionModifier").mockReturnValue(1);

    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("Requirements", () => {
    it("should fail if using disallowed weapon (e.g. bow)", () => {
      actor.getWeapon = jest.fn(() => ({ weaponType: "bow" }));

      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        from: jest.fn(() => ({ one: jest.fn(() => target) })),
      }) as any);

      const result = divineStrike.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(result.content.en).toContain("cannot use Divine Strike with bow");
      expect(result.targets).toHaveLength(0);
    });
  });

  describe("Damage Calculation", () => {
    it("should calculate damage correctly at level 1", () => {
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        from: jest.fn(() => ({ one: jest.fn(() => target) })),
      }) as any);

      // Mock rollTwenty for hit/crit calculations
      jest.spyOn(rollModule, "rollTwenty").mockReturnValue({
        total: 15,
        rolls: [15],
        d: jest.fn(() => ({ total: 15, rolls: [15] })),
      } as any);

      const resolveDamageSpy = mockResolveDamage({
        actualDamage: 10,
        damageType: DamageType.radiance,
        isHit: true,
        isCrit: false,
      });

      divineStrike.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      // Formula: ((Weapon * 1.2) + (STR + WIL)) * Multiplier * Range
      // Weapon = 10
      // STR = 3
      // WIL = 2
      // Multiplier (Lvl 1) = 1.1
      // Range = 1
      // Base = (10 * 1.2) + (3 + 2) = 12 + 5 = 17
      // Total = 17 * 1.1 * 1 = 18.7 -> floor(18.7) = 18
      
      expect(resolveDamageSpy).toHaveBeenCalledWith(
        actor.id,
        target.id,
        expect.objectContaining({
          damage: 18,
          type: DamageType.radiance,
        }),
        DEFAULT_TEST_LOCATION,
      );
    });

    it("should apply bonus damage against Undead (Level 1)", () => {
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        from: jest.fn(() => ({ one: jest.fn(() => target) })),
      }) as any);

      target.type = CharacterType.undead;

      // Mock bonus dice: 1d6 = 4
      jest.spyOn(rollModule, "roll").mockImplementation(() => ({
        d: jest.fn(() => ({
          total: 4,
          rolls: [4],
        })),
      }) as any);

      // Mock rollTwenty for hit/crit calculations
      jest.spyOn(rollModule, "rollTwenty").mockReturnValue({
        total: 15,
        rolls: [15],
        d: jest.fn(() => ({ total: 15, rolls: [15] })),
      } as any);

      const resolveDamageSpy = mockResolveDamage({
        actualDamage: 10,
        damageType: DamageType.radiance,
        isHit: true,
        isCrit: false,
      });

      divineStrike.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      // Base Damage = 18 (from previous test)
      // Bonus = 4
      // Total = 22
      
      expect(resolveDamageSpy).toHaveBeenCalledWith(
        actor.id,
        target.id,
        expect.objectContaining({
          damage: 22,
        }),
        DEFAULT_TEST_LOCATION,
      );
    });

    it("should apply enhanced bonus damage against Undead (Level 5)", () => {
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        from: jest.fn(() => ({ one: jest.fn(() => target) })),
      }) as any);

      target.type = CharacterType.undead;

      // Mock bonus dice: 1d10 = 7
      jest.spyOn(rollModule, "roll").mockImplementation(() => ({
        d: jest.fn(() => ({
          total: 7,
          rolls: [7],
        })),
      }) as any);

      // Mock rollTwenty for hit/crit calculations
      jest.spyOn(rollModule, "rollTwenty").mockReturnValue({
        total: 15,
        rolls: [15],
        d: jest.fn(() => ({ total: 15, rolls: [15] })),
      } as any);

      const resolveDamageSpy = mockResolveDamage({
        actualDamage: 10,
        damageType: DamageType.radiance,
        isHit: true,
        isCrit: false,
      });

      divineStrike.exec(
        actor,
        actorParty,
        targetParty,
        5,
        DEFAULT_TEST_LOCATION,
      );

      // Base Calculation:
      // Base = 17
      // Multiplier (Lvl 5) = 1.5
      // Base Total = 17 * 1.5 = 25.5 -> 25
      // Bonus = 7
      // Total = 32
      
      expect(resolveDamageSpy).toHaveBeenCalledWith(
        actor.id,
        target.id,
        expect.objectContaining({
          damage: 32,
        }),
        DEFAULT_TEST_LOCATION,
      );
    });
  });
});
