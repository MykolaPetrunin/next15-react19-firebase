'use client';

import {LoginForm} from "@/components/loginForm/LoginForm";
import {FC, useCallback, useState} from "react";
import {
    AuthState,
    ResetPasswordError,
    SignUpError,
    SinInWithPasswordError,
    SinInWithPopupError
} from "@/containers/auth/types";
import {SignUpForm} from "@/components/signUpForm/SignUpForm";
import {ResetPasswordForm} from "@/components/resetPasswordForm/ResetPasswordForm";
import {SignUpData} from "@/components/signUpForm/types";
import {
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider
} from 'firebase/auth';
import getFirebaseAuth from "@/containers/auth/services/getFirebaseAuth";
import {login} from "@/containers/auth/services/login";
import {toast} from "sonner";
import {authTexts} from "@/containers/auth/texts";
import {ResetPasswordData} from "@/components/resetPasswordForm/types";
import {SignInData} from "@/components/loginForm/types";


export const Auth: FC = () => {
    const [currentState, setCurrentState] = useState<AuthState>(AuthState.Login);

    const handleSignUp = useCallback(async (data: SignUpData) => {
        try {
            const res = await createUserWithEmailAndPassword(getFirebaseAuth(), data.email, data.password);

            await login(await res.user.getIdToken(true));
        } catch (err) {
            const error = err as SignUpError;

            toast.error(authTexts.signUpErrors[error.code] || error.code, {
                position: 'top-right',
            });
        }
    }, []);

    const handleResetPassword = useCallback(async ({email}: ResetPasswordData): Promise<boolean> => {
        try {
            await sendPasswordResetEmail(getFirebaseAuth(), email);
            return true;
        } catch (err) {
            const error = err as ResetPasswordError;
            toast.error(authTexts.resetPasswordErrors[error.code] || error.code, {
                position: 'top-right',
            });
            return false;
        }
    }, []);

    const handleSignInWithPassword = useCallback(async (val: SignInData) => {
        try {
            const res = await signInWithEmailAndPassword(getFirebaseAuth(), val.email, val.password);

            await login(await res.user.getIdToken(true));
        } catch (err) {
            const error = err as SinInWithPasswordError;

            toast.error(authTexts.signInWithPasswordErrors[error.code] || error.code, {
                position: 'top-right',
            });
        }
    }, []);

    const handleSignInWithPopup = useCallback(async () => {
        try {
            const providerGoogle = new GoogleAuthProvider();
            const res = await signInWithPopup(getFirebaseAuth(), providerGoogle);

            await login(await res.user.getIdToken(true));
        } catch (err) {
            const error = err as SinInWithPopupError;

            toast.error(authTexts.signInWithPopupErrors[error.code] || error.code, {
                position: 'top-right',
            });
        }
    }, []);

    return <>
        {currentState === AuthState.Login &&
            <LoginForm
                signIn={handleSignInWithPassword}
                signUp={() => setCurrentState(AuthState.SignUp)}
                signInWithGoogle={handleSignInWithPopup}
                resetPassword={() => setCurrentState(AuthState.ResetPassword)}/>}
        {currentState === AuthState.SignUp &&
            <SignUpForm back={() => setCurrentState(AuthState.Login)} signUp={handleSignUp}/>}
        {currentState === AuthState.ResetPassword &&
            <ResetPasswordForm key={currentState} resetPassword={handleResetPassword}
                               back={() => setCurrentState(AuthState.Login)}/>}
    </>;
}