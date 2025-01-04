import {z} from "zod";

export const signUpSchema = z
    .object({
        email: z.string().email("Invalid email format"),
        password: z
            .string()
            .min(8, "Password must be at least 8 characters long")
            .max(4096, "Password must be no more than 4096 characters long")
            .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
            .regex(/[a-z]/, "Password must contain at least one lowercase letter")
            .regex(/\d/, "Password must contain at least one numeric character")
            .regex(/[@$!%*?&#^+=]/, "Password must contain at least one special character"),
        repeatPassword: z.string(),
    })
    .refine(
        (data) => data.password === data.repeatPassword,
        {
            message: "Passwords must match",
            path: ["repeatPassword"],
        }
    );