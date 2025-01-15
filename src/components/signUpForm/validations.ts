import { z } from 'zod';

import { signUpFormTexts } from '@/components/signUpForm/texts';

export const signUpSchema = z
    .object({
        email: z.string().email(signUpFormTexts.inputs.email.error),
        password: z
            .string()
            .min(8, signUpFormTexts.inputs.password.errors.minLength)
            .max(4096, signUpFormTexts.inputs.password.errors.maxLength)
            .regex(/[A-Z]/, signUpFormTexts.inputs.password.errors.uppercase)
            .regex(/[a-z]/, signUpFormTexts.inputs.password.errors.lowercase)
            .regex(/\d/, signUpFormTexts.inputs.password.errors.numeric)
            .regex(/[@$!%*?&#^+=]/, signUpFormTexts.inputs.password.errors.special),
        repeatPassword: z.string()
    })
    .refine((data) => data.password === data.repeatPassword, {
        message: signUpFormTexts.inputs.repeatPassword.error,
        path: ['repeatPassword']
    });
