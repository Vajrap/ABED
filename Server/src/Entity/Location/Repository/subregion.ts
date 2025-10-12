import type { SubRegionEnum } from "../../../InterFacesEnumsAndTypes/Enums/SubRegion";
import type { SubRegion } from "../SubRegion";

export const subregionRepository: Map<SubRegionEnum, SubRegion> = new Map();

export const drawSubRegionsWeatherCard = () => {
  for (const [_, subRegion] of subregionRepository) {
    subRegion.handleDailyWeatherUpdate();
  }
}