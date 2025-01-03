import {NextRequest, NextResponse} from "next/server";

export async function middleware(request: NextRequest) {
    const requestHeaders = new Headers(request.headers);

    return NextResponse.next({
        request: {
            headers: requestHeaders
        }
    });
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.(?:png|jpg|webp|svg|ico|gif)$).*)']
};
