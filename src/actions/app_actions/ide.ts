"use server";

import { db } from "@/lib/db";
import { groq } from "@/lib/groq";
import { auth } from "@clerk/nextjs/server";
import { ProblemSource } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function generateAIProblem(topic: string, difficulty: string) {
    const { userId: clerkId } = await auth();
    if (!clerkId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
        where: { clerkId },
        select: { id: true }
    });

    if (!user) throw new Error("User not found");

    const systemPrompt = `You are a coding interview content generator. 
    Generate a coding problem about '${topic}' at '${difficulty}' level. 
    Return ONLY valid JSON with this structure: 
    { 
        "title": string, 
        "description": string (detailed markdown with examples), 
        "starterCode": string (JavaScript function skeleton), 
        "testCases": [{ "input": string, "expectedOutput": string }] 
    }. 
    Do not include any explanation outside the JSON.`;

    try {
        const chatCompletion = await groq.chat.completions.create({
            messages: [{ role: "system", content: systemPrompt }],
            model: "llama3-70b-8192",
            temperature: 0.7,
            response_format: { type: "json_object" }
        });

        const content = chatCompletion.choices[0].message.content;
        if (!content) throw new Error("Failed to generate problem content");

        const data = JSON.parse(content);

        // Save to DB
        const problem = await db.problem.create({
            data: {
                title: data.title,
                description: data.description,
                difficulty: difficulty.toUpperCase(),
                starterCode: data.starterCode,
                source: ProblemSource.AI_GENERATED,
                createdByUserId: user.id,
                testCases: {
                    create: data.testCases.map((tc: any) => ({
                        input: tc.input,
                        expectedOutput: tc.expectedOutput
                    }))
                }
            }
        });

        return { success: true, problemId: problem.id };
    } catch (error: any) {
        console.error("GENERATE AI PROBLEM ERROR:", error);
        if (error.code) console.error("Error Code:", error.code);
        if (error.response) console.error("Error Response:", JSON.stringify(error.response, null, 2));

        throw new Error(`Failed to generate AI problem: ${error.message || "Unknown error"}`);
    }
}

export async function submitSolution(problemId: string, code: string, passed: boolean) {
    const { userId: clerkId } = await auth();
    if (!clerkId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
        where: { clerkId },
        include: { gamification: true }
    });

    if (!user) throw new Error("User not found");

    // 1. Create Submission record
    await db.arenaSubmission.create({
        data: {
            userId: user.id,
            problemId: problemId,
            code: code,
            status: passed ? "ACCEPTED" : "WRONG_ANSWER",
            passCount: passed ? 1 : 0, // Simplified for now
            totalCount: 1
        }
    });

    if (passed) {
        // 2. Update Gamification
        const xpGain = 50;
        await db.gamification.upsert({
            where: { userId: user.id },
            create: {
                userId: user.id,
                xp: xpGain,
                level: 1,
                currentStreak: 1
            },
            update: {
                xp: { increment: xpGain }
            }
        });

        // Update global user XP for ranking (if redundant, but schema shows both)
        await db.user.update({
            where: { id: user.id },
            data: { xp: { increment: xpGain } }
        });

        revalidatePath("/student/leaderboard");
        revalidatePath("/student/dashboard");

        return { success: true, xpEarned: xpGain };
    }

    return { success: false };
}

export async function getProblemById(id: string) {
    return await db.problem.findUnique({
        where: { id },
        include: { testCases: true }
    });
}
