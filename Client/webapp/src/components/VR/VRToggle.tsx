import React, { useState, useEffect } from "react";
import { 
  IconButton, 
  Tooltip, 
  Fade,
  Box,
  Typography
} from "@mui/material";
import { ViewInAr, Close } from "@mui/icons-material";
import { styled } from "@mui/material/styles";

const VRButton = styled(IconButton)(({ theme }) => ({
  position: "fixed",
  top: 80,
  right: 20,
  zIndex: 1000,
  width: 56,
  height: 56,
  background: `linear-gradient(135deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
  color: "white",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
  border: `2px solid ${theme.palette.secondary.main}`,
  "&:hover": {
    background: `linear-gradient(135deg, ${theme.palette.secondary.dark}, ${theme.palette.primary.dark})`,
    transform: "scale(1.1)",
    boxShadow: "0 12px 40px rgba(0, 0, 0, 0.4)",
  },
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
}));

const VRInstructions = styled(Box)(({ theme }) => ({
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  zIndex: 2000,
  background: "rgba(0, 0, 0, 0.9)",
  color: "white",
  padding: theme.spacing(3),
  borderRadius: theme.spacing(2),
  textAlign: "center",
  maxWidth: 400,
  backdropFilter: "blur(10px)",
  border: `1px solid ${theme.palette.primary.main}`,
}));

interface VRToggleProps {
  onToggleVR: (isVR: boolean) => void;
  isVR: boolean;
}

export const VRToggle: React.FC<VRToggleProps> = ({ onToggleVR, isVR }) => {
  const [showInstructions, setShowInstructions] = useState(false);

  useEffect(() => {
    if (isVR) {
      setShowInstructions(true);
      const timer = setTimeout(() => setShowInstructions(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [isVR]);

  const handleToggle = () => {
    onToggleVR(!isVR);
  };

  return (
    <>
      <VRButton
        onClick={handleToggle}
        size="large"
        sx={{
          animation: isVR ? "pulse 2s infinite" : "none",
        }}
      >
        {isVR ? <Close /> : <ViewInAr />}
      </VRButton>

      <Tooltip 
        title={isVR ? "Exit VR Mode" : "Enter VR Mode"} 
        placement="left"
        slotProps={{ tooltip: { sx: { zIndex: 1300 } } }}
      >
        <Box />
      </Tooltip>

      {/* VR Instructions Overlay */}
      <Fade in={showInstructions} timeout={500}>
        <VRInstructions>
          <Typography variant="h5" gutterBottom sx={{ color: "primary.main" }}>
            🥽 VR Mode Active
          </Typography>
          <Typography variant="body1" paragraph>
            You're now in VR mode! The music player is floating in 3D space.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            • Use mouse to look around
            <br />
            • Click on 3D controls to interact
            <br />
            • Click the VR button to exit
          </Typography>
        </VRInstructions>
      </Fade>
    </>
  );
};
