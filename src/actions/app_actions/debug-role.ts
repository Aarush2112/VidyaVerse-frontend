
"use server"

import { auth } from "@clerk/nextjs/server"
import { db } from "@/lib/db"

export async function debugUserRoleAction() {
    const { userId } = await auth();
    if (!userId) return { error: "No userId" };

    const user = await db.user.findUnique({
        where: { clerkId: userId }
    });

    const dbUrl = process.env.DATABASE_URL || "MISSING";
    const maskedUrl = dbUrl.replace(/:([^@]+)@/, ':****@');

    console.log("[DEBUG ACTION] User ID:", userId);
    console.log("[DEBUG ACTION] Found Role:", user?.role);
    console.log("[DEBUG ACTION] DB URL:", maskedUrl);

    return {
        userId,
        role: user?.role,
        dbUrl: maskedUrl,
        timestamp: new Date().toISOString()
    };
}
