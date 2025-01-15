'use client';

import { FC, useCallback } from 'react';
import { confirmPasswordReset } from 'firebase/auth';
import { toast } from 'sonner';

import { SetNewPasswordForm } from '@/components/setNewPasswordForm/SetNewPasswordForm';
import { SetNewPasswordData } from '@/components/setNewPasswordForm/types';
import getFirebaseAuth from '@/containers/auth/services/getFirebaseAuth';
import { SetNewPasswordError } from '@/containers/setNewPassword/types';
import { setNewPasswordTexts } from '@/containers/setNewPassword/texts';

export const SetNewPassword: FC<{ oobCode?: string }> = ({ oobCode }) => {
    const handleSetNewPassword = useCallback(async ({ password, oobCode }: SetNewPasswordData): Promise<boolean> => {
        try {
            await confirmPasswordReset(getFirebaseAuth(), oobCode, password);
            return true;
        } catch (e) {
            const error = e as SetNewPasswordError;

            toast.error(setNewPasswordTexts.setNewPasswordErrors[error.code] || error.code, {
                position: 'top-right'
            });
            return false;
        }
    }, []);

    return <SetNewPasswordForm oobCode={oobCode} setNewPassword={handleSetNewPassword} />;
};
