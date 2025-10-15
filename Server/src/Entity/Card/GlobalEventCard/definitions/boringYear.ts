import { type GlobalEventCard } from "../GlobalEventCard";
import { GlobalEventCardEnum } from "../types";

export const boringYear: GlobalEventCard = {
    id: GlobalEventCardEnum.BoringYear,
    escalationTrack: [],
    startingScale: 250,
    onDraw: undefined,
    completionCondition: function (): boolean {
        return true
    }
}