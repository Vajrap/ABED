import { SubRegionEnum } from "src/InterFacesEnumsAndTypes/Enums/SubRegion";
import type { SubRegion } from "../SubRegion";
import { goldenPlains } from "./definition/goldenPlains";

export const subregionRepository: Record<SubRegionEnum, SubRegion> = {
  [SubRegionEnum.GoldenPlains]: goldenPlains,
};
