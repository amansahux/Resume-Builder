// middleware.ts

import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    const token = req.cookies.get("token")?.value;

    const pathname = req.nextUrl.pathname;

    const isAuthRoute = pathname.startsWith("/auth");
    const isProtectedRoute = pathname.startsWith("/main");

    if (!token && isProtectedRoute) {
        return NextResponse.redirect(
            new URL("/auth/login", req.url)
        );
    }

    if (token && isAuthRoute) {
        return NextResponse.redirect(
            new URL("/main", req.url)
        );
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/main/:path*", "/auth/:path*"],
};