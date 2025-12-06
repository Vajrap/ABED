"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { LoginOutlined } from "@mui/icons-material";
import { useLoginLogic } from "./useLoginLogic";
import { useLocalization, L10N } from "@/localization";
import { AlertBox } from "@/components/Alert";

const LoginContainer = styled(Container)(({ theme }) => ({
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(2),
}));

const LoginPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(10),
  maxWidth: "55vw",
  width: "100%",
  textAlign: "center",
  background: theme.palette.background.default,
  backdropFilter: "blur(10px)",
  border: `2px solid ${theme.palette.primary.main}40`,
  borderRadius: 20,
  boxShadow: `var(--shadow-arcane)`,
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
}));

const TitleBox = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  "& .title-icon": {
    fontSize: 48,
    color: theme.palette.background.default,
    marginBottom: theme.spacing(1),
    filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))",
  },
}));

const FormBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2.5),
  maxWidth: "40%",
  margin: "0 auto",
  marginBottom: theme.spacing(3),
}));

const ButtonGroup = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  maxWidth: "40%",
  margin: "0 auto",
}));

export default function LoginView() {
  const router = useRouter();
  const loginLogic = useLoginLogic();
  const { t } = useLocalization();
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [isSubmittingReset, setIsSubmittingReset] = useState(false);
  const [resetMessage, setResetMessage] = useState("");

  const handleFieldChange =
    (field: "characterId" | "password") =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      loginLogic.updateField(field, event.target.value);
    };

  const handleLogin = async () => {
    const result = await loginLogic.login();

    if (result.success) {
      // Navigate based on whether user has a character
      if (result.hasCharacter) {
        router.push("/game");
      } else {
        router.push("/character-creation");
      }
    }
  };

  const handleRegisterClick = () => {
    router.push("/register");
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (
      event.key === "Enter" &&
      loginLogic.isFormValid() &&
      !loginLogic.isLoading
    ) {
      handleLogin();
    }
  };

  const handleForgotPasswordClick = () => {
    setForgotPasswordOpen(true);
    setResetEmail("");
    setResetMessage("");
  };

  const handleCloseForgotPassword = () => {
    setForgotPasswordOpen(false);
    setResetEmail("");
    setResetMessage("");
  };

  const handleResetPassword = async () => {
    if (!resetEmail.trim()) return;

    setIsSubmittingReset(true);
    setResetMessage("");

    // Simulate API call - replace with actual implementation later
    setTimeout(() => {
      setIsSubmittingReset(false);
      setResetMessage(t(L10N.loginPage.forgotPasswordModal.successMessage));
      // Close modal after 2 seconds
      setTimeout(() => {
        setForgotPasswordOpen(false);
        setResetEmail("");
        setResetMessage("");
      }, 2000);
    }, 1000);
  };

  return (
    <LoginContainer maxWidth={false} className="page-enter">
      <LoginPaper elevation={12}>
        <TitleBox>
          <Typography variant="h3" component="h1" color="primary" gutterBottom>
            {t(L10N.loginPage.title)}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Enter the realm of arcane adventures
          </Typography>
        </TitleBox>

        <FormBox>
          <TextField
            fullWidth
            label={t(L10N.loginPage.usernameLabel)}
            variant="outlined"
            value={loginLogic.formData.characterId}
            onChange={handleFieldChange("characterId")}
            onKeyPress={handleKeyPress}
            error={!!loginLogic.getFieldError("characterId")}
            helperText={loginLogic.getFieldError("characterId") || " "}
            disabled={loginLogic.isLoading}
            InputProps={{
              autoComplete: "username",
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                fontSize: "1.1rem",
              },
            }}
          />

          <TextField
            fullWidth
            label={t(L10N.loginPage.passwordLabel)}
            type="password"
            variant="outlined"
            value={loginLogic.formData.password}
            onChange={handleFieldChange("password")}
            onKeyPress={handleKeyPress}
            error={!!loginLogic.getFieldError("password")}
            helperText={loginLogic.getFieldError("password") || " "}
            disabled={loginLogic.isLoading}
            InputProps={{
              autoComplete: "current-password",
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                fontSize: "1.1rem",
              },
            }}
          />

          <Box
            display="flex"
            justifyContent="flex-end"
            mt={1}
            sx={{ maxWidth: "40%", margin: "0 auto" }}
          >
            <Typography
              variant="body2"
              onClick={handleForgotPasswordClick}
              sx={{
                background: "none",
                border: "none",
                color: "secondary.main",
                textDecoration: "none",
                cursor: "pointer",
                fontSize: "0.875rem",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              {t(L10N.loginPage.forgotPassword)}
            </Typography>
          </Box>
        </FormBox>

        <ButtonGroup>
          <Button
            variant="contained"
            size="large"
            fullWidth
            onClick={handleLogin}
            disabled={!loginLogic.isFormValid() || loginLogic.isLoading}
            startIcon={
              loginLogic.isLoading ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                <LoginOutlined />
              )
            }
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
              "&:hover::before": {
                left: "100%",
              },
            }}
          >
            {loginLogic.isLoading
              ? "Authenticating..."
              : t(L10N.loginPage.loginButton)}
          </Button>
        </ButtonGroup>

        <Box
          mt={3}
          sx={{ maxWidth: "40%", margin: "0 auto", paddingTop: "20px" }}
        >
          <Typography variant="body2" color="text.secondary">
            {t(L10N.loginPage.newToRealm)}{" "}
            <Typography
              component="span"
              variant="body2"
              onClick={handleRegisterClick}
              sx={{
                background: "none",
                border: "none",
                color: "secondary.main",
                textDecoration: "none",
                fontWeight: 600,
                cursor: "pointer",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              {t(L10N.loginPage.createAccount)}
            </Typography>
          </Typography>
        </Box>
      </LoginPaper>

      {/* Forgot Password Modal */}
      <Dialog
        open={forgotPasswordOpen}
        onClose={handleCloseForgotPassword}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            border: "2px solid",
            borderColor: "primary.main",
          },
        }}
      >
        <DialogTitle sx={{ textAlign: "center", pb: 1 }}>
          <Typography variant="h5" component="h2" color="primary">
            {t(L10N.loginPage.forgotPasswordModal.title)}
          </Typography>
        </DialogTitle>

        <DialogContent sx={{ py: 3 }}>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 3, textAlign: "center" }}
          >
            Enter your email address and we'll send you a link to reset your
            password.
          </Typography>

          <TextField
            fullWidth
            label={t(L10N.loginPage.forgotPasswordModal.emailLabel)}
            type="email"
            variant="outlined"
            value={resetEmail}
            onChange={(e) => setResetEmail(e.target.value)}
            disabled={isSubmittingReset}
            sx={{
              "& .MuiOutlinedInput-root": {
                fontSize: "1.1rem",
              },
            }}
          />
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
          <Button
            onClick={handleCloseForgotPassword}
            disabled={isSubmittingReset}
            variant="outlined"
            sx={{ minWidth: 100 }}
          >
            {t(L10N.loginPage.forgotPasswordModal.cancelButton)}
          </Button>

          <Button
            onClick={handleResetPassword}
            disabled={!resetEmail.trim() || isSubmittingReset}
            variant="contained"
            startIcon={
              isSubmittingReset ? (
                <CircularProgress size={16} color="inherit" />
              ) : null
            }
            sx={{ minWidth: 140 }}
          >
            {isSubmittingReset
              ? "Sending..."
              : t(L10N.loginPage.forgotPasswordModal.submitButton)}
          </Button>
        </DialogActions>
      </Dialog>

      {/* AlertBox for errors */}
      <AlertBox
        open={!!loginLogic.error}
        onClose={loginLogic.clearErrors}
        title={t(L10N.common.error)}
        message={
          typeof loginLogic.error === "string"
            ? loginLogic.error
            : t(loginLogic.error || L10N.loginPage.loginError)
        }
        severity="error"
      />

      {/* AlertBox for password reset success */}
      <AlertBox
        open={!!resetMessage}
        onClose={() => setResetMessage("")}
        title={t(L10N.common.success)}
        message={resetMessage}
        severity="success"
      />
    </LoginContainer>
  );
}
