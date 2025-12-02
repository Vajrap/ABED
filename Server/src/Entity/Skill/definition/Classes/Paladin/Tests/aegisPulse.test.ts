/**
 * Aegis Pulse Skill Tests
 * 
 * Tests for the Aegis Pulse skill's exec() function, derived from description and formula:
 * - "Heal all allies for <FORMULA> HP" -> Heal verification
 * - "Deal <FORMULA> holy damage to all enemies" -> Damage verification
 * - Formula: (1d4 + WILmod) * SkillLevelMultiplier
 * - Requirement: Must have Aegis Pulse buff
 */

import { expect, describe, it, beforeEach, jest, afterEach } from "@jest/globals";
import { aegisPulse } from "../aegisPulse";
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
import { BuffEnum } from "src/Entity/BuffsAndDebuffs/enum";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";

// Setup mocks
setupSkillTestMocks();

describe("Aegis Pulse Skill", () => {
  let actor: any;
  let ally: any;
  let enemy: any;
  let actorParty: any[];
  let targetParty: any[];

  beforeEach(() => {
    clearCharacterRegistry();

    actor = createTestActor();
    // Set WIL to 16 (+3 mod)
    actor.attribute.getStat("willpower").base = 16;
    
    ally = createTestActor({ id: "ally-1", name: { en: "Ally 1", th: "พันธมิตร 1" } });
    enemy = createTestTarget({ id: "enemy-1", name: { en: "Enemy 1", th: "ศัตรู 1" } });

    actorParty = [actor, ally];
    targetParty = [enemy];

    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("Requirements", () => {
    it("should fail if actor does not have Aegis Pulse buff", () => {
      // Ensure no buff
      actor.buffsAndDebuffs.buffs.entry.clear();

      const result = aegisPulse.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(result.content.en).toContain("doesn't have the Aegis Pulse buff");
      expect(result.targets).toHaveLength(0);
    });
  });

  describe("Heal and Damage", () => {
    it("should heal allies and damage enemies correctly", () => {
      // Add buff
      actor.buffsAndDebuffs.buffs.entry.set(BuffEnum.aegisPulse, { value: 1 });

      jest.spyOn(getTargetModule, "getTarget").mockImplementation(() => ({
        all: jest.fn(() => [enemy]),
      }) as any);

      // Mock dice: 1d4 = 3
      jest.spyOn(rollModule, "roll").mockImplementation(() => ({
        d: jest.fn(() => ({
          total: 3,
          rolls: [3],
        })),
      }) as any);

      const resolveDamageSpy = mockResolveDamage({
        actualDamage: 10,
        damageType: DamageType.radiance,
        isHit: true,
        isCrit: false,
      });

      const incHpSpy = jest.spyOn(ally.vitals, "incHp");

      aegisPulse.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      // Formula: (1d4 + WIL) * Multiplier
      // 1d4 = 3
      // WIL = 3
      // Multiplier (Lvl 1) = 1.1
      // Total = (3 + 3) * 1.1 = 6.6 -> floor(6.6) = 6
      
      // Verify Heal
      expect(incHpSpy).toHaveBeenCalledWith(6);

      // Verify Damage
      expect(resolveDamageSpy).toHaveBeenCalledWith(
        actor.id,
        enemy.id,
        expect.objectContaining({
          damage: 6,
          type: DamageType.radiance,
        }),
        DEFAULT_TEST_LOCATION,
      );

      // Verify Buff Removal
      expect(actor.buffsAndDebuffs.buffs.entry.has(BuffEnum.aegisPulse)).toBe(false);
    });
  });
});
