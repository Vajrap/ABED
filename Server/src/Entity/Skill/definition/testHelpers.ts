/**
 * Shared Test Helpers for Skill Tests
 * 
 * Provides common setup and utilities for testing skill exec() functions.
 * This reduces duplication across all skill test files.
 * 
 * Position Mapping:
 * - Front row (row 0): positions 0, 1, 2
 * - Back row (row 1): positions 3, 4, 5
 * - Formula: position = row * 3 + col
 */

import { jest } from "@jest/globals";
import { CharacterFactory } from "../../../../Tests/Helper/Character";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { SwordId } from "src/Entity/Item/Equipment/Weapon/type";
import { CharacterEquipmentSlot } from "src/InterFacesEnumsAndTypes/Enums";
import { equipDirect } from "src/Entity/Item/Equipment/equipDirect";
import { activeCharacterRegistry } from "src/Entity/Character/repository";
import type { Character } from "src/Entity/Character/Character";

/**
 * Convert row and column to position number
 * @param row - Row number (0 = front, 1 = back)
 * @param col - Column number (0, 1, or 2)
 * @returns Position number (0-5)
 */
export function positionFromRowCol(row: 0 | 1, col: 0 | 1 | 2): 0 | 1 | 2 | 3 | 4 | 5 {
  return (row * 3 + col) as 0 | 1 | 2 | 3 | 4 | 5;
}

/**
 * Convert position number to row and column
 * @param position - Position number (0-5)
 * @returns Object with row and col properties
 */
export function positionToRowCol(position: 0 | 1 | 2 | 3 | 4 | 5): { row: 0 | 1; col: 0 | 1 | 2 } {
  const row = Math.floor(position / 3) as 0 | 1;
  const col = (position % 3) as 0 | 1 | 2;
  return { row, col };
}

/**
 * Setup mocks for skill test dependencies
 * Note: getTarget and resolveDamage should be mocked using jest.spyOn in individual tests
 * to allow for more flexible test scenarios
 */
export function setupSkillTestMocks() {
  jest.mock("src/Entity/BreathingSkill/activeBreathingSkill", () => ({
    resolveBreathingSkillInBattle: jest.fn(),
  }));

  jest.mock("src/Entity/Trait/repository", () => ({
    traitRepository: {},
  }));

  jest.mock("src/Entity/Battle/BattleContext", () => ({
    getBattleStatistics: jest.fn(() => null),
  }));
}

/**
 * Create a test actor character with default setup
 */
export function createTestActor(overrides?: {
  id?: string;
  name?: { en: string; th: string };
  position?: 0 | 1 | 2 | 3 | 4 | 5;
  row?: 0 | 1;
  col?: 0 | 1 | 2;
}): Character {
  const actor = CharacterFactory.create()
    .withName(overrides?.name || { en: "Warrior", th: "นักรบ" })
    .build();
  
  actor.id = overrides?.id || "actor-1";
  // If row/col provided, convert to position; otherwise use position or default to 0
  if (overrides?.row !== undefined && overrides?.col !== undefined) {
    actor.position = positionFromRowCol(overrides.row, overrides.col);
  } else {
    actor.position = overrides?.position || 0;
  }
  actor.vitals.sp.current = 100;
  actor.vitals.hp.current = 100;
  actor.vitals.mp.current = 100;
  
  // Register in activeCharacterRegistry
  activeCharacterRegistry[actor.id] = actor;
  
  // Setup default weapon
  equipDirect(actor, SwordId.ShortSword, CharacterEquipmentSlot.rightHand);
  
  // Setup default stats
  actor.attribute.getStat("strength").base = 16; // +3 mod
  actor.attribute.getStat("dexterity").base = 14; // +2 mod
  actor.battleStats.getStat("pATK").base = 5;
  actor.battleStats.getStat("pHIT").base = 10;
  
  return actor;
}

/**
 * Create a test target character with default setup
 */
export function createTestTarget(overrides?: {
  id?: string;
  name?: { en: string; th: string };
  position?: 0 | 1 | 2 | 3 | 4 | 5;
  row?: 0 | 1;
  col?: 0 | 1 | 2;
}): Character {
  const target = CharacterFactory.create()
    .withName(overrides?.name || { en: "Enemy", th: "ศัตรู" })
    .build();
  
  target.id = overrides?.id || "target-1";
  // If row/col provided, convert to position; otherwise use position or default to 0
  if (overrides?.row !== undefined && overrides?.col !== undefined) {
    target.position = positionFromRowCol(overrides.row, overrides.col);
  } else {
    target.position = overrides?.position || 0;
  }
  target.vitals.hp.current = 100;
  target.vitals.sp.current = 100;
  target.vitals.mp.current = 100;
  
  // Register in activeCharacterRegistry
  activeCharacterRegistry[target.id] = target;
  
  // Setup default stats
  target.battleStats.getStat("pDEF").base = 3;
  target.battleStats.getStat("dodge").base = 5;
  target.attribute.getStat("endurance").base = 14; // +2 mod
  target.attribute.getStat("agility").base = 12; // +1 mod
  
  return target;
}

/**
 * Clear the active character registry
 */
export function clearCharacterRegistry() {
  Object.keys(activeCharacterRegistry).forEach(key => {
    delete activeCharacterRegistry[key];
  });
}

/**
 * Default location for tests
 */
export const DEFAULT_TEST_LOCATION = LocationsEnum.WaywardInn;

/**
 * Mock getTarget to return a target
 * @param target - The target character to return (or null for no target)
 * @returns The spy object for further customization
 */
export function mockGetTarget(target: Character | null = null) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const getTargetModule = require("src/Entity/Battle/getTarget");
  const spy = jest.spyOn(getTargetModule, "getTarget");
  const mockTargetSelector = {
    one: () => target || undefined,
    all: () => target ? [target] : [],
    from: jest.fn(() => mockTargetSelector),
  };
  spy.mockImplementation(() => mockTargetSelector as any);
  return spy;
}

/**
 * Mock resolveDamage to return a damage result
 * @param result - The damage result to return
 * @returns The spy object for further customization
 */
export function mockResolveDamage(result: {
  actualDamage: number;
  damageType: any;
  isHit: boolean;
  isCrit: boolean;
}) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const resolveDamageModule = require("src/Entity/Battle/damageResolution");
  const spy = jest.spyOn(resolveDamageModule, "resolveDamage");
  spy.mockReturnValue(result);
  return spy;
}

