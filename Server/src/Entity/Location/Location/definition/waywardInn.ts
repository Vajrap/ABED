import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { Location } from "../../Location";
import { SubRegionEnum } from "src/InterFacesEnumsAndTypes/Enums/SubRegion";

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
)