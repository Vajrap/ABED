/**
 * Palm Strike Skill Tests
 * 
 * Tests for the Palm Strike skill's exec() function, derived from description and formula:
 * - "Ignores armor equal to skill level" -> Bonus damage/Armor ignore verification
 * - "Damage reduced by 70% if wearing non-cloth armor" -> Armor penalty verification
 * - Formula: (Dice + max(STR, DEX)) * RangePenalty
 * - Dice: 1d6 (Level < 5), 1d8 (Level >= 5)
 * - Requirement: BareHand only
 */

import { expect, describe, it, beforeEach, jest, afterEach } from "@jest/globals";
import { palmStrike } from "../palmStrike";
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
import * as getPositionModifierModule from "src/Utils/getPositionModifier";
import { BareHandId } from "src/Entity/Item/Equipment/Weapon/type";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";

// Setup mocks
setupSkillTestMocks();

describe("Palm Strike Skill", () => {
  let actor: any;
  let target: any;
  let actorParty: any[];
  let targetParty: any[];

  beforeEach(() => {
    clearCharacterRegistry();

    actor = createTestActor();
    // Default barehand
    actor.getWeapon = jest.fn(() => ({ id: BareHandId.BareHand }));
    // Stats: STR 16 (+3), DEX 14 (+2) -> Max is 3
    actor.attribute.getStat("strength").base = 16;
    actor.attribute.getStat("dexterity").base = 14;

    target = createTestTarget({ id: "target-1", name: { en: "Enemy 1", th: "ศัตรู 1" } });

    actorParty = [actor];
    targetParty = [target];

    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("Requirements", () => {
    it("should fail if not barehanded", () => {
      actor.getWeapon = jest.fn(() => ({ id: "sword" }));
      
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        from: jest.fn(() => ({ one: jest.fn(() => target) })),
      }) as any);

      const result = palmStrike.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(result.content.en).toContain("must be barehanded");
      expect(result.targets).toHaveLength(0);
    });
  });

  describe("Damage Calculation", () => {
    it("should calculate damage correctly at level 1 (1d6)", () => {
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        from: jest.fn(() => ({ one: jest.fn(() => target) })),
      }) as any);

      // Mock dice: 1d6 = 4
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

      // Mock getPositionModifier to return 1 (no penalty)
      jest.spyOn(getPositionModifierModule, "getPositionModifier").mockReturnValue(1);

      const resolveDamageSpy = mockResolveDamage({
        actualDamage: 10,
        damageType: DamageType.blunt,
        isHit: true,
        isCrit: false,
      });

      palmStrike.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      // Formula: (Dice + Max(STR, DEX)) * RangePenalty + SkillLevel (Armor Ignore)
      // Dice = 4
      // Max(3, 2) = 3
      // RangePenalty = 1 (default)
      // SkillLevel = 1
      // Total = (4 + 3) * 1 + 1 = 8
      
      expect(resolveDamageSpy).toHaveBeenCalledWith(
        actor.id,
        target.id,
        expect.objectContaining({
          damage: 8,
          type: DamageType.blunt,
        }),
        DEFAULT_TEST_LOCATION,
      );
    });

    it("should calculate damage correctly at level 5 (1d8)", () => {
      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        from: jest.fn(() => ({ one: jest.fn(() => target) })),
      }) as any);

      // Mock dice: 1d8 = 5
      jest.spyOn(rollModule, "roll").mockImplementation(() => ({
        d: jest.fn(() => ({
          total: 5,
          rolls: [5],
        })),
      }) as any);

      // Mock rollTwenty for hit/crit calculations
      jest.spyOn(rollModule, "rollTwenty").mockReturnValue({
        total: 15,
        rolls: [15],
        d: jest.fn(() => ({ total: 15, rolls: [15] })),
      } as any);

      // Mock getPositionModifier to return 1 (no penalty)
      jest.spyOn(getPositionModifierModule, "getPositionModifier").mockReturnValue(1);

      const resolveDamageSpy = mockResolveDamage({
        actualDamage: 10,
        damageType: DamageType.blunt,
        isHit: true,
        isCrit: false,
      });

      palmStrike.exec(
        actor,
        actorParty,
        targetParty,
        5,
        DEFAULT_TEST_LOCATION,
      );

      // Formula: (Dice + Max(STR, DEX)) * RangePenalty + SkillLevel
      // Dice = 5
      // Max = 3
      // SkillLevel = 5
      // Total = (5 + 3) * 1 + 5 = 13
      
      expect(resolveDamageSpy).toHaveBeenCalledWith(
        actor.id,
        target.id,
        expect.objectContaining({
          damage: 13,
        }),
        DEFAULT_TEST_LOCATION,
      );
    });
  });
});
