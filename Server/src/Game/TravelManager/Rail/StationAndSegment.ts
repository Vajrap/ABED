import {
  RailSegmentEnum,
  RailStationEnum,
} from "src/InterFacesEnumsAndTypes/Enums/RailStation";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import type { L10N } from "src/InterFacesEnumsAndTypes/L10N";
import type { TimeOfDay } from "src/InterFacesEnumsAndTypes/Time";

export class RailStation {
  constructor(
    public id: RailStationEnum,
    public location: LocationsEnum,
    public name: L10N,
    public connections: {
      forward: RailSegmentEnum;
      backward: RailSegmentEnum;
    },
    public operatingHours?: {
      start: TimeOfDay;
      end: TimeOfDay;
    },
  ) {}
}

export class RailSegment {
  constructor(
    public id: RailSegmentEnum,
    public name: L10N,
    public from: RailStationEnum,
    public to: RailStationEnum,
    public distance: number,
    public travelTimePhases: number,
  ) {}
}