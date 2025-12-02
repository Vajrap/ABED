/**
 * Hiding Skill Tests
 * 
 * Tests for the Hiding skill's exec() function, derived from description and formula:
 * - "Roll D20 + <DEXmod> against DC" -> Check roll vs DC logic
 * - DC = Base(10/8) + HighestEnemyINT + RowPenalty(5/3 if front)
 * - "If passed, gain <BuffHiding> for 2 turns" -> Buff verification
 */

import { expect, describe, it, beforeEach, jest, afterEach } from "@jest/globals";
import { hiding } from "../hiding";
import { ActorEffect, TargetEffect } from "../../../../effects";
import {
  setupSkillTestMocks,
  createTestActor,
  createTestTarget,
  clearCharacterRegistry,
  DEFAULT_TEST_LOCATION,
} from "../../../testHelpers";
import * as rollModule from "src/Utils/Dice";
import { buffsAndDebuffsRepository } from "src/Entity/BuffsAndDebuffs/repository";

// Setup mocks
setupSkillTestMocks();

describe("Hiding Skill", () => {
  let actor: any;
  let enemy: any;
  let actorParty: any[];
  let targetParty: any[];

  beforeEach(() => {
    clearCharacterRegistry();

    actor = createTestActor();
    // DEX 16 (+3)
    actor.attribute.getStat("dexterity").base = 16;
    
    enemy = createTestTarget({ id: "enemy-1", name: { en: "Enemy 1", th: "ศัตรู 1" } });
    // INT 14 (+2)
    enemy.attribute.getStat("intelligence").base = 14;

    actorParty = [actor];
    targetParty = [enemy];

    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("DC Calculation and Roll", () => {
    it("should succeed if roll meets DC (Level 1, Front Row)", () => {
      // Level 1: Base DC 10
      // Front Row: Penalty 5
      // Enemy INT: +2
      // Total DC = 10 + 2 + 5 = 17
      
      actor.position = 1; // Front row

      // Mock D20 roll
      // Need Roll + DEX(3) >= 17
      // Roll >= 14
      jest.spyOn(rollModule, "rollTwenty").mockReturnValue({
        total: 14,
        rolls: [14],
      } as any);

      const appenderSpy = jest.spyOn(buffsAndDebuffsRepository.hiding, "appender");

      const result = hiding.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(appenderSpy).toHaveBeenCalledWith(
        actor,
        { turnsAppending: 2 }
      );
      expect(result.content.en).toContain("successfully hides");
    });

    it("should fail if roll is below DC (Level 1, Front Row)", () => {
      // DC 17
      actor.position = 1;

      // Roll 13 + 3 = 16 < 17
      jest.spyOn(rollModule, "rollTwenty").mockReturnValue({
        total: 13,
        rolls: [13],
      } as any);

      const appenderSpy = jest.spyOn(buffsAndDebuffsRepository.hiding, "appender");

      const result = hiding.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(appenderSpy).not.toHaveBeenCalled();
      expect(result.content.en).toContain("fails to hide");
    });

    it("should have lower DC in back row (Level 1)", () => {
      // Level 1: Base DC 10
      // Back Row: Penalty 0
      // Enemy INT: +2
      // Total DC = 12
      
      actor.position = 4; // Back row

      // Roll 9 + 3 = 12 >= 12 (Success)
      jest.spyOn(rollModule, "rollTwenty").mockReturnValue({
        total: 9,
        rolls: [9],
      } as any);

      const result = hiding.exec(
        actor,
        actorParty,
        targetParty,
        1,
        DEFAULT_TEST_LOCATION,
      );

      expect(result.content.en).toContain("successfully hides");
    });
  });
});
