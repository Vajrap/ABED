import { EquipmentId, ItemId } from "src/Entity/Item";
import {
	BodyId,
	EarId,
	LegId,
	HeadWearId,
	HandId,
	FootId,
	UtilId,
	RingId,
	NeckId,
} from "src/Entity/Item/Equipment/Armor/type";
import { WeaponId } from "src/Entity/Item/Equipment/Weapon/type";
import { SkillId } from "src/Entity/Skill/enums";
import {
  ArtisanKey,
	CharacterEquipmentSlot,
	ProficiencyKey,
	AttributeKey,
} from "src/InterFacesEnumsAndTypes/Enums";

import { CharacterRoleEnum } from "src/Entity/Character/Subclass/Title/Role/enum";
import { CharacterEpithetEnum } from "src/Entity/Character/Subclass/Title/Epithet/enum";

export type ClassBonus = {
	proficiencies: ProficiencyBonus;
	startingSkills: StartingSkills;
	startingEquipments: StartingEquipments;
	role: CharacterRoleEnum;
};

export type BackgroundBonus = {
	artisans: ArtisanBonus;
	startingItems: { item: ItemId; quantity: number }[];
	epithet: CharacterEpithetEnum;
	alignment: { good: number; evil: number };
};

export type ArtisanBonus = { three: ArtisanKey; two: ArtisanKey; one: ArtisanKey };
export type ProficiencyBonus = { three: ProficiencyKey; two: ProficiencyKey; one: ProficiencyKey };
export type AttributeBonus = { three: AttributeKey; two: AttributeKey; one: AttributeKey };

export type StartingSkills = SkillId[];

type StartingEquipment = {
  id: EquipmentId;
  slot: CharacterEquipmentSlot;
};

export type StartingEquipments = StartingEquipment[];