'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { encrypt } from '@/services/encription';
import { appPaths } from '@/configs/appPaths';
import { cookiesUser } from '@/containers/auth/configs';
import { prisma } from '@/services/prisma';

const YEAR_IN_SECONDS = 60 * 60 * 24 * 365;

interface LoginProps {
    token: string;
    email: string;
    avatar?: string;
    name?: string;
}

export const logIn = async ({ email, token, avatar, name }: LoginProps): Promise<void> => {
    const user = await prisma.user.upsert({
        where: { email },
        update: {
            ...(name && { name }),
            ...(avatar && { avatar })
        },
        create: {
            email,
            name: name || email,
            avatar: avatar || null
        }
    });

    (await cookies()).set(cookiesUser, JSON.stringify({ ...user, jwt: encrypt(token) }), {
        httpOnly: true,
        secure: process.env.NEXT_PUBLIC_APP_ENVIRONMENT === 'production',
        path: '/',
        sameSite: 'strict',
        maxAge: YEAR_IN_SECONDS
    });

    redirect(appPaths.home);
};
