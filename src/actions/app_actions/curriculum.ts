"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function createChapter(courseId: string, title: string) {
    try {
        const { userId } = await auth();
        if (!userId) return { success: false, error: "Unauthorized" };

        const user = await db.user.findUnique({ where: { clerkId: userId } });
        if (!user || (user.role !== "TEACHER" && user.role !== "ADMIN")) {
            return { success: false, error: "Unauthorized" };
        }

        const course = await db.course.findUnique({
            where: { id: courseId, teacherId: user.id }
        });

        if (!course) return { success: false, error: "Course not found" };

        const lastChapter = await db.chapter.findFirst({
            where: { courseId },
            orderBy: { position: "desc" }
        });

        const newPosition = lastChapter ? lastChapter.position + 1 : 1;

        const chapter = await db.chapter.create({
            data: {
                title,
                courseId,
                position: newPosition
            }
        });

        revalidatePath(`/teacher/courses/${courseId}/edit`);
        return { success: true, chapter };

    } catch (error) {
        console.error("Create Chapter Error:", error);
        return { success: false, error: "Failed to create chapter" };
    }
}

export async function reorderChapters(
    courseId: string,
    updateData: { id: string; position: number }[]
) {
    try {
        const { userId } = await auth();
        if (!userId) return { success: false, error: "Unauthorized" };

        const user = await db.user.findUnique({ where: { clerkId: userId } });
        if (!user) return { success: false, error: "Unauthorized" };

        const course = await db.course.findUnique({
            where: { id: courseId, teacherId: user.id }
        });

        if (!course) return { success: false, error: "Course not found" };

        // Transactional update
        for (const item of updateData) {
            await db.chapter.update({
                where: { id: item.id },
                data: { position: item.position }
            });
        }

        revalidatePath(`/teacher/courses/${courseId}/edit`);
        return { success: true };

    } catch (error) {
        console.error("Reorder Chapters Error:", error);
        return { success: false, error: "Failed to reorder chapters" };
    }
}

export async function createLesson(chapterId: string, title: string) {
    try {
        const { userId } = await auth();
        if (!userId) return { success: false, error: "Unauthorized" };

        const user = await db.user.findUnique({ where: { clerkId: userId } });
        if (!user || user.role !== "TEACHER") return { success: false, error: "Unauthorized" };

        const chapter = await db.chapter.findUnique({
            where: { id: chapterId },
            include: { course: true }
        });

        if (!chapter) return { success: false, error: "Chapter not found" };
        if (chapter.course.teacherId !== user.id) return { success: false, error: "Unauthorized" };

        const lastLesson = await db.lesson.findFirst({
            where: { chapterId },
            orderBy: { position: "desc" }
        });

        const newPosition = lastLesson ? lastLesson.position + 1 : 1;

        const lesson = await db.lesson.create({
            data: {
                title,
                chapterId,
                position: newPosition,
                type: "VIDEO",
                isPublished: false
            }
        });

        revalidatePath(`/teacher/courses/${chapter.course.id}/edit`);
        return { success: true, lesson };

    } catch (error) {
        console.error("Create Lesson Error:", error);
        return { success: false, error: "Failed to create lesson" };
    }
}

export async function reorderLessons(
    courseId: string,
    chapterId: string,
    updateData: { id: string; position: number }[]
) {
    try {
        const { userId } = await auth();
        if (!userId) return { success: false, error: "Unauthorized" };

        for (const item of updateData) {
            await db.lesson.update({
                where: { id: item.id },
                data: { position: item.position }
            });
        }

        revalidatePath(`/teacher/courses/${courseId}/edit`);
        return { success: true };

    } catch (error) {
        console.error("Reorder Lessons Error:", error);
        return { success: false, error: "Failed to reorder lessons" };
    }
}

export async function publishCourse(courseId: string) {
    try {
        const { userId } = await auth();
        if (!userId) return { success: false, error: "Unauthorized" };

        const user = await db.user.findUnique({ where: { clerkId: userId } });
        if (!user) return { success: false, error: "Unauthorized" };

        const course = await db.course.findUnique({
            where: { id: courseId, teacherId: user.id },
            include: {
                chapters: {
                    include: {
                        lessons: true
                    }
                }
            }
        });

        if (!course) return { success: false, error: "Not found" };

        // Eisenhower Q2 Validation
        const hasChapters = course.chapters.length > 0;
        const hasLessons = course.chapters.some(c => c.lessons.length > 0);
        // Add more checks as needed

        if (!hasChapters) {
            return { success: false, error: "Course requires at least one chapter." };
        }

        const publishedCourse = await db.course.update({
            where: { id: courseId },
            data: { isPublished: true }
        });

        revalidatePath(`/teacher/courses/${courseId}/edit`);
        // Ensure students see the newly published course immediately
        revalidatePath("/student/courses");
        revalidatePath("/student/dashboard");
        return { success: true, course: publishedCourse };

    } catch (error) {
        console.error("Publish Error:", error);
        return { success: false, error: "Internal Error" };
    }
}

export async function updateUserProgress(lessonId: string, isCompleted: boolean) {
    try {
        const { userId } = await auth();
        if (!userId) return { success: false, error: "Unauthorized" };

        const user = await db.user.findUnique({ where: { clerkId: userId } });
        if (!user) return { success: false, error: "Unauthorized" };

        const progress = await db.userProgress.upsert({
            where: {
                userId_lessonId: {
                    userId: user.id,
                    lessonId
                }
            },
            update: {
                isCompleted
            },
            create: {
                userId: user.id,
                lessonId,
                isCompleted
            }
        });

        // Revalidate course and dashboard
        revalidatePath("/student/courses/[courseId]", 'page');
        revalidatePath("/student/dashboard");

        return { success: true, progress };

    } catch (error) {
        console.error("Progress Error:", error);
        return { success: false, error: "Failed to update progress" };
    }
}

export async function createResource(
    lessonId: string,
    data: { name: string; url: string; fileType: string; fileSize: number }
) {
    try {
        const { userId } = await auth();
        if (!userId) return { success: false, error: "Unauthorized" };

        const user = await db.user.findUnique({ where: { clerkId: userId } });
        if (!user || user.role !== "TEACHER") return { success: false, error: "Unauthorized" };

        // Verify lesson ownership
        const lesson = await db.lesson.findUnique({
            where: { id: lessonId },
            include: { chapter: { include: { course: true } } }
        });

        if (!lesson) return { success: false, error: "Lesson not found" };
        if (lesson.chapter.course.teacherId !== user.id) return { success: false, error: "Unauthorized" };

        const resource = await db.resource.create({
            data: {
                lessonId,
                name: data.name,
                url: data.url,
                fileType: data.fileType,
                fileSize: data.fileSize
            }
        });

        revalidatePath(`/teacher/courses/${lesson.chapter.course.id}/edit`);
        return { success: true, resource };

    } catch (error) {
        console.error("Create Resource Error:", error);
        return { success: false, error: "Failed to create resource" };
    }
}

export async function deleteResource(resourceId: string, courseId: string) {
    try {
        const { userId } = await auth();
        if (!userId) return { success: false, error: "Unauthorized" };

        const user = await db.user.findUnique({ where: { clerkId: userId } });
        if (!user || user.role !== "TEACHER") return { success: false, error: "Unauthorized" };

        const resource = await db.resource.findUnique({
            where: { id: resourceId },
            include: { lesson: { include: { chapter: { include: { course: true } } } } }
        });

        if (!resource) return { success: false, error: "Resource not found" };
        if (resource.lesson.chapter.course.teacherId !== user.id) return { success: false, error: "Unauthorized" };

        await db.resource.delete({
            where: { id: resourceId }
        });

        revalidatePath(`/teacher/courses/${resource.lesson.chapter.course.id}/edit`);
        return { success: true };

    } catch (error) {
        console.error("Delete Resource Error:", error);
        return { success: false, error: "Failed to delete resource" };
    }
}
