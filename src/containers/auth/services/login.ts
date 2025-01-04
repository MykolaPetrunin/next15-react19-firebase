'use server';

import {encrypt} from "@/services/encription";
import {cookies} from "next/headers";
import {appPaths} from "@/configs/appPaths";
import {redirect} from "next/navigation";

const YEAR_IN_SECONDS = 60 * 60 * 24 * 365;

export const login = async (token: string): Promise<void> => {
    (await cookies()).set('firebaseToken', encrypt(token), {
        httpOnly: true,
        secure: process.env.NEXT_PUBLIC_APP_ENVIRONMENT === 'production',
        path: '/',
        sameSite: 'strict',
        maxAge: YEAR_IN_SECONDS
    });

    redirect(appPaths.home);
};
