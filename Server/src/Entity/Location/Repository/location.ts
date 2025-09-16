import type { LocationsEnum } from "../../../InterFacesEnumsAndTypes/Enums/Location";
import type { Location } from "../Location";

// export const locationRepository: Location[] = [];

export const locationRepository: Map<LocationsEnum, Location> = new Map();
