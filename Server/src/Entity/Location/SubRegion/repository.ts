import { SubRegionEnum } from "src/InterFacesEnumsAndTypes/Enums/SubRegion";
import { SubRegion } from "../SubRegion";
import { goldenPlainsData } from "./definition/goldenPlains";

// Create SubRegion instances from data to avoid circular dependencies
export const goldenPlains = new SubRegion(
  goldenPlainsData.id,
  goldenPlainsData.region,
  goldenPlainsData.locations,
  goldenPlainsData.speedBonus,
  goldenPlainsData.volatility,
  goldenPlainsData.weatherInterpretation,
);

export const subregionRepository: Record<SubRegionEnum, SubRegion> = {
  [SubRegionEnum.GoldenPlains]: goldenPlains,
};
