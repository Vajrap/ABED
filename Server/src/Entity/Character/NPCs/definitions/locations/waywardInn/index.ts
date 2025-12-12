import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { NPCsByLocation } from "../../../types";
import { barKeepers } from "./barKeepers";
import { adventurers } from "./adventurers";

export const waywardInnNPCs: NPCsByLocation = {
  location: LocationsEnum.WaywardInn,
  npcsParty: [barKeepers, adventurers],
};
