import type { SubRegionEnum } from "../../../../InterFacesEnumsAndTypes/Enums/SubRegion";

export class CharacterFame {
  private fameMap: Map<SubRegionEnum, number>;

  constructor(initial?: Record<SubRegionEnum, number>) {
    this.fameMap = new Map(
      Object.entries(initial ?? {}) as [SubRegionEnum, number][],
    );
  }

  get(subRegion: SubRegionEnum): number {
    return this.fameMap.get(subRegion) ?? 0;
  }

  getString(subRegion: SubRegionEnum): string {
    return toFameString(this.get(subRegion));
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

// Fame string
function toFameString(value: number): string {
  if (value >= 12000) return "Legendary";
  if (value >= 6000) return "Heroic";
  if (value >= 2500) return "Famous";
  if (value >= 1000) return "Renowned";
  if (value >= 400) return "Recognized";
  if (value >= 150) return "Familiar";
  if (value >= 50) return "Known";
  return "No Name";
}
