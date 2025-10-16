import { type EscalationThreshold, type ClimaxEvent, type EffectHandler, type CleanupHandler, makeClimaxEvent, GlobalEventCardEnum, type GlobalEventCardConfig } from "./types";


export class GlobalEventCard {
  id: GlobalEventCardEnum;
  name: string;
  description: string;
  startingScale: number;
  onDraw: EffectHandler | undefined;
  onEnd: CleanupHandler | undefined;
  escalationTrack: EscalationThreshold[];
  climaxEvent?: ClimaxEvent;
  completionCondition: () => boolean;
  
  constructor(config: GlobalEventCardConfig) {
    this.id = config.id;
    this.name = config.name;
    this.description = config.description;
    this.startingScale = config.startingScale ?? 250;
    this.onDraw = config.onDraw ?? undefined;
    this.onEnd = config.onEnd ?? undefined;
    this.escalationTrack = config.escalationTrack ?? [];
    this.climaxEvent = config.climaxEvent ?? makeClimaxEvent({});
    
    this.completionCondition = config.completionCondition ?? 
      (() => true);
  }
 
}