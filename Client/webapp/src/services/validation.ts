// Password validation utilities for ABED webapp

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export interface PasswordRequirements {
  minLength: number;
  requireUppercase: boolean;
  requireLowercase: boolean;
  requireNumbers: boolean;
  requireSpecialChars: boolean;
}

// Default password requirements
const DEFAULT_PASSWORD_REQUIREMENTS: PasswordRequirements = {
  minLength: 8,
  requireUppercase: true,
  requireLowercase: true,
  requireNumbers: true,
  requireSpecialChars: false, // Not required for now, but can be enabled
};

/**
 * Validates password against requirements
 * TODO: Currently requires at least 8 characters with uppercase, lowercase, and numbers
 */
export const validatePassword = (
  password: string,
  requirements: PasswordRequirements = DEFAULT_PASSWORD_REQUIREMENTS,
): ValidationResult => {
  const errors: string[] = [];

  // Check minimum length
  if (password.length < requirements.minLength) {
    errors.push(
      `Password must be at least ${requirements.minLength} characters long`,
    );
  }

  // Check for uppercase letters
  if (requirements.requireUppercase && !/[A-Z]/.test(password)) {
    errors.push("Password must contain at least one uppercase letter");
  }

  // Check for lowercase letters
  if (requirements.requireLowercase && !/[a-z]/.test(password)) {
    errors.push("Password must contain at least one lowercase letter");
  }

  // Check for numbers
  if (requirements.requireNumbers && !/\d/.test(password)) {
    errors.push("Password must contain at least one number");
  }

  // Check for special characters (if required)
  if (
    requirements.requireSpecialChars &&
    !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
  ) {
    errors.push("Password must contain at least one special character");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Check if two passwords match
 */
export const validatePasswordMatch = (
  password: string,
  confirmPassword: string,
): ValidationResult => {
  const isValid = password === confirmPassword;
  return {
    isValid,
    errors: isValid ? [] : ["Passwords do not match"],
  };
};

/**
 * Validate email format
 */
export const validateEmail = (email: string): ValidationResult => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValid = emailRegex.test(email);

  return {
    isValid,
    errors: isValid ? [] : ["Please enter a valid email address"],
  };
};

/**
 * Validate username format
 * Username should be 3-20 characters, alphanumeric only
 */
export const validateUsername = (username: string): ValidationResult => {
  const errors: string[] = [];

  if (username.length < 3) {
    errors.push("Username must be at least 3 characters long");
  }

  if (username.length > 20) {
    errors.push("Username must be no more than 20 characters long");
  }

  if (!/^[a-zA-Z0-9]+$/.test(username)) {
    errors.push("Username can only contain letters and numbers");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Validate character ID format
 * Character ID should be 3-20 characters, alphanumeric and underscores allowed
 */
export const validateCharacterId = (characterId: string): ValidationResult => {
  const errors: string[] = [];

  if (characterId.length < 3) {
    errors.push("Character ID must be at least 3 characters long");
  }

  if (characterId.length > 20) {
    errors.push("Character ID must be no more than 20 characters long");
  }

  if (!/^[a-zA-Z0-9_]+$/.test(characterId)) {
    errors.push(
      "Character ID can only contain letters, numbers, and underscores",
    );
  }

  // Cannot start with underscore
  if (characterId.startsWith("_")) {
    errors.push("Character ID cannot start with an underscore");
  }

  // Cannot end with underscore
  if (characterId.endsWith("_")) {
    errors.push("Character ID cannot end with an underscore");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Check if a field is required and not empty
 */
export const validateRequired = (
  value: string,
  fieldName: string,
): ValidationResult => {
  const isValid = value.trim().length > 0;
  return {
    isValid,
    errors: isValid ? [] : [`${fieldName} is required`],
  };
};

/**
 * Comprehensive form validation
 */
export interface FormData {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  characterId?: string;
  eulaAccepted?: boolean;
}

export interface FormValidationResult {
  isValid: boolean;
  fieldErrors: Record<string, string[]>;
  generalErrors: string[];
}

export const validateForm = (
  data: FormData,
  isRegistration = false,
): FormValidationResult => {
  console.log("Validating form data:", data);
  console.log("Is registration:", isRegistration);
  const fieldErrors: Record<string, string[]> = {};
  const generalErrors: string[] = [];

  // Username validation (for login, we use it as characterId)
  if (data.username !== undefined) {
    console.log("Username:", data.username);
    if (isRegistration) {
      // For registration, username should be a character ID
      const usernameValidation = validateCharacterId(data.username);
      if (!usernameValidation.isValid) {
        fieldErrors.username = usernameValidation.errors;
      }
    } else {
      // For login, username is character ID
      const characterIdValidation = validateCharacterId(data.username);
      if (!characterIdValidation.isValid) {
        fieldErrors.username = characterIdValidation.errors;
      }
    }
  }

  // Email validation (for registration)
  if (data.email !== undefined && data.email.trim() !== "") {
    const emailValidation = validateEmail(data.email);
    if (!emailValidation.isValid) {
      fieldErrors.email = emailValidation.errors;
    }
  }

  // Password validation
  if (data.password !== undefined) {
    const requiredValidation = validateRequired(data.password, "Password");
    if (!requiredValidation.isValid) {
      fieldErrors.password = requiredValidation.errors;
    } else {
      const passwordValidation = validatePassword(data.password);
      if (!passwordValidation.isValid) {
        fieldErrors.password = passwordValidation.errors;
      }
    }
  }

  // Confirm password validation (for registration)
  if (isRegistration && data.confirmPassword !== undefined) {
    const requiredValidation = validateRequired(
      data.confirmPassword,
      "Confirm Password",
    );
    if (!requiredValidation.isValid) {
      fieldErrors.confirmPassword = requiredValidation.errors;
    } else if (data.password) {
      const matchValidation = validatePasswordMatch(
        data.password,
        data.confirmPassword,
      );
      if (!matchValidation.isValid) {
        fieldErrors.confirmPassword = matchValidation.errors;
      }
    }
  }

  // Character ID validation (for registration)
  if (isRegistration && data.characterId !== undefined) {
    const requiredValidation = validateRequired(
      data.characterId,
      "Character ID",
    );
    if (!requiredValidation.isValid) {
      fieldErrors.characterId = requiredValidation.errors;
    } else {
      const characterIdValidation = validateCharacterId(data.characterId);
      if (!characterIdValidation.isValid) {
        fieldErrors.characterId = characterIdValidation.errors;
      }
    }
  }

  // EULA acceptance validation (for registration)
  if (isRegistration && data.eulaAccepted !== undefined) {
    if (!data.eulaAccepted) {
      generalErrors.push("You must agree to the terms and conditions");
    }
  }

  return {
    isValid:
      Object.keys(fieldErrors).length === 0 && generalErrors.length === 0,
    fieldErrors,
    generalErrors,
  };
};

/**
 * Get password strength indicator
 */
export interface PasswordStrength {
  score: number; // 0-4 (0 = very weak, 4 = very strong)
  label: string;
  color: string;
}

export const getPasswordStrength = (password: string): PasswordStrength => {
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
};
