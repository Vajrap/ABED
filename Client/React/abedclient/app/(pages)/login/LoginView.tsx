"use client";
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
} from "@mui/material";
import { LoginOutlined } from "@mui/icons-material";

export default function LoginView() {
  return (
    <Container
      maxWidth={false}
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Paper
        elevation={12}
        sx={(theme) => ({
          p: 10,
          maxWidth: "55vw",
          width: "100%",
          textAlign: "center",
          background: theme.palette.background.paper,
          backdropFilter: "blur(10px)",
          border: `2px solid ${theme.palette.primary.main}40`,
          borderRadius: 3,
          boxShadow: "0 0 20px rgba(138,43,226,0.3)",
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main}, ${theme.palette.info.main})`,
          },
        })}
      >
        <Box mb={3}>
          <Typography variant="h3" component="h1" color="primary" gutterBottom>
            Welcome to Arcane Realm
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Enter the realm of arcane adventures
          </Typography>
        </Box>

        <Stack spacing={2.5} sx={{ maxWidth: "40%", mx: "auto", mb: 3 }}>
          <TextField label="Character ID" variant="outlined" fullWidth />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
          />

          <Box display="flex" justifyContent="flex-end">
            <Typography
              variant="body2"
              sx={{
                color: "secondary.main",
                cursor: "pointer",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              Forgot Password?
            </Typography>
          </Box>
        </Stack>

        <Stack spacing={2} sx={{ maxWidth: "40%", mx: "auto" }}>
          <Button
            variant="contained"
            size="large"
            fullWidth
            startIcon={<LoginOutlined />}
            sx={{
              py: 1.5,
              fontSize: "1.1rem",
              fontWeight: 600,
              position: "relative",
              overflow: "hidden",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: "-100%",
                width: "100%",
                height: "100%",
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                transition: "left 0.5s",
              },
              "&:hover::before": { left: "100%" },
            }}
          >
            Login
          </Button>

          <Button variant="outlined" size="large" fullWidth>
            Register
          </Button>
        </Stack>

        <Box mt={3}>
          <Typography variant="body2" color="text.secondary">
            New to the realm?{" "}
            <Typography
              component="span"
              variant="body2"
              sx={{
                color: "secondary.main",
                fontWeight: 600,
                cursor: "pointer",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              Create an account
            </Typography>
          </Typography>
        </Box>

        {/* Mock Forgot Password Modal */}
        <Dialog open={false}>
          <DialogTitle>Forgot Password</DialogTitle>
          <DialogContent>
            <Typography>
              Enter your email address to reset your password.
            </Typography>
            <TextField
              label="Email"
              fullWidth
              variant="outlined"
              sx={{ mt: 2 }}
            />
          </DialogContent>
          <DialogActions>
            <Button variant="outlined">Cancel</Button>
            <Button
              variant="contained"
              startIcon={<CircularProgress size={16} />}
            >
              Send Link
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Container>
  );
}
