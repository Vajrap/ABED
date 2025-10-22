import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { Location } from "../../Location";
import { goldenPlains } from "../../SubRegion/definition/goldenPlains";

export const waywardInn = new Location(
  LocationsEnum.WaywardInn,
  {
    en: "Wayward Inn",
    th: "โรงเตี๊ยมนักจร",
  },
  goldenPlains,
  [], // {location, distance}
  [],
  "CALM",
  // RandomEvent, InnConfig, weatherScale, resourceGeneration
);
