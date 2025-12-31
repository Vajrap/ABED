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
  base: number[];
  jaw: number[];
  eyes: number[];
  face: number[];
  beard: number[]; // Beard numbers 1-6
  hair: number[]; // Hair style numbers
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
  async getBaseColors(race?: string): Promise<number[]> {
    const catalog = await this.getPortraitCatalog();
    const basePath = "/img/portraits/base";
    const allBases = catalog[basePath] || [];

    // Filter by race body color preferences
    const raceKey = race ? race.charAt(0).toUpperCase() + race.slice(1).toLowerCase() : "Human";
    const preferredColors = RACE_BODY_COLOR_MAP[raceKey] || RACE_BODY_COLOR_MAP["Human"];

    const result: Set<number> = new Set();
    
    if (!race) {
       // If no race, find all cX numbers
        allBases.forEach((base) => {
            const colorMatch = base.match(/c(\d+)/);
            if (colorMatch) {
                result.add(parseInt(colorMatch[1], 10));
            }
        });
        // Add defaults just in case
        result.add(7);
        result.add(8);
        return Array.from(result).sort((a,b) => a-b);
    }
    
    // Add physical files that match preferred colors
    allBases.forEach((base) => {
      const colorMatch = base.match(/c(\d+)/);
      if (!colorMatch) return;
      const colorNum = parseInt(colorMatch[1], 10);
      if (preferredColors.includes(colorNum)) {
        result.add(colorNum);
      }
    });

    // Add filtered variants (c7, c8, etc.) if they're in preferred colors
    if (preferredColors.includes(7)) result.add(7);
    if (preferredColors.includes(8)) result.add(8);

    return Array.from(result).sort((a,b) => a-b);
  }

  /**
   * Get available jaw options
   */
  async getJawOptions(): Promise<number[]> {
    const catalog = await this.getPortraitCatalog();
    const jaws: Set<number> = new Set();

    // Extract unique jaw IDs from paths like "/img/portraits/jaw/jaw1"
    Object.keys(catalog).forEach((path) => {
      if (path.includes("/jaw/jaw")) {
        const match = path.match(/jaw(\d+)/);
        if (match) {
          jaws.add(parseInt(match[1], 10));
        }
      }
    });

    return Array.from(jaws).sort((a, b) => a - b);
  }

  /**
   * Get available eye options
   */
  async getEyesOptions(): Promise<number[]> {
    const catalog = await this.getPortraitCatalog();
    const eyes: Set<number> = new Set();

    Object.keys(catalog).forEach((path) => {
      // Assetmaker uses /img/portraits/eyes/eye1 structure
      if (path.includes("/eyes/eye") && !path.includes("/beard")) {
        const match = path.match(/\/eyes\/(eye\d+)/);
        if (match) {
            const num = parseInt(match[1].replace("eye", ""), 10);
            eyes.add(num);
        }
      }
    });

    return Array.from(eyes).sort((a, b) => a - b);
  }

  /**
   * Get available face options
   */
  async getFaceOptions(): Promise<number[]> {
    const catalog = await this.getPortraitCatalog();
    const faces: Set<number> = new Set();

    Object.keys(catalog).forEach((path) => {
      if (path.includes("/face/face")) {
        const match = path.match(/face(\d+)/);
        if (match) {
          faces.add(parseInt(match[1], 10));
        }
      }
    });

    return Array.from(faces).sort((a, b) => a - b);
  }

  /**
   * Get all available beard options (independent of jaw)
   */
  async getBeardOptions(): Promise<number[]> {
      // Beards are always 1-6
      return [1, 2, 3, 4, 5, 6]; 
  }

  /**
   * Get available hair options (numbers)
   */
  async getHairOptions(): Promise<number[]> {
    const catalog = await this.getPortraitCatalog();
    const hairNums: Set<number> = new Set();

    Object.keys(catalog).forEach((path) => {
      // Assetmaker uses /img/portraits/hair/f1/top or /img/portraits/hair/m1/top
      if (path.includes("/hair/") && path.includes("/top")) {
        // Match f1, m1, hair1
        const numMatch = path.match(/\/hair\/[fm]?hair?(\d+)/) || path.match(/\/hair\/[fm](\d+)/);
        if (numMatch) {
          hairNums.add(parseInt(numMatch[1], 10));
        }
      }
    });

    return Array.from(hairNums).sort((a, b) => a - b);
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
    // (Already numbers now)

    return {
      base: baseColors,
      jaw: jaws,
      eyes: eyes,
      face: faces,
      beard: [1, 2, 3, 4, 5, 6], // Beard numbers 1-6 (tied to jaw)
      hair: hairs, // [1, 2, 3...]
    };
  }

  /**
   * Get the full image path for a portrait part
   */
  async getPortraitPartPath(
    part: keyof PortraitData, 
    value: number, 
    baseColor: number = 1,
    portrait?: PortraitData
  ): Promise<string | null> {
    const catalog = await this.getPortraitCatalog();

    if (part === "base") {
      const basePath = "/img/portraits/base";
      const files = catalog[basePath] || [];
      
      // Handle filtered colors (c7, c8, etc.) - these use c1 as base with CSS filters
      if (value >= 7) {
          // Filtered colors use c1 as the base image
          const c1File = files.find((f) => f.includes("c1"));
          return c1File ? `${basePath}/${c1File}` : null;
      }
      
      const file = files.find((f) => f === `base_c${value}.png` || f.includes(`c${value}`));
      return file ? `${basePath}/${file}` : null;
    }

    if (part === "jaw") {
      const jawPath = `/img/portraits/jaw/jaw${value}`;
      const files = catalog[jawPath] || [];
      // Find file matching base color
      const color = portrait?.base || baseColor || 1;
      const file = files.find((f) => f.includes(`c${color}`));
      return file ? `${jawPath}/${file}` : null;
    }

    if (part === "eyes") {
      // Assetmaker uses /img/portraits/eyes/eye1 structure (2 levels deep)
      const eyesPath = `/img/portraits/eyes/eye${value}`;
      const files = catalog[eyesPath] || [];
      if (files.length > 0) {
        // Use eyes_color from portrait if available, otherwise fallback to baseColor
        const color = portrait?.eyes_color || baseColor || 1;
        const file = files.find((f) => f.includes(`_c${color}.png`) || f.includes(`_c${color}_`));
        return file ? `${eyesPath}/${file}` : null;
      }
      return null;
    }

    if (part === "face") {
      const facePath = `/img/portraits/face/face${value}`;
      const files = catalog[facePath] || [];
      const color = portrait?.base || baseColor || 1;
      const file = files.find((f) => f.includes(`c${color}`));
      return file ? `${facePath}/${file}` : null;
    }

    if (part === "beard" && value) {
      // Beard path structure: /img/portraits/beard/jaw1_beard/jaw1_beard6/jaw1_beard6_c3.png
      if (!portrait) return null;
      
      const jawNum = portrait.jaw; // Now a number
      if (!jawNum) return null;
      
      const beardNum = value;
      if (!beardNum || beardNum < 1 || beardNum > 6) return null;
      
      // Build path: /img/portraits/beard/jaw1_beard/jaw1_beard6
      const beardPath = `/img/portraits/beard/jaw${jawNum}_beard/jaw${jawNum}_beard${beardNum}`;
      const files = catalog[beardPath] || [];
      
      if (files.length > 0) {
        // Use hair_color for beard color
        const color = portrait.hair_color || baseColor || 1;
        const file = files.find((f) => f.includes(`_c${color}.png`) || f.includes(`_c${color}_`));
        return file ? `${beardPath}/${file}` : null;
      }
      return null;
    }
    
    return null;
  }

  /**
   * Get specific hair path (top or bottom)
   */
  async getHairPath(
    layer: "top" | "bot",
    hairNum: number,
    gender: "MALE" | "FEMALE" | "NONE" = "MALE",
    hairColor: number = 1
  ): Promise<string | null> {
    const catalog = await this.getPortraitCatalog();
    
    // Determine prefix based on gender (m or f)
    // For NONE gender or if assets missing, fallback to male?
    const prefix = gender === "FEMALE" ? "f" : "m";
    const hairId = `${prefix}${hairNum}`; // e.g. m1, f1

    // Hair path is 3 levels deep: /img/portraits/hair/f1/top
    const hairPath = `/img/portraits/hair/${hairId}/${layer}`;
    const files = catalog[hairPath] || [];
    
    if (files.length > 0) {
      // Use hair_color
      const file = files.find((f) => f.includes(`_c${hairColor}_${layer}.png`) || f.includes(`_c${hairColor}_`));
      return file ? `${hairPath}/${file}` : null;
    }
    
    return null;
  }

  /**
   * Generate a default portrait for a gender and race
   */
  async generateDefaultPortrait(gender: "MALE" | "FEMALE", race?: string): Promise<PortraitData> {
    const options = await this.getPortraitPartOptions(race);
    
    return {
      base: options.base[0] || 1,
      jaw: options.jaw[0] || 1,
      eyes: options.eyes[0] || 1,
      eyes_color: 1,
      face: options.face[0] || 1,
      beard: null, // Default to no beard
      hair: 1, // Default to hair 1 instead of string path
      hair_color: 1,
    };
  }
}

// Export singleton instance
export const portraitAssetService = new PortraitAssetService();
