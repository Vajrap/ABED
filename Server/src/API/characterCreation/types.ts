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

export type ClassBonus = {
	proficiencies: ProficiencyBonus;
	startingSkills: StartingSkills;
	startingEquipments: StartingEquipments;
};


export type ArtisanBonus = { three: ArtisanKey; two: ArtisanKey; one: ArtisanKey };
export type ProficiencyBonus = { three: ProficiencyKey; two: ProficiencyKey; one: ProficiencyKey };
export type AttributeBonus = { three: AttributeKey; two: AttributeKey; one: AttributeKey };

export type StartingSkills = SkillId[];
export type StartingEquipments = {
	[CharacterEquipmentSlot.headWear]: HeadWearId | null;
	[CharacterEquipmentSlot.body]: BodyId | null;
	[CharacterEquipmentSlot.leg]: LegId | null;
	[CharacterEquipmentSlot.hand]: HandId | null;
	[CharacterEquipmentSlot.foot]: FootId | null;
	[CharacterEquipmentSlot.util]: UtilId | null;
	[CharacterEquipmentSlot.ringL]: RingId | null;
	[CharacterEquipmentSlot.ringR]: RingId | null;
	[CharacterEquipmentSlot.earL]: EarId | null;
	[CharacterEquipmentSlot.earR]: EarId | null;
	[CharacterEquipmentSlot.neck]: NeckId | null;
	[CharacterEquipmentSlot.rightHand]: WeaponId | null;
	[CharacterEquipmentSlot.leftHand]: WeaponId | null;
};
