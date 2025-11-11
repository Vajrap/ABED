import { RailSegmentEnum, RailStationEnum } from "src/InterFacesEnumsAndTypes/Enums/RailStation";
import { RailSegment } from "../StationAndSegment";

export const segmentWaywardToMidland = new RailSegment(
    RailSegmentEnum.WaywardInnToMidland,
    {
      en: "Wayward Inn → Midland",
      th: "ทางรถไฟจากโรงเตี๊ยมนักจรสู่มิดแลนด์",
    },
    RailStationEnum.WaywardInn,
    RailStationEnum.Midland,
    120,
    4,
  );
  
  export const segmentMidlandToWayward = new RailSegment(
    RailSegmentEnum.MidlandToWaywardInn,
    {
      en: "Midland → Wayward Inn",
      th: "ทางรถไฟจากมิดแลนด์สู่โรงเตี๊ยมนักจร",
    },
    RailStationEnum.Midland,
    RailStationEnum.WaywardInn,
    120,
    4,
  );