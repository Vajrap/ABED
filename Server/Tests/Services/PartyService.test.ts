import { expect, describe, it, beforeEach } from "bun:test";
import { PartyService } from "../../src/Services/PartyService";
import { Party } from "../../src/Entity/Party/Party";
import { PartyBehavior } from "../../src/Entity/Party/PartyBehavior";
import { LocationsEnum } from "../../src/InterFacesEnumsAndTypes/Enums/Location";
import { Character } from "../../src/Entity/Character/Character";
import { CharacterAlignment } from "../../src/Entity/Character/Subclass/Alignment/CharacterAlignment";
import { CharacterArtisans } from "../../src/Entity/Character/Subclass/Stats/CharacterArtisans";
import { CharacterAttributes } from "../../src/Entity/Character/Subclass/Stats/CharacterAttributes";
import { CharacterBattleStats } from "../../src/Entity/Character/Subclass/Stats/CharacterBattleStats";
import { CharacterElements } from "../../src/Entity/Character/Subclass/Stats/CharacterElements";
import { CharacterProficiencies } from "../../src/Entity/Character/Subclass/Stats/CharacterProficiencies";
import { CharacterNeeds } from "../../src/Entity/Character/Subclass/Needs/CharacterNeeds";
import { CharacterVitals } from "../../src/Entity/Character/Subclass/Vitals/CharacterVitals";
import { CharacterFame } from "../../src/Entity/Character/Subclass/Fame/CharacterFame";
import { defaultActionSequence } from "../../src/Entity/Character/Subclass/Action/CharacterAction";
import { CharacterType } from "../../src/InterFacesEnumsAndTypes/Enums";
import { randomUUID } from "crypto";

describe("PartyService - Unit Tests", () => {
  // Helper function to create a mock character
  function createMockCharacter(name: string = "TestHero"): Character {
    const character = new Character({
      id: randomUUID(),
      name: name,
      type: CharacterType.humanoid,
      gender: "MALE",
      level: 1,
      portrait: "m_human01",
      background: "retainor",
      alignment: new CharacterAlignment({}),
      artisans: new CharacterArtisans(),
      attribute: new CharacterAttributes(),
      proficiencies: new CharacterProficiencies(),
      battleStats: new CharacterBattleStats(),
      elements: new CharacterElements(),
      needs: new CharacterNeeds(),
      vitals: new CharacterVitals({}),
      fame: new CharacterFame(),
      actionSequence: defaultActionSequence(),
    });
    
    character.userId = "test-user-id";
    character.race = "human";
    
    return character;
  }

  describe("createParty", () => {
    it("should create a party with the character as leader", () => {
      const character = createMockCharacter("Hero");
      const location = LocationsEnum.FyonarCity;
      
      const party = PartyService.createParty(character, location);
      
      expect(party).toBeInstanceOf(Party);
      expect(party.partyID).toBe(character.id);
      expect(party.leader).toBe(character);
      expect(party.location).toBe(location);
    });

    it("should initialize party with character in first slot", () => {
      const character = createMockCharacter("Hero");
      const party = PartyService.createParty(character, LocationsEnum.FyonarCity);
      
      expect(party.characters[0]).toBe(character);
      expect(party.characters[1]).toBe("none");
      expect(party.characters[2]).toBe("none");
      expect(party.characters[3]).toBe("none");
      expect(party.characters[4]).toBe("none");
      expect(party.characters[5]).toBe("none");
    });

    it("should initialize party with default behavior", () => {
      const character = createMockCharacter("Hero");
      const party = PartyService.createParty(character, LocationsEnum.FyonarCity);
      
      expect(party.behavior).toBeInstanceOf(PartyBehavior);
      expect(party.behavior).toBeDefined();
    });

    it("should set isTraveling to false initially", () => {
      const character = createMockCharacter("Hero");
      const party = PartyService.createParty(character, LocationsEnum.FyonarCity);
      
      expect(party.isTraveling).toBe(false);
    });

    it("should set justArrived to false initially", () => {
      const character = createMockCharacter("Hero");
      const party = PartyService.createParty(character, LocationsEnum.FyonarCity);
      
      expect(party.justArrived).toBe(false);
    });

    it("should initialize empty informations object", () => {
      const character = createMockCharacter("Hero");
      const party = PartyService.createParty(character, LocationsEnum.FyonarCity);
      
      expect(party.informations).toEqual({});
    });

    it("should create party at different locations", () => {
      const character = createMockCharacter("Hero");
      
      const locations = [
        LocationsEnum.FyonarCity,
        LocationsEnum.None,
        LocationsEnum.FyonarCity, // Test any valid location
      ];
      
      locations.forEach(location => {
        const party = PartyService.createParty(character, location);
        expect(party.location).toBe(location);
      });
    });
  });

  describe("partyToInsertParty", () => {
    it("should convert party entity to insert format", () => {
      const character = createMockCharacter("Hero");
      const party = PartyService.createParty(character, LocationsEnum.FyonarCity);
      
      const insertParty = PartyService.partyToInsertParty(party);
      
      expect(insertParty.partyID).toBe(party.partyID);
      expect(insertParty.location).toBe(party.location);
      expect(insertParty.isTraveling).toBe(party.isTraveling);
      expect(insertParty.justArrived).toBe(party.justArrived);
      expect(insertParty.leaderID).toBe(party.leader.id);
    });

    it("should convert characters array to array of IDs", () => {
      const character = createMockCharacter("Hero");
      const party = PartyService.createParty(character, LocationsEnum.FyonarCity);
      
      const insertParty = PartyService.partyToInsertParty(party);
      const characters = insertParty.characters as (string | "none")[];
      
      expect(Array.isArray(characters)).toBe(true);
      expect(characters[0]).toBe(character.id);
      expect(characters[1]).toBe("none");
      expect(characters[2]).toBe("none");
      expect(characters[3]).toBe("none");
      expect(characters[4]).toBe("none");
      expect(characters[5]).toBe("none");
    });

    it("should serialize behavior to JSONB-compatible format", () => {
      const character = createMockCharacter("Hero");
      const party = PartyService.createParty(character, LocationsEnum.FyonarCity);
      
      const insertParty = PartyService.partyToInsertParty(party);
      
      expect(insertParty.behavior).toBeDefined();
      expect(typeof insertParty.behavior).toBe("object");
    });

    it("should serialize informations to JSONB-compatible format", () => {
      const character = createMockCharacter("Hero");
      const party = PartyService.createParty(character, LocationsEnum.FyonarCity);
      party.informations = { "someInfo": 42 };
      
      const insertParty = PartyService.partyToInsertParty(party);
      
      expect(insertParty.informations).toBeDefined();
      expect(insertParty.informations).toEqual({ "someInfo": 42 });
    });

    it("should serialize actionSequence to JSONB-compatible format", () => {
      const character = createMockCharacter("Hero");
      const party = PartyService.createParty(character, LocationsEnum.FyonarCity);
      
      const insertParty = PartyService.partyToInsertParty(party);
      
      expect(insertParty.actionSequence).toBeDefined();
      expect(typeof insertParty.actionSequence).toBe("object");
    });

    it("should set audit fields", () => {
      const character = createMockCharacter("Hero");
      const party = PartyService.createParty(character, LocationsEnum.FyonarCity);
      
      const insertParty = PartyService.partyToInsertParty(party);
      
      expect(insertParty.createdBy).toBe("system");
      expect(insertParty.updatedBy).toBe("system");
    });

    it("should handle party with multiple characters", () => {
      const character1 = createMockCharacter("Hero1");
      const character2 = createMockCharacter("Hero2");
      const party = PartyService.createParty(character1, LocationsEnum.FyonarCity);
      
      // Manually add second character
      party.characters[1] = character2;
      
      const insertParty = PartyService.partyToInsertParty(party);
      const characters = insertParty.characters as (string | "none")[];
      
      expect(characters[0]).toBe(character1.id);
      expect(characters[1]).toBe(character2.id);
      expect(characters[2]).toBe("none");
    });
  });

  describe("Party State Management", () => {
    it("should create party with correct initial state", () => {
      const character = createMockCharacter("Hero");
      const party = PartyService.createParty(character, LocationsEnum.FyonarCity);
      
      expect(party.isTraveling).toBe(false);
      expect(party.justArrived).toBe(false);
      expect(party.location).toBe(LocationsEnum.FyonarCity);
    });

    it("should maintain party ID same as leader character ID", () => {
      const character = createMockCharacter("Hero");
      const party = PartyService.createParty(character, LocationsEnum.FyonarCity);
      
      expect(party.partyID).toBe(character.id);
      expect(party.leader.id).toBe(character.id);
    });
  });

  describe("Party Character Array", () => {
    it("should always have 6 slots", () => {
      const character = createMockCharacter("Hero");
      const party = PartyService.createParty(character, LocationsEnum.FyonarCity);
      
      expect(party.characters).toHaveLength(6);
    });

    it("should fill first slot with character, rest with 'none'", () => {
      const character = createMockCharacter("Hero");
      const party = PartyService.createParty(character, LocationsEnum.FyonarCity);
      
      expect(party.characters[0]).toBe(character);
      
      for (let i = 1; i < 6; i++) {
        expect(party.characters[i]).toBe("none");
      }
    });

    it("should correctly identify party with only leader", () => {
      const character = createMockCharacter("Hero");
      const party = PartyService.createParty(character, LocationsEnum.FyonarCity);
      
      const actualCharacters = party.getCharacters();
      expect(actualCharacters).toHaveLength(1);
      expect(actualCharacters[0]).toBe(character);
    });
  });

  describe("Party Behavior Initialization", () => {
    it("should initialize party behavior from character", () => {
      const character = createMockCharacter("Hero");
      const party = PartyService.createParty(character, LocationsEnum.FyonarCity);
      
      // Party behavior should be calculated from character's behavior
      expect(party.behavior.combatPolicy).toBeDefined();
      expect(party.behavior.riskTaking).toBeDefined();
      expect(party.behavior.eventResponse).toBeDefined();
    });

    it("should set party type", () => {
      const character = createMockCharacter("Hero");
      const party = PartyService.createParty(character, LocationsEnum.FyonarCity);
      
      expect(party.behavior.type).toBeDefined();
    });
  });

  describe("Conversion Consistency", () => {
    it("should maintain data integrity through conversion", () => {
      const character = createMockCharacter("Hero");
      const party = PartyService.createParty(character, LocationsEnum.FyonarCity);
      
      const insertParty = PartyService.partyToInsertParty(party);
      
      // Verify all critical fields are preserved
      expect(insertParty.partyID).toBe(party.partyID);
      expect(insertParty.leaderID).toBe(party.leader.id);
      expect(insertParty.location).toBe(party.location);
      expect(insertParty.isTraveling).toBe(party.isTraveling);
      expect(insertParty.justArrived).toBe(party.justArrived);
    });

    it("should convert 'none' strings correctly", () => {
      const character = createMockCharacter("Hero");
      const party = PartyService.createParty(character, LocationsEnum.FyonarCity);
      
      const insertParty = PartyService.partyToInsertParty(party);
      const characters = insertParty.characters as (string | "none")[];
      
      // All empty slots should be "none" strings
      for (let i = 1; i < 6; i++) {
        expect(characters[i]).toBe("none");
      }
    });
  });

  describe("Edge Cases", () => {
    it("should handle characters with special IDs", () => {
      const character = createMockCharacter("Hero");
      character.id = "00000000-0000-0000-0000-000000000000"; // Special UUID
      
      const party = PartyService.createParty(character, LocationsEnum.FyonarCity);
      
      expect(party.partyID).toBe("00000000-0000-0000-0000-000000000000");
      expect(party.leader.id).toBe("00000000-0000-0000-0000-000000000000");
    });

    it("should handle characters with long names", () => {
      const longName = "A".repeat(100);
      const character = createMockCharacter(longName);
      
      const party = PartyService.createParty(character, LocationsEnum.FyonarCity);
      
      expect(party.leader.name).toBe(longName);
    });

    it("should handle different character types", () => {
      const character = createMockCharacter("Hero");
      character.type = CharacterType.humanoid;
      
      const party = PartyService.createParty(character, LocationsEnum.FyonarCity);
      
      expect(party.leader.type).toBe(CharacterType.humanoid);
    });
  });

  describe("Party ActionSequence", () => {
    it("should initialize with default party action sequence", () => {
      const character = createMockCharacter("Hero");
      const party = PartyService.createParty(character, LocationsEnum.FyonarCity);
      
      expect(party.actionSequence).toBeDefined();
      expect(typeof party.actionSequence).toBe("object");
    });

    it("should preserve action sequence through conversion", () => {
      const character = createMockCharacter("Hero");
      const party = PartyService.createParty(character, LocationsEnum.FyonarCity);
      
      const insertParty = PartyService.partyToInsertParty(party);
      
      expect(insertParty.actionSequence).toBeDefined();
      expect(typeof insertParty.actionSequence).toBe("object");
    });
  });

  describe("Multiple Party Creation", () => {
    it("should create multiple distinct parties", () => {
      const character1 = createMockCharacter("Hero1");
      const character2 = createMockCharacter("Hero2");
      
      const party1 = PartyService.createParty(character1, LocationsEnum.FyonarCity);
      const party2 = PartyService.createParty(character2, LocationsEnum.FyonarCity);
      
      expect(party1.partyID).not.toBe(party2.partyID);
      expect(party1.leader).not.toBe(party2.leader);
      expect(party1.leader.id).not.toBe(party2.leader.id);
    });

    it("should create parties at different locations", () => {
      const character1 = createMockCharacter("Hero1");
      const character2 = createMockCharacter("Hero2");
      
      const party1 = PartyService.createParty(character1, LocationsEnum.FyonarCity);
      const party2 = PartyService.createParty(character2, LocationsEnum.None);
      
      expect(party1.location).toBe(LocationsEnum.FyonarCity);
      expect(party2.location).toBe(LocationsEnum.None);
    });
  });
});

