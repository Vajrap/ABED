import type { RemoveLocationError } from "../../../Common/Text/TextEnum";
import { ActionInput } from "../../Entity/Character/Subclass/Action/CharacterAction";
import { locationRepository, subregionRepository, regionRepository } from "src/Entity/Location/repository";
import {
  createNews,
  emptyNewsDistribution,
  newsArrayToStructure,
  type NewsDistribution,
} from "../../Entity/News/News";
import type { Party } from "../../Entity/Party/Party";
import type { LocationsEnum } from "../../InterFacesEnumsAndTypes/Enums/Location";
import { DayOfWeek, TimeOfDay } from "../../InterFacesEnumsAndTypes/Time";
import { roll, rollTwenty } from "../../Utils/Dice";
import { mergeNewsStructures } from "../../Utils/mergeNewsStructure";
import Report from "../../Utils/Reporter";
import { statMod } from "../../Utils/statMod";
import { TravelingParty } from "./TravelingParty";
import { TravelMethodEnum } from "./TravelMethod";
import { L10NWithEntities } from "../../InterFacesEnumsAndTypes/L10N";
import { GameTime } from "../GameTime/GameTime";

class TravelManager {
  travelingParties: Map<string, TravelingParty> = new Map();

  addParty(party: Party) {
    const travelingParty = new TravelingParty(
      party,
      [party.location],
      TravelMethodEnum.walk,
    );

    this.travelingParties.set(party.partyID, travelingParty);
  }

  addLocationToPath(partyID: string, locationName: LocationsEnum): boolean {
    const party = this.travelingParties.get(partyID);
    if (party === undefined) {
      Report.error(`Party Not found`, { partyID });
      return false;
    }

    let currentLocation = locationRepository[party.currentLocation];
    if (currentLocation === undefined) {
      Report.error("Current location not found in repository", {
        current: party.currentLocation,
      });
      return false;
    }

    let targetLocation = locationRepository[locationName];
    if (targetLocation === undefined) {
      Report.error("Target location not found in repository", {
        target: locationName,
      });
      return false;
    }

    if (party.path.length === 0) {
      if (currentLocation.checkIfLocationConnected(targetLocation)) {
        party.path.push(locationName);
        return true;
      } else {
        Report.error("Current location is not connected to target location", {
          current: currentLocation.id,
          target: targetLocation.id,
        });
        return false;
      }
    } else {
      // Check if the adding location is connected to the 'last location of this path' or not.
      let lastLocation = party.path[party.path.length - 1];
      Report.error("Last location not found in repository", {
        last: lastLocation,
      });
      if (lastLocation === undefined) return false;
      if (
        locationRepository
          [lastLocation]
          ?.checkIfLocationConnected(targetLocation)
      ) {
        party.path.push(locationName);
        return true;
      } else {
        Report.error("Last location is not connected to target location", {
          last: lastLocation,
          target: targetLocation.id,
        });
        return false;
      }
    }
  }

  // Used during planning
  removeLocationFromPath(
    partyID: string,
    location: LocationsEnum,
  ): RemoveLocationResult {
    const party = this.travelingParties.get(partyID);
    if (!party) {
      Report.error("Party not found while removing location", {
        partyID,
      });
      return { success: false, reason: "PARTY_NOT_FOUND" };
    }
    if (party.isTraveling === true) {
      return {
        success: false,
        reason: "MUST_STOP_TRAVELING",
      };
    }

    // If it's the location in position 0, we can't remove it.
    if (location === party.path[0]) {
      return {
        success: false,
        reason: "CANNOT_REMOVE_STARTING_LOCATION",
      };
    }

    //Can only remove the location at the last position of the path
    if (party.path[party.path.length - 1] === location) {
      party.path.pop();
      return { success: true };
    } else {
      return {
        success: false,
        reason: "CAN_ONLY_REMOVE_LAST",
      };
    }
  }

  async allTravel(day: DayOfWeek, phase: TimeOfDay): Promise<NewsDistribution> {
    let travelingParties = [];
    const newsWithScope = emptyNewsDistribution();
    
    Report.info(`[TravelManager.allTravel] Checking ${this.travelingParties.size} traveling parties for day=${day}, phase=${phase}`);
    
    for (const [partyId, travelingParty] of this.travelingParties) {
      const scheduledAction = travelingParty.party.actionSequence[day]?.[phase];
      const partyLocation = travelingParty.party.location;
      const destination = travelingParty.path.length > 0 ? travelingParty.path[travelingParty.path.length - 1] : "none";
      
      Report.info(`[TravelManager.allTravel] Party ${partyId}: location=${partyLocation}, destination=${destination}, scheduled action=${scheduledAction}, expected=Travel, isTraveling=${travelingParty.party.isTraveling}`);
      
      if (scheduledAction === ActionInput.Travel) {
        travelingParties.push(travelingParty);
        Report.info(`[TravelManager.allTravel] ✓ Party ${partyId} has Travel scheduled for ${day} ${phase}`);
      }
    }

    if (travelingParties.length === 0) {
      Report.info(`[TravelManager.allTravel] No parties scheduled for travel at ${day} ${phase}`);
      return newsWithScope;
    }
    
    Report.info(`[TravelManager.allTravel] Processing ${travelingParties.length} traveling parties`);

    travelingParties.sort((a, b) => {
      return b.getAverageAgility() - a.getAverageAgility();
    });

    // TODO, collect news and add to news with scope here
    for (const travelingParty of travelingParties) {
      Report.info(`[TravelManager.allTravel] Processing travel for party ${travelingParty.party.partyID}`);
      const result = this.travel(travelingParty);

      if (result) {
        mergeNewsStructures(newsWithScope, result);
        Report.info(`[TravelManager.allTravel] Travel processed for party ${travelingParty.party.partyID}`);
      } else {
        Report.warn(`[TravelManager.allTravel] Travel returned null for party ${travelingParty.party.partyID}`);
      }
    }

    Report.info(`[TravelManager.allTravel] Completed processing ${travelingParties.length} traveling parties`);
    return newsWithScope;
  }

  stopTravel(partyId: string) {
    const travelingParty = this.travelingParties.get(partyId);
    if (!travelingParty) return;

    travelingParty.isTraveling = false;
    this.travelingParties.delete(partyId);
  }

  travel(party: TravelingParty): NewsDistribution | null {
    Report.info(`[TravelManager.travel] Starting travel for party ${party.party.partyID}: currentLocation=${party.currentLocation}, currentLocationIndex=${party.currentLocationIndex}, path=${JSON.stringify(party.path)}, distanceCovered=${party.distanceCovered}`);
    
    // Early return if the party has no path or already arrived at the last location in the path. Which shouldn't happen.
    if (
      party.path.length === 0 ||
      party.currentLocationIndex === party.path.length - 1
    ) {
      Report.info(`[TravelManager.travel] Early return: path.length=${party.path.length}, currentLocationIndex=${party.currentLocationIndex}, path.length-1=${party.path.length - 1}`);
      return null;
    }

    // Check if random 'Event' happens during travel.
    const location = locationRepository[party.currentLocation];
    if (!location) {
      Report.warn(`[TravelManager.travel] Location not found for ${party.currentLocation}`);
      return null;
    }
    const subRegion = subregionRepository[location.subRegion];
    const region = regionRepository[location.region];
    if (!subRegion || !region) return null;
    const randomRoll = rollTwenty().total;
    const randomEvent = location.getRandomEventFor("travel", randomRoll);

    let isEventHappen = false;
    let travelNews = emptyNewsDistribution();

    // Get Random Event Result
    if (randomEvent) {
      const result = randomEvent(party.party.getCharacters());
      if (!result) return null;
      travelNews = newsArrayToStructure([result]);

      isEventHappen = true;
    }

    // Update travel distance, if randomEvent happen, it might shorten the distance
    const distanceBefore = party.distanceCovered;
    this.updateDistace(party, isEventHappen);
    const distanceAfter = party.distanceCovered;
    const distanceAdded = distanceAfter - distanceBefore;
    
    Report.info(`[TravelManager.travel] After updateDistace: distanceCovered=${party.distanceCovered} (added ${distanceAdded}), currentLocation=${party.currentLocation}, currentLocationIndex=${party.currentLocationIndex}, path=${JSON.stringify(party.path)}`);

    // Deal with the arrival
    const handleResult = this.handlePartyArrival(party);
    Report.info(`[TravelManager.travel] handlePartyArrival result: reachNextLocation=${handleResult.reachNextLocation}, atDestination=${handleResult.atDestination}, currentLocation=${handleResult.currentLocation}`);
    if (handleResult.reachNextLocation) {
      // Move party to the new location (partyMovesIn will update party.location)
      const oldLocation = locationRepository[party.party.location];
      const newLocation = locationRepository[handleResult.currentLocation];
      if (oldLocation && newLocation && oldLocation.id !== newLocation.id) {
        oldLocation.partyMoveOut(party.party);
        newLocation.partyMovesIn(party.party);
      }
      
      const leader = party.party.leader;
      const locId = handleResult.currentLocation;
      let locName = locationRepository[locId]?.name;
      if (!locName) {
        Report.error("Location name not found in repository");
        locName = {
          en: "Undefined",
          th: "ไม่ระบุ",
        };
      }

      const news = createNews({
        scope: {
          kind: "partyScope",
          partyId: party.party.partyID,
        },
        content: L10NWithEntities(
          {
            en: `[char:${leader.id}]${leader.name}[/char]'s party has reached [loc:${locId}]${locName.en}[/loc]`,
            th: `ปาร์ตี้ของ [char:${leader.id}]${leader.name}[/char] เดินทางมาถึง [loc:${locId}]${locName.th}[/loc]`,
          },
          {
            characters: [leader],
            locations: [locId],
          },
        ),
        context: {
          region: region.id,
          subRegion: subRegion.id,
          location: party.currentLocation,
          partyId: party.party.partyID,
          characterIds: party.party.characters.map((character) =>
            character !== "none" ? character.id : "",
          ),
        },
      });
      travelNews = mergeNewsStructures(
        travelNews,
        newsArrayToStructure([news]),
      );
    }
    if (handleResult.atDestination) {
      // Remove party from travel manager since they've reached their destination
      this.travelingParties.delete(party.party.partyID);
      Report.info(`[TravelManager.travel] Removed party ${party.party.partyID} from travelingParties after reaching destination`);

      const leader = party.party.leader;
      const locId = party.currentLocation;
      let locName = locationRepository[locId]?.name;
      if (!locName) {
        Report.error("Location name not found in repository");
        locName = {
          en: "Undefined",
          th: "ไม่ระบุ",
        };
      }

      const news = createNews({
        scope: {
          kind: "partyScope",
          partyId: party.party.partyID,
        },
        content: L10NWithEntities(
          {
            en: `[char:${leader.id}]${leader.name}[/char]'s party has arrived at [loc:${locId}]${locName.en}[/loc]!`,
            th: `ปาร์ตี้ของ [char:${leader.id}]${leader.name}[/char] มาถึง [loc:${locId}]${locName.th}[/loc] แล้ว!`,
          },
          {
            characters: [leader],
            locations: [locId],
          },
        ),
        context: {
          region: region.id,
          subRegion: subRegion.id,
          location: party.currentLocation,
          partyId: party.party.partyID,
          characterIds: party.party.characters.map((character) =>
            character !== "none" ? character.id : "",
          ),
        },
      });
      travelNews = mergeNewsStructures(
        travelNews,
        newsArrayToStructure([news]),
      );
    }

    // Decrease mood and energy after travelling
    for (const character of party.party.characters) {
      let pace = party.party.behavior.travelPace;
      if (character !== "none") {
        // Mood might not decrease
        const moodDec = pace === "bold" ? 8 : pace === "measured" ? 5 : 0;
        character.needs.decMood(roll(1).d(4).total + moodDec - 1);

        const energyDec = pace === "bold" ? 20 : pace === "measured" ? 15 : 10;
        character.needs.decEnergy(roll(1).d(6).total + energyDec);
      }
    }

    return travelNews;
  }

  updateDistace(party: TravelingParty, isEventHappened: boolean = false) {
    const travelSpeed = party.getTravelSpeedOnSubRegion();
    const bonus = party.getTravelBonus();
    let deviation = rollTwenty().total / 2 - 5;

    let thisTravelDistance = Math.max(0, travelSpeed + deviation + bonus);
    
    Report.info(`[TravelManager.updateDistace] travelSpeed=${travelSpeed}, bonus=${bonus}, deviation=${deviation}, thisTravelDistance=${thisTravelDistance} (before event check)`);

    if (isEventHappened) {
      let progressFactor = thisTravelDistance / 100;
      let slowFactor = 1 - Math.random() * progressFactor;
      thisTravelDistance *= slowFactor;
      Report.info(`[TravelManager.updateDistace] Event happened, thisTravelDistance after event=${thisTravelDistance}`);
    }

    party.distanceCovered += thisTravelDistance;
    Report.info(`[TravelManager.updateDistace] Final: distanceCovered=${party.distanceCovered} (added ${thisTravelDistance})`);
  }

  handlePartyArrival(travelingParty: TravelingParty): {
    currentLocation: LocationsEnum;
    reachNextLocation: boolean;
    atDestination: boolean;
  } {
    // Check if distance > current to next, if > then current became next
    // Check if new current is the same one as last location in path, which seems to be done by the same get Next function
    // If so, it reach destination, isTraveling = false


    const currentLocation = locationRepository[travelingParty.currentLocation];
    if (!currentLocation) {
      Report.error("Current location not found in repository", {
        current: travelingParty.currentLocation,
      });
      return {
        currentLocation: travelingParty.currentLocation,
        reachNextLocation: false,
        atDestination: false,
      } 
    }
    const firstNextLocationEnum = travelingParty.getNextLocation();
    const nextLocation = locationRepository[firstNextLocationEnum];
    if (!nextLocation) {
      Report.error("Next location not found in repository", {
        next: firstNextLocationEnum,
      });
      return {
        currentLocation: travelingParty.currentLocation,
        reachNextLocation: false,
        atDestination: false,
      };
    }

    const distanceRequired = currentLocation.getDistanceTo(nextLocation);
    Report.info(`[TravelManager.handlePartyArrival] distanceCovered=${travelingParty.distanceCovered}, distanceRequired=${distanceRequired}, currentLocation=${travelingParty.currentLocation}, nextLocation=${firstNextLocationEnum}, path=${JSON.stringify(travelingParty.path)}, currentLocationIndex=${travelingParty.currentLocationIndex}`);

    let reachNextLocation = false;
    let atDestination = false;

    if (distanceRequired !== undefined && travelingParty.distanceCovered >= distanceRequired) {
      reachNextLocation = true;
      travelingParty.currentLocationIndex++;
      travelingParty.currentLocation = firstNextLocationEnum;
      travelingParty.distanceCovered = 0;

      // This already get new next locationEnum compared to the firstNextLocationEnum if currentLocation is changed
      atDestination =
        travelingParty.currentLocation === travelingParty.getNextLocation()
          ? true
          : false;

      // If the party has arrived at the destination, set isTraveling to false and path to the destination.
      if (atDestination) {
        travelingParty.isTraveling = false;
        travelingParty.party.isTraveling = false;
        travelingParty.path = [travelingParty.getNextLocation()];
        clearTravelFromFuturePhases(travelingParty.party);
      }
    }

    return {
      currentLocation: travelingParty.currentLocation,
      reachNextLocation,
      atDestination,
    };
  }
}

// MARK: Helper functions
/**
 * Clear Travel actions from future phases in party action sequence
 * Called when travel completes to clean up the schedule
 */
function clearTravelFromFuturePhases(party: Party): void {
  const currentDay = GameTime.getCurrentGameDayOfWeek();
  const currentPhase = GameTime.getCurrentGamePhase();
  
  const allDays: DayOfWeek[] = [
    DayOfWeek.laoh,
    DayOfWeek.rowana,
    DayOfWeek.aftree,
    DayOfWeek.udur,
    DayOfWeek.matris,
    DayOfWeek.seethar,
  ];
  const allPhases: TimeOfDay[] = [
    TimeOfDay.morning,
    TimeOfDay.afternoon,
    TimeOfDay.evening,
    TimeOfDay.night,
  ];
  
  // Find current indices
  const currentDayIndex = allDays.indexOf(currentDay);
  const currentPhaseIndex = allPhases.indexOf(currentPhase);
  
  if (currentDayIndex === -1 || currentPhaseIndex === -1) {
    Report.warn("Could not determine current day/phase for clearing travel actions", {
      partyId: party.partyID,
      currentDay,
      currentPhase,
    });
    return;
  }
  
  // Clear Travel from all future phases
  for (let dayIndex = currentDayIndex; dayIndex < allDays.length; dayIndex++) {
    const day = allDays[dayIndex];
    if (!day) continue;
    
    const startPhaseIndex = dayIndex === currentDayIndex ? currentPhaseIndex + 1 : 0;
    
    const dayActions = party.actionSequence[day];
    if (!dayActions) {
      continue;
    }
    
    for (let phaseIndex = startPhaseIndex; phaseIndex < allPhases.length; phaseIndex++) {
      const phase = allPhases[phaseIndex];
      if (!phase) continue;
      
      if (dayActions[phase] === ActionInput.Travel) {
        dayActions[phase] = ActionInput.None;
        Report.debug("Cleared Travel action from completed travel schedule", {
          partyId: party.partyID,
          day,
          phase,
        });
      }
    }
  }
}

function getAverageLuckModifier(party: TravelingParty): number {
  let totalLuck = 0;
  let allCharacters = 0;
  for (const character of party.party.characters) {
    if (character !== "none") {
      totalLuck += character.attribute.getTotal("luck");
      allCharacters++;
    }
  }

  return statMod(totalLuck / allCharacters);
}

type RemoveLocationResult =
  | { success: true }
  | { success: false; reason: RemoveLocationError };

export const travelManager = new TravelManager();

