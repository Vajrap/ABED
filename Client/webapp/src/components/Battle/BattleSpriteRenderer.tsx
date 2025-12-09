"use client";

import React, { useEffect, useState, useMemo } from "react";
import { Box } from "@mui/material";
import type { PortraitData } from "@/types/character";
import { portraitAssetService } from "@/services/portraitAssetService";

// Inject battle animation keyframes globally
if (typeof document !== "undefined") {
  const styleId = "battle-sprite-animation";
  if (!document.getElementById(styleId)) {
    const style = document.createElement("style");
    style.id = styleId;
    style.textContent = `
      @keyframes battleAnimation {
        from { background-position: 0px 0px; }
        to { background-position: -600px 0px; }
      }
    `;
    document.head.appendChild(style);
  }
}

export interface BattleSpriteRendererProps {
  portrait: PortraitData | string | null | undefined;
  equipment?: {
    weapon?: string | null;
    body?: string | null;
    // Add other equipment slots as needed
  };
  size?: number | string;
  className?: string;
  style?: React.CSSProperties;
  animated?: boolean; // Whether to animate the sprite
}

/**
 * BattleSpriteRenderer Component
 * 
 * Renders animated battle sprites from portrait data + equipped items.
 * Maps portrait parts to battle sprite equivalents and handles weapon/clothing layers.
 */
export const BattleSpriteRenderer: React.FC<BattleSpriteRendererProps> = ({
  portrait,
  equipment = {},
  size = 100,
  className,
  style,
  animated = true,
}) => {
  const [spriteLayers, setSpriteLayers] = useState<Array<{ path: string; zIndex: number; filter?: string }>>([]);
  const [loading, setLoading] = useState(true);

  // Create stable keys for dependency comparison
  const portraitKey = useMemo(() => {
    if (!portrait) return "null";
    if (typeof portrait === "string") return portrait;
    return JSON.stringify(portrait);
  }, [portrait]);

  const equipmentKey = useMemo(() => {
    return JSON.stringify(equipment || {});
  }, [equipment]);

  useEffect(() => {
    const loadBattleSprites = async () => {
      if (!portrait) {
        setSpriteLayers([]);
        setLoading(false);
        return;
      }

      // Handle legacy string format - can't generate battle sprite from it
      if (typeof portrait === "string") {
        setSpriteLayers([]);
        setLoading(false);
        return;
      }

      try {
        const battleCatalog = await portraitAssetService.getBattleCatalog();
        const layers: Array<{ path: string; zIndex: number; filter?: string }> = [];
        const baseColor = portrait.base;

        // Extract base color number to determine if we need CSS filters
        const baseColorMatch = portrait.base.match(/c(\d+)/);
        const baseColorNum = baseColorMatch ? parseInt(baseColorMatch[1], 10) : 1;

        // For filtered colors (c7, c8), use c1 as the effective baseColor for other parts
        // since those parts don't have filtered variants
        const effectiveBaseColor = baseColorNum >= 7 ? "c1" : baseColor;

        // Determine CSS filter for filtered colors (c7, c8, etc.)
        // Use color-only adjustments to preserve detail (avoid brightness which washes out details)
        let skinFilter: string | undefined = undefined;
        if (baseColorNum === 7) {
          // Lighter skin: slight hue shift toward warmer tones, increase saturation, brighter
          skinFilter = "hue-rotate(-5deg) saturate(1.15) brightness(1.15)";
        } else if (baseColorNum === 8) {
          // Paler skin: slight hue shift, reduce saturation, brighter
          skinFilter = "hue-rotate(3deg) saturate(0.75) brightness(1.18)";
        }

        // Layer order for battle sprites (from back to front):
        // 1. Skin (from base) - z-index: 1
        // For filtered colors (c7, c8), use c1 as base and apply CSS filter
        const skinPath = `/img/battle/skin`;
        const skinFiles = battleCatalog[skinPath] || [];
        let skinFile: string | undefined;
        
        if (baseColorNum >= 7) {
          // Filtered colors use c1 as the base image
          skinFile = skinFiles.find((f) => f.includes("c1"));
        } else {
          skinFile = skinFiles.find((f) => f.includes(baseColor));
        }
        
        if (skinFile) {
          layers.push({ path: `${skinPath}/${skinFile}`, zIndex: 1, filter: skinFilter });
        }

        // 2. Face (from eyes/face) - z-index: 2
        // Face color comes from eyes_color (as per assetmaker logic)
        // Use effectiveBaseColor (c1 for filtered colors) to find matching face files
        // Apply same filter as skin when using filtered colors (c7, c8) to match skin tone
        const facePath = `/img/battle/face`;
        const faceFiles = battleCatalog[facePath] || [];
        const faceColor = portrait.eyes_color || effectiveBaseColor;
        const faceFile = faceFiles.find((f) => f.includes(`_${faceColor}.png`) || f.includes(`_${faceColor}_`));
        if (faceFile) {
          layers.push({ path: `${facePath}/${faceFile}`, zIndex: 2, filter: skinFilter }); // Apply same filter to face
        }

        // 3. Clothing bottom (from equipment) - z-index: 3
        if (equipment.body) {
          // Map equipment to battle sprite clothing
          // This is a simplified mapping - you may need to adjust based on your equipment system
          const clothPath = `/img/battle/cloth/cloth1/bot`;
          const clothFiles = battleCatalog[clothPath] || [];
          const clothFile = clothFiles.find((f) => f.includes(effectiveBaseColor));
          if (clothFile) {
            layers.push({ path: `${clothPath}/${clothFile}`, zIndex: 3 });
          }
        }

        // 4. Hair bottom - z-index: 4
        // Handle f1_bot, m1_bot, or hair1_bot format
        const hairBotMatch = portrait.hair_bot.match(/^(f\d+|m\d+|hair\d+)_bot$/);
        if (hairBotMatch) {
          const [, hairId] = hairBotMatch;
          const hairBotPath = `/img/battle/hair/${hairId}/bot`;
          const hairBotFiles = battleCatalog[hairBotPath] || [];
          const hairColor = portrait.hair_color || effectiveBaseColor;
          const hairBotFile = hairBotFiles.find((f) => f.includes(`_${hairColor}_bot.png`) || f.includes(`_${hairColor}_`));
          if (hairBotFile) {
            layers.push({ path: `${hairBotPath}/${hairBotFile}`, zIndex: 4 });
          }
        }

        // 5. Clothing top (from equipment) - z-index: 5
        if (equipment.body) {
          const clothTopPath = `/img/battle/cloth/cloth1/top`;
          const clothTopFiles = battleCatalog[clothTopPath] || [];
          const clothTopFile = clothTopFiles.find((f) => f.includes(effectiveBaseColor));
          if (clothTopFile) {
            layers.push({ path: `${clothTopPath}/${clothTopFile}`, zIndex: 5 });
          }
        }

        // 6. Hair top - z-index: 6
        // Handle f1_top, m1_top, or hair1_top format
        const hairTopMatch = portrait.hair_top.match(/^(f\d+|m\d+|hair\d+)_top$/);
        if (hairTopMatch) {
          const [, hairId] = hairTopMatch;
          const hairTopPath = `/img/battle/hair/${hairId}/top`;
          const hairTopFiles = battleCatalog[hairTopPath] || [];
          const hairColor = portrait.hair_color || effectiveBaseColor;
          const hairTopFile = hairTopFiles.find((f) => f.includes(`_${hairColor}_top.png`) || f.includes(`_${hairColor}_`));
          if (hairTopFile) {
            layers.push({ path: `${hairTopPath}/${hairTopFile}`, zIndex: 6 });
          }
        }

        // 7. Weapon top (from equipment) - z-index: 7
        if (equipment.weapon) {
          const weaponPath = `/img/battle/weapon/weapon1/top`;
          const weaponFiles = battleCatalog[weaponPath] || [];
          const weaponFile = weaponFiles.find((f) => f.includes(effectiveBaseColor));
          if (weaponFile) {
            layers.push({ path: `${weaponPath}/${weaponFile}`, zIndex: 7 });
          }
        }

        setSpriteLayers(layers);
      } catch (error) {
        console.error("Failed to load battle sprite images:", error);
        setSpriteLayers([]);
      } finally {
        setLoading(false);
      }
    };

    loadBattleSprites();
  }, [portraitKey, equipmentKey]);

  // Reset animation when portrait changes (to sync all layers)
  useEffect(() => {
    if (animated && spriteLayers.length > 0) {
      // Use requestAnimationFrame to ensure DOM is ready
      const frameId = requestAnimationFrame(() => {
        // Force all layers to reset to first frame
        const layers = document.querySelectorAll(`[data-battle-layer]`);
        layers.forEach((layer) => {
          const element = layer as HTMLElement;
          // Stop animation
          element.style.animation = "none";
          // Force reflow to reset
          void element.offsetWidth;
          // Restart animation from beginning
          element.style.animation = "battleAnimation 1s steps(6) infinite";
          element.style.backgroundPosition = "0px 0px";
        });
      });
      return () => cancelAnimationFrame(frameId);
    }
  }, [portraitKey, animated, spriteLayers.length]);

  if (loading) {
    return (
      <Box
        sx={{
          width: size,
          height: size,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "grey.200",
          borderRadius: 2,
          ...style,
        }}
        className={className}
      >
        {/* Loading placeholder */}
      </Box>
    );
  }

  if (spriteLayers.length === 0) {
    return (
      <Box
        sx={{
          width: size,
          height: size,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "grey.200",
          borderRadius: 2,
          ...style,
        }}
        className={className}
      >
        {/* Empty sprite placeholder */}
      </Box>
    );
  }

  const containerSize = typeof size === "number" ? size : 120;
  const scale = 3; // 3x zoom to focus on face area (same as portrait)

  return (
    <Box
      sx={{
        position: "relative",
        width: containerSize,
        height: containerSize,
        overflow: "hidden",
        borderRadius: 2,
        ...style,
      }}
      className={className}
    >
      {spriteLayers.map(({ path, zIndex, filter }, index) => {
        // Apply filter to skin and face layers (zIndex 1, 2) when filter is defined
        // These layers need the same filter to match skin tone
        const shouldApplyFilter = (zIndex === 1 || zIndex === 2) && filter;
        
        return (
          <Box
            key={`${path}-${index}`}
            data-battle-layer
            sx={{
              position: "absolute",
              top: 3,
              left: -60,
              width: `${containerSize}px`,
              height: animated ? "600px" : `${containerSize}px`,
              backgroundImage: `url(${path})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "auto",
              backgroundPosition: "0px 0px",
              transform: `scale(${scale})`,
              transformOrigin: "top left",
              ...(shouldApplyFilter && { filter }), // Apply CSS filter ONLY to skin layer (zIndex === 1)
              zIndex,
              ...(animated && {
                animation: "battleAnimation 1s steps(6) infinite",
              }),
            }}
          />
        );
      })}
    </Box>
  );
};

