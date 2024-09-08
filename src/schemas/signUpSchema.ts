import {z} from "zod";

export const usernameValidation = z
  .string()
  .min(2, "Username must be at least 2 characters")
  .max(20, "Username must be no more than 20 characters")
  .regex(/^[a-zA-Z0-9_]+$/, "Username must not contain special characters");

const passwordSchema = z
  .string()
  .min(8, {message: "Password must be at least 8 characters long."})
  .max(20, {message: "Password must be at most 20 characters long."})
  .regex(/[A-Z]/, {
    message: "Password must contain at least one uppercase letter.",
  })
  .regex(/[a-z]/, {
    message: "Password must contain at least one lowercase letter.",
  })
  .regex(/[0-9]/, {message: "Password must contain at least one number."})
  .regex(/[\W_]/, {
    message: "Password must contain at least one special character.",
  });

export const signUpSchema = z.object({
  username: usernameValidation,
  email: z.string().email({message: "Please enter a valid email address"}),
  password: passwordSchema,
});
