/**
 * React component wrapper for rendering L10N text with markup
 */
"use client";

import React from "react";
import { Typography, Box } from "@mui/material";
import { renderText, type RenderTextOptions } from "./textRenderer";

interface TextRendererProps {
  text: string;
  options?: RenderTextOptions;
  variant?: React.ComponentProps<typeof Typography>["variant"];
  component?: React.ElementType;
  sx?: React.ComponentProps<typeof Typography>["sx"];
}

/**
 * React component that renders L10N text with markup parsing
 * Uses dangerouslySetInnerHTML to render the parsed HTML
 */
export const TextRenderer: React.FC<TextRendererProps> = ({
  text,
  options = {},
  variant = "body2",
  component = "div",
  sx,
}) => {
  if (!text) return null;

  const renderedHtml = renderText(text, options);

  return (
    <Typography
      variant={variant}
      component={component}
      sx={{
        ...sx,
        "& .formula-capsule": {
          display: "inline-block",
          padding: "2px 8px",
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          color: "inherit",
          border: "1px solid",
          borderColor: "primary.main",
          borderRadius: "8px",
          fontWeight: 600,
          fontSize: "0.9em",
          margin: "0 2px",
          fontFamily: "monospace",
        },
      }}
      dangerouslySetInnerHTML={{ __html: renderedHtml }}
    />
  );
};

