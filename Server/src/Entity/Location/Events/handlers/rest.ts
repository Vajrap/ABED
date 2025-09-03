import type { Character } from "../../../Character/Character";
import { ActionInput } from "../../../Character/Subclass/Action/ActionInput";

export function handleRestAction(
  character: Character,
  type:
    | ActionInput.Rest
    | ActionInput.Inn
    | ActionInput.Camping
    | ActionInput.HouseRest
    | ActionInput.None,
) {}
