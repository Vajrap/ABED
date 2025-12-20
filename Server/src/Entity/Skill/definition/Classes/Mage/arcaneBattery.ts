import type { Character } from "src/Entity/Character/Character";
import { MageSkill } from ".";
import { MageSkillId } from "../../../enums";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import type { TurnResult } from "../../../types";
import { ActorEffect } from "../../../effects";
import { buffsAndDebuffsRepository } from "src/Entity/BuffsAndDebuffs/repository";
import { BuffEnum } from "src/Entity/BuffsAndDebuffs/enum";

export const arcaneBattery = new MageSkill({
  id: MageSkillId.ArcaneBattery,
  name: {
    en: "Arcane Battery",
    th: "แบตเตอรี่อาร์เคน",
  },
  description: {
    text: {
      en: "Convert Arcane Charges into sustained power. Consume all Arcane Charge stacks, restore mana equal to stacks × 2. Gain Arcane Battery buff stacks for <FORMULA> turns based on consumed Arcane Charge stacks. Each Arcane Battery stack gives +1 damage to all planar mod calculations.",
      th: "แปลง Arcane Charge เป็นพลังงานที่ยั่งยืน ลบสแต็ก Arcane Charge ทั้งหมด ฟื้นฟู MP เท่ากับสแต็ก × 2 ได้รับบัฟ Arcane Battery <FORMULA> เทิร์นตามจำนวนสแต็ก Arcane Charge ที่ใช้ แต่ละสแต็ก Arcane Battery ให้ +1 ความเสียหายต่อการคำนวณ planar mod ทั้งหมด",
    },
    formula: {
      en: "{5}'4':'3'{/} turns",
      th: "{5}'4':'3'{/} เทิร์น",
    },
  },
  requirement: {},
  equipmentNeeded: [],
  tier: TierEnum.rare,
  consume: {
    hp: 0,
    mp: 5,
    sp: 0,
    elements: [
      { element: "chaos", value: 3 },
    ],
  },
  produce: {
    hp: 0,
    mp: 0,
    sp: 0,
    elements: [
      { element: "neutral", min: 1, max: 1 },
    ],
  },
  exec: (
    user: Character,
    _userParty: Character[],
    _targetParty: Character[],
    skillLevel: number,
    _location: LocationsEnum,
  ): TurnResult => {
    // Get current Arcane Charge stacks
    const arcaneChargeEntry = user.buffsAndDebuffs.buffs.entry.get(BuffEnum.arcaneCharge);
    const chargeStacks = arcaneChargeEntry?.value || 0;

    if (chargeStacks === 0) {
      return {
        content: {
          en: `${user.name.en} tried to use Arcane Battery but has no Arcane Charge stacks!`,
          th: `${user.name.th} พยายามใช้แบตเตอรี่อาร์เคนแต่ไม่มีสแต็ก Arcane Charge!`,
        },
        actor: {
          actorId: user.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    }

    // Restore MP: stacks × 2
    const mpRestored = chargeStacks * 2;
    user.vitals.mp.current = Math.min(
      user.vitals.mp.current + mpRestored,
      user.vitals.mp.max,
    );

    // Determine buff duration: 3 turns (4 turns at level 5)
    const buffDuration = skillLevel >= 5 ? 4 : 3;

    // Gain Arcane Battery buff stacks equal to consumed Arcane Charge stacks
    // Stacks are stored in value, duration is stored in counter
    buffsAndDebuffsRepository.arcaneBattery.appender(user, {
      turnsAppending: buffDuration,
      universalCounter: chargeStacks,
    });

    // Consume all Arcane Charge stacks
    if (arcaneChargeEntry) {
      arcaneChargeEntry.value = 0;
      user.buffsAndDebuffs.buffs.entry.delete(BuffEnum.arcaneCharge);
    }

    return {
      content: {
        en: `${user.name.en} converted ${chargeStacks} Arcane Charge(s) into Arcane Battery! Restored ${mpRestored} MP and gained ${chargeStacks} Arcane Battery stack(s) for ${buffDuration} turns!`,
        th: `${user.name.th} แปลง ${chargeStacks} Arcane Charge เป็นแบตเตอรี่อาร์เคน! ฟื้นฟู ${mpRestored} MP และได้รับ ${chargeStacks} สแต็ก Arcane Battery เป็นเวลา ${buffDuration} เทิร์น!`,
      },
      actor: {
        actorId: user.id,
        effect: [ActorEffect.Focus],
      },
      targets: [],
    };
  },
});

