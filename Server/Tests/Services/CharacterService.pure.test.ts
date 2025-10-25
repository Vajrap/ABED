import { expect, describe, it } from "@jest/globals";
import { CharacterService } from "../../src/Services/CharacterService";
import type { CharacterCreationData } from "../../src/Services/CharacterService";
import { RACES } from "../../src/Game/CharacterCreation/Races";
import { CLASSES } from "../../src/Game/CharacterCreation/Classes";
import { BACKGROUNDS } from "../../src/Game/CharacterCreation/Backgrounds";
import { CharacterType } from "../../src/InterFacesEnumsAndTypes/Enums";
import { Character } from "../../src/Entity/Character/Character";

describe("CharacterService.createCharacter - Pure Function Tests", () => {
  describe("Character Creation", () => {
    it("should create a Character entity from valid input data", () => {
      const characterData: CharacterCreationData = {
        name: "TestHero",
        gender: "MALE",
        race: "human",
        portrait: "m_human01",
        background: "retainor",
        startingClass: "fighter"
      };

      const character = CharacterService.createCharacter("test-user-id", characterData);

      expect(character).toBeInstanceOf(Character);
      expect(character.name.en).toBe("TestHero");
      expect(character.gender).toBe("MALE");
      expect(character.userId).toBe("test-user-id");
      expect(character.level).toBe(1);
      expect(character.type).toBe(CharacterType.humanoid);
    });

    it("should set character portrait and background correctly", () => {
      const characterData: CharacterCreationData = {
        name: "TestHero",
        gender: "FEMALE",
        race: "elven",
        portrait: "f_elf01",
        background: "scholar",
        startingClass: "mage"
      };

      const character = CharacterService.createCharacter("test-user-id", characterData);

      expect(character.portrait).toBe("f_elf01");
      expect(character.background).toBe("scholar");
    });

    it("should set an ID for each character", () => {
      const characterData: CharacterCreationData = {
        name: "TestHero1",
        gender: "MALE",
        race: "human",
        portrait: "m_human01",
        background: "retainor",
        startingClass: "fighter"
      };

      const character1 = CharacterService.createCharacter("test-user-id", characterData);
      const character2 = CharacterService.createCharacter("test-user-id", { ...characterData, name: "TestHero2" });

      // Both characters should have IDs assigned
      expect(character1.id).toBeDefined();
      expect(character2.id).toBeDefined();
      expect(character1.id).not.toBeNull();
      expect(character2.id).not.toBeNull();
    });
  });

  describe("Race Application", () => {
    it("should apply human race attributes correctly", () => {
      const characterData: CharacterCreationData = {
        name: "HumanHero",
        gender: "MALE",
        race: "human",
        portrait: "m_human01",
        background: "retainor",
        startingClass: "fighter"
      };

      const character = CharacterService.createCharacter("test-user-id", characterData);
      const humanRace = RACES.human;
      
      // Type guard - race should exist
      if (!humanRace) throw new Error("Human race not found in RACES");

      // Check race name
      expect(character.race).toBe(humanRace.name);
      
      // Check attributes match race base values
      expect(character.attribute.getStat("strength").base).toBe(humanRace.attributes.strength);
      expect(character.attribute.getStat("vitality").base).toBe(humanRace.attributes.vitality);
      expect(character.attribute.getStat("intelligence").base).toBe(humanRace.attributes.intelligence);
      
      // Check vitals are set (base HP/SP/MP from race, modified by addBaseVitals)
      // After addBaseVitals, the base will include attribute modifiers
      expect(character.vitals.hp.base).toBeGreaterThanOrEqual(humanRace.baseHP);
      expect(character.vitals.sp.base).toBeGreaterThanOrEqual(humanRace.baseSP);
      expect(character.vitals.mp.base).toBeGreaterThanOrEqual(humanRace.baseMP);
      
      // Check planar aptitude
      expect(character.planarAptitude.aptitude).toBe(humanRace.planarAptitude);
    });

    it("should apply elven race attributes correctly", () => {
      const characterData: CharacterCreationData = {
        name: "ElvenHero",
        gender: "FEMALE",
        race: "elven",
        portrait: "f_elf01",
        background: "scholar",
        startingClass: "mage"
      };

      const character = CharacterService.createCharacter("test-user-id", characterData);
      const elvenRace = RACES.elven;
      
      // Type guard - race should exist
      if (!elvenRace) throw new Error("Elven race not found in RACES");

      expect(character.race).toBe(elvenRace.name);
      expect(character.attribute.getStat("intelligence").base).toBe(elvenRace.attributes.intelligence);
      expect(character.attribute.getStat("charisma").base).toBe(elvenRace.attributes.charisma);
    });

    it("should handle all valid races", () => {
      const validRaces = ["human", "elven", "orc", "dwarf", "halfling"] as const;
      
      validRaces.forEach(race => {
        const characterData: CharacterCreationData = {
          name: `Test${race}`,
          gender: "MALE",
          race,
          portrait: "m_human01",
          background: "retainor",
          startingClass: "fighter"
        };

        const character = CharacterService.createCharacter("test-user-id", characterData);
        const raceDef = RACES[race];
        
        // Type guard - race should exist
        if (!raceDef) throw new Error(`${race} not found in RACES`);
        
        expect(character.race).toBe(raceDef.name);
        expect(character.name.en).toBe(`Test${race}`);
      });
    });
  });

  describe("Class Application", () => {
    it("should apply fighter class proficiencies correctly", () => {
      const characterData: CharacterCreationData = {
        name: "FighterHero",
        gender: "MALE",
        race: "human",
        portrait: "m_human01",
        background: "soldier",
        startingClass: "fighter"
      };

      const character = CharacterService.createCharacter("test-user-id", characterData);
      const fighterClass = CLASSES.fighter;
      
      // Type guard - class should exist
      if (!fighterClass) throw new Error("Fighter class not found in CLASSES");

      // Check role
      expect(character.title.role).toBe(fighterClass.role);
      
      // Check proficiencies match class values
      expect(character.proficiencies.getStat("sword").base).toBe(fighterClass.proficiencies.sword);
      expect(character.proficiencies.getStat("axe").base).toBe(fighterClass.proficiencies.axe);
      
      // Check activeSkills array exists (empty or with skills)
      expect(character.activeSkills).toBeDefined();
      expect(Array.isArray(character.activeSkills)).toBe(true);
      
      // Check inventory exists (may be empty if no starting items)
      expect(character.inventory).toBeDefined();
    });

    it("should apply mage class proficiencies correctly", () => {
      const characterData: CharacterCreationData = {
        name: "MageHero",
        gender: "FEMALE",
        race: "elven",
        portrait: "f_elf01",
        background: "scholar",
        startingClass: "mage"
      };

      const character = CharacterService.createCharacter("test-user-id", characterData);
      const mageClass = CLASSES.mage;
      
      // Type guard - class should exist
      if (!mageClass) throw new Error("Mage class not found in CLASSES");

      expect(character.title.role).toBe(mageClass.role);
      expect(character.proficiencies.getStat("staff").base).toBe(mageClass.proficiencies.staff);
    });

    it("should handle all valid classes", () => {
      const validClasses = ["fighter", "rogue", "mage", "cleric"] as const;
      
      validClasses.forEach(startingClass => {
        const characterData: CharacterCreationData = {
          name: `Test${startingClass}`,
          gender: "MALE",
          race: "human",
          portrait: "m_human01",
          background: "retainor",
          startingClass
        };

        const character = CharacterService.createCharacter("test-user-id", characterData);
        const classDef = CLASSES[startingClass];
        
        // Type guard - class should exist
        if (!classDef) throw new Error(`${startingClass} not found in CLASSES`);
        
        expect(character.title.role).toBe(classDef.role);
        expect(character.activeSkills).toBeDefined();
      });
    });
  });

  describe("Background Application", () => {
    it("should apply noble background artisan skills correctly", () => {
      const characterData: CharacterCreationData = {
        name: "RetainorHero",
        gender: "MALE",
        race: "human",
        portrait: "m_human01",
        background: "retainor",
        startingClass: "fighter"
      };

      const character = CharacterService.createCharacter("test-user-id", characterData);
      const retainorBackground = BACKGROUNDS.retainor;
      
      // Type guard - background should exist
      if (!retainorBackground) throw new Error("Retainor background not found in BACKGROUNDS");

      // Check epithet
      expect(character.title.epithet).toBe(retainorBackground.epithet);
      
      // Check artisan skills match background values
      expect(character.artisans.getStat("performance").base).toBe(retainorBackground.artisanBonuses.performance);
      expect(character.artisans.getStat("jewelry").base).toBe(retainorBackground.artisanBonuses.jewelry);
      
      // Check inventory exists (may have starting items)
      expect(character.inventory).toBeDefined();
    });

    it("should apply peasant background artisan skills correctly", () => {
      const characterData: CharacterCreationData = {
        name: "PeasantHero",
        gender: "MALE",
        race: "human",
        portrait: "m_human01",
        background: "peasant",
        startingClass: "fighter"
      };

      const character = CharacterService.createCharacter("test-user-id", characterData);
      const peasantBackground = BACKGROUNDS.peasant;
      
      // Type guard - background should exist
      if (!peasantBackground) throw new Error("Peasant background not found in BACKGROUNDS");

      expect(character.artisans.getStat("agriculture").base).toBe(peasantBackground.artisanBonuses.agriculture);
      expect(character.artisans.getStat("foraging").base).toBe(peasantBackground.artisanBonuses.foraging);
    });

    it("should handle all valid backgrounds", () => {
      const validBackgrounds = ["retainor", "peasant", "merchant", "scholar", "artisan", "soldier"] as const;
      
      validBackgrounds.forEach(background => {
        const characterData: CharacterCreationData = {
          name: `Test${background}`,
          gender: "MALE",
          race: "human",
          portrait: "m_human01",
          background,
          startingClass: "fighter"
        };

        const character = CharacterService.createCharacter("test-user-id", characterData);
        const backgroundDef = BACKGROUNDS[background];
        
        // Type guard - background should exist
        if (!backgroundDef) throw new Error(`${background} not found in BACKGROUNDS`);
        
        expect(character.title.epithet).toBe(backgroundDef.epithet);
      });
    });
  });

  describe("Character Systems Initialization", () => {
    it("should initialize all character systems", () => {
      const characterData: CharacterCreationData = {
        name: "TestHero",
        gender: "MALE",
        race: "human",
        portrait: "m_human01",
        background: "retainor",
        startingClass: "fighter"
      };

      const character = CharacterService.createCharacter("test-user-id", characterData);

      // Check all systems are initialized
      expect(character.alignment).toBeDefined();
      expect(character.artisans).toBeDefined();
      expect(character.attribute).toBeDefined();
      expect(character.proficiencies).toBeDefined();
      expect(character.battleStats).toBeDefined();
      expect(character.elements).toBeDefined();
      expect(character.needs).toBeDefined();
      expect(character.vitals).toBeDefined();
      expect(character.fame).toBeDefined();
      expect(character.title).toBeDefined();
      expect(character.actionSequence).toBeDefined();
    });

    it("should set vitals to correct values", () => {
      const characterData: CharacterCreationData = {
        name: "TestHero",
        gender: "MALE",
        race: "human",
        portrait: "m_human01",
        background: "retainor",
        startingClass: "fighter"
      };

      const character = CharacterService.createCharacter("test-user-id", characterData);

      // After addBaseVitals, current should equal max
      expect(character.vitals.hp.current).toBeGreaterThan(0);
      expect(character.vitals.sp.current).toBeGreaterThan(0);
      expect(character.vitals.mp.current).toBeGreaterThan(0);
    });

    it("should initialize empty collections", () => {
      const characterData: CharacterCreationData = {
        name: "TestHero",
        gender: "MALE",
        race: "human",
        portrait: "m_human01",
        background: "retainor",
        startingClass: "fighter"
      };

      const character = CharacterService.createCharacter("test-user-id", characterData);

      expect(character.conditionalSkills).toBeInstanceOf(Array);
      expect(character.relations).toBeInstanceOf(Map);
      expect(character.traits).toBeInstanceOf(Map);
      expect(character.equipments).toBeInstanceOf(Object);
    });
  });

  describe("Input Validation", () => {
    it("should throw error for invalid race", () => {
      const characterData: CharacterCreationData = {
        name: "TestHero",
        gender: "MALE",
        race: "invalid_race" as any,
        portrait: "m_human01",
        background: "retainor",
        startingClass: "fighter"
      };

      expect(() => {
        CharacterService.createCharacter("test-user-id", characterData);
      }).toThrow("Invalid race: invalid_race");
    });

    it("should throw error for invalid class", () => {
      const characterData: CharacterCreationData = {
        name: "TestHero",
        gender: "MALE",
        race: "human",
        portrait: "m_human01",
        background: "retainor",
        startingClass: "invalid_class" as any
      };

      expect(() => {
        CharacterService.createCharacter("test-user-id", characterData);
      }).toThrow("Invalid class: invalid_class");
    });

    it("should throw error for invalid background", () => {
      const characterData: CharacterCreationData = {
        name: "TestHero",
        gender: "MALE",
        race: "human",
        portrait: "m_human01",
        background: "invalid_background" as any,
        startingClass: "fighter"
      };

      expect(() => {
        CharacterService.createCharacter("test-user-id", characterData);
      }).toThrow("Invalid background: invalid_background");
    });
  });

  describe("Gender Handling", () => {
    it("should handle all valid genders", () => {
      const validGenders = ["MALE", "FEMALE", "NONE"] as const;
      
      validGenders.forEach(gender => {
        const characterData: CharacterCreationData = {
          name: `Test${gender}`,
          gender,
          race: "human",
          portrait: "m_human01",
          background: "retainor",
          startingClass: "fighter"
        };

        const character = CharacterService.createCharacter("test-user-id", characterData);
        expect(character.gender).toBe(gender);
      });
    });
  });
});
