import { BodyId } from "../type";
import type { Body } from "./Body";
import { chainMail } from "./definition/ChainMail";
import { chainShirt } from "./definition/ChainShirt";
import { hideArmor } from "./definition/HideArmor";
import { leatherArmor } from "./definition/leatherArmor";
import { mageRobe } from "./definition/MageRobe";
import { paddedArmor } from "./definition/paddedArmor";
import { plateArmor } from "./definition/PlateMail";
import { robe } from "./definition/Robe";
import { scaleMail } from "./definition/ScaleMail";
import { splintMail } from "./definition/SplintMail";
import { studdedLeatherArmor } from "./definition/studdedLeatherArmor";
import { tunic } from "./definition/Tunic";

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
