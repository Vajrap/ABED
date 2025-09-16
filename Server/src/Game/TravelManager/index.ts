import type { RemoveLocationError } from "../../../Common/Text/TextEnum";
import { ActionInput } from "../../Entity/Character/Subclass/Action/CharacterAction";
import type { Region } from "../../Entity/Location/Regions";
import { locationRepository } from "../../Entity/Location/Repository/location";
import { regionRepository } from "../../Entity/Location/Repository/region";
import { subregionRepository } from "../../Entity/Location/Repository/subregion";
import type { SubRegion } from "../../Entity/Location/SubRegion";
import type { NewsWithScope } from "../../Entity/News/News";
import type { Party } from "../../Entity/Party/Party";
import type { LocationsEnum } from "../../InterFacesEnumsAndTypes/Enums/Location";
import type { DayOfWeek, TimeOfDay } from "../../InterFacesEnumsAndTypes/Time";
import { rollTwenty } from "../../Utils/Dice";
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

  async allTravel(day: DayOfWeek, phase: TimeOfDay): Promise<NewsWithScope[]> {
    let travelingParties = [];
    const newsWithScope: NewsWithScope[] = [];
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
      await this.travel(travelingParty);
      await this.checkPartyArrived(travelingParty);
    }

    return newsWithScope;
  }


  async travel(party: travelingParty) {
    // Early return if the party has no path or already arrived at the last location in the path. Which shouldn't happen.
    if (
      party.path.length === 0 ||
      party.currentLocationIndex === party.path.length - 1
    )
      return;

    /*
			Game Phase Advancement:

			The game consists of **4 phases per day**, with each phase lasting **15 minutes in real life**.
			At the start of each phase, the following events occur **in order**:

			1. Encounter Events:
			   - Any party with a **'justArrived' flag** has recently entered a location.
			   - **All 'justArrived' parties are shuffled randomly** to ensure fairness.
			   - One by one, each **randomly picks** an encounter partner from **any party** at the same location (including stationary ones).
			   - The selected pair resolves an **EncounterEvent** based on their relationship (battle, trade, or social interaction).
			   - **If the paired party was also 'justArrived',** it will no longer be available for future encounters in this phase.
			   - **This continues until all 'justArrived' parties are processed.**
			   - After resolving encounters, **all 'justArrived' flags are removed**.

			2. Stationary Actions:
			   - Any party **not traveling** resolves its actions for this phase.
			   - Examples: **Training, resting, trading, preparing for battle.**
			   - Stationary parties **can still be chosen** for Encounter Events.

			3. Travel:
			   - **All traveling parties move forward in their path.**
			   - **Order of movement:** Parties are sorted by **highest agility first.**
			   - **For each traveling party:**
			     1. **Determine if they will reach the next location** within this phase.
			     2. If **NOT reaching** the next location:
			        - Check for **random events** from the **current region's event pool.**
			        - If an event occurs, resolve it **before** continuing travel.
			        - The event **reduces the party’s travel distance**.
			     3. If **reaching** the next location:
			        - Check for **random events** from the **current region's event pool.**
			        - If an event occurs, resolve it **before** finalizing arrival.
			        - If the remaining distance **still allows reaching the next location** after the event, continue:
			            - Check for **random events** from the **new region's event pool**.
			            - If an event occurs, resolve it before the phase ends.
			        - If **no event happens,** the party simply arrives.
			   - **Upon arrival, the party is marked as 'justArrived'.**
		*/

    // Check if random 'Event' happens during travel.
    let regionToUse: Region;
    if (party.distanceCovered < 100) {
      regionToUse = getRegionFromName(party.currentLocation.mainRegion);
    } else {
      regionToUse = getRegionFromName(party.currentLocation.region);
    }

    let isEventHappen = false;

    const randomEventTrigger = didRandomEventTrigger(
      party.currentLocation.eventDC,
      "travel",
    );
    if (randomEventTrigger) {
      isEventHappen = true;
      const event = regionToUse.getRandomEvent();
      event.effect(party.party);
    }

    this.updateDistace(party, isEventHappen);

    if (party.checkIfArrivingNextLocation()) party.arrivedNextLocation();

    for (const character of party.party.characters) {
      let pace = party.party.behavior.travelPace;
      if (character !== "none") {
        character.moodDown(
          Dice.roll(DiceEnum.OneD4).sum +
            (pace === "fast" ? 8 : pace === "normal" ? 5 : 2),
        );
        character.energyDown(
          Dice.roll(DiceEnum.OneD6).sum +
            (pace === "fast" ? 20 : pace === "normal" ? 15 : 10),
        );
      }
    }
  }

  updateDistace(party: TravelingParty, isEventHappened: boolean = false) {
    const travelSpeed = party.getTravelSpeedOnSubRegion();

    let deviation = rollTwenty().total / 2 - 5;

    let thisTravelDistance = Math.max(0, travelSpeed + deviation);

    if (isEventHappened) {
      let progressFactor = thisTravelDistance / 100;
      let slowFactor = 1 - Math.random() * progressFactor;
      thisTravelDistance *= slowFactor;
    }

    party.distanceCovered += thisTravelDistance;
  }

  getSpeedModifierFromRegion(
    region: Region,
    travelMethod: TravelMethodEnum,
  ): number {
    let speedModifier = 0;
    speedModifier = region.getSpeedBonusModifire(travelMethod);
    return speedModifier;
  }

  async checkPartyArrived(travelingParty: travelingParty) {
    const nextLocation = travelingParty.getNextLocation();

    if (travelingParty.isTraveling === false) {
      return;
    }

    if (nextLocation === null) {
      // Shouldn't be happen?
      throw new Error(
        `Next location is null, partyID: ${travelingParty.party.partyID}`,
      );
    }

    if (
      travelingParty.distanceCovered >=
      travelingParty.currentLocation.calculateDistanceTo(nextLocation)
    ) {
      travelingParty.currentLocationIndex++;
      travelingParty.currentLocation = nextLocation;
      travelingParty.distanceCovered = 0;

      let isAtDestination =
        travelingParty.currentLocation === nextLocation ? true : false;

      screamer.scream(
        isAtDestination ? "DESTINATION_ARRIVED" : "LOCATION_ARRIVED",
        {
          partyID: travelingParty.party.partyID,
          location: travelingParty.currentLocation.id,
        },
      );

      // If the party has arrived at the destination, set isTraveling to false and path to the destination.
      if (isAtDestination) {
        travelingParty.isTraveling = false;
        travelingParty.path = [nextLocation];
      }
    } else {
      screamer.scream("TRAVEL_UPDATE", {
        partyID: travelingParty.party.partyID,
        currentLocation: travelingParty.currentLocation.id,
        distanceCovered: travelingParty.distanceCovered,
      });
    }
  }

  getTravelProgress(partyID: string): number {
    return (
      this.travelingParties[partyID].currentLocationIndex /
      (this.travelingParties[partyID].path.length - 1)
    );
  }

  getTravelTimeLeft(partyID: string): number {
    let remainingDistance = 0;
    let travelingParty = this.travelingParties[partyID];

    for (
      let i = travelingParty.currentLocationIndex;
      i < travelingParty.path.length - 1;
      i++
    ) {
      remainingDistance += travelingParty.path[i].calculateDistanceTo(
        travelingParty.path[i + 1],
      );
    }

    let travelSpeed =
      getTravelSpeedAndAverageLuckModifier(travelingParty).travelSpeed;

    return remainingDistance / travelSpeed;
  }

  // MARK: Event executions:
  async _executeBattleEvent(
    travelingParty: travelingParty,
    averageLuckModifier: number,
  ): Promise<boolean> {
    let regionToUse: Region;

    if (travelingParty.distanceCovered < 100) {
      regionToUse = getRegionFromName(
        travelingParty.currentLocation.mainRegion,
      );
    } else {
      regionToUse = getRegionFromName(travelingParty.currentLocation.region);
    }

    const { enemyList, enemyCombatPolicy } =
      regionToUse.rollForEnemies(averageLuckModifier);
    // TODO: Check if battle is initiated
    if (
      !checkIfCombatInitiated(
        travelingParty.party,
        // Check between two parties
        new Party([]),
        enemyCombatPolicy,
      )
    ) {
      // Return if the traveling party can move forward or not, so when no battle is initiated, the party can continue to move forward.
      return true;
    }

    let possiblePositions = [0, 1, 2, 3, 4, 5];
    let enemies = [];
    for (const enemyEnum of enemyList) {
      enemies.push(getEnemyFromRepository(enemyEnum));
    }

    if (enemies.length === 0) {
      throw new Error("Enemy length while creating party is 0");
    }

    let firstEnemyPosition = assignPreferredPosition(
      enemies[0] as Enemy,
      possiblePositions,
    );
    const enemyParty = new Party(
      [enemies[0]],
      travelingParty.currentLocation.id,
      firstEnemyPosition,
    );
    possiblePositions = possiblePositions.filter(
      (pos) => pos !== firstEnemyPosition,
    );

    for (let i = 1; i < enemies.length; i++) {
      let enemyPosition = assignPreferredPosition(
        enemies[i] as Enemy,
        possiblePositions,
      );
      enemyParty.addCharacterToParty(enemies[i], enemyPosition);
      possiblePositions = possiblePositions.filter(
        (pos) => pos !== enemyPosition,
      );
    }

    event_battle(
      travelingParty.party,
      enemyParty,
      travelingParty.party.location,
      BattleType.Normal,
    );
    return true;
  }
}

// MARK: Helper functions
function getAverageLuckModifier(party: travelingParty): number {
  let totalLuck = 0;
  let allCharacters = 0;
  for (const character of party.party.characters) {
    if (character !== "none") {
      totalLuck += character.status.luck();
      allCharacters++;
    }
  }

  return StatMod.value(totalLuck / allCharacters);
}

  let paceModifier = 0;
  switch (party.party.behavior.travelPace) {
    case "bold":
      paceModifier = 20;
      break;
    case "measured":
      paceModifier = 0;
      break;
    case "careful":
      paceModifier = -20;
      break;
    default:
      paceModifier = 0;
  }

  return (
    100 +
    statMod(totalAgility / numberOfCharacter) +
    subRegion.getSpeedBonusFor(party.currentTravelMethod) +
    paceModifier
  );
}

type RemoveLocationResult =
  | { success: true }
  | { success: false; reason: RemoveLocationError };
