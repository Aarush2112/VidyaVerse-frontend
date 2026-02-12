import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const isTeacherRoute = (path: string) => /^\/teacher(\/|$)/.test(path);
const isAdminRoute = (path: string) => /^\/admin(\/|$)/.test(path);
const isStudentRoute = (path: string) => /^\/student(\/|$)/.test(path);
const isAuthRoute = (path: string) => /^\/(sign-in|sign-up)(\/|$)/.test(path);

export function middleware(request: NextRequest) {
    const token = request.cookies.get("access_token")?.value;
    const path = request.nextUrl.pathname;

    if (isAuthRoute(path)) {
        if (token) {
            return NextResponse.redirect(new URL("/student", request.url));
        }
        return NextResponse.next();
    }

    if (!token && (isTeacherRoute(path) || isStudentRoute(path) || isAdminRoute(path))) {
        const signIn = new URL("/sign-in", request.url);
        signIn.searchParams.set("redirect", path);
        return NextResponse.redirect(signIn);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
        "/(api|trpc)(.*)",
    ],
};
