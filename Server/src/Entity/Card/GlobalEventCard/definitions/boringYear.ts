import { GlobalEventCard } from "../GlobalEventCard";
import { GlobalEventCardEnum } from "../types";

export const boringYear = new GlobalEventCard({
    id: GlobalEventCardEnum.BoringYear,
    name: "A Boring Year",
    description: "Nothing particularly interesting happens this year. The world continues as usual.",
    escalationTrack: [],
    startingScale: 250,
    onDraw: undefined,
    onEnd: undefined,
    completionCondition: () => true
});