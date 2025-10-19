import { GlobalEventCard } from "../GlobalEventCard";
import { GlobalEventCardEnum } from "../types";

export const boringYear = new GlobalEventCard({
    id: GlobalEventCardEnum.BoringYear,
    name: {
        en: "A Boring Year",
        th: "ปีที่ไม่น่าสนใจ"
    },
    description: {
        en: "Nothing particularly interesting happens this year. The world continues as usual.",
        th: "ไม่มีเหตุการณ์ที่น่าสนใจอะไรเลยนี้ ประเทศยังคงดำรงอยู่อย่างปกติ"
    },
    escalationTrack: [],
    startingScale: 250,
    onDraw: undefined,
    onEnd: undefined,
    completionCondition: () => true
});