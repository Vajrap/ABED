import type { LocationsEnum } from "../../InterFacesEnumsAndTypes/Enums/Location";
import type { SubRegionEnum } from "../../InterFacesEnumsAndTypes/Enums/SubRegion";
import type { Location } from "../Location/Location";

// export const locationRepository: Location[] = [];

export const locationRepository: Map<LocationsEnum, Location> = new Map();
// add method call getLocatoinBySubRegion for location repository
export const getLocationBySubRegion = (subRegion: SubRegionEnum) => {
  return Array.from(locationRepository.values()).filter(
    (location) => location.subRegion === subRegion,
  );
};