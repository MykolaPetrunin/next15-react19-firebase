'use client';

import { FC, useCallback, useState } from 'react';
import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { toast } from 'sonner';

import { LoginForm } from '@/components/loginForm/LoginForm';
import { AuthState, ResetPasswordError, SignUpError, SinInWithPasswordError, SinInWithPopupError } from '@/containers/auth/types';
import { SignUpForm } from '@/components/signUpForm/SignUpForm';
import { ResetPasswordForm } from '@/components/resetPasswordForm/ResetPasswordForm';
import { SignUpData } from '@/components/signUpForm/types';
import getFirebaseAuth from '@/containers/auth/services/getFirebaseAuth';
import { logIn } from '@/containers/auth/services/logIn';
import { authTexts } from '@/containers/auth/texts';
import { ResetPasswordData } from '@/components/resetPasswordForm/types';
import { SignInData } from '@/components/loginForm/types';

export const Auth: FC = () => {
    const [currentState, setCurrentState] = useState<AuthState>(AuthState.Login);

    const handleSignUp = useCallback(async (data: SignUpData) => {
        try {
            const res = await createUserWithEmailAndPassword(getFirebaseAuth(), data.email, data.password);

            await logIn({
                token: await res.user.getIdToken(true),
                email: res.user.email as string,
                ...(res.user.displayName && { name: res.user.displayName }),
                ...(res.user.photoURL && { avatar: res.user.photoURL })
            });
        } catch (err) {
            const error = err as SignUpError;

            const message = authTexts.signUpErrors[error.code];

            if (!message) return;

            toast.error(message, {
                position: 'top-right'
            });
        }
    }, []);

    const handleResetPassword = useCallback(async ({ email }: ResetPasswordData): Promise<boolean> => {
        try {
            await sendPasswordResetEmail(getFirebaseAuth(), email);
            return true;
        } catch (err) {
            const error = err as ResetPasswordError;

            const message = authTexts.resetPasswordErrors[error.code];

            if (!message) return false;

            toast.error(message, {
                position: 'top-right'
            });
            return false;
        }
    }, []);

    const handleSignInWithPassword = useCallback(async (val: SignInData) => {
        try {
            const res = await signInWithEmailAndPassword(getFirebaseAuth(), val.email, val.password);

            await logIn({
                token: await res.user.getIdToken(true),
                email: res.user.email as string,
                ...(res.user.displayName && { name: res.user.displayName }),
                ...(res.user.photoURL && { avatar: res.user.photoURL })
            });
        } catch (err) {
            const error = err as SinInWithPasswordError;

            const message = authTexts.signInWithPasswordErrors[error.code];

            if (!message) return;

            toast.error(message, {
                position: 'top-right'
            });
        }
    }, []);

    const handleSignInWithPopup = useCallback(async () => {
        try {
            const providerGoogle = new GoogleAuthProvider();
            const res = await signInWithPopup(getFirebaseAuth(), providerGoogle);

            await logIn({
                token: await res.user.getIdToken(true),
                email: res.user.email as string,
                ...(res.user.displayName && { name: res.user.displayName }),
                ...(res.user.photoURL && { avatar: res.user.photoURL })
            });
        } catch (err) {
            const error = err as SinInWithPopupError;

            const message = authTexts.signInWithPopupErrors[error.code];

            if (!message) return;

            toast.error(message, {
                position: 'top-right'
            });
        }
    }, []);

    return (
        <>
            {currentState === AuthState.Login && (
                <LoginForm
                    signIn={handleSignInWithPassword}
                    signUp={() => setCurrentState(AuthState.SignUp)}
                    signInWithGoogle={handleSignInWithPopup}
                    resetPassword={() => setCurrentState(AuthState.ResetPassword)}
                />
            )}
            {currentState === AuthState.SignUp && <SignUpForm back={() => setCurrentState(AuthState.Login)} signUp={handleSignUp} />}
            {currentState === AuthState.ResetPassword && (
                <ResetPasswordForm key={currentState} resetPassword={handleResetPassword} back={() => setCurrentState(AuthState.Login)} />
            )}
        </>
    );
};
