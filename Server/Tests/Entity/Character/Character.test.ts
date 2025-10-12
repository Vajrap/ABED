import { expect, describe, it, beforeEach } from "bun:test";
import { Character } from "../../../src/Entity/Character/Character";
import { CharacterFactory } from "../../Helper/Character";
import { CharacterType } from "../../../src/InterFacesEnumsAndTypes/Enums";
import { CharacterAlignment } from "../../../src/Entity/Character/Subclass/Alignment/CharacterAlignment";
import { CharacterAttributes } from "../../../src/Entity/Character/Subclass/Stats/CharacterAttributes";
import { CharacterBattleStats } from "../../../src/Entity/Character/Subclass/Stats/CharacterBattleStats";
import { CharacterElements } from "../../../src/Entity/Character/Subclass/Stats/CharacterElements";
import { CharacterProficiencies } from "../../../src/Entity/Character/Subclass/Stats/CharacterProficiencies";
import { CharacterArtisans } from "../../../src/Entity/Character/Subclass/Stats/CharacterArtisans";
import { CharacterNeeds } from "../../../src/Entity/Character/Subclass/Needs/CharacterNeeds";
import { CharacterVitals } from "../../../src/Entity/Character/Subclass/Vitals/CharacterVitals";
import { CharacterFame } from "../../../src/Entity/Character/Subclass/Fame/CharacterFame";
import {
  ActionInput,
  defaultActionSequence,
  type CharacterActionSequence,
} from "../../../src/Entity/Character/Subclass/Action/CharacterAction";
import {
  DayOfWeek,
  TimeOfDay,
} from "../../../src/InterFacesEnumsAndTypes/Time";
import { BuffsAndDebuffsEnum } from "../../../src/Entity/BuffsAndDebuffs/enum";
import { SubRegionEnum } from "../../../src/InterFacesEnumsAndTypes/Enums/SubRegion";

describe("Character", () => {
  describe("Constructor", () => {
    it("should create character with required fields", () => {
      const alignment = new CharacterAlignment({
        good: 25,
        evil: 0,
      });
      const attributes = new CharacterAttributes();
      const battleStats = new CharacterBattleStats();
      const elements = new CharacterElements();
      const proficiencies = new CharacterProficiencies();
      const artisans = new CharacterArtisans();
      const needs = new CharacterNeeds();
      const vitals = new CharacterVitals({});
      const fame = new CharacterFame();
      const actionSequence = defaultActionSequence();

      const character = new Character({
        id: "test-char-001",
        name: "Test Character",
        type: CharacterType.humanoid,
        level: 1,
        alignment,
        artisans,
        attribute: attributes,
        battleStats,
        elements,
        proficiencies,
        needs,
        vitals,
        fame,
        actionSequence,
      });

      expect(character.id).toBe("test-char-001");
      expect(character.name).toBe("Test Character");
      expect(character.type).toBe(CharacterType.humanoid);
      expect(character.level).toBe(1);
      expect(character.gender).toBe("NONE"); // default
      expect(character.portrait).toBeNull();
      expect(character.background).toBeNull();
      expect(character.statTracker).toBe(0); // default
      expect(character.partyID).toBeNull();
      expect(character.alignment).toBe(alignment);
      expect(character.attribute).toBe(attributes);
    });

    it("should create character with optional fields", () => {
      const character = new Character({
        id: "test-char-002",
        name: "Advanced Character",
        type: CharacterType.humanoid,
        gender: "FEMALE",
        level: 5,
        portrait: "female_warrior.jpg",
        background: "Noble background",
        alignment: new CharacterAlignment({}),
        artisans: new CharacterArtisans(),
        attribute: new CharacterAttributes(),
        battleStats: new CharacterBattleStats(),
        elements: new CharacterElements(),
        proficiencies: new CharacterProficiencies(),
        needs: new CharacterNeeds(),
        vitals: new CharacterVitals({}),
        fame: new CharacterFame(),
        actionSequence: defaultActionSequence(),
        statTracker: 42,
      });

      expect(character.gender).toBe("FEMALE");
      expect(character.portrait).toBe("female_warrior.jpg");
      expect(character.background).toBe("Noble background");
      expect(character.statTracker).toBe(42);
    });

    it("should handle different character types", () => {
      const testTypes = [
        CharacterType.humanoid,
        CharacterType.beast,
        CharacterType.undead,
        CharacterType.construct,
        CharacterType.elemental,
        CharacterType.fey,
        CharacterType.fiend,
        CharacterType.celestial,
      ];

      testTypes.forEach((type) => {
        const character = new Character({
          id: `test-${type}`,
          name: `Test ${type}`,
          type,
          level: 1,
          alignment: new CharacterAlignment({}),
          artisans: new CharacterArtisans(),
          attribute: new CharacterAttributes(),
          battleStats: new CharacterBattleStats(),
          elements: new CharacterElements(),
          proficiencies: new CharacterProficiencies(),
          needs: new CharacterNeeds(),
          vitals: new CharacterVitals({}),
          fame: new CharacterFame(),
          actionSequence: defaultActionSequence(),
        });

        expect(character.type).toBe(type);
      });
    });

    it("should handle different gender options", () => {
      const genders = ["MALE", "FEMALE", "NONE"] as const;

      genders.forEach((gender) => {
        const character = new Character({
          id: `test-${gender}`,
          name: `Test ${gender}`,
          type: CharacterType.humanoid,
          gender,
          level: 1,
          alignment: new CharacterAlignment({}),
          artisans: new CharacterArtisans(),
          attribute: new CharacterAttributes(),
          battleStats: new CharacterBattleStats(),
          elements: new CharacterElements(),
          proficiencies: new CharacterProficiencies(),
          needs: new CharacterNeeds(),
          vitals: new CharacterVitals({}),
          fame: new CharacterFame(),
          actionSequence: defaultActionSequence(),
        });

        expect(character.gender).toBe(gender);
      });
    });
  });

  describe("getActionFor", () => {
    let character: Character;

    beforeEach(() => {
      character = CharacterFactory.create().build();
    });

    it("should return correct action for valid day and time combinations", () => {
      const days = Object.values(DayOfWeek);
      const times = Object.values(TimeOfDay);

      days.forEach((day) => {
        times.forEach((time) => {
          const action = character.getActionFor(day, time);
          expect(action).toBeDefined();
          expect(action.type).toBe(ActionInput.None); // default action
        });
      });
    });

    it("should return different actions when actionSequence is customized", () => {
      // Create a custom action sequence
      const customActionSequence = defaultActionSequence();
      customActionSequence[DayOfWeek.laoh][TimeOfDay.morning] = {
        type: ActionInput.TrainAttribute,
        attribute: "strength",
      };
      customActionSequence[DayOfWeek.laoh][TimeOfDay.afternoon] = {
        type: ActionInput.Rest,
      };
      customActionSequence[DayOfWeek.rowana][TimeOfDay.evening] = {
        type: ActionInput.Stroll,
      };

      const characterWithCustomActions = new Character({
        id: "custom-actions",
        name: "Custom Character",
        type: CharacterType.humanoid,
        level: 1,
        alignment: new CharacterAlignment({}),
        artisans: new CharacterArtisans(),
        attribute: new CharacterAttributes(),
        battleStats: new CharacterBattleStats(),
        elements: new CharacterElements(),
        proficiencies: new CharacterProficiencies(),
        needs: new CharacterNeeds(),
        vitals: new CharacterVitals({}),
        fame: new CharacterFame(),
        actionSequence: customActionSequence,
      });

      // Test custom actions
      const morningAction = characterWithCustomActions.getActionFor(
        DayOfWeek.laoh,
        TimeOfDay.morning,
      );
      expect(morningAction.type).toBe(ActionInput.TrainAttribute);
      if (morningAction.type === ActionInput.TrainAttribute) {
        expect(morningAction.attribute).toBe("strength");
      }

      const afternoonAction = characterWithCustomActions.getActionFor(
        DayOfWeek.laoh,
        TimeOfDay.afternoon,
      );
      expect(afternoonAction.type).toBe(ActionInput.Rest);

      const eveningAction = characterWithCustomActions.getActionFor(
        DayOfWeek.rowana,
        TimeOfDay.evening,
      );
      expect(eveningAction.type).toBe(ActionInput.Stroll);

      // Test that other slots remain default
      const nightAction = characterWithCustomActions.getActionFor(
        DayOfWeek.laoh,
        TimeOfDay.night,
      );
      expect(nightAction.type).toBe(ActionInput.None);
    });

    it("should handle all valid day combinations", () => {
      const allDays = [
        DayOfWeek.laoh,
        DayOfWeek.rowana,
        DayOfWeek.aftree,
        DayOfWeek.udur,
        DayOfWeek.matris,
        DayOfWeek.seethar,
      ];

      allDays.forEach((day) => {
        const action = character.getActionFor(day, TimeOfDay.morning);
        expect(action).toBeDefined();
        expect(action.type).toBe(ActionInput.None);
      });
    });

    it("should handle all valid time combinations", () => {
      const allTimes = [
        TimeOfDay.morning,
        TimeOfDay.afternoon,
        TimeOfDay.evening,
        TimeOfDay.night,
      ];

      allTimes.forEach((time) => {
        const action = character.getActionFor(DayOfWeek.laoh, time);
        expect(action).toBeDefined();
        expect(action.type).toBe(ActionInput.None);
      });
    });
  });

  describe("clearBuffAndDebuff", () => {
    let character: Character;

    beforeEach(() => {
      character = CharacterFactory.create().build();
    });

    it("should remove non-permanent buffs with positive values", () => {
      // Add non-permanent buffs
      character.buffsAndDebuffs.entry.set(BuffsAndDebuffsEnum.haste, {
        value: 3,
        isPerm: false,
        permValue: 0,
      });

      character.buffsAndDebuffs.entry.set(BuffsAndDebuffsEnum.slow, {
        value: 2,
        isPerm: false,
        permValue: 0,
      });

      expect(character.buffsAndDebuffs.entry.size).toBe(2);

      const result = character.clearBuffAndDebuff();

      expect(result).toBe(character); // should return self for chaining
      expect(character.buffsAndDebuffs.entry.size).toBe(0); // all removed
    });

    it("should zero out kinetic values but keep permanent buffs", () => {
      // Add permanent buffs
      character.buffsAndDebuffs.entry.set(BuffsAndDebuffsEnum.haste, {
        value: 3,
        isPerm: true,
        permValue: 1,
      });

      character.buffsAndDebuffs.entry.set(BuffsAndDebuffsEnum.timeWarp, {
        value: 2,
        isPerm: true,
        permValue: 5,
      });

      expect(character.buffsAndDebuffs.entry.size).toBe(2);

      character.clearBuffAndDebuff();

      expect(character.buffsAndDebuffs.entry.size).toBe(2); // kept

      const hasteEntry = character.buffsAndDebuffs.entry.get(
        BuffsAndDebuffsEnum.haste,
      );
      expect(hasteEntry?.value).toBe(0); // kinetic value cleared
      expect(hasteEntry?.isPerm).toBe(true); // permanent flag kept
      expect(hasteEntry?.permValue).toBe(1); // permanent value kept

      const timeWarpEntry = character.buffsAndDebuffs.entry.get(
        BuffsAndDebuffsEnum.timeWarp,
      );
      expect(timeWarpEntry?.value).toBe(0);
      expect(timeWarpEntry?.isPerm).toBe(true);
      expect(timeWarpEntry?.permValue).toBe(5);
    });

    it("should handle mixed permanent and non-permanent buffs", () => {
      // Mix of permanent and non-permanent
      character.buffsAndDebuffs.entry.set(BuffsAndDebuffsEnum.haste, {
        value: 3,
        isPerm: false,
        permValue: 0,
      });

      character.buffsAndDebuffs.entry.set(BuffsAndDebuffsEnum.slow, {
        value: 2,
        isPerm: true,
        permValue: 1,
      });

      character.buffsAndDebuffs.entry.set(BuffsAndDebuffsEnum.timeWarp, {
        value: 1,
        isPerm: false,
        permValue: 0,
      });

      expect(character.buffsAndDebuffs.entry.size).toBe(3);

      character.clearBuffAndDebuff();

      expect(character.buffsAndDebuffs.entry.size).toBe(1); // only permanent slow remains

      const slowEntry = character.buffsAndDebuffs.entry.get(
        BuffsAndDebuffsEnum.slow,
      );
      expect(slowEntry?.value).toBe(0);
      expect(slowEntry?.isPerm).toBe(true);
      expect(slowEntry?.permValue).toBe(1);

      // Non-permanent ones should be gone
      expect(
        character.buffsAndDebuffs.entry.has(BuffsAndDebuffsEnum.haste),
      ).toBe(false);
      expect(
        character.buffsAndDebuffs.entry.has(BuffsAndDebuffsEnum.timeWarp),
      ).toBe(false);
    });

    it("should ignore buffs with zero or negative values", () => {
      character.buffsAndDebuffs.entry.set(BuffsAndDebuffsEnum.haste, {
        value: 0,
        isPerm: false,
        permValue: 0,
      });

      character.buffsAndDebuffs.entry.set(BuffsAndDebuffsEnum.slow, {
        value: -1,
        isPerm: false,
        permValue: 0,
      });

      character.buffsAndDebuffs.entry.set(BuffsAndDebuffsEnum.timeWarp, {
        value: 3,
        isPerm: false,
        permValue: 0,
      });

      expect(character.buffsAndDebuffs.entry.size).toBe(3);

      character.clearBuffAndDebuff();

      // Only the positive value buff should be removed
      expect(character.buffsAndDebuffs.entry.size).toBe(2);
      expect(
        character.buffsAndDebuffs.entry.has(BuffsAndDebuffsEnum.haste),
      ).toBe(true);
      expect(
        character.buffsAndDebuffs.entry.has(BuffsAndDebuffsEnum.slow),
      ).toBe(true);
      expect(
        character.buffsAndDebuffs.entry.has(BuffsAndDebuffsEnum.timeWarp),
      ).toBe(false);
    });

    it("should handle empty buffsAndDebuffs map", () => {
      expect(character.buffsAndDebuffs.entry.size).toBe(0);

      const result = character.clearBuffAndDebuff();

      expect(result).toBe(character);
      expect(character.buffsAndDebuffs.entry.size).toBe(0);
    });
  });

  describe("intoNewsInterface", () => {
    let character: Character;

    beforeEach(() => {
      character = CharacterFactory.create()
        .withName("Test Hero")
        .withLevel(5)
        .build();
    });

    it("should convert character to news interface with all fields", () => {
      // Set a portrait
      character.portrait = "hero_portrait.png";

      const newsInterface = character.intoNewsInterface(
        SubRegionEnum.FyonarCapitalDistrict,
      );

      expect(newsInterface.name).toBe("Test Hero");
      expect(newsInterface.level).toBe(5);
      expect(newsInterface.portrait).toBe("hero_portrait.png");
      expect(newsInterface.title).toBeDefined(); // comes from title.string()
      expect(newsInterface.fame).toBeDefined(); // comes from fame.getString()
    });

    it("should handle null portrait", () => {
      character.portrait = null;

      const newsInterface = character.intoNewsInterface(
        SubRegionEnum.GoldenPlains,
      );

      expect(newsInterface.portrait).toBe("");
      expect(newsInterface.name).toBe("Test Hero");
      expect(newsInterface.level).toBe(5);
    });

    it("should work with different subregions", () => {
      const testRegions = [
        SubRegionEnum.FyonarCapitalDistrict,
        SubRegionEnum.GoldenPlains,
        SubRegionEnum.OceanTideCapitalDistrict,
        SubRegionEnum.EmeraldCanopy,
        SubRegionEnum.CrimsonIsles,
      ];

      testRegions.forEach((region) => {
        const newsInterface = character.intoNewsInterface(region);

        expect(newsInterface.name).toBe("Test Hero");
        expect(newsInterface.level).toBe(5);
        expect(newsInterface.portrait).toBe("");
        expect(newsInterface.title).toBeDefined();
        expect(newsInterface.fame).toBeDefined();
        // Note: fame string might be different based on region
      });
    });

    it("should reflect character level changes", () => {
      character.level = 1;
      let newsInterface = character.intoNewsInterface(
        SubRegionEnum.FyonarCapitalDistrict,
      );
      expect(newsInterface.level).toBe(1);

      character.level = 10;
      newsInterface = character.intoNewsInterface(
        SubRegionEnum.FyonarCapitalDistrict,
      );
      expect(newsInterface.level).toBe(10);

      character.level = 50;
      newsInterface = character.intoNewsInterface(
        SubRegionEnum.FyonarCapitalDistrict,
      );
      expect(newsInterface.level).toBe(50);
    });

    it("should reflect character name changes", () => {
      character.name = "New Name";
      const newsInterface = character.intoNewsInterface(
        SubRegionEnum.FyonarCapitalDistrict,
      );
      expect(newsInterface.name).toBe("New Name");
    });
  });

  describe("Character State Management", () => {
    let character: Character;

    beforeEach(() => {
      character = CharacterFactory.create().build();
    });

    it("should handle party assignment", () => {
      expect(character.partyID).toBeNull();

      character.partyID = "party-123";
      expect(character.partyID).toBe("party-123");

      character.partyID = null;
      expect(character.partyID).toBeNull();
    });

    it("should initialize with default collections", () => {
      expect(character.skills).toBeInstanceOf(Map);
      expect(character.skills.size).toBe(0);

      expect(character.activeSkills).toBeInstanceOf(Array);
      expect(character.activeSkills.length).toBe(0);

      expect(character.conditionalSkills).toBeInstanceOf(Array);
      expect(character.conditionalSkills.length).toBe(0);

      expect(character.skillLearningProgress).toBeInstanceOf(Map);
      expect(character.skillLearningProgress.size).toBe(0);

      expect(character.breathingSkills).toBeInstanceOf(Map);
      expect(character.breathingSkills.size).toBe(0);

      expect(character.breathingSkillsLearningProgress).toBeInstanceOf(Map);
      expect(character.breathingSkillsLearningProgress.size).toBe(0);

      expect(character.relations).toBeInstanceOf(Map);
      expect(character.relations.size).toBe(0);

      expect(character.traits).toBeInstanceOf(Array);
      expect(character.traits.length).toBe(0);

      expect(character.inventory).toBeInstanceOf(Map);
      expect(character.inventory.size).toBe(0);

      expect(character.equipments).toBeInstanceOf(Map);
      expect(character.equipments.size).toBe(0);
    });

    it("should have proper default inventory settings", () => {
      expect(character.inventorySize.base).toBe(20);
      expect(character.inventorySize.bonus).toBe(0);
    });

    it("should initialize with default abGuage", () => {
      expect(character.abGuage).toBe(0);
    });

    it("should have proper informations object", () => {
      expect(character.informations).toEqual({});
      expect(typeof character.informations).toBe("object");
    });

    it("should allow activeBreathingSkill to be null", () => {
      expect(character.activeBreathingSkill).toBeNull();
    });
  });

  describe("Integration with Subclasses", () => {
    it("should properly integrate all subclass components", () => {
      const character = CharacterFactory.create().build();

      // All subclass components should be initialized
      expect(character.alignment).toBeInstanceOf(CharacterAlignment);
      expect(character.artisans).toBeInstanceOf(CharacterArtisans);
      expect(character.attribute).toBeInstanceOf(CharacterAttributes);
      expect(character.battleStats).toBeInstanceOf(CharacterBattleStats);
      expect(character.elements).toBeInstanceOf(CharacterElements);
      expect(character.proficiencies).toBeInstanceOf(CharacterProficiencies);
      expect(character.needs).toBeInstanceOf(CharacterNeeds);
      expect(character.vitals).toBeInstanceOf(CharacterVitals);
      expect(character.fame).toBeInstanceOf(CharacterFame);
      expect(character.behavior).toBeDefined();
      expect(character.title).toBeDefined();
      expect(character.conditionalSkillsCondition).toBeDefined();
      expect(character.planarAptitude).toBeDefined();
    });

    it("should maintain references to subclass instances", () => {
      const customAlignment = new CharacterAlignment({
        good: 50,
        evil: 0,
      });
      const customAttributes = new CharacterAttributes();

      const character = new Character({
        id: "ref-test",
        name: "Reference Test",
        type: CharacterType.humanoid,
        level: 1,
        alignment: customAlignment,
        artisans: new CharacterArtisans(),
        attribute: customAttributes,
        battleStats: new CharacterBattleStats(),
        elements: new CharacterElements(),
        proficiencies: new CharacterProficiencies(),
        needs: new CharacterNeeds(),
        vitals: new CharacterVitals({}),
        fame: new CharacterFame(),
        actionSequence: defaultActionSequence(),
      });

      // Should maintain the exact same reference
      expect(character.alignment).toBe(customAlignment);
      expect(character.attribute).toBe(customAttributes);
    });
  });
});
