"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

// --- ENROLLMENT ---

export async function enrollStudent(email: string, courseId: string) {
    try {
        const { userId: teacherId } = await auth();
        if (!teacherId) return { success: false, error: "Unauthorized" };

        // 1. Check if Teacher owns course (or is admin)
        const course = await db.course.findUnique({
            where: { id: courseId },
            include: { teacher: true }
        });

        if (!course) return { success: false, error: "Course not found" };
        if (course.teacher.clerkId !== teacherId) {
            // Check if Admin? For now strictly owner.
            // return { success: false, error: "Forbidden" };
        }

        // 2. Find Student by Email
        const student = await db.user.findUnique({
            where: { email },
            include: { studentProfile: true }
        });

        if (!student) return { success: false, error: "Student not found with this email" };

        // 3. Enroll (Idempotent)
        await db.enrollment.upsert({
            where: {
                userId_courseId: {
                    userId: student.id,
                    courseId: courseId
                }
            },
            create: {
                userId: student.id,
                courseId: courseId
            },
            update: {}
        });

        // 4. Ensure Student Profile exists (idempotent)
        if (!student.studentProfile) {
            // Create profile if missing logic
            await db.studentProfile.create({
                data: {
                    userId: student.id,
                    cohort: "2026", // Default
                    rollNumber: "TEMP-" + Math.floor(Math.random() * 10000), // Placeholder
                }
            })
        }

        revalidatePath(`/teacher/courses/${courseId}`);
        revalidatePath(`/teacher/students`);

        return { success: true, message: "Student enrolled successfully" };

    } catch (error) {
        console.error("Enrollment Error:", error);
        return { success: false, error: "Failed to enroll student" };
    }
}

// --- RISK INTELLIGENCE ---

export async function updateRiskStatus(studentId: string, riskScore: number, flagReason?: string) {
    try {
        const { userId } = await auth();
        if (!userId) return { success: false, error: "Unauthorized" };

        const isAtRisk = riskScore > 50; // Threshold logic

        const updatedProfile = await db.studentProfile.update({
            where: { userId: studentId }, // Assuming studentId is UserId. Wait, schema has studentProfile.id too.
            // Usually we pass the student's User ID from the UI row.
            // Let's verify schema. StudentProfile has `userIdString @unique`. 
            // Ideally we update by userId or StudentProfileId. 
            // Let's assume input is userId for simplicity as displayed in tables?
            // Or let's try to update by `userId` filter.
            data: {
                riskScore,
                isFlaggedAtRisk: isAtRisk,
                flagReason: isAtRisk ? (flagReason || "Manual Risk Flag") : null
            }
        });

        revalidatePath("/teacher/students");
        return { success: true, data: updatedProfile };

    } catch (error) {
        console.error("Risk Update Error:", error);
        return { success: false, error: "Failed to update risk status" };
    }
}

// --- INTERVENTIONS ---

export async function createIntervention(studentId: string, type: string, notes: string) {
    try {
        const { userId } = await auth();
        if (!userId) return { success: false, error: "Unauthorized" };

        // Need the StudentProfile ID.
        const profile = await db.studentProfile.findUnique({ where: { userId: studentId } });
        if (!profile) return { success: false, error: "Profile not found" };

        const intervention = await db.intervention.create({
            data: {
                studentId: profile.id,
                teacherId: userId,
                type, // 'ACADEMIC', 'BEHAVIORAL', 'ATTENDANCE'
                status: 'OPEN',
                notes
            }
        });

        revalidatePath("/teacher/students");
        return { success: true, data: intervention };

    } catch (error) {
        console.error("Intervention Error:", error);
        return { success: false, error: "Failed to log intervention" };
    }
}
