import { Elysia, t } from "elysia";
import Report from "../../Utils/Reporter";
import { SessionService } from "../../Services/SessionService";
import { characterManager } from "../../Game/CharacterManager";
import { partyManager } from "../../Game/PartyManager";
import { locationManager } from "../../Entity/Location/Manager/LocationManager";
import { travelManager } from "../../Game/TravelManager";
import { railTravelManager } from "../../Game/TravelManager/Rail";
import type { CharacterActionSequence } from "../../Entity/Character/Subclass/Action/CharacterAction";
import { ActionInput, type CharacterAction } from "../../Entity/Character/Subclass/Action/CharacterAction";
import type { PartyActionSequence } from "../../Entity/Party/ActionlSequence/PartyActionSequence";
import type { LocationsEnum } from "../../InterFacesEnumsAndTypes/Enums/Location";
import type { RailStationEnum } from "../../InterFacesEnumsAndTypes/Enums/RailStation";
import type { Party } from "../../Entity/Party/Party";
import { TravelMethodEnum } from "../../Game/TravelManager/TravelMethod";
import { RailTravelingParty } from "../../Game/TravelManager/Rail";
import { railStationRepository } from "../../Game/TravelManager/Rail/repository";
import { DayOfWeek, TimeOfDay } from "../../InterFacesEnumsAndTypes/Time";
import { CharacterService } from "../../Services/CharacterService";

// PartyActionOption is not exported, define it locally
type PartyActionOption =
  | ActionInput.None
  | ActionInput.Travel
  | ActionInput.RailTravel
  | ActionInput.Inn
  | ActionInput.Camping
  | ActionInput.HouseRest;

type ConvertedAction = {
  day: DayOfWeek;
  time: TimeOfDay;
  originalAction: ActionInput;
  convertedTo: ActionInput;
  reason: string;
};

type UpdateActionsResponse = {
  status: "SUCCESS" | "FAIL";
  reason?: string;
  CAS?: CharacterActionSequence;
  convertedActions?: ConvertedAction[];
  PAS?: PartyActionSequence;
  travelState?: {
    isTraveling: boolean;
    isOnRail: boolean;
    currentLocation: LocationsEnum;
  };
};

interface TravelState {
  isTraveling: boolean;
  isOnRail: boolean;
  currentLocation: LocationsEnum;
}

function getTravelState(party: Party): TravelState {
  const isOnRail = railTravelManager.party.some(
    (rp) => rp.party.partyID === party.partyID && !rp.completed
  );

  return {
    isTraveling: party.isTraveling || false,
    isOnRail,
    currentLocation: party.location,
  };
}

function getAllowedActionsForParty(party: Party): ActionInput[] {
  const travelState = getTravelState(party);
  const location = locationManager.locations[party.location as LocationsEnum];

  if (!location) {
    return [ActionInput.None];
  }

  // If actively on rail travel, only allow rail-related actions
  if (travelState.isOnRail) {
    return [ActionInput.None, ActionInput.Rest];
  }

  // If party has a destination set (isTraveling = true), they can still do normal actions
  // Travel will only happen when they schedule Travel action in a specific slot
  // Return location's available actions plus Travel (if destination is set)
  const locationActions = location.actions || [ActionInput.None];
  
  // Add Travel to available actions if party has a destination set
  if (travelState.isTraveling) {
    const travelingParty = travelManager.travelingParties.get(party.partyID);
    if (travelingParty && travelingParty.path.length > 0) {
      // Party has a destination, Travel action is available
      return [...locationActions, ActionInput.Travel];
    }
  }

  return locationActions;
}

// Schema for request validation
const UpdateActionsSchema = t.Object({
  characterID: t.Optional(t.String()),
  actionSequence: t.Record(
    t.String(),
    t.Record(t.String(), t.Any())
  ),
  haltTravel: t.Optional(t.Boolean()),
  travelPath: t.Optional(t.Array(t.String())),
  travelMethod: t.Optional(t.Union([t.Literal("walk"), t.Literal("horse"), t.Literal("caravan")])),
  railTravelTo: t.Optional(t.String()),
});

export const actionsRoutes = new Elysia({ prefix: "/actions" })
  .onError(({ code, error, set }) => {
    if (code === "VALIDATION") {
      Report.warn("Actions validation error", {
        error: error.message,
        code,
      });
      set.status = 400;
      return { 
        status: "FAIL" as const, 
        reason: "Invalid request body" 
      };
    }
    const errorMessage = error instanceof Error ? error.message : String(error);
    Report.error("Actions route error", {
      code,
      error: errorMessage,
      stack: error instanceof Error ? error.stack : undefined,
    });
    set.status = 500;
    return { 
      status: "FAIL" as const, 
      reason: errorMessage 
    };
  })
  /**
   * POST /api/actions/update
   * Update character action sequence and optionally party action sequence
   */
  .post(
    "/update",
    async ({ body, headers, set }) => {
      Report.debug("Update actions request received", {
        route: "/actions/update",
      });

      try {
        // 1. Validate session
        const authHeader = headers.authorization;
        const token = authHeader?.split(" ")[1];
        
        if (!token) {
          set.status = 401;
          return { 
            status: "FAIL" as const, 
            reason: "No authentication token provided" 
          };
        }

        const user = await SessionService.validateSession(token);
        if (!user) {
          set.status = 401;
          return { 
            status: "FAIL" as const, 
            reason: "Invalid session" 
          };
        }

        const { characterID, actionSequence: rawActionSequence, haltTravel, travelPath, travelMethod, railTravelTo } = body;
        
        // Cast actionSequence to proper type (Elysia validation ensures structure)
        const actionSequence = rawActionSequence as CharacterActionSequence;

        // 3. Get character - by userId or characterID
        let character;
        if (characterID) {
          try {
            character = characterManager.getCharacterByID(characterID);
            // Validate character belongs to user
            if (character.userId !== user.id) {
              Report.warn("Character does not belong to user", {
                userId: user.id,
                characterId: characterID,
              });
              set.status = 403;
              return { 
                status: "FAIL" as const, 
                reason: "Character does not belong to user" 
              };
            }
          } catch (error) {
            Report.warn("Character not found", { characterId: characterID });
            set.status = 404;
            return { 
              status: "FAIL" as const, 
              reason: "Character not found" 
            };
          }
        } else {
          character = characterManager.getUserCharacterByUserId(user.id);
          if (!character) {
            Report.warn("Character not found for user", { userId: user.id });
            set.status = 404;
            return { 
              status: "FAIL" as const, 
              reason: "Character not found" 
            };
          }
        }

        // 4. Get party
        if (!character.partyID) {
          Report.warn("Character has no party ID", { characterId: character.id });
          set.status = 400;
          return { 
            status: "FAIL" as const, 
            reason: "Character is not in a party" 
          };
        }

        let party;
        try {
          party = partyManager.getPartyByID(character.partyID);
        } catch (error) {
          Report.warn("Party not found", { partyId: character.partyID });
          set.status = 404;
          return { 
            status: "FAIL" as const, 
            reason: "Party not found" 
          };
        }

        // 5. Validate location exists
        const location = locationManager.locations[party.location as LocationsEnum];
        if (!location) {
          Report.warn("Location not found", { location: party.location, partyId: party.partyID });
          set.status = 404;
          return { 
            status: "FAIL" as const, 
            reason: "Location not found" 
          };
        }

        // 6. Handle travel state management (halt travel if requested)
        if (haltTravel === true) {
          party.isTraveling = false;
          // Remove from travel managers if present
          const travelingParty = travelManager.travelingParties.get(party.partyID);
          if (travelingParty) {
            travelManager.stopTravel(party.partyID);
          }
          const railPartyIndex = railTravelManager.party.findIndex(
            (rp) => rp.party.partyID === party.partyID && !rp.completed
          );
          if (railPartyIndex !== -1) {
            railTravelManager.removeParty(party.partyID);
          }
        }

        // Check if character is party leader (needed for travel planning)
        const isLeader = party.leader.id === character.id;

        // 5a. Handle travel planning (normal travel)
        if (travelPath && travelPath.length > 0) {
          // Only leader can set travel plans
          if (!isLeader) {
            set.status = 403;
            return {
              status: "FAIL" as const,
              reason: "Only party leader can set travel plans",
            };
          }

          // Validate that all locations in path are valid LocationsEnum
          const validLocations = travelPath.every(
            (loc) => loc in locationManager.locations
          );
          
          if (!validLocations) {
            set.status = 400;
            return {
              status: "FAIL" as const,
              reason: "Invalid location(s) in travel path",
            };
          }

          // Stop any existing travel first
          const existingTravelingParty = travelManager.travelingParties.get(party.partyID);
          if (existingTravelingParty) {
            travelManager.stopTravel(party.partyID);
          }

          // Remove any existing rail travel
          const existingRailParty = railTravelManager.party.find(
            (rp) => rp.party.partyID === party.partyID && !rp.completed
          );
          if (existingRailParty) {
            railTravelManager.removeParty(party.partyID);
          }

          // Add party to travel manager
          travelManager.addParty(party);

          // Set travel method
          const method = travelMethod ? TravelMethodEnum[travelMethod] : TravelMethodEnum.walk;
          const travelingParty = travelManager.travelingParties.get(party.partyID);
          if (travelingParty) {
            travelingParty.currentTravelMethod = method;
          }

          // Build travel path
          for (const locationName of travelPath) {
            const success = travelManager.addLocationToPath(
              party.partyID,
              locationName as LocationsEnum
            );
            if (!success) {
              // Clean up on failure
              travelManager.stopTravel(party.partyID);
              set.status = 400;
              return {
                status: "FAIL" as const,
                reason: `Failed to add location ${locationName} to travel path. Path may be invalid or disconnected.`,
              };
            }
          }

          // Set party as traveling
          party.isTraveling = true;
          const finalTravelingParty = travelManager.travelingParties.get(party.partyID);
          if (finalTravelingParty) {
            finalTravelingParty.isTraveling = true;
          }
        }

        // 5b. Handle rail travel planning
        if (railTravelTo) {
          // Only leader can set travel plans
          if (!isLeader) {
            set.status = 403;
            return {
              status: "FAIL" as const,
              reason: "Only party leader can set travel plans",
            };
          }

          // Validate rail station exists
          if (!(railTravelTo in railStationRepository)) {
            set.status = 400;
            return {
              status: "FAIL" as const,
              reason: `Invalid rail station: ${railTravelTo}`,
            };
          }

          // Check if current location has a train station
          const location = locationManager.locations[party.location];
          if (!location || !location.trainStationId) {
            set.status = 400;
            return {
              status: "FAIL" as const,
              reason: "Current location does not have a train station",
            };
          }

          // Stop any existing travel first
          const existingTravelingParty = travelManager.travelingParties.get(party.partyID);
          if (existingTravelingParty) {
            travelManager.stopTravel(party.partyID);
          }

          // Remove any existing rail travel
          const existingRailParty = railTravelManager.party.find(
            (rp) => rp.party.partyID === party.partyID && !rp.completed
          );
          if (existingRailParty) {
            railTravelManager.removeParty(party.partyID);
          }

          // Create rail travel party
          try {
            const railTravelingParty = new RailTravelingParty(
              party,
              location.trainStationId,
              railTravelTo as RailStationEnum
            );
            railTravelManager.addParty(railTravelingParty);
            party.isTraveling = true;
          } catch (error) {
            set.status = 400;
            return {
              status: "FAIL" as const,
              reason: error instanceof Error ? error.message : "Failed to create rail travel route",
            };
          }
        }

        // 6. Get travel state and allowed actions based on context
        const travelState = getTravelState(party);
        const allowedActions = getAllowedActionsForParty(party);

        // 7. Validate and convert invalid actions to Rest (don't reject)
        const convertedActions: ConvertedAction[] = [];
        const updatedCAS: CharacterActionSequence = { ...actionSequence };

        for (const day of Object.values(DayOfWeek)) {
          for (const time of Object.values(TimeOfDay)) {
            const action = actionSequence[day]?.[time];
            if (!action) continue;

            const actionType = action.type as ActionInput;
            
            // None action is always allowed
            if (actionType === ActionInput.None) continue;
            
            // RailTravel is always allowed (handled separately)
            if (actionType === ActionInput.RailTravel) {
              continue;
            }
            
            // Validate Travel action - party must have a destination set
            if (actionType === ActionInput.Travel) {
              const travelingParty = travelManager.travelingParties.get(party.partyID);
              if (!travelingParty || travelingParty.path.length === 0) {
                // No destination set, convert Travel to Rest
                updatedCAS[day][time] = { type: ActionInput.Rest } as CharacterAction;
                convertedActions.push({
                  day,
                  time,
                  originalAction: ActionInput.Travel,
                  convertedTo: ActionInput.Rest,
                  reason: "Cannot travel: no destination set. Set a destination first.",
                });
                Report.debug("Travel action converted to Rest - no destination set", {
                  partyId: party.partyID,
                  day,
                  time,
                });
              }
              // If destination is set, allow Travel action (continue)
              continue;
            }
            
            // Check if action is allowed in current context
            if (!allowedActions.includes(actionType)) {
              // Convert to Rest instead of rejecting
              updatedCAS[day][time] = { type: ActionInput.Rest } as CharacterAction;
              const reason = travelState.isOnRail
                ? "Action not allowed while on rail travel"
                : travelState.isTraveling
                ? "Action not allowed while traveling"
                : "Action not allowed in current location";
              
              convertedActions.push({
                day,
                time,
                originalAction: actionType,
                convertedTo: ActionInput.Rest,
                reason,
              });
              Report.debug("Action converted to Rest", {
                action: actionType,
                day,
                time,
                reason,
              });
            }
          }
        }

        // 8. Update Party Action Sequence if character is leader
        // (isLeader already checked above for travel planning)
        const updatedPAS: PartyActionSequence = { ...party.actionSequence };

        if (isLeader) {
          // Match CAS with PartyActionOption and update PAS
          for (const day of Object.values(DayOfWeek)) {
            for (const time of Object.values(TimeOfDay)) {
              const casAction = actionSequence[day]?.[time];
              if (!casAction) continue;

              const casActionType = casAction.type as ActionInput;
              
              // Check if CAS action matches a PartyActionOption
              const partyActionOptions: PartyActionOption[] = [
                ActionInput.None,
                ActionInput.Travel,
                ActionInput.RailTravel,
                ActionInput.Inn,
                ActionInput.Camping,
                ActionInput.HouseRest,
              ];

              if (partyActionOptions.includes(casActionType as PartyActionOption)) {
                updatedPAS[day][time] = casActionType as PartyActionOption;
              } else {
                // CAS doesn't match PAS option, set to None
                updatedPAS[day][time] = ActionInput.None;
              }
            }
          }
          party.actionSequence = updatedPAS;
        }

        // 10. Update Character Action Sequence
        // BUT: PAS takes precedence - if PAS has a value (not None), 
        // we need to force CAS to match PAS for that slot
        // Use updatedPAS (which may have been modified if user is leader) or current PAS
        const currentPAS = isLeader ? updatedPAS : party.actionSequence;
        
        for (const day of Object.values(DayOfWeek)) {
          for (const time of Object.values(TimeOfDay)) {
            const pasAction = currentPAS[day][time];
            
            // If PAS has a group action (not None), force CAS to match
            if (pasAction !== ActionInput.None) {
              const casAction = updatedCAS[day]?.[time];
              const casActionType = casAction?.type as ActionInput;
              
              // If CAS doesn't match PAS, force CAS to match PAS for this slot
              if (casActionType !== pasAction) {
                // Force CAS to match PAS for this slot
                updatedCAS[day][time] = { type: pasAction } as CharacterAction;
                convertedActions.push({
                  day,
                  time,
                  originalAction: casActionType,
                  convertedTo: pasAction,
                  reason: "Party action sequence takes precedence",
                });
                Report.debug("CAS slot forced to match PAS", {
                  day,
                  time,
                  pasAction,
                  originalCAS: casActionType,
                });
              }
            }
          }
        }

        // Update character's action sequence
        character.actionSequence = updatedCAS;

        // Persist to database immediately
        try {
          await CharacterService.updateCharacterInDatabase(character);
          Report.debug("Character actionSequence persisted to database", {
            characterId: character.id,
          });
        } catch (dbError) {
          Report.error("Failed to persist actionSequence to database", {
            error: dbError instanceof Error ? dbError.message : String(dbError),
            characterId: character.id,
          });
          // Don't fail the request if DB persistence fails - it will be retried on next periodic save
        }

        // Get updated travel state (may have changed if haltTravel was set)
        const updatedTravelState = getTravelState(party);

        Report.info("Actions updated successfully", {
          userId: user.id,
          characterId: character.id,
          isLeader,
          convertedActions: convertedActions.length,
          travelState: updatedTravelState,
        });

        // 11. Return response
        // Return the PAS that will be used (updatedPAS if leader, otherwise current party.actionSequence)
        const responsePAS = isLeader ? updatedPAS : party.actionSequence;
        
        return {
          status: "SUCCESS" as const,
          CAS: updatedCAS,
          convertedActions,
          PAS: responsePAS,
          travelState: updatedTravelState,
        } as UpdateActionsResponse;

      } catch (error) {
        Report.error("Update actions error", {
          error,
        });
        set.status = 500;
        return { 
          status: "FAIL" as const, 
          reason: error instanceof Error ? error.message : "Unknown error" 
        };
      }
    },
    {
      body: UpdateActionsSchema,
    }
  );
