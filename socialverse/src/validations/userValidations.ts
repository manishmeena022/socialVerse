import { z } from "zod";

export const userZodSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long." })
    .max(20, { message: "Username cannot exceed 20 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." })
    .max(128, { message: "Password cannot exceed 128 characters." })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter.",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter.",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number." })
    .regex(/[!@#$%^&*(),.?":{}|<>]/, {
      message: "Password must contain at least one special character.",
    }),
  bio: z
    .string()
    .max(160, { message: "Bio cannot exceed 160 characters." })
    .optional(),
  profilePicture: z
    .string()
    .url({ message: "Invalid URL for profile picture." })
    .optional(),
  dateOfBirth: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: "Date of birth must be in the format YYYY-MM-DD.",
    })
    .refine(
      (date) => {
        const now = new Date();
        const dob = new Date(date);
        const age = now.getFullYear() - dob.getFullYear();
        const isBirthdayPassed =
          now.getMonth() > dob.getMonth() ||
          (now.getMonth() === dob.getMonth() && now.getDate() >= dob.getDate());
        return isBirthdayPassed ? age >= 13 : age - 1 >= 13;
      },
      { message: "User must be at least 13 years old." }
    ),
  followers: z.array(z.string()).default([]),
  following: z.array(z.string()).default([]),
  posts: z.array(z.string()).default([]),
  isVerified: z.boolean().default(false),
  isActive: z.boolean().default(true),
});
