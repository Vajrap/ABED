import type { Location } from "../../Entity/Location/Location";
import { locationRepository, subregionRepository } from "../../Entity/Location/repository";
import type { Party } from "../../Entity/Party/Party";
import type { LocationsEnum } from "../../InterFacesEnumsAndTypes/Enums/Location";
import { statMod } from "../../Utils/statMod";
import type { TravelMethodEnum } from "./TravelMethod";

export class TravelingParty {
  party: Party;
  currentLocation: LocationsEnum;
  currentLocationIndex: number;
  distanceCovered: number;
  path: LocationsEnum[];
  isTraveling: boolean;
  currentTravelMethod: TravelMethodEnum;

  constructor(
    party: Party,
    path: LocationsEnum[],
    currentTravelMethod: TravelMethodEnum,
  ) {
    this.party = party;
    this.currentLocation = party.location;
    this.currentLocationIndex = 0;
    this.distanceCovered = 0;
    this.path = path;
    this.isTraveling = false;
    this.currentTravelMethod = currentTravelMethod;
  }

  getCurrentLocation(): LocationsEnum {
    return this.currentLocation;
  }

  getNextLocation(): LocationsEnum {
    return this.currentLocationIndex < this.path.length - 1
      ? this.path[this.currentLocationIndex + 1]!
      : this.currentLocation;
  }

  arriveNextLocation(): void {
    if (this.currentLocationIndex < this.path.length - 1) {
      this.currentLocationIndex++;
      this.currentLocation = this.path[this.currentLocationIndex]!;
      this.distanceCovered = 0;

      const location = locationRepository[this.currentLocation];
      location.partyMovesIn(this.party);
    }
  }

  checkIfArrivingNextLocation(): boolean {
    if (this.currentLocationIndex >= this.path.length - 1) {
      return false;
    }
    const nextLocation = locationRepository[this.path[this.currentLocationIndex + 1]!];
    

    const location = locationRepository[this.currentLocation];

    return this.distanceCovered >= location.getDistanceTo(nextLocation)!;
  }

  getAverageEnergy(): number {
    const energy = this.party.characters
      .filter((c) => c !== "none")
      .reduce((sum, c) => sum + c.needs.energy.current, 0);
    return energy / this.party.characters.length;
  }

  getAverageSatiety(): number {
    const satiety = this.party.characters
      .filter((c) => c !== "none")
      .reduce((sum, c) => sum + c.needs.satiety.current, 0);
    return satiety / this.party.characters.length;
  }

  getTravelSpeedOnSubRegion(): number {
    const baseSpeed = 30 + statMod(this.getAverageAgility()); // Will need to think of equipment later on
    let paceModifier = 0;
    switch (this.party.behavior.travelPace) {
      case "bold":
        paceModifier = 1.3;
        break;
      case "measured":
        paceModifier = 1;
        break;
      case "careful":
        paceModifier = 0.7;
        break;
    }
    const subRegion = subregionRepository[locationRepository[this.currentLocation]!.subRegion]
      .getSpeedBonusFor(this.currentTravelMethod); // Likely be multiplier like walk:1, horse: 2, caravan: 0.7 etc, base on subRegion context;
    return baseSpeed * paceModifier * subRegion;
  }

  getAverageMood(): number {
    const mood = this.party.characters
      .filter((c) => c !== "none")
      .reduce((sum, c) => sum + c.needs.mood.current, 0);
    return mood / this.party.characters.length;
  }

  getTravelBonus(): number {
    const bonus = this.party.characters
      .filter((c) => c !== "none")
      .reduce(
        (sum, c) =>
          sum +
          (c.needs.mood.modifier +
            c.needs.energy.modifier +
            c.needs.satiety.modifier) /
            3,
        0,
      );
    return Math.floor(bonus / this.party.characters.length);
  }

  getAverageAgility(): number {
    const agi = this.party.characters
      .filter((c) => c !== "none")
      .reduce((sum, c) => sum + c.attribute.getStat("agility").total, 0);
    return agi / this.party.characters.length;
  }

  getAverageLuck(): number {
    const luck = this.party.characters
      .filter((c) => c !== "none")
      .reduce((sum, c) => sum + c.attribute.getStat("luck").total, 0);
    return luck / this.party.characters.length;
  }
}
