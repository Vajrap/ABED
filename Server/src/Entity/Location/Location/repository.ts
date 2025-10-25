import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { Location } from "../Location";
import { SubRegionEnum } from "src/InterFacesEnumsAndTypes/Enums/SubRegion";
import { waywardInn } from "./definition/waywardInn";


export const locationRepository: Record<LocationsEnum, Location> = {
  [LocationsEnum.WaywardInn]: waywardInn,
};

export const getLocationBySubRegion = (subRegion: SubRegionEnum) => {
  return Object.values(locationRepository).filter(
    (location) => location.subRegion === subRegion,
  );
};
