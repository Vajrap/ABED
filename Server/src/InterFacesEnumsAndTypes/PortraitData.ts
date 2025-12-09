/**
 * Portrait Data Structure
 * 
 * Represents a composable portrait built from multiple layers.
 * Each part is optional except base, which is required.
 */

export interface PortraitData {
  base: string; // e.g., "c1", "c2" - base body/color
  jaw: string; // e.g., "jaw1", "jaw2" - jaw shape
  eyes: string; // e.g., "eye1", "eye2" - eye type/style
  eyes_color: string; // e.g., "c1", "c2" - eye color (c1-c7)
  face: string; // e.g., "face1", "face2" - face features
  beard?: number | null; // e.g., 1, 2, 3, 4, 5, 6 - beard style number (tied to jaw, uses hair_color)
  hair_top: string; // e.g., "m1_top", "f1_top" - hair type and layer
  hair_bot: string; // e.g., "m1_bot", "f1_bot" - hair type and layer
  hair_color: string; // e.g., "c1", "c2" - hair color (c1-c10), also used for beard color
}

/**
 * Check if a value is a valid PortraitData object
 */
export function isPortraitData(value: any): value is PortraitData {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof value.base === "string" &&
    typeof value.jaw === "string" &&
    typeof value.eyes === "string" &&
    typeof value.eyes_color === "string" &&
    typeof value.face === "string" &&
    typeof value.hair_top === "string" &&
    typeof value.hair_bot === "string" &&
    typeof value.hair_color === "string" &&
    (value.beard === null || value.beard === undefined || typeof value.beard === "number")
  );
}

/**
 * Create a default PortraitData for a given gender
 */
export function createDefaultPortraitData(gender: "MALE" | "FEMALE" | "NONE"): PortraitData {
  const prefix = gender === "MALE" ? "m" : "f";
  return {
    base: "c1",
    jaw: "jaw1",
    eyes: "eye1",
    eyes_color: "c1",
    face: "face1",
    beard: gender === "MALE" ? 1 : null,
    hair_top: `${prefix}1_top`,
    hair_bot: `${prefix}1_bot`,
    hair_color: "c1",
  };
}

