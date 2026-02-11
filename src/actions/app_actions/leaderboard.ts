"use server"

import { db } from "@/lib/db"

export async function getLeaderboard() {
    // Top 50 Users by XP
    const users = await db.user.findMany({
        where: { role: "STUDENT" },
        orderBy: { xp: 'desc' },
        take: 50,
        select: {
            id: true,
            name: true,
            xp: true
        }
    })

    return users.map((u, i) => ({
        ...u,
        rank: i + 1
    }))
}
