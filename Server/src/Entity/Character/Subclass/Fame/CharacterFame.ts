import type { SubRegionEnum } from "../../../../InterFacesEnumsAndTypes/Enums/SubRegion";

export class CharacterFame {
  private fameMap: Map<SubRegionEnum, number>;

  constructor(initial?: Record<SubRegionEnum, number>) {
    this.fameMap = new Map(
      Object.entries(initial ?? {}) as [SubRegionEnum, number][],
    );
  }

  get(region: SubRegionEnum) {
    return this.fameMap.get(region) ?? 0;
  }

  set(region: SubRegionEnum, value: number) {
    this.fameMap.set(region, Math.max(0, value));
  }

  add(region: SubRegionEnum, delta: number) {
    this.set(region, this.get(region) + delta);
  }

  toJSON() {
    return Object.fromEntries(this.fameMap);
  }

  static fromJSON(data: Record<SubRegionEnum, number>) {
    return new CharacterFame(data);
  }
}
