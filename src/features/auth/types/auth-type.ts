import { z } from "zod";

export const signupValidation = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z.string().min(8, "Password must be at least 2 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignupInputType = z.infer<typeof signupValidation>;
