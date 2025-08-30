import type { LocationsEnum } from "../../InterFacesEnumsAndTypes/Enums/Location";
import type { RegionEnum } from "../../InterFacesEnumsAndTypes/Enums/Region";
import type { SubRegionEnum } from "../../InterFacesEnumsAndTypes/Enums/SubRegion";
import type { SubRegion } from "./SubRegion";

export class Location {
  id: LocationsEnum;
  subRegion: SubRegionEnum;
  region: RegionEnum;
  party: any[] = [];
  innType: any[] = [];

  /*
    normally the chance for any event to occur is DC 15 == about 25% chance
  Need a better think through, cause this means 'ANY KIND' 'GOOD OR BAD' event have the same possibility of occuring.
  The better idea would be, a list of all possible event with dice face number?
  And might need range, like
  > 1 worst event
  > 2-5 bad event, battle, raid, etc
  > 6-14 nothing happended,
  > 15-19 good event, like treasure, quest, etc
  > 20 critically good event?

  This way, team average luck modifier plays some role in it.
  But I still want it to mostly have no events flare up much

  Also, we need to think about random event for specific kind of Character action, like train, learn, craft. Cause we might need to trimmed down only possible event on each actions.
  */
  eventDC: number = 15;
  constructor(id: LocationsEnum, subRegion: SubRegion) {
    this.id = id;
    this.subRegion = subRegion.id;
    this.region = subRegion.region;
  }
}
