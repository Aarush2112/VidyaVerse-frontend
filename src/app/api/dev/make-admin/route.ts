import { db } from "@/lib/db"
import { createClerkClient } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function GET() {
    try {
        const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY })

        // 1. Find User
        const user = await db.user.findFirst({
            where: {
                OR: [
                    { name: { contains: "Poorak", mode: "insensitive" } },
                    { email: { contains: "poorak", mode: "insensitive" } }
                ]
            }
        })

        if (!user) {
            return NextResponse.json({ error: "User not found in App DB" }, { status: 404 })
        }

        // 2. Update DB
        await db.user.update({
            where: { id: user.id },
            data: { role: "ADMIN" }
        })

        // 3. Update Clerk
        await clerk.users.updateUserMetadata(user.clerkId, {
            publicMetadata: { role: "ADMIN" }
        })

        return NextResponse.json({
            success: true,
            message: `User ${user.name} promoted to ADMIN`,
            user
        })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
