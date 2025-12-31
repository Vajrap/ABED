"use client";

import React, { useEffect, useState, useMemo } from "react";
import { Box } from "@mui/material";
import type { PortraitData } from "@/types/character";
import { portraitAssetService } from "@/services/portraitAssetService";
import { getArmorSpriteId, getWeaponPath } from "@/utils/equipmentSpriteMapper";

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
  gender?: "MALE" | "FEMALE" | "NONE";
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
  gender = "MALE",
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
      } catch (error) {
        console.error("Failed to load battle sprite images:", error);
        setSpriteLayers([]);
      } finally {
        setLoading(false);
      }
    };

    loadBattleSprites();
    loadBattleSprites();
  }, [portraitKey, equipmentKey, gender]);

  // Reset animation when portrait or equipment changes (to sync all layers)
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
  }, [portraitKey, equipmentKey, animated, spriteLayers.length]);

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

        // When clothing is equipped, mask the face layer (zIndex 2) to hide the collar area
        // The face layer has a collar baked in, but clothing should cover it
        const hasEquipment = equipment.body && equipment.body.trim() !== "";
        const isFaceLayer = zIndex === 2;
        const shouldMaskCollar = isFaceLayer && hasEquipment;

        // Create unique key that includes zIndex and equipment info to force re-render when equipment changes
        const uniqueKey = `${path}-${zIndex}-${equipmentKey}-${index}`;

        return (
          <Box
            key={uniqueKey}
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
              ...(shouldApplyFilter && { filter }), // Apply CSS filter ONLY to skin and face layers (zIndex === 1 or 2)
              // Mask the collar area from face layer when clothing is equipped
              // Clip from top 0% to ~30% to hide the collar area (adjust percentage as needed)
              ...(shouldMaskCollar && {
                clipPath: "inset(0% 0% 70% 0%)", // Hide top 30% where collar typically is
                WebkitClipPath: "inset(0% 0% 70% 0%)", // Webkit prefix for Safari
              }),
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

