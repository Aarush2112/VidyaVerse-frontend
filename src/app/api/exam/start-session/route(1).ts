import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { generateSignature } from "@/lib/cloudinary";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const body = await req.json();
        const { assignmentId, deviceFingerprint } = body;

        if (!assignmentId) {
            return new NextResponse("Missing assignment ID", { status: 400 });
        }

        // 1. Create Attempt
        // @ts-ignore
        const attempt = await (db as any).examAttempt.create({
            data: {
                assignmentId,
                studentId: userId, // Assuming Clerk ID maps to User ID
                status: 'IN_PROGRESS',
                startTime: new Date(),
                deviceFingerprint,
                ipAddress: req.headers.get("x-forwarded-for") || "unknown",
                userAgent: req.headers.get("user-agent"),
            }
        });

        // 2. Generate Cloudinary Token for Frontend
        const { timestamp, signature } = generateSignature('exam_proctoring');

        return NextResponse.json({
            attemptId: attempt.id,
            cloudConfig: {
                apiKey: process.env.CLOUDINARY_API_KEY,
                cloudName: process.env.CLOUDINARY_CLOUD_NAME,
                timestamp,
                signature,
                uploadPreset: 'exam_proctoring'
            }
        });

    } catch (error) {
        console.error("[EXAM_START]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
