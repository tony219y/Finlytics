import { z } from "zod"

// * Login
export const loginSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters" }),
})
export type LoginSchema = z.infer<typeof loginSchema>;

// * Sign-up
export const signUpSchema = z.object({
    username: z.string().min(3, { message: "Username must be at least 3 characters" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(8, { message: "Password must be at least 6 characters" }),
    confirmPassword: z.string()
}).refine((e) => e.password === e.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
})
export type SignUpSchema = z.infer<typeof signUpSchema>;
