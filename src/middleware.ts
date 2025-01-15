import { NextRequest, NextResponse } from 'next/server';

import { appPaths } from '@/configs/appPaths';

const publicPaths = [appPaths.auth.login, appPaths.auth.setNewPassword];

export async function middleware(request: NextRequest) {
    const requestHeaders = new Headers(request.headers);

    if (publicPaths.includes(request.nextUrl.pathname)) {
        return NextResponse.next({
            request: {
                headers: requestHeaders
            }
        });
    }

    const token = request.cookies.get('firebaseToken')?.value;

    if (!token) {
        return NextResponse.redirect(new URL(appPaths.auth.login, request.url));
    }
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.(?:png|jpg|webp|svg|ico|gif)$).*)']
};
