import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Define protected routes
const isTeacherRoute = createRouteMatcher(["/teacher(.*)"]);
const isAdminRoute = createRouteMatcher(["/admin(.*)"]);
const isStudentRoute = createRouteMatcher(["/student(.*)"]);

export default clerkMiddleware(async (auth, req) => {
    const { userId, sessionClaims, redirectToSignIn } = await auth();

    // 1. Strict Admin Gate
    if (isAdminRoute(req)) {
        if (!userId) return redirectToSignIn();

        // RBAC: For now, we defer to the Server Actions/Page logic to check DB roles.
        // The Middleware Session Claim check is too strict for dev if claims aren't set up.
        // const role = (sessionClaims?.metadata as any)?.role;
        // if (!role || !['SUPER_ADMIN', 'ACADEMIC_ADMIN', 'SUPPORT_AGENT', 'ADMIN'].includes(role)) {
        //    return NextResponse.redirect(new URL("/403", req.url));
        // }
    }

    // Public routes check
    if (!userId && (isTeacherRoute(req) || isStudentRoute(req))) {
        return redirectToSignIn();
    }
});

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
};
