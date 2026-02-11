"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// Manually define Enums to avoid runtime import issues with @prisma/client
// caused by stale client generation
const StreamEnum = ["CSE", "ECE", "MECH", "AI_ML"] as const;
const DifficultyEnum = ["BEGINNER", "INTERMEDIATE", "ADVANCED"] as const;

// --- Validation Schemas ---
const WizardSchema = z.object({
    title: z.string().min(3, "Title too short"),
    code: z.string().min(3, "Code must be at least 3 chars"),
    stream: z.enum(StreamEnum),
    semester: z.string(),
    credits: z.number().min(1).max(10),
    capacity: z.number().min(1),
    difficulty: z.enum(DifficultyEnum),
    templateId: z.string().nullable(),
    theme: z.string().optional(),
    thumbnail: z.string().nullable().optional(),
    isAIEnabled: z.boolean().optional()
});

export type WizardData = z.infer<typeof WizardSchema>;

// --- Actions ---

export async function checkCourseCode(code: string) {
    try {
        const existing = await db.course.findUnique({
            where: { code },
        });

        const suggestion = existing ? `${code}-2026` : "";

        return {
            available: !existing,
            suggestion
        };
    } catch (error) {
        console.error("Course Availability Check Failed:", error);
        return { available: false, suggestion: "", error: "Check failed" };
    }
}

export async function createCourse(data: WizardData) {
    console.log("[CREATE_COURSE] Started with data:", JSON.stringify(data, null, 2));
    try {
        const { userId } = await auth();
        console.log("[CREATE_COURSE] Auth userId:", userId);

        if (!userId) return { success: false, error: "Unauthorized" };

        const user = await db.user.findUnique({ where: { clerkId: userId } });
        console.log("[CREATE_COURSE] DB User found:", user?.id, user?.role);

        if (!user || (user.role !== "TEACHER" && user.role !== "ADMIN")) {
            return { success: false, error: "Permission denied: Must be TEACHER or ADMIN" };
        }

        const validated = WizardSchema.parse(data);
        console.log("[CREATE_COURSE] Validation passed");

        // 1. Initialize lessons array
        let lessonsToCreate: any[] = [];

        // 0. AI Generation (Takes precedence)
        if (validated.isAIEnabled) {
            try {
                // Dynamic Import to avoid cycle if any
                const { generateCourseStructure } = await import("@/app/actions/ai");
                lessonsToCreate = await generateCourseStructure(validated.title, validated.stream);
                console.log("[CREATE_COURSE] AI Generated Curriculum:", lessonsToCreate.length, "lessons");
            } catch (e) {
                console.error("[CREATE_COURSE] AI Generation Failed:", e);
                // Fallback to template if AI fails
            }
        }

        // 1. Fetch Template (Only if AI didn't run or failed)
        if (lessonsToCreate.length === 0) {
            if (validated.templateId === "theory") {
                lessonsToCreate = [
                    { title: "Introduction", type: "VIDEO" },
                    { title: "Core Concepts", type: "VIDEO" },
                    { title: "Mid-Term Review", type: "QUIZ" },
                    { title: "Advanced Topics", type: "VIDEO" },
                    { title: "Final Exam Prep", type: "QUIZ" }
                ];
            } else if (validated.templateId === "lab") {
                lessonsToCreate = [
                    { title: "Lab Safety & Setup", type: "VIDEO" },
                    { title: "Experiment 1: Basics", type: "TEXT" },
                    { title: "Experiment 2: Advanced", type: "TEXT" },
                    { title: "Final Project Submission", type: "PROJECT" }
                ];
            } else if (validated.templateId && validated.templateId !== "empty") {
                try {
                    // Check if it's a valid UUID to avoid Prisma panic
                    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(validated.templateId);

                    if (isUuid) {
                        // Start of workaround: Use 'any' cast for db query due to stale types
                        // @ts-ignore
                        const template = await db.courseTemplate.findUnique({
                            where: { id: validated.templateId }
                        });
                        if (template && template.defaultModules) {
                            lessonsToCreate = template.defaultModules as any[];
                        }
                    } else {
                        console.warn("[CREATE_COURSE] Template ID is not a UUID, skipping lookup:", validated.templateId);
                    }
                } catch (e) {
                    console.warn("[CREATE_COURSE] Template lookup failed safely:", e);
                }
            }
        }

        console.log("[CREATE_COURSE] Lessons to create:", lessonsToCreate.length);

        // 2. Create Course and Hierarchy
        // Using 'any' cast for 'data' to bypass "Object literal may only specify known properties" error
        // caused by stale Prisma Client types missing 'stream', 'difficulty', etc.
        const course = await db.course.create({
            data: {
                title: validated.title,
                code: validated.code,
                stream: validated.stream as any,
                semester: validated.semester,
                credits: validated.credits,
                capacity: validated.capacity,
                difficulty: validated.difficulty as any,
                thumbnail: validated.thumbnail || validated.theme,
                teacherId: user.id,
                // Auto-publish if using a template to ensure immediate visibility as per user request
                isPublished: lessonsToCreate.length > 0,

                // Create the initial Chapter if we have content
                chapters: lessonsToCreate.length > 0 ? {
                    create: {
                        title: "Module 1: Getting Started",
                        position: 1,
                        isPublished: true, // Auto-publish chapter
                        lessons: {
                            create: lessonsToCreate.map((lesson, idx) => ({
                                title: lesson.title,
                                type: lesson.type || "TEXT",
                                position: idx + 1,
                                isPublished: true // Auto-publish lessons
                            }))
                        }
                    }
                } : undefined
            } as any
        });

        console.log("[CREATE_COURSE] Course created successfully:", course.id);

        // Revalidate Teacher AND Student paths to ensure instant visibility
        revalidatePath("/teacher/courses");
        revalidatePath("/student/courses");
        revalidatePath("/student/dashboard");

        return { success: true, courseId: course.id };

    } catch (error: any) {
        console.error("[CREATE_COURSE] CRITICAL ERROR:", error);
        if (error instanceof z.ZodError) {
            const issues = error.issues.map((e) => `${e.path.join('.')}: ${e.message}`).join(', ');
            return { success: false, error: `Validation Error: ${issues}` };
        }
        if (error.code === 'P2002') {
            return { success: false, error: "Course code already taken" };
        }
        return { success: false, error: error.message || "Failed to create course" };
    }
}
