import { FootId } from "../type";
import { chainBoots } from "./definition/chainBoots";
import { clothShoes } from "./definition/clothChoes";
import { leatherBoots } from "./definition/leatherBoots";
import { plateSabatons } from "./definition/plateSabatons";
import { travelerBoots } from "./definition/travelerBoots";
import { Foot } from "./Foot";

export const footRepository: Record<FootId, Foot> = {
  [FootId.ClothShoes]: clothShoes,
  [FootId.TravelerBoots]: travelerBoots,
  [FootId.LeatherBoots]: leatherBoots,
  [FootId.ChainBoots]: chainBoots,
  [FootId.PlateSabatons]: plateSabatons,
};
