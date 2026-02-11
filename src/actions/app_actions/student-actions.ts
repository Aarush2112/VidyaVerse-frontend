"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

// 1. Enroll Student (Mock Email)
export async function enrollStudent(data: { name: string; email: string; rollNumber: string; cohort: string }) {
    try {
        // Create User (Auth)
        const user = await db.user.create({
            data: {
                clerkId: `mock_clerk_${Math.random().toString(36).substr(2, 9)}`, // Mock for now
                email: data.email,
                name: data.name,
                role: "STUDENT"
            }
        });

        // Create Profile
        await db.studentProfile.create({
            data: {
                userId: user.id,
                rollNumber: data.rollNumber,
                cohort: data.cohort,
                currentGPA: 0.0,
                attendanceRate: 100.0
            }
        });

        revalidatePath("/teacher/students");
        return { success: true, message: `Enrolled ${data.name}` };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

// 2. Flag Student
export async function flagStudent(studentId: string, isFlagged: boolean, reason?: string) {
    try {
        const student = await db.studentProfile.update({
            where: { id: studentId },
            data: {
                isFlaggedAtRisk: isFlagged,
                flagReason: isFlagged ? reason : null,
                riskScore: isFlagged ? { increment: 20 } : { decrement: 20 } // Simple risk logic
            },
            include: { user: true } // to get name
        });

        // Create Intervention Record
        if (isFlagged) {
            await db.intervention.create({
                data: {
                    studentId: studentId,
                    teacherId: "teacher-id-placeholder", // Ideally from auth()
                    type: "WARNING",
                    status: "OPEN",
                    notes: reason
                }
            });

            // Notify Student
            await db.notification.create({
                data: {
                    userId: student.id,
                    title: "Academic Alert ⚠️",
                    message: `You have been flagged for: ${reason}. Please see your professor.`,
                    type: "ALERT"
                }
            });
        }

        revalidatePath("/teacher/students");
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

// 3. Bulk Message (Mock Email)
export async function sendBulkMessage(studentIds: string[], subject: string, message: string) {
    try {
        // In production: Use Resend/SendGrid here
        console.log(`Sending email to ${studentIds.length} students: ${subject}`);

        // Create Notifications for all
        await db.notification.createMany({
            data: studentIds.map(id => ({
                userId: id,
                title: subject,
                message: message,
                type: "INFO"
            }))
        });

        return { success: true, count: studentIds.length };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

// 4. Get Registry Data
export async function getRegistryData(cohort: string = "Spring 2026") {
    try {
        const students = await db.studentProfile.findMany({
            where: { cohort },
            include: { user: true },
            orderBy: { rollNumber: 'asc' }
        });
        return { success: true, data: students };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}
// 5. Get My Risk Status (For Student Dashboard)
import { auth } from "@clerk/nextjs/server";

export async function getMyRiskStatus() {
    try {
        const { userId } = await auth();
        if (!userId) return { success: false, error: "Unauthorized" };

        const user = await db.user.findUnique({
            where: { clerkId: userId }
        });

        if (!user) return { success: false, error: "User not found" };

        const studentProfile = await db.studentProfile.findUnique({
            where: { userId: user.id }
        });

        if (!studentProfile) return { success: false, data: null };

        return {
            success: true,
            data: {
                isFlagged: studentProfile.isFlaggedAtRisk,
                reason: studentProfile.flagReason
            }
        };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}
