import { NextResponse } from "next/server";
import { ProctoringService } from "@/lib/proctoring";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const body = await req.json();
        const { attemptId, violationType, evidence } = body;

        const result = await ProctoringService.logViolation(attemptId, violationType, evidence);

        return NextResponse.json(result);

    } catch (error) {
        console.error("[EXAM_VIOLATION]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
