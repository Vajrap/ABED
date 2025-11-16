// RegisterView.tsx - Register page view component
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
  Checkbox,
  FormControlLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  LinearProgress,
  Chip,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  PersonAdd,
  ArrowBack,
  Visibility,
  VisibilityOff,
  CheckCircle,
  Security,
} from "@mui/icons-material";
import { registerViewModel } from "@/viewmodels/RegisterViewModel";
import { useLocalization, L10N } from "@/localization";
import { AlertBox } from "@/components/Alert";

const RegisterContainer = styled(Container)(({ theme }) => ({
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(2),
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
}));

const RegisterPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  maxWidth: 600,
  width: "100%",
  textAlign: "center",
  background:
    "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)",
  backdropFilter: "blur(10px)",
  border: `2px solid ${theme.palette.secondary.main}40`,
  borderRadius: 20,
  boxShadow: `var(--shadow-electric)`,
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    background: `linear-gradient(90deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main}, ${theme.palette.info.main})`,
  },
}));

const TitleBox = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  "& .title-icon": {
    fontSize: 48,
    color: theme.palette.secondary.main,
    marginBottom: theme.spacing(1),
    filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))",
  },
}));

const FormBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2.5),
  marginBottom: theme.spacing(3),
  textAlign: "left",
}));

const EulaBox = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: 8,
  maxHeight: 200,
  overflow: "auto",
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  marginBottom: theme.spacing(2),
  "& p": {
    margin: theme.spacing(1, 0),
    lineHeight: 1.6,
  },
}));

const PasswordStrengthBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  marginTop: theme.spacing(0.5),
}));

const StrengthBar = styled(LinearProgress)(({ theme }) => ({
  flexGrow: 1,
  height: 6,
  borderRadius: 3,
  backgroundColor: theme.palette.grey[200],
}));

const ButtonGroup = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
}));

const BackButton = styled(Button)(({ theme }) => ({
  borderColor: theme.palette.text.secondary,
  color: theme.palette.text.secondary,
  "&:hover": {
    borderColor: theme.palette.primary.main,
    backgroundColor: `${theme.palette.primary.main}10`,
  },
}));

export const RegisterView: React.FC = () => {
  const navigate = useNavigate();
  const [viewState, setViewState] = useState(registerViewModel.getState());
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showEulaDialog, setShowEulaDialog] = useState(false);
  const { t } = useLocalization();

  useEffect(() => {
    // Subscribe to view model state changes
    const unsubscribe = registerViewModel.subscribe(() => {
      setViewState(registerViewModel.getState());
    });

    // Cleanup subscription on unmount
    return unsubscribe;
  }, []);

  const handleFieldChange =
    (field: keyof typeof viewState.formData) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (field === "eulaAccepted") {
        registerViewModel.updateField(field, event.target.checked);
      } else {
        registerViewModel.updateField(field, event.target.value);
      }
    };

  const handleRegister = async () => {
    const success = await registerViewModel.register();
    if (success) {
      // Show success message and redirect to login after a delay
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  };

  const handleBackToLogin = () => {
    navigate("/login");
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (
      event.key === "Enter" &&
      registerViewModel.isFormValid() &&
      !viewState.isLoading
    ) {
      handleRegister();
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const openEulaDialog = () => {
    setShowEulaDialog(true);
  };

  const closeEulaDialog = () => {
    setShowEulaDialog(false);
  };

  const passwordStrength = registerViewModel.getPasswordStrength();
  const passwordsMatch = registerViewModel.doPasswordsMatch();

  const getStrengthColor = (score: number) => {
    const colors = ["#f44336", "#ff9800", "#ffeb3b", "#8bc34a", "#4caf50"];
    return colors[score] || colors[0];
  };

  return (
    <>
      <RegisterContainer maxWidth={false} className="page-enter">
        <RegisterPaper elevation={12}>
          <TitleBox>
            <PersonAdd className="title-icon" />
            <Typography
              variant="h3"
              component="h1"
              color="secondary"
              gutterBottom
            >
              {t(L10N.registerPage.title)}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Join the mystical realm of ABED
            </Typography>
          </TitleBox>

          {viewState.success ? (
            <Box textAlign="center" py={4}>
              <CheckCircle
                sx={{ fontSize: 64, color: "success.main", mb: 2 }}
              />
              <Typography variant="h5" color="success.main" gutterBottom>
                {t(L10N.registerPage.registrationSuccess)}
              </Typography>
              <Typography variant="body1" color="text.secondary" mb={3}>
                Redirecting to login page...
              </Typography>
              <LinearProgress color="success" />
            </Box>
          ) : (
            <>
              <FormBox>
                {/* EULA Section */}
                <Box>
                  <Typography variant="h6" color="text.primary" gutterBottom>
                    {t(L10N.registerPage.eulaTitle)}
                  </Typography>
                  <EulaBox>
                    <Typography variant="body2" color="text.secondary">
                      {t(L10N.registerPage.eulaContent)
                        .split("\n")
                        .slice(0, 10)
                        .join("\n")}
                      ...
                    </Typography>
                  </EulaBox>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    mb={2}
                  >
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={viewState.formData.eulaAccepted}
                          onChange={handleFieldChange("eulaAccepted")}
                          disabled={viewState.isLoading}
                          color="secondary"
                        />
                      }
                      label={
                        <Typography variant="body2">
                          {t(L10N.registerPage.agreeToEula)}
                        </Typography>
                      }
                    />
                    <Button
                      size="small"
                      onClick={openEulaDialog}
                      disabled={viewState.isLoading}
                      sx={{ color: "info.main" }}
                    >
                      Read Full EULA
                    </Button>
                  </Box>
                </Box>

                {/* Username/Character ID */}
                <TextField
                  fullWidth
                  label={t(L10N.registerPage.usernameLabel)}
                  variant="outlined"
                  value={viewState.formData.username}
                  onChange={handleFieldChange("username")}
                  onKeyPress={handleKeyPress}
                  error={!!registerViewModel.getFieldError("username")}
                  helperText={
                    registerViewModel.getFieldError("username") ||
                    "This will be your character name"
                  }
                  disabled={viewState.isLoading}
                  InputProps={{
                    autoComplete: "username",
                  }}
                />

                {/* Password */}
                <Box>
                  <TextField
                    fullWidth
                    label={t(L10N.registerPage.passwordLabel)}
                    type={showPassword ? "text" : "password"}
                    variant="outlined"
                    value={viewState.formData.password}
                    onChange={handleFieldChange("password")}
                    onKeyPress={handleKeyPress}
                    error={!!registerViewModel.getFieldError("password")}
                    helperText={
                      registerViewModel.getFieldError("password") || " "
                    }
                    disabled={viewState.isLoading}
                    InputProps={{
                      autoComplete: "new-password",
                      endAdornment: (
                        <Button
                          size="small"
                          onClick={togglePasswordVisibility}
                          disabled={viewState.isLoading}
                          sx={{ minWidth: "auto", p: 1 }}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </Button>
                      ),
                    }}
                  />
                  {viewState.formData.password && (
                    <PasswordStrengthBox>
                      <StrengthBar
                        variant="determinate"
                        value={(passwordStrength.score / 4) * 100}
                        sx={{
                          "& .MuiLinearProgress-bar": {
                            backgroundColor: getStrengthColor(
                              passwordStrength.score,
                            ),
                          },
                        }}
                      />
                      <Chip
                        size="small"
                        label={passwordStrength.label}
                        sx={{
                          backgroundColor: getStrengthColor(
                            passwordStrength.score,
                          ),
                          color: "white",
                          fontSize: "0.75rem",
                        }}
                      />
                    </PasswordStrengthBox>
                  )}
                </Box>

                {/* Confirm Password */}
                <TextField
                  fullWidth
                  label={t(L10N.registerPage.confirmPasswordLabel)}
                  type={showConfirmPassword ? "text" : "password"}
                  variant="outlined"
                  value={viewState.formData.confirmPassword}
                  onChange={handleFieldChange("confirmPassword")}
                  onKeyPress={handleKeyPress}
                  error={Boolean(
                    registerViewModel.getFieldError("confirmPassword") ||
                      (viewState.formData.confirmPassword && !passwordsMatch),
                  )}
                  helperText={
                    registerViewModel.getFieldError("confirmPassword") ||
                    (viewState.formData.confirmPassword && !passwordsMatch
                      ? t(L10N.registerPage.passwordMismatch)
                      : " ")
                  }
                  disabled={viewState.isLoading}
                  InputProps={{
                    autoComplete: "new-password",
                    endAdornment: (
                      <Button
                        size="small"
                        onClick={toggleConfirmPasswordVisibility}
                        disabled={viewState.isLoading}
                        sx={{ minWidth: "auto", p: 1 }}
                      >
                        {showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </Button>
                    ),
                  }}
                />

                {/* Email (Optional) */}
                <TextField
                  fullWidth
                  label={t(L10N.registerPage.emailOptional)}
                  type="email"
                  variant="outlined"
                  value={viewState.formData.email}
                  onChange={handleFieldChange("email")}
                  onKeyPress={handleKeyPress}
                  error={!!registerViewModel.getFieldError("email")}
                  helperText={
                    registerViewModel.getFieldError("email") ||
                    "Optional - for account recovery"
                  }
                  disabled={viewState.isLoading}
                  InputProps={{
                    autoComplete: "email",
                  }}
                />

                {/* Password Requirements */}
                <Box
                  p={2}
                  bgcolor="info.main"
                  color="info.contrastText"
                  borderRadius={1}
                  sx={{ opacity: 0.9 }}
                >
                  <Box display="flex" alignItems="center" mb={1}>
                    <Security sx={{ mr: 1, fontSize: "1.2rem" }} />
                    <Typography variant="body2" fontWeight="bold">
                      Password Requirements:
                    </Typography>
                  </Box>
                  <Typography variant="caption" display="block">
                    {t(L10N.registerPage.passwordRequirements)}
                  </Typography>
                </Box>
              </FormBox>

              <ButtonGroup>
                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  onClick={handleRegister}
                  disabled={
                    !registerViewModel.isFormValid() || viewState.isLoading
                  }
                  startIcon={
                    viewState.isLoading ? (
                      <CircularProgress size={20} color="inherit" />
                    ) : (
                      <PersonAdd />
                    )
                  }
                  sx={{
                    py: 1.5,
                    fontSize: "1.1rem",
                    fontWeight: 600,
                    background:
                      "linear-gradient(135deg, var(--color-mystical-violet), var(--color-spark-blue))",
                    "&:hover": {
                      background:
                        "linear-gradient(135deg, var(--color-mystical-violet), var(--color-spark-blue))",
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  {viewState.isLoading
                    ? "Creating Account..."
                    : t(L10N.registerPage.registerButton)}
                </Button>

                <BackButton
                  variant="outlined"
                  size="large"
                  fullWidth
                  onClick={handleBackToLogin}
                  disabled={viewState.isLoading}
                  startIcon={<ArrowBack />}
                  sx={{
                    py: 1.5,
                    fontSize: "1.1rem",
                    fontWeight: 600,
                  }}
                >
                  {t(L10N.registerPage.backToLogin)}
                </BackButton>
              </ButtonGroup>
            </>
          )}
        </RegisterPaper>
      </RegisterContainer>

      {/* EULA Dialog */}
      <Dialog
        open={showEulaDialog}
        onClose={closeEulaDialog}
        maxWidth="md"
        fullWidth
        scroll="paper"
        PaperProps={{
          sx: {
            maxHeight: "80vh",
            border: `2px solid var(--color-mystical-violet)40`,
          },
        }}
      >
        <DialogTitle
          sx={{
            textAlign: "center",
            background: `linear-gradient(135deg, var(--color-mystical-violet)20, var(--color-spark-blue)20)`,
            borderBottom: "1px solid",
            borderColor: "divider",
          }}
        >
          <Typography variant="h5" component="div" color="secondary">
            {t(L10N.registerPage.eulaTitle)}
          </Typography>
        </DialogTitle>

        <DialogContent sx={{ p: 3 }}>
          <Typography
            variant="body1"
            component="div"
            sx={{
              whiteSpace: "pre-line",
              lineHeight: 1.7,
              fontFamily: "Crimson Text, serif",
            }}
          >
            {t(L10N.registerPage.eulaContent)}
          </Typography>
        </DialogContent>

        <DialogActions sx={{ p: 3, pt: 1 }}>
          <Button
            onClick={closeEulaDialog}
            variant="contained"
            color="secondary"
            sx={{ minWidth: 100 }}
          >
            {t(L10N.common.close)}
          </Button>
        </DialogActions>
      </Dialog>

      {/* AlertBox for errors */}
      <AlertBox
        open={!!viewState.error}
        onClose={() => setViewState({ ...viewState, error: null })}
        title={t(L10N.common.error)}
        message={
          typeof viewState.error === "string"
            ? viewState.error
            : t(viewState.error || L10N.registerPage.registrationError)
        }
        severity="error"
      />
    </>
  );
};
