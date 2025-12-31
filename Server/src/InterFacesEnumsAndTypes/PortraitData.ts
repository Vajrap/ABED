/**
 * Portrait Data Structure
 * 
 * Represents a composable portrait built from multiple layers.
 * Each part is optional except base, which is required.
 */

export interface PortraitData {
  base: number; // e.g., 1, 2, 7 - base body/color (replaces "c1", "c2")
  jaw: number; // e.g., 1, 2 - jaw shape (replaces "jaw1", "jaw2")
  eyes: number; // e.g., 1, 2 - eye type/style (replaces "eye1", "eye2")
  eyes_color: number; // e.g., 1, 2 - eye color (replaces "c1", "c2")
  face: number; // e.g., 1, 2 - face features (replaces "face1", "face2")
  beard?: number | null; // e.g., 1, 2, 3 - beard style (replaces 1, 2, 3)
  hair: number; // e.g., 1, 2, 3 - hair style
  hair_color: number; // e.g., 1, 2 - hair color (replaces "c1", "c2")
}

/**
 * Check if a value is a valid PortraitData object
 */
export function isPortraitData(value: any): value is PortraitData {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof value.base === "number" &&
    typeof value.jaw === "number" &&
    typeof value.eyes === "number" &&
    typeof value.eyes_color === "number" &&
    typeof value.face === "number" &&
    typeof value.hair === "number" &&
    typeof value.hair_color === "number" &&
    (value.beard === null || value.beard === undefined || typeof value.beard === "number")
  );
}

/**
 * Create a default PortraitData for a given gender
 */
export function createDefaultPortraitData(gender: "MALE" | "FEMALE" | "NONE"): PortraitData {
  const prefix = gender === "MALE" ? "m" : "f";
  return {
    base: 1,
    jaw: 1,
    eyes: 1,
    eyes_color: 1,
    face: 1,
    beard: gender === "MALE" ? 1 : null,
    hair: 1,
    hair_color: 1,
  };
}

