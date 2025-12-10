"use client";

import React, { useEffect, useState, useMemo } from "react";
import { Box } from "@mui/material";
import type { PortraitData } from "@/types/character";
import { portraitAssetService } from "@/services/portraitAssetService";
import { getArmorSpriteId, getArmorSpritePathForPortrait } from "@/utils/equipmentSpriteMapper";

export interface PortraitRendererProps {
  portrait: PortraitData | string | null | undefined;
  size?: number | string; // Size in pixels or CSS value
  className?: string;
  style?: React.CSSProperties;
  alt?: string;
  portraitScale?: number; // Override default scale (default: 3 for character creation)
  portraitOffset?: { x: number; y: number }; // Offset in pixels to shift portrait (default: {x: 0, y: 0})
  equipment?: {
    body?: string | null; // Armor/body equipment ID
  };
}

/**
 * PortraitRenderer Component
 * 
 * Renders a composable portrait from PortraitData by layering multiple images.
 * Supports both new PortraitData format and legacy string format (for backward compatibility).
 */
export const PortraitRenderer: React.FC<PortraitRendererProps> = ({
  portrait,
  size = 120,
  className,
  style,
  alt = "Character portrait",
  portraitScale,
  portraitOffset,
  equipment = {},
}) => {
  const [imagePaths, setImagePaths] = useState<Array<{ path: string; zIndex: number; filter?: string }>>([]);
  const [loading, setLoading] = useState(true);

  // Create a stable string representation of the portrait for dependency comparison
  const portraitKey = useMemo(() => {
    if (!portrait) return "null";
    if (typeof portrait === "string") return portrait;
    return JSON.stringify(portrait);
  }, [portrait]);

  const equipmentKey = useMemo(() => {
    return JSON.stringify(equipment || {});
  }, [equipment]);

  useEffect(() => {
    const loadPortraitImages = async () => {
      console.log("PortraitRenderer: useEffect triggered", { 
        portraitKey, 
        equipmentKey, 
        equipment: JSON.stringify(equipment),
        equipmentBody: equipment?.body 
      });
      
      if (!portrait) {
        setImagePaths([]);
        setLoading(false);
        return;
      }

      // Handle legacy string format
      if (typeof portrait === "string") {
        // For legacy format, just show a single image
        setImagePaths([
          {
            path: portrait.startsWith("/") ? portrait : `/img/portraits/${portrait}.png`,
            zIndex: 1,
            filter: undefined,
          },
        ]);
        setLoading(false);
        return;
      }

      // Handle new PortraitData format
      try {
        const paths: Array<{ path: string; zIndex: number; filter?: string }> = [];
        const baseColor = portrait.base;

        // Extract base color number to determine if we need CSS filters
        const baseColorMatch = portrait.base.match(/c(\d+)/);
        const baseColorNum = baseColorMatch ? parseInt(baseColorMatch[1], 10) : 1;

        // For filtered colors (c7, c8), use c1 as the baseColor for other parts
        // since those parts don't have filtered variants - they should match the filtered base
        const effectiveBaseColor = baseColorNum >= 7 ? "c1" : baseColor;

        // Determine CSS filter for filtered colors (c7, c8, etc.)
        // Use color-only adjustments to preserve detail (avoid brightness which washes out details)
        // c7: lighter skin tone - adjust hue slightly and increase saturation
        // c8: paler skin tone - adjust hue and reduce saturation
        let baseFilter: string | undefined = undefined;
        if (baseColorNum === 7) {
          // Lighter skin: slight hue shift toward warmer tones, increase saturation, brighter
          baseFilter = "hue-rotate(-5deg) saturate(1.15) brightness(1.15)";
        } else if (baseColorNum === 8) {
          // Paler skin: slight hue shift, reduce saturation, brighter
          baseFilter = "hue-rotate(3deg) saturate(0.75) brightness(1.18)";
        }

        // Load clothing/equipment if provided
        let clothBotPath: string | null = null;
        let clothTopPath: string | null = null;
        
        console.log("PortraitRenderer: Equipment object", JSON.stringify(equipment), "equipment.body:", equipment?.body);
        
        if (equipment?.body) {
          console.log("PortraitRenderer: Processing equipment.body:", equipment.body);
          const clothPath = getArmorSpritePathForPortrait(equipment.body);
          console.log("PortraitRenderer: getArmorSpritePathForPortrait result for", equipment.body, ":", clothPath);
          if (clothPath) {
            clothBotPath = clothPath.bot;
            clothTopPath = clothPath.top;
            console.log("PortraitRenderer: Loading clothing", { 
              equipmentId: equipment.body, 
              botPath: clothBotPath, 
              topPath: clothTopPath 
            });
          } else {
            console.warn("PortraitRenderer: No cloth path found for equipment", equipment.body);
          }
        } else {
          console.log("PortraitRenderer: No equipment.body provided. equipment:", equipment, "equipment?.body:", equipment?.body);
        }
        
        console.log("PortraitRenderer: After equipment processing - clothBotPath:", clothBotPath, "clothTopPath:", clothTopPath);

        // Load all parts in parallel for better performance
        // Use effectiveBaseColor (c1 for filtered colors) for parts other than base
        const [
          basePath,
          jawPath,
          facePath,
          eyesPath,
          beardPath,
          hairBotPath,
          hairTopPath,
        ] = await Promise.all([
          portraitAssetService.getPortraitPartPath("base", portrait.base, baseColor, portrait),
          portraitAssetService.getPortraitPartPath("jaw", portrait.jaw, effectiveBaseColor, portrait),
          portraitAssetService.getPortraitPartPath("face", portrait.face, effectiveBaseColor, portrait),
          portraitAssetService.getPortraitPartPath("eyes", portrait.eyes, effectiveBaseColor, portrait),
          portrait.beard !== null && portrait.beard !== undefined
            ? portraitAssetService.getPortraitPartPath("beard", String(portrait.beard), effectiveBaseColor, portrait)
            : Promise.resolve(null),
          portraitAssetService.getPortraitPartPath("hair_bot", portrait.hair_bot, effectiveBaseColor, portrait),
          portraitAssetService.getPortraitPartPath("hair_top", portrait.hair_top, effectiveBaseColor, portrait),
        ]);

        // Add paths in z-index order (beard behind equipment):
        // base(30), cloth_bot(35), jaw(40), face(50), eyes(70), beard(75), cloth_top(80), hair_bot(85), hair_top(90)
        // Base, jaw, and face all need the same filter to match skin tone
        if (basePath) paths.push({ path: basePath, zIndex: 30, filter: baseFilter });
        if (clothBotPath) {
          paths.push({ path: clothBotPath, zIndex: 35 }); // Cloth bottom after base, before jaw
          console.log("PortraitRenderer: Added cloth_bot", clothBotPath, "zIndex: 35");
        }
        if (jawPath) paths.push({ path: jawPath, zIndex: 40, filter: baseFilter }); // Apply same filter to jaw
        if (facePath) paths.push({ path: facePath, zIndex: 50, filter: baseFilter }); // Apply same filter to face
        if (eyesPath) paths.push({ path: eyesPath, zIndex: 70 });
        if (beardPath) paths.push({ path: beardPath, zIndex: 75 }); // Beard after eyes, before cloth_top
        if (clothTopPath) {
          paths.push({ path: clothTopPath, zIndex: 80 }); // Cloth top after beard
          console.log("PortraitRenderer: Added cloth_top", clothTopPath, "zIndex: 80");
        }
        if (hairBotPath) paths.push({ path: hairBotPath, zIndex: 85 });
        if (hairTopPath) paths.push({ path: hairTopPath, zIndex: 90 });

        console.log("PortraitRenderer: Final paths", paths.map(p => ({ path: p.path, zIndex: p.zIndex })));
        setImagePaths(paths);
      } catch (error) {
        console.error("Failed to load portrait images:", error);
        setImagePaths([]);
      } finally {
        setLoading(false);
      }
    };

    loadPortraitImages();
  }, [portraitKey, equipmentKey]);

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
          // borderRadius: 2,
          ...style,
        }}
        className={className}
      >
        {/* Loading placeholder */}
      </Box>
    );
  }

  if (imagePaths.length === 0) {
    return (
      <Box
        sx={{
          width: size,
          height: size,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "grey.200",
          // borderRadius: 2,
          ...style,
        }}
        className={className}
      >
        {/* Empty portrait placeholder */}
      </Box>
    );
  }

  return (
    <Box
      sx={{
        position: "relative",
        width: size,
        height: size,
        overflow: "hidden",
        // borderRadius: 2,
        ...style,
      }}
      className={className}
    >
      {imagePaths.map(({ path, zIndex, filter }, index) => {
        // Calculate scale based on container size
        // Sprite is 192x192px, we want to show just the face (top-left portion)
        // For a 120px display, 3x scale shows ~64px of sprite (good for face)
        const containerSize = typeof size === "number" ? size : 120;
        const scale = portraitScale ?? 2.5; // Default 3x zoom for character creation, override for other contexts
        const offset = portraitOffset ?? { x: 0, y: 0 }; // Default no offset, override for positioning
        
        // Apply filter to base (30), jaw (40), and face (50) layers when filter is defined
        // These layers all need the same filter to match skin tone
        // Note: cloth layers should NOT have the filter applied
        const shouldApplyFilter = (zIndex === 30 || zIndex === 40 || zIndex === 50) && filter;
        
        return (
          <img
            key={`${path}-${index}`}
            src={path}
            alt={index === 0 ? alt : ""}
            style={{
              position: "absolute",
              scale: 1,
              top: 0,
              left: 0,
              width: `${containerSize}px`, // Base size matches container
              height: `${containerSize}px`,
              objectFit: "none", // Don't scale the image content
              objectPosition: "top left", // Anchor to top-left
              transform: `scale(${scale})${offset.x !== 0 || offset.y !== 0 ? ` translate(${offset.x}px, ${offset.y}px)` : ""}`, // Scale and optionally shift position
              transformOrigin: "top left", // Keep top-left corner fixed
              ...(shouldApplyFilter && { filter }), // Apply CSS filter to base, jaw, and face layers
              zIndex,
            }}
            onError={(e) => {
              // Log error for debugging
              console.error("PortraitRenderer: Image failed to load", path, e);
              // Hide broken images
              (e.target as HTMLImageElement).style.display = "none";
            }}
            onLoad={() => {
              console.log("PortraitRenderer: Image loaded successfully", path);
            }}
          />
        );
      })}
    </Box>
  );
};

