import type { RegionEnum } from "../../InterFacesEnumsAndTypes/Enums/Region";

export class Region {
  id: RegionEnum;
  constructor(id: RegionEnum) {
    this.id = id;
  }
}
