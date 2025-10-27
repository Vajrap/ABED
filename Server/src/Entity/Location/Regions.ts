import { RegionEnum } from "src/InterFacesEnumsAndTypes/Enums/Region";
import { L10N } from "src/InterFacesEnumsAndTypes/L10N";

export class Region {
  id: RegionEnum;
  name: L10N;
  constructor(id: RegionEnum, name: L10N) {
    this.id = id;
    this.name = name;
  }
}
