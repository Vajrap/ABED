import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Typography,
  alpha,
  useTheme,
  IconButton,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { NewsItem } from "./NewsItem";
import { MockNews } from "@/data/mockNewsData";

export interface NewsModalProps {
  open: boolean;
  onClose: () => void;
  news: MockNews[];
}

/**
 * News modal - Shows all news with filtering capabilities (filter UI coming later)
 */
export const NewsModal: React.FC<NewsModalProps> = ({ open, onClose, news }) => {
  const theme = useTheme();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          fontFamily: "Crimson Text, serif",
          backgroundColor: theme.palette.background.paper,
          border: `3px solid ${theme.palette.secondary.main}`,
          boxShadow: `
            0 0 30px ${alpha(theme.palette.secondary.main, 0.3)},
            0 8px 32px ${alpha("#000", 0.15)}
          `,
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column",
        },
      }}
      BackdropProps={{
        sx: {
          backgroundColor: alpha("#1A1A2E", 0.7),
          backdropFilter: "blur(8px)",
        },
      }}
    >
      <DialogTitle
        sx={{
          fontFamily: "Cinzel, serif",
          fontSize: "1.75rem",
          fontWeight: 700,
          color: theme.palette.secondary.main,
          textAlign: "center",
          pb: 2,
          borderBottom: `2px solid ${alpha(theme.palette.secondary.main, 0.3)}`,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pr: 1,
        }}
      >
        <Box sx={{ flex: 1 }} />
        <Typography sx={{ flex: 1, textAlign: "center" }}>News</Typography>
        <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
          <IconButton
            onClick={onClose}
            size="small"
            sx={{
              color: theme.palette.text.secondary,
              "&:hover": {
                backgroundColor: alpha(theme.palette.secondary.main, 0.1),
              },
            }}
          >
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent
        sx={{
          flex: 1,
          overflowY: "auto",
          padding: 3,
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: alpha(theme.palette.background.default, 0.5),
            borderRadius: 1,
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: alpha(theme.palette.secondary.main, 0.5),
            borderRadius: 1,
            "&:hover": {
              backgroundColor: alpha(theme.palette.secondary.main, 0.7),
            },
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          {/* Filter placeholder - will be implemented later */}
          <Box
            sx={{
              mb: 2,
              padding: 2,
              backgroundColor: alpha(theme.palette.background.default, 0.3),
              borderRadius: 1,
              border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
            }}
          >
            <Typography
              sx={{
                fontFamily: "Crimson Text, serif",
                fontSize: "0.9rem",
                color: theme.palette.text.secondary,
                fontStyle: "italic",
              }}
            >
              Filters: News Type, Date/Time - Coming soon
            </Typography>
          </Box>

          {/* News List */}
          {news.map((newsItem) => (
            <Box
              key={newsItem.id}
              sx={{
                borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                "&:last-child": {
                  borderBottom: "none",
                },
              }}
            >
              <NewsItem news={newsItem} />
            </Box>
          ))}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

