import { BlueprintId } from "./enum";
import { Blueprint } from "./Blueprint";
import {
  blueprintAlloyBronzeIngot,
  blueprintAlloyElectrumIngot,
  blueprintAlloySteelIngot,
  blueprintInfusionAethersteelIngot,
  blueprintInfusionVoidforgedIngot,
  blueprintSmeltingCopperIngot,
  blueprintSmeltingGoldIngot,
  blueprintSmeltingIronIngot,
  blueprintSmeltingSilverIngot,
  blueprintSmeltingTinIngot,
} from "./definition";
import { blueprintWeaponAxe } from "./Equipment/Weapon/Axe/axe";
import { blueprintWeaponBroadAxe } from "./Equipment/Weapon/Axe/broadAxe";
import { blueprintWeaponWarAxe } from "./Equipment/Weapon/Axe/warAxe";
import { blueprintWeaponKnife } from "./Equipment/Weapon/Dagger/knife";
import { blueprintWeaponStiletto } from "./Equipment/Weapon/Dagger/stiletto";
import { blueprintWeaponShortSword } from "./Equipment/Weapon/Sword/shortSword";
import { blueprintWeaponLongSword } from "./Equipment/Weapon/Sword/longSword";
import { blueprintWeaponRapier } from "./Equipment/Weapon/Sword/rapier";
import { blueprintWeaponGreatSword } from "./Equipment/Weapon/Sword/greatSword";
import { blueprintWeaponKatana } from "./Equipment/Weapon/Blade/katana";
import { blueprintWeaponScimitar } from "./Equipment/Weapon/Blade/scimitar";
import { blueprintWeaponCutlass } from "./Equipment/Weapon/Blade/cutlass";
import { blueprintWeaponFalchion } from "./Equipment/Weapon/Blade/falchion";
import { blueprintWeaponHammer } from "./Equipment/Weapon/Hammer/hammer";
import { blueprintWeaponMorningStar } from "./Equipment/Weapon/Hammer/morningStar";
import { blueprintWeaponScepter } from "./Equipment/Weapon/Hammer/scepter";
import { blueprintWeaponWarHammer } from "./Equipment/Weapon/Hammer/warHammer";
import { blueprintWeaponDory } from "./Equipment/Weapon/Spear/dory";
import { blueprintWeaponJavelin } from "./Equipment/Weapon/Spear/javelin";
import { blueprintWeaponHalberd } from "./Equipment/Weapon/Spear/halberd";
import { blueprintWeaponShortBow } from "./Equipment/Weapon/Bow/shortBow";
import { blueprintWeaponLongBow } from "./Equipment/Weapon/Bow/longBow";
import { blueprintWeaponCrossbow } from "./Equipment/Weapon/Bow/crossbow";
import { blueprintWeaponStaff } from "./Equipment/Weapon/Staff/staff";
import { blueprintWeaponQuarterStaff } from "./Equipment/Weapon/Staff/quarterStaff";
import { blueprintWeaponLongestStaff } from "./Equipment/Weapon/Staff/longestStaff";
import { blueprintWeaponBuckler } from "./Equipment/Weapon/Shield/buckler";
import { blueprintWeaponKiteShield } from "./Equipment/Weapon/Shield/kiteShield";
import { blueprintWeaponTowerShield } from "./Equipment/Weapon/Shield/towerShield";
import { blueprintWeaponBible } from "./Equipment/Weapon/Tome/bible";
import { blueprintWeaponCodex } from "./Equipment/Weapon/Tome/codex";
import { blueprintWeaponGrimoire } from "./Equipment/Weapon/Tome/grimoire";
import { blueprintWeaponWand } from "./Equipment/Weapon/Wand/wand";
import { blueprintWeaponOrb } from "./Equipment/Weapon/Orb/orb";

export const blueprintRepository: Record<BlueprintId, Blueprint> = {
  [BlueprintId.Smelting_CopperIngot]: blueprintSmeltingCopperIngot,
  [BlueprintId.Smelting_TinIngot]: blueprintSmeltingTinIngot,
  [BlueprintId.Smelting_IronIngot]: blueprintSmeltingIronIngot,
  [BlueprintId.Smelting_SilverIngot]: blueprintSmeltingSilverIngot,
  [BlueprintId.Smelting_GoldIngot]: blueprintSmeltingGoldIngot,
  [BlueprintId.Alloy_BronzeIngot]: blueprintAlloyBronzeIngot,
  [BlueprintId.Alloy_SteelIngot]: blueprintAlloySteelIngot,
  [BlueprintId.Alloy_ElectrumIngot]: blueprintAlloyElectrumIngot,
  [BlueprintId.Infusion_AethersteelIngot]: blueprintInfusionAethersteelIngot,
  [BlueprintId.Infusion_VoidforgedIngot]: blueprintInfusionVoidforgedIngot,
  [BlueprintId.Weapon_Axe]: blueprintWeaponAxe,
  [BlueprintId.Weapon_BroadAxe]: blueprintWeaponBroadAxe,
  [BlueprintId.Weapon_WarAxe]: blueprintWeaponWarAxe,
  [BlueprintId.Weapon_Knife]: blueprintWeaponKnife,
  [BlueprintId.Weapon_Stiletto]: blueprintWeaponStiletto,
  [BlueprintId.Weapon_ShortSword]: blueprintWeaponShortSword,
  [BlueprintId.Weapon_LongSword]: blueprintWeaponLongSword,
  [BlueprintId.Weapon_Rapier]: blueprintWeaponRapier,
  [BlueprintId.Weapon_GreatSword]: blueprintWeaponGreatSword,
  [BlueprintId.Weapon_Katana]: blueprintWeaponKatana,
  [BlueprintId.Weapon_Scimitar]: blueprintWeaponScimitar,
  [BlueprintId.Weapon_Cutlass]: blueprintWeaponCutlass,
  [BlueprintId.Weapon_Falchion]: blueprintWeaponFalchion,
  [BlueprintId.Weapon_Hammer]: blueprintWeaponHammer,
  [BlueprintId.Weapon_MorningStar]: blueprintWeaponMorningStar,
  [BlueprintId.Weapon_Scepter]: blueprintWeaponScepter,
  [BlueprintId.Weapon_WarHammer]: blueprintWeaponWarHammer,
  [BlueprintId.Weapon_Dory]: blueprintWeaponDory,
  [BlueprintId.Weapon_Javelin]: blueprintWeaponJavelin,
  [BlueprintId.Weapon_Halberd]: blueprintWeaponHalberd,
  [BlueprintId.Weapon_ShortBow]: blueprintWeaponShortBow,
  [BlueprintId.Weapon_LongBow]: blueprintWeaponLongBow,
  [BlueprintId.Weapon_Crossbow]: blueprintWeaponCrossbow,
  [BlueprintId.Weapon_Staff]: blueprintWeaponStaff,
  [BlueprintId.Weapon_QuarterStaff]: blueprintWeaponQuarterStaff,
  [BlueprintId.Weapon_LongestStaff]: blueprintWeaponLongestStaff,
  [BlueprintId.Weapon_Buckler]: blueprintWeaponBuckler,
  [BlueprintId.Weapon_KiteShield]: blueprintWeaponKiteShield,
  [BlueprintId.Weapon_TowerShield]: blueprintWeaponTowerShield,
  [BlueprintId.Weapon_Bible]: blueprintWeaponBible,
  [BlueprintId.Weapon_Codex]: blueprintWeaponCodex,
  [BlueprintId.Weapon_Grimoire]: blueprintWeaponGrimoire,
  [BlueprintId.Weapon_Wand]: blueprintWeaponWand,
  [BlueprintId.Weapon_Orb]: blueprintWeaponOrb,
};
