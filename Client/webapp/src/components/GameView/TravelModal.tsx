"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  Button,
  alpha,
  useTheme,
  Paper,
  CircularProgress,
  Alert,
} from "@mui/material";
import { Close as CloseIcon, LocationOn, DirectionsWalk } from "@mui/icons-material";
import { locationService } from "@/services/locationService";
import { travelService } from "@/services/travelService";
import type { PartyInterface } from "@/types/api";

export interface TravelModalProps {
  open: boolean;
  onClose: () => void;
  currentLocationId?: string;
  onTravelStarted?: (party: PartyInterface) => void;
}

interface ConnectedLocation {
  id: string;
  name: string;
  distance: number;
}

export const TravelModal: React.FC<TravelModalProps> = ({
  open,
  onClose,
  currentLocationId,
  onTravelStarted,
}) => {
  const theme = useTheme();
  const [currentLocation, setCurrentLocation] = useState<{ id: string; name: string } | null>(null);
  const [connectedLocations, setConnectedLocations] = useState<ConnectedLocation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedDestination, setSelectedDestination] = useState<ConnectedLocation | null>(null);
  const [isStartingTravel, setIsStartingTravel] = useState(false);

  // Fetch connected locations when modal opens
  useEffect(() => {
    if (open) {
      fetchConnectedLocations();
    } else {
      // Reset state when modal closes
      setCurrentLocation(null);
      setConnectedLocations([]);
      setError(null);
      setSelectedDestination(null);
      setIsStartingTravel(false);
    }
  }, [open]);

  const fetchConnectedLocations = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await locationService.getConnectedLocations();
      if (response.success && response.currentLocation && response.connectedLocations) {
        setCurrentLocation(response.currentLocation);
        setConnectedLocations(response.connectedLocations);
      } else {
        setError(response.messageKey || "Failed to load connected locations");
      }
    } catch (err) {
      console.error("Error fetching connected locations:", err);
      setError(err instanceof Error ? err.message : "Failed to load connected locations");
    } finally {
      setLoading(false);
    }
  };

  const handleLocationClick = (location: ConnectedLocation) => {
    setSelectedDestination(location);
  };

  const handleSetDestination = async () => {
    if (!selectedDestination) return;

    setIsStartingTravel(true);
    setError(null);

    try {
      const response = await travelService.startTravel(selectedDestination.id);
      if (response.success && response.party) {
        // Notify parent component
        if (onTravelStarted) {
          onTravelStarted(response.party);
        }
        // Close modal
        onClose();
      } else {
        setError(response.messageKey || "Failed to start travel");
      }
    } catch (err) {
      console.error("Error starting travel:", err);
      setError(err instanceof Error ? err.message : "Failed to start travel");
    } finally {
      setIsStartingTravel(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: alpha(theme.palette.background.paper, 0.95),
          border: `2px solid ${theme.palette.secondary.main}`,
          borderRadius: 2,
          boxShadow: `
            0 8px 32px ${alpha("#000", 0.2)},
            inset 0 1px 0 ${alpha("#fff", 0.3)}
          `,
        },
      }}
    >
      <DialogTitle
        component="div"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontFamily: "Crimson Text, serif",
          fontSize: "1.5rem",
          fontWeight: 600,
          borderBottom: `2px solid ${alpha(theme.palette.secondary.main, 0.3)}`,
          pb: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <DirectionsWalk sx={{ color: theme.palette.primary.main }} />
          <Typography component="div" variant="h5" sx={{ fontFamily: "Crimson Text, serif", fontWeight: 600 }}>
            Travel
          </Typography>
        </Box>
        <Button
          onClick={onClose}
          sx={{
            minWidth: "auto",
            width: 32,
            height: 32,
            padding: 0,
            color: theme.palette.text.secondary,
            "&:hover": {
              backgroundColor: alpha(theme.palette.error.main, 0.1),
              color: theme.palette.error.main,
            },
          }}
        >
          <CloseIcon />
        </Button>
      </DialogTitle>

      <DialogContent sx={{ pt: 3, pb: 2 }}>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: 200 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {/* Current Location */}
            {currentLocation && (
              <Box>
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontFamily: "Crimson Text, serif",
                    fontSize: "0.9rem",
                    color: theme.palette.text.secondary,
                    mb: 1,
                    textTransform: "uppercase",
                    letterSpacing: 1,
                  }}
                >
                  Current Location
                </Typography>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                    border: `2px solid ${theme.palette.primary.main}`,
                    borderRadius: 1,
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                  }}
                >
                  <LocationOn sx={{ color: theme.palette.primary.main, fontSize: 28 }} />
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: "Crimson Text, serif",
                      fontSize: "1.2rem",
                      fontWeight: 600,
                      color: theme.palette.primary.main,
                    }}
                  >
                    {currentLocation.name}
                  </Typography>
                </Paper>
              </Box>
            )}

            {/* Connected Locations */}
            <Box>
              <Typography
                variant="subtitle2"
                sx={{
                  fontFamily: "Crimson Text, serif",
                  fontSize: "0.9rem",
                  color: theme.palette.text.secondary,
                  mb: 1.5,
                  textTransform: "uppercase",
                  letterSpacing: 1,
                }}
              >
                Available Destinations
              </Typography>
              {connectedLocations.length === 0 ? (
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    textAlign: "center",
                    backgroundColor: alpha(theme.palette.background.default, 0.5),
                    border: `1px dashed ${alpha(theme.palette.text.disabled, 0.3)}`,
                    borderRadius: 1,
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      fontFamily: "Crimson Text, serif",
                      color: theme.palette.text.disabled,
                      fontStyle: "italic",
                    }}
                  >
                    No connected locations available
                  </Typography>
                </Paper>
              ) : (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                  {connectedLocations.map((location) => {
                    const isSelected = selectedDestination?.id === location.id;
                    return (
                      <Paper
                        key={location.id}
                        elevation={0}
                        onClick={() => handleLocationClick(location)}
                        sx={{
                          p: 2,
                          backgroundColor: isSelected
                            ? alpha(theme.palette.primary.main, 0.15)
                            : alpha(theme.palette.background.paper, 0.8),
                          border: isSelected
                            ? `2px solid ${theme.palette.primary.main}`
                            : `2px solid ${alpha(theme.palette.secondary.main, 0.3)}`,
                          borderRadius: 1,
                          cursor: "pointer",
                          transition: "all 0.2s ease-out",
                          "&:hover": {
                            backgroundColor: isSelected
                              ? alpha(theme.palette.primary.main, 0.2)
                              : alpha(theme.palette.secondary.main, 0.1),
                            border: isSelected
                              ? `2px solid ${theme.palette.primary.main}`
                              : `2px solid ${theme.palette.secondary.main}`,
                            transform: "translateX(4px)",
                            boxShadow: `0 4px 12px ${alpha(theme.palette.secondary.main, 0.2)}`,
                          },
                        }}
                      >
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                          <LocationOn sx={{ color: theme.palette.secondary.main, fontSize: 24 }} />
                          <Typography
                            variant="h6"
                            sx={{
                              fontFamily: "Crimson Text, serif",
                              fontSize: "1.1rem",
                              fontWeight: 500,
                            }}
                          >
                            {location.name}
                          </Typography>
                        </Box>
                        <Typography
                          variant="body2"
                          sx={{
                            fontFamily: "Crimson Text, serif",
                            fontSize: "0.9rem",
                            color: theme.palette.text.secondary,
                          }}
                        >
                          {location.distance} distance
                        </Typography>
                      </Box>
                    </Paper>
                  );
                  })}
                </Box>
              )}
            </Box>
          </Box>
        )}
      </DialogContent>

      <DialogActions
        sx={{
          px: 3,
          py: 2,
          borderTop: `2px solid ${alpha(theme.palette.secondary.main, 0.3)}`,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            fontFamily: "Crimson Text, serif",
            fontSize: "1.05rem",
            textTransform: "none",
            px: 3,
            border: `2px solid ${theme.palette.secondary.main}`,
            "&:hover": {
              border: `2px solid ${theme.palette.secondary.dark}`,
              backgroundColor: alpha(theme.palette.secondary.main, 0.1),
            },
          }}
        >
          Close
        </Button>
        <Button
          onClick={handleSetDestination}
          variant="contained"
          disabled={!selectedDestination || isStartingTravel}
          startIcon={isStartingTravel ? <CircularProgress size={16} /> : <DirectionsWalk />}
          sx={{
            fontFamily: "Crimson Text, serif",
            fontSize: "1.05rem",
            textTransform: "none",
            px: 3,
            backgroundColor: theme.palette.primary.main,
            "&:hover": {
              backgroundColor: theme.palette.primary.dark,
            },
            "&.Mui-disabled": {
              backgroundColor: alpha(theme.palette.primary.main, 0.3),
            },
          }}
        >
          {isStartingTravel ? "Starting Travel..." : "Set Destination"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

