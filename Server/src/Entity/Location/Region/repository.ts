import { RegionEnum } from "src/InterFacesEnumsAndTypes/Enums/Region";
import type { Region } from "../Regions";
import { centralPlain } from "./definition/centralPlain";

export const regionRepository: Record<RegionEnum, Region> = {
  [RegionEnum.CentralPlain]: centralPlain,
};
