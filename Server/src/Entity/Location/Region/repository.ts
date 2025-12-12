import { RegionEnum } from "src/InterFacesEnumsAndTypes/Enums/Region";
import type { Region } from "../Regions";
import { centralPlain } from "./definition/centralPlain";
import { southernShore } from "./definition/southernShore";
import { easternFrontier } from "./definition/easterFrontier";
import { westernForest } from "./definition/westernForest";
import { northernReaches } from "./definition/northernReaches";
import { silenceDesert } from "./definition/silenceDesert";
import { atmahnForest } from "./definition/atmahnForest";
import { borealFrost } from "./definition/borealFrost";

export const regionRepository: Record<RegionEnum, Region> = {
  [RegionEnum.CentralPlain]: centralPlain,
  [RegionEnum.SouthernShore]: southernShore,
  [RegionEnum.EasternFrontier]: easternFrontier,
  [RegionEnum.WesternForest]: westernForest,
  [RegionEnum.NorthernReaches]: northernReaches,
  [RegionEnum.SilentDesert]: silenceDesert,
  [RegionEnum.Atmahn]: atmahnForest,
  [RegionEnum.BorealFrost]: borealFrost,
};
