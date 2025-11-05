import { StaffId } from "../type";
import type { Weapon } from "../Weapon";
import { quarterStaff } from "./definition/quarterStaff";
import { staff } from "./definition/staff";
import { longestStaff } from "./definition/longestStaff";

export const staffRepository: Record<StaffId, Weapon> = {
  [StaffId.QuarterStaff]: quarterStaff,
  [StaffId.Staff]: staff,
  [StaffId.LongestStaff]: longestStaff,
};

