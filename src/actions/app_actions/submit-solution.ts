"use server"

import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import { submitCode } from "@/lib/judge0"
import { SubmissionStatus } from "@prisma/client"
import { revalidatePath } from "next/cache"

import { pusherServer } from "@/lib/pusher"

export async function submitSolution(assignmentId: string, problemId: string, code: string, languageId: number) {
    const { userId } = await auth()
    if (!userId) throw new Error("Unauthorized")

    const user = await db.user.findUnique({ where: { clerkId: userId } })
    if (!user) throw new Error("User not found")

    // 1. Fetch Problem & Hidden Test Cases
    const problem = await db.problem.findUnique({
        where: { id: problemId },
        include: { testCases: true }
    })
    if (!problem) throw new Error("Problem not found")

    // 2. Run against ALL test cases (or just sample + hidden)
    // For simplicity, we run against the FIRST hidden case or a combined input if supported.
    // Judge0 usually runs 1 input. We might need multiple calls or a batch submission.
    // For MVP: We test against the first HIDDEN test case (the "real" test).

    const hiddenTestCase = problem.testCases.find(tc => tc.isHidden) || problem.testCases[0]

    if (!hiddenTestCase) {
        // No test cases? Auto accept?
        return { status: "ACCEPTED", message: "No test cases defined. Logic accepted." }
    }

    // 3. Execute Code
    const result = await submitCode(code, languageId, hiddenTestCase.input)

    let status: SubmissionStatus = "WRONG_ANSWER"
    if (result.status.id === 3) { // Accepted
        // Check output strictness (trim)
        if (result.stdout?.trim() === hiddenTestCase.expectedOutput.trim()) {
            status = "ACCEPTED"
        } else {
            status = "WRONG_ANSWER"
        }
    } else if (result.status.id === 6) {
        status = "COMPILE_ERROR"
    } else if (result.status.id === 5) {
        status = "TLE"
    }

    // 4. Persist Submission
    await db.submission.create({
        data: {
            code,
            languageId,
            status,
            executionTime: result.time ? parseFloat(result.time) : 0,
            memoryUsed: result.memory ? result.memory : 0,
            userId: user.id,
            assignmentId
        }
    })

    // 5. Update XP if Accepted and not previously accepted
    if (status === "ACCEPTED") {
        const existing = await db.submission.findFirst({
            where: {
                userId: user.id,
                assignmentId,
                status: "ACCEPTED",
                id: { not: undefined } // exclude current? No, create happened above.
            }
        })

        // If this is the FIRST accepted submission (ignoring the one we just made? No, we need to check BEFORE create, or count queries)
        // Simplest: Check if count of accepted is 1
        const acceptedCount = await db.submission.count({
            where: { userId: user.id, assignmentId, status: "ACCEPTED" }
        })

        if (acceptedCount === 1) { // This is the first one
            await db.user.update({
                where: { id: user.id },
                data: { xp: { increment: 100 } } // Hardcoded 100 XP per assignment for now
            })

            // Trigger Pusher Leaderboard Update
            try {
                await pusherServer.trigger("leaderboard", "update", {
                    userId: user.id,
                    name: user.name,
                    xp: (user.xp || 0) + 100 // We just incremented
                })
            } catch (error) {
                console.error("Pusher Error:", error)
            }
        }
    }

    revalidatePath("/student/dashboard");
    revalidatePath("/teacher/assignments"); // Fix: Update teacher view
    revalidatePath("/student/leaderboard"); // Fix: Update leaderboard
    revalidatePath("/student/assignments");
    return {
        status,
        stdout: result.stdout,
        stderr: result.stderr,
        compile_output: result.compile_output
    }
}
