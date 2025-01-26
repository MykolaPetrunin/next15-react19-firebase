'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { appPaths } from '@/configs/appPaths';
import { cookiesUser } from '@/containers/auth/configs';

export const logOut = async (): Promise<void> => {
    (await cookies()).delete(cookiesUser);

    redirect(appPaths.auth.login);
};
