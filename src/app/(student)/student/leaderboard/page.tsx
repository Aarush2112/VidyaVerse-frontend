import React from "react";
import { CelebrationLeaderboard } from "@/components/student/leaderboard/CelebrationLeaderboard";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export default async function LeaderboardPage() {
    const { userId } = await auth();

    // 1. Try to find the Demo Assignment to show its leaderboard (as per demo requirements)
    const demoAssignment = await db.assignment.findFirst({
        where: { title: "Mid-Term Exam (Demo)", isPublished: true } as any
    });

    let leaderboardData: { id: string; rank: number; name: string | null; xp: number; image: string; trend: "up" | "stable" | "down" }[] = [];
    let label = "XP";

    if (demoAssignment) {
        // Fetch Exam Leaderboard
        const submissions = await db.submission.findMany({
            where: { assignmentId: demoAssignment.id, score: { not: null } } as any,
            include: { user: true },
            orderBy: [{ score: 'desc' } as any, { submittedAt: 'asc' } as any],
            take: 50
        });

        leaderboardData = submissions.map((sub: any, index) => ({
            id: sub.userId,
            rank: index + 1,
            name: sub.user.name,
            xp: sub.score || 0, // Mapping score to 'xp' prop for Component compatibility
            image: `https://api.dicebear.com/7.x/avataaars/svg?seed=${sub.user.name}`,
            trend: "stable"
        }));
        label = "Score";
    } else {
        // Fetch top 50 users sorted by XP desc (Fallback)
        const topUsers = await db.user.findMany({
            orderBy: { xp: 'desc' },
            take: 50,
            select: {
                id: true,
                name: true,
                xp: true
            }
        });

        leaderboardData = topUsers.map((user, index) => ({
            id: user.id,
            rank: index + 1,
            name: user.name,
            xp: user.xp,
            image: `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.id}`,
            trend: "stable"
        }));
    }

    // Find current user stats
    // Note: In a real app we'd fetch specific rank if not in top 50, but for demo this is fine.
    let currentUser = leaderboardData.find(u => u.id === userId);

    // Attempt fallback match by name if local/dev environment and IDs differ significantly (optional hack, removed for strictness)
    // Actually, let's keep it simple. Accessing via Clerk userId vs DB userId might be tricky if they are different.
    // We assume auth() returns ClerkId. The DB User has ClerkId. The Leaderboard has DB User IDs.
    // So we need to match: leaderboardData[i].id (DB User ID) === user.id (DB User ID).
    // We only have clerkId. So we need to find DB user first.

    if (!currentUser && userId) {
        const dbUser = await db.user.findUnique({ where: { clerkId: userId } });
        if (dbUser) {
            currentUser = leaderboardData.find(u => u.id === dbUser.id);

            if (!currentUser) {
                // If not in top 50, construct dummy self entry
                currentUser = {
                    id: dbUser.id,
                    rank: 999,
                    name: dbUser.name,
                    xp: 0,
                    image: `https://api.dicebear.com/7.x/avataaars/svg?seed=${dbUser.name}`,
                    trend: "stable"
                }
            }
        }
    }

    return <CelebrationLeaderboard leaderboardData={leaderboardData} currentUser={currentUser} label={label} />;
}
