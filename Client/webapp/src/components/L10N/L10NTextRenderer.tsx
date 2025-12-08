import React from "react";
import { Tooltip, Box, Typography, alpha, useTheme } from "@mui/material";
import { L10NContent } from "@/data/mockNewsData";

export interface L10NTextRendererProps {
  content: L10NContent;
  language?: "en" | "th";
  variant?: "body1" | "body2" | "caption";
  sx?: any;
}

/**
 * Parsed token from L10N markup
 */
interface ParsedToken {
  type: "text" | "char" | "loc" | "skill" | "item" | "party" | "color" | "bold" | "italic";
  content: string;
  id?: string;
  color?: string;
}

/**
 * Parse L10N markup into tokens
 * Handles: [char:id]Name[/char], [loc:id]Location[/loc], [skill:id]Skill[/skill], etc.
 */
function parseL10NMarkup(text: string): ParsedToken[] {
  const tokens: ParsedToken[] = [];
  let currentIndex = 0;

  // Regex to match opening tags like [char:id], [loc:id], [color:red], [b], etc.
  const tagRegex = /\[(\w+)(?::([^\]]+))?\]/g;

  let match;
  while ((match = tagRegex.exec(text)) !== null) {
    const tagStart = match.index;
    const tagName = match[1];
    const tagParam = match[2] || "";

    // Add text before the tag
    if (tagStart > currentIndex) {
      tokens.push({
        type: "text",
        content: text.substring(currentIndex, tagStart),
      });
    }

    // Find the closing tag
    const closingTag = `[/${tagName}]`;
    const closingIndex = text.indexOf(closingTag, tagStart + match[0].length);

    if (closingIndex === -1) {
      // No closing tag found, treat as plain text
      tokens.push({
        type: "text",
        content: match[0],
      });
      currentIndex = tagStart + match[0].length;
      continue;
    }

    // Extract content between tags
    const contentStart = tagStart + match[0].length;
    const content = text.substring(contentStart, closingIndex);

    // Create token based on tag type
    switch (tagName) {
      case "char":
        tokens.push({
          type: "char",
          content,
          id: tagParam,
        });
        break;
      case "loc":
        tokens.push({
          type: "loc",
          content,
          id: tagParam,
        });
        break;
      case "skill":
        tokens.push({
          type: "skill",
          content,
          id: tagParam,
        });
        break;
      case "item":
        tokens.push({
          type: "item",
          content,
          id: tagParam,
        });
        break;
      case "party":
        tokens.push({
          type: "party",
          content,
          id: tagParam,
        });
        break;
      case "color":
        tokens.push({
          type: "color",
          content,
          color: tagParam,
        });
        break;
      case "b":
        tokens.push({
          type: "bold",
          content,
        });
        break;
      case "i":
        tokens.push({
          type: "italic",
          content,
        });
        break;
      default:
        // Unknown tag, treat as text
        tokens.push({
          type: "text",
          content: match[0] + content + closingTag,
        });
    }

    currentIndex = closingIndex + closingTag.length;
  }

  // Add remaining text
  if (currentIndex < text.length) {
    tokens.push({
      type: "text",
      content: text.substring(currentIndex),
    });
  }

  return tokens;
}

/**
 * Render tooltip content for different entity types
 */
function renderEntityTooltip(
  type: "char" | "loc" | "skill" | "item" | "party",
  id: string | undefined,
  entities: L10NContent["entities"],
  theme: any
): React.ReactNode {
  if (!id || !entities) return null;

  switch (type) {
    case "char": {
      const charData = entities.chars?.[id];
      if (!charData) return null;

      return (
        <Box sx={{ maxWidth: 300, p: 1 }}>
          {charData.portraitUrl && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mb: 1,
              }}
            >
              <Box
                component="img"
                src={`/img/portraits/${charData.portraitUrl}.png`}
                alt={charData.name.en}
                sx={{
                  width: 64,
                  height: 64,
                  borderRadius: "50%",
                  border: `2px solid ${theme.palette.primary.main}`,
                  objectFit: "cover",
                }}
              />
            </Box>
          )}
          <Typography
            sx={{
              fontFamily: "Cinzel, serif",
              fontSize: "1rem",
              fontWeight: 700,
              color: theme.palette.primary.main,
              mb: 0.5,
            }}
          >
            {charData.name.en}
          </Typography>
          <Typography
            sx={{
              fontFamily: "Crimson Text, serif",
              fontSize: "0.85rem",
              color: theme.palette.text.secondary,
              mb: 0.5,
            }}
          >
            Level {charData.level}
          </Typography>
          {charData.title && (
            <Typography
              sx={{
                fontFamily: "Crimson Text, serif",
                fontSize: "0.8rem",
                fontStyle: "italic",
                color: theme.palette.text.disabled,
              }}
            >
              {charData.title.en}
            </Typography>
          )}
          {charData.lastSeenLocation && (
            <Typography
              sx={{
                fontFamily: "Crimson Text, serif",
                fontSize: "0.75rem",
                color: theme.palette.text.disabled,
                mt: 0.5,
              }}
            >
              Last seen: {charData.lastSeenLocation}
            </Typography>
          )}
        </Box>
      );
    }

    case "loc": {
      const locData = entities.locs?.[id];
      if (!locData) return null;

      return (
        <Box sx={{ maxWidth: 300, p: 1 }}>
          <Typography
            sx={{
              fontFamily: "Cinzel, serif",
              fontSize: "1rem",
              fontWeight: 700,
              color: theme.palette.secondary.main,
              mb: 0.5,
            }}
          >
            {locData.name.en}
          </Typography>
          {locData.description && (
            <Typography
              sx={{
                fontFamily: "Crimson Text, serif",
                fontSize: "0.85rem",
                color: theme.palette.text.secondary,
                mb: 0.5,
              }}
            >
              {locData.description.en}
            </Typography>
          )}
          <Typography
            sx={{
              fontFamily: "Crimson Text, serif",
              fontSize: "0.8rem",
              color: theme.palette.text.disabled,
            }}
          >
            {locData.region} • {locData.subRegion}
          </Typography>
        </Box>
      );
    }

    case "skill": {
      const skillData = entities.skills?.[id];
      if (!skillData) return null;

      return (
        <Box sx={{ maxWidth: 300, p: 1 }}>
          <Typography
            sx={{
              fontFamily: "Cinzel, serif",
              fontSize: "1rem",
              fontWeight: 700,
              color: theme.palette.info?.main || theme.palette.secondary.main,
              mb: 0.5,
            }}
          >
            {skillData.name.en}
          </Typography>
          {skillData.description && (
            <Typography
              sx={{
                fontFamily: "Crimson Text, serif",
                fontSize: "0.85rem",
                color: theme.palette.text.secondary,
                mb: 0.5,
              }}
            >
              {skillData.description.en}
            </Typography>
          )}
          <Typography
            sx={{
              fontFamily: "Crimson Text, serif",
              fontSize: "0.8rem",
              color: theme.palette.text.disabled,
            }}
          >
            Tier {skillData.tier}
            {skillData.cost !== undefined && ` • Cost: ${skillData.cost}`}
          </Typography>
        </Box>
      );
    }

    case "item": {
      const itemData = entities.items?.[id];
      if (!itemData) return null;

      return (
        <Box sx={{ maxWidth: 300, p: 1 }}>
          <Typography
            sx={{
              fontFamily: "Cinzel, serif",
              fontSize: "1rem",
              fontWeight: 700,
              color: theme.palette.warning?.main || theme.palette.primary.main,
              mb: 0.5,
            }}
          >
            {itemData.name.en}
          </Typography>
          {itemData.description && (
            <Typography
              sx={{
                fontFamily: "Crimson Text, serif",
                fontSize: "0.85rem",
                color: theme.palette.text.secondary,
                mb: 0.5,
              }}
            >
              {itemData.description.en}
            </Typography>
          )}
          <Typography
            sx={{
              fontFamily: "Crimson Text, serif",
              fontSize: "0.8rem",
              color: theme.palette.text.disabled,
            }}
          >
            Rarity: {itemData.rarity}
          </Typography>
        </Box>
      );
    }

    case "party": {
      const partyData = entities.parties?.[id];
      if (!partyData) return null;

      return (
        <Box sx={{ maxWidth: 300, p: 1 }}>
          <Typography
            sx={{
              fontFamily: "Cinzel, serif",
              fontSize: "1rem",
              fontWeight: 700,
              color: theme.palette.secondary.main,
              mb: 0.5,
            }}
          >
            {partyData.name.en}
          </Typography>
          <Typography
            sx={{
              fontFamily: "Crimson Text, serif",
              fontSize: "0.85rem",
              color: theme.palette.text.secondary,
            }}
          >
            {partyData.memberCount} member{partyData.memberCount !== 1 ? "s" : ""}
          </Typography>
          {partyData.members && partyData.members.length > 0 && (
            <Box sx={{ mt: 1 }}>
              {partyData.members.slice(0, 5).map((member, idx) => (
                <Typography
                  key={idx}
                  sx={{
                    fontFamily: "Crimson Text, serif",
                    fontSize: "0.8rem",
                    color: theme.palette.text.disabled,
                  }}
                >
                  • {member.name} (Lv {member.level})
                </Typography>
              ))}
            </Box>
          )}
        </Box>
      );
    }

    default:
      return null;
  }
}

/**
 * L10N Text Renderer Component
 * Parses and renders L10N markup with tooltips on hover
 */
export const L10NTextRenderer: React.FC<L10NTextRendererProps> = ({
  content,
  language = "en",
  variant = "body1",
  sx,
}) => {
  const theme = useTheme();
  const text = language === "th" && content.th ? content.th : content.en;
  const tokens = parseL10NMarkup(text);

  // Helper to render entity tooltip with theme
  const renderTooltip = (
    type: "char" | "loc" | "skill" | "item" | "party",
    id: string | undefined
  ) => renderEntityTooltip(type, id, content.entities, theme);

  return (
    <Box
      component="span"
      sx={{
        fontFamily: "Crimson Text, serif",
        display: "inline",
        fontSize: variant === "body1" ? "1rem" : variant === "body2" ? "0.875rem" : "0.75rem",
        ...sx,
      }}
    >
      {tokens.map((token, index) => {
        // Plain text
        if (token.type === "text") {
          return <React.Fragment key={index}>{token.content}</React.Fragment>;
        }

        // Entity with tooltip
        if (["char", "loc", "skill", "item", "party"].includes(token.type)) {
          const tooltipContent = renderTooltip(
            token.type as "char" | "loc" | "skill" | "item" | "party",
            token.id
          );

          return (
            <Tooltip
              key={index}
              title={tooltipContent || ""}
              arrow
              placement="top"
              componentsProps={{
                tooltip: {
                  sx: {
                    backgroundColor: alpha(theme.palette.background.paper, 0.95),
                    border: `2px solid ${theme.palette.secondary.main}`,
                    borderRadius: 2,
                    boxShadow: `0 4px 16px ${alpha("#000", 0.2)}`,
                    maxWidth: 350,
                    padding: 0,
                  },
                },
              }}
            >
              <Box
                component="span"
                sx={{
                  color: theme.palette.primary.main,
                  textDecoration: "underline",
                  textDecorationStyle: "dotted",
                  textUnderlineOffset: 2,
                  cursor: "help",
                  "&:hover": {
                    color: theme.palette.primary.light,
                  },
                }}
              >
                {token.content}
              </Box>
            </Tooltip>
          );
        }

        // Color text
        if (token.type === "color") {
          return (
            <Box
              key={index}
              component="span"
              sx={{
                color: token.color || theme.palette.text.primary,
              }}
            >
              {token.content}
            </Box>
          );
        }

        // Bold text
        if (token.type === "bold") {
          return (
            <Box
              key={index}
              component="span"
              sx={{
                fontWeight: 700,
              }}
            >
              {token.content}
            </Box>
          );
        }

        // Italic text
        if (token.type === "italic") {
          return (
            <Box
              key={index}
              component="span"
              sx={{
                fontStyle: "italic",
              }}
            >
              {token.content}
            </Box>
          );
        }

        // Fallback
        return <React.Fragment key={index}>{token.content}</React.Fragment>;
      })}
    </Box>
  );
};

