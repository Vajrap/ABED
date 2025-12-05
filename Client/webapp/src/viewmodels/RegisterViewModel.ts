// RegisterViewModel.ts - ViewModel for the register page
import { L10N } from "@/localization";
import type { LocalizedText } from "@/types/localization";
import { authService } from "@/services/authService";
import { validateForm, type FormData } from "@/services/validation";
import { getL10NByKey } from "@/utils/localizationHelper";

export interface RegisterFormData {
  username: string; // Character ID
  email: string;
  password: string;
  confirmPassword: string;
  eulaAccepted: boolean;
}

export interface RegisterState {
  isLoading: boolean;
  error: string | LocalizedText | null;
  success: boolean;
  successMessage: string | LocalizedText | null;
  formData: RegisterFormData;
  fieldErrors: Record<string, string[]>;
}

export class RegisterViewModel {
  private state: RegisterState = {
    isLoading: false,
    error: null,
    success: false,
    successMessage: null,
    formData: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      eulaAccepted: false,
    },
    fieldErrors: {},
  };

  private listeners: Array<() => void> = [];

  constructor() {
    // Initialize state
  }

  // Subscribe to state changes
  subscribe(listener: () => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notifyListeners() {
    this.listeners.forEach((listener) => listener());
  }

  // Get current state
  getState(): RegisterState {
    return { ...this.state };
  }

  // Update form field
  updateField(field: keyof RegisterFormData, value: string | boolean): void {
    if (field === "eulaAccepted" && typeof value === "boolean") {
      this.state.formData.eulaAccepted = value;
    } else if (typeof value === "string") {
      (this.state.formData as any)[field] = value;
    }

    // Clear field error when user starts typing/changing
    if (this.state.fieldErrors[field]) {
      const newFieldErrors = { ...this.state.fieldErrors };
      delete newFieldErrors[field];
      this.state.fieldErrors = newFieldErrors;
    }

    // Clear general error when user starts typing
    if (this.state.error) {
      this.state.error = null;
    }

    // Clear success state when user modifies form
    if (this.state.success) {
      this.state.success = false;
      this.state.successMessage = null;
    }

    this.notifyListeners();
  }

  // Validate form data
  private validateForm(): boolean {
    const formData: FormData = {
      username: this.state.formData.username, // Character ID
      email:
        this.state.formData.email.trim() === ""
          ? undefined
          : this.state.formData.email,
      password: this.state.formData.password,
      confirmPassword: this.state.formData.confirmPassword,
      characterId: this.state.formData.username, // Same as username for registration
      eulaAccepted: this.state.formData.eulaAccepted,
    };

    const validation = validateForm(formData, true); // true = registration

    this.state.fieldErrors = validation.fieldErrors;

    if (validation.generalErrors.length > 0) {
      this.state.error = validation.generalErrors[0];
    }

    return validation.isValid;
  }

  // Clear all errors
  clearErrors(): void {
    this.state.error = null;
    this.state.fieldErrors = {};
    this.notifyListeners();
  }

  // Set loading state
  private setLoading(isLoading: boolean): void {
    this.state.isLoading = isLoading;
    this.notifyListeners();
  }

  // Set error message
  private setError(error: string | LocalizedText): void {
    this.state.error = error;
    this.state.isLoading = false;
    this.notifyListeners();
  }

  // Set success state
  private setSuccess(message: string): void {
    this.state.success = true;
    this.state.successMessage = message;
    this.state.isLoading = false;
    this.state.error = null;
    this.notifyListeners();
  }

  // Handle registration
  async register(): Promise<boolean> {
    // Clear previous states
    this.clearErrors();
    this.state.success = false;
    this.state.successMessage = null;

    // Validate form
    if (!this.validateForm()) {
      this.notifyListeners();
      return false;
    }

    console.log("Registering user:", this.state.formData);

    this.setLoading(true);

    try {
      // Prepare registration data
      const registerData = {
        username: this.state.formData.username,
        email: this.state.formData.email.trim() || undefined, // Email is optional
        password: this.state.formData.password,
        lastNewsReceived: "news_000", // Default starting news
      };

      const response = await authService.register(registerData);

      if (response.success) {
        // Registration successful
        this.setSuccess("Account created successfully! Please log in.");
        return true;
      } else {
        // Registration failed - handle specific error messages
        console.log("Registration failed:", response);
        let errorKey = response.messageKey
        // Parse error key like "registerPage.usernameTaken" and get the localized message
        const errorMessage = errorKey 
          ? (getL10NByKey(errorKey) || L10N.registerPage.registrationError)
          : L10N.registerPage.registrationError;

          console.log("Error message:", errorMessage);

        this.setError(errorMessage);
        return false;
      }
    } catch (error) {
      console.error("Registration error:", error);
      this.setError(
        error instanceof Error
          ? error.message
          : "Network error. Please check your connection.",
      );
      return false;
    }
  }

  // Reset form
  reset(): void {
    this.state = {
      isLoading: false,
      error: null,
      success: false,
      successMessage: null,
      formData: {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        eulaAccepted: false,
      },
      fieldErrors: {},
    };
    this.notifyListeners();
  }

  // Check if form is valid and can be submitted
  isFormValid(): boolean {
    const { username, password, confirmPassword, eulaAccepted } =
      this.state.formData;

    return (
      username.trim().length >= 3 &&
      password.trim().length >= 8 &&
      confirmPassword.trim().length > 0 &&
      password === confirmPassword &&
      eulaAccepted &&
      Object.keys(this.state.fieldErrors).length === 0
    );
  }

  // Get field error for specific field
  getFieldError(field: keyof RegisterFormData): string | null {
    const errors = this.state.fieldErrors[field];
    return errors && errors.length > 0 ? errors[0] : null;
  }

  // Check if passwords match (for real-time feedback)
  doPasswordsMatch(): boolean {
    const { password, confirmPassword } = this.state.formData;
    if (confirmPassword.length === 0) return true; // Don't show error until user types
    return password === confirmPassword;
  }

  // Get password strength for UI feedback
  getPasswordStrength(): { score: number; label: string; color: string } {
    const password = this.state.formData.password;
    let score = 0;

    // Length check
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;

    // Character variety checks
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) score++;

    // Adjust score to 0-4 scale
    score = Math.min(4, Math.max(0, score - 1));

    const strengthMap = [
      { label: "Very Weak", color: "#f44336" },
      { label: "Weak", color: "#ff9800" },
      { label: "Fair", color: "#ffeb3b" },
      { label: "Good", color: "#8bc34a" },
      { label: "Strong", color: "#4caf50" },
    ];

    return {
      score,
      label: strengthMap[score].label,
      color: strengthMap[score].color,
    };
  }

  // Check API connectivity
  async checkApiConnectivity(): Promise<boolean> {
    try {
      return await authService.healthCheck();
    } catch {
      return false;
    }
  }

  // Cleanup
  destroy(): void {
    this.listeners = [];
  }
}

// Export singleton instance for the register page
export const registerViewModel = new RegisterViewModel();
