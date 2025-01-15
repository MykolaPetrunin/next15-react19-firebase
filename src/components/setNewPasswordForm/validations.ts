import { z } from 'zod';

import { setNewPasswordFormTexts } from '@/components/setNewPasswordForm/texts';

export const setNewPasswordSchema = z
    .object({
        password: z
            .string()
            .min(8, setNewPasswordFormTexts.inputs.password.errors.minLength)
            .max(4096, setNewPasswordFormTexts.inputs.password.errors.maxLength)
            .regex(/[A-Z]/, setNewPasswordFormTexts.inputs.password.errors.uppercase)
            .regex(/[a-z]/, setNewPasswordFormTexts.inputs.password.errors.lowercase)
            .regex(/\d/, setNewPasswordFormTexts.inputs.password.errors.numeric)
            .regex(/[@$!%*?&#^+=]/, setNewPasswordFormTexts.inputs.password.errors.special),
        repeatPassword: z.string()
    })
    .refine((data) => data.password === data.repeatPassword, {
        message: setNewPasswordFormTexts.inputs.repeatPassword.error,
        path: ['repeatPassword']
    });
