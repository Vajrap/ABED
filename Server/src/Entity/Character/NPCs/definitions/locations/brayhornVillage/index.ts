import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { NPCsByLocation } from "../../../types";
import { eddaParty, harlParty, seraParty, jorenParty, mirelParty } from "./brayhornNPCs";

export const brayhornVillageNPCs: NPCsByLocation = {
  location: LocationsEnum.BrayhornVillage,
  npcsParty: [eddaParty, harlParty, seraParty, jorenParty, mirelParty],
};

