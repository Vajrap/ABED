import type { Location } from "../../Entity/Location/Location";
import { locationRepository, subregionRepository } from "../../Entity/Location/repository";
import type { Party } from "../../Entity/Party/Party";
import type { LocationsEnum } from "../../InterFacesEnumsAndTypes/Enums/Location";
import { statMod } from "../../Utils/statMod";
import type { TravelMethodEnum } from "./TravelMethod";
import Report from "../../Utils/Reporter";

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
    const averageAgility = this.getAverageAgility();
    const agilityMod = statMod(averageAgility);
    const baseSpeed = 30 + agilityMod;
    
    Report.info(`[TravelingParty.getTravelSpeedOnSubRegion] averageAgility=${averageAgility}, agilityMod=${agilityMod}, baseSpeed=${baseSpeed}`);
    
    let paceModifier = 0;
    const travelPace = this.party.behavior.travelPace;
    Report.info(`[TravelingParty.getTravelSpeedOnSubRegion] travelPace="${travelPace}"`);
    
    switch (travelPace) {
      case "bold":
        paceModifier = 1.3;
        break;
      case "measured":
        paceModifier = 1;
        break;
      case "careful":
        paceModifier = 0.7;
        break;
      default:
        Report.error(`[TravelingParty.getTravelSpeedOnSubRegion] Unknown travel pace: "${travelPace}"`);
        paceModifier = 1; // Default to measured pace
        break;
    }
    
    Report.info(`[TravelingParty.getTravelSpeedOnSubRegion] paceModifier=${paceModifier}`);
    
    const location = locationRepository[this.currentLocation];
    if (!location) {
      Report.error(`[TravelingParty.getTravelSpeedOnSubRegion] Location not found: ${this.currentLocation}`);
      return 0;
    }
    
    const subRegionObj = subregionRepository[location.subRegion];
    if (!subRegionObj) {
      Report.error(`[TravelingParty.getTravelSpeedOnSubRegion] SubRegion not found for location ${this.currentLocation}, subRegion=${location.subRegion}`);
      return 0;
    }
    
    const speedBonus = subRegionObj.getSpeedBonusFor(this.currentTravelMethod); // TravelMethodEnum values match "walk" | "horse" | "caravan"
    Report.info(`[TravelingParty.getTravelSpeedOnSubRegion] currentTravelMethod=${this.currentTravelMethod}, speedBonus=${speedBonus}`);
    
    if (speedBonus === undefined || speedBonus === null) {
      Report.error(`[TravelingParty.getTravelSpeedOnSubRegion] Speed bonus is undefined/null for travel method ${this.currentTravelMethod}`);
      return 0;
    }
    
    // speedBonus is an ADDITIVE modifier (like getTravelBonus), not multiplicative
    // Positive values = bonus, negative values = penalty, 0 = neutral
    // First calculate base speed with pace modifier, then add terrain bonus
    const speedWithBonus = baseSpeed + speedBonus;
    const speedWithPace = speedWithBonus * paceModifier;
    const result = Math.max(0, speedWithPace); // Ensure non-negative
    Report.info(`[TravelingParty.getTravelSpeedOnSubRegion] Final calculation: (${baseSpeed} + ${speedBonus}) * ${paceModifier} = ${speedWithBonus} * ${paceModifier} = ${result}`);
    
    return result;
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
