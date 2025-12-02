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
    // Note: Divine Strike uses withAttributeBonus: false, so mock returns base weapon damage only
    jest.spyOn(getWeaponDamageOutputModule, "getWeaponDamageOutput").mockImplementation(() => ({
      damage: 10, // Base weapon damage (no attribute modifiers)
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

      // Formula: ((WeaponWithoutAtrMod * 1.2) + ((STR + WIL) / 2)) * Multiplier * Range
      // Weapon = 10 (base, no mods)
      // STR = 3
      // WIL = 2
      // Multiplier (Lvl 1) = 1.1
      // Range = 1
      // Base = (10 * 1.2) + ((3 + 2) / 2) = 12 + 2.5 = 14.5
      // Total = 14.5 * 1.1 * 1 = 15.95 -> floor(15.95) = 15
      
      expect(resolveDamageSpy).toHaveBeenCalledWith(
        actor.id,
        target.id,
        expect.objectContaining({
          damage: 15,
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

      // Base Damage = 15 (from previous test)
      // Bonus = 4
      // Total = 19
      
      expect(resolveDamageSpy).toHaveBeenCalledWith(
        actor.id,
        target.id,
        expect.objectContaining({
          damage: 19,
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
      // WeaponDamageWithoutAtrMod = 10
      // STR mod = 3, WIL mod = 2
      // Base = (10 * 1.2) + ((3 + 2) / 2) = 12 + 2.5 = 14.5
      // Multiplier (Lvl 5) = 1.5
      // Base Total = 14.5 * 1.5 = 21.75 -> 21
      // Bonus = 7
      // Total = 28
      
      expect(resolveDamageSpy).toHaveBeenCalledWith(
        actor.id,
        target.id,
        expect.objectContaining({
          damage: 28,
        }),
        DEFAULT_TEST_LOCATION,
      );
    });
  });
});
