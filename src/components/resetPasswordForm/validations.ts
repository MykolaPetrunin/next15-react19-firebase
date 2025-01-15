import { z } from 'zod';

import { resetPasswordFormTexts } from '@/components/resetPasswordForm/texts';

export const resetPasswordSchema = z.object({
    email: z.string().email(resetPasswordFormTexts.input.error)
});
