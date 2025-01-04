'use client';

import {LoginForm} from "@/components/loginForm/LoginForm";
import {FC, useCallback, useState} from "react";
import {GalleryVerticalEnd} from "lucide-react";
import {AuthState, SignUpError} from "@/containers/auth/types";
import {SignUpForm} from "@/components/signUpForm/SignUpForm";
import {ResetPasswordForm} from "@/components/resetPasswordForm/ResetPasswordForm";
import {SignUpData} from "@/components/signUpForm/types";
import {createUserWithEmailAndPassword} from 'firebase/auth';
import getFirebaseAuth from "@/containers/auth/services/getFirebaseAuth";
import {login} from "@/containers/auth/services/login";
import {toast} from "sonner";
import {authTexts} from "@/containers/auth/texts";


export const Auth: FC = () => {
    const [currentState, setCurrentState] = useState<AuthState>(AuthState.Login);

    const handleSignUp = useCallback(async (data: SignUpData) => {
        try {
            const res = await createUserWithEmailAndPassword(getFirebaseAuth(), data.email, data.password);

            const firebaseIdToken = await res.user.getIdToken(true);

            await login(firebaseIdToken);
        } catch (err) {
            const error = err as SignUpError;

            toast.error(authTexts.signUpErrors[error.code] || authTexts.signUpErrors.defaultError, {
                position: 'top-right',
            });
        }
    }, []);

    return <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
        <div className="flex w-full max-w-sm flex-col gap-6">
            <a href="#" className="flex items-center gap-2 self-center font-medium">
                <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                    <GalleryVerticalEnd className="size-4"/>
                </div>
                Sugar Hunter
            </a>
            {currentState === AuthState.Login && <LoginForm signUp={() => setCurrentState(AuthState.SignUp)}
                                                            resetPassword={() => setCurrentState(AuthState.ResetPassword)}/>}
            {currentState === AuthState.SignUp &&
                <SignUpForm back={() => setCurrentState(AuthState.Login)} signUp={handleSignUp}/>}
            {currentState === AuthState.ResetPassword &&
                <ResetPasswordForm back={() => setCurrentState(AuthState.Login)}/>}
        </div>
    </div>;
}