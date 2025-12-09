/**
 * Portrait Asset Service
 * 
 * Loads and caches portrait/battle asset catalogs.
 * Provides functions to get available options for each portrait part.
 */

import type { PortraitData } from "@/types/character";

export interface AssetCatalog {
  [path: string]: string[];
}

export interface PortraitPartOptions {
  base: string[];
  jaw: string[];
  eyes: string[];
  face: string[];
  beard: number[]; // Beard numbers 1-6 (tied to jaw)
  hair_top: string[];
  hair_bot: string[];
}

// Race to body color mapping
// Maps race names to preferred base color variants
// c7, c8, etc. are filtered versions of c1 (lighter/paler) - can be generated or applied via CSS filters
const RACE_BODY_COLOR_MAP: Record<string, number[]> = {
  Human: [1, 2, 7], // c1, c2, and c7 (filtered lighter version of c1)
  Orc: [3, 4, 6], // Green-tinted variants (skip c5 - red, doesn't work)
  Elven: [1, 7, 8], // c1, c7 (lighter c1), c8 (paler c1)
  Elf: [1, 7, 8], // Alias for Elven
};

class PortraitAssetService {
  private portraitCatalog: AssetCatalog | null = null;
  private battleCatalog: AssetCatalog | null = null;
  private loadingPromise: Promise<void> | null = null;

  /**
   * Load asset catalogs from JSON files
   */
  async loadCatalogs(): Promise<void> {
    if (this.loadingPromise) {
      return this.loadingPromise;
    }

    this.loadingPromise = (async () => {
      try {
        const [portraitResponse, battleResponse] = await Promise.all([
          fetch("/img/portraits/portrait.json"),
          fetch("/img/battle/battle.json"),
        ]);

        if (!portraitResponse.ok || !battleResponse.ok) {
          throw new Error("Failed to load asset catalogs");
        }

        this.portraitCatalog = await portraitResponse.json();
        this.battleCatalog = await battleResponse.json();
      } catch (error) {
        console.error("Failed to load asset catalogs:", error);
        // Set empty catalogs on error
        this.portraitCatalog = {};
        this.battleCatalog = {};
      }
    })();

    return this.loadingPromise;
  }

  /**
   * Get portrait catalog (loads if not already loaded)
   */
  async getPortraitCatalog(): Promise<AssetCatalog> {
    if (!this.portraitCatalog) {
      await this.loadCatalogs();
    }
    return this.portraitCatalog || {};
  }

  /**
   * Get battle catalog (loads if not already loaded)
   */
  async getBattleCatalog(): Promise<AssetCatalog> {
    if (!this.battleCatalog) {
      await this.loadCatalogs();
    }
    return this.battleCatalog || {};
  }

  /**
   * Get available base colors, filtered by race
   * Includes filtered colors (c7, c8, etc.) that are CSS-filtered versions of c1
   */
  async getBaseColors(race?: string): Promise<string[]> {
    const catalog = await this.getPortraitCatalog();
    const basePath = "/img/portraits/base";
    const allBases = catalog[basePath] || [];

    if (!race) {
      // Include all physical files plus filtered variants
      return [...allBases, "base_c7.png", "base_c8.png"];
    }

    // Filter by race body color preferences
    const raceKey = race.charAt(0).toUpperCase() + race.slice(1).toLowerCase();
    const preferredColors = RACE_BODY_COLOR_MAP[raceKey] || RACE_BODY_COLOR_MAP["Human"];

    const result: string[] = [];
    
    // Add physical files that match preferred colors
    allBases.forEach((base) => {
      const colorMatch = base.match(/c(\d+)/);
      if (!colorMatch) return;
      const colorNum = parseInt(colorMatch[1], 10);
      if (preferredColors.includes(colorNum)) {
        result.push(base);
      }
    });

    // Add filtered variants (c7, c8, etc.) if they're in preferred colors
    if (preferredColors.includes(7)) {
      result.push("base_c7.png");
    }
    if (preferredColors.includes(8)) {
      result.push("base_c8.png");
    }

    return result;
  }

  /**
   * Get available jaw options
   */
  async getJawOptions(): Promise<string[]> {
    const catalog = await this.getPortraitCatalog();
    const jaws: string[] = [];

    // Extract unique jaw IDs from paths like "/img/portraits/jaw/jaw1"
    Object.keys(catalog).forEach((path) => {
      if (path.includes("/jaw/jaw")) {
        const match = path.match(/jaw(\d+)/);
        if (match && !jaws.includes(`jaw${match[1]}`)) {
          jaws.push(`jaw${match[1]}`);
        }
      }
    });

    return jaws.sort();
  }

  /**
   * Get available eye options
   */
  async getEyesOptions(): Promise<string[]> {
    const catalog = await this.getPortraitCatalog();
    const eyes: string[] = [];

    Object.keys(catalog).forEach((path) => {
      // Assetmaker uses /img/portraits/eyes/eye1 structure
      if (path.includes("/eyes/eye") && !path.includes("/beard")) {
        const match = path.match(/\/eyes\/(eye\d+)/);
        if (match && !eyes.includes(match[1])) {
          eyes.push(match[1]); // Returns eye1, eye2, etc.
        }
      }
    });

    return eyes.sort();
  }

  /**
   * Get available face options
   */
  async getFaceOptions(): Promise<string[]> {
    const catalog = await this.getPortraitCatalog();
    const faces: string[] = [];

    Object.keys(catalog).forEach((path) => {
      if (path.includes("/face/face")) {
        const match = path.match(/face(\d+)/);
        if (match && !faces.includes(`face${match[1]}`)) {
          faces.push(`face${match[1]}`);
        }
      }
    });

    return faces.sort();
  }

  /**
   * Get all available beard options (independent of jaw)
   */
  async getBeardOptions(): Promise<string[]> {
    const catalog = await this.getPortraitCatalog();
    const beards: string[] = [];

    // Extract all beard options regardless of jaw
    // Paths like "/img/portraits/beard/jaw1_beard/jaw1_beard1"
    Object.keys(catalog).forEach((path) => {
      if (path.includes("/beard/") && path.match(/\/beard\/jaw\d+_beard\//)) {
        // Match the full beard ID like "jaw1_beard1" from path "/img/portraits/beard/jaw1_beard/jaw1_beard1"
        const match = path.match(/\/beard\/jaw\d+_beard\/(jaw\d+_beard\d+)$/);
        if (match && !beards.includes(match[1])) {
          beards.push(match[1]);
        }
      }
    });

    return beards.sort();
  }

  /**
   * Get available hair options
   */
  async getHairOptions(): Promise<string[]> {
    const catalog = await this.getPortraitCatalog();
    const hairs: Set<string> = new Set();

    Object.keys(catalog).forEach((path) => {
      // Assetmaker uses /img/portraits/hair/f1/top or /img/portraits/hair/m1/top
      if (path.includes("/hair/") && path.includes("/top")) {
        // Match f1, f2, etc. (female hair) - keep as f1, f2
        const fMatch = path.match(/\/hair\/(f\d+)\//);
        if (fMatch) {
          hairs.add(fMatch[1]); // Keep as f1, f2, etc.
        }
        // Match m1, m2, etc. (male hair) - keep as m1, m2
        const mMatch = path.match(/\/hair\/(m\d+)\//);
        if (mMatch) {
          hairs.add(mMatch[1]); // Keep as m1, m2, etc.
        }
        // Also handle hair1, hair2 format if it exists
        const hairMatch = path.match(/\/hair\/(hair\d+)\//);
        if (hairMatch) {
          hairs.add(hairMatch[1]);
        }
      }
    });

    return Array.from(hairs).sort();
  }

  /**
   * Get all available options for a portrait part
   */
  async getPortraitPartOptions(race?: string): Promise<PortraitPartOptions> {
    const [baseColors, jaws, eyes, faces, hairs] = await Promise.all([
      this.getBaseColors(race),
      this.getJawOptions(),
      this.getEyesOptions(),
      this.getFaceOptions(),
      this.getHairOptions(),
    ]);

    // Extract color numbers from base filenames for use in other parts
    const baseColorNums = baseColors
      .map((base) => {
        const match = base.match(/c(\d+)/);
        return match ? parseInt(match[1], 10) : null;
      })
      .filter((num): num is number => num !== null);

    // Get hair options using the dedicated function
    const hairOptions = await this.getHairOptions();

    return {
      base: baseColorNums.map((num) => `c${num}`),
      jaw: jaws,
      eyes: eyes, // Already in eye1, eye2 format from getEyesOptions
      face: faces,
      beard: [1, 2, 3, 4, 5, 6], // Beard numbers 1-6 (tied to jaw)
      hair_top: hairOptions.map((hair) => `${hair}_top`), // f1_top, m1_top, etc.
      hair_bot: hairOptions.map((hair) => `${hair}_bot`), // f1_bot, m1_bot, etc.
    };
  }

  /**
   * Get the full image path for a portrait part
   */
  async getPortraitPartPath(
    part: keyof PortraitData, 
    value: string, 
    baseColor?: string,
    portrait?: PortraitData
  ): Promise<string | null> {
    const catalog = await this.getPortraitCatalog();

    if (part === "base") {
      const basePath = "/img/portraits/base";
      const files = catalog[basePath] || [];
      
      // Handle filtered colors (c7, c8, etc.) - these use c1 as base with CSS filters
      const colorMatch = value.match(/c(\d+)/);
      if (colorMatch) {
        const colorNum = parseInt(colorMatch[1], 10);
        if (colorNum >= 7) {
          // Filtered colors use c1 as the base image
          // The filter will be applied in PortraitRenderer
          const c1File = files.find((f) => f.includes("c1"));
          return c1File ? `${basePath}/${c1File}` : null;
        }
      }
      
      const file = files.find((f) => f === value || f.includes(value));
      return file ? `${basePath}/${file}` : null;
    }

    if (part === "jaw") {
      const jawPath = `/img/portraits/jaw/${value}`;
      const files = catalog[jawPath] || [];
      // Find file matching base color
      const color = baseColor || "c1";
      const file = files.find((f) => f.includes(color));
      return file ? `${jawPath}/${file}` : null;
    }

    if (part === "eyes") {
      // Handle both "eye1" (assetmaker) and "eyes1" (our code) naming
      const eyeId = value.replace(/^eyes/, "eye"); // Convert "eyes1" -> "eye1"
      // Assetmaker uses /img/portraits/eyes/eye1 structure (2 levels deep)
      const eyesPath = `/img/portraits/eyes/${eyeId}`;
      const files = catalog[eyesPath] || [];
      if (files.length > 0) {
        // Use eyes_color from portrait if available, otherwise fallback to baseColor or c1
        // Files are named like eye1_c1.png, eye1_c2.png, so match with _c prefix
        const color = portrait?.eyes_color || baseColor || "c1";
        const file = files.find((f) => f.includes(`_${color}.png`) || f.includes(`_${color}_`));
        return file ? `${eyesPath}/${file}` : null;
      }
      return null;
    }

    if (part === "face") {
      const facePath = `/img/portraits/face/${value}`;
      const files = catalog[facePath] || [];
      const color = baseColor || "c1";
      const file = files.find((f) => f.includes(color));
      return file ? `${facePath}/${file}` : null;
    }

    if (part === "beard" && value) {
      // Beard path structure: /img/portraits/beard/jaw1_beard/jaw1_beard6/jaw1_beard6_c3.png
      // Value is now a number (1-6), jaw comes from portrait.jaw, color from portrait.hair_color
      if (!portrait) return null;
      
      const jawNum = portrait.jaw.match(/\d+/)?.[0];
      if (!jawNum) return null;
      
      const beardNum = typeof value === "number" ? value : parseInt(value, 10);
      if (!beardNum || beardNum < 1 || beardNum > 6) return null;
      
      // Build path: /img/portraits/beard/jaw1_beard/jaw1_beard6
      const beardPath = `/img/portraits/beard/jaw${jawNum}_beard/jaw${jawNum}_beard${beardNum}`;
      const files = catalog[beardPath] || [];
      
      if (files.length > 0) {
        // Use hair_color for beard color
        const color = portrait.hair_color || baseColor || "c1";
        const file = files.find((f) => f.includes(`_${color}.png`) || f.includes(`_${color}_`));
        return file ? `${beardPath}/${file}` : null;
      }
      return null;
    }

    if (part === "hair_top" || part === "hair_bot") {
      const layer = part === "hair_top" ? "top" : "bot";
      // Match f1_top, m1_top, hair1_top, etc.
      // Value format: "f1_top", "m1_top", etc.
      const hairMatch = value.match(/^(f\d+|m\d+|hair\d+)_(top|bot)$/);
      if (hairMatch) {
        const [, hairId] = hairMatch;
        // Hair path is 3 levels deep: /img/portraits/hair/f1/top
        const hairPath = `/img/portraits/hair/${hairId}/${layer}`;
        const files = catalog[hairPath] || [];
        if (files.length > 0) {
          // Use hair_color from portrait if available, otherwise fallback to baseColor or c1
          // Files are named like m1_c1_top.png, m1_c2_top.png, so match with _c prefix
          const color = portrait?.hair_color || baseColor || "c1";
          const file = files.find((f) => f.includes(`_${color}_${layer}.png`) || f.includes(`_${color}_`));
          return file ? `${hairPath}/${file}` : null;
        }
      }
      return null;
    }

    return null;
  }

  /**
   * Generate a default portrait for a gender and race
   */
  async generateDefaultPortrait(gender: "MALE" | "FEMALE", race?: string): Promise<PortraitData> {
    const options = await this.getPortraitPartOptions(race);
    
    // Use gender-specific hair naming: f1 for female, m1 for male
    const hairPrefix = gender === "MALE" ? "m" : "f";
    const defaultHairNum = "1";

    return {
      base: options.base[0] || "c1",
      jaw: options.jaw[0] || "jaw1",
      eyes: options.eyes[0] || "eye1", // Use "eye1" to match assetmaker
      eyes_color: "c1",
      face: options.face[0] || "face1",
      beard: gender === "MALE" ? 1 : null, // Default to beard style 1 for males
      hair_top: `${hairPrefix}${defaultHairNum}_top`, // f1_top or m1_top
      hair_bot: `${hairPrefix}${defaultHairNum}_bot`, // f1_bot or m1_bot
      hair_color: "c1",
    };
  }
}

// Export singleton instance
export const portraitAssetService = new PortraitAssetService();

