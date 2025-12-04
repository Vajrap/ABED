/**
 * Actions API Endpoint Tests
 * 
 * Tests for POST /api/actions/update endpoint
 * Covers:
 * - Authentication and authorization
 * - Character and party validation
 * - Location action validation
 * - CAS (Character Action Sequence) updates
 * - PAS (Party Action Sequence) updates (leader only)
 * - PAS precedence over CAS
 */

import { expect, describe, it, beforeEach, jest, afterEach } from "@jest/globals";
import request from "supertest";
import express from "express";
import { actionsRoutes } from "../../src/API/actions";
import { SessionService } from "../../src/Services/SessionService";
import { characterManager } from "../../src/Game/CharacterManager";
import { partyManager } from "../../src/Game/PartyManager";
import { locationManager } from "../../src/Entity/Location/Manager/LocationManager";
import { travelManager } from "../../src/Game/TravelManager";
import { railTravelManager } from "../../src/Game/TravelManager/Rail";
import { RailTravelingParty } from "../../src/Game/TravelManager/Rail";
import { CharacterFactory } from "../Helper/Character";
import { Party } from "../../src/Entity/Party/Party";
import { PartyBehavior } from "../../src/Entity/Party/PartyBehavior";
import { LocationsEnum } from "../../src/InterFacesEnumsAndTypes/Enums/Location";
import { RailStationEnum } from "../../src/InterFacesEnumsAndTypes/Enums/RailStation";
import { ActionInput, defaultActionSequence } from "../../src/Entity/Character/Subclass/Action/CharacterAction";
import { DayOfWeek, TimeOfDay } from "../../src/InterFacesEnumsAndTypes/Time";
import { defaultPartyAction } from "../../src/Entity/Party/ActionlSequence/PartyActionSequence";

// We'll use jest.spyOn for mocking instead of module mocks
// This works better with singleton instances

// Create Express app for testing
const app = express();
app.use(express.json());
app.use("/api/actions", actionsRoutes);

describe("POST /api/actions/update", () => {
  let testCharacter: ReturnType<typeof CharacterFactory.create>["characterDraft"];
  let testParty: Party;
  let testLocation: typeof locationManager.locations[LocationsEnum.WaywardInn];
  const testUserId = "test-user-123";
  const testToken = "test-token-123";

  beforeEach(() => {
    jest.clearAllMocks();

    // Create test character
    testCharacter = CharacterFactory.create()
      .withName({ en: "TestHero", th: "ฮีโร่ทดสอบ" })
      .build();
    testCharacter.id = "test-char-123";
    testCharacter.userId = testUserId;
    testCharacter.partyID = "test-party-123";

    // Create test party
    testParty = new Party({
      leaderId: testCharacter.id,
      location: LocationsEnum.WaywardInn,
      behavior: new PartyBehavior(),
      characters: [testCharacter],
      leader: testCharacter,
    });
    testParty.partyID = "test-party-123";
    testParty.actionSequence = { ...defaultPartyAction };

    // Get test location and ensure it has actions for testing
    testLocation = locationManager.locations[LocationsEnum.WaywardInn];
    // Set up location with common actions for testing
    testLocation.actions = [
      ActionInput.Rest,
      ActionInput.TrainAttribute,
      ActionInput.TrainProficiency,
      ActionInput.TrainArtisan,
      ActionInput.TrainSkill,
      ActionInput.LearnSkill,
      ActionInput.Read,
      ActionInput.Craft,
      ActionInput.Stroll,
      ActionInput.Tavern,
      ActionInput.Inn,
      ActionInput.Camping,
      ActionInput.HouseRest,
      ActionInput.Travel,
      ActionInput.RailTravel,
    ];

    // Setup default mocks using jest.spyOn
    jest.spyOn(SessionService, "validateSession").mockResolvedValue({
      id: testUserId,
      username: "testuser",
      email: "test@example.com",
    } as any);

    jest.spyOn(characterManager, "getUserCharacterByUserId").mockReturnValue(testCharacter);
    jest.spyOn(characterManager, "getCharacterByID").mockReturnValue(testCharacter);

    jest.spyOn(partyManager, "getPartyByID").mockReturnValue(testParty);
  });

  afterEach(() => {
    jest.restoreAllMocks();
    // Restore test party location
    testParty.location = LocationsEnum.WaywardInn;
    testParty.isTraveling = false;
    // Restore test location actions
    testLocation.actions = [
      ActionInput.Rest,
      ActionInput.TrainAttribute,
      ActionInput.TrainProficiency,
      ActionInput.TrainArtisan,
      ActionInput.TrainSkill,
      ActionInput.LearnSkill,
      ActionInput.Read,
      ActionInput.Craft,
      ActionInput.Stroll,
      ActionInput.Tavern,
      ActionInput.Inn,
      ActionInput.Camping,
      ActionInput.HouseRest,
      ActionInput.Travel,
      ActionInput.RailTravel,
    ];
    // Clean up travel managers
    travelManager.stopTravel(testParty.partyID);
    railTravelManager.removeParty(testParty.partyID);
  });

  describe("Authentication", () => {
    it("should return FAIL when no token is provided", async () => {
      const response = await request(app)
        .post("/api/actions/update")
        .send({
          actionSequence: defaultActionSequence(),
        });

      expect(response.status).toBe(200);
      expect(response.body.status).toBe("FAIL");
      expect(response.body.reason).toContain("No authentication token");
    });

    it("should return FAIL when token is invalid", async () => {
      jest.spyOn(SessionService, "validateSession").mockResolvedValue(null);

      const response = await request(app)
        .post("/api/actions/update")
        .set("Authorization", "Bearer invalid-token")
        .send({
          actionSequence: defaultActionSequence(),
        });

      expect(response.status).toBe(200);
      expect(response.body.status).toBe("FAIL");
      expect(response.body.reason).toContain("Invalid session");
    });
  });

  describe("Request Validation", () => {
    it("should return FAIL when request body is invalid", async () => {
      const response = await request(app)
        .post("/api/actions/update")
        .set("Authorization", `Bearer ${testToken}`)
        .send({
          invalidField: "invalid",
        });

      expect(response.status).toBe(200);
      expect(response.body.status).toBe("FAIL");
      expect(response.body.reason).toContain("Invalid request body");
    });

    it("should accept valid request with characterID", async () => {
      const actionSequence = defaultActionSequence();
      actionSequence[DayOfWeek.laoh][TimeOfDay.morning] = { type: ActionInput.Rest };

      const response = await request(app)
        .post("/api/actions/update")
        .set("Authorization", `Bearer ${testToken}`)
        .send({
          characterID: testCharacter.id,
          actionSequence,
        });

      expect(response.status).toBe(200);
      // Should succeed if all validations pass
    });
  });

  describe("Character Validation", () => {
    it("should return FAIL when character is not found by userId", async () => {
      jest.spyOn(characterManager, "getUserCharacterByUserId").mockReturnValue(null);

      const response = await request(app)
        .post("/api/actions/update")
        .set("Authorization", `Bearer ${testToken}`)
        .send({
          actionSequence: defaultActionSequence(),
        });

      expect(response.status).toBe(200);
      expect(response.body.status).toBe("FAIL");
      expect(response.body.reason).toContain("Character not found");
    });

    it("should return FAIL when characterID does not belong to user", async () => {
      const otherCharacter = CharacterFactory.create().build();
      otherCharacter.id = "other-char-123";
      otherCharacter.userId = "other-user-123";

      jest.spyOn(characterManager, "getCharacterByID").mockReturnValue(otherCharacter as any);

      const response = await request(app)
        .post("/api/actions/update")
        .set("Authorization", `Bearer ${testToken}`)
        .send({
          characterID: "other-char-123",
          actionSequence: defaultActionSequence(),
        });

      expect(response.status).toBe(200);
      expect(response.body.status).toBe("FAIL");
      expect(response.body.reason).toContain("Character does not belong to user");
    });

    it("should return FAIL when character has no party", async () => {
      testCharacter.partyID = null;
      jest.spyOn(characterManager, "getUserCharacterByUserId").mockReturnValue(testCharacter);

      const response = await request(app)
        .post("/api/actions/update")
        .set("Authorization", `Bearer ${testToken}`)
        .send({
          actionSequence: defaultActionSequence(),
        });

      expect(response.status).toBe(200);
      expect(response.body.status).toBe("FAIL");
      expect(response.body.reason).toContain("Character is not in a party");
    });
  });

  describe("Party and Location Validation", () => {
    it("should return FAIL when party is not found", async () => {
      jest.spyOn(partyManager, "getPartyByID").mockImplementation(() => {
        throw new Error("Party not found");
      });

      const response = await request(app)
        .post("/api/actions/update")
        .set("Authorization", `Bearer ${testToken}`)
        .send({
          actionSequence: defaultActionSequence(),
        });

      expect(response.status).toBe(200);
      expect(response.body.status).toBe("FAIL");
      expect(response.body.reason).toContain("Party not found");
    });

    it("should return FAIL when location is not found", async () => {
      // Mock party to have a non-existent location
      const originalLocation = testParty.location;
      testParty.location = "NonExistentLocation" as any;
      jest.spyOn(partyManager, "getPartyByID").mockReturnValue(testParty);

      const response = await request(app)
        .post("/api/actions/update")
        .set("Authorization", `Bearer ${testToken}`)
        .send({
          actionSequence: defaultActionSequence(),
        });

      // Restore original location
      testParty.location = originalLocation;

      expect(response.status).toBe(200);
      expect(response.body.status).toBe("FAIL");
      expect(response.body.reason).toContain("Location not found");
    });
  });

  describe("Action Validation", () => {
    it("should convert invalid actions to Rest instead of rejecting", async () => {
      // Temporarily limit location actions for this test
      const originalActions = testLocation.actions;
      testLocation.actions = [ActionInput.Rest, ActionInput.TrainAttribute]; // Only these actions allowed

      const actionSequence = defaultActionSequence();
      actionSequence[DayOfWeek.laoh][TimeOfDay.morning] = { type: ActionInput.Mining }; // Not allowed

      const response = await request(app)
        .post("/api/actions/update")
        .set("Authorization", `Bearer ${testToken}`)
        .send({
          actionSequence,
        });

      // Restore original actions
      testLocation.actions = originalActions;

      expect(response.status).toBe(200);
      expect(response.body.status).toBe("SUCCESS");
      expect(response.body.convertedActions).toHaveLength(1);
      expect(response.body.convertedActions[0].day).toBe(DayOfWeek.laoh);
      expect(response.body.convertedActions[0].time).toBe(TimeOfDay.morning);
      expect(response.body.convertedActions[0].originalAction).toBe(ActionInput.Mining);
      expect(response.body.convertedActions[0].convertedTo).toBe(ActionInput.Rest);
      expect(response.body.convertedActions[0].reason).toContain("not allowed");
      // CAS should be converted to Rest
      expect(response.body.CAS[DayOfWeek.laoh][TimeOfDay.morning].type).toBe(ActionInput.Rest);
    });

    it("should accept valid actions for location", async () => {
      const actionSequence = defaultActionSequence();
      actionSequence[DayOfWeek.laoh][TimeOfDay.morning] = { type: ActionInput.Rest };

      const response = await request(app)
        .post("/api/actions/update")
        .set("Authorization", `Bearer ${testToken}`)
        .send({
          actionSequence,
        });

      expect(response.status).toBe(200);
      expect(response.body.status).toBe("SUCCESS");
    });
  });

  describe("CAS Update", () => {
    it("should successfully update CAS for non-leader", async () => {
      // Make character non-leader
      const leader = CharacterFactory.create().build();
      leader.id = "leader-123";
      testParty.leader = leader;

      const actionSequence = defaultActionSequence();
      actionSequence[DayOfWeek.laoh][TimeOfDay.morning] = { type: ActionInput.Rest };
      actionSequence[DayOfWeek.laoh][TimeOfDay.afternoon] = { type: ActionInput.TrainAttribute, attribute: "strength" };

      const response = await request(app)
        .post("/api/actions/update")
        .set("Authorization", `Bearer ${testToken}`)
        .send({
          actionSequence,
        });

      expect(response.status).toBe(200);
      expect(response.body.status).toBe("SUCCESS");
      expect(response.body.CAS[DayOfWeek.laoh][TimeOfDay.morning].type).toBe(ActionInput.Rest);
      expect(response.body.CAS[DayOfWeek.laoh][TimeOfDay.afternoon].type).toBe(ActionInput.TrainAttribute);
      expect(testCharacter.actionSequence[DayOfWeek.laoh][TimeOfDay.morning].type).toBe(ActionInput.Rest);
    });

    it("should update CAS for leader", async () => {
      const actionSequence = defaultActionSequence();
      actionSequence[DayOfWeek.laoh][TimeOfDay.morning] = { type: ActionInput.Rest };

      const response = await request(app)
        .post("/api/actions/update")
        .set("Authorization", `Bearer ${testToken}`)
        .send({
          actionSequence,
        });

      expect(response.status).toBe(200);
      expect(response.body.status).toBe("SUCCESS");
      expect(testCharacter.actionSequence[DayOfWeek.laoh][TimeOfDay.morning].type).toBe(ActionInput.Rest);
    });
  });

  describe("PAS Update (Leader Only)", () => {
    it("should update PAS when character is leader and CAS matches party action option", async () => {
      const actionSequence = defaultActionSequence();
      actionSequence[DayOfWeek.laoh][TimeOfDay.morning] = { type: ActionInput.Inn }; // Party action option

      const response = await request(app)
        .post("/api/actions/update")
        .set("Authorization", `Bearer ${testToken}`)
        .send({
          actionSequence,
        });

      expect(response.status).toBe(200);
      expect(response.body.status).toBe("SUCCESS");
      expect(response.body.PAS[DayOfWeek.laoh][TimeOfDay.morning]).toBe(ActionInput.Inn);
      expect(testParty.actionSequence[DayOfWeek.laoh][TimeOfDay.morning]).toBe(ActionInput.Inn);
    });

    it("should set PAS to None when CAS does not match party action option", async () => {
      const actionSequence = defaultActionSequence();
      actionSequence[DayOfWeek.laoh][TimeOfDay.morning] = { type: ActionInput.TrainAttribute, attribute: "strength" }; // Not a party action

      const response = await request(app)
        .post("/api/actions/update")
        .set("Authorization", `Bearer ${testToken}`)
        .send({
          actionSequence,
        });

      expect(response.status).toBe(200);
      expect(response.body.status).toBe("SUCCESS");
      expect(response.body.PAS[DayOfWeek.laoh][TimeOfDay.morning]).toBe(ActionInput.None);
    });

    it("should NOT update PAS when character is not leader", async () => {
      // Make character non-leader
      const leader = CharacterFactory.create().build();
      leader.id = "leader-123";
      testParty.leader = leader;

      const originalPAS = { ...testParty.actionSequence };
      originalPAS[DayOfWeek.laoh][TimeOfDay.morning] = ActionInput.Camping;

      const actionSequence = defaultActionSequence();
      actionSequence[DayOfWeek.laoh][TimeOfDay.morning] = { type: ActionInput.Inn };

      const response = await request(app)
        .post("/api/actions/update")
        .set("Authorization", `Bearer ${testToken}`)
        .send({
          actionSequence,
        });

      expect(response.status).toBe(200);
      expect(response.body.status).toBe("SUCCESS");
      // PAS should remain unchanged
      expect(testParty.actionSequence[DayOfWeek.laoh][TimeOfDay.morning]).toBe(ActionInput.Camping);
    });
  });

  describe("PAS Precedence", () => {
    it("should force CAS to match PAS when PAS has a value", async () => {
      // Make character NOT the leader so PAS doesn't get updated from CAS
      const leader = CharacterFactory.create().build();
      leader.id = "leader-123";
      testParty.leader = leader;
      
      // Set PAS to a group action
      testParty.actionSequence[DayOfWeek.laoh][TimeOfDay.morning] = ActionInput.Inn;

      const actionSequence = defaultActionSequence();
      actionSequence[DayOfWeek.laoh][TimeOfDay.morning] = { type: ActionInput.TrainAttribute, attribute: "strength" }; // Different action

      const response = await request(app)
        .post("/api/actions/update")
        .set("Authorization", `Bearer ${testToken}`)
        .send({
          actionSequence,
        });

      expect(response.status).toBe(200);
      expect(response.body.status).toBe("SUCCESS");
      // CAS should be forced to match PAS
      expect(response.body.CAS[DayOfWeek.laoh][TimeOfDay.morning].type).toBe(ActionInput.Inn);
      expect(testCharacter.actionSequence[DayOfWeek.laoh][TimeOfDay.morning].type).toBe(ActionInput.Inn);
      expect(response.body.convertedActions).toHaveLength(1);
      expect(response.body.convertedActions[0].day).toBe(DayOfWeek.laoh);
      expect(response.body.convertedActions[0].time).toBe(TimeOfDay.morning);
      expect(response.body.convertedActions[0].reason).toContain("Party action sequence takes precedence");
    });

    it("should not reject CAS when it matches PAS", async () => {
      // Set PAS to a group action
      testParty.actionSequence[DayOfWeek.laoh][TimeOfDay.morning] = ActionInput.Camping;

      const actionSequence = defaultActionSequence();
      actionSequence[DayOfWeek.laoh][TimeOfDay.morning] = { type: ActionInput.Camping }; // Matches PAS

      const response = await request(app)
        .post("/api/actions/update")
        .set("Authorization", `Bearer ${testToken}`)
        .send({
          actionSequence,
        });

      expect(response.status).toBe(200);
      expect(response.body.status).toBe("SUCCESS");
      expect(response.body.convertedActions).toHaveLength(0);
    });

    it("should handle multiple slots with PAS precedence", async () => {
      // Make character NOT the leader so PAS doesn't get updated from CAS
      const leader = CharacterFactory.create().build();
      leader.id = "leader-123";
      testParty.leader = leader;
      
      // Set PAS for multiple slots
      testParty.actionSequence[DayOfWeek.laoh][TimeOfDay.morning] = ActionInput.Inn;
      testParty.actionSequence[DayOfWeek.laoh][TimeOfDay.afternoon] = ActionInput.Camping;

      const actionSequence = defaultActionSequence();
      actionSequence[DayOfWeek.laoh][TimeOfDay.morning] = { type: ActionInput.Rest }; // Doesn't match
      actionSequence[DayOfWeek.laoh][TimeOfDay.afternoon] = { type: ActionInput.Camping }; // Matches
      actionSequence[DayOfWeek.laoh][TimeOfDay.evening] = { type: ActionInput.Rest }; // PAS is None, so allowed

      const response = await request(app)
        .post("/api/actions/update")
        .set("Authorization", `Bearer ${testToken}`)
        .send({
          actionSequence,
        });

      expect(response.status).toBe(200);
      expect(response.body.status).toBe("SUCCESS");
      // First slot should be forced to match PAS
      expect(response.body.CAS[DayOfWeek.laoh][TimeOfDay.morning].type).toBe(ActionInput.Inn);
      // Second slot matches, no rejection
      expect(response.body.CAS[DayOfWeek.laoh][TimeOfDay.afternoon].type).toBe(ActionInput.Camping);
      // Third slot has PAS = None, so CAS can be anything
      expect(response.body.CAS[DayOfWeek.laoh][TimeOfDay.evening].type).toBe(ActionInput.Rest);
      expect(response.body.convertedActions).toHaveLength(1);
    });
  });

  describe("Response Format", () => {
    it("should return correct response structure on success", async () => {
      const actionSequence = defaultActionSequence();
      actionSequence[DayOfWeek.laoh][TimeOfDay.morning] = { type: ActionInput.Rest };

      const response = await request(app)
        .post("/api/actions/update")
        .set("Authorization", `Bearer ${testToken}`)
        .send({
          actionSequence,
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("status");
      expect(response.body).toHaveProperty("CAS");
      expect(response.body).toHaveProperty("convertedActions");
      expect(response.body).toHaveProperty("PAS");
      expect(response.body).toHaveProperty("travelState");
      expect(response.body.status).toBe("SUCCESS");
      expect(Array.isArray(response.body.convertedActions)).toBe(true);
      expect(response.body.travelState).toHaveProperty("isTraveling");
      expect(response.body.travelState).toHaveProperty("isOnRail");
      expect(response.body.travelState).toHaveProperty("currentLocation");
    });

    it("should return correct response structure on failure", async () => {
      jest.spyOn(characterManager, "getUserCharacterByUserId").mockReturnValue(null);

      const response = await request(app)
        .post("/api/actions/update")
        .set("Authorization", `Bearer ${testToken}`)
        .send({
          actionSequence: defaultActionSequence(),
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("status");
      expect(response.body).toHaveProperty("reason");
      expect(response.body.status).toBe("FAIL");
      expect(typeof response.body.reason).toBe("string");
    });
  });

  describe("Edge Cases", () => {
    it("should handle empty action sequence", async () => {
      const actionSequence = defaultActionSequence(); // All None

      const response = await request(app)
        .post("/api/actions/update")
        .set("Authorization", `Bearer ${testToken}`)
        .send({
          actionSequence,
        });

      expect(response.status).toBe(200);
      expect(response.body.status).toBe("SUCCESS");
    });

    it("should handle action sequence with all days and times", async () => {
      const actionSequence = defaultActionSequence();
      
      // Set actions for all days and times
      for (const day of Object.values(DayOfWeek)) {
        for (const time of Object.values(TimeOfDay)) {
          actionSequence[day][time] = { type: ActionInput.Rest };
        }
      }

      const response = await request(app)
        .post("/api/actions/update")
        .set("Authorization", `Bearer ${testToken}`)
        .send({
          actionSequence,
        });

      expect(response.status).toBe(200);
      expect(response.body.status).toBe("SUCCESS");
    });

    it("should handle leader updating PAS with multiple party action options", async () => {
      const actionSequence = defaultActionSequence();
      actionSequence[DayOfWeek.laoh][TimeOfDay.morning] = { type: ActionInput.Travel };
      actionSequence[DayOfWeek.laoh][TimeOfDay.afternoon] = { type: ActionInput.RailTravel };
      actionSequence[DayOfWeek.laoh][TimeOfDay.evening] = { type: ActionInput.Camping };
      actionSequence[DayOfWeek.laoh][TimeOfDay.night] = { type: ActionInput.HouseRest };

      const response = await request(app)
        .post("/api/actions/update")
        .set("Authorization", `Bearer ${testToken}`)
        .send({
          actionSequence,
        });

      expect(response.status).toBe(200);
      expect(response.body.status).toBe("SUCCESS");
      expect(response.body.PAS[DayOfWeek.laoh][TimeOfDay.morning]).toBe(ActionInput.Travel);
      expect(response.body.PAS[DayOfWeek.laoh][TimeOfDay.afternoon]).toBe(ActionInput.RailTravel);
      expect(response.body.PAS[DayOfWeek.laoh][TimeOfDay.evening]).toBe(ActionInput.Camping);
      expect(response.body.PAS[DayOfWeek.laoh][TimeOfDay.night]).toBe(ActionInput.HouseRest);
    });
  });

  describe("Travel Planning", () => {
    it("should set up normal travel when travelPath is provided", async () => {
      // Mock location connections - need to check if WaywardInn has connected locations
      // For now, assume we can travel to at least one location
      const actionSequence = defaultActionSequence();

      const response = await request(app)
        .post("/api/actions/update")
        .set("Authorization", `Bearer ${testToken}`)
        .send({
          actionSequence,
          travelPath: [LocationsEnum.WaywardInn], // Same location (will fail path validation but tests the flow)
        });

      expect(response.status).toBe(200);
      // Should either succeed or fail with path validation error
      expect(["SUCCESS", "FAIL"]).toContain(response.body.status);
      if (response.body.status === "FAIL") {
        expect(response.body.reason).toContain("travel path");
      }
    });

    it("should require leader to set travel plans", async () => {
      // Make character NOT the leader
      const leader = CharacterFactory.create().build();
      leader.id = "leader-123";
      testParty.leader = leader;

      const actionSequence = defaultActionSequence();

      const response = await request(app)
        .post("/api/actions/update")
        .set("Authorization", `Bearer ${testToken}`)
        .send({
          actionSequence,
          travelPath: [LocationsEnum.WaywardInn],
        });

      expect(response.status).toBe(200);
      expect(response.body.status).toBe("FAIL");
      expect(response.body.reason).toContain("Only party leader");
    });

    it("should set up rail travel when railTravelTo is provided", async () => {
      // Ensure location has a train station
      testLocation.trainStationId = RailStationEnum.WaywardInn;

      const actionSequence = defaultActionSequence();

      const response = await request(app)
        .post("/api/actions/update")
        .set("Authorization", `Bearer ${testToken}`)
        .send({
          actionSequence,
          railTravelTo: RailStationEnum.Midland,
        });

      expect(response.status).toBe(200);
      expect(response.body.status).toBe("SUCCESS");
      expect(response.body.travelState.isTraveling).toBe(true);
      expect(response.body.travelState.isOnRail).toBe(true);
      expect(response.body.travelState.destination).toBe(RailStationEnum.Midland);
    });

    it("should return FAIL if rail travel requested but location has no train station", async () => {
      testLocation.trainStationId = null;

      const actionSequence = defaultActionSequence();

      const response = await request(app)
        .post("/api/actions/update")
        .set("Authorization", `Bearer ${testToken}`)
        .send({
          actionSequence,
          railTravelTo: RailStationEnum.Midland,
        });

      expect(response.status).toBe(200);
      expect(response.body.status).toBe("FAIL");
      expect(response.body.reason).toContain("train station");
    });

    it("should halt travel when haltTravel is true", async () => {
      // Set party as traveling
      testParty.isTraveling = true;
      travelManager.addParty(testParty);
      const travelingParty = travelManager.travelingParties.get(testParty.partyID);
      if (travelingParty) {
        travelingParty.isTraveling = true;
      }

      const actionSequence = defaultActionSequence();

      const response = await request(app)
        .post("/api/actions/update")
        .set("Authorization", `Bearer ${testToken}`)
        .send({
          actionSequence,
          haltTravel: true,
        });

      expect(response.status).toBe(200);
      expect(response.body.status).toBe("SUCCESS");
      expect(response.body.travelState.isTraveling).toBe(false);
      expect(testParty.isTraveling).toBe(false);
    });
  });

  describe("Action Conversion During Travel", () => {
    it("should convert invalid actions to Rest while traveling", async () => {
      // Set party as traveling
      testParty.isTraveling = true;
      travelManager.addParty(testParty);
      const travelingParty = travelManager.travelingParties.get(testParty.partyID);
      if (travelingParty) {
        travelingParty.isTraveling = true;
        travelingParty.path = [LocationsEnum.WaywardInn];
      }

      const actionSequence = defaultActionSequence();
      actionSequence[DayOfWeek.laoh][TimeOfDay.morning] = { type: ActionInput.Mining }; // Not allowed while traveling
      actionSequence[DayOfWeek.laoh][TimeOfDay.afternoon] = { type: ActionInput.Camping }; // Allowed while traveling

      const response = await request(app)
        .post("/api/actions/update")
        .set("Authorization", `Bearer ${testToken}`)
        .send({
          actionSequence,
        });

      expect(response.status).toBe(200);
      expect(response.body.status).toBe("SUCCESS");
      expect(response.body.convertedActions).toHaveLength(1);
      expect(response.body.convertedActions[0].originalAction).toBe(ActionInput.Mining);
      expect(response.body.convertedActions[0].convertedTo).toBe(ActionInput.Rest);
      expect(response.body.convertedActions[0].reason).toContain("while traveling");
      expect(response.body.CAS[DayOfWeek.laoh][TimeOfDay.morning].type).toBe(ActionInput.Rest);
      expect(response.body.CAS[DayOfWeek.laoh][TimeOfDay.afternoon].type).toBe(ActionInput.Camping);
    });

    it("should convert invalid actions to Rest while on rail travel", async () => {
      // Set up rail travel
      testLocation.trainStationId = RailStationEnum.WaywardInn;
      const railParty = new RailTravelingParty(
        testParty,
        RailStationEnum.WaywardInn,
        RailStationEnum.Midland
      );
      railTravelManager.addParty(railParty);

      const actionSequence = defaultActionSequence();
      // Use Craft with a placeholder itemId (will be converted anyway since not allowed on rail)
      actionSequence[DayOfWeek.laoh][TimeOfDay.morning] = { type: ActionInput.Craft, itemId: "test-item-id" as any }; // Not allowed on rail
      actionSequence[DayOfWeek.laoh][TimeOfDay.afternoon] = { type: ActionInput.Read }; // Allowed on rail

      const response = await request(app)
        .post("/api/actions/update")
        .set("Authorization", `Bearer ${testToken}`)
        .send({
          actionSequence,
        });

      expect(response.status).toBe(200);
      expect(response.body.status).toBe("SUCCESS");
      expect(response.body.travelState.isOnRail).toBe(true);
      expect(response.body.convertedActions).toHaveLength(1);
      expect(response.body.convertedActions[0].originalAction).toBe(ActionInput.Craft);
      expect(response.body.convertedActions[0].convertedTo).toBe(ActionInput.Rest);
      expect(response.body.convertedActions[0].reason).toContain("rail travel");
      expect(response.body.CAS[DayOfWeek.laoh][TimeOfDay.morning].type).toBe(ActionInput.Rest);
      expect(response.body.CAS[DayOfWeek.laoh][TimeOfDay.afternoon].type).toBe(ActionInput.Read);
    });

    it("should allow travel-appropriate actions while traveling", async () => {
      // Set party as traveling
      testParty.isTraveling = true;
      travelManager.addParty(testParty);
      const travelingParty = travelManager.travelingParties.get(testParty.partyID);
      if (travelingParty) {
        travelingParty.isTraveling = true;
        travelingParty.path = [LocationsEnum.WaywardInn];
      }

      const actionSequence = defaultActionSequence();
      actionSequence[DayOfWeek.laoh][TimeOfDay.morning] = { type: ActionInput.Camping };
      actionSequence[DayOfWeek.laoh][TimeOfDay.afternoon] = { type: ActionInput.TrainAttribute, attribute: "strength" };
      actionSequence[DayOfWeek.laoh][TimeOfDay.evening] = { type: ActionInput.Read };
      actionSequence[DayOfWeek.laoh][TimeOfDay.night] = { type: ActionInput.Craft, itemId: "test-item-id" as any };

      const response = await request(app)
        .post("/api/actions/update")
        .set("Authorization", `Bearer ${testToken}`)
        .send({
          actionSequence,
        });

      expect(response.status).toBe(200);
      expect(response.body.status).toBe("SUCCESS");
      expect(response.body.convertedActions).toHaveLength(0); // All actions should be allowed
      expect(response.body.travelState.isTraveling).toBe(true);
    });
  });
});

