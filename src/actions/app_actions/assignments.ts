"use server"

import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import { AssignmentType } from "@prisma/client"
import { revalidatePath } from "next/cache"
import { z } from "zod"

// quadrant 1: robust validation
const CreateAssignmentSchema = z.object({
    title: z.string().min(3),
    description: z.string().optional(),
    courseId: z.string().uuid(),
    type: z.enum(["ALGORITHM", "PROJECT", "THEORY"]),
    // Defaulting published to true for immediate visibility as requested
    isPublished: z.boolean().default(true),
    startDate: z.date().optional(),
    dueDate: z.date().optional(),
    points: z.number().default(100),

    // Advanced Config
    latePolicy: z.enum(["STRICT", "FLEXIBLE"]).optional(),
    isProctored: z.boolean().default(false),
    allowedLanguages: z.array(z.string()).default(["javascript", "python"]),
    timeLimit: z.number().optional(),

    // Content (Coding)
    problems: z.array(z.object({
        title: z.string(),
        description: z.string(),
        allowedLanguages: z.array(z.string()).optional(),
        cpuTimeLimit: z.number().optional(),
        testCases: z.array(z.object({
            input: z.string(),
            expectedOutput: z.string(),
            isHidden: z.boolean().default(false),
            points: z.number().default(10)
        }))
    })).optional(),

    // Content (Questions)
    questions: z.array(z.object({
        text: z.string(),
        options: z.array(z.string()),
        correctOption: z.number(),
        points: z.number().default(5)
    })).optional()
});

export async function createAssignment(rawData: z.infer<typeof CreateAssignmentSchema>) {
    // 1. Validate Input
    const validated = CreateAssignmentSchema.safeParse(rawData);
    if (!validated.success) {
        console.error("Validation Failed:", validated.error.flatten());
        throw new Error("Invalid Assignment Data");
    }

    const data = validated.data;
    console.log("Creating Assignment:", JSON.stringify(data, null, 2));

    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    // Validate Teacher
    const teacher = await db.user.findUnique({ where: { clerkId: userId } });
    if (!teacher || (teacher.role !== "TEACHER" && teacher.role !== "ADMIN")) {
        throw new Error("Forbidden: User is not Teacher/Admin");
    }

    try {
        // 2. Transaction (Ensure DB Integrity)
        const assignment = await db.assignment.create({
            data: {
                title: data.title,
                description: data.description,
                type: data.type as AssignmentType,
                courseId: data.courseId,
                isPublished: data.isPublished,
                startDate: data.startDate || new Date(),
                dueDate: data.dueDate,
                points: data.points,
                latePolicy: data.latePolicy,
                isProctored: data.isProctored,
                timeLimit: data.timeLimit,
                allowedLanguages: data.allowedLanguages,

                // Nested Writes for Content
                problems: {
                    create: data.problems?.map(p => ({
                        title: p.title,
                        description: p.description,
                        allowedLanguages: p.allowedLanguages || data.allowedLanguages, // Inherit Config or Override
                        cpuTimeLimit: p.cpuTimeLimit || 2.0,
                        testCases: {
                            create: p.testCases.map(tc => ({
                                input: tc.input,
                                expectedOutput: tc.expectedOutput,
                                isHidden: tc.isHidden,
                                points: tc.points
                            }))
                        }
                    }))
                },
                questions: {
                    create: data.questions?.map(q => ({
                        text: q.text,
                        options: q.options,
                        correctOption: q.correctOption,
                        points: q.points
                    }))
                }
            }
        });

        // 3. Revalidate Caches (The "Refresh" Fix)
        revalidatePath(`/student/dashboard`);
        revalidatePath(`/teacher/assignments`);
        revalidatePath(`/courses/${data.courseId}`);

        return assignment;

    } catch (error) {
        console.error("SERVER ACTION ERROR [createAssignment]:", error);
        throw error;
    }
}

export async function getTeacherAssignments() {
    const { userId } = await auth()
    if (!userId) return []

    const teacher = await db.user.findUnique({ where: { clerkId: userId } })
    if (!teacher) return []

    return await db.assignment.findMany({
        where: { course: { teacherId: teacher.id } },
        include: { course: true, submissions: true },
        orderBy: { createdAt: 'desc' }
    })
}

export async function getAssignmentById(assignmentId: string) {
    const { userId } = await auth();
    if (!userId) return null;

    return await db.assignment.findUnique({
        where: { id: assignmentId },
        include: {
            problems: { include: { testCases: true } },
            proctoringConfig: true
        }
    });
}

export async function getTeacherCourses() {
    const { userId } = await auth();
    if (!userId) return [];

    const user = await db.user.findUnique({
        where: { clerkId: userId },
        include: {
            teachingCourses: {
                select: {
                    id: true,
                    title: true,
                    code: true
                }
            }
        }
    });

    return user?.teachingCourses || [];
}
