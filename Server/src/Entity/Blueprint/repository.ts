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
} from "./Ingot/definition";
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
import {
  blueprintArmorBodyLeatherArmor,
  blueprintArmorBodyHideArmor,
  blueprintArmorBodyStuddedLeatherArmor,
  blueprintArmorBodyChainShirt,
  blueprintArmorBodyScaleMail,
  blueprintArmorBodyChainMail,
  blueprintArmorBodySplintMail,
  blueprintArmorBodyPlateArmor,
} from "./Equipment/Armor/body";
import {
  blueprintArmorHeadSimpleHood,
  blueprintArmorHeadScholarCap,
  blueprintArmorHeadLeatherCap,
  blueprintArmorHeadScoutHood,
  blueprintArmorHeadChainCoif,
  blueprintArmorHeadSteelHelm,
} from "./Equipment/Armor/head";
import {
  blueprintArmorHandClothGloves,
  blueprintArmorHandSteelGauntlets,
} from "./Equipment/Armor/hand";
import {
  blueprintArmorLegLinenPants,
  blueprintArmorLegPlateGreaves,
} from "./Equipment/Armor/leg";
import {
  blueprintArmorFootClothShoes,
  blueprintArmorFootPlateSabatons,
} from "./Equipment/Armor/foot";
import {
  blueprintJewelryRingCopper,
  blueprintJewelryRingIron,
  blueprintJewelryRingSilver,
  blueprintJewelryRingGold,
  blueprintJewelryEarringCopper,
  blueprintJewelryEarringGold,
} from "./Equipment/Armor/jewelry";
import {
  blueprintRefinePinePlank,
  blueprintRefineOakPlank,
  blueprintRefineMaplePlank,
  blueprintRefineIronwoodPlank,
} from "./Resource/plank";
import {
  blueprintRefineLeather,
  blueprintRefineFineLeather,
  blueprintRefineThickLeather,
  blueprintRefineRuggedLeather,
  blueprintRefineScaledLeather,
  blueprintRefineWyvernLeather,
  blueprintRefineDrakeLeather,
  blueprintRefineHydraLeather,
  blueprintRefineLeviathanLeather,
  blueprintRefineFiendLeather,
  blueprintRefineAetherLeather,
  blueprintRefineSpiritLeather,
  blueprintRefineYetiLeather,
  blueprintRefineSalamanderLeather,
  blueprintRefineManticoreLeather,
} from "./Resource/leather";
import {
  blueprintSpinWoolThread,
  blueprintSpinLinenThread,
  blueprintSpinSilkThread,
  blueprintSpinCottonThread,
  blueprintSpinSpiderSilkThread,
  blueprintSpinYetiThread,
  blueprintSpinPhoenixThread,
  blueprintSpinSalamanderThread,
  blueprintSpinSpiritThread,
  blueprintSpinAetherThread,
  blueprintSpinSteamspunFiber,
  blueprintSpinFluxWeave,
} from "./Resource/thread";
import {
  blueprintWeaveLinenCloth,
  blueprintWeaveCottonCloth,
  blueprintWeaveWoolCloth,
  blueprintWeaveSilkCloth,
  blueprintWeaveSpiderSilkCloth,
  blueprintWeaveYetiCloth,
  blueprintWeavePhoenixCloth,
  blueprintWeaveSpiritCloth,
  blueprintWeaveAetherweave,
  blueprintWeaveFiendcloth,
  blueprintWeaveFluxweaveCloth,
  blueprintWeaveDragonskin,
  blueprintWeaveLeviathanLining,
  blueprintWeaveHydraWeave,
} from "./Resource/cloth";
import { blueprintCutRoughGem } from "./Resource/gem";

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
  [BlueprintId.Armor_Body_LeatherArmor]: blueprintArmorBodyLeatherArmor,
  [BlueprintId.Armor_Body_HideArmor]: blueprintArmorBodyHideArmor,
  [BlueprintId.Armor_Body_StuddedLeatherArmor]: blueprintArmorBodyStuddedLeatherArmor,
  [BlueprintId.Armor_Body_ChainShirt]: blueprintArmorBodyChainShirt,
  [BlueprintId.Armor_Body_ScaleMail]: blueprintArmorBodyScaleMail,
  [BlueprintId.Armor_Body_ChainMail]: blueprintArmorBodyChainMail,
  [BlueprintId.Armor_Body_SplintMail]: blueprintArmorBodySplintMail,
  [BlueprintId.Armor_Body_PlateArmor]: blueprintArmorBodyPlateArmor,
  [BlueprintId.Armor_Head_SimpleHood]: blueprintArmorHeadSimpleHood,
  [BlueprintId.Armor_Head_ScholarCap]: blueprintArmorHeadScholarCap,
  [BlueprintId.Armor_Head_LeatherCap]: blueprintArmorHeadLeatherCap,
  [BlueprintId.Armor_Head_ScoutHood]: blueprintArmorHeadScoutHood,
  [BlueprintId.Armor_Head_ChainCoif]: blueprintArmorHeadChainCoif,
  [BlueprintId.Armor_Head_SteelHelm]: blueprintArmorHeadSteelHelm,
  [BlueprintId.Armor_Hand_ClothGloves]: blueprintArmorHandClothGloves,
  [BlueprintId.Armor_Hand_SteelGauntlets]: blueprintArmorHandSteelGauntlets,
  [BlueprintId.Armor_Leg_LinenPants]: blueprintArmorLegLinenPants,
  [BlueprintId.Armor_Leg_PlateGreaves]: blueprintArmorLegPlateGreaves,
  [BlueprintId.Armor_Foot_ClothShoes]: blueprintArmorFootClothShoes,
  [BlueprintId.Armor_Foot_PlateSabatons]: blueprintArmorFootPlateSabatons,
  [BlueprintId.Jewelry_Ring_Copper]: blueprintJewelryRingCopper,
  [BlueprintId.Jewelry_Ring_Iron]: blueprintJewelryRingIron,
  [BlueprintId.Jewelry_Ring_Silver]: blueprintJewelryRingSilver,
  [BlueprintId.Jewelry_Ring_Gold]: blueprintJewelryRingGold,
  [BlueprintId.Jewelry_Earring_Copper]: blueprintJewelryEarringCopper,
  [BlueprintId.Jewelry_Earring_Gold]: blueprintJewelryEarringGold,
  [BlueprintId.Refine_Plank_Pine]: blueprintRefinePinePlank,
  [BlueprintId.Refine_Plank_Oak]: blueprintRefineOakPlank,
  [BlueprintId.Refine_Plank_Maple]: blueprintRefineMaplePlank,
  [BlueprintId.Refine_Plank_Ironwood]: blueprintRefineIronwoodPlank,
  [BlueprintId.Refine_Leather_Leather]: blueprintRefineLeather,
  [BlueprintId.Refine_Leather_Fine]: blueprintRefineFineLeather,
  [BlueprintId.Refine_Leather_Thick]: blueprintRefineThickLeather,
  [BlueprintId.Refine_Leather_Rugged]: blueprintRefineRuggedLeather,
  [BlueprintId.Refine_Leather_Scaled]: blueprintRefineScaledLeather,
  [BlueprintId.Refine_Leather_Wyvern]: blueprintRefineWyvernLeather,
  [BlueprintId.Refine_Leather_Drake]: blueprintRefineDrakeLeather,
  [BlueprintId.Refine_Leather_Hydra]: blueprintRefineHydraLeather,
  [BlueprintId.Refine_Leather_Leviathan]: blueprintRefineLeviathanLeather,
  [BlueprintId.Refine_Leather_Fiend]: blueprintRefineFiendLeather,
  [BlueprintId.Refine_Leather_Aether]: blueprintRefineAetherLeather,
  [BlueprintId.Refine_Leather_Spirit]: blueprintRefineSpiritLeather,
  [BlueprintId.Refine_Leather_Yeti]: blueprintRefineYetiLeather,
  [BlueprintId.Refine_Leather_Salamander]: blueprintRefineSalamanderLeather,
  [BlueprintId.Refine_Leather_Manticore]: blueprintRefineManticoreLeather,
  [BlueprintId.Spin_Thread_Wool]: blueprintSpinWoolThread,
  [BlueprintId.Spin_Thread_Linen]: blueprintSpinLinenThread,
  [BlueprintId.Spin_Thread_Silk]: blueprintSpinSilkThread,
  [BlueprintId.Spin_Thread_Cotton]: blueprintSpinCottonThread,
  [BlueprintId.Spin_Thread_SpiderSilk]: blueprintSpinSpiderSilkThread,
  [BlueprintId.Spin_Thread_Yeti]: blueprintSpinYetiThread,
  [BlueprintId.Spin_Thread_Phoenix]: blueprintSpinPhoenixThread,
  [BlueprintId.Spin_Thread_Salamander]: blueprintSpinSalamanderThread,
  [BlueprintId.Spin_Thread_Spirit]: blueprintSpinSpiritThread,
  [BlueprintId.Spin_Thread_Aether]: blueprintSpinAetherThread,
  [BlueprintId.Spin_Thread_Steamspun]: blueprintSpinSteamspunFiber,
  [BlueprintId.Spin_Thread_FluxWeave]: blueprintSpinFluxWeave,
  [BlueprintId.Weave_Cloth_Linen]: blueprintWeaveLinenCloth,
  [BlueprintId.Weave_Cloth_Cotton]: blueprintWeaveCottonCloth,
  [BlueprintId.Weave_Cloth_Wool]: blueprintWeaveWoolCloth,
  [BlueprintId.Weave_Cloth_Silk]: blueprintWeaveSilkCloth,
  [BlueprintId.Weave_Cloth_SpiderSilk]: blueprintWeaveSpiderSilkCloth,
  [BlueprintId.Weave_Cloth_Yeti]: blueprintWeaveYetiCloth,
  [BlueprintId.Weave_Cloth_Phoenix]: blueprintWeavePhoenixCloth,
  [BlueprintId.Weave_Cloth_Spirit]: blueprintWeaveSpiritCloth,
  [BlueprintId.Weave_Cloth_Aether]: blueprintWeaveAetherweave,
  [BlueprintId.Weave_Cloth_Fiend]: blueprintWeaveFiendcloth,
  [BlueprintId.Weave_Cloth_Fluxweave]: blueprintWeaveFluxweaveCloth,
  [BlueprintId.Weave_Cloth_Dragonskin]: blueprintWeaveDragonskin,
  [BlueprintId.Weave_Cloth_LeviathanLining]: blueprintWeaveLeviathanLining,
  [BlueprintId.Weave_Cloth_Hydra]: blueprintWeaveHydraWeave,
  [BlueprintId.Cut_RoughGem]: blueprintCutRoughGem,
};
