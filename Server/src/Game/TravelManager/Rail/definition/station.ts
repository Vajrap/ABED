import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { RailSegmentEnum, RailStationEnum } from "src/InterFacesEnumsAndTypes/Enums/RailStation";
import { RailStation } from "../StationAndSegment";

export const waywardInn = new RailStation(
    RailStationEnum.WaywardInn,
    LocationsEnum.WaywardInn,
    { en: "Wayward Junction", th: "ทางแยกเวย์เวิร์ด" },
    {
      forward: RailSegmentEnum.WaywardInnToMidland,
      backward: RailSegmentEnum.MidlandToWaywardInn,
    },
  );
  
  export const midland = new RailStation(
    RailStationEnum.Midland,
    LocationsEnum.WaywardInn, // TODO: replace with actual Midland location when defined
    { en: "Midland Platform", th: "ชานชาลามิดแลนด์" },
    {
      forward: RailSegmentEnum.MidlandToWaywardInn,
      backward: RailSegmentEnum.WaywardInnToMidland,
    },
  );
  