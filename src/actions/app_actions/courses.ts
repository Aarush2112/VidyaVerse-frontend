"use server"

import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function createCourse(data: { title: string; description?: string; code: string }) {
    const { userId } = await auth()
    if (!userId) throw new Error("Unauthorized")

    // Find database user
    const teacher = await db.user.findUnique({
        where: { clerkId: userId }
    })

    if (!teacher || (teacher.role !== "TEACHER" && teacher.role !== "ADMIN")) {
        throw new Error("Only teachers can create courses")
    }

    const course = await db.course.create({
        data: {
            title: data.title,
            description: data.description,
            code: data.code,
            teacherId: teacher.id
        }
    })

    revalidatePath("/teacher/dashboard")
    return course
}

export async function getTeacherCourses() {
    const { userId } = await auth()
    if (!userId) return []

    const teacher = await db.user.findUnique({ where: { clerkId: userId } })
    if (!teacher) return []

    return await db.course.findMany({
        where: { teacherId: teacher.id },
        orderBy: { title: "asc" }
    })
}

export async function updateCourse(courseId: string, values: any) {
    try {
        const { userId } = await auth();
        if (!userId) return { success: false, error: "Unauthorized" };

        const user = await db.user.findUnique({
            where: { clerkId: userId }
        });

        if (!user) return { success: false, error: "User not found" };

        const course = await db.course.update({
            where: {
                id: courseId,
                teacherId: user.id // Security check
            },
            data: {
                ...values
            }
        });

        revalidatePath(`/teacher/courses/${courseId}`);
        revalidatePath(`/teacher/courses`);
        return { success: true, course };

    } catch (error) {
        console.error("Course Update Error:", error);
        return { success: false, error: "Failed to update course" };
    }
}
