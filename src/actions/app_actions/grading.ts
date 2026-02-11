"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function updateGrade(submissionId: string, score: number) {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    // Verify teacher? (Skip for now or assume teacher role check via middleware/RBAC logic elsewhere)

    const submission = await db.submission.update({
        where: { id: submissionId },
        data: {
            score,
            status: "ACCEPTED" // Or GRADED
        }
    });

    // Award XP (Simplified)
    if (submission.userId) {
        await db.user.update({
            where: { id: submission.userId },
            data: { xp: { increment: score } }
        });
    }

    revalidatePath("/teacher/grades");
    return { success: true };
}

export interface GradebookRow {
    id: string;
    name: string;
    rollNo: string;
    avatar?: string;
    totalScore: number;
    attendance: number;
    assignment1: number; // Mapping first 2 assignments for demo
    midSem: number;
    status: "Pass" | "Fail" | "Withheld";
    history: { date: string; score: number }[];
}

export async function getGradebookData(): Promise<GradebookRow[]> {
    const { userId } = await auth();
    if (!userId) return [];

    // 1. Find a course this teacher teaches (Simplified: taking the first one)
    const user = await db.user.findUnique({
        where: { clerkId: userId },
        include: {
            teachingCourses: {
                take: 1,
                include: {
                    enrollments: {
                        include: {
                            user: {
                                include: {
                                    submissions: true,
                                    profile: true,
                                    gamification: true
                                }
                            }
                        }
                    },
                    assignments: {
                        orderBy: { createdAt: 'asc' },
                        take: 2
                    }
                }
            }
        }
    });

    if (!user || user.teachingCourses.length === 0) return [];

    const course = user.teachingCourses[0];
    const assignments = course.assignments;

    // 2. Map students to rows
    return course.enrollments.map((enrollment: any) => {
        const student = enrollment.user;
        // Find scores for the first two assignments
        const sub1 = student.submissions.find((s: any) => s.assignmentId === assignments[0]?.id);
        const sub2 = student.submissions.find((s: any) => s.assignmentId === assignments[1]?.id);

        const score1 = sub1?.score || 0;
        const score2 = sub2?.score || 0;

        // Mock attendance based on something or random if not tracked
        const attendance = student.profile?.attendanceRate || 85;

        // Calculate status
        const total = (score1 + score2) / 2; // Simple average
        let status: "Pass" | "Fail" | "Withheld" = "Pass";
        if (total < 40) status = "Fail";
        if (attendance < 75) status = "Withheld";

        return {
            id: student.id,
            name: student.name || "Unknown",
            rollNo: student.profile?.rollNumber || "N/A",
            avatar: student.profile?.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${student.id}`,
            totalScore: Math.round(total),
            attendance,
            assignment1: score1,
            midSem: score2,
            status,
            history: [] // Mock history for now
        };
    });
}
