import { HandId } from "../type";
import { clothGloves } from "./definition/clothGloves";
import { leatherGloves } from "./definition/leatherGloves";
import { reinforcedGloves } from "./definition/reinforceGloves";
import { steelGauntlets } from "./definition/steelGaunlets";
import { Hand } from "./Hand";

export const handRepository: Record<HandId, Hand> = {
  [HandId.ClothGloves]: clothGloves,
  [HandId.LeatherGloves]: leatherGloves,
  [HandId.ReinforcedGloves]: reinforcedGloves,
  [HandId.SteelGauntlets]: steelGauntlets,
};
