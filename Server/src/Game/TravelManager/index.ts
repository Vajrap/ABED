import type { RemoveLocationError } from "../../../Common/Text/TextEnum";
import { ActionInput } from "../../Entity/Character/Subclass/Action/CharacterAction";
import type { Region } from "../../Entity/Location/Regions";
import { locationRepository } from "../../Entity/Location/Repository/location";
import { regionRepository } from "../../Entity/Location/Repository/region";
import { subregionRepository } from "../../Entity/Location/Repository/subregion";
import type { SubRegion } from "../../Entity/Location/SubRegion";
import {
  emptyNewsStruct,
  type NewsEmittedFromLocationStructure,
  type NewsWithScope,
} from "../../Entity/News/News";
import type { Party } from "../../Entity/Party/Party";
import type { LocationsEnum } from "../../InterFacesEnumsAndTypes/Enums/Location";
import type { DayOfWeek, TimeOfDay } from "../../InterFacesEnumsAndTypes/Time";
import { roll, rollTwenty } from "../../Utils/Dice";
import { mergeNewsStructures } from "../../Utils/mergeNewsStructure";
import Report from "../../Utils/Reporter";
import { statMod } from "../../Utils/statMod";
import { TravelingParty } from "./TravelingParty";
import { TravelMethodEnum } from "./TravelMethod";

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
    Report.error(`Party Not found`, { partyID });
    if (party === undefined) return false;

    let currentLocation = locationRepository.get(party.currentLocation);
    Report.error("Current location not found in repository", {
      current: party.currentLocation,
    });
    if (currentLocation === undefined) return false;

    let targetLocation = locationRepository.get(locationName);
    Report.error("Target location not found in repository", {
      target: locationName,
    });
    if (targetLocation === undefined) return false;

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
          .get(lastLocation)
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

  async allTravel(
    day: DayOfWeek,
    phase: TimeOfDay,
  ): Promise<NewsEmittedFromLocationStructure> {
    let travelingParties = [];
    const newsWithScope = emptyNewsStruct();
    for (const [partyId, travelingParty] of this.travelingParties) {
      if (
        travelingParty.party.actionSequence[day][phase] === ActionInput.Travel
      ) {
        travelingParties.push(travelingParty);
      }
    }

    if (travelingParties.length === 0) return newsWithScope;

    travelingParties.sort((a, b) => {
      return b.getAverageAgility() - a.getAverageAgility();
    });

    // TODO, collect news and add to news with scope here
    for (const travelingParty of travelingParties) {
      const result = this.travel(travelingParty);

      if (result) {
        mergeNewsStructures(newsWithScope, result);
      }
    }

    return newsWithScope;
  }

  travel(party: TravelingParty): NewsEmittedFromLocationStructure | null {
    // Early return if the party has no path or already arrived at the last location in the path. Which shouldn't happen.
    if (
      party.path.length === 0 ||
      party.currentLocationIndex === party.path.length - 1
    )
      return null;

    // Check if random 'Event' happens during travel.
    const location = locationRepository.get(party.currentLocation);
    if (!location) return null;
    const subRegion = subregionRepository.get(location.subRegion);
    const region = regionRepository.get(location.region);
    if (!subRegion || !region) return null;
    const randomRoll = rollTwenty().total;
    const randomEvent = location.getRandomEventFor("travel", randomRoll);

    let isEventHappen = false;
    let travelNews = emptyNewsStruct();

    // Get Random Event Result
    if (randomEvent) {
      const result = randomEvent(party.party.getCharacters());
      if (result.scope.kind === "worldScope") {
        travelNews.worldScope.push(result.news);
      } else if (result.scope.kind === "regionScope") {
        travelNews.regionScope.set(result.scope.region, [result.news]);
      } else if (result.scope.kind === "subRegionScope") {
        travelNews.subRegionScope.set(result.scope.subRegion, [result.news]);
      } else if (result.scope.kind === "locationScope") {
        travelNews.locationScope.set(result.scope.location, [result.news]);
      } else if (result.scope.kind === "partyScope") {
        travelNews.partyScope.set(result.scope.partyId, [result.news]);
      } else if (result.scope.kind === "privateScope") {
        travelNews.privateScope.set(result.scope.characterId, [result.news]);
      }
      isEventHappen = true;
    }

    // Update travel distance, if randomEvent happen, it might shorten the distance
    this.updateDistace(party, isEventHappen);

    // Deal with the arrival
    const handleResult = this.handlePartyArrival(party);
    if (handleResult.reachNextLocation) {
      // TODO: Add news of reaching new location here
    }
    if (handleResult.atDestination) {
      // TODO: Add news of reaching destination here
    }

    // Decrease mood and energy after travelling
    for (const character of party.party.characters) {
      let pace = party.party.behavior.travelPace;
      if (character !== "none") {
        // Mood might not decrease
        const moodDec = pace === "bold" ? 8 : pace === "measured" ? 5 : 0;
        character.needs.decrease("mood", roll(1).d(4).total + moodDec - 1);

        const energyDec = pace === "bold" ? 20 : pace === "measured" ? 15 : 10;
        character.needs.decrease("energy", roll(1).d(6).total + energyDec);
      }
    }

    return travelNews;
  }

  updateDistace(party: TravelingParty, isEventHappened: boolean = false) {
    const travelSpeed = party.getTravelSpeedOnSubRegion();

    const bonus = party.getTravelBonus();

    let deviation = rollTwenty().total / 2 - 5;

    let thisTravelDistance = Math.max(0, travelSpeed + deviation + bonus);

    if (isEventHappened) {
      let progressFactor = thisTravelDistance / 100;
      let slowFactor = 1 - Math.random() * progressFactor;
      thisTravelDistance *= slowFactor;
    }

    party.distanceCovered += thisTravelDistance;
  }

  handlePartyArrival(travelingParty: TravelingParty): {
    currentLocation: LocationsEnum;
    reachNextLocation: boolean;
    atDestination: boolean;
  } {
    // Check if distance > current to next, if > then current became next
    // Check if new current is the same one as last location in path, which seems to be done by the same get Next function
    // If so, it reach destination, isTraveling = false

    const currentLocation = locationRepository.get(
      travelingParty.currentLocation,
    )!;
    const firstNextLocationEnum = travelingParty.getNextLocation();
    const nextLocation = locationRepository.get(firstNextLocationEnum)!;

    let reachNextLocation = false;
    let atDestination = false;

    if (
      travelingParty.distanceCovered >=
      currentLocation.getDistanceTo(nextLocation)!
    ) {
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
        travelingParty.path = [travelingParty.getNextLocation()];
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

//   let paceModifier = 0;
//   switch (party.party.behavior.travelPace) {
//     case "bold":
//       paceModifier = 20;
//       break;
//     case "measured":
//       paceModifier = 0;
//       break;
//     case "careful":
//       paceModifier = -20;
//       break;
//     default:
//       paceModifier = 0;
//   }

//   return (
//     100 +
//     statMod(totalAgility / numberOfCharacter) +
//     subRegion.getSpeedBonusFor(party.currentTravelMethod) +
//     paceModifier
//   );
// }

type RemoveLocationResult =
  | { success: true }
  | { success: false; reason: RemoveLocationError };

export const travelManager = new TravelManager();
