'use server';

import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function getLibraryData() {
    const user = await currentUser();
    if (!user) return redirect("/sign-in");

    // 1. Get DB User ID from Clerk ID
    const dbUser = await db.user.findUnique({
        where: { clerkId: user.id },
        include: { gamification: true }
    });

    if (!dbUser) return null; // Should treat as error or redirect

    // 2. Fetch Recommended Courses (In-Progress / Enrolled)
    const enrolled = await db.enrollment.findMany({
        where: {
            userId: dbUser.id,
            percentComplete: { lt: 100 }
        },
        include: {
            course: {
                include: { teacher: true }
            }
        },
        orderBy: { lastAccessedAt: 'desc' },
        take: 5
    });

    // 3. Fetch Full Catalog (Published Courses)
    const catalog = await db.course.findMany({
        where: { isPublished: true },
        include: {
            teacher: true,
            enrollments: {
                where: { userId: dbUser.id }
            }
        },
        orderBy: { createdAt: 'desc' }
    });

    // 4. Fetch Daily Problem (Mock if none)
    // Querying for the latest OFFICIAL problem to serve as the daily challenge
    let dailyProblem = await db.problem.findFirst({
        where: { source: 'OFFICIAL' },
        orderBy: { createdAt: 'desc' }
    });

    if (!dailyProblem) {
        // Fallback catch-all if no official problem is set
        dailyProblem = await db.problem.findFirst({
            orderBy: { createdAt: 'desc' }
        });
    }

    // 5. Fetch Top Students Leaderboard
    const leaderboard = await db.gamification.findMany({
        orderBy: { xp: 'desc' },
        include: { user: true },
        take: 3
    });

    return {
        user: dbUser,
        enrolled,
        catalog,
        dailyProblem,
        leaderboard
    };
}
