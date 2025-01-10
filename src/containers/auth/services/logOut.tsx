'use server';

import {cookies} from "next/headers";
import {appPaths} from "@/configs/appPaths";
import {redirect} from "next/navigation";
import {cookiesTokenName} from "@/containers/auth/configs";


export const logOut = async (): Promise<void> => {
    (await cookies()).delete(cookiesTokenName);

    redirect(appPaths.auth.login);
};
