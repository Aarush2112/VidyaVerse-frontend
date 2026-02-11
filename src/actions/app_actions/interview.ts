"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createSession(userId: string, persona: string) {
    // In a real app, this creates the session record
    // For now, we return a mock ID if DB isn't fully synced
    return { id: `session-${Date.now()}` };
}

export async function generateFeedback(sessionId: string) {
    // 1. Fetch transcript (Mocking for now as we don't have the realtime transcript storage wired yet)
    // In prod: const transcript = await db.interviewTurn.findMany({ where: { sessionId } });

    // 2. Call LLM for analysis (Mocking the LLM call for speed/demo)
    // const analysis = await openai.chat.completions.create({...})

    // Simulated Result
    const mockFeedback = {
        technicalScore: 85,
        communicationScore: 78,
        confidenceScore: 92,
        problemSolvingScore: 88,
        cultureFitScore: 90,
        executiveSummary: "The candidate demonstrated strong knowledge of distributed systems but struggled slightly with the specific implementation details of the raft consensus algorithm. Communication was clear, though pace was a bit fast.",
        strengths: [
            "Excellent understanding of CAP theorem",
            "Clear articulation of trade-offs",
            "Confident tone throughout"
        ],
        weaknesses: [
            "Rushed through the initial design phase",
            "Missed edge case on network partitions",
            "Could use more concrete examples"
        ],
        hiringDecision: "LEAN HIRE"
    };

    // 3. Save to DB (Mock)
    /*
    await db.interviewFeedback.create({
      data: {
          sessionId,
          ...mockFeedback
      }
    });
    */

    revalidatePath(`/student/career/interview/${sessionId}`);
    return mockFeedback;
}

export async function getInterviewResult(sessionId: string) {
    const result = await db.interviewFeedback.findUnique({
        where: { sessionId },
        include: { session: true }
    });

    if (!result) {
        // Fallback to mock data if DB is empty (for demo purposes)
        const mockFeedback = {
            technicalScore: 85,
            communicationScore: 78,
            confidenceScore: 92,
            problemSolvingScore: 88,
            cultureFitScore: 90,
            executiveSummary: "The candidate demonstrated strong knowledge of distributed systems but struggled slightly with the specific implementation details of the raft consensus algorithm. Communication was clear, though pace was a bit fast.",
            strengths: [
                "Excellent understanding of CAP theorem",
                "Clear articulation of trade-offs",
                "Confident tone throughout"
            ],
            weaknesses: [
                "Rushed through the initial design phase",
                "Missed edge case on network partitions",
                "Could use more concrete examples"
            ],
            hiringDecision: "LEAN HIRE"
        };

        const chartData = [
            { subject: 'Technical', A: mockFeedback.technicalScore, fullMark: 100 },
            { subject: 'Communication', A: mockFeedback.communicationScore, fullMark: 100 },
            { subject: 'Confidence', A: mockFeedback.confidenceScore, fullMark: 100 },
            { subject: 'Problem Solving', A: mockFeedback.problemSolvingScore, fullMark: 100 },
            { subject: 'Culture Fit', A: mockFeedback.cultureFitScore, fullMark: 100 },
        ];

        return { ...mockFeedback, chartData };
    }

    // Transform for Recharts
    const chartData = [
        { subject: 'Technical', A: result.technicalScore, fullMark: 100 },
        { subject: 'Communication', A: result.communicationScore, fullMark: 100 },
        { subject: 'Confidence', A: result.confidenceScore, fullMark: 100 },
        { subject: 'Problem Solving', A: result.problemSolvingScore, fullMark: 100 },
        { subject: 'Culture Fit', A: result.cultureFitScore, fullMark: 100 },
    ];

    return { ...result, chartData };
}
