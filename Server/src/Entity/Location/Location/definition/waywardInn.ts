import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { Location } from "../../Location";
import { SubRegionEnum } from "src/InterFacesEnumsAndTypes/Enums/SubRegion";
import { RailStationEnum } from "src/InterFacesEnumsAndTypes/Enums/RailStation";

export const waywardInn = new Location(
  LocationsEnum.WaywardInn,
  {
    en: "Wayward Inn",
    th: "โรงเตี๊ยมนักจร",
  },
  SubRegionEnum.GoldenPlains,
  [],
  [],
  "CALM"
);

waywardInn.setTrainStation(RailStationEnum.WaywardInn);