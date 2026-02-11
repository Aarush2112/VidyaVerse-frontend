"use server"

import { db } from "@/lib/db"
import { currentUser } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"

export async function enrollInCourse(courseId: string) {
    try {
        const user = await currentUser()
        if (!user) throw new Error("Unauthorized")

        const dbUser = await db.user.findUnique({
            where: { clerkId: user.id }
        })
        if (!dbUser) throw new Error("User not found")

        // Check if already enrolled
        const existingEnrollment = await db.enrollment.findUnique({
            where: {
                userId_courseId: {
                    userId: dbUser.id,
                    courseId: courseId
                }
            }
        })

        if (existingEnrollment) {
            return { success: true, message: "Already enrolled" }
        }

        // Create enrollment
        await db.enrollment.create({
            data: {
                userId: dbUser.id,
                courseId: courseId,
                percentComplete: 0
            }
        })

        revalidatePath("/student/courses")
        return { success: true }
    } catch (error) {
        console.error("Enrollment Error:", error)
        return { success: false, error: "Failed to enroll. Please try again." }
    }
}
