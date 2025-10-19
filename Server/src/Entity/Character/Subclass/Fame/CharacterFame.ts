import type { SubRegionEnum } from "src/InterFacesEnumsAndTypes/Enums/SubRegion.ts";
import type {L10N} from "src/InterFacesEnumsAndTypes/L10N.ts";

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

  set(region: SubRegionEnum, value: number) {
    this.fameMap.set(region, Math.max(0, value));
  }

  add(region: SubRegionEnum, delta: number) {
      this.set(region, this.get(region) + delta);
  }
}

// Fame string
// function toFameString(value: number): L10N {
//   if (value >= 12000) return {en: "Legendary", th: "ตำนาน"};
//   if (value >= 6000) return {en: "Heroic", th: "วีรบุรุษ"};
//   if (value >= 2500) return {en: "Famous", th: "นับหน้าถือตา"};
//   if (value >= 1000) return {en: "Renowned", th: "โด่งดังไปทั่ว"};
//   if (value >= 400) return {en: "Recognized", th: "คนมีชื่อเสียง"};
//   if (value >= 150) return {en: "Familiar", th: "เริ่มมีชื่อเสียง"};
//   if (value >= 50) return {en: "Known", th: "คนคุ้นหน้า"};
//   return {en: "No name", th: "ไม่มีคนรู้จัก"};
// }
