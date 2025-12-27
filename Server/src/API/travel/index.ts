import { Elysia, t } from "elysia";
import Report from "../../Utils/Reporter";
import { SessionService } from "../../Services/SessionService";
import { characterManager } from "../../Game/CharacterManager";
import { partyManager } from "../../Game/PartyManager";
import { locationManager } from "../../Entity/Location/Manager/LocationManager";
import { travelManager } from "../../Game/TravelManager";
import { railTravelManager } from "../../Game/TravelManager/Rail";
import { TravelMethodEnum } from "../../Game/TravelManager/TravelMethod";
import type { LocationsEnum } from "../../InterFacesEnumsAndTypes/Enums/Location";
import { mapPartyToInterface } from "../../Utils/PartyMapper";

export const travelRoutes = new Elysia({ prefix: "/travel" })
  .onError(({ code, error, set }) => {
    if (code === "VALIDATION") {
      Report.warn("Travel route validation error", {
        error: error.message,
        code,
      });
      set.status = 400;
      return { success: false, messageKey: "travel.validationError" };
    }
    const errorMessage = error instanceof Error ? error.message : String(error);
    Report.error("Travel route error", {
      code,
      error: errorMessage,
      stack: error instanceof Error ? error.stack : undefined,
    });
    set.status = 500;
    return { success: false, messageKey: "travel.serverError" };
  })
  /**
   * POST /api/travel/start
   * Start travel to a destination location
   */
  .post(
    "/start",
    async ({ body, headers, set }) => {
      Report.debug("Start travel request received", {
        route: "/travel/start",
        destination: body.destination,
      });

      try {
        // 1. Validate session
        const authHeader = headers.authorization;
        const token = authHeader?.split(" ")[1];
        
        if (!token) {
          set.status = 401;
          return { success: false, messageKey: "auth.noToken" };
        }

        const user = await SessionService.validateSession(token);
        if (!user) {
          set.status = 401;
          return { success: false, messageKey: "auth.invalidSession" };
        }

        // 2. Get character
        const character = characterManager.getUserCharacterByUserId(user.id);
        if (!character) {
          Report.warn("Character not found for user", { userId: user.id });
          set.status = 404;
          return { success: false, messageKey: "character.notFound" };
        }

        // 3. Get party
        if (!character.partyID) {
          Report.warn("Character has no party ID", { characterId: character.id });
          set.status = 400;
          return { success: false, messageKey: "party.notFound" };
        }

        const party = partyManager.getPartyByID(character.partyID);
        if (!party) {
          Report.warn("Party not found", { partyId: character.partyID });
          set.status = 404;
          return { success: false, messageKey: "party.notFound" };
        }

        // 4. Check if character is party leader
        const isLeader = party.leader.id === character.id;
        if (!isLeader) {
          set.status = 403;
          return { success: false, messageKey: "travel.onlyLeaderCanTravel" };
        }

        // 5. Validate destination
        const destination = body.destination as LocationsEnum;
        if (!destination || !(destination in locationManager.locations)) {
          set.status = 400;
          return { success: false, messageKey: "travel.invalidDestination" };
        }

        // 6. Get current location
        const currentLocation = locationManager.locations[party.location];
        if (!currentLocation) {
          Report.warn("Current location not found", { location: party.location });
          set.status = 404;
          return { success: false, messageKey: "location.notFound" };
        }

        // 7. Validate destination is connected to current location
        const destinationLocation = locationManager.locations[destination];
        if (!destinationLocation) {
          set.status = 400;
          return { success: false, messageKey: "travel.invalidDestination" };
        }

        if (!currentLocation.checkIfLocationConnected(destinationLocation)) {
          set.status = 400;
          return { success: false, messageKey: "travel.destinationNotConnected" };
        }

        // 8. Stop any existing travel first
        const existingTravelingParty = travelManager.travelingParties.get(party.partyID);
        if (existingTravelingParty) {
          travelManager.stopTravel(party.partyID);
        }

        // 9. Remove any existing rail travel
        const existingRailParty = railTravelManager.party.find(
          (rp) => rp.party.partyID === party.partyID && !rp.completed
        );
        if (existingRailParty) {
          railTravelManager.removeParty(party.partyID);
        }

        // 10. Add party to travel manager
        travelManager.addParty(party);

        // 11. Set travel method (default to walk)
        const travelingParty = travelManager.travelingParties.get(party.partyID);
        if (travelingParty) {
          travelingParty.currentTravelMethod = TravelMethodEnum.walk;
        }

        // 12. Add destination to travel path
        const success = travelManager.addLocationToPath(party.partyID, destination);
        if (!success) {
          // Clean up on failure
          travelManager.stopTravel(party.partyID);
          set.status = 400;
          return {
            success: false,
            messageKey: "travel.failedToAddDestination",
          };
        }

        // 13. Set party as traveling
        party.isTraveling = true;
        const finalTravelingParty = travelManager.travelingParties.get(party.partyID);
        if (finalTravelingParty) {
          finalTravelingParty.isTraveling = true;
        }

        // 14. Map party to interface for response
        const partyInterface = mapPartyToInterface(party);

        Report.info("Travel started successfully", {
          partyId: party.partyID,
          from: party.location,
          to: destination,
        });

        return {
          success: true,
          party: partyInterface,
        };
      } catch (error) {
        Report.error("Start travel error", {
          error,
        });
        set.status = 500;
        return { success: false, messageKey: "travel.startFailed" };
      }
    },
    {
      body: t.Object({
        destination: t.String(),
      }),
    }
  );

