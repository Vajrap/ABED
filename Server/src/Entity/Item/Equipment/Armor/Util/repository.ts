import { UtilId } from "../type";
import { idol } from "./definition/idol";
import { mechanic } from "./definition/mechanic";
import { relic } from "./definition/relic";
import { totem } from "./definition/totem";
import { Util } from "./Util";

export const utilRepository: Record<UtilId, Util> = {
  [UtilId.Idol]: idol,
  [UtilId.Relic]: relic,
  [UtilId.Totem]: totem,
  [UtilId.Mechanic]: mechanic,
};
