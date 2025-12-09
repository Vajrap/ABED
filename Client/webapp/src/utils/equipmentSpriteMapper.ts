/**
 * Equipment to Battle Sprite Mapper
 * Maps backend equipment IDs to battle sprite asset paths
 */

export type ArmorPath = {
  bot: string;
  top: string;
}
export function getArmorSpritePathForPortrait(armorId: string): ArmorPath | null {
  if (armorId === "Tunic") return {
    bot: '/img/portraits/cloth/cloth4/bot/cloth4_c1_bot.png',
    top: '/img/portraits/cloth/cloth4/top/cloth4_c1_top.png',
  };
  if (armorId === 'Robe') return {
    bot: '/img/portraits/cloth/cloth1/bot/cloth1_c1_bot.png',
    top: '/img/portraits/cloth/cloth1/top/cloth1_c1_top.png',
  };
  if (armorId === 'MageRobe') return {
    bot: '/img/portraits/cloth/cloth1/bot/cloth1_c1_bot.png',
    top: '/img/portraits/cloth/cloth1/top/cloth1_c1_top.png',
  };
  if (armorId === 'PaddedArmor') return {
    bot: '/img/portraits/cloth/cloth16/bot/cloth16_c1_bot.png',
    top: '/img/portraits/cloth/cloth16/top/cloth16_c1_top.png',
  };
  if (armorId === 'LeatherArmor') return {
    bot: '/img/portraits/cloth/cloth16/bot/cloth16_c1_bot.png',
    top: '/img/portraits/cloth/cloth16/top/cloth16_c1_top.png',
  };
  if (armorId === 'StuddedLeatherArmor') return {
    bot: '/img/portraits/cloth/cloth16/bot/cloth16_c1_bot.png',
    top: '/img/portraits/cloth/cloth16/top/cloth16_c1_top.png',
  };
  if (armorId === 'HideArmor') return {
    bot: '/img/portraits/cloth/cloth16/bot/cloth16_c1_bot.png',
    top: '/img/portraits/cloth/cloth16/top/cloth16_c1_top.png',
  };
  if (armorId === 'ChainShirt') return {
    bot: '/img/portraits/cloth/cloth11/bot/cloth11_c1_bot.png',
    top: '/img/portraits/cloth/cloth11/top/cloth11_c1_top.png',
  };
  if (armorId === 'ScaleMail') return {
    bot: '/img/portraits/cloth/cloth11/bot/cloth11_c1_bot.png',
    top: '/img/portraits/cloth/cloth11/top/cloth11_c1_top.png',
  };
  if (armorId === 'ChainMail') return {
    bot: '/img/portraits/cloth/cloth11/bot/cloth11_c1_bot.png',
    top: '/img/portraits/cloth/cloth11/top/cloth11_c1_top.png',
  };
  if (armorId === 'SplintMail') return {
    bot: '/img/portraits/cloth/cloth13/bot/cloth13_c1_bot.png',
    top: '/img/portraits/cloth/cloth13/top/cloth13_c1_top.png',
  };
  if (armorId === 'PlateArmor') return {
    bot: '/img/portraits/cloth/cloth13/bot/cloth13_c1_bot.png',
    top: '/img/portraits/cloth/cloth13/top/cloth13_c1_top.png',
  };
  return null;
}

// Armor mappings based on EQUIPMENT_MAPPING.md
export function getArmorSpriteId(armorId: string): string | null {
  // Cloth armors
  if (armorId === "Tunic") return "cloth4";
  if (armorId === "Robe") return "cloth1";
  if (armorId === "MageRobe") return "cloth1";
  
  // Light armors
  if (armorId === "PaddedArmor") return "cloth16";
  if (armorId === "LeatherArmor") return "cloth16";
  if (armorId === "StuddedLeatherArmor") return "cloth16";
  
  // Medium armors
  if (armorId === "HideArmor") return "cloth16";
  if (armorId === "ChainShirt") return "cloth11";
  if (armorId === "ScaleMail") return "cloth11";
  
  // Heavy armors
  if (armorId === "ChainMail") return "cloth11";
  if (armorId === "SplintMail") return "cloth13";
  if (armorId === "PlateArmor") return "cloth13";
  
  // No mapping found
  return null;
}

// Weapon mappings based on EQUIPMENT_MAPPING.md
// Returns paths for both bot and top layers
export type WeaponPath = {
  bot: string;
  top: string;
}

export function getWeaponPath(weaponId: string): WeaponPath | null {
  // Swords
  if (weaponId === "ShortSword" || weaponId === "LongSword" || weaponId === "Rapier" || weaponId === "GreatSword") {
    return {
      bot: "/img/battle/weapon/weapon1/bot/weapon1_bot.png",
      top: "/img/battle/weapon/weapon1/top/weapon1_top.png",
    };
  }
  
  // Blades (TODO - using weapon1 for now)
  if (weaponId === "Katana" || weaponId === "Scimitar" || weaponId === "Cutlass" || weaponId === "Falchion") {
    return {
      bot: "/img/battle/weapon/weapon1/bot/weapon1_bot.png",
      top: "/img/battle/weapon/weapon1/top/weapon1_top.png",
    };
  }
  
  // Daggers
  if (weaponId === "Stiletto" || weaponId === "Knife") {
    return {
      bot: "/img/battle/weapon/weapon3/bot/weapon3_bot.png",
      top: "/img/battle/weapon/weapon3/top/weapon3_top.png",
    };
  }
  
  // Axes
  if (weaponId === "Axe" || weaponId === "BroadAxe" || weaponId === "WarAxe") {
    return {
      bot: "/img/battle/weapon/weapon2/bot/weapon2_bot.png",
      top: "/img/battle/weapon/weapon2/top/weapon2_top.png",
    };
  }
  
  // Spears
  if (weaponId === "Dory" || weaponId === "Javelin" || weaponId === "Halberd") {
    return {
      bot: "/img/battle/weapon/weapon4/bot/weapon4_bot.png",
      top: "/img/battle/weapon/weapon4/top/weapon4_top.png",
    };
  }
  
  // Hammers (TODO - using weapon1 for now)
  if (weaponId === "MorningStar" || weaponId === "Hammer" || weaponId === "WarHammer" || weaponId === "Scepter") {
    return {
      bot: "/img/battle/weapon/weapon1/bot/weapon1_bot.png",
      top: "/img/battle/weapon/weapon1/top/weapon1_top.png",
    };
  }
  
  // Bows (TODO - using weapon1 for now)
  if (weaponId === "LongBow" || weaponId === "ShortBow" || weaponId === "Crossbow") {
    return {
      bot: "/img/battle/weapon/weapon1/bot/weapon1_bot.png",
      top: "/img/battle/weapon/weapon1/top/weapon1_top.png",
    };
  }
  
  // Staves (TODO - using weapon1 for now)
  if (weaponId === "QuarterStaff" || weaponId === "LongestStaff" || weaponId === "Staff") {
    return {
      bot: "/img/battle/weapon/weapon1/bot/weapon1_bot.png",
      top: "/img/battle/weapon/weapon1/top/weapon1_top.png",
    };
  }
  
  // Shields (TODO - no sprite for now)
  if (weaponId === "Buckler" || weaponId === "KiteShield" || weaponId === "TowerShield") {
    return null; // TODO
  }
  
  // Books (TODO - no sprite for now)
  if (weaponId === "Bible" || weaponId === "Grimoire" || weaponId === "Codex") {
    return null; // TODO
  }
  
  // Wands - uses c1 color variant
  if (weaponId === "Wand") {
    return {
      bot: "/img/battle/weapon/weapon5/bot/weapon5_c1_bot.png",
      top: "/img/battle/weapon/weapon5/top/weapon5_c1_top.png",
    };
  }
  
  // Orbs (TODO - no sprite for now)
  if (weaponId === "Orb") {
    return null; // TODO
  }
  
  // BareHand - no sprite
  if (weaponId === "BareHand") {
    return null;
  }
  
  // No mapping found
  return null;
}

