import type { LocationsEnum } from "../../../InterFacesEnumsAndTypes/Enums/Location";
import type {
  DayOfWeek,
  TimeOfDay,
} from "../../../InterFacesEnumsAndTypes/Time";
import type { Location } from "../Location";

class LocationManager {
  locations: Map<LocationsEnum, Location> = new Map();
  constructor(locations: Map<LocationsEnum, Location>) {
    this.locations = locations;
  }

  async processEncounters(day: DayOfWeek, phase: TimeOfDay) {
    for (const [_, location] of this.locations) {
      await location.processEncounters();
    }
  }

  async processActions(day: DayOfWeek, phase: TimeOfDay) {
    for (const [_, location] of this.locations) {
      await location.processActions(day, phase);
    }
  }
}
