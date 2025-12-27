import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { NPCsByLocation } from "../../../types";
import { barKeepers } from "./barKeepers";
import { adventurers } from "./adventurers";
import { waywardCompany } from "./waywardCompany";
import { maerinParty, kethraParty } from "./wanderers";

export const waywardInnNPCs: NPCsByLocation = {
  location: LocationsEnum.WaywardInn,
  npcsParty: [barKeepers, adventurers, waywardCompany, maerinParty, kethraParty],
};
