import { Elysia } from "elysia";
import Report from "../../Utils/Reporter";
import { SessionService } from "../../Services/SessionService";
import { characterManager } from "../../Game/CharacterManager";
import { locationManager } from "../../Entity/Location/Manager/LocationManager";
import { GameTime } from "../../Game/GameTime/GameTime";
import type { LocationsEnum } from "../../InterFacesEnumsAndTypes/Enums/Location";
import { TimeOfDay } from "../../InterFacesEnumsAndTypes/Time";
import { connectionManager } from "../../Entity/Connection/connectionManager";

export const locationRoutes = new Elysia({ prefix: "/location" })
  .onError(({ code, error, set }) => {
    if (code === "VALIDATION") {
      Report.warn("Location route validation error", {
        error: error.message,
        code,
      });
      set.status = 400;
      return { success: false, messageKey: "location.validationError" };
    }
    throw error;
  })
  /**
   * GET /api/location/current
   * Get current location information for the logged-in user's character
   */
  .get("/current", async ({ headers, set }) => {
    Report.debug("Current location request received", {
      route: "/location/current",
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

      // 2. Get character from in-memory manager
      const character = characterManager.getUserCharacterByUserId(user.id);
      if (!character) {
        Report.warn("Character not found for user", { userId: user.id });
        set.status = 404;
        return { success: false, messageKey: "character.notFound" };
      }

      // 3. Get party to find location
      if (!character.partyID) {
        Report.warn("Character has no party ID", { characterId: character.id });
        set.status = 404;
        return { success: false, messageKey: "party.notFound" };
      }

      // Import partyManager here to avoid circular dependencies
      const { partyManager } = await import("../../Game/PartyManager");
      const party = partyManager.getPartyByID(character.partyID);
      if (!party) {
        Report.warn("Party not found for character", {
          characterId: character.id,
          partyId: character.partyID,
        });
        set.status = 404;
        return { success: false, messageKey: "party.notFound" };
      }

      // 4. Get location - prefer character location, fallback to party location
      const locationId = character.location || party.location;
      if (!locationId) {
        Report.warn("No location found for character or party", { 
          characterId: character.id,
          partyId: party.partyID 
        });
        set.status = 404;
        return { success: false, messageKey: "location.notFound" };
      }

      const location = locationManager.locations[locationId as LocationsEnum];
      if (!location) {
        Report.warn("Location not found in locationManager", { location: locationId });
        set.status = 404;
        return { success: false, messageKey: "location.notFound" };
      }

      // 5. Map location to frontend interface
      // Extract L10N name (for now, return as string - frontend will handle L10N)
      const locationName = typeof location.name === 'string' 
        ? location.name 
        : location.name?.en || location.id;

      // Get current game time
      const gameTime = GameTime.getCurrentGameDateTime();

      // Get phase-specific actions for all phases
      const availableActionsByPhase = {
        [TimeOfDay.morning]: location.getAvailableActions(TimeOfDay.morning),
        [TimeOfDay.afternoon]: location.getAvailableActions(TimeOfDay.afternoon),
        [TimeOfDay.evening]: location.getAvailableActions(TimeOfDay.evening),
        [TimeOfDay.night]: location.getAvailableActions(TimeOfDay.night),
      };

      const locationData = {
        id: location.id,
        name: locationName,
        region: location.region,
        subRegion: location.subRegion,
        // TODO: Add situation image identifier if available
        situation: location.id.toLowerCase().replace(/_/g, '-'), // Placeholder - map to actual situation images
        hasRailStation: !!location.trainStationId,
        availableActions: location.actions, // Legacy: flat array (deprecated, kept for backward compatibility)
        availableActionsByPhase, // New: phase-specific actions
        gameTime, // Include current game time
      };

      return {
        success: true,
        location: locationData,
      };
    } catch (error) {
      Report.error("Current location fetch error", {
        error,
      });
      set.status = 500;
      return { success: false, messageKey: "location.fetchFailed" };
    }
  })
  /**
   * GET /api/location/characters
   * Get all characters (NPCs and players) at the current location
   */
  .get("/characters", async ({ headers, set }) => {
    Report.debug("Location characters request received", {
      route: "/location/characters",
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

      // 2. Get character from in-memory manager
      const currentCharacter = characterManager.getUserCharacterByUserId(user.id);
      if (!currentCharacter) {
        Report.warn("Character not found for user", { userId: user.id });
        set.status = 404;
        return { success: false, messageKey: "character.notFound" };
      }

      // 3. Get party to find location
      if (!currentCharacter.partyID) {
        Report.warn("Character has no party ID", { characterId: currentCharacter.id });
        set.status = 404;
        return { success: false, messageKey: "party.notFound" };
      }

      // Import partyManager here to avoid circular dependencies
      const { partyManager } = await import("../../Game/PartyManager");
      const party = partyManager.getPartyByID(currentCharacter.partyID);
      if (!party) {
        Report.warn("Party not found for character", {
          characterId: currentCharacter.id,
          partyId: currentCharacter.partyID,
        });
        set.status = 404;
        return { success: false, messageKey: "party.notFound" };
      }

      // 4. Get location - prefer character location, fallback to party location
      const locationId = currentCharacter.location || party.location;
      if (!locationId) {
        Report.warn("No location found for character or party", { 
          characterId: currentCharacter.id,
          partyId: party.partyID 
        });
        set.status = 404;
        return { success: false, messageKey: "location.notFound" };
      }

      // 5. Get all characters at this location (excluding current user's character)
      const allCharacters = characterManager.characters;
      const locationCharacters = allCharacters.filter(
        (char) => char.location === locationId && char.id !== currentCharacter.id
      );

      // 6. Map characters to frontend-friendly format with isPlayer and isOnline flags
      const characters = locationCharacters.map((char) => {
        const name = typeof char.name === 'string' ? char.name : char.name?.en || char.id;
        const isPlayer = char.userId !== null;
        
        // Check online status for player characters
        let isOnline: boolean | undefined = undefined;
        if (isPlayer && char.userId) {
          const connection = connectionManager.getConnectionByUserId(char.userId);
          isOnline = connection !== null;
        }

        return {
          id: char.id,
          name,
          portrait: char.portrait,
          level: char.level,
          race: char.race,
          gender: char.gender,
          background: char.background || null,
          isPlayer,
          isOnline,
        };
      });

      Report.debug(`Found ${characters.length} characters at location ${locationId} (excluding current user)`);

      return {
        success: true,
        characters,
        locationId,
      };
    } catch (error) {
      Report.error("Location characters fetch error", {
        error,
      });
      set.status = 500;
      return { success: false, messageKey: "location.charactersFetchFailed" };
    }
  })
  /**
   * GET /api/location/connected
   * Get current location and all connected locations for the logged-in user's character
   */
  .get("/connected", async ({ headers, set }) => {
    Report.debug("Connected locations request received", {
      route: "/location/connected",
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

      // 2. Get character from in-memory manager
      const character = characterManager.getUserCharacterByUserId(user.id);
      if (!character) {
        Report.warn("Character not found for user", { userId: user.id });
        set.status = 404;
        return { success: false, messageKey: "character.notFound" };
      }

      // 3. Get party to find location
      if (!character.partyID) {
        Report.warn("Character has no party ID", { characterId: character.id });
        set.status = 404;
        return { success: false, messageKey: "party.notFound" };
      }

      // Import partyManager here to avoid circular dependencies
      const { partyManager } = await import("../../Game/PartyManager");
      const party = partyManager.getPartyByID(character.partyID);
      if (!party) {
        Report.warn("Party not found for character", {
          characterId: character.id,
          partyId: character.partyID,
        });
        set.status = 404;
        return { success: false, messageKey: "party.notFound" };
      }

      // 4. Get location - prefer character location, fallback to party location
      const locationId = character.location || party.location;
      if (!locationId) {
        Report.warn("No location found for character or party", { 
          characterId: character.id,
          partyId: party.partyID 
        });
        set.status = 404;
        return { success: false, messageKey: "location.notFound" };
      }

      const location = locationManager.locations[locationId as LocationsEnum];
      if (!location) {
        Report.warn("Location not found in locationManager", { location: locationId });
        set.status = 404;
        return { success: false, messageKey: "location.notFound" };
      }

      // 5. Extract current location name from L10N
      const currentLocationName = typeof location.name === 'string' 
        ? location.name 
        : location.name?.en || location.id;

      // 6. Get connected locations
      const connectedLocations = location.connectedLocations.map((connected) => {
        const connectedLocationName = typeof connected.location.name === 'string'
          ? connected.location.name
          : connected.location.name?.en || connected.location.id;

        return {
          id: connected.location.id,
          name: connectedLocationName,
          distance: connected.distance,
        };
      });

      return {
        success: true,
        currentLocation: {
          id: location.id,
          name: currentLocationName,
        },
        connectedLocations,
      };
    } catch (error) {
      Report.error("Connected locations fetch error", {
        error,
      });
      set.status = 500;
      return { success: false, messageKey: "location.connectedFetchFailed" };
    }
  });

