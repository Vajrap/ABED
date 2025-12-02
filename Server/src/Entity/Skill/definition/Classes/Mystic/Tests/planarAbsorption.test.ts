/**
 * Planar Absorption Skill Tests
 * 
 * Tests for the Planar Absorption skill's exec() function, derived from description and formula:
 * - "Gain <FORMULA> stacks of <BuffPlanarAbsorption>"
 * - Formula: (2d3 + INTmod + floor(ControlMod / 2)) * SkillLevelMultiplier
 *   (Note: Code implementation might differ slightly in order of operations, testing based on description intent or code behavior if ambiguous)
 *   Code: (Dice + Int) * Scalar + Control/2
 *   Description Formula: (Dice + Int + Control/2) * Scalar
 *   We will test for the values produced by the code as it's the implementation we are validating against regression, 
 *   but ideally we should flag discrepancy. Given instructions, I will test the code's logic to ensure it works as currently implemented.
 */

import { expect, describe, it, beforeEach, jest, afterEach } from "@jest/globals";
import { ActorEffect } from "../../../../effects";
import {
  setupSkillTestMocks,
  createTestActor,
  createTestTarget,
  clearCharacterRegistry,
  DEFAULT_TEST_LOCATION,
} from "../../../testHelpers";
import { buffsAndDebuffsRepository } from "src/Entity/BuffsAndDebuffs/repository";

import { planarAbsorption } from "../planarAbsorption";

// Mock the Dice module at module level to ensure it's hoisted
const mockRoll = jest.fn();
jest.mock("src/Utils/Dice", () => {
  const actual = jest.requireActual("src/Utils/Dice") as any;
  return {
    ...actual,
    roll: (...args: any[]) => mockRoll(...args),
  };
});

// Setup mocks
setupSkillTestMocks();

describe("Planar Absorption Skill", () => {
  let actor: any;
  let actorParty: any[];
  let targetParty: any[];

  beforeEach(() => {
    clearCharacterRegistry();

    actor = createTestActor();
    // Set INT to 14 (+2 mod)
    actor.attribute.getStat("intelligence").base = 14;
    // Set Control to 14 (+2 mod)
    actor.attribute.getStat("control").base = 14;

    actorParty = [actor];
    targetParty = [];

    jest.clearAllMocks();
    mockRoll.mockReset();
    // Reset to default implementation that uses actual roll
    const actualDice = jest.requireActual("src/Utils/Dice") as any;
    mockRoll.mockImplementation(actualDice.roll);
  });

  afterEach(() => {
    // Don't restore mocks - let each test set up its own mocks
    jest.clearAllMocks();
  });

  describe("Stack Calculation", () => {
    it("should calculate stacks correctly at level 1", () => {
      const appenderSpy = jest.spyOn(buffsAndDebuffsRepository.planarAbsorption, "appender");

      // Mock dice: 2d3 = 4
      mockRoll.mockReturnValue({ d: jest.fn(() => ({ total: 4, rolls: [2, 2] })) });

      const result = planarAbsorption.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      // Code Logic: (Dice + Int) * Scalar + Control/2
      // Dice = 4
      // Int = 2
      // Scalar (Lvl 1) = 1.1
      // Control/2 = 1
      // (4 + 2) * 1.1 + 1 = 6.6 + 1 = 7.6 -> floor -> 7
      
      // Description Formula Logic: (Dice + Int + Control/2) * Scalar
      // (4 + 2 + 1) * 1.1 = 7.7 -> floor -> 7
      // Luckily they match here due to rounding/values.
      
      expect(appenderSpy).toHaveBeenCalledWith(
        actor,
        { turnsAppending: 7 } // floor(7.6)
      );

      expect(result.content.en).toContain("gaining 7 stacks");
    });

    it("should calculate stacks correctly at level 5", () => {
      const appenderSpy = jest.spyOn(buffsAndDebuffsRepository.planarAbsorption, "appender");

      // Mock dice: 2d3 = 4
      const mockDiceObject: any = {
        rolls: [2, 2],
        d: jest.fn(function(this: any) {
          return this; // Return same object for chaining
        }),
      };
      // Define total as a getter to match the real Dice class
      Object.defineProperty(mockDiceObject, 'total', {
        get: function() {
          return this.rolls.reduce((a: number, b: number) => a + b, 0);
        },
        enumerable: true,
        configurable: true
      });
      // Bind d to the object so 'this' works correctly
      mockDiceObject.d = mockDiceObject.d.bind(mockDiceObject);
      
      mockRoll.mockReturnValue(mockDiceObject as any);

      planarAbsorption.exec(
        actor,
        actorParty,
        targetParty,
        5,
        DEFAULT_TEST_LOCATION,
      );

      // Code Logic: (Dice + Int) * Scalar + Control/2
      // Dice = 4 (mocked)
      // Int = 2 (INTmod from 14 base)
      // Scalar (Lvl 5) = 1 + (0.1 * 5) = 1.5
      // Control/2 = 1 (ControlMod from 14 base = 2, floor(2/2) = 1)
      // (4 + 2) * 1.5 + 1 = 9 + 1 = 10
      // Note: Description says (2d3 + INTmod + floor(ControlMod/2)) × Scalar
      // but code does (2d3 + INTmod) × Scalar + floor(ControlMod/2)
      // Test matches actual code implementation
      
      expect(appenderSpy).toHaveBeenCalledWith(
        actor,
        { turnsAppending: 10 }
      );
    });
  });
});
