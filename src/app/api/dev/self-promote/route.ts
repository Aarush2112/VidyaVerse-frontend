import { db } from "@/lib/db"
import { createClerkClient } from "@clerk/nextjs/server"
import { auth, currentUser } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

// Force dynamic to ensure auth works
export const dynamic = "force-dynamic"

export async function GET() {
    try {
        const { userId } = await auth()
        const user = await currentUser()

        if (!userId || !user) {
            return NextResponse.json({ error: "Unauthorized. Please login first." }, { status: 401 })
        }

        const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY })

        // 1. Upsert User in DB (Create if missing, else update)
        const dbUser = await db.user.upsert({
            where: { clerkId: userId },
            update: {
                role: "ADMIN",
                email: user.emailAddresses[0]?.emailAddress || "unknown@email.com"
            },
            create: {
                clerkId: userId,
                email: user.emailAddresses[0]?.emailAddress || "unknown@email.com",
                name: `${user.firstName} ${user.lastName}`,
                role: "ADMIN",
                xp: 0
            }
        })

        // 2. Update Clerk Metadata
        await clerk.users.updateUserMetadata(userId, {
            publicMetadata: { role: "ADMIN" }
        })

        return NextResponse.json({
            success: true,
            message: `User ${dbUser.name} (${dbUser.email}) promoted to ADMIN.`,
            action: "Please sign out and sign back in to refresh your session."
        })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
