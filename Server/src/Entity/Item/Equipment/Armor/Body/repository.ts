import { BodyId } from "../type";
import type { Body } from "./Body";
import { chainMail } from "./definition/chainMail";
import { chainShirt } from "./definition/chainShirt";
import { hideArmor } from "./definition/hideArmor";
import { leatherArmor } from "./definition/leatherArmor";
import { mageRobe } from "./definition/mageRobe";
import { paddedArmor } from "./definition/paddedArmor";
import { plateArmor } from "./definition/plateMail";
import { robe } from "./definition/robe";
import { scaleMail } from "./definition/scaleMail";
import { splintMail } from "./definition/splintMail";
import { studdedLeatherArmor } from "./definition/studdedLeatherArmor";
import { tunic } from "./definition/tunic";

export const bodyRepository: Record<BodyId, Body> = {
  [BodyId.PaddedArmor]: paddedArmor,
  [BodyId.LeatherArmor]: leatherArmor,
  [BodyId.StuddedLeatherArmor]: studdedLeatherArmor,
  [BodyId.HideArmor]: hideArmor,
  [BodyId.ChainShirt]: chainShirt,
  [BodyId.ScaleMail]: scaleMail,
  [BodyId.ChainMail]: chainMail,
  [BodyId.SplintMail]: splintMail,
  [BodyId.PlateArmor]: plateArmor,
  [BodyId.Tunic]: tunic,
  [BodyId.Robe]: robe,
  [BodyId.MageRobe]: mageRobe,
};
