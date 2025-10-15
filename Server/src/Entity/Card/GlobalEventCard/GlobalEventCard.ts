import { type EscalationThreshold, type ClimaxEvent, type EffectHandler, makeClimaxEvent, GlobalEventCardEnum, type GlobalEventCardConfig } from "./types";


export class GlobalEventCard {
  id: GlobalEventCardEnum;
  startingScale: number;
  onDraw: EffectHandler | undefined;
  escalationTrack: EscalationThreshold[];
  climaxEvent?: ClimaxEvent;
  completionCondition: () => boolean;
  
  constructor(config: GlobalEventCardConfig) {
    this.id = config.id;
    
    this.startingScale = config.startingScale ?? 250;
    this.onDraw = config.onDraw ?? undefined;
    this.escalationTrack = config.escalationTrack ?? [];
    this.climaxEvent = config.climaxEvent ?? makeClimaxEvent({});
    
    this.completionCondition = config.completionCondition ?? 
      (() => true);
  }
 
}