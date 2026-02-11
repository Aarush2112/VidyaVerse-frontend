"use server"

import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

// --- TYPES ---
interface LeaderboardEntry {
    rank: number
    studentName: string | null
    score: number
    avatarUrl: string | null
    isCurrentUser: boolean
}

// --- STUDENT ASSIGNMENTS ---

export async function getStudentAssignments() {
    const { userId } = await auth()
    if (!userId) return []

    // 1. Get Student User
    const student = await db.user.findUnique({
        where: { clerkId: userId },
        include: { enrollments: { select: { courseId: true } } }
    })

    if (!student) {
        console.log("getStudentAssignments: Student not found for clerkId", userId)
        return []
    }

    if (student.enrollments.length === 0) {
        console.log("getStudentAssignments: User enrolled in 0 courses")
        return []
    }

    const enrolledCourseIds = student.enrollments.map(e => e.courseId)

    // 2. Fetch Assignments
    // STRICT FILTERING:
    // - Must be in enrolled course
    // - Must be isPublished: true
    // - startDate must be in the past (or now)
    const assignments = await db.assignment.findMany({
        where: {
            courseId: { in: enrolledCourseIds },
            isPublished: true,
            startDate: { lte: new Date() }
        } as any,
        include: {
            course: true,
            submissions: {
                where: { userId: student.id },
                select: { status: true, score: true } as any
            }
        },
        orderBy: { startDate: 'desc' } as any
    })

    console.log(`getStudentAssignments: Found ${assignments.length} published active assignments`)

    return assignments.map(a => ({
        ...a,
        status: determineStatus(a, a.submissions)
    }))
}

function determineStatus(assignment: any, submissions: any[]) {
    const now = new Date()
    // Check if submitted
    const submission = submissions[0]
    if (submission) {
        if (submission.status === "ACCEPTED" || submission.status === "PENDING") return "COMPLETED"
    }

    // Check flow
    if (assignment.dueDate && now > assignment.dueDate) return "MISSED"
    if (assignment.startDate && now < assignment.startDate) return "UPCOMING"

    return "ACTIVE"
}

// --- EXAM & LEADERBOARD ---

export async function getProblemForIDE(assignmentId: string) {
    const { userId } = await auth()
    if (!userId) throw new Error("Unauthorized")

    // Fetch problem details but HIDE hidden test cases
    // Also fetch Exam Questions if type is Exam (not implemented yet strictly by type, but fetching logic is here)
    const assignment = await db.assignment.findUnique({
        where: { id: assignmentId },
        include: {
            problems: {
                include: {
                    testCases: {
                        select: {
                            id: true,
                            input: true,
                            expectedOutput: true,
                            isHidden: true,
                        }
                    }
                }
            },
            questions: { // For Exams
                select: {
                    id: true,
                    text: true,
                    options: true,
                    points: true
                    // correctOption is HIDDEN
                }
            }
        }
    })

    if (!assignment) throw new Error("Assignment not found")

    // Filter out hidden test case outputs for security
    const secureAssignment = {
        ...assignment,
        problems: assignment.problems.map((p: any) => ({
            ...p,
            testCases: p.testCases.map((tc: any) => ({
                ...tc,
                expectedOutput: tc.isHidden ? null : tc.expectedOutput
            }))
        }))
    }

    return secureAssignment
}

export async function getLeaderboardData(assignmentId: string): Promise<LeaderboardEntry[]> {
    const { userId } = await auth()

    // 1. Fetch Submissions
    const submissions = await db.submission.findMany({
        where: {
            assignmentId,
            score: { not: null }
        },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    clerkId: true,
                    profile: {
                        select: { avatarUrl: true }
                    }
                }
            }
        },
        orderBy: [
            { score: 'desc' } as any,
            { submittedAt: 'asc' } as any
        ],
        take: 50
    })

    // 2. Identify Current User (to flag 'isCurrentUser')
    // We need to match by clerkId since that's what we have from auth()
    // But submission.user has clerkId too. 

    return submissions.map((sub: any, index) => ({
        rank: index + 1,
        studentName: sub.user.name || "Anonymous",
        score: sub.score || 0,
        avatarUrl: sub.user.profile?.avatarUrl || null,
        isCurrentUser: sub.user.clerkId === userId
    }))
}

// --- SUBMISSION ACTION (MOCK FOR NOW OR REAL) ---
export async function submitExam(assignmentId: string, answers: Record<string, number>) {
    const { userId } = await auth()
    if (!userId) throw new Error("Unauthorized")

    const user = await db.user.findUnique({ where: { clerkId: userId } })
    if (!user) throw new Error("User not found")

    // 1. Calculate Score
    const assignment = await db.assignment.findUnique({
        where: { id: assignmentId },
        include: { questions: true }
    }) as any

    if (!assignment) throw new Error("Assignment not found")

    let score = 0
    let totalPoints = 0

    assignment.questions.forEach((q: any) => {
        totalPoints += q.points
        if (answers[q.id] === q.correctOption) {
            score += q.points
        }
    })

    // 2. Save Submission
    await db.submission.create({
        data: {
            userId: user.id,
            assignmentId,
            answers,
            score,
            totalPoints,
            status: "ACCEPTED" // Or whatever enum fits
        }
    })

    // 3. Award XP (Score-based)
    if (score > 0) {
        await db.user.update({
            where: { id: user.id },
            data: { xp: { increment: score } }
        })
    }

    return { success: true, score, totalPoints }
}

import { format } from "date-fns";

export interface AssignmentListData {
    id: string;
    title: string;
    course: string;
    type: string;
    dueDate: string | null;
    status: 'ACTIVE' | 'UPCOMING' | 'COMPLETED' | 'MISSED' | 'SAVED';
    duration: string; // "N/A"
    questions: number;
    score?: number;
    isProctored: boolean;
}

export async function getAssignmentsForList(): Promise<AssignmentListData[]> {
    const { userId } = await auth();
    if (!userId) return [];

    const assignments = await db.assignment.findMany({
        include: {
            course: {
                select: { title: true }
            },
            problems: {
                select: { id: true }
            },
            submissions: {
                where: { user: { clerkId: userId } },
                select: { status: true, score: true }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    const now = new Date();

    return assignments.map(asm => {
        const isExpired = asm.dueDate && new Date(asm.dueDate) < now;
        const isUpcoming = asm.startDate && new Date(asm.startDate) > now;
        const submission = asm.submissions[0];

        let status: AssignmentListData['status'] = 'ACTIVE';

        if (submission) {
            status = 'COMPLETED';
        } else if (isExpired) {
            status = 'MISSED';
        } else if (isUpcoming) {
            status = 'UPCOMING';
        }

        return {
            id: asm.id,
            title: asm.title,
            course: asm.course.title,
            type: asm.type,
            dueDate: asm.dueDate ? format(new Date(asm.dueDate), "MMM d, h:mm a") : null,
            status,
            duration: "N/A",
            questions: asm.problems.length,
            score: submission?.score || 0,
            isProctored: asm.isProctored
        };
    });
}
