import type { RegionEnum } from "../../InterFacesEnumsAndTypes/Enums/Region";
import type { SubRegionEnum } from "../../InterFacesEnumsAndTypes/Enums/SubRegion";

export class SubRegion {
  id: SubRegionEnum;
  region: RegionEnum;
  constructor(id: SubRegionEnum, region: RegionEnum) {
    this.id = id;
    this.region = region;
  }

  get regionName(): string {
    return this.region.toString();
  }
}
