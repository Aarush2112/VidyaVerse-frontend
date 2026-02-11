"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function syncUser(fullName: string) {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    if (!fullName) return;

    try {
        await db.user.update({
            where: { clerkId: userId },
            data: { name: fullName }
        });

        revalidatePath("/student/dashboard");
        revalidatePath("/student/settings");
        console.log(`[SYNC] User ${userId} updated name to ${fullName}`);
        return { success: true };
    } catch (error) {
        console.error("[SYNC_USER_ERROR]", error);
        return { success: false };
    }
}
