'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { encrypt } from '@/services/encription';
import { appPaths } from '@/configs/appPaths';
import { cookiesTokenName } from '@/containers/auth/configs';

const YEAR_IN_SECONDS = 60 * 60 * 24 * 365;

export const logIn = async (token: string): Promise<void> => {
    (await cookies()).set(cookiesTokenName, encrypt(token), {
        httpOnly: true,
        secure: process.env.NEXT_PUBLIC_APP_ENVIRONMENT === 'production',
        path: '/',
        sameSite: 'strict',
        maxAge: YEAR_IN_SECONDS
    });

    redirect(appPaths.home);
};
