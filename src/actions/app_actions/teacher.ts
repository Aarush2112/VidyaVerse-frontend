import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { SubmissionStatus } from "@prisma/client";
import type { User, Course, Enrollment, Assignment, Submission, Batch } from "@prisma/client";

export interface TeacherDashboardData {
    metrics: {
        engagement: { value: number; trend: number; history: number[] };
        pendingEvals: { value: number; urgent: number };
        classHealth: { value: number; trend: number };
    };
    gradingQueue: {
        id: string;
        studentName: string;
        studentAvatar: string;
        assignment: string;
        submittedAt: string; // Relative time string handled by client or pre-formatted
        plagiarismScore: number;
        autoGradeScore: number;
        status: 'PENDING' | 'GRADED';
    }[];
    atRiskStudents: {
        id: string;
        name: string;
        reason: 'ATTENDANCE' | 'GRADES' | 'INACTIVITY';
        detail: string;
        trend: 'DOWN' | 'STABLE';
    }[];
    activeSession?: {
        subject: string;
        location: string;
        attendanceCount: number;
        totalStudents: number;
        isLive: boolean;
        startedAt: Date;
    };
}

export async function fetchTeacherDashboardData(): Promise<TeacherDashboardData> {
    const { userId } = await auth();
    if (!userId) redirect("/sign-in");

    // 1. Fetch Teacher (user with role TEACHER or ADMIN)
    const user = await db.user.findUnique({
        where: { clerkId: userId },
        include: {
            teachingCourses: {
                include: {
                    enrollments: {
                        include: { user: true }
                    },
                    assignments: {
                        include: {
                            submissions: {
                                where: { status: SubmissionStatus.PENDING },
                                include: { user: true }
                            }
                        }
                    }
                }
            }
        }
    });

    if (!user) redirect("/sign-in");

    // 2. Aggregate Metrics
    let totalStudents = 0;
    let pendingSubmissions: any[] = [];

    user.teachingCourses.forEach((course: any) => {
        totalStudents += course.enrollments.length;
        course.assignments.forEach((assignment: any) => {
            pendingSubmissions.push(...assignment.submissions.map((sub: any) => ({
                ...sub,
                assignmentTitle: assignment.title,
                studentName: sub.user.name // Map user to flattened name
            })));
        });
    });

    // Mock calculations
    const engagementRate = totalStudents > 0 ? 87 : 0;
    const classHealthScore = 78;

    // Find the most relevant course for "Active Session"
    const activeCourse = (user.teachingCourses[0] as any) || null; // Simplified logic

    // 3. Grading Queue
    // Take top 5 pending
    const gradingQueue = pendingSubmissions.slice(0, 5).map((sub: any) => ({
        id: sub.id,
        studentName: sub.studentName || "Unknown Student",
        studentAvatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${sub.studentName}`, // Fallback if no specific avatar
        assignment: sub.assignmentTitle,
        submittedAt: new Date(sub.createdAt).toLocaleDateString(), // simplified for now
        plagiarismScore: Math.floor(Math.random() * 20), // Mock plagiarism check
        autoGradeScore: Math.floor(Math.random() * 10), // Mock auto-grade
        status: 'PENDING' as const
    }));

    // 4. At Risk Students (Mock logic: Students with specific IDs or random if no real tracking yet)
    // For now, we'll fetch a few students and flag them randomly to match the UI expectation
    const allStudents = user.teachingCourses.flatMap((c: any) => c.enrollments.map((e: any) => e.user));
    const atRiskStudents = allStudents.slice(0, 3).map((s: any, i: number) => ({
        id: s.id,
        name: s.name || "Student",
        reason: i === 0 ? 'ATTENDANCE' : (i === 1 ? 'GRADES' : 'INACTIVITY') as any,
        detail: i === 0 ? "Missed last 3 classes" : (i === 1 ? "Failed recent quiz" : "No login in 7 days"),
        trend: 'DOWN' as const
    }));

    return {
        metrics: {
            engagement: {
                value: engagementRate,
                trend: 5,
                history: [65, 70, 75, 72, 80, 85, engagementRate]
            },
            pendingEvals: {
                value: pendingSubmissions.length,
                urgent: pendingSubmissions.filter(s => new Date(s.createdAt) < new Date(Date.now() - 86400000)).length // Older than 24h
            },
            classHealth: {
                value: classHealthScore,
                trend: 2
            }
        },
        gradingQueue,
        atRiskStudents,
        activeSession: activeCourse ? {
            subject: activeCourse.title,
            location: "Main Lecture Hall", // Mock location
            attendanceCount: Math.floor(activeCourse.enrollments.length * 0.85), // Use actual student count
            totalStudents: activeCourse.enrollments.length, // Use actual student count
            isLive: true,
            startedAt: new Date(),
        } : undefined // If no active course, activeSession is undefined
    };
}

export type TeacherAssignment = {
    id: string;
    title: string;
    type: "Theory" | "Coding"; // Mapped from AssignmentType
    batch: string;
    dueDate: string;
    submittedCount: number;
    pendingCount: number;
    totalCount: number;
    status: "Active" | "Draft" | "Closed";
};

export async function fetchTeacherAssignments(): Promise<TeacherAssignment[]> {
    const { userId } = await auth();
    if (!userId) redirect("/sign-in");

    const user = await db.user.findUnique({
        where: { clerkId: userId },
        include: {
            teachingCourses: {
                include: {
                    enrollments: true,
                    batches: true,
                    assignments: {
                        include: {
                            submissions: true
                        }
                    }
                }
            }
        }
    });

    if (!user) return [];

    const assignments: TeacherAssignment[] = [];
    const now = new Date();

    user.teachingCourses.forEach(course => {
        const batchNames = course.batches.map(b => b.name).join(", ") || "All Students";

        course.assignments.forEach(assignment => {
            // Determine status
            let status: "Active" | "Draft" | "Closed" = "Active";
            if (!course.isPublished) {
                status = "Draft";
            }

            if (assignment.startDate && assignment.startDate > now) status = "Draft";
            else if (assignment.dueDate && assignment.dueDate < now) status = "Closed";
            else status = "Active";

            // Count pending submissions
            // Casting to any because of type mismatch with generated client
            const pendingCount = assignment.submissions.filter(s => (s.status as any) === 'PENDING' || s.status === 'PENDING').length;

            assignments.push({
                id: assignment.id,
                title: assignment.title,
                type: assignment.type === "ALGORITHM" ? "Coding" : "Theory",
                batch: batchNames,
                dueDate: assignment.dueDate ? assignment.dueDate.toLocaleDateString("en-US", { month: "short", day: "2-digit" }) : "No Due Date",
                submittedCount: assignment.submissions.length,
                pendingCount: pendingCount,
                totalCount: course.enrollments.length,
                status: status
            });
        });
    });

    return assignments;
}

