/**
 * Bear Trap Skill Tests
 * 
 * Tests for the Bear Trap skill's exec() function, covering:
 * - Setting a trap on the battlefield (not on a specific enemy)
 * - Trap triggering when enemy uses physical attack
 * - Battle context integration
 * - Trap damage calculation: (1d6 + DEX mod) × skillLevelMultiplier
 */

import { expect, describe, it, beforeEach, jest, afterEach } from "@jest/globals";
import { bearTrap } from "../bearTrap";
import { ActorEffect } from "../../../../effects";
import {
  setupSkillTestMocks,
  createTestActor,
  createTestTarget,
  clearCharacterRegistry,
  DEFAULT_TEST_LOCATION,
} from "../../../testHelpers";
import * as getBattleModule from "src/Entity/Battle/BattleContext";
import * as rollModule from "src/Utils/Dice";
import { BasicSkillId } from "../../../../enums";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";

setupSkillTestMocks();

describe("Bear Trap Skill", () => {
  let actor: any;
  let actorParty: any[];
  let targetParty: any[];

  // Mock Battle instance
  let mockBattle: any;

  beforeEach(() => {
    clearCharacterRegistry();

    actor = createTestActor();
    // Set DEX to 16 (+3 mod)
    actor.attribute.getStat("dexterity").base = 16;

    actorParty = [actor];
    targetParty = [createTestTarget({ id: "target-1", name: { en: "Enemy 1", th: "ศัตรู 1" } })];

    // Create mock Battle instance
    mockBattle = {
      id: "battle-123",
      activeTraps: [],
      partyA: {
        characters: [actor],
      },
      partyB: {
        characters: targetParty,
      },
      allParticipants: [actor, ...targetParty],
    };

    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("Battle Context", () => {
    it("should return error message if not in battle", () => {
      jest.spyOn(getBattleModule, "getBattle").mockReturnValue(null);

      const result = bearTrap.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(result.content.en).toContain("not in battle");
      expect(result.actor.actorId).toBe(actor.id);
      expect(result.targets).toEqual([]);
    });

    it("should set trap in battle's activeTraps array", () => {
      jest.spyOn(getBattleModule, "getBattle").mockReturnValue(mockBattle);

      // Mock dice: 1d6 = 4
      jest.spyOn(rollModule, "roll").mockImplementation(() => ({
        d: jest.fn(() => ({
          total: 4,
          rolls: [4],
        })),
      }) as any);

      const result = bearTrap.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      // Should have added trap to battle
      expect(mockBattle.activeTraps.length).toBe(1);
      expect(mockBattle.activeTraps[0]).toMatchObject({
        damage: 7, // (4 + 3) × 1.0 = 7
        setterId: actor.id,
        setterPartyId: "partyA",
      });

      expect(result.content.en).toContain("sets a bear trap");
      expect(result.actor.actorId).toBe(actor.id);
      expect(result.targets).toEqual([]); // No specific target
    });
  });

  describe("Trap Damage Calculation", () => {
    it("should calculate trap damage correctly at level 1", () => {
      jest.spyOn(getBattleModule, "getBattle").mockReturnValue(mockBattle);

      // Mock dice: 1d6 = 3
      jest.spyOn(rollModule, "roll").mockImplementation(() => ({
        d: jest.fn(() => ({
          total: 3,
          rolls: [3],
        })),
      }) as any);

      bearTrap.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      // Expected: (3 + 3) × 1.0 = 6
      expect(mockBattle.activeTraps[0]?.damage).toBe(6);
    });

    it("should calculate trap damage with skill level multiplier at level 5", () => {
      jest.spyOn(getBattleModule, "getBattle").mockReturnValue(mockBattle);

      // Mock dice: 1d6 = 5
      jest.spyOn(rollModule, "roll").mockImplementation(() => ({
        d: jest.fn(() => ({
          total: 5,
          rolls: [5],
        })),
      }) as any);

      bearTrap.exec(
        actor,
        actorParty,
        targetParty,
        5,
        DEFAULT_TEST_LOCATION,
      );

      // Expected: (5 + 3) × 1.5 = 12
      expect(mockBattle.activeTraps[0]?.damage).toBe(12);
    });

    it("should store correct setter information", () => {
      jest.spyOn(getBattleModule, "getBattle").mockReturnValue(mockBattle);

      jest.spyOn(rollModule, "roll").mockImplementation(() => ({
        d: jest.fn(() => ({
          total: 4,
          rolls: [4],
        })),
      }) as any);

      bearTrap.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      const trap = mockBattle.activeTraps[0];
      expect(trap.setterId).toBe(actor.id);
      expect(trap.setterPartyId).toBe("partyA");
    });
  });

  describe("Multiple Traps", () => {
    it("should allow multiple traps to be set", () => {
      jest.spyOn(getBattleModule, "getBattle").mockReturnValue(mockBattle);

      jest.spyOn(rollModule, "roll").mockImplementation(() => ({
        d: jest.fn(() => ({
          total: 4,
          rolls: [4],
        })),
      }) as any);

      // Set first trap
      bearTrap.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(mockBattle.activeTraps.length).toBe(1);

      // Set second trap
      bearTrap.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(mockBattle.activeTraps.length).toBe(2);
    });
  });

  describe("Resource Consumption", () => {
    it("should consume 2 SP and no elements (cantrip)", () => {
      expect(bearTrap.consume.sp).toBe(2);
      expect(bearTrap.consume.elements).toEqual([]);
      expect(bearTrap.consume.hp).toBe(0);
      expect(bearTrap.consume.mp).toBe(0);
    });
  });

  describe("Trap Triggering (Integration)", () => {
    it("should verify trap structure is correct for Battle.ts to use", () => {
      jest.spyOn(getBattleModule, "getBattle").mockReturnValue(mockBattle);

      jest.spyOn(rollModule, "roll").mockImplementation(() => ({
        d: jest.fn(() => ({
          total: 4,
          rolls: [4],
        })),
      }) as any);

      bearTrap.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      const trap = mockBattle.activeTraps[0];
      
      // Verify trap has all required fields for Battle.ts to use
      expect(trap).toHaveProperty("damage");
      expect(trap).toHaveProperty("setterId");
      expect(trap).toHaveProperty("setterPartyId");
      expect(typeof trap.damage).toBe("number");
      expect(typeof trap.setterId).toBe("string");
      expect(["partyA", "partyB"]).toContain(trap.setterPartyId);
    });
  });
});

