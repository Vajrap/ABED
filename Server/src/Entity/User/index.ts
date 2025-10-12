// Re-export User types from database schema
export type { User, InsertUser } from "../../Database/Schema/user";

// Re-export UserService for convenience
export { UserService } from "../../Database/Services/userService";

// Export validation schemas if needed
import { z } from "zod";

export const CreateUserSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
  email: z.string().optional(),
  lastNewsReceived: z.string().optional(),
});

export const UpdateUserSchema = z.object({
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .optional(),
  email: z.string().email("Invalid email format").optional(),
  userId: z.string().min(1, "User ID is required").optional(),
  lastNewsReceived: z
    .string()
    .min(1, "Last news received is required")
    .optional(),
  updatedBy: z.string().min(1, "Updated by is required"),
});

export const UserLoginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export type CreateUserInput = z.infer<typeof CreateUserSchema>;
export type UpdateUserInput = z.infer<typeof UpdateUserSchema>;
export type UserLoginInput = z.infer<typeof UserLoginSchema>;
