'use client';

import {LoginForm} from "@/components/loginForm/LoginForm";
import {FC, useState} from "react";
import {GalleryVerticalEnd} from "lucide-react";
import {AuthState} from "@/containers/auth/types";
import {SignUpForm} from "@/components/signUpForm/SignUpForm";
import {ResetPasswordForm} from "@/components/resetPasswordForm/ResetPasswordForm";

export const Auth: FC = () => {
    const [currentState, setCurrentState] = useState<AuthState>(AuthState.Login);

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
            {currentState === AuthState.SignUp && <SignUpForm back={() => setCurrentState(AuthState.Login)}/>}
            {currentState === AuthState.ResetPassword &&
                <ResetPasswordForm back={() => setCurrentState(AuthState.Login)}/>}
        </div>
    </div>;
}