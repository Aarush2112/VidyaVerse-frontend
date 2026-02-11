"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function enrollInCourse(courseId: string) {
    try {
        const { userId } = await auth();
        if (!userId) return { success: false, error: "Unauthorized" };

        const user = await db.user.findUnique({
            where: { clerkId: userId }
        });

        if (!user) return { success: false, error: "User not found" };

        const course = await db.course.findFirst({
            where: { id: courseId, isPublished: true }
        });

        if (!course) return { success: false, error: "Course not found" };

        // Check if already enrolled
        const existingEnrollment = await db.enrollment.findUnique({
            where: {
                userId_courseId: {
                    userId: user.id,
                    courseId: courseId
                }
            }
        });

        if (existingEnrollment) {
            return { success: true, message: "Already enrolled" };
        }

        // Enroll
        await db.enrollment.create({
            data: {
                userId: user.id,
                courseId: courseId
            }
        });

        revalidatePath(`/student/courses`);
        return { success: true, message: "Enrolled successfully" };

    } catch (error) {
        console.error("[ENROLL_COURSE]", error);
        return { success: false, error: "Internal Error" };
    }
}
