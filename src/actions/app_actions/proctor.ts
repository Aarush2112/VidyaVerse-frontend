"use server"

import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import { pusherServer } from "@/lib/pusher"

import { ProctorEvent } from "@prisma/client"

export async function logProctorEvent(assignmentId: string, event: ProctorEvent, details?: any) {
    const { userId } = await auth()
    if (!userId) throw new Error("Unauthorized")

    // 1. Get User Details
    const user = await db.user.findUnique({
        where: { clerkId: userId }
    })
    if (!user) throw new Error("User not found")

    // 2. Fetch Assignment to get CourseID (for channel)
    const assignment = await db.assignment.findUnique({
        where: { id: assignmentId },
        select: { courseId: true, title: true }
    })
    if (!assignment) throw new Error("Assignment not found")

    // 3. Log to DB
    const log = await db.proctorLog.create({
        data: {
            userId: user.id,
            assignmentId,
            event,
            details: details || {},
            timestamp: new Date()
        }
    })

    // 4. Trigger Pusher Event
    // Channel: teacher-proctor-[courseId]
    // Event: violation
    try {
        await pusherServer.trigger(`course-${assignment.courseId}`, "proctor-event", {
            studentId: user.id,
            studentName: user.name || "Unknown",
            assignmentTitle: assignment.title,
            event,
            timestamp: new Date(),
            details
        })
    } catch (pusherError) {
        console.error("Pusher Trigger Error (logProctorEvent):", pusherError);
    }

    return { success: true }
}

export async function getProctorDashboardData() {
    const { userId } = await auth()
    if (!userId) throw new Error("Unauthorized")

    const user = await db.user.findUnique({ where: { clerkId: userId } })
    if (!user) throw new Error("User not found")

    // Get the first course the teacher is teaching (MVP)
    const course = await db.course.findFirst({
        where: { teacherId: user.id },
        include: {
            enrollments: {
                include: {
                    user: {
                        select: { id: true, name: true, email: true }
                    }
                }
            }
        }
    })

    if (!course) return null

    // Map students to session format
    const students = course.enrollments.map((e: any) => ({
        id: e.user.id,
        name: e.user.name || e.user.email,
        status: "IDLE", // Default
        lastActive: "-",
        warnings: 0,
        currentProblem: "-",
        tabSwitches: 0,
        codeLines: 0
    }))

    return {
        courseId: course.id,
        courseTitle: course.title,
        students
    }
}

export async function getExamProctorData(examId: string) {
    const { userId } = await auth()
    if (!userId) throw new Error("Unauthorized")

    // 1. Get Assignment & Course
    const assignment = await db.assignment.findUnique({
        where: { id: examId },
        include: {
            course: {
                include: {
                    enrollments: {
                        include: {
                            user: { select: { id: true, name: true, email: true } }
                        }
                    }
                }
            }
        }
    })

    if (!assignment) return null

    // 2. Map Students
    const students = assignment.course.enrollments.map((e: any) => ({
        id: e.user.id,
        name: e.user.name || e.user.email,
        status: "IDLE",
        lastActive: "-",
        warnings: 0,
        currentProblem: "-",
        tabSwitches: 0,
        codeLines: 0
    }))

    return {
        courseId: assignment.courseId,
        courseTitle: assignment.course.title,
        assignmentTitle: assignment.title,
        students
    }
}

export async function uploadEvidence(examId: string, screenshot: string | null, webcam: string | null) {
    try {
        const { userId } = await auth() // Clerk ID
        if (!userId) throw new Error("Unauthorized")

        const user = await db.user.findUnique({ where: { clerkId: userId } })
        if (!user) throw new Error("User not found")

        const evidence = await db.proctorEvidence.create({
            data: {
                studentId: user.id,
                examId,
                screenshot,
                webcam
            }
        })

        // Notify Teacher Dashboard
        const assignment = await db.assignment.findUnique({
            where: { id: examId },
            select: { courseId: true }
        })

        if (assignment) {
            try {
                // If webcam snapshot is small enough, send it directly for "Real-time" feel
                const isSmallEnough = webcam && webcam.length < 8000; // ~6-7KB safe limit for Pusher

                await pusherServer.trigger(`course-${assignment.courseId}`, "proctor-event", {
                    studentId: user.id,
                    studentName: user.name,
                    event: "EVIDENCE_UPLOADED",
                    evidenceId: evidence.id,
                    webcamUrl: isSmallEnough ? webcam : null, // Direct send for speed
                    timestamp: new Date().toISOString()
                })
            } catch (pusherError) {
                console.error("Pusher Trigger Error (uploadEvidence):", pusherError);
            }
        }

        return { success: true }
    } catch (error) {
        console.error("Upload Evidence Error:", error)
        return { success: false }
    }
}

export async function getEvidenceById(evidenceId: string) {
    const { userId } = await auth()
    if (!userId) throw new Error("Unauthorized")

    const evidence = await db.proctorEvidence.findUnique({
        where: { id: evidenceId }
    })

    return evidence;
}
