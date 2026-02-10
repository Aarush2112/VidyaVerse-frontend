import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const body = await req.json();
        const { attemptId } = body;

        // @ts-ignore
        const attempt = await (db as any).examAttempt.findUnique({
            where: { id: attemptId }
        });

        if (!attempt || attempt.studentId !== userId) {
            return new NextResponse("Forbidden", { status: 403 });
        }

        if (attempt.status === 'TERMINATED' || attempt.status === 'SUBMITTED') {
            return NextResponse.json({ status: attempt.status });
        }

        // In a real system, we might update a 'lastHeartbeat' field in Redis or DB
        // For now, we just acknowledge receipt to keep the connection alive

        return NextResponse.json({ status: 'OK' });

    } catch (error) {
        console.error("[EXAM_HEARTBEAT]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
