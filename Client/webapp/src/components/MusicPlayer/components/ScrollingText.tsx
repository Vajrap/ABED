import React from "react";
import { Typography, Box } from "@mui/material";
import { styled, keyframes } from "@mui/material/styles";

const scrollAnimation = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
`;

const ScrollingContainer = styled(Box)(() => ({
  overflow: "hidden",
  whiteSpace: "nowrap",
  width: "100%",
  position: "relative",
  height: "1.5em", // Fixed height to prevent layout shifts
  display: "flex",
  alignItems: "center",
}));

const ScrollingText = styled(Typography)(() => ({
  display: "inline-block",
  animation: `${scrollAnimation} 10s linear infinite`,
  animationPlayState: "running",
  "&:hover": {
    animationPlayState: "paused",
  },
}));

interface ScrollingTextProps {
  text: string;
  maxWidth?: number;
  variant?: "body2" | "caption" | "body1";
  color?: string;
}

export const ScrollingTextComponent: React.FC<ScrollingTextProps> = ({
  text,
  maxWidth = 120,
  variant = "body2",
  color = "text.primary",
}) => {
  const shouldScroll = text.length > 15; // Adjust threshold as needed

  return (
    <ScrollingContainer sx={{ maxWidth }}>
      {shouldScroll ? (
        <ScrollingText variant={variant} color={color} noWrap>
          {text} • {text} {/* Duplicate text for seamless loop */}
        </ScrollingText>
      ) : (
        <Typography variant={variant} color={color} noWrap sx={{ width: "100%" }}>
          {text}
        </Typography>
      )}
    </ScrollingContainer>
  );
};
