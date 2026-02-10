import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { ProctoringService } from "@/lib/proctoring";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request) {
    try {
        const { userId } = await auth();
        if (!userId) return new NextResponse("Unauthorized", { status: 401 });

        const body = await req.json();
        const { attemptId, webcamUrl, screenUrl } = body;

        const endTime = new Date();

        // Calculate Duration
        // @ts-ignore
        const attempt = await (db as any).examAttempt.findUnique({ where: { id: attemptId } });
        if (!attempt) return new NextResponse("Attempt not found", { status: 404 });

        const durationSeconds = Math.floor((endTime.getTime() - attempt.startTime.getTime()) / 1000);

        // Update Attempt
        // @ts-ignore
        await (db as any).examAttempt.update({
            where: { id: attemptId },
            data: {
                status: 'SUBMITTED',
                endTime,
                durationSeconds,
                webcamRecordingUrl: webcamUrl,
                screenRecordingUrl: screenUrl
            }
        });

        // Calc Trust Score (Async)
        const trustScore = await ProctoringService.calculateTrustScore(attemptId);

        // TODO: Trigger Auto-Grader here

        return NextResponse.json({ success: true, trustScore });

    } catch (error) {
        console.error("[EXAM_FINALIZE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
